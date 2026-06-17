// reviewRoutes.js
const express = require('express');
const r = express.Router();
const { Review } = require('../models/index');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

r.post('/', protect, async (req, res) => {
  const exists = await Review.findOne({ user: req.user._id, product: req.body.product });
  if (exists) return res.status(400).json({ success: false, message: 'Already reviewed' });
  const review = await Review.create({ ...req.body, user: req.user._id });
  // Update product rating
  const reviews = await Review.find({ product: req.body.product, isApproved: true });
  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(req.body.product, { ratings: Math.round(avgRating * 10) / 10, numReviews: reviews.length });
  res.status(201).json({ success: true, review });
});
r.get('/product/:productId', async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId, isApproved: true }).populate('user', 'name avatar');
  res.json({ success: true, reviews });
});
module.exports = r;

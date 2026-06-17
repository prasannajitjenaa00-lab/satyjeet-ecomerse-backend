// wishlistRoutes.js
const express = require('express');
const r = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

r.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist', 'name slug images price comparePrice discount ratings numReviews stock');
  res.json({ success: true, wishlist: user.wishlist });
});
r.post('/toggle/:productId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const idx = user.wishlist.indexOf(req.params.productId);
  if (idx > -1) { user.wishlist.splice(idx, 1); }
  else { user.wishlist.push(req.params.productId); }
  await user.save();
  res.json({ success: true, wishlist: user.wishlist, added: idx === -1 });
});
module.exports = r;


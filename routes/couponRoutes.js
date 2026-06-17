// couponRoutes.js
const express = require('express');
const r = express.Router();
const { Coupon } = require('../models/index');
const { protect, authorize } = require('../middleware/authMiddleware');
r.get('/validate/:code', protect, async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase(), isActive: true, endDate: { $gte: new Date() } });
  if (!coupon) return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
  res.json({ success: true, coupon });
});
r.get('/', protect, authorize('admin','superadmin'), async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, coupons });
});
r.post('/', protect, authorize('admin','superadmin'), async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, coupon });
});
r.put('/:id', protect, authorize('admin','superadmin'), async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, coupon });
});
r.delete('/:id', protect, authorize('admin','superadmin'), async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
module.exports = r;

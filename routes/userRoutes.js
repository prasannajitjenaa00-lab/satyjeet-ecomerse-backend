// userRoutes.js
const express = require('express');
const r = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

r.put('/profile', protect, async (req, res) => {
  const { name, phone, avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, phone, avatar }, { new: true });
  res.json({ success: true, user });
});
r.put('/change-password', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) {
    return res.status(400).json({ success: false, message: 'Incorrect current password' });
  }
  user.password = req.body.newPassword;
  await user.save();
  res.json({ success: true, message: 'Password changed' });
});
r.post('/address', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (req.body.isDefault) user.addresses.forEach(a => a.isDefault = false);
  user.addresses.push(req.body);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
});
r.put('/address/:id', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const addr = user.addresses.id(req.params.id);
  if (!addr) return res.status(404).json({ success: false, message: 'Address not found' });
  if (req.body.isDefault) user.addresses.forEach(a => a.isDefault = false);
  Object.assign(addr, req.body);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
});
r.delete('/address/:id', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.pull(req.params.id);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
});
module.exports = r;

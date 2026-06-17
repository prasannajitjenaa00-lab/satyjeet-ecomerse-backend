// bannerRoutes.js
const express = require('express');
const r = express.Router();
const { Banner } = require('../models/index');
const { protect, authorize } = require('../middleware/authMiddleware');
r.get('/', async (req, res) => {
  const q = { isActive: true };
  if (req.query.position) q.position = req.query.position;
  const banners = await Banner.find(q).sort({ order: 1 });
  res.json({ success: true, banners });
});
r.post('/', protect, authorize('admin','superadmin'), async (req, res) => {
  const banner = await Banner.create(req.body);
  res.status(201).json({ success: true, banner });
});
r.put('/:id', protect, authorize('admin','superadmin'), async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, banner });
});
r.delete('/:id', protect, authorize('admin','superadmin'), async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
module.exports = r;

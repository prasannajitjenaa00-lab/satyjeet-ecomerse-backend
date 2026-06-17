// categoryRoutes.js
const express = require('express');
const router = express.Router();
const { Category } = require('../models/index');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  const cats = await Category.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, categories: cats });
});
router.get('/:slug', async (req, res) => {
  const cat = await Category.findOne({ slug: req.params.slug });
  if (!cat) return res.status(404).json({ success: false, message: 'Not found' });
  res.json({ success: true, category: cat });
});
router.post('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  const cat = await Category.create(req.body);
  res.status(201).json({ success: true, category: cat });
});
router.put('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, category: cat });
});
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Category deleted' });
});
module.exports = router;

// brandRoutes.js
const express = require('express');
const r1 = express.Router();
const { Brand } = require('../models/index');
const { protect, authorize } = require('../middleware/authMiddleware');
r1.get('/', async (req, res) => { const b = await Brand.find({ isActive: true }); res.json({ success: true, brands: b }); });
r1.post('/', protect, authorize('admin','superadmin'), async (req, res) => { const b = await Brand.create(req.body); res.status(201).json({ success: true, brand: b }); });
r1.put('/:id', protect, authorize('admin','superadmin'), async (req, res) => { const b = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, brand: b }); });
r1.delete('/:id', protect, authorize('admin','superadmin'), async (req, res) => { await Brand.findByIdAndDelete(req.params.id); res.json({ success: true }); });
module.exports = r1;

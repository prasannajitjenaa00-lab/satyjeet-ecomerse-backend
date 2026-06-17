// adminRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, toggleUserBlock } = require('../controllers/adminController');
const { getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const adminOnly = [protect, authorize('admin', 'superadmin')];

router.get('/dashboard', ...adminOnly, getDashboardStats);
router.get('/users', ...adminOnly, getAllUsers);
router.put('/users/:id/block', ...adminOnly, toggleUserBlock);
router.get('/orders', ...adminOnly, getAllOrders);
router.put('/orders/:id/status', ...adminOnly, updateOrderStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, cancelOrder, createRazorpayOrder, createStripeIntent, verifyRazorpay, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);
router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/create-stripe-intent', createStripeIntent);
router.post('/verify-razorpay', verifyRazorpay);

module.exports = router;

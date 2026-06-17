const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createRazorpayOrder, createStripeIntent, verifyRazorpay } = require('../controllers/orderController');

router.post('/razorpay/order', protect, createRazorpayOrder);
router.post('/stripe/intent', protect, createStripeIntent);
router.post('/razorpay/verify', protect, verifyRazorpay);

module.exports = router;

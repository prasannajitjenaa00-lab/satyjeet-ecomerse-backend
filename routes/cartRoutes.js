// cartRoutes.js
const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, saveForLater, applyCoupon, removeCoupon } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeFromCart);
router.put('/save-later/:itemId', saveForLater);
router.post('/apply-coupon', applyCoupon);
router.delete('/remove-coupon', removeCoupon);

module.exports = router;

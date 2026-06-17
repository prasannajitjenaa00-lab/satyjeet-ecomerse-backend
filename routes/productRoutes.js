const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, searchSuggestions } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/search/suggestions', searchSuggestions);
router.get('/', getProducts);
router.get('/:slug', getProduct);
router.post('/', protect, authorize('admin', 'superadmin'), createProduct);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateProduct);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteProduct);

module.exports = router;

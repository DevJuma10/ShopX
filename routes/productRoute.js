const express = require('express')
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
isAdmin



router.post('/create-product', isAdmin, authMiddleware, createProduct)
router.get('/all-products', getAllProducts)
router.put('/:id',isAdmin, authMiddleware, updateProduct )
router.get('/:id', getProduct )
router.delete('/:id',isAdmin, authMiddleware, deleteProduct )










module.exports = router
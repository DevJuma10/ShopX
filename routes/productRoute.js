const express = require('express')
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
isAdmin



router.post('/create-product',authMiddleware, isAdmin,  createProduct)
router.get('/all-products', getAllProducts)
router.put('/update-product/:id',authMiddleware, isAdmin,  updateProduct )
router.get('/:id', getProduct )
router.delete('/:id', authMiddleware, isAdmin,  deleteProduct )










module.exports = router
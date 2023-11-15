const express = require('express')
const { createProduct, getAllProducts, getProduct } = require('../controllers/productController')
const router = express.Router();



router.post('/create-product', createProduct)
router.get('/all-products', getAllProducts)
router.get('/:id', getProduct )










module.exports = router
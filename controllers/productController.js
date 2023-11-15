const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler')



const createProduct = asyncHandler( async (req,res) => {
    try {
        const newProduct = await Product.create(req.body)


        res.status(201).json({
            message:'product added',
            product: newProduct
        })
        
    } catch (error) {
        throw new Error( error )
        
    }


   
})



const getAllProducts = asyncHandler (async ( req, res ) => {
    const products =  await Product.find()
    if(!products){
        return res.status(404).send('No products found');
        }
        res.status(200).json({
            success : true ,
            count   : products.length ,
            data    : products
        });
        });


const getProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Not Found| No product found')
    }
    res.status(200).json({
        success : true ,
        data : product
    })
})



























module.exports = { createProduct, getAllProducts, getProduct}
const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')



const createProduct = asyncHandler( async (req,res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
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
    try {

        //  FILTERING
    const queryObj = {...req.query}
    const excludedFields = ['sort', 'page','fields','limit']
    excludedFields.forEach((el) => delete queryObj[el] )

    let  queryStr = JSON.stringify(queryObj)
    queryStr =  queryStr.replace(/\b(gte|gt|lte|lt)\b/g,  (match)  => `$${match}`)
    let query = Product.find(JSON.parse(queryStr))

    //  SORTING
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    // PAGIINATION
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page -1) * limit
    const endIndex = page * limit
    const total = await Product.countDocuments()
    query = query.skip(startIndex).limit(limit)

    if(req.query.page &&  startIndex  >=  total){
        throw new Error("Not Found|Page doesn't exist")
    }
    // LIMITING  FIELDS
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        query = query.select(fields)
        } else {
        query = query.select('-__v')
        }
    
        
        
        //  EXECUTING QUERY
    const products =  await query
    if(!products){
        return res.status(404).send('No products found');
        }
        res.status(200).json({
            success : true ,
            count   : products.length ,
            data    : products
        });
        
    } catch (error) {
        throw new  Error(error)
    }
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



const updateProduct = asyncHandler ( async (req, res) => {
   try {

    if (req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {new:true}
        );

    res.status(200).json({
        success : true ,
        data : product
    })
    
   } catch (error) {
        throw new Error (error)
   }
})


const deleteProduct = asyncHandler( async( req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send ('Not Found | No product found')
            }
            res.status(201).json ({
                success : true ,
                message : 'Deleted Successfully'
                })

        
    } catch (error) {
        throw new Error (error)
    }
})
























module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct}
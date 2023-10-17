const User =  require('../models/userModel');
const jwt  = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler( async ( req, res, next ) => {
    let token;
    console.log(process.env.JWT_SECRET)
    if ( req?.headers?.authorization?.startsWith( "Bearer" )){
        token = req.headers.authorization.split(" ")[1]
        
        try {
            if (token) {
                const decodedToken = jwt.verify(token, 'defaultSecret')
                const user = await User.findById(decodedToken?.id)
                req.user = user
                
                next()
            }
            
        } catch (error) {
            throw new Error("Not Authorized |Token expired, Please login again")
        }

    } else {
        throw new Error( "There's No Token attached to the header")
    }
})


module.exports = { authMiddleware }

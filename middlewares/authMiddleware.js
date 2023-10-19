const User =  require('../models/userModel');
const jwt  = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler( async ( req, res, next ) => {
    let token;
    if ( req?.headers?.authorization?.startsWith( "Bearer" )){
        token = req.headers.authorization.split(" ")[1]
        
        try {
            if (token) {
                try{
                    const decodedToken = jwt.verify(token, 'defaultSecret')
                    console.log(decodedToken)
                    const user = await User.findById({_id: decodedToken?.id})
                    req.user = user
                    
                } catch(error) {
                    console.log(error)
                }
            }
            
        } catch (error) {
            throw new Error("Not Authorized |Token expired, Please login again")
        }

    } else {
        throw new Error( "There's No Token attached to the header")
    }

    next()
})


  


const isAdmin = asyncHandler( async ( req, res, next ) => {
    const { email } = req.user
    const adminUser = await User.findOne({ email })
    if(adminUser.role !== 'admin') {
        throw new Error ("You are not an admin")
    } else {
        next()
    }

    
    next()

})



module.exports = { authMiddleware, isAdmin }

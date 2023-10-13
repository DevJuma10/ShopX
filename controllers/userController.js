const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler( async (req, res) => {

/**
     * Handles the creation of a new user.
     * 
     * @param {Object} req - The HTTP request object containing the user data in the `body` property.
     * @param {Object} res - The HTTP response object used to send the JSON response.
     * @returns {Object} - If a user is created successfully, returns a JSON response with the newly created user.
     *                     If a user with the given email already exists, returns a JSON response with a status code of 409, a failure message, and a success flag set to false.
     */

    const { email } = req.body;
    const findUser = await User.findOne({email: email});

    if(!findUser) {
        //Create User
        const newUser = await User.create(req.body);
        res.status(201).json(newUser)

    } else {
       throw new Error("User Already Exists")
        
    }
})





const loginUser = asyncHandler ( async ( req, res) => {

    const {email, password} = req.body;
   // check if user exits
   const findUser = await User.findOne({email})

   if(findUser && findUser.isPasswordMatched(password)) {
        res.status(200).json({
            ...findUser.toObject(),
            token: await generateToken(findUser?._id)
        })
   } else {
    throw new Error ("Invalid Credentials")
   }

} )

  

module.exports = { createUser, loginUser }


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



// Fetch all users

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json({
        status:'sucess',
        data: allUsers
    })
    } catch (error) {
        throw new Error(error)
    }
})


// Fetch a single user
const getUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const getUser = await User.findById( id )
        res.status(200).json({
            status: 'sucess',
            data: getUser
        })
       

    } catch (error) {
        throw new Error(error)
        
    }
})


const deleteUser = asyncHandler( async ( req, res) => {
    try {
        const { id } = req.params
        await User.findOneAndDelete( id )
        res.status(204).json({
            status:'success',
            data: 'No Content'
        }) 
    } catch (error) {
        throw new Error(error)
    }
}) 





module.exports = { 
                    createUser, 
                    loginUser , 
                    getAllUsers,
                    getUser,
                    deleteUser
                
                }


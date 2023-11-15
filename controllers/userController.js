const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongoDbId')


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
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(findUser.id,
         {
            refreshToken: refreshToken
    }, 
    {new: true})

    res.cookie('refreshToken', refreshToken, {

        httpOnly: true,
        maxAge:72*60*60*1000
    })
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
        validateMongoDbId( id );
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


const updateUser = asyncHandler( async ( req, res ) => {
    const { id } = req.params
    validateMongoDbId( id ) ;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        },
        { 
            new: true
        })

        res.status(200).json({
            status: 'success',
            data: updatedUser
        })
        
    } catch (error) {
        throw new Error (error)
    }

})

const blockUser = asyncHandler(  async  (req, res) => {
    const id   = req.params.id
    validateMongoDbId( id ) ;

    
    try {
       const user =  await User.findByIdAndUpdate(id   ,   {
            isBlocked:true
        },
        {new: true})
        console.log(user)

        res.status(200).json({
            message: 'user blocked',
        })

    } catch (error) {
        throw new Error(error)
    }
} )

const unblockUser = asyncHandler(  async  (req, res) => {
    const id   = req.params.id
    validateMongoDbId( id ) ;

    
    try {
       const user =  await User.findByIdAndUpdate(id   ,   {
            isBlocked:false
        },
        {new: true})
        console.log(user)

        res.status(200).json({
            message: 'user unblocked',
        })

    } catch (error) {
        throw new Error(error)
    }
} )

// const handleRefreshToken = asyncHandler(async (req, res) => {
//     const cookie = req.cookies;
//     if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
//     const refreshToken = cookie.refreshToken;
//     const user = await User.findOne({ refreshToken });
//     if (!user) throw new Error(" No Refresh token present in db or not matched");
//     jwt.verify(refreshToken, 'defaultSecret', (err, decoded) => {
//       if (err || user.id !== decoded.id) {
//         throw new Error("There is something wrong with refresh token");
//       }
//       const accessToken = generateToken(user?._id);
//       res.json({ accessToken });
//     });
//   });


const handleRefreshToken = asyncHandler ( async (req, res, next) => {
    // check for refresh token in cookies
    const cookie = req.cookies;
    if (!cookie.refreshToken){
        throw new Error("Not Found| No Refresh token in cookies")

    } 
    // use the token to find authenticated user
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({refreshToken})
    if(!user)throw new Error('Unauthorized | Invalid Token')

    const decodedToken = jwt.verify(refreshToken, 'defaultSecret');
    if(user._id != decodedToken.id )throw new Error ('There is something wrong with the refresh token')            
       
    // generate a new access token and save it on the users document
     const accessToken = await generateRefreshToken(user?.id).then((result) => {
        return result;
    })

    res.cookie('refreshToken', accessToken, {

        httpOnly: true,
        maxAge:72*60*60*1000
    })

    // Update the users document with the new access token
    const updatedUser = await User.findByIdAndUpdate(user.id, {
                refreshToken: accessToken
            }, {new:true})

            console.log(updateUser)


            res.status(200).json({
                message: 'success',
                data:updatedUser
                
            })
        } )

    
    
    






















// const handleRefreshToken = asyncHandler ( async (req, res) => {
//     const cookie = req.cookies
//     if(!cookie?.refreshToken){
//         throw new Error("No Refrsh Token in cookies")
//     }
//     const refreshToken = cookie.refreshToken
//     const user = await User.findOne({refreshToken})
//     if (!user) {
//         throw new Error('Invalid Refresh token')
//     }
//     jwt.verify(refreshToken, 'defaultSecret', (err, decoded) => {

//         if (err || user.id !== decoded.id) {
//             throw new Error('There\'s Something wrong with the refresh token')
//         }
//         // generate a new access token and send it to the client
//         const accessToken =  generateToken(user?.id);
//         console.log(accessToken)
        
        
//         res.json({accessToken})

//     })

// })

// const handleRefreshToken = asyncHandler(async (req, res) => {
//     const cookie = req.cookies;
//     if (!cookie?.refreshToken) {
//         throw new Error("No Refresh Token in cookies");
//     }

//     const refreshToken = cookie.refreshToken;
//     const user = await User.findOne({ refreshToken });

//     if (!user) {
//         throw new Error('Invalid Refresh token');
//     }

//     try {
//         const decoded = await jwt.verify(refreshToken, 'defaultSecret');

//         if (user.id !== decoded.id) {
//             throw new Error('There\'s Something wrong with the refresh token');
//         }

//         // generate a new access token and send it to the client
//         const accessToken = generateToken(user?.id);
//         console.log(accessToken);

//         res.json({ accessToken });
//     } catch (err) {
//         // Handle errors from jwt.verify
//         console.error(err);
//         res.status(401).json({ error: 'Invalid refresh token' });
//     }
// });



module.exports = { 
                    createUser, 
                    loginUser , 
                    getAllUsers,
                    getUser,
                    deleteUser,
                    updateUser,
                    blockUser,
                    unblockUser,
                    handleRefreshToken
                
                }


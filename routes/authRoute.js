const express = require('express');
const { handleRefreshToken, createUser, loginUser,updatePassword,forgotPasswordToken, resetPassword, getAllUsers, getUser, deleteUser, updateUser,  blockUser, unblockUser, logout } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router();


// AUTH ROUTES
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser)
router.post('/forgot-password',forgotPasswordToken)
router.put('/reset-password/:resetToken',  resetPassword)
router.put('/update-password',authMiddleware, updatePassword)
router.get('/logout', logout)


// OTHER ROUTES
router.get('/refresh-token', handleRefreshToken)
router.get('/all-users',authMiddleware, isAdmin, getAllUsers);
router.get('/:id', getUser)
router.delete('delete-user/:id',authMiddleware, deleteUser)
router.put('/update-user/:id',authMiddleware, updateUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser)
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser)







module.exports = router
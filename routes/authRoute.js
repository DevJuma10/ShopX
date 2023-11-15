const express = require('express');
const { handleRefreshToken, createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser,  blockUser, unblockUser, logout } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router();


// AUTH ROUTES
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser)


// OTHER ROUTES
router.get('/refresh-token', handleRefreshToken)
router.get('/all-users',authMiddleware, isAdmin, getAllUsers);
router.get('/logout', logout)
router.get('/:id', getUser)
router.delete('delete-user/:id',authMiddleware, deleteUser)
router.put('/update-user/:id',authMiddleware, updateUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser)
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser)







module.exports = router
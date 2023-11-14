const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser,  blockUser, unblockUser } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router();


// AUTH ROUTES
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser)


// OTHER ROUTES
router.get('/all-users',authMiddleware, isAdmin, getAllUsers);
router.get('/:id', getUser)
router.delete('delete-user/:id',authMiddleware, deleteUser)
router.put('/update-user/:id',authMiddleware, updateUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser)
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser)







module.exports = router
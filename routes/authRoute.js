const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router();


// AUTH ROUTES
router.post('/register', createUser);
router.post('/login', loginUser)


// OTHER ROUTES
router.get('/all-users',authMiddleware, isAdmin, getAllUsers);
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)







module.exports = router
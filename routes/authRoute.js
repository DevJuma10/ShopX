const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();


// AUTH ROUTES
router.post('/register', createUser);
router.post('/login', loginUser)


// OTHER ROUTES
router.get('/all-users', getAllUsers);
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)







module.exports = router
// Route for user login
// routes/auth.js

const { verifyToken } = require("../middleware/auth")

const express = require('express');
const router = express.Router();


// Import the User model for database operations

const UserController = require("../controllers/user")

// Route for user login
router.post('/login',  UserController.Login)

// Route for user registration
router.post('/register',  UserController.Register)



router.post('/test', verifyToken , UserController.wtf)



module.exports = router;

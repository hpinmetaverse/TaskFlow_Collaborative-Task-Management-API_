const express = require('express');
// Import both registerUser and loginUser from the controller
const { registerUser, loginUser } = require('../controllers/userController'); 

const router = express.Router();

// Define the route for user registration
router.post('/register', registerUser);

// Define the route for user login
router.post('/login', loginUser); // Add this new login route

module.exports = router;
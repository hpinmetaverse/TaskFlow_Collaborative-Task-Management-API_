const express = require('express');
const { registerUser } = require('../controllers/userController'); // Import registerUser function

const router = express.Router(); // Create an Express Router to handle these specific routes

// Define the route for user registration
// This route will handle POST requests to /register
router.post('/register', registerUser);

module.exports = router; // Export the router so index.js can use it
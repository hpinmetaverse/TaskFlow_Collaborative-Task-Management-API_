// controllers/userController.js (FULL & CORRECT registerUser function)

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Pulled securely from .env

// --- User Registration Function ---
const registerUser = async (req, res) => {
    try {
        // 1. Get user data from the request body
        const { username, email, password } = req.body;

        // 2. Basic validation: Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // 3. Check if user already exists (by email)
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }
        // 4. Check if username is already taken
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }

        // 5. Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Create a new user instance
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        // 7. Save the user to the database
        await user.save();

        // 8. Respond with success
        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        console.error("Error during registration:", err.message);
        // Check for MongoDB duplicate key error (code 11000)
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'A user with this email or username already exists.' });
        }
        res.status(500).send('Server Error during registration.');
    }
};

// --- User Login Function (already done) ---
const loginUser = async (req, res) => {
    // ... (your existing loginUser code here) ...
    // Ensure this part is correctly present in your file.
};

// --- EXPORT FUNCTIONS ---
module.exports = {
    registerUser,
    loginUser
};
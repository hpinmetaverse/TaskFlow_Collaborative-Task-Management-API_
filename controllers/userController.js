const User = require('../models/user'); // Import our User model
const bcrypt = require('bcryptjs');     // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');   // Import jsonwebtoken for tokens

// Secret key for JWT (CRITICAL: Use a very strong, random string in a real app)
// For now, this is okay. In a real app, this would be in an environment variable.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key'; 

// --- User Registration Function ---
const registerUser = async (req, res) => {
    try {
        // 1. Get user data from the request body (what the user sent from Postman/frontend)
        const { username, email, password } = req.body;

        // 2. Basic validation: Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // 3. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }
        user = await User.findOne({ username }); // Also check for unique username
        if (user) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }

        // 4. Hash the password for security
        const salt = await bcrypt.genSalt(10); // Generate a salt (random string)
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

        // 5. Create a new user instance based on our User model
        user = new User({
            username,
            email,
            password: hashedPassword // Store the hashed password
        });

        // 6. Save the user to the database
        await user.save();

        // 7. Respond with success
        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during registration');
    }
};

// Export the functions so our routes can use them
module.exports = {
    registerUser,
    // loginUser will go here later
};
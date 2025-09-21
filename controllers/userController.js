// controllers/userController.js (CORRECTED AND CLEANED)

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// --- User Registration Function ---
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is already taken' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully!' });
    } catch (err) {
        console.error("Error during registration:", err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'A user with this email or username already exists.' });
        }
        res.status(500).send('Server Error during registration.');
    }
};

// --- User Login Function ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // <-- CORRECTED: using '=' instead of 'of'

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, msg: 'Logged in successfully!' });
            }
        );

    } catch (err) {
        console.error('--- LOGIN ERROR ---', err.message);
        res.status(500).send('Server Error during login');
    }
};

// --- EXPORT FUNCTIONS ---
module.exports = {
    registerUser,
    loginUser
};
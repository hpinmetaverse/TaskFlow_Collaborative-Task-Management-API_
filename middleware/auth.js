const jwt = require('jsonwebtoken');

// Make sure this JWT_SECRET is pulled securely from your .env file
const JWT_SECRET = process.env.JWT_SECRET; 

// Middleware function to protect routes
const protect = (req, res, next) => {
    // 1. Get token from header
    // The token is usually sent in the 'Authorization' header like: 'Bearer TOKEN_STRING'
    const token = req.header('x-auth-token'); 

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        // jwt.verify() will decode the token using our secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // Add the decoded user (containing their ID) to the request object
        // So, any subsequent route handler can access req.user.id
        req.user = decoded.user; 
        next(); // Move to the next middleware/route handler

    } catch (err) {
        // If verification fails (e.g., token expired, wrong secret)
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = protect; // Export the middleware
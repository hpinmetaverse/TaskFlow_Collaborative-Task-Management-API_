const mongoose = require('mongoose');

// Define the blueprint (schema) for a User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // No two users can have the same username
        trim: true,   // Remove whitespace from start/end
        minlength: 3  // Minimum length for username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Store emails in lowercase
        // Simple email validation regex (can be more robust)
        match: [/.+@.+\..+/, 'Please fill a valid email address'] 
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export it so we can use it in other files


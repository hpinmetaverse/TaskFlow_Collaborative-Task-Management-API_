const mongoose = require('mongoose');

// Define the blueprint (schema) for a Task
const taskSchema = new mongoose.Schema({
    user: { // The user who created this task
        type: mongoose.Schema.Types.ObjectId, // This stores the ID of the User
        ref: 'User', // This tells Mongoose that the ID refers to the 'User' model
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // Task can only have these statuses
        default: 'pending'
    },
    dueDate: {
        type: Date, // Optional due date
        default: null
    }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Create the Task model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // Export it so we can use it in other files
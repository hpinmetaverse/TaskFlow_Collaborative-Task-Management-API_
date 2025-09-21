// models/Task.js (UPDATED to link to Workspace)

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // --- NEW FIELD ---
    workspace: { // The workspace this task belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true // Every task MUST belong to a workspace
    },
    // --- END NEW FIELD ---
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
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
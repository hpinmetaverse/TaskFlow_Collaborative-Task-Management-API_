const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        trim: true
    },
    owner: { // The user who created this workspace
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [ // Array of user IDs who are members of this workspace
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: { // e.g., 'admin', 'member' - can be expanded
                type: String,
                enum: ['owner', 'admin', 'member'],
                default: 'member'
            }
        }
    ]
}, {
    timestamps: true
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
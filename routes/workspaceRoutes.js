const express = require('express');
const { createWorkspace, getMyWorkspaces, inviteMember } = require('../controllers/workspaceController');
const protect = require('../middleware/auth'); // Auth middleware

const router = express.Router();
// All workspace routes are protected
router.post('/', protect, createWorkspace);         // Create new workspace
router.get('/', protect, getMyWorkspaces);          // Get all workspaces for user
router.post('/:workspaceId/invite', protect, inviteMember); // Invite user to a specific workspace
module.exports = router;
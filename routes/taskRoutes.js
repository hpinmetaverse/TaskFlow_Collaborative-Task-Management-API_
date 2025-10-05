const express = require('express');
const { createTask, getMyTasks, updateTask, deleteTask, getTasksByWorkspace } = require('../controllers/taskController');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getMyTasks);

// --- NEW ROUTE ---
// This route must be placed BEFORE the '/:id' route to avoid conflicts
router.get('/workspace/:workspaceId', protect, getTasksByWorkspace);
// --- END NEW ROUTE ---

router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
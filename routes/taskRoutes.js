const express = require('express');
const { createTask, getMyTasks } = require('../controllers/taskController'); // Import task functions
const protect = require('../middleware/auth'); // Import our auth middleware

const router = express.Router();

// Route to create a new task
// It's PROTECTED: 'protect' middleware runs first, then createTask
router.post('/', protect, createTask); 

// Route to get all tasks for the logged-in user
// It's PROTECTED: 'protect' middleware runs first, then getMyTasks
router.get('/', protect, getMyTasks);

module.exports = router;
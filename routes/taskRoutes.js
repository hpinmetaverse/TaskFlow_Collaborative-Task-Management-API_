const express = require('express');
const { createTask, getMyTasks, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getMyTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
const Task = require('../models/Task');
const mongoose = require('mongoose');

// --- Create a New Task ---

// controllers/taskController.js (CORRECTED createTask)

const createTask = async (req, res) => {
    try {
        // We now require a workspace ID from the request body
        const { title, description, status, dueDate, workspace } = req.body; 

        // 1. Basic validation - NOW INCLUDES WORKSPACE
        if (!title || !workspace) {
            return res.status(400).json({ msg: 'Task title and workspace ID are required' });
        }

        // 2. Create new task instance
        const newTask = new Task({
            user: req.user.id,
            workspace, // The workspace ID from the request body
            title,
            description,
            status,
            dueDate
        });

        // 3. Save the task to the database
        const task = await newTask.save();
        res.status(201).json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during task creation');
    }
};
// --- Get All Tasks for the Logged-in User ---
const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error retrieving tasks');
    }
};

// --- NEW: Update a Task ---
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid Task ID' });
        }

        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to update this task' });
        }

        task.title = title || task.title;
        task.description = description === undefined ? task.description : description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        await task.save();
        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during task update');
    }
};

// --- NEW: Delete a Task ---
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid Task ID' });
        }

        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.json({ msg: 'Task removed successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during task deletion');
    }
};

// Export all functions
module.exports = {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask
};
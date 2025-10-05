// controllers/taskController.js (FULL & CORRECT VERSION)

const Task = require('../models/Task');
const Workspace = require('../models/Workspace');
const mongoose = require('mongoose');

// --- Create a New Task ---
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, workspace } = req.body;
        if (!title || !workspace) {
            return res.status(400).json({ msg: 'Task title and workspace ID are required' });
        }
        const newTask = new Task({
            user: req.user.id,
            workspace,
            title,
            description,
            status,
            dueDate
        });
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

// --- Update a Task ---
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

// --- Delete a Task ---
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

// --- NEW: Get All Tasks for a Specific Workspace ---
const getTasksByWorkspace = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ msg: 'Invalid Workspace ID' });
        }
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ msg: 'Workspace not found' });
        }
        const isMember = workspace.members.some(
            (member) => member.user.toString() === req.user.id
        );
        if (!isMember) {
            return res.status(403).json({ msg: 'Not authorized to view tasks in this workspace' });
        }
        const tasks = await Task.find({ workspace: workspaceId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error retrieving tasks by workspace');
    }
};

// Export ALL functions
module.exports = {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
    getTasksByWorkspace
};
const Task = require('../models/Task'); // Import our Task model

// --- Create a New Task ---
const createTask = async (req, res) => {
    try {
        // We get the user ID from req.user, which was added by our 'protect' middleware
        const { title, description, status, dueDate } = req.body;

        // 1. Basic validation
        if (!title) {
            return res.status(400).json({ msg: 'Task title is required' });
        }

        // 2. Create new task instance
        const newTask = new Task({
            user: req.user.id, // Assign the task to the logged-in user
            title,
            description,
            status,
            dueDate
        });

        // 3. Save the task to the database
        const task = await newTask.save();

        // 4. Respond with the created task
        res.status(201).json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during task creation');
    }
};

// --- Get All Tasks for the Logged-in User ---
const getMyTasks = async (req, res) => {
    try {
        // Find all tasks where the 'user' field matches the logged-in user's ID
        // .sort({ createdAt: -1 }) sorts by newest first
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); 
        res.json(tasks); // Respond with the list of tasks

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error retrieving tasks');
    }
};

// Export the functions
module.exports = {
    createTask,
    getMyTasks
};
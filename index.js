// index.js (Final Update for Task Management)

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(express.json());
// --- END MIDDLEWARES ---

const dbConnectionString = process.env.MONGO_URI; 

mongoose.connect(dbConnectionString)
  .then(() => {
    console.log("✅ MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Add the task routes
// --- END ROUTES ---

app.get('/', (req, res) => {
    res.send('Server is running and connected to DB. Task management ready!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is now live on http://localhost:${PORT}`);
});
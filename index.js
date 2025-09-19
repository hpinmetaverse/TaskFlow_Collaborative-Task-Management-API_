// index.js (Final Update for User Registration)

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // 1. Import our authentication routes

const app = express();
const PORT = 3000;

// --- MIDDLEWARES ---
// This line is CRITICAL: It tells your Express app to understand incoming JSON data in requests
app.use(express.json());
// --- END MIDDLEWARES ---

const dbConnectionString = "mongodb+srv://taskflow-admin:Gaju%401320@cluster0.t2tkdkg.mongodb.net/taskflowDB?retryWrites=true&w=majority";
// NOTE: Remember to update this with your SECURE password after changing it in Atlas!

mongoose.connect(dbConnectionString)
  .then(() => {
    console.log("✅ MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// --- ROUTES ---
// 2. Tell Express to use our authRoutes for any requests starting with /api/auth
app.use('/api/auth', authRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Server is running and connected to DB. User registration ready!');
});
// --- END ROUTES ---

app.listen(PORT, () => {
    console.log(`🚀 Server is now live on http://localhost:${PORT}`);});
// index.js (UPDATED for Environment Variables)

require('dotenv').config(); // MUST BE THE FIRST LINE to load .env variables

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // Good practice to use env var for port too

// --- MIDDLEWARES ---
app.use(express.json());
// --- END MIDDLEWARES ---

// Now reading from environment variables!
const dbConnectionString = process.env.MONGO_URI; 
// CRITICAL: Ensure you've changed your password in Atlas and updated .env!

mongoose.connect(dbConnectionString)
  .then(() => {
    console.log("✅ MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// --- ROUTES ---
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running and connected to DB. User registration ready!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is now live on http://localhost:${PORT}`);
});
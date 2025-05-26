require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const registerRoute = require('./routes/registerRoute');
const voteRoute = require('./routes/voteRoute');
const schoolRoutes = require('./routes/schools');

const app = express();


// ====== Middlewares ======
app.use(cors());
app.use(express.json());

// ====== Static Files ======
// Serve frontend static files (e.g., vote.html, css, js)
app.use(express.static(path.join(__dirname, '../public')));

// Serve Assets folder (images like logo, icons, etc.)
app.use('/Assets', express.static(path.join(__dirname, '../public/Assets')));

// ====== API Routes ======
app.use('/api/register', registerRoute);
app.use('/api/vote', voteRoute);
app.use('/api/schools', schoolRoutes);

// ====== MongoDB Connection & Server Start ======
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const registerRoute = require('./routes/registerRoute');
const voteRoute = require('./routes/voteRoute');
const schoolRoutes = require('./routes/schools');
const paymentRoute = require('./routes/payment');

const app = express();

// ====== Middlewares ======
app.use(cors({
  origin: ['https://braintreearena.com', 'https://www.braintreearena.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ====== Route Registration ======
app.use('/api/payment', paymentRoute);
app.use('/api/register', registerRoute);
app.use('/api/vote', voteRoute);
app.use('/api/schools', schoolRoutes);

// ====== Static Files ======
app.use(express.static(path.join(__dirname, '../public')));
app.use('/Assets', express.static(path.join(__dirname, '../public/assets/Assets')));

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

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const registerRoute = require('./routes/registerRoute');
const voteRoute = require('./routes/voteRoute');
const schoolRoutes = require('./routes/schools');

const app = express();
const paymentRoute = require('./routes/payment');
const verifyPaymentRoutes = require('./routes/verify-payment');



// ====== Middlewares ======
app.use(cors({
  origin: ['https://braintreearena.com', 'https://www.braintreearena.com'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use('/api/payment', paymentRoute);

app.use('/api/verify-payment', verifyPaymentRoutes);

// ====== Static Files ======
// Serve frontend static files (e.g., vote.html, css, js)
app.use(express.static(path.join(__dirname, '../public')));

// Serve Assets folder (images like logo, icons, etc.)
app.use('/Assets', express.static(path.join(__dirname, '../public/assets/Assets')));

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

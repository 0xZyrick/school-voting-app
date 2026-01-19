const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { schoolName, email, phone, lga, state, paymentReference } = req.body;

    // ✅ Validate input first
    if (!schoolName || !email || !phone || !lga || !state ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newSchool = new School({
      schoolName,
      email,
      phone,  // ✅ Store phone too
      lga,
      state
    });

    await newSchool.save();

    res.status(201).json({ message: 'School registered successfully!' });
  } catch (err) {
    console.error("❌ Error saving school:", err.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { schoolName, email, lga, state, } = req.body;

    // ✅ Validate input first
    if (!schoolName || !email || !lga || !state ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // ✅ Create and save
    const newSchool = new School({
      schoolName,
      email,
      lga,
      state,
    });

    await newSchool.save();

    // ✅ Send success response
    res.status(201).json({ message: 'School registered successfully!' });
  } catch (err) {
    console.error("❌ Error saving school:", err.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { schoolName, email, location, studentClass, contestants } = req.body;

    // ✅ Validate input first
    if (!schoolName || !email || !location || !studentClass || !contestants || contestants.length !== 3) {
      return res.status(400).json({ message: 'All fields are required including 3 contestants.' });
    }

    // ✅ Create and save
    const newSchool = new School({
      schoolName,
      email,
      location,
      studentClass,
      contestants,
      votes: 0
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

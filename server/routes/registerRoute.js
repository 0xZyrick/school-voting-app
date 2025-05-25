const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { schoolName, email, location } = req.body;

    if (!schoolName || !email || !location) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save school
    const newSchool = new School({ schoolName, email, location });
    await newSchool.save();

    res.status(201).json({ message: 'School registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

module.exports = router;

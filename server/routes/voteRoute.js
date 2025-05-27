const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST vote for a school by ID
router.post('/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: 'School not found' });

    school.votes += 1;
    await school.save();

    res.status(200).json({ message: 'Vote submitted', votes: school.votes });
  } catch (err) {
    console.error('❌ Vote error:', err);
    res.status(500).json({ message: 'Error submitting vote' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const School = require('../models/School');

// POST vote for a school by ID
router.post('/:id', async (req, res) => {
  try {
    const schoolId = req.params.id;
    const { contestantIndex } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: 'School not found' });

    if (
      contestantIndex < 0 ||
      contestantIndex >= school.contestants.length
    ) {
      return res.status(400).json({ message: 'Invalid contestant index' });
    }

    // ✅ Increment vote for specific contestant
    school.contestants[contestantIndex].votes += 1;

    await school.save();

    res.status(200).json({
      message: 'Vote submitted',
      votes: school.contestants[contestantIndex].votes
    });
  } catch (err) {
    console.error('❌ Vote error:', err);
    res.status(500).json({ message: 'Error submitting vote' });
  }
});


module.exports = router;

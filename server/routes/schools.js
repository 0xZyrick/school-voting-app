const express = require('express');
const router = express.Router();
const School = require('../models/School');

// GET /api/schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find().sort({ votes: -1 }); // Most votes on top
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching schools' });
  }
});

module.exports = router;

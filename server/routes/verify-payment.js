const express = require('express');
const router = express.Router();
const axios = require('axios');
const School = require('../models/School'); // we may still use school voting system for this demo

// Verify Paystack payment
router.post('/', async (req, res) => {
  const { reference, schoolId, activity, votesPurchased } = req.body;

  if (!reference || !schoolId || !activity || !votesPurchased) {
    return res.status(400).json({ message: 'Incomplete payment data provided' });
  }

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });

    const paymentData = response.data;

    if (paymentData.status && paymentData.data.status === 'success') {
      // Update votes
      const school = await School.findById(schoolId);
      if (!school) {
        return res.status(404).json({ message: 'School not found' });
      }

      if (!school.votes.hasOwnProperty(activity)) {
        return res.status(400).json({ message: 'Activity not found in school record' });
      }

      school.votes[activity] += votesPurchased;
      await school.save();

      return res.status(200).json({
        message: 'Payment verified and votes updated successfully',
        updatedVotes: school.votes[activity]
      });

    } else {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

  } catch (error) {
    console.error("❌ Paystack verification error:", error);
    return res.status(500).json({ message: 'Server error during verification' });
  }
});

module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();
const School = require('../models/School');

// POST /api/payment/verify
router.post('/verify', async (req, res) => {
  const { reference, schoolId, activity, voteCount } = req.body;

  // Validate inputs
  if (!reference || !schoolId || !activity || !votes) {
    return res.status(400).json({ message: 'Incomplete request.' });
  }

  try {
    // Verify payment with Paystack
    const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` // Use your Paystack secret key here
      }
    });

    const data = paystackResponse.data;

    if (data.status && data.data.status === "success") {
      // Payment confirmed ✅

      const school = await School.findById(schoolId);
      if (!school) return res.status(404).json({ message: 'School not found' });

      if (!school.votes.hasOwnProperty(activity)) {
        return res.status(400).json({ message: 'Activity not found in school record' });
      }

      // Increment votes by voteCount
      school.votes[activity] += parseInt(votes);
      await school.save();

      res.status(200).json({ message: 'Payment verified and votes updated successfully.' });
    } else {
      res.status(400).json({ message: 'Payment not verified.' });
    }
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;

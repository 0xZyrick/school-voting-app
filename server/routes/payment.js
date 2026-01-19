const express = require('express');
const axios = require('axios');
const router = express.Router();
const School = require('../models/School');

// POST /api/payment/verify
router.post("/verify", async (req, res) => {
  const { reference, schoolId, activity, votes } = req.body;

  console.log("⚡ VERIFY ENDPOINT INPUTS:", {
    reference,
    schoolId,
    activity,
    votes,
  });

  if (!reference || !schoolId || !activity || !votes) {
    return res.status(400).json({ message: "Incomplete request." }); 
  }

  try {
    // ✅ 1. VERIFY PAYMENT
    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );
    const data = paystackResponse.data;

    if (!data?.status || data.data?.status !== "success") {
      console.error("❌ Payment not verified:", data);
      return res.status(400).json({ message: "Payment not verified." });
    }

    // ✅ 2. FIND SCHOOL
    const school = await School.findById(schoolId);
    if (!school) {
      console.error("❌ School not found:", schoolId);
      return res.status(404).json({ message: "School not found" }); 
    }

    if (!school.votes) {
      console.error("❌ school.votes is undefined:", school);
      return res.status(500).json({ message: "school.votes is undefined" }); 
    }

    // ✅ 3. CHECK ACTIVITY
    if (!school.votes.hasOwnProperty(activity)) {
      console.error("❌ Activity not found:", activity);
      return res.status(400).json({ message: "Activity not found in school record" }); 
    }

    // ✅ 4. UPDATE VOTES
    school.votes[activity] += parseInt(votes);
    await school.save();

    res.status(200).json({ message: "Payment verified and votes updated successfully." });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message }); 
  }
});


module.exports = router;

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },   // ✅ NEW FIELD
  lga: { type: String, required: true },
  state: { type: String, required: true },
  votes: {
    "Debate": { type: Number, default: 0 },
    "Creative writing": { type: Number, default: 0 },
    "Poetry competition": { type: Number, default: 0 },
    "Singing competition": { type: Number, default: 0 },
    "Cultural dance": { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);

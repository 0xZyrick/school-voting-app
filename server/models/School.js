const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: String,
  email: String,
  lga: String,
  state: String,
  votes: {
    "Debate": { type: Number, default: 0 },
    "Creative Writing": { type: Number, default: 0 },
    "PoetryCompetition": { type: Number, default: 0 },
    "SingingComeptition" : { type: Number, default: 0 },
    "CulturalDance": { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
const mongoose = require('mongoose'); 

const schoolSchema = new mongoose.Schema({
  schoolName: String,
  email: String,
  lga: String,
  state: String,
  votes: {
    "Debate": { type: Number, default: 0 },
    "Creative writing": { type: Number, default: 0 },
    "Poetry competition": { type: Number, default: 0 },
    "Singing competition": { type: Number, default: 0 },
    "Cultural dance": { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: String,
  email: String,
  location: String,
  studentClass: String,
  contestants: [
    {
      name: String,
      activity: String
    }
  ],
  votes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);

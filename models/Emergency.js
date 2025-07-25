const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  type: String,
  location: String,
  description: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Emergency', EmergencySchema);

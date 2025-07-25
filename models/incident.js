// models/Incident.js
const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  reporterName: String,
  location: String,
  details: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Incident', IncidentSchema);

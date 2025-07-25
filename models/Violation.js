const mongoose = require('mongoose');
const ViolationSchema = new mongoose.Schema({
  plate: String,
  violationType: String,
  timestamp: Date
});
module.exports = mongoose.model('Violation', ViolationSchema);

const mongoose = require('mongoose');
const VehicleSchema = new mongoose.Schema({
  owner: String,
  plate: String,
  type: String
});
module.exports = mongoose.model('Vehicle', VehicleSchema);

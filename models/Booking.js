const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: String,
  vehicleNo: String,
  slotId: String,
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'booked' }
});

module.exports = mongoose.model('Booking', BookingSchema);

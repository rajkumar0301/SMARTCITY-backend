const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Delete one booking
router.delete('/delete/:id', async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

// Reset all slots
router.delete('/reset', async (req, res) => {
  await Booking.deleteMany();
  res.send('All bookings deleted');
});

module.exports = router;

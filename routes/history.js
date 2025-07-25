const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');


// Get history for specific user
router.get('/:username', async (req, res) => {
  const bookings = await Booking.find({ user: req.params.username });
  res.json(bookings);
});



// Auth middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "smartpark_secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
router.get('/:username', authenticateToken, async (req, res) => {
  if (req.user.username !== req.params.username) {
    return res.sendStatus(403);
  }

  const bookings = await Booking.find({ user: req.params.username });
  res.json(bookings);
});

module.exports = router;

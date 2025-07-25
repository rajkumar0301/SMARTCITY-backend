
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();
const authenticate = require('../middleware/auth');

let parkingGrid = Array.from({ length: 4 }, (_, i) => Array(4).fill(0)); // 4x4 grid
const slotMap = {};
'ABCD'.split('').forEach((row, i) => {
  for (let j = 0; j < 4; j++) {
    slotMap[row + (j + 1)] = [i, j];
  }
});

//  GET /api/booking/slots - Get current grid status (Authenticated)
router.get('/slots', authenticate, (req, res) => {
  res.json({ grid: parkingGrid });
});

//  POST /api/booking/book - Book a slot (Authenticated)
router.post('/book', authenticate, async (req, res) => {
  const { userId, vehicleNo, slotId } = req.body;

  if (!userId || !vehicleNo || !slotId || !slotMap[slotId]) {
    return res.status(400).json({ error: 'Missing or invalid booking data' });
  }

  const [row, col] = slotMap[slotId];
  if (parkingGrid[row][col] === 1) {
    return res.status(409).json({ error: 'Slot already booked' });
  }

  try {
    const booking = new Booking({ userId, vehicleNo, slotId });
    await booking.save();
    parkingGrid[row][col] = 1;
    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book slot' });
  }
});

module.exports = router;

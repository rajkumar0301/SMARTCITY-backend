const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');

router.get('/', async (req, res) => {
  const data = await Vehicle.find();
  res.json(data);
});

router.post('/', async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.json({ message: 'Vehicle added' });
});

router.put('/:id', async (req, res) => {
  await Vehicle.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Vehicle updated' });
});

router.delete('/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vehicle deleted' });
});

module.exports = router;

require('dotenv').config(); // Load environment variables

const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const authenticate = require('../middleware/auth');


console.log('KEY ID:', process.env.RAZORPAY_KEY_ID); // for debug
console.log('KEY SECRET:', process.env.RAZORPAY_KEY_SECRET); // for debug

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  POST /api/payment/create-order - Create Razorpay order (Authenticated)
router.post("/create-order", authenticate, async (req, res) => {
  const options = {
    amount: 50000, // 500
    currency: "INR",
    receipt: "receipt#1"
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: "order_rcptid_11"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});


module.exports = router;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const supabaseAuthRoutes = require('./routes/supabase-auth');



const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'smartpark7250561528';

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Connect Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
(async () => {
  try {
    const { error } = await supabase.from('feedback').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connected');
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
  }
})();

// Setup Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: 'smartpark-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/emergency', require('./routes/emergencies'));
app.use('/api/incident', require('./routes/incident'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/history', require('./routes/history'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/violations', require('./routes/Violations'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/users', require('./routes/users'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/supabase-auth', supabaseAuthRoutes);
// Razorpay order route
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: parseInt(amount),
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      payment_capture: 1
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error('❌ Razorpay order error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Razorpay payment verification
app.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Razorpay verification error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// JWT Auth middleware (optional)
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Static HTML Routes (Optional if not SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public/register.html')));
//app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '../client/dashboard.html')));
app.get('/feedback', (req, res) => res.sendFile(path.join(__dirname, '../public/feedback.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, '../public/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, '../public/contact.html')));

// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

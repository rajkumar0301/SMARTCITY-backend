const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// ✅ REGISTER
router.post('/register', async (req, res) => {
  console.log('➡️ Register payload:', req.body);
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  console.log('✅ Supabase response:', data);
  console.log('❌ Supabase error:', error);

  if (error) {
  if (error.code === 'user_already_registered') {
    return res.status(400).json({ message: 'Email already registered' });
  }
  return res.status(500).json({ message: 'Server error during registration' });
}
  res.status(200).json({
    message: 'User registered. Please check your email to confirm.',
    data,
  });
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json(data);
});

module.exports = router;

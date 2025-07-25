const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from('users').insert([{ name, email }]);
  res.status(error ? 500 : 200).json({ data, error });
});

module.exports = router;

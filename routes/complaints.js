const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.post('/', async (req, res) => {
  const { user_id, title, description } = req.body;
  const { data, error } = await supabase.from('complaints').insert([
    { user_id, title, description }
  ]);
  res.status(error ? 500 : 200).json({ data, error });
});

module.exports = router;

// import express from 'express';
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// // POST: Submit feedback
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const { data, error } = await supabase
//       .from('feedback')
//       .insert([{ name, email, message }]);

//     if (error) throw error;

//     res.status(201).json({ success: true, message: "Feedback submitted successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to submit feedback.", error: error.message });
//   }
// });

// // GET: View all feedback
// router.get('/', async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('feedback')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch feedback.", error: error.message });
//   }
// });

// export default router;






const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

// POST: Submit feedback to Supabase
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { data, error } = await supabase
      .from('feedback')
      .insert([{ name, email, message }]);

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Insert error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
});

// GET: View all feedback
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch feedback.' });
  }
});

module.exports = router;






























// // routes/feedback.js
// // server/routes/feedback.js
// //const express = require('express');
// import express from 'express';

// const router = express.Router();
// const Feedback = require('../models/Feedback');

// // POST: Submit feedback
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const feedback = new Feedback({ name, email, message });
//     await feedback.save();
//     res.status(201).json({ success: true, message: "Feedback submitted successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to submit feedback." });
//   }
// });

// // GET: View all feedbacks (optional)
// router.get('/', async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find().sort({ date: -1 });
//     res.json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch feedback." });
//   }
// });

// module.exports = router;

// //import express from 'express';
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config();
// //const router = express.Router();

// // Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// // POST route to insert feedback
// router.post('/feedback', async (req, res) => {
//   const { message } = req.body;

//   const { data, error } = await supabase
//     .from('feedback')
//     .insert([{ message }]);

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   res.status(200).json({ data });
// });

// export default router;

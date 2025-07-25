const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // ✅ Load environment variables

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;




// // server/supabaseClient.js
// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_KEY
// );

// module.exports = supabase;

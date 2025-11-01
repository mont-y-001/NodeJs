const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // ensures .env is loaded even if this file runs before app.js

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase credentials!");
  console.log("SUPABASE_URL:", supabaseUrl);
  console.log("SUPABASE_ANON_KEY:", supabaseAnonKey);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };

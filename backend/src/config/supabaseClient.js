require('dotenv').config({ path: '../../.env' }); // Garante que o .env na raiz seja lido
const { createClient } = require('@supabase/supabase-js');

// Use a chave de serviço para ter permissões de admin no backend
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
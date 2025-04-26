import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iilgcfvsqtmnnxtpaque.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpbGdjZnZzcXRtbm54dHBhcXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDUyNDEsImV4cCI6MjA2MDcyMTI0MX0.aGVnxW-oogRpGi_fWabrCXGuXclT4z-TZxq00eh5lW4';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-url.supabase.co') {
  console.error('CRITICAL: Supabase credentials are not configured properly!');
  console.warn('Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah diset di Environment Variables (Vercel/AI Studio).');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

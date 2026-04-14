import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a robust client that won't crash the build if keys are missing/invalid
// During build time, Next.js might evaluate this module without real env vars
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        select: () => ({ order: () => Promise.resolve({ data: [], error: { message: 'Supabase URL missing' } }), 
        eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase URL missing' } }) }) }) 
      }) 
    } as any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials are missing or invalid in .env.local');
}

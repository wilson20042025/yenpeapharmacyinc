import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a robust mock result for chainable Supabase methods
const mockResult = {
  data: [],
  error: null,
  select: () => mockResult,
  from: () => mockResult,
  order: () => Promise.resolve({ data: [], error: null }),
  eq: () => mockResult,
  single: () => Promise.resolve({ data: null, error: null }),
  insert: () => mockResult,
  update: () => mockResult,
  delete: () => mockResult,
};

// Create a robust client that won't crash the build if keys are missing/invalid
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockResult as any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials are missing or invalid in .env.local');
}

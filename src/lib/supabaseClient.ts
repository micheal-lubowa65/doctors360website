import { createClient } from '@supabase/supabase-js';

/**
 * Strip every character that isn't printable ASCII (0x20–0x7E).
 * Supabase URLs and JWT anon keys are purely ASCII, so this is safe
 * and prevents the "String contains non ISO-8859-1 code point" error
 * that occurs when env vars are pasted with invisible Unicode chars
 * (BOM, zero-width spaces, smart quotes, etc.).
 */
function sanitize(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[^\x20-\x7E]/g, '').trim();
}

const supabaseUrl = sanitize(import.meta.env.VITE_SUPABASE_URL || '');
const supabaseAnonKey = sanitize(import.meta.env.VITE_SUPABASE_ANON_KEY || '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase env vars: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

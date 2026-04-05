import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Certificate {
  id: string;
  certificate_id: string;
  holder_name: string;
  certificate_title: string;
  issue_date: string;
  issuer: string;
  certificate_hash: string;
  status: 'verified' | 'fake' | 'not_found';
  image_url: string;
  blockchain_tx_hash: string | null;
  ipfs_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface VerificationLog {
  id: string;
  certificate_id: string;
  verification_date: string;
  verification_result: string;
  ip_address: string | null;
  created_at: string;
}

/*
  # SkillChain Certificate Verification System

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `certificate_id` (text, unique) - Unique certificate identifier
      - `holder_name` (text) - Name of certificate holder
      - `certificate_title` (text) - Title/type of certificate
      - `issue_date` (date) - Date of issuance
      - `issuer` (text) - Issuing organization
      - `certificate_hash` (text) - Hash for blockchain verification
      - `status` (text) - Status: 'verified', 'fake', 'not_found'
      - `image_url` (text) - URL to certificate image
      - `blockchain_tx_hash` (text) - Polygon blockchain transaction hash
      - `ipfs_hash` (text) - IPFS storage hash
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `verification_logs`
      - `id` (uuid, primary key)
      - `certificate_id` (text) - Reference to certificate
      - `verification_date` (timestamptz)
      - `verification_result` (text)
      - `ip_address` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to certificates
    - Add policies for logging verification attempts
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id text UNIQUE NOT NULL,
  holder_name text NOT NULL,
  certificate_title text NOT NULL,
  issue_date date NOT NULL,
  issuer text NOT NULL,
  certificate_hash text NOT NULL,
  status text NOT NULL DEFAULT 'verified',
  image_url text NOT NULL,
  blockchain_tx_hash text,
  ipfs_hash text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verification_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id text NOT NULL,
  verification_date timestamptz DEFAULT now(),
  verification_result text NOT NULL,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view certificates"
  ON certificates
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can log verification attempts"
  ON verification_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view verification logs"
  ON verification_logs
  FOR SELECT
  TO anon, authenticated
  USING (true);
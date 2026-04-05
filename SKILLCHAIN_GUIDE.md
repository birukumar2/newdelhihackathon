# SkillChain Certificate Verification Platform

A blockchain-powered certificate verification system built on Polygon network with Supabase backend.

## Features

- **Blockchain Verification**: Certificates are secured on Polygon blockchain
- **Instant Verification**: Real-time certificate status checking
- **Fraud Detection**: Automatically identifies fake certificates
- **IPFS Storage**: Decentralized certificate storage
- **MetaMask Integration**: Connect wallet to interact with blockchain
- **Database Tracking**: Comprehensive verification logs

## Certificate Status Types

### 1. Verified Certificate
- **Example**: COPADO-060538 (Copado AI Certificate)
- **Status**: Verified and authentic
- **Features**:
  - Blockchain transaction hash available
  - IPFS storage hash
  - Full certificate details displayed

### 2. Fake Certificate
- **Example**: GEC/Buxar/sports/26 (Umang Certificate)
- **Status**: Identified as fake
- **Features**:
  - Warning displayed to user
  - Certificate marked as fraudulent in database

### 3. Not in Database
- **Example**: TATA-FORAGE-2026 (Tata Forage Certificate)
- **Status**: Not found in database
- **Features**:
  - Clear message that certificate is not registered
  - Logged for tracking purposes

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Blockchain**: Polygon Network
- **Storage**: IPFS
- **Icons**: Lucide React

## How to Use

### Verify a Certificate

1. Enter the certificate ID in the search field
2. Click "Verify" button
3. View the verification result with full details

### Test Certificates

You can test the system with these certificate IDs:

- `GEC/Buxar/sports/26` - Returns: **FAKE CERTIFICATE**
- `COPADO-060538` - Returns: **VERIFIED CERTIFICATE**
- `TATA-FORAGE-2026` - Returns: **NOT IN DATABASE**

### Connect MetaMask Wallet

1. Click "Connect Wallet" button in header
2. Approve MetaMask connection
3. Automatically switches to Polygon network
4. View your connected wallet address

## Database Schema

### Certificates Table
- `certificate_id`: Unique identifier
- `holder_name`: Certificate holder's name
- `certificate_title`: Title/type of certificate
- `issue_date`: Date of issuance
- `issuer`: Issuing organization
- `certificate_hash`: Hash for blockchain verification
- `status`: verified/fake/not_found
- `image_url`: Certificate image location
- `blockchain_tx_hash`: Polygon transaction hash
- `ipfs_hash`: IPFS storage hash

### Verification Logs Table
- Tracks all verification attempts
- Records certificate ID, result, and timestamp
- Helps detect patterns of fraud attempts

## Security Features

- Row Level Security (RLS) enabled on all tables
- Public read access for certificate verification
- Secure blockchain verification
- Privacy-first architecture

## Built With

Based on SkillChain documentation and implemented with:
- Polygon blockchain for immutable record keeping
- Supabase for fast and secure database operations
- Modern React architecture for optimal performance
- Responsive design for all devices

# 🔗 SkillChain – On-Chain Skill Credentialing Platform

![SkillChain Banner](https://via.placeholder.com/1200x400?text=SkillChain+Blockchain+Credential+Verification)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Polygon](https://img.shields.io/badge/Polygon-Mainnet-8247E5?logo=polygon)](https://polygon.technology/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://newdelhihackathon.vercel.app/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?logo=solidity)](https://soliditylang.org/)

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Live Demo](#live-demo)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Testing Certificate IDs](#testing-certificate-ids)
- [Institute Portal](#institute-portal)
- [Team](#team)
- [Future Scope](#future-scope)
- [License](#license)

---

## 🎯 About the Project

**SkillChain** is a blockchain-powered credential verification platform built on **Polygon**. It issues **Soulbound Tokens (SBTs)** to students, making credentials tamper-proof, instantly verifiable, and permanently owned by the student. The platform solves the growing problem of fake certificates, AI-generated fraud, and slow manual verification.

> "Blockchain doesn't create trust – it removes the need for it."

---

## ⚠️ Problem Statement

- **56%** of Indian hiring managers detected resume fraud in 2024 (Source: Medium/HireOG)
- **3000%** increase in AI-generated fraud attempts (Deepstrike.io 2025)
- **1 in 4** job applications could be AI-fake by 2028 (Xpert.digital)
- Manual verification takes **3–21 days**; SkillChain does it in **3 seconds**.

**Existing systems fail because:**
- PDFs can be faked with AI tools (ChatGPT, Canva, Photoshop)
- No standard, interoperable skill proof
- Students don't own or control their credentials
- Employers spend ₹5000+ per verification

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Instant Verification** | Verify any certificate in **3 seconds** with step-by-step blockchain simulation |
| 📄 **PDF/Image Upload** | Upload a certificate PDF – OCR extracts the ID and checks blockchain |
| 🏛️ **Institute Portal** | Colleges & bootcamps can login and add new certificates to the blockchain registry |
| 👛 **Wallet Connect** | Connect MetaMask and switch to Polygon network |
| 📊 **Live Stats** | Real-time Polygon gas fee + total verifications counter |
| 🔗 **Transaction Link** | Click to view certificate minting transaction on Polygonscan |
| 📱 **QR Code** | Share verification result via QR code |
| 🧠 **AI Fraud Detection** | Identifies AI-generated certificates and shows reason for failure |
| 🌙 **Dark Theme + Responsive** | Works on mobile, tablet, and desktop |

---

## ⚙️ How It Works

┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 1. Upload │ ──► │ 2. IPFS │ ──► │ 3. Polygon │ ──► │ 4. Verify │
│ Credential │ │ Storage │ │ Mint SBT │ │ in 3 sec │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘



1. **Institution** uploads student details → backend stores metadata on **IPFS** (Pinata)
2. IPFS returns a unique **CID** (content identifier)
3. Smart contract on **Polygon** mints a **Soulbound Token (ERC-5484)**
4. Student receives SBT in wallet; employer verifies in **3 seconds** by querying the blockchain

---

## 🧰 Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Blockchain** | Solidity v0.8.20, Polygon PoS, Hardhat, OpenZeppelin ERC-5484 |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Web3Modal, Ethers.js |
| **Storage** | IPFS, Pinata (free tier) |
| **Backend** | Node.js + Express, MongoDB Atlas |
| **DevOps** | Vercel (hosting), GitHub Actions (CI) |

---

## 🌐 Live Demo

🔗 **https://newdelhihackathon.vercel.app/**

Test the platform instantly with these certificate IDs:

| Certificate ID | Status | Description |
|----------------|--------|-------------|
| `COPADO-060538` | ✅ Verified | Copado Certified Professional |
| `FORAGE/BIRU/2026` | ✅ Verified | Forage Data Visualisation |
| `IITD/CERT/2026/001` | ✅ Verified | IIT Delhi Blockchain Workshop |
| `GEC/Buxar/sports/26` | ❌ Fake | AI-generated fake certificate |
| `TATA-FORAGE-2026` | ❌ Not Found | Not registered on blockchain |
| `FAKE/XYZ/001` | ❌ AI Generated | Detected as synthetic |

---

## 🛠️ Installation & Setup (for local development)

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask browser extension

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/birukumar2/newdelhihackathon.git
cd newdelhihackathon

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev


📖 Usage Guide
For Students / Employers (Verification)
Go to the live demo or local instance.

Enter a Certificate ID (e.g., COPADO-060538).

Watch the 3‑second blockchain simulation:

🔍 Fetching metadata from IPFS

⛓️ Querying Polygon blockchain

🛡️ Verifying issuer signature

✅ Generating report

View result: VERIFIED (green) or FAKE / NOT FOUND (red).

Click the transaction hash to see it on Polygonscan.

Generate QR code to share the verification.

For Institutions (Adding Certificates)
Click Institute in the navbar.

Login with demo credentials:

Email: institute@gecbuxar.edu

Password: admin123

Fill the form: Certificate ID, holder name, title, issuer, date, transaction hash (optional).

Click Add to Blockchain Registry.

The certificate is now available for verification.

For Wallet Connection
Click Connect Wallet (MetaMask).

Click Polygon Network to switch to Mumbai testnet.

Get free MATIC from Polygon Faucet for testing.

🧪 Testing Certificate IDs
The platform comes with a mock database containing both real and fake certificates. Use these IDs to test all scenarios:

bash
# Verified certificates (green)
COPADO-060538
FORAGE/BIRU/2026
IITD/CERT/2026/001
NPTEL/CS101/2025/789

# Fake / invalid certificates (red)
GEC/Buxar/sports/26
TATA-FORAGE-2026
FAKE/XYZ/001
🏛️ Institute Portal (Demo)
Field	Demo Value
Email	institute@gecbuxar.edu
Password	admin123
Once logged in, you can add any new certificate. After adding, verify it immediately using the Certificate ID.

👥 Team
https://via.placeholder.com/100?text=AH	https://via.placeholder.com/100?text=BK
Aman Kumar Happy	Biru Kumar
BTech CSE, GEC Buxar	BTech CSE, GEC Buxar
Smart Contract, Polygon, React	Web3, IPFS, Node.js, MongoDB
GitHub · LinkedIn	GitHub · LinkedIn
Team NexaForce – HackIndia Spark 6 @ NIT Delhi 2026

🔮 Future Scope
Zero-Knowledge Proofs – Privacy-preserving verification without revealing personal data

Skill Graph – ML-powered talent gap analysis and career recommendations

DAO Governance – Community‑driven issuer validation and dispute resolution

AI Fraud Detection – Real‑time on‑chain anomaly scoring

Cross‑chain Expansion – Support for Ethereum, BNB Chain, and Solana

📄 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements
Polygon for low-cost, fast blockchain

IPFS & Pinata for decentralized storage

OpenZeppelin for ERC-5484 standard

Vercel for seamless deployment

All data sources: Medium, Deepstrike.io, SAS, TechRadar, Xpert.digital

Built with ❤️ for HackIndia Spark 6 @ NIT Delhi 2026



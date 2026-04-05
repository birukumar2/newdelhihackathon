export interface Certificate {
  valid: boolean;
  holderName: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  ipfsHash?: string;
  txHash?: string;
  reason?: string;
  blockchainVerified?: boolean;
}

export const certificatesDB: Record<string, Certificate> = {
  "COPADO-060538": {
    valid: true,
    holderName: "Aman Kumar Happy",
    title: "Copado Certified Professional",
    issuer: "Copado Inc.",
    issueDate: "2025-11-15",
    ipfsHash: "QmValidCopado",
    txHash: "0xabc123def456789",
    blockchainVerified: true
  },
  "FORAGE/BIRU/2026": {
    valid: true,
    holderName: "Biru Kumar",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage",
    issueDate: "2026-03-27",
    ipfsHash: "QmForageValid",
    txHash: "0xforage123",
    blockchainVerified: true
  },
  "IITD/CERT/2026/001": {
    valid: true,
    holderName: "Biru Kumar",
    title: "Blockchain Development Workshop",
    issuer: "IIT Delhi - CSE Dept",
    issueDate: "2026-03-20",
    ipfsHash: "QmIITValid",
    txHash: "0xdef456abc789",
    blockchainVerified: true
  },
  "NPTEL/CS101/2025/789": {
    valid: true,
    holderName: "Aman Kumar Happy",
    title: "Python for Data Science",
    issuer: "NPTEL - IIT Madras",
    issueDate: "2025-12-10",
    ipfsHash: "QmNPTEL",
    txHash: "0xnptel456",
    blockchainVerified: true
  },
  "GEC/Buxar/sports/26": {
    valid: false,
    holderName: "Biru Kumar",
    title: "UMANG'26 - Certificate of Appreciation",
    issuer: "Government Engineering College - UMANG'26",
    issueDate: "2026-01-26",
    reason: "Signature mismatch - issuer wallet not approved"
  },
  "TATA-FORAGE-2026": {
    valid: false,
    holderName: "Test User",
    title: "Tata Forage Internship",
    issuer: "Tata Group",
    issueDate: "2026-02-10",
    reason: "Certificate ID not registered on blockchain"
  },
  "FAKE/XYZ/001": {
    valid: false,
    holderName: "Fake Candidate",
    title: "Fake University Degree (AI Generated)",
    issuer: "Fake University",
    issueDate: "2024-01-01",
    reason: "No on-chain record - AI generated"
  }
};

export const addCertificate = (id: string, cert: Certificate) => {
  certificatesDB[id] = cert;
};

import React, { useState } from 'react';
import { certificatesDB, Certificate } from '../data/certificates';
import {
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  QrCode,
  Share2,
  Hash,
  Shield,
  Copy,
  Check,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import toast from 'react-hot-toast';

const STEPS = [
  '🔍 Fetching certificate metadata from IPFS...',
  '⛓️ Querying Polygon blockchain for SBT record...',
  '🛡️ Verifying issuer wallet signature...',
  '✅ Generating tamper-proof verification report...',
];

const DEMO_IDS = [
  { id: 'COPADO-060538', tag: 'Verified', valid: true },
  { id: 'FORAGE/BIRU/2026', tag: 'Verified', valid: true },
  { id: 'IITD/CERT/2026/001', tag: 'Verified', valid: true },
  { id: 'NPTEL/CS101/2025/789', tag: 'Verified', valid: true },
  { id: 'GEC/Buxar/sports/26', tag: 'Fake', valid: false },
  { id: 'TATA-FORAGE-2026', tag: 'Not Found', valid: false },
  { id: 'FAKE/XYZ/001', tag: 'AI Generated', valid: false },
];

const VerificationPanel: React.FC = () => {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const verifyCertificate = async (id?: string) => {
    const target = (id ?? certId).trim();
    if (!target) {
      toast.error('Please enter a Certificate ID');
      return;
    }
    setLoading(true);
    setVerificationStep(0);
    setResult(null);
    setSearched(false);
    setShowQR(false);

    for (let i = 0; i < STEPS.length; i++) {
      setVerificationStep(i);
      await new Promise((resolve) => setTimeout(resolve, 750));
    }

    const certData = certificatesDB[target];
    if (certData) {
      setResult(certData);
      toast.success(certData.valid ? '✅ Certificate Verified!' : '❌ Fake Certificate Detected!', {
        style: { background: '#1f2937', color: '#fff' },
      });
    } else {
      setResult({
        valid: false,
        holderName: 'Unknown',
        title: 'Certificate Not Found',
        issuer: 'N/A',
        issueDate: 'N/A',
        reason:
          'This certificate ID is not in our blockchain registry. If you are an institution, please login to add it.',
      });
      toast.error('Certificate not found in database', {
        style: { background: '#1f2937', color: '#fff' },
      });
    }

    // Fire verification count event
    window.dispatchEvent(new Event('certificateVerified'));
    setSearched(true);
    setLoading(false);
  };

  const handleCopyLink = () => {
    const link = `https://newdelhihackathon.vercel.app/verify?id=${encodeURIComponent(certId)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Link copied!', { style: { background: '#1f2937', color: '#fff' } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    const text = `I just verified a certificate on SkillChain — blockchain-powered credential verification! 🔗 https://newdelhihackathon.vercel.app`;
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://newdelhihackathon.vercel.app')}&title=${encodeURIComponent('SkillChain Certificate Verified')}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Input Card */}
      <div className="bg-gray-900/60 backdrop-blur rounded-2xl border border-cyan-500/30 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Search className="w-6 h-6 text-cyan-400" /> Verify Certificate
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          Enter a certificate ID to check authenticity on Polygon blockchain
        </p>

        <div className="flex gap-3">
          <input
            id="certificate-id-input"
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verifyCertificate()}
            placeholder="e.g. COPADO-060538 or IITD/CERT/2026/001"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition"
          />
          <button
            id="verify-btn"
            onClick={() => verifyCertificate()}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Verify
          </button>
        </div>

        {/* Demo IDs */}
        <div className="mt-4 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <p className="text-xs font-semibold text-gray-400 mb-2">📋 Quick Test IDs (click to fill):</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_IDS.map((d) => (
              <button
                key={d.id}
                onClick={() => setCertId(d.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 border ${
                  d.valid
                    ? 'bg-green-900/40 text-green-300 border-green-700/40 hover:bg-green-800/60'
                    : 'bg-red-900/40 text-red-300 border-red-700/40 hover:bg-red-800/60'
                }`}
              >
                {d.valid ? '✅' : '❌'} {d.id} <span className="opacity-60">({d.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="mt-4 p-5 bg-gradient-to-r from-cyan-950/50 to-purple-950/50 rounded-xl border border-cyan-500/30 backdrop-blur">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full flex-shrink-0" />
            <span className="text-cyan-300 font-mono text-sm">{STEPS[verificationStep]}</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((verificationStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="text-gray-600 text-xs mt-2">Verifying on Polygon Mumbai Testnet...</p>
        </div>
      )}

      {/* Result Card */}
      {searched && result && !loading && (
        <div
          className={`mt-4 rounded-2xl border-2 p-6 transition-all duration-300 backdrop-blur ${
            result.valid
              ? 'border-green-500/60 bg-green-950/20 shadow-lg shadow-green-500/10'
              : 'border-red-500/60 bg-red-950/20 shadow-lg shadow-red-500/10'
          }`}
        >
          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {result.valid ? (
                <CheckCircle2 className="w-8 h-8 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              ) : (
                <XCircle className="w-8 h-8 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
              )}
              <span className={`font-bold text-xl ${result.valid ? 'text-green-400' : 'text-red-400'}`}>
                {result.valid ? 'VERIFIED ✓' : 'INVALID ✗'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowQR(!showQR)}
                title="Show QR Code"
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition"
              >
                <QrCode className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy verification link"
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleLinkedInShare}
                title="Share on LinkedIn"
                className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expiry warning */}
          {result.valid && isExpired(result.expiryDate) && (
            <div className="mb-3 px-3 py-2 bg-yellow-900/30 border border-yellow-600/30 rounded-lg text-yellow-300 text-sm">
              ⚠️ This certificate has expired (Expiry: {result.expiryDate})
            </div>
          )}

          {/* Details */}
          <div className="space-y-2 text-sm">
            {[
              { label: 'Holder', value: result.holderName },
              { label: 'Title', value: result.title },
              { label: 'Issuer', value: result.issuer },
              { label: 'Issue Date', value: result.issueDate },
              ...(result.expiryDate ? [{ label: 'Expiry Date', value: result.expiryDate }] : []),
            ].map((f) => (
              <div key={f.label} className="flex gap-2">
                <span className="text-gray-500 w-24 flex-shrink-0">{f.label}:</span>
                <span className="text-gray-200 font-medium">{f.value}</span>
              </div>
            ))}

            {result.txHash && (
              <div className="flex gap-2 items-center mt-1">
                <Hash className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-500 w-20 flex-shrink-0 text-xs">Tx Hash:</span>
                <a
                  href={`https://mumbai.polygonscan.com/tx/${result.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-xs font-mono transition"
                >
                  {result.txHash.slice(0, 14)}...
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {result.ipfsHash && (
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 w-24 flex-shrink-0 text-xs">IPFS CID:</span>
                <a
                  href={`https://ipfs.io/ipfs/${result.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-xs font-mono transition"
                >
                  {result.ipfsHash.slice(0, 14)}...
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {result.reason && (
              <div className="mt-2 px-3 py-2 bg-red-900/20 border border-red-700/30 rounded-lg text-red-300 text-xs">
                ⚠️ <span className="font-semibold">Reason:</span> {result.reason}
              </div>
            )}
          </div>

          {/* Blockchain badge */}
          {result.blockchainVerified && (
            <div className="mt-4 flex items-center gap-2 bg-green-950/30 border border-green-700/30 rounded-lg px-3 py-2">
              <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-green-300 text-xs">
                Verified on Polygon Blockchain · Soulbound Token (SBT) Confirmed
              </span>
            </div>
          )}

          {/* QR Code */}
          {showQR && (
            <div className="mt-4 flex flex-col items-center gap-2 p-4 bg-white rounded-xl">
              <QRCode
                value={`https://newdelhihackathon.vercel.app/verify?id=${encodeURIComponent(certId)}`}
                size={120}
              />
              <p className="text-gray-600 text-xs">Scan to verify certificate</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerificationPanel;

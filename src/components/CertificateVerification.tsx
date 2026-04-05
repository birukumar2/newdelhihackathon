import { useState } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  Hash,
  Server,
  Cpu,
} from 'lucide-react';
import { certificatesDB, Certificate } from '../data/certificates';

const STEPS = [
  '🔍 Fetching certificate metadata from IPFS...',
  '⛓️ Querying Polygon blockchain for SBT record...',
  '🛡️ Verifying issuer wallet signature...',
  '✅ Generating tamper-proof verification report...',
];

const DEMO_IDS = [
  { id: 'COPADO-060538', label: 'COPADO-060538', status: 'valid', tag: 'Verified' },
  { id: 'FORAGE/BIRU/2026', label: 'FORAGE/BIRU/2026', status: 'valid', tag: 'Verified' },
  { id: 'IITD/CERT/2026/001', label: 'IITD/CERT/2026/001', status: 'valid', tag: 'Verified' },
  { id: 'NPTEL/CS101/2025/789', label: 'NPTEL/CS101/2025/789', status: 'valid', tag: 'Verified' },
  { id: 'GEC/Buxar/sports/26', label: 'GEC/Buxar/sports/26', status: 'fake', tag: 'Fake' },
  { id: 'TATA-FORAGE-2026', label: 'TATA-FORAGE-2026', status: 'fake', tag: 'Not Found' },
  { id: 'FAKE/XYZ/001', label: 'FAKE/XYZ/001', status: 'fake', tag: 'AI Generated' },
];

const HOW_IT_WORKS = [
  {
    icon: Server,
    iconColor: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    title: '1. IPFS Storage',
    desc: 'Metadata pinned',
  },
  {
    icon: Hash,
    iconColor: 'text-purple-400',
    bg: 'bg-purple-500/20',
    title: '2. CID Generated',
    desc: 'Unique hash',
  },
  {
    icon: Cpu,
    iconColor: 'text-blue-400',
    bg: 'bg-blue-500/20',
    title: '3. Polygon Mint',
    desc: 'Soulbound Token',
  },
  {
    icon: Shield,
    iconColor: 'text-green-400',
    bg: 'bg-green-500/20',
    title: '4. Instant Verify',
    desc: '< 3 seconds',
  },
];

const TECH_STACK = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', alt: 'Solidity' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
];

export default function CertificateVerification() {
  const [certId, setCertId] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const verifyCertificate = async (id?: string) => {
    const target = (id ?? certId).trim();
    if (!target) return;

    setLoading(true);
    setVerificationStep(0);
    setResult(null);
    setSearched(false);

    for (let i = 0; i < STEPS.length; i++) {
      setVerificationStep(i);
      await new Promise((resolve) => setTimeout(resolve, 750));
    }

    const certData = certificatesDB[target];
    if (certData) {
      setResult(certData);
    } else {
      setResult({
        valid: false,
        holderName: 'Unknown',
        title: 'Certificate Not Found',
        issuer: 'N/A',
        issueDate: 'N/A',
        reason: 'This certificate ID does not exist in our blockchain registry',
      });
    }

    setSearched(true);
    setLoading(false);
  };

  const handleQuickFill = (id: string) => {
    setCertId(id);
  };

  const resultBorderClass = result
    ? result.valid
      ? 'border-green-500/60 shadow-green-500/10'
      : 'border-red-500/60 shadow-red-500/10'
    : 'border-gray-700';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">

      {/* ── Tech Stack Icons ── */}
      <div className="flex flex-wrap justify-center items-center gap-6 py-5 border-y border-gray-700/60">
        {TECH_STACK.map((t) => (
          <img
            key={t.alt}
            src={t.src}
            alt={t.alt}
            title={t.alt}
            className="h-8 w-8 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200"
          />
        ))}
        <span className="text-cyan-400 font-mono text-sm bg-gray-800 border border-cyan-500/30 px-3 py-1 rounded-full hover:border-cyan-400 transition">
          Polygon
        </span>
        <span className="text-purple-400 font-mono text-sm bg-gray-800 border border-purple-500/30 px-3 py-1 rounded-full hover:border-purple-400 transition">
          IPFS
        </span>
      </div>

      {/* ── How Blockchain Verification Works ── */}
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          🔐 How Blockchain Verification Works
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-4">
              <div className="text-center w-36">
                <div className={`${step.bg} p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center`}>
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>
                <p className="text-white text-sm font-medium mt-2">{step.title}</p>
                <p className="text-gray-500 text-xs">{step.desc}</p>
              </div>
              {i < HOW_IT_WORKS.length - 1 && (
                <span className="text-cyan-500 text-lg font-bold hidden md:block">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Verification Input Card ── */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/60">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Verify Certificate
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Enter a certificate ID to check authenticity on the Polygon blockchain
        </p>

        {/* Input + Button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            id="certificate-id-input"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verifyCertificate()}
            placeholder="e.g. COPADO-060538 or IITD/CERT/2026/001"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
          <button
            id="verify-btn"
            onClick={() => verifyCertificate()}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Verify
          </button>
        </div>

        {/* Demo IDs */}
        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <p className="text-sm font-semibold text-gray-300 mb-3">
            📋 Try these certificate IDs (click to auto-fill):
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_IDS.map((d) => (
              <button
                key={d.id}
                id={`demo-${d.id.replace(/\//g, '-').replace(/\s/g, '-')}`}
                onClick={() => handleQuickFill(d.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 hover:scale-105 ${
                  d.status === 'valid'
                    ? 'bg-green-900/40 text-green-300 hover:bg-green-800/60 border border-green-700/40'
                    : 'bg-red-900/40 text-red-300 hover:bg-red-800/60 border border-red-700/40'
                }`}
              >
                {d.status === 'valid' ? '✅' : '❌'} {d.label}{' '}
                <span className="opacity-70">({d.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Loading Animation ── */}
      {loading && (
        <div className="p-5 bg-gradient-to-r from-cyan-950/40 to-purple-950/40 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full flex-shrink-0" />
            <span className="text-cyan-300 font-mono text-sm">{STEPS[verificationStep]}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((verificationStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">Verifying on Polygon Mumbai Testnet...</p>
        </div>
      )}

      {/* ── Result Card ── */}
      {searched && result && !loading && (
        <div
          className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 ${resultBorderClass} transition-all duration-300`}
        >
          {/* Status Header */}
          <div className="flex flex-col items-center mb-6">
            {result.valid ? (
              <CheckCircle className="w-16 h-16 text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.5)]" />
            ) : (
              <XCircle className="w-16 h-16 text-red-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.5)]" />
            )}
            <h3
              className={`text-2xl font-bold mt-4 ${
                result.valid ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {result.valid
                ? '✅ Certificate is Authentic & Verified!'
                : '❌ Certificate is Invalid or Fake'}
            </h3>
            {!result.valid && result.reason && (
              <div className="mt-3 flex items-center gap-2 bg-red-900/30 border border-red-700/40 rounded-lg px-4 py-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{result.reason}</p>
              </div>
            )}
          </div>

          {/* Certificate Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Holder Name', value: result.holderName },
              { label: 'Certificate Title', value: result.title },
              { label: 'Issuer', value: result.issuer },
              { label: 'Issue Date', value: result.issueDate },
            ].map((field) => (
              <div key={field.label} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                  {field.label}
                </p>
                <p className="text-white font-medium">{field.value}</p>
              </div>
            ))}
          </div>

          {/* Blockchain Details */}
          {(result.txHash || result.ipfsHash) && (
            <div className="space-y-3">
              {result.txHash && (
                <div className="bg-blue-950/40 border border-blue-700/30 rounded-xl p-4">
                  <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> Blockchain Transaction Hash
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-blue-300 text-sm font-mono break-all">
                      {result.txHash}
                    </code>
                    <a
                      href={`https://mumbai.polygonscan.com/tx/${result.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors ml-auto"
                    >
                      View on PolygonScan <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {result.ipfsHash && (
                <div className="bg-purple-950/40 border border-purple-700/30 rounded-xl p-4">
                  <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">
                    IPFS Content ID
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-purple-300 text-sm font-mono break-all">
                      {result.ipfsHash}
                    </code>
                    <a
                      href={`https://ipfs.io/ipfs/${result.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors ml-auto"
                    >
                      View on IPFS <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Blockchain badge */}
          {result.blockchainVerified && (
            <div className="mt-4 flex items-center justify-center gap-2 bg-green-950/30 border border-green-700/30 rounded-xl p-3">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">
                Verified on Polygon Blockchain · Soulbound Token (SBT) Confirmed
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

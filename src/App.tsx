import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Link2, Menu, X, GraduationCap } from 'lucide-react';
import { connectWallet, switchToPolygon } from './lib/blockchain';

// Pages
import InstituteLogin from './pages/InstituteLogin';
import InstituteDashboard from './pages/InstituteDashboard';

// Components
import VerificationPanel from './components/VerificationPanel';
import UploadVerification from './components/UploadVerification';
import BlockchainFlowAnimation from './components/BlockchainFlowAnimation';
import LiveStats from './components/LiveStats';
import TeamSection from './components/TeamSection';
import Features from './components/Features';
import Stats from './components/Stats';

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleConnect = async () => {
    setConnecting(true);
    const addr = await connectWallet();
    if (addr) {
      await switchToPolygon();
      setWalletAddress(addr);
    }
    setConnecting(false);
  };

  const navLinks = [
    { to: '/', label: 'Verify' },
    { to: '/upload', label: 'Upload PDF' },
    { to: '/institute-login', label: 'Institute', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ];

  return (
    <nav className="bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-50 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-cyan-500/20 flex-shrink-0">
            <img
              src="/SkillChain logo.png"
              alt="SkillChain Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-white leading-none">SkillChain</span>
            <p className="text-xs text-gray-500 leading-none mt-0.5">by NexaForce</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gray-800/60 border border-gray-700/60 px-3 py-1.5 rounded-lg text-sm">
            <Link2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400 font-medium text-xs">Polygon Network</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {walletAddress ? (
            <div className="bg-gray-800 border border-cyan-500/40 px-3 py-1.5 rounded-lg">
              <p className="text-sm font-mono text-cyan-400">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={connecting}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1.5 rounded-lg font-semibold text-sm hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 transition-all shadow-md hover:shadow-cyan-500/25"
            >
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800/60 px-4 py-3 space-y-2 bg-gray-950/95">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-lg font-semibold text-sm"
          >
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="text-center pt-10 pb-4 px-4">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          🔗 Powered by Polygon Blockchain · Built by NexaForce
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
          Secure Certificate Verification{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            on Polygon Blockchain
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
          SkillChain uses Soulbound Tokens (SBTs) and IPFS to ensure the authenticity of certificates.
          Verify any credential instantly with complete transparency and tamper-proof security.
        </p>
      </div>

      {/* Blockchain Flow Animation */}
      <BlockchainFlowAnimation />

      {/* Live Stats Bar */}
      <LiveStats />

      {/* Tech Stack Icons */}
      <div className="flex flex-wrap justify-center items-center gap-5 py-4 border-y border-gray-800/50 my-4 mx-4">
        {[
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', alt: 'Solidity' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
        ].map((t) => (
          <img
            key={t.alt}
            src={t.src}
            alt={t.alt}
            title={t.alt}
            className="h-7 w-7 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200"
          />
        ))}
        <span className="text-cyan-400 font-mono text-xs bg-gray-800 border border-cyan-500/30 px-2.5 py-1 rounded-full">Polygon</span>
        <span className="text-purple-400 font-mono text-xs bg-gray-800 border border-purple-500/30 px-2.5 py-1 rounded-full">IPFS</span>
        <span className="text-orange-400 font-mono text-xs bg-gray-800 border border-orange-500/30 px-2.5 py-1 rounded-full">ethers.js</span>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <Stats />
      </div>

      {/* Verification Panel */}
      <div className="max-w-2xl mx-auto mt-4">
        <VerificationPanel />
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <Features />
      </div>
    </>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={
              <div className="max-w-2xl mx-auto py-12">
                <UploadVerification />
              </div>
            } />
            <Route path="/institute-login" element={<InstituteLogin />} />
            <Route path="/institute-dashboard" element={<InstituteDashboard />} />
          </Routes>
        </main>

        <TeamSection />

        {/* Footer */}
        <footer className="bg-gray-950 border-t border-gray-800/60 py-6 text-center">
          <p className="text-gray-600 text-xs">
            © 2026 SkillChain by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">
              Team NexaForce
            </span>{' '}
            (GEC Buxar) · Built on Polygon · 🏆 HackIndia Spark 6 @ NIT Delhi 2026
          </p>
        </footer>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' },
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;

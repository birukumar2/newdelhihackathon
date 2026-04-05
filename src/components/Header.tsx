import { Shield, Link2 } from 'lucide-react';
import { useState } from 'react';
import { connectWallet, switchToPolygon } from '../lib/blockchain';

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setConnecting(true);
    const address = await connectWallet();
    if (address) {
      const switched = await switchToPolygon();
      if (switched) {
        setWalletAddress(address);
      }
    }
    setConnecting(false);
  };

  return (
    <header className="bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-50 shadow-lg shadow-black/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-2 rounded-lg shadow-md shadow-cyan-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white leading-none">SkillChain</h1>
              <p className="text-xs text-gray-400 leading-none mt-0.5">Blockchain Certificate Verification</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-800/60 border border-gray-700/60 px-3 py-1.5 rounded-lg">
              <Link2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300 font-medium">Polygon Network</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            {walletAddress ? (
              <div className="bg-gray-800 border border-cyan-500/40 px-4 py-1.5 rounded-lg">
                <p className="text-sm font-mono text-cyan-400">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            ) : (
              <button
                id="connect-wallet-btn"
                onClick={handleConnectWallet}
                disabled={connecting}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-cyan-500/25 text-sm"
              >
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

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
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <img
                src="/Screenshot_2026-04-05_at_5.03.41_PM.png"
                alt="SkillChain Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-blue-600 font-bold text-xl">SkillChain</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">SkillChain</h1>
              <p className="text-blue-100 text-sm">Blockchain Certificate Verification</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <Link2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Polygon Network</span>
            </div>

            {walletAddress ? (
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={connecting}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

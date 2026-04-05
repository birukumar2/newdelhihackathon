import React, { useEffect, useState } from 'react';
import { Fuel, BarChart3, Wifi, WifiOff } from 'lucide-react';

const LiveStats: React.FC = () => {
  const [gasPrice, setGasPrice] = useState<string>('--');
  const [verificationCount, setVerificationCount] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sc_verificationCount');
    if (stored) setVerificationCount(parseInt(stored));

    const handler = () => {
      const newCount = (parseInt(localStorage.getItem('sc_verificationCount') || '0') + 1);
      localStorage.setItem('sc_verificationCount', newCount.toString());
      setVerificationCount(newCount);
    };
    window.addEventListener('certificateVerified', handler);
    return () => window.removeEventListener('certificateVerified', handler);
  }, []);

  useEffect(() => {
    const fetchGas = async () => {
      try {
        // Use a CORS-friendly public RPC
        const res = await fetch('https://rpc-mumbai.maticvigil.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 }),
        });
        const data = await res.json();
        if (data.result) {
          const gasPriceGwei = (parseInt(data.result, 16) / 1e9).toFixed(2);
          setGasPrice(`${gasPriceGwei} Gwei`);
          setConnected(true);
        }
      } catch {
        setGasPrice('-- Gwei');
        setConnected(false);
      }
    };
    fetchGas();
    const interval = setInterval(fetchGas, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 text-sm py-2">
      <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 px-3 py-1.5 rounded-full">
        <Fuel className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-gray-400">Polygon Gas:</span>
        <span className="text-cyan-300 font-mono font-medium">{gasPrice}</span>
        {connected ? (
          <Wifi className="w-3 h-3 text-green-400" />
        ) : (
          <WifiOff className="w-3 h-3 text-gray-600" />
        )}
      </div>
      <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 px-3 py-1.5 rounded-full">
        <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-gray-400">Verifications:</span>
        <span className="text-purple-300 font-mono font-medium">{verificationCount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default LiveStats;

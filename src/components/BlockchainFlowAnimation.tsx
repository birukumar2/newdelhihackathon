import React, { useEffect, useState } from 'react';
import { Cloud, Fingerprint, Box, CheckCircle2, ChevronRight } from 'lucide-react';

const STEPS = [
  { label: 'IPFS', Icon: Cloud, color: 'text-cyan-400', glow: 'shadow-cyan-500/50', bg: 'bg-cyan-500' },
  { label: 'CID Hash', Icon: Fingerprint, color: 'text-purple-400', glow: 'shadow-purple-500/50', bg: 'bg-purple-500' },
  { label: 'Polygon', Icon: Box, color: 'text-blue-400', glow: 'shadow-blue-500/50', bg: 'bg-blue-500' },
  { label: 'Verified', Icon: CheckCircle2, color: 'text-green-400', glow: 'shadow-green-500/50', bg: 'bg-green-500' },
];

const BlockchainFlowAnimation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 py-4">
      {STEPS.map((step, idx) => {
        const isActive = activeIndex === idx;
        const { Icon } = step;
        return (
          <React.Fragment key={step.label}>
            <div className={`text-center transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-40 scale-95'}`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-all duration-500 ${
                  isActive ? `${step.bg} shadow-lg ${step.glow}` : 'bg-gray-800 border border-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : step.color}`} />
              </div>
              <p className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {step.label}
              </p>
            </div>
            {idx < STEPS.length - 1 && (
              <ChevronRight
                className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                  activeIndex > idx ? 'text-cyan-400' : 'text-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BlockchainFlowAnimation;

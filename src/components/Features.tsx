import { Shield, Link2, Database, Search, Lock, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Certificates stored on Polygon blockchain as Soulbound Tokens — immutable and fraud-proof.',
    iconColor: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    glow: 'hover:shadow-blue-500/10',
  },
  {
    icon: Link2,
    title: 'Decentralized Storage',
    description: 'IPFS integration ensures certificate metadata is distributed and tamper-resistant globally.',
    iconColor: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    glow: 'hover:shadow-purple-500/10',
  },
  {
    icon: Database,
    title: 'Instant Verification',
    description: 'Real-time certificate checks against the blockchain registry in under 3 seconds.',
    iconColor: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    glow: 'hover:shadow-green-500/10',
  },
  {
    icon: Search,
    title: 'Fraud Detection',
    description: 'Advanced pattern matching to detect AI-generated, forged, and unregistered certificates.',
    iconColor: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
    glow: 'hover:shadow-red-500/10',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'End-to-end cryptographic verification with privacy-first architecture by NexaForce.',
    iconColor: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    glow: 'hover:shadow-yellow-500/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized Polygon network queries deliver near-instant verification responses.',
    iconColor: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    glow: 'hover:shadow-cyan-500/10',
  },
];

export default function Features() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Why Choose{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          SkillChain?
        </span>
      </h2>
      <p className="text-center text-gray-500 mb-10 text-sm">
        Built by Team NexaForce with battle-tested blockchain technology for the modern credential economy
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-6 border ${f.bg} rounded-xl backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl ${f.glow} transition-all duration-200 group`}
          >
            <div className={`inline-flex p-3 rounded-xl ${f.bg} mb-4 group-hover:scale-110 transition-transform`}>
              <f.icon className={`w-6 h-6 ${f.iconColor}`} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Shield, Link2, Database, Search, Lock, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Certificates stored on Polygon blockchain for immutable verification',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Link2,
      title: 'Decentralized Storage',
      description: 'IPFS integration for secure and distributed certificate storage',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Database,
      title: 'Instant Verification',
      description: 'Real-time certificate verification with comprehensive database',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Search,
      title: 'Fraud Detection',
      description: 'Advanced algorithms to detect fake and tampered certificates',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'End-to-end encryption with privacy-first architecture',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with sub-second verification times',
      color: 'bg-cyan-100 text-cyan-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Why Choose SkillChain?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Shield, Database, Activity, FileCheck } from 'lucide-react';

const STATIC_STATS = [
  { icon: Database, iconColor: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', value: '7', label: 'Certificates Indexed' },
  { icon: Shield, iconColor: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', value: '5', label: 'Verified Certificates' },
  { icon: Activity, iconColor: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', value: '2.4K+', label: 'Total Verifications' },
  { icon: FileCheck, iconColor: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', value: '100%', label: 'Blockchain Secured' },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {STATIC_STATS.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl p-5 border ${s.bg} backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default`}
        >
          <div className="flex items-center justify-between mb-3">
            <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            <span className={`text-2xl font-extrabold ${s.iconColor}`}>{s.value}</span>
          </div>
          <p className="text-gray-400 text-xs font-medium leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

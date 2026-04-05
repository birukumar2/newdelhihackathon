import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const TEAM = [
  {
    name: 'Aman Kumar Happy',
    role: '',
    photo: '/Aman Logo.jpeg',
    github: 'https://github.com/amankumarhappy',
    linkedin: 'https://www.linkedin.com/in/amankumarhappy/',
    email: 'mailto:amankumarhappy1@gmail.com',
    borderActive: 'border-cyan-500/50 hover:border-cyan-400',
    ring: 'ring-cyan-400/30',
    skills: [
      { label: 'Solidity', color: 'bg-cyan-900/50 text-cyan-300' },
      { label: 'Polygon', color: 'bg-purple-900/50 text-purple-300' },
      { label: 'React', color: 'bg-blue-900/50 text-blue-300' },
      { label: 'Web3', color: 'bg-gray-700/80 text-gray-300' },
    ],
  },
  {
    name: 'Biru Kumar',
    role: '',
    photo: '/Biru Logo.png',
    github: 'https://github.com/birukumar2',
    linkedin: 'https://www.linkedin.com/in/birukumar/',
    email: 'mailto:birukumar0352@gmail.com',
    borderActive: 'border-purple-500/50 hover:border-purple-400',
    ring: 'ring-purple-400/30',
    skills: [
      { label: 'Node.js', color: 'bg-green-900/50 text-green-300' },
      { label: 'IPFS', color: 'bg-yellow-900/50 text-yellow-300' },
      { label: 'MongoDB', color: 'bg-indigo-900/50 text-indigo-300' },
      { label: 'Express', color: 'bg-gray-700/80 text-gray-300' },
    ],
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-black border-t border-gray-800/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Built by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Team NexaForce
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            BTech Computer Science &amp; Engineering · GEC Buxar · Batch 2025-2029
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className={`bg-gray-900/60 backdrop-blur rounded-2xl p-6 w-72 text-center border ${member.borderActive} transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
            >
              {/* Photo */}
              <div className={`w-28 h-28 mx-auto rounded-full overflow-hidden ring-4 ${member.ring} shadow-xl`}>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to initials if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <h3 className="text-lg font-bold text-white mt-4">{member.name}</h3>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{member.role}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.email}
                  title="Email"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Skill Tags */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {member.skills.map((s) => (
                  <span key={s.label} className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-10 space-y-1">
          <p className="text-gray-500 text-sm">🏆 HackIndia Spark 6 @ NIT Delhi 2026</p>
          <p className="text-gray-600 text-xs">🔗 https://github.com/birukumar2/newdelhihackathon</p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

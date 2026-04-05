import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/60 text-white mt-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-purple-600 p-1.5 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SkillChain</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blockchain-powered certificate verification platform built on Polygon. Fighting
              credential fraud one SBT at a time.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold mb-4 text-gray-200">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Verify Certificate', 'Issue Certificate', 'API Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4 text-gray-200">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Documentation', 'Help Center', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4 text-gray-200">Connect</h3>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/mediokart/skillchain', color: 'hover:text-white' },
                { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                { icon: Linkedin, href: '#', color: 'hover:text-blue-400' },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-800 border border-gray-700/60 p-2 rounded-lg text-gray-400 ${color} hover:border-gray-500 transition-all duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4">
              🏆 HackIndia Spark 6 · NIT Delhi 2026
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/60 pt-6 text-center text-xs text-gray-600">
          <p>© 2026 SkillChain by Team Mediokart (GEC Buxar). All rights reserved. Built on Polygon blockchain.</p>
        </div>
      </div>
    </footer>
  );
}

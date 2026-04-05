import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">SkillChain</span>
            </div>
            <p className="text-gray-400 text-sm">
              Blockchain-powered certificate verification platform built on Polygon network.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Verify Certificate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Issue Certificate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 SkillChain. All rights reserved. Built with Polygon blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
}

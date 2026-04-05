import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const InstituteLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'institute@gecbuxar.edu' && password === 'admin123') {
      localStorage.setItem('instituteAuth', 'true');
      toast.success('Login successful!', { style: { background: '#1f2937', color: '#fff' } });
      navigate('/institute-dashboard');
    } else {
      toast.error('Invalid credentials. Try institute@gecbuxar.edu / admin123', {
        style: { background: '#1f2937', color: '#fff' },
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-gray-900/70 backdrop-blur p-8 rounded-2xl border border-cyan-500/30 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Institute Portal</h2>
          <p className="text-gray-400 text-sm mt-1">Login to manage certificates</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              placeholder="Institute Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-2.5 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <p className="text-gray-500 text-xs text-center">
            Demo credentials:<br />
            <span className="text-cyan-400">institute@gecbuxar.edu</span> /{' '}
            <span className="text-cyan-400">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstituteLogin;

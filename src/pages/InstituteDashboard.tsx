import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCertificate } from '../data/certificates';
import { PlusCircle, LogOut, GraduationCap, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const InstituteDashboard: React.FC = () => {
  const [certId, setCertId] = useState('');
  const [holderName, setHolderName] = useState('');
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [txHash, setTxHash] = useState('');
  const [addedCerts, setAddedCerts] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId || !holderName || !title) {
      toast.error('Please fill all required fields', { style: { background: '#1f2937', color: '#fff' } });
      return;
    }
    addCertificate(certId, {
      valid: true,
      holderName,
      title,
      issuer,
      issueDate,
      txHash: txHash || undefined,
      blockchainVerified: true,
    });
    setAddedCerts((prev) => [...prev, certId]);
    toast.success(`Certificate "${certId}" added to registry!`, { style: { background: '#1f2937', color: '#fff' } });
    setCertId('');
    setHolderName('');
    setTitle('');
    setIssuer('');
    setIssueDate('');
    setTxHash('');
  };

  const handleLogout = () => {
    localStorage.removeItem('instituteAuth');
    navigate('/');
  };

  const fields = [
    { placeholder: 'Certificate ID *', value: certId, setter: setCertId, required: true },
    { placeholder: 'Holder Name *', value: holderName, setter: setHolderName, required: true },
    { placeholder: 'Certificate Title *', value: title, setter: setTitle, required: true },
    { placeholder: 'Issuer Organization', value: issuer, setter: setIssuer, required: false },
    { placeholder: 'Transaction Hash (optional)', value: txHash, setter: setTxHash, required: false },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Institute Dashboard</h1>
            <p className="text-gray-500 text-xs">NexaForce Certificate Registry</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:border-red-500/50 hover:text-red-400 text-gray-400 px-4 py-2 rounded-lg text-sm transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="bg-gray-900/60 backdrop-blur rounded-2xl p-6 border border-cyan-500/30 shadow-2xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-cyan-400" /> Add New Certificate to Blockchain
        </h2>
        <form onSubmit={handleAddCertificate} className="space-y-3">
          {fields.map((f) => (
            <input
              key={f.placeholder}
              type="text"
              placeholder={f.placeholder}
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              required={f.required}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition text-sm"
            />
          ))}
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition text-sm"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-2.5 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          >
            Add to Blockchain Registry
          </button>
        </form>
      </div>

      {addedCerts.length > 0 && (
        <div className="mt-4 bg-green-950/20 border border-green-500/30 rounded-xl p-4">
          <h3 className="text-green-400 font-semibold text-sm mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Certificates Added This Session
          </h3>
          <div className="space-y-1">
            {addedCerts.map((id) => (
              <div key={id} className="text-gray-300 text-xs font-mono bg-gray-800/50 px-3 py-1.5 rounded-lg">
                ✓ {id}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstituteDashboard;

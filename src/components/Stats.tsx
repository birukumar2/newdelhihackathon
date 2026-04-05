import { useEffect, useState } from 'react';
import { Shield, FileCheck, Activity, Database } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Stats() {
  const [stats, setStats] = useState({
    totalCertificates: 0,
    verifiedCertificates: 0,
    totalVerifications: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: certificates } = await supabase
        .from('certificates')
        .select('status');

      const { data: logs, count } = await supabase
        .from('verification_logs')
        .select('*', { count: 'exact', head: true });

      if (certificates) {
        setStats({
          totalCertificates: certificates.length,
          verifiedCertificates: certificates.filter((c) => c.status === 'verified').length,
          totalVerifications: count || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-3xl font-bold text-blue-600">{stats.totalCertificates}</span>
        </div>
        <p className="text-gray-600 font-semibold">Total Certificates</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-3xl font-bold text-green-600">{stats.verifiedCertificates}</span>
        </div>
        <p className="text-gray-600 font-semibold">Verified Certificates</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-3xl font-bold text-purple-600">{stats.totalVerifications}</span>
        </div>
        <p className="text-gray-600 font-semibold">Total Verifications</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-cyan-100 p-3 rounded-lg">
            <FileCheck className="w-6 h-6 text-cyan-600" />
          </div>
          <span className="text-3xl font-bold text-cyan-600">100%</span>
        </div>
        <p className="text-gray-600 font-semibold">Blockchain Secured</p>
      </div>
    </div>
  );
}

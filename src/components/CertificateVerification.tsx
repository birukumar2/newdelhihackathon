import { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase, Certificate } from '../lib/supabase';
import { verifyCertificateOnBlockchain } from '../lib/blockchain';

export default function CertificateVerification() {
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    certificate: Certificate | null;
    status: 'verified' | 'fake' | 'not_found' | null;
    message: string;
    blockchainVerification?: { verified: boolean; message: string };
  }>({
    certificate: null,
    status: null,
    message: '',
  });

  const handleVerification = async () => {
    if (!certificateId.trim()) {
      alert('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setResult({ certificate: null, status: null, message: '' });

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_id', certificateId.trim())
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        setResult({
          certificate: null,
          status: 'not_found',
          message: 'This certificate is not added in our database',
        });

        await supabase.from('verification_logs').insert({
          certificate_id: certificateId.trim(),
          verification_result: 'not_found',
        });
      } else {
        const certificate = data as Certificate;

        let blockchainVerification;
        if (certificate.blockchain_tx_hash) {
          blockchainVerification = await verifyCertificateOnBlockchain(
            certificate.certificate_hash,
            certificate.blockchain_tx_hash
          );
        }

        let message = '';
        if (certificate.status === 'verified') {
          message = 'This certificate is verified and authentic!';
        } else if (certificate.status === 'fake') {
          message = 'This is a fake certificate!';
        }

        setResult({
          certificate,
          status: certificate.status,
          message,
          blockchainVerification,
        });

        await supabase.from('verification_logs').insert({
          certificate_id: certificateId.trim(),
          verification_result: certificate.status,
        });
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      setResult({
        certificate: null,
        status: null,
        message: 'Error verifying certificate. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (!result.status) return null;

    switch (result.status) {
      case 'verified':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'fake':
        return <XCircle className="w-16 h-16 text-red-500" />;
      case 'not_found':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case 'verified':
        return 'bg-green-50 border-green-200';
      case 'fake':
        return 'bg-red-50 border-red-200';
      case 'not_found':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Verify Certificate
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
            placeholder="Enter Certificate ID"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleVerification}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search className="w-5 h-5" />
            )}
            Verify
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-semibold">Try these certificate IDs:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <button
                onClick={() => setCertificateId('GEC/Buxar/sports/26')}
                className="text-blue-600 hover:underline"
              >
                GEC/Buxar/sports/26
              </button>{' '}
              - Umang Certificate (Fake)
            </li>
            <li>
              <button
                onClick={() => setCertificateId('COPADO-060538')}
                className="text-blue-600 hover:underline"
              >
                COPADO-060538
              </button>{' '}
              - Copado Certificate (Verified)
            </li>
            <li>
              <button
                onClick={() => setCertificateId('TATA-FORAGE-2026')}
                className="text-blue-600 hover:underline"
              >
                TATA-FORAGE-2026
              </button>{' '}
              - Tata Certificate (Not in Database)
            </li>
          </ul>
        </div>
      </div>

      {result.status && (
        <div
          className={`bg-white rounded-xl shadow-lg p-8 border-4 ${getStatusColor()}`}
        >
          <div className="flex flex-col items-center mb-6">
            {getStatusIcon()}
            <h3 className="text-2xl font-bold mt-4 text-gray-800">
              {result.message}
            </h3>
          </div>

          {result.certificate && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Certificate ID</p>
                  <p className="text-lg text-gray-800">{result.certificate.certificate_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Holder Name</p>
                  <p className="text-lg text-gray-800">{result.certificate.holder_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Certificate Title</p>
                  <p className="text-lg text-gray-800">{result.certificate.certificate_title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Issuer</p>
                  <p className="text-lg text-gray-800">{result.certificate.issuer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Issue Date</p>
                  <p className="text-lg text-gray-800">
                    {new Date(result.certificate.issue_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Status</p>
                  <p className={`text-lg font-bold ${
                    result.status === 'verified' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.status.toUpperCase()}
                  </p>
                </div>
              </div>

              {result.certificate.blockchain_tx_hash && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    Blockchain Verification
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      {result.blockchainVerification?.message}
                    </p>
                    <a
                      href={`https://mumbai.polygonscan.com/tx/${result.certificate.blockchain_tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                    >
                      View on Polygon Explorer
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {result.certificate.ipfs_hash && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    IPFS Storage
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 break-all">
                      {result.certificate.ipfs_hash}
                    </p>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <img
                  src={result.certificate.image_url}
                  alt="Certificate"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

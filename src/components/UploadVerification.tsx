import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { certificatesDB } from '../data/certificates';
import { Upload, FileText, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UploadVerification: React.FC = () => {
  const [verificationResult, setVerificationResult] = useState<{valid: boolean; reason?: string; title?: string; holderName?: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = (textContent.items as Array<{str: string}>).map((item) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsLoading(true);
    setVerificationResult(null);

    try {
      if (file.type === 'application/pdf') {
        const text = await extractTextFromPDF(file);
        // Try to find known cert IDs in the extracted text
        const knownIds = Object.keys(certificatesDB);
        const foundId = knownIds.find((id) => text.includes(id));
        if (foundId) {
          const cert = certificatesDB[foundId];
          setVerificationResult({ valid: cert.valid, title: cert.title, holderName: cert.holderName, reason: cert.reason });
          toast.success(cert.valid ? 'Certificate found & verified!' : 'Fake certificate detected!', {
            style: { background: '#1f2937', color: '#fff' },
          });
        } else {
          setVerificationResult({ valid: false, reason: 'No matching certificate ID found in this document. It may not be registered on our blockchain.' });
          toast.error('Certificate not in database', { style: { background: '#1f2937', color: '#fff' } });
        }
      } else if (file.type.startsWith('image/')) {
        toast.error('Image OCR coming soon! Please upload a PDF for now.', {
          style: { background: '#1f2937', color: '#fff' },
        });
      } else {
        toast.error('Unsupported file type. Please upload a PDF.', {
          style: { background: '#1f2937', color: '#fff' },
        });
      }
    } catch (error) {
      toast.error('Error processing file. Please try again.', {
        style: { background: '#1f2937', color: '#fff' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-gray-900/60 backdrop-blur rounded-2xl border border-purple-500/30 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Upload className="w-6 h-6 text-purple-400" /> Upload Certificate PDF
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          Upload a PDF certificate to auto-extract and verify its ID on the blockchain
        </p>

        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-purple-500/40 rounded-xl cursor-pointer bg-gray-800/40 hover:bg-gray-800/70 hover:border-purple-400 transition-all duration-200 group">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              {isLoading ? (
                <div className="animate-spin h-7 w-7 border-2 border-purple-400 border-t-transparent rounded-full" />
              ) : (
                <FileText className="w-7 h-7 text-purple-400" />
              )}
            </div>
            <p className="text-sm text-gray-400">
              {isLoading ? 'Extracting text...' : fileName ? fileName : 'Click or drag PDF certificate here'}
            </p>
          </div>
          <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
        </label>

        {verificationResult && (
          <div
            className={`mt-5 p-4 rounded-xl border-2 ${
              verificationResult.valid
                ? 'bg-green-950/20 border-green-500/50'
                : 'bg-red-950/20 border-red-500/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {verificationResult.valid ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span className={`font-bold ${verificationResult.valid ? 'text-green-400' : 'text-red-400'}`}>
                {verificationResult.valid ? 'Certificate Verified ✓' : 'Cannot Verify ✗'}
              </span>
            </div>
            {verificationResult.holderName && (
              <p className="text-gray-300 text-sm">Holder: {verificationResult.holderName}</p>
            )}
            {verificationResult.title && (
              <p className="text-gray-300 text-sm">Title: {verificationResult.title}</p>
            )}
            {verificationResult.reason && (
              <p className="text-red-300 text-sm mt-1">⚠️ {verificationResult.reason}</p>
            )}
            {!verificationResult.valid && (
              <p className="text-gray-500 text-xs mt-2">
                Are you an institution?{' '}
                <a href="/institute-login" className="text-cyan-400 hover:underline">
                  Login to add this certificate →
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadVerification;

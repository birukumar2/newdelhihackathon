import Header from './components/Header';
import Stats from './components/Stats';
import CertificateVerification from './components/CertificateVerification';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Secure Certificate Verification on Polygon Blockchain
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            SkillChain uses blockchain technology to ensure the authenticity and integrity of
            certificates. Verify any certificate instantly with complete transparency and security.
          </p>
        </div>

        <Stats />

        <CertificateVerification />

        <div className="mt-16">
          <Features />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react';
import useCanvasDrawer from '../hooks/useCanvasDrawer';
import { templates } from '../utils/templates';

import ModernUploader from '../components/ModernUploader';
import ListingForm from '../components/ListingForm';
import TemplateSelector from '../components/TemplateSelector';
import CanvasPreview from '../components/CanvasPreview';

const Home = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const [formData, setFormData] = useState({
    price: '8.500.000',
    area: '120',
    rooms: '3+1',
    location: 'Karşıyaka',
    status: 'SATILIK',
    phone: '0555 123 45 67',
    companyName: 'Emlak Ofisi',
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [logoImage, setLogoImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const { drawPost, downloadPost, downloadAllPosts } = useCanvasDrawer(
    canvasRef,
    templates,
    formData,
    uploadedImages,
    currentImageIndex,
    logoImage,
    selectedTemplate
  );

  useEffect(() => {
    drawPost();
  }, [drawPost]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="home-page font-sans bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen text-gray-800">
      <div className="container mx-auto px-5 md:px-10 py-12">
        
        {/* HEADER */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            🏡 EmlakPostMatik
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Profesyonel ilan tasarımlarıyla markanı öne çıkar.
          </p>
        </header>

        {/* MAIN GRID */}
        <main className="grid lg:grid-cols-2 gap-12">
          
          {/* SOL PANEL */}
          <section className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-md">
              <ModernUploader
                files={uploadedImages}
                setFiles={setUploadedImages}
                fileInputRef={fileInputRef}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <ModernUploader
                files={logoImage}
                setFiles={setLogoImage}
                fileInputRef={logoInputRef}
                isLogo={true}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <ListingForm formData={formData} onChange={handleInputChange} />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md">
              <TemplateSelector
                templates={templates}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </div>
          </section>

          {/* SAĞ PANEL */}
          <section className="flex justify-center items-start bg-white rounded-3xl shadow-xl p-8">
            <CanvasPreview
              canvasRef={canvasRef}
              uploadedImages={uploadedImages}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              downloadPost={downloadPost}
              downloadAllPosts={downloadAllPosts}
            />
          </section>
        </main>

        {/* FOOTER */}
        <footer className="mt-20 flex justify-center">
          <div className="package-card bg-white rounded-3xl shadow-lg p-10 max-w-2xl w-full text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              💼 Profesyonel Paket
            </h3>
            <p className="text-gray-500 text-lg mb-5">
              Sınırsız ilan, tüm şablonlar, filigransız indirme.
            </p>
            <div className="text-4xl font-extrabold text-blue-600 mb-6">
              150₺ / ay
            </div>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
              Hemen Başla →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

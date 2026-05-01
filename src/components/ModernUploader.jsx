import React from 'react';
import { Upload, Trash2, Image as ImageIcon, Building2 } from 'lucide-react';

const ModernUploader = ({
  files,
  setFiles,
  fileInputRef,
  isLogo = false,
}) => {
  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filePromises = selectedFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(images => {
      setFiles(prev => isLogo ? images[0] : [...prev, ...images]);
    });
  };

  const removeFile = (index) => {
    if (isLogo) {
      setFiles(null);
    } else {
      setFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="uploader-card bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        {isLogo ? <Building2 className="w-6 h-6 text-purple-500" /> 
                : <ImageIcon className="w-6 h-6 text-blue-500" />}
        {isLogo ? 'Logo' : `Görseller (${Array.isArray(files) ? files.length : files ? 1 : 0})`}
      </h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        multiple={!isLogo}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 ${
          isLogo
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
        }`}
      >
        <Upload className="w-5 h-5" />
        {isLogo
          ? files ? 'Logo Değiştir' : 'Logo Yükle'
          : Array.isArray(files) && files.length > 0 ? 'Daha Fazla Görsel Ekle' : 'Görsel Yükle'}
      </button>

      {/* Önizleme */}
      {files && (
        <div className={`mt-4 grid ${isLogo ? 'justify-center' : 'grid-cols-3 gap-3'}`}>
          {isLogo ? (
            <div className="relative p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <img src={files.src} alt="Logo" className="w-24 h-24 object-contain" />
              <button
                onClick={() => removeFile(0)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            files.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.src}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-400 transition-all duration-200"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ModernUploader;

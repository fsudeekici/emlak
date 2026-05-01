import React from 'react';
import { Upload, Building2 } from 'lucide-react';
import './LogoUploader.css';

const LogoUploader = ({ logoImage, setLogoImage, logoInputRef }) => {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => setLogoImage(img);
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="logo-uploader-card">
      <h3 className="logo-uploader-title">
        <Building2 className="icon" />
        Logo
      </h3>

      <input
        type="file"
        ref={logoInputRef}
        onChange={handleLogoUpload}
        accept="image/*"
        className="hidden"
      />

      <button
        onClick={() => logoInputRef.current?.click()}
        className="btn-logo-upload"
      >
        <Upload className="icon" />
        {logoImage ? 'Logo Değiştir' : 'Logo Yükle'}
      </button>

      {logoImage && (
        <div className="logo-preview-wrapper">
          <div className="logo-preview-card">
            <img src={logoImage.src} alt="Logo" className="logo-preview-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoUploader;

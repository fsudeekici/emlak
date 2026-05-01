import React from 'react';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import './ImageUploader.css';

const ImageUploader = ({
  uploadedImages,
  setUploadedImages,
  setCurrentImageIndex,
  fileInputRef
}) => {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => 
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      })
    );

    Promise.all(imagePromises).then(images => {
      setUploadedImages(prev => [...prev, ...images]);
    });
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setCurrentImageIndex(prev => Math.max(0, Math.min(prev, uploadedImages.length - 2)));
  };

  return (
    <div className="uploader-card">
      <h3 className="uploader-title">
        <ImageIcon className="icon" />
        📷 Görseller ({uploadedImages.length})
      </h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="btn-upload"
      >
        <Upload className="icon" />
        {uploadedImages.length > 0 ? 'Daha Fazla Görsel Ekle' : 'Görsel Yükle'}
      </button>

      {uploadedImages.length > 0 && (
        <div className="image-grid">
          {uploadedImages.map((img, index) => (
            <div key={index} className="image-wrapper">
              <img
                src={img.src}
                alt={`Upload ${index + 1}`}
                className="uploaded-image"
                onClick={() => setCurrentImageIndex(index)}
              />
              <button
                onClick={() => removeImage(index)}
                className="btn-remove"
              >
                <Trash2 className="icon" />
              </button>
              <div className="image-index">{index + 1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

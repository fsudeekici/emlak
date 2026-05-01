// src/components/CanvasPreview.jsx
import React from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './CanvasPreview.css';

const CanvasPreview = ({
  canvasRef,
  uploadedImages,
  currentImageIndex,
  setCurrentImageIndex,
  downloadPost,
  downloadAllPosts
}) => {
  return (
    <div className="canvas-wrapper">
      <div className="canvas-card">
        <h3 className="canvas-title">📱 Önizleme</h3>

        <div className="canvas-area">
          <canvas
            ref={canvasRef}
            width={600}
            height={850}
            className="canvas-display"
          />
        </div>

        {uploadedImages.length > 1 && (
          <div className="canvas-nav">
            <button
              onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
              disabled={currentImageIndex === 0}
              className="nav-btn"
            >
              <ChevronLeft className="icon" />
            </button>
            <span className="nav-status">
              {currentImageIndex + 1} / {uploadedImages.length}
            </span>
            <button
              onClick={() => setCurrentImageIndex(Math.min(uploadedImages.length - 1, currentImageIndex + 1))}
              disabled={currentImageIndex === uploadedImages.length - 1}
              className="nav-btn"
            >
              <ChevronRight className="icon" />
            </button>
          </div>
        )}

        <div className="download-buttons">
          <button
            onClick={downloadPost}
            disabled={uploadedImages.length === 0}
            className="btn-download"
          >
            <Download className="icon" />
            Postu İndir (PNG)
          </button>

          {uploadedImages.length > 1 && (
            <button
              onClick={downloadAllPosts}
              className="btn-download-all"
            >
              <Download className="icon" />
              Tümünü İndir ({uploadedImages.length})
            </button>
          )}
        </div>

        <p className="share-text">
          ✨ Instagram, Facebook ve WhatsApp'ta paylaşmaya hazır!
        </p>
      </div>
    </div>
  );
};

export default CanvasPreview;

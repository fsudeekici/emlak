// src/hooks/useCanvasDrawer.js
import { useCallback } from 'react';

const useCanvasDrawer = (
  canvasRef,
  templates,
  formData,
  uploadedImages,
  currentImageIndex,
  logoImage,
  selectedTemplate
) => {
  const drawPost = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const template = templates[selectedTemplate];

    // Canvas temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Arka plan
    if (template.style === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, template.bgColor);
      gradient.addColorStop(1, template.secondaryColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = template.bgColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fotoğraf alanı
    const imgY = 40;
    const imgHeight = 400;
    
    if (uploadedImages.length > 0 && uploadedImages[currentImageIndex]) {
      const img = uploadedImages[currentImageIndex];
      
      if (img.complete) {
        // Aspect ratio koru
        const aspectRatio = img.width / img.height;
        let drawWidth = canvas.width - 80;
        let drawHeight = drawWidth / aspectRatio;
        
        if (drawHeight > imgHeight) {
          drawHeight = imgHeight;
          drawWidth = drawHeight * aspectRatio;
        }
        
        const x = (canvas.width - drawWidth) / 2;
        
        // Gölge efekti
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 10;
        
        ctx.drawImage(img, x, imgY, drawWidth, drawHeight);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      }
    } else {
      // Placeholder
      ctx.fillStyle = '#E5E7EB';
      ctx.fillRect(40, imgY, canvas.width - 80, imgHeight);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('📸 Fotoğraf Yükleyin', canvas.width / 2, imgY + imgHeight / 2);
    }

    // Logo çizimi (eğer varsa)
    if (logoImage && logoImage.complete) {
      const logoSize = 80;
      ctx.drawImage(logoImage, canvas.width - logoSize - 20, 50, logoSize, logoSize);
    }

    // Bilgi paneli
    const panelY = imgY + imgHeight + 30;
    const panelHeight = 340;
    
    // Panel arka planı
    ctx.fillStyle = template.style === 'gradient' ? 'rgba(255,255,255,0.95)' : template.bgColor;
    ctx.fillRect(0, panelY, canvas.width, panelHeight);

    // Üst çizgi (accent)
    ctx.fillStyle = template.accentColor || '#2563EB';
    ctx.fillRect(0, panelY, canvas.width, 6);

    let textY = panelY + 50;
    ctx.textAlign = 'left';

    // Durum (SATILIK/KİRALIK)
    ctx.fillStyle = template.accentColor || '#2563EB';
    ctx.fillRect(40, textY - 30, 150, 40);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Arial';
    ctx.fillText(formData.status, 60, textY);

    textY += 50;

    // Lokasyon
    ctx.fillStyle = template.style === 'gradient' ? '#1F2937' : template.textColor;
    ctx.font = 'bold 26px Arial';
    ctx.fillText(`📍 ${formData.location}`, 40, textY);

    textY += 40;

    // Oda ve metrekare
    ctx.font = '22px Arial';
    ctx.fillText(`🛏️ ${formData.rooms}  •  📐 ${formData.area}m²`, 40, textY);

    textY += 60;

    // Fiyat (BÜYÜK)
    ctx.fillStyle = template.accentColor || '#2563EB';
    ctx.font = 'bold 38px Arial';
    ctx.fillText(`${formData.price} ₺`, 40, textY);

    textY += 60;

    // İletişim
    ctx.fillStyle = template.style === 'gradient' ? '#1F2937' : template.textColor;
    ctx.font = '20px Arial';
    ctx.fillText(`📞 ${formData.phone}`, 40, textY);
    
    ctx.font = 'bold 18px Arial';
    ctx.fillText(formData.companyName, 40, textY + 30);

    // Watermark
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('EmlakPostMatik.com', canvas.width / 2, canvas.height - 15);

  }, [canvasRef, templates, formData, uploadedImages, currentImageIndex, logoImage, selectedTemplate]); // ✅ logoImage şimdi kullanılıyor

  const downloadPost = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `emlak-ilan-${formData.location}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  }, [canvasRef, formData.location]);

  const downloadAllPosts = useCallback(() => {
    if (uploadedImages.length === 0) return;
    
    uploadedImages.forEach((_, index) => {
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = `emlak-${formData.location}-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      }, 300 * index);
    });
  }, [canvasRef, uploadedImages, formData.location]);

  return { drawPost, downloadPost, downloadAllPosts };
};

export default useCanvasDrawer;
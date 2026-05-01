import React from 'react';
import { DollarSign, Maximize, Home, MapPin, Phone, Building } from 'lucide-react';
import './ListingForm.css';

const ListingForm = ({ formData, onChange }) => {
  return (
    <div className="listing-form">
      {/* Durum Seçimi */}
      <div className="form-card">
        <h3 className="form-title">Durum</h3>
        <div className="status-grid">
          <button
            onClick={() => onChange('status', 'SATILIK')}
            className={`status-btn ${formData.status === 'SATILIK' ? 'active' : ''}`}
          >
            SATILIK
          </button>
          <button
            onClick={() => onChange('status', 'KİRALIK')}
            className={`status-btn ${formData.status === 'KİRALIK' ? 'active' : ''}`}
          >
            KİRALIK
          </button>
        </div>
      </div>

      {/* İlan Bilgileri */}
      <div className="form-card">
        <h3 className="form-title">İlan Bilgileri</h3>
        <div className="form-fields">
          {/* Fiyat */}
          <div className="form-group">
            <label className="form-label">
              <DollarSign className="icon" />
              💰 Fiyat (₺)
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => onChange('price', e.target.value)}
              className="form-input"
              placeholder="8.500.000"
            />
          </div>

          {/* Metrekare ve Oda */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">
                <Maximize className="icon" />
                📐 m²
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => onChange('area', e.target.value)}
                className="form-input"
                placeholder="120"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Home className="icon" />
                🛏️ Oda
              </label>
              <input
                type="text"
                value={formData.rooms}
                onChange={(e) => onChange('rooms', e.target.value)}
                className="form-input"
                placeholder="3+1"
              />
            </div>
          </div>

          {/* Konum */}
          <div className="form-group">
            <label className="form-label">
              <MapPin className="icon" />
              📍 Semt
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => onChange('location', e.target.value)}
              className="form-input"
              placeholder="Karşıyaka"
            />
          </div>

          {/* Telefon */}
          <div className="form-group">
            <label className="form-label">
              <Phone className="icon" />
              📞 Telefon
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="form-input"
              placeholder="0555 123 45 67"
            />
          </div>

          {/* Firma Adı */}
          <div className="form-group">
            <label className="form-label">
              <Building className="icon" />
              🏢 Ofis Adı
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              className="form-input"
              placeholder="Emlak Ofisi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;

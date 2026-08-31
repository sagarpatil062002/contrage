import React, { useState } from 'react';
import ProductBadge from './ProductBadge';
import ProductThumbnails from './ProductThumbnails';

export default function ProductGallery({
  images = [],
  productName = 'ContrÂge Formulation',
  badgeText = 'SIGNATURE FORMULATION'
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const displayImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'];

  const currentImage = displayImages[selectedIdx] || displayImages[0];

  return (
    <div className="product-gallery" style={{ width: '100%' }}>
      {/* Main Image Frame Container */}
      <div
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
          width: '100%'
        }}
      >
        {/* Signature Formulation Badge */}
        {badgeText && <ProductBadge text={badgeText} />}

        {/* Main Product Image */}
        <img
          src={currentImage}
          alt={productName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.25s ease'
          }}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Thumbnails Row */}
      <ProductThumbnails
        images={displayImages}
        selectedIndex={selectedIdx}
        onSelect={(idx) => setSelectedIdx(idx)}
      />
    </div>
  );
}

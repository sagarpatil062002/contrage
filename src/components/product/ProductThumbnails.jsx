import React from 'react';

export default function ProductThumbnails({ images = [], selectedIndex = 0, onSelect }) {
  if (!images || images.length <= 1) return null;

  return (
    <div
      className="product-thumbnails-container"
      style={{
        display: 'flex',
        gap: '0.65rem',
        overflowX: 'auto',
        paddingBottom: '0.35rem',
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
        maxWidth: '100%'
      }}
    >
      {images.map((img, idx) => {
        const isSelected = selectedIndex === idx;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            aria-label={`View product image ${idx + 1}`}
            aria-pressed={isSelected}
            style={{
              width: '68px',
              height: '68px',
              minWidth: '68px',
              minHeight: '68px',
              borderRadius: '6px',
              border: isSelected ? '2px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.12)',
              padding: '2px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
              boxShadow: isSelected ? '0 0 0 1px #0284C7' : 'none'
            }}
          >
            <img
              src={img}
              alt={`Thumbnail view ${idx + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
              loading="lazy"
            />
          </button>
        );
      })}
    </div>
  );
}

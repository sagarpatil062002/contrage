import React from 'react';

export default function ProductBadge({ text = 'SIGNATURE FORMULATION' }) {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 10,
        backgroundColor: '#17213A',
        color: '#FFFFFF',
        fontSize: '0.68rem',
        fontWeight: '800',
        padding: '0.35rem 0.85rem',
        borderRadius: '9999px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center'
      }}
    >
      {text}
    </div>
  );
}

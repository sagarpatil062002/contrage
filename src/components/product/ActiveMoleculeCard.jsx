import React from 'react';

export default function ActiveMoleculeCard({ activeIngredient }) {
  if (!activeIngredient) return null;

  const { name, percentage, role } = activeIngredient;

  return (
    <div
      style={{
        backgroundColor: '#F0F9FF',
        borderRadius: '8px',
        padding: '1.15rem 1.25rem',
        border: '1px solid #BAE6FD',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 8px rgba(2, 132, 199, 0.04)'
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: '800',
          color: '#0369A1',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '0.35rem'
        }}
      >
        KEY ACTIVE MOLECULE:
      </div>

      <div
        style={{
          fontSize: 'clamp(0.95rem, 2.4vw, 1.08rem)',
          fontWeight: '800',
          color: '#0F172A',
          marginBottom: '0.3rem',
          lineHeight: '1.35',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.35rem',
          flexWrap: 'wrap'
        }}
      >
        <span role="img" aria-label="Microscope">🔬</span>
        <span>{percentage ? `${percentage} ${name}` : name}</span>
      </div>

      {role && (
        <div
          style={{
            fontSize: '0.82rem',
            color: '#334155',
            lineHeight: '1.55'
          }}
        >
          {role}
        </div>
      )}
    </div>
  );
}

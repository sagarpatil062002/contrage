import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';

export default function ProductTabs({ product }) {
  if (!product) return null;

  const [openSections, setOpenSections] = useState({
    benefits: true,
    inci: true,
    usage: false
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      aria-label="Clinical Formulation Details"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        marginBottom: '3.5rem',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
      }}
    >
      {/* Section 1: Overview & Clinical Action */}
      <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
        <button
          type="button"
          onClick={() => toggleSection('benefits')}
          aria-expanded={openSections.benefits}
          style={{
            width: '100%',
            padding: '1.15rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#0F172A',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>
            1. Formulation Overview & Clinical Action
          </span>
          {openSections.benefits ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.benefits && (
          <div style={{ padding: '0 1.4rem 1.4rem 1.4rem', color: '#334155', lineHeight: '1.7', fontSize: '0.9rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              {product.tagline}
            </p>
            {product.doctorNote && (
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  borderLeft: '3px solid #0284C7',
                  padding: '0.85rem 1rem',
                  borderRadius: '0 6px 6px 0',
                  fontSize: '0.85rem',
                  color: '#0F172A',
                  fontStyle: 'italic',
                  lineHeight: '1.6'
                }}
              >
                💡 {product.doctorNote}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 2: Active Molecules & Full INCI */}
      <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
        <button
          type="button"
          onClick={() => toggleSection('inci')}
          aria-expanded={openSections.inci}
          style={{
            width: '100%',
            padding: '1.15rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#0F172A',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>
            2. Active Molecules & Full INCI Transparency
          </span>
          {openSections.inci ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.inci && (
          <div style={{ padding: '0 1.4rem 1.4rem 1.4rem' }}>
            {product.activeIngredients && product.activeIngredients.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.85rem',
                  marginBottom: '1.25rem'
                }}
              >
                {product.activeIngredients.map((act, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: '0.9rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0284C7', marginBottom: '0.2rem' }}>
                      {act.percentage ? `${act.percentage} ${act.name}` : act.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.5' }}>
                      {act.role}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {product.fullInci && (
              <div>
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.35rem'
                  }}
                >
                  Full INCI Declaration:
                </div>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: '#64748B',
                    lineHeight: '1.6',
                    fontFamily: 'monospace',
                    backgroundColor: '#F8FAFC',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    wordBreak: 'break-word',
                    border: '1px solid rgba(15, 23, 42, 0.04)'
                  }}
                >
                  {product.fullInci}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 3: How to Use */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection('usage')}
          aria-expanded={openSections.usage}
          style={{
            width: '100%',
            padding: '1.15rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#0F172A',
            gap: '1rem'
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>
            3. Application Routine & AM / PM Protocol
          </span>
          {openSections.usage ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {openSections.usage && (
          <div style={{ padding: '0 1.4rem 1.4rem 1.4rem', color: '#334155', fontSize: '0.88rem', lineHeight: '1.7' }}>
            {product.howToUse && (
              <>
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  {product.howToUse.am && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.74rem',
                        fontWeight: '700'
                      }}
                    >
                      <Sun size={13} /> Morning (AM)
                    </span>
                  )}
                  {product.howToUse.pm && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#EDE9FE',
                        color: '#6D28D9',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.74rem',
                        fontWeight: '700'
                      }}
                    >
                      <Moon size={13} /> Evening (PM)
                    </span>
                  )}
                </div>

                {product.howToUse.step && (
                  <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                    {product.howToUse.step}
                  </div>
                )}

                <p style={{ marginBottom: '1rem' }}>
                  {product.howToUse.instructions}
                </p>

                {product.howToUse.warning && (
                  <div
                    style={{
                      backgroundColor: '#FEF2F2',
                      borderLeft: '3px solid #EF4444',
                      padding: '0.75rem 1rem',
                      fontSize: '0.82rem',
                      color: '#991B1B',
                      borderRadius: '0 6px 6px 0'
                    }}
                  >
                    ⚠️ {product.howToUse.warning}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

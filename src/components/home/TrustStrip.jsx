import React from 'react';
import { ShieldCheck, FlaskConical, Sparkles, Award } from 'lucide-react';

export default function TrustStrip() {
  const pillars = [
    { title: 'Dermatologist Led', desc: 'Formulated with clinical advisory expertise', icon: <ShieldCheck size={18} /> },
    { title: 'Research Focused', desc: 'Informed by peer-reviewed dermatology studies', icon: <FlaskConical size={18} /> },
    { title: 'Purposeful Formulations', desc: 'Targeted active molecules with zero filler', icon: <Sparkles size={18} /> },
    { title: 'Premium Ingredients', desc: 'High-purity USP & pharmaceutical grades', icon: <Award size={18} /> }
  ];

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      padding: '1.75rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-lavender)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(216, 210, 231, 0.8)'
              }}>
                {p.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '0.88rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em'
                }}>
                  {p.title}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.3'
                }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

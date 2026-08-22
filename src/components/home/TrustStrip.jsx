import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, FlaskConical, Sparkles, Award } from 'lucide-react';

export default function TrustStrip() {
  const { siteContent } = useStore();

  const iconLookup = [
    <ShieldCheck size={18} key="icon-0" />,
    <FlaskConical size={18} key="icon-1" />,
    <Sparkles size={18} key="icon-2" />,
    <Award size={18} key="icon-3" />
  ];

  const defaultTrustBadges = [
    { title: 'Dermatologist Led', subtitle: 'Formulated with clinical advisory expertise' },
    { title: 'Research Focused', subtitle: 'Informed by peer-reviewed dermatology studies' },
    { title: 'Purposeful Formulations', subtitle: 'Targeted active molecules with zero filler' },
    { title: 'Premium Ingredients', subtitle: 'High-purity USP & pharmaceutical grades' }
  ];

  const badges = siteContent?.trustStrip || defaultTrustBadges;

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
          {badges.map((p, i) => (
            <div
              key={p.id || i}
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
                {iconLookup[i % iconLookup.length]}
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
                  {p.subtitle || p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, FlaskConical, Sparkles, HeartHandshake } from 'lucide-react';

export default function WhyOurFormulationsSection() {
  const { siteContent } = useStore();

  const iconKeyMap = {
    ShieldCheck: <ShieldCheck size={24} color="#6C5B8B" />,
    FlaskConical: <FlaskConical size={24} color="#3B5D92" />,
    Sparkles: <Sparkles size={24} color="#C28E46" />,
    HeartHandshake: <HeartHandshake size={24} color="#438E75" />
  };

  const defaultPillars = [
    {
      title: 'Dermatological Expertise',
      description: 'Developed with professional skincare expertise and clinical advisory oversight.',
      iconKey: 'ShieldCheck'
    },
    {
      title: 'Research Driven',
      description: 'Formulations informed by published scientific dermatological research and in-vivo assays.',
      iconKey: 'FlaskConical'
    },
    {
      title: 'Purposeful Ingredients',
      description: 'Carefully selected active molecules at functional percentages with 100% INCI transparency.',
      iconKey: 'Sparkles'
    },
    {
      title: 'Skin First',
      description: 'Designed around real skin concerns to restore, protect, and fortify your natural barrier.',
      iconKey: 'HeartHandshake'
    }
  ];

  const pillars = siteContent?.formulationPillars || defaultPillars;

  return (
    <section className="section-padding" style={{
      background: 'linear-gradient(135deg, #F2F5FA 0%, #EDEAF4 60%, #F7F5F7 100%)',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Floating Bubble */}
      <div className="ethereal-bubble animate-float-slow" style={{ top: '15%', left: '5%', width: '50px', height: '50px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ bottom: '12%', right: '7%', width: '40px', height: '40px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            OUR CLINICAL MANIFESTO
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)'
          }}>
            Why Our Formulations
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Every bottle is engineered to bridge dermatological science and daily skin wellness.
          </p>
        </div>

        <div className="grid-4">
          {pillars.map((p, idx) => (
            <div
              key={p.id || idx}
              className="soft-translucent-card"
              style={{
                padding: '2rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: '0 4px 12px rgba(23, 33, 58, 0.04)'
              }}>
                {iconKeyMap[p.iconKey] || <ShieldCheck size={24} color="#6C5B8B" />}
              </div>

              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-serif)'
              }}>
                {p.title}
              </h3>

              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.55'
              }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

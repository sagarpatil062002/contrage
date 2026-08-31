import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ArrowRight, Sparkles, ShieldCheck, Sun, Clock, Maximize2, HeartHandshake } from 'lucide-react';

export default function ConcernsPage() {
  const { concerns } = useStore();

  const iconMap = {
    'concern-acne': <Sparkles size={24} />,
    'concern-pigmentation': <Sun size={24} />,
    'concern-barrier': <ShieldCheck size={24} />,
    'concern-aging': <Clock size={24} />,
    'concern-pores': <Maximize2 size={24} />,
    'concern-sensitivity': <HeartHandshake size={24} />
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '80vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: 'clamp(1.75rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2.5rem) 0'
      }}>
        <div className="container">
          <Breadcrumbs embedded items={[{ label: 'Home', to: '/' }, { label: 'Concerns Hub' }]} />
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Clinical Dermatology Hub
          </span>
          <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
            Shop by Skin Concern
          </h1>
          <p style={{ fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '720px', lineHeight: '1.6' }}>
            Explore deep clinical guides on major epidermal dysfunctions, biological pathways, contraindicated ingredients, and doctor-prescribed 3-step AM/PM routines.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1.25rem, 3vw, 2rem)'
        }}>
          {concerns.map(c => (
            <div
              key={c.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div>
                {/* Visual Thumbnail */}
                {c.heroImage && (
                  <div style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    position: 'relative',
                    border: '1px solid #E2E8F0'
                  }}>
                    <img
                      src={c.heroImage}
                      alt={c.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      left: '0.5rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--teal-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                      {iconMap[c.id] || <Sparkles size={18} />}
                    </div>
                  </div>
                )}

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.5rem', wordBreak: 'break-word' }}>
                  {c.name}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {c.shortDesc}
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.45rem', letterSpacing: '0.05em' }}>
                    Targeted Doctor Actives:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {c.recommendedActives.map((act, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          padding: '0.25rem 0.55rem',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.74rem',
                          fontWeight: '600',
                          color: 'var(--teal-950)'
                        }}
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to={`/concerns/${c.slug}`}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  gap: '0.45rem'
                }}
              >
                <span>View 3-Step Regimen</span>
                <ArrowRight size={15} style={{ flexShrink: 0 }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

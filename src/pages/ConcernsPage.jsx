import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
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
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Clinical Dermatology Hub
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Shop by Skin Concern
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Explore deep clinical guides on major epidermal dysfunctions, biological pathways, contraindicated ingredients, and doctor-prescribed 3-step AM/PM routines.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="grid-3">
          {concerns.map(c => (
            <div
              key={c.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--teal-100)',
                  color: 'var(--teal-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {iconMap[c.id] || <Sparkles size={24} />}
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {c.name}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                  {c.shortDesc}
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
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
                          fontSize: '0.75rem',
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
                style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
              >
                View 3-Step Clinical Regimen <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, ShieldCheck, Sun, Clock, Maximize2, Sparkles, HeartHandshake } from 'lucide-react';

export default function ConcernNavigator() {
  const { concerns } = useStore();

  const iconMap = {
    'acne-breakouts': <ShieldCheck size={22} color="#6C5B8B" />,
    'hyperpigmentation': <Sun size={22} color="#C28E46" />,
    'damaged-barrier': <HeartHandshake size={22} color="#438E75" />,
    'aging-fine-lines': <Clock size={22} color="#3B5D92" />,
    'open-pores': <Maximize2 size={22} color="#6C5B8B" />,
    'redness-rosacea': <Sparkles size={22} color="#D96B7D" />
  };

  return (
    <section className="section-padding" style={{
      background: 'linear-gradient(180deg, #F7F5F7 0%, #EDEAF4 50%, #F7F5F7 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Floating Bubbles */}
      <div className="ethereal-bubble animate-float-slow" style={{ top: '8%', right: '6%', width: '56px', height: '56px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ bottom: '10%', left: '4%', width: '42px', height: '42px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            TARGETED DERMATOLOGY
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Shop by Skin Concern
          </h2>
          <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Find targeted skincare designed around your skin's needs.
          </p>
        </div>

        {/* Soft Translucent Concern Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concerns.map((item) => (
            <Link
              key={item.id}
              to={`/concerns/${item.slug}`}
              className="soft-translucent-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(23, 33, 58, 0.08)',
                    boxShadow: '0 4px 12px rgba(23, 33, 58, 0.03)'
                  }}>
                    {iconMap[item.slug] || <Sparkles size={22} color="#6C5B8B" />}
                  </div>

                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                    {item.recommendedProducts?.length || 3} Formulations
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                  fontFamily: 'var(--font-serif)'
                }}>
                  {item.name}
                </h3>

                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                paddingTop: '0.5rem'
              }}>
                <span>Explore Regimen</span>
                <ArrowRight size={14} style={{ transition: 'transform 0.2s' }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

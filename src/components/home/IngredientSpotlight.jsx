import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { FlaskConical, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function IngredientSpotlight() {
  const { ingredients } = useStore();
  const [selectedSlug, setSelectedSlug] = useState('niacinamide');

  const active = ingredients.find(ing => ing.slug === selectedSlug) || ingredients[0];

  return (
    <section className="section-padding" style={{
      background: 'linear-gradient(180deg, #F7F5F7 0%, #EDEAF4 40%, #E5EBF5 100%)',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Bubbles */}
      <div className="ethereal-bubble animate-float-slow" style={{ top: '10%', left: '8%', width: '45px', height: '45px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ bottom: '15%', right: '10%', width: '60px', height: '60px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            MOLECULAR PROFILE
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-serif)'
          }}>
            The Science of Ingredients
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            A closer look at skincare's most researched active molecules.
          </p>
        </div>

        {/* Ingredient Molecule Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {ingredients.slice(0, 6).map(ing => (
            <button
              key={ing.id}
              onClick={() => setSelectedSlug(ing.slug)}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: '600',
                border: selectedSlug === ing.slug ? '1px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.1)',
                backgroundColor: selectedSlug === ing.slug ? 'var(--accent-navy)' : '#FFFFFF',
                color: selectedSlug === ing.slug ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedSlug === ing.slug ? '0 4px 14px rgba(23, 33, 58, 0.15)' : 'none'
              }}
            >
              {ing.name}
            </button>
          ))}
        </div>

        {/* 2-Column Molecule Dossier Card */}
        {active && (
          <div
            className="soft-translucent-card"
            style={{
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left: Scientific Specs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge badge-lavender">{active.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>INCI: {active.inci}</span>
              </div>

              <h3 style={{
                fontSize: '2.2rem',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-serif)'
              }}>
                {active.name}
              </h3>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                marginBottom: '1.75rem'
              }}>
                {active.description}
              </p>

              {/* 3 Parameter Chips */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(23, 33, 58, 0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Mol. Weight</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{active.molecularWeight}</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(23, 33, 58, 0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Optimal pH</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{active.optimalPh}</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(23, 33, 58, 0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Safety Rating</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#438E75', marginTop: '0.2rem' }}>EWG {active.ewgScore}</div>
                </div>
              </div>

              {/* Synergistic Pairings */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  Clinical Synergies:
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {active.synergies?.map((syn, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(23, 33, 58, 0.08)', color: 'var(--text-secondary)' }}>
                      + {syn}
                    </span>
                  ))}
                </div>
              </div>

              <Link to="/ingredients" className="btn btn-primary btn-md">
                Explore Ingredient Directory <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right: Formulation Photo Spotlight */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '360px',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(23, 33, 58, 0.08)',
                border: '3px solid #FFFFFF'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
                  alt={active.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#6C5B8B', fontWeight: '700', textTransform: 'uppercase' }}>Target Action</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>{active.clinicalMechanism?.substring(0, 60)}...</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

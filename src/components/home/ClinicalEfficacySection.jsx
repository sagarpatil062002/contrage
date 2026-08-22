import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import BeforeAfterSlider from '../common/BeforeAfterSlider';
import { FlaskConical } from 'lucide-react';

export default function ClinicalEfficacySection() {
  const { clinicalTrials } = useStore();
  const [activeTrialTab, setActiveTrialTab] = useState(0);

  const trials = (clinicalTrials && clinicalTrials.length > 0) ? clinicalTrials : [
    {
      title: 'Post-Acne Erythema & Blemish Clearance',
      duration: '4-Week Randomized Blinded Trial (n=120)',
      formulation: '10% Niacinamide + 2% Zinc PCA Serum',
      metrics: [
        { label: 'Sebum Output Reduction', value: '43%', instrument: 'Sebumeter® SM 815' },
        { label: 'Blemish Redness Reduction', value: '88%', instrument: 'Mexameter® MX 18' },
        { label: 'Patient Barrier Improvement', value: '94%', instrument: 'Corneometer® CM 825' }
      ],
      beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f02e75e921d?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      notes: 'Formulation introduced daily PM after mild cleansing. Zero transepidermal barrier disruption noted.'
    }
  ];

  const currentIdx = Math.min(activeTrialTab, trials.length - 1);
  const current = trials[currentIdx] || trials[0];

  return (
    <section className="section-padding" style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            EVIDENCE-BASED RESULTS
          </div>

          <h2 style={{
            fontSize: 'clamp(2.1rem, 4vw, 3rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)'
          }}>
            The Science Behind Your Skin
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            Explore the research, formulation principles and ingredients behind our products.
          </p>
        </div>

        {/* Trial Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap'
        }}>
          {trials.map((t, idx) => (
            <button
              key={t.id || idx}
              onClick={() => setActiveTrialTab(idx)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: '600',
                border: currentIdx === idx ? '1px solid var(--accent-navy)' : '1px solid var(--border-medium)',
                backgroundColor: currentIdx === idx ? 'var(--accent-navy)' : 'var(--bg-lavender)',
                color: currentIdx === idx ? '#FFFFFF' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* 2-Column Clinical Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #F7F5F7 0%, #EDEAF4 50%, #E5EBF5 100%)',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Left Column: Interactive Before/After Split Slider */}
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>
                In-Vivo Visual Verification
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {current.duration}
              </span>
            </div>

            <BeforeAfterSlider
              beforeImage={current.beforeImage}
              afterImage={current.afterImage}
              beforeLabel="Baseline"
              afterLabel="Day 28"
            />
          </div>

          {/* Right Column: Bio-Instrumentation Metrics */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6C5B8B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Tested Formulation: {current.formulation}
            </div>

            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
              Quantifiable Dermatological Outcomes
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              {current.notes}
            </p>

            {/* Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {(current.metrics || []).map((m, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '1.15rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(23, 33, 58, 0.08)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.1' }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {m.instrument}
                  </div>
                </div>
              ))}
            </div>

            <Link to="/research" className="btn btn-primary btn-md">
              <FlaskConical size={16} /> Explore Research Whitepapers &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

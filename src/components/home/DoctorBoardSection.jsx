import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Award, MapPin, Building2, ArrowRight } from 'lucide-react';

export default function DoctorBoardSection() {
  const { doctors } = useStore();

  return (
    <section className="section-padding" style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            GLOBAL MEDICAL ADVISORY
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)'
          }}>
            Dermatologist Led
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Our formulating collective unites leading dermatological minds across London, Seoul, New York, Zurich, and Mumbai.
          </p>
        </div>

        {/* 3-Column Doctor Cards */}
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          {doctors.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(23, 33, 58, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                <img
                  src={doc.image || doc.photo || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'}
                  alt={doc.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <MapPin size={11} color="#6C5B8B" />
                  <span>{doc.location}</span>
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                  fontFamily: 'var(--font-serif)'
                }}>
                  {doc.name}
                </h3>

                <div style={{ fontSize: '0.78rem', color: 'var(--teal-800)', fontWeight: '700', marginBottom: '0.4rem' }}>
                  {doc.role}
                </div>

                {(doc.affiliation || doc.hospital || doc.institution || doc.specialty) && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                    {doc.affiliation || doc.hospital || doc.institution || doc.specialty}
                  </div>
                )}

                {(doc.bio || doc.quote) && (
                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    margin: 0
                  }}>
                    {doc.bio || `"${doc.quote}"`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/about" className="btn btn-secondary btn-md">
            Learn About Our Dermatologist Collective &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

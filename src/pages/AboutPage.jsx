import React from 'react';
import { Link } from 'react-router-dom';
import DoctorBoardSection from '../components/home/DoctorBoardSection';
import {
  ShieldCheck,
  FlaskConical,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(180deg, #FAF9F6 0%, #F0FDFA 100%)',
        borderBottom: '1px solid #E2E8F0',
        padding: 'clamp(3rem, 5vw, 5rem) 0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>
              The Global Dermatology Collective
            </span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: 'var(--text-primary)', marginBottom: '1.25rem', lineHeight: '1.15' }}>
              Skincare Developed by Practicing Doctors, Not Marketing Teams.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              Aesthederm Labs was founded in 2022 when a multidisciplinary collective of 42+ dermatologists, plastic surgeons, and formulation biochemists across 12 countries joined together to solve a fundamental crisis in cosmetic skincare: opaque marketing claims, unscientific concentrations, and fragrance-induced contact dermatitis.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Narrative Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>Our Origin & Manifesto</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                Bridging Hospital Dermatology & Daily Patient Care
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1rem' }}>
                In clinical practice, our dermatologists were treating thousands of patients whose skin barriers had been severely compromised by aggressive over-the-counter products loaded with synthetic fragrance, comedogenic fillers, and unstable vitamins.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                We engineered Aesthederm Labs to deliver pharmaceutical-standard molecular purity directly to the consumer. We formulate with bioactive molecules at proven therapeutic thresholds, buffered at the skin’s biological acid mantle (pH 4.5–5.5), and sealed in cold-chain protected vessels.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--teal-700)" />
                  <span>100% Molecular Percentage Transparency</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--teal-700)" />
                  <span>0% Synthetic Fragrances, Essential Oils, or Phthalates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--teal-700)" />
                  <span>Validated by In-Vivo Optical Bio-Instrumentation</span>
                </div>
              </div>
            </div>

            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              border: '1px solid #E2E8F0',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80"
                alt="Aesthederm Clinical Laboratory Research"
                style={{ width: '100%', height: 'clamp(260px, 45vw, 440px)', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(11, 17, 24, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5EEAD4', fontWeight: '800' }}>
                  Laboratory Standards
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                  GMP Certified Cleanrooms • ISO 22716 Clinical Standards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Doctor Board Section */}
      <DoctorBoardSection />

      {/* Professional Clinic & Salon Wholesale Program */}
      <section className="section-padding" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--bg-dark)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            color: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            backgroundImage: 'radial-gradient(circle at right top, rgba(15,118,110,0.35) 0%, transparent 60%)'
          }}>
            <div>
              <span className="badge badge-dark" style={{ marginBottom: '0.75rem', borderColor: '#5EEAD4' }}>
                Professional B2B Network
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                Clinic Backbar & Salon Partnerships
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                Over 340+ dermatology clinics, medical spas, and luxury aesthetic salons worldwide trust Aesthederm Labs for pre-procedure priming and post-laser barrier recovery protocols.
              </p>
              <Link to="/contact" className="btn btn-accent btn-lg">
                Apply for Wholesale & Clinic Partnership <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#5EEAD4', fontFamily: 'var(--font-serif)' }}>340+</div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Partner Clinics Worldwide</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#5EEAD4', fontFamily: 'var(--font-serif)' }}>100%</div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Fragrance-Free Formulation</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#5EEAD4', fontFamily: 'var(--font-serif)' }}>42+</div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Dermatologist Formulators</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#5EEAD4', fontFamily: 'var(--font-serif)' }}>0%</div>
                <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Animal Testing (Cruelty Free)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

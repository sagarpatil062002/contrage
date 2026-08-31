import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, FlaskConical, ShieldCheck } from 'lucide-react';

export default function HeroBanner() {
  const { siteContent } = useStore();
  const hero = siteContent?.hero || {
    eyebrow: 'CLINICAL COSMECEUTICAL INNOVATION',
    titleLine1: 'YOUR PARTNER IN',
    titleLine2: 'SKIN IMPROVEMENT.',
    description: 'High-quality cosmeceutical formulations, NDGA cellular intervention, and non-invasive treatments developed with dermatological precision and Dr. Siddhi advisory oversight.',
    primaryCtaText: 'DISCOVER FORMULATIONS',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'CLINIC & B2B PORTAL',
    secondaryCtaLink: '/dermatologist-b2b',
    badgeText: '100% ACTIVE TRANSPARENCY',
    leftProductImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    centerProductImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rightProductImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 45%, #E0F2FE 85%, #F0F9FF 100%)',
      overflow: 'hidden',
      paddingTop: 'clamp(2.5rem, 5vw, 5rem)',
      paddingBottom: 'clamp(3rem, 6vw, 5.5rem)',
      borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
      boxShadow: 'inset 0 -10px 25px rgba(15, 23, 42, 0.02)'
    }}>
      {/* Background Subtle Gradient Blobs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-5%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(240, 249, 255, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(240, 249, 255, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center'
        }}>
          {/* Left Column: Typography & CTAs */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            {/* Small Eyebrow */}
            <div style={{
              fontSize: 'clamp(0.7rem, 1.8vw, 0.78rem)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--text-secondary)' }} />
              {hero.eyebrow}
            </div>

            {/* Large Serif Heading */}
            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.8vw, 3.8rem)',
              lineHeight: '1.12',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
              fontWeight: '500'
            }}>
              {hero.titleLine1} <br />
              <span style={{
                fontStyle: 'italic',
                color: 'var(--teal-800)',
                background: 'linear-gradient(135deg, #0369A1 0%, #0D9488 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {hero.titleLine2}
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.12rem)',
              lineHeight: '1.65',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              marginBottom: '2rem'
            }}>
              {hero.description}
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem'
            }}>
              <Link
                to={hero.primaryCtaLink}
                className="btn btn-primary"
                style={{
                  boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.35)',
                  padding: '0.85rem 1.8rem',
                  fontSize: '0.95rem'
                }}
              >
                {hero.primaryCtaText}
                <ArrowRight size={18} />
              </Link>

              <Link
                to={hero.secondaryCtaLink}
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.95rem'
                }}
              >
                {hero.secondaryCtaText}
              </Link>
            </div>

            {/* Clinical Evidence Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 3vw, 1.75rem)',
              flexWrap: 'wrap',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
                <FlaskConical size={18} color="var(--teal-700)" />
                <span>Dr. Siddhi Formulated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
                <ShieldCheck size={18} color="var(--teal-700)" />
                <span>Zero Fragrance / Hypoallergenic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'clamp(320px, 45vw, 420px)'
          }}>
            {/* Ambient Background Disc */}
            <div style={{
              position: 'absolute',
              width: 'clamp(280px, 40vw, 400px)',
              height: 'clamp(280px, 40vw, 400px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFFFFF 0%, #F0F9FF 60%, rgba(224, 242, 254, 0.4) 100%)',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8) inset',
              zIndex: 1
            }} />

            {/* 3-Tier Staggered Product Trio Display */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              height: 'clamp(300px, 42vw, 380px)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Left Product Bottle */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '6%',
                width: 'clamp(95px, 25%, 140px)',
                zIndex: 4,
                filter: 'drop-shadow(0 15px 25px rgba(23, 33, 58, 0.12))',
                transition: 'transform 0.4s ease'
              }}
                className="animate-float-slow"
              >
                <img
                  src={hero.leftProductImage}
                  alt="Clinical Serum Formulation"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: 'clamp(150px, 35vw, 220px)',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              {/* Center Main Product Bottle (Elevated) */}
              <div style={{
                position: 'absolute',
                bottom: '65px',
                width: 'clamp(115px, 32%, 170px)',
                zIndex: 6,
                filter: 'drop-shadow(0 20px 35px rgba(23, 33, 58, 0.15))',
                transition: 'transform 0.4s ease'
              }}>
                <img
                  src={hero.centerProductImage}
                  alt="Hero Clinical Retinaldehyde Bottle"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: 'clamp(180px, 42vw, 260px)',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '3px solid #FFFFFF'
                  }}
                />
              </div>

              {/* Right Product Jar */}
              <div style={{
                position: 'absolute',
                bottom: '45px',
                right: '6%',
                width: 'clamp(95px, 25%, 145px)',
                zIndex: 5,
                filter: 'drop-shadow(0 15px 25px rgba(23, 33, 58, 0.12))',
                transition: 'transform 0.4s ease'
              }}
                className="animate-float-alt"
              >
                <img
                  src={hero.rightProductImage}
                  alt="Ceramide Barrier Repair Cream Jar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: 'clamp(140px, 32vw, 200px)',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              {/* Floating Pearl Shimmer Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '8px',
                zIndex: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(23, 33, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
                fontWeight: '700',
                color: 'var(--text-primary)'
              }}>
                <Sparkles size={12} color="#0284C7" />
                <span>{hero.badgeText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

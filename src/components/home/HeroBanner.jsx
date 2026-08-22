import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroBanner() {
  const { siteContent } = useStore();
  const hero = siteContent?.hero || {
    eyebrow: 'DERMATOLOGIST-LED SKINCARE',
    titleLine1: 'Advanced Skincare.',
    titleLine2: 'Guided by Science.',
    description: 'Premium skincare formulations developed with dermatological expertise and designed around the needs of your skin.',
    primaryCtaText: 'Explore Products',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'Find Your Concern',
    secondaryCtaLink: '/concerns',
    badgeText: '100% Active Transparency',
    leftProductImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    centerProductImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=600&q=80',
    rightProductImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #F7F5F7 0%, #EDEAF4 45%, #E5EBF5 80%, #F2F5FA 100%)',
      overflow: 'hidden',
      paddingTop: 'clamp(3rem, 6vw, 5.5rem)',
      paddingBottom: 'clamp(3.5rem, 7vw, 6.5rem)',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)'
    }}>
      {/* Soft Ambient Ethereal Glow Circles */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '5%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(237, 234, 244, 0.9) 0%, rgba(229, 235, 245, 0.4) 50%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229, 235, 245, 0.8) 0%, rgba(247, 245, 247, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Floating Translucent Bubbles */}
      <div className="ethereal-bubble animate-float-slow" style={{ top: '15%', left: '8%', width: '48px', height: '48px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ top: '65%', left: '12%', width: '32px', height: '32px' }} />
      <div className="ethereal-bubble animate-float-slow" style={{ top: '25%', right: '8%', width: '64px', height: '64px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ bottom: '15%', right: '22%', width: '38px', height: '38px' }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center'
        }}>
          {/* Left Column: Editorial Statement & CTAs */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            {/* Small Eyebrow */}
            <div style={{
              fontSize: '0.78rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--text-secondary)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ width: '18px', height: '1px', backgroundColor: 'var(--text-secondary)' }} />
              {hero.eyebrow}
            </div>

            {/* Large Serif Heading */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              lineHeight: '1.1',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              fontWeight: '500'
            }}>
              {hero.titleLine1} <br />
              <span style={{ fontStyle: 'italic', fontWeight: '400' }}>
                {hero.titleLine2}
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              maxWidth: '480px'
            }}>
              {hero.description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to={hero.primaryCtaLink || '/shop'} className="btn btn-primary btn-lg">
                {hero.primaryCtaText} <ArrowRight size={16} />
              </Link>
              <Link to={hero.secondaryCtaLink || '/concerns'} className="btn btn-secondary btn-lg">
                {hero.secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Product Composition on Soft Geometric Pedestals */}
          <div style={{ position: 'relative', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              height: '460px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>
              {/* Soft Main Podium Base */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                width: '92%',
                height: '75px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(23, 33, 58, 0.1) 0%, rgba(23, 33, 58, 0.02) 60%, transparent 80%)',
                filter: 'blur(8px)',
                zIndex: 1
              }} />

              {/* Tier 1 Lower Podium Platform */}
              <div style={{
                position: 'absolute',
                bottom: '25px',
                width: '85%',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #EDEAF4 100%)',
                boxShadow: '0 20px 40px rgba(23, 33, 58, 0.06), inset 0 2px 4px #FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                zIndex: 2
              }} />

              {/* Tier 2 Elevated Center Pedestal */}
              <div style={{
                position: 'absolute',
                bottom: '48px',
                width: '55%',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E5EBF5 100%)',
                boxShadow: '0 12px 28px rgba(23, 33, 58, 0.05), inset 0 2px 3px #FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                zIndex: 3
              }} />

              {/* Left Product: Blemish Barrier Serum Bottle */}
              <div style={{
                position: 'absolute',
                bottom: '58px',
                left: '8%',
                width: '155px',
                zIndex: 4,
                filter: 'drop-shadow(0 15px 25px rgba(23, 33, 58, 0.12))',
                transition: 'transform 0.4s ease'
              }}
              className="animate-float-slow"
              >
                <img
                  src={hero.leftProductImage}
                  alt="Clinical Serum Formulation"
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              {/* Center Main Product: Retinaldehyde Age-Renewal Bottle (Elevated) */}
              <div style={{
                position: 'absolute',
                bottom: '75px',
                width: '190px',
                zIndex: 6,
                filter: 'drop-shadow(0 20px 35px rgba(23, 33, 58, 0.15))',
                transition: 'transform 0.4s ease'
              }}>
                <img
                  src={hero.centerProductImage}
                  alt="Hero Clinical Retinaldehyde Bottle"
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)',
                    border: '3px solid #FFFFFF'
                  }}
                />
              </div>

              {/* Right Product: Ceramide Barrier Cream Jar */}
              <div style={{
                position: 'absolute',
                bottom: '50px',
                right: '8%',
                width: '160px',
                zIndex: 5,
                filter: 'drop-shadow(0 15px 25px rgba(23, 33, 58, 0.12))',
                transition: 'transform 0.4s ease'
              }}
              className="animate-float-alt"
              >
                <img
                  src={hero.rightProductImage}
                  alt="Ceramide Barrier Repair Cream Jar"
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              {/* Floating Pearl Shimmer Badge */}
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '12px',
                zIndex: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(12px)',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 24px rgba(23, 33, 58, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontWeight: '700',
                color: 'var(--text-primary)'
              }}>
                <Sparkles size={14} color="#6C5B8B" />
                <span>{hero.badgeText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

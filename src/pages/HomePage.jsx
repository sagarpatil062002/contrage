import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import HeroBanner from '../components/home/HeroBanner';
import TrustStrip from '../components/home/TrustStrip';
import BestsellerSection from '../components/home/BestsellerSection';
import ConcernNavigator from '../components/home/ConcernNavigator';
import WhyOurFormulationsSection from '../components/home/WhyOurFormulationsSection';
import SkinDiagnosticQuiz from '../components/home/SkinDiagnosticQuiz';
import ClinicalEfficacySection from '../components/home/ClinicalEfficacySection';
import IngredientSpotlight from '../components/home/IngredientSpotlight';
import DoctorBoardSection from '../components/home/DoctorBoardSection';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

export default function HomePage() {
  const { blogs } = useStore();

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Refined Trust Strip */}
      <TrustStrip />

      {/* 3. Bestsellers Showcase */}
      <BestsellerSection />

      {/* 4. Shop by Skin Concern */}
      <ConcernNavigator />

      {/* 5. Why Our Formulations */}
      <WhyOurFormulationsSection />

      {/* 6. Skin Diagnostic Consultation Wizard */}
      <SkinDiagnosticQuiz />

      {/* 7. The Science Behind Your Skin & Efficacy Slider */}
      <ClinicalEfficacySection />

      {/* 8. The Science of Ingredients */}
      <IngredientSpotlight />

      {/* 9. Medical Advisory Board */}
      <DoctorBoardSection />

      {/* 10. Dermatology Journal / Editorial Section */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid rgba(23, 33, 58, 0.08)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--text-secondary)',
                marginBottom: '0.4rem'
              }}>
                DERMATOLOGY INSIGHTS
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.7rem)', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>
                The Clinical Journal
              </h2>
            </div>

            <Link to="/blog" className="btn btn-secondary btn-sm">
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3 Editorial Articles */}
          <div className="grid-3">
            {blogs.slice(0, 3).map((post) => (
              <article
                key={post.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid rgba(23, 33, 58, 0.08)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
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
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span className="badge badge-lavender" style={{ fontSize: '0.68rem' }}>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    lineHeight: '1.4',
                    marginBottom: '0.65rem',
                    fontFamily: 'var(--font-serif)'
                  }}>
                    <Link to={`/blog/${post.id}`} style={{ color: 'inherit' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.55',
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(23, 33, 58, 0.06)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      By {post.author}
                    </span>
                    <Link to={`/blog/${post.id}`} style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6C5B8B', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

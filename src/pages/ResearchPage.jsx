import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, FlaskConical, BarChart3, CheckCircle2, FileText, Download } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(180deg, #FAF9F6 0%, #F0FDFA 100%)',
        borderBottom: '1px solid #E2E8F0',
        padding: '3.5rem 0 3rem 0'
      }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Clinical Science & Methodology
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
            Clinical Research & Trial Standards
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: '1.6' }}>
            Aesthederm Labs operates on the principles of evidence-based dermatology. Every formula is tested in randomized, double-blind, vehicle-controlled clinical trials utilizing advanced dermal bio-instrumentation.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3.5rem' }}>
        {/* 4 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.75rem)',
          marginBottom: '4rem'
        }}>
          <div className="clinical-card" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--teal-100)', color: 'var(--teal-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FlaskConical size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              1. Pharmaceutical USP Actives
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              We source high-purity Grade-USP molecules with 0% heavy metal contamination, ensuring biological activity matches published medical literature.
            </p>
          </div>

          <div className="clinical-card" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <BarChart3 size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              2. Objective Bio-Instrumentation
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              We quantify efficacy using Corneometer® (hydration), Mexameter® (melanin), Tewameter® (barrier loss), and 3D Primo-Pico optical profilometry.
            </p>
          </div>

          <div className="clinical-card" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              3. Cold-Chain & pH Calibration
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              Buffered at physiological pH 4.5–5.5 in airless, opaque, UV-shielded packaging to prevent antioxidant degradation and maintain bioavailability.
            </p>
          </div>

          <div className="clinical-card" style={{ padding: '1.75rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Award size={22} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              4. Fitzpatrick I–VI Safety
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              Formulations are thoroughly tested across all Fitzpatrick skin phototypes to ensure zero post-inflammatory rebound hyperpigmentation.
            </p>
          </div>
        </div>

        {/* Laboratory & Bio-Instrumentation Facility Visual Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-luxury)',
            border: '1px solid #E2E8F0',
            position: 'relative',
            height: '240px'
          }}>
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
              alt="Clinical Chromatography & HPLC Assays"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 100%)',
              color: '#FFFFFF'
            }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#5EEAD4', fontWeight: '800' }}>Purity Verification</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>HPLC Active Concentration & Molecular Mass Assays</div>
            </div>
          </div>

          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-luxury)',
            border: '1px solid #E2E8F0',
            position: 'relative',
            height: '240px'
          }}>
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
              alt="In-Vivo Optical Profilometry"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80';
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 100%)',
              color: '#FFFFFF'
            }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#5EEAD4', fontWeight: '800' }}>Double-Blind Testing</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>In-Vivo Corneometer® & Optical Bio-Profilometry</div>
            </div>
          </div>
        </div>

        {/* Clinical Whitepapers Download Center */}
        <div style={{
          backgroundColor: '#FAF9F6',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #E2E8F0',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          marginBottom: '4rem'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.35rem' }}>Published Medical Whitepapers</span>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
              Dermatological Dossiers & Trial Data
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                title: 'Topical Retinaldehyde vs. All-Trans Retinoic Acid: In-Vivo Fibroblast Pro-Collagen Expression',
                journal: 'Journal of Investigative & Clinical Dermatology (2026)',
                author: 'Dr. Alistair Vance, Dr. Laurent Mercier',
                pages: '18 Pages • Peer-Reviewed'
              },
              {
                title: 'Synergistic Depigmenting Efficacy of Tranexamic Acid and Alpha-Arbutin in Fitzpatrick IV Melasma',
                journal: 'Asian Journal of Dermatological Science (2025)',
                author: 'Dr. Ji-Hye Park, Dr. Ananya Sharma',
                pages: '24 Pages • Double-Blind Protocol'
              },
              {
                title: 'Multi-Lamellar 3:1:1 Biomimetic Lipid Emulsions in Acute Chemical Barrier Recovery',
                journal: 'International Archives of Cutaneous Pharmacology (2026)',
                author: 'Dr. Laurent Mercier, Dr. Marcus Thorne',
                pages: '16 Pages • Bio-Instrumentation Data'
              }
            ].map((paper, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #E2E8F0',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--teal-50)',
                    color: 'var(--teal-800)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                      {paper.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {paper.journal} • Authors: {paper.author}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading Medical Whitepaper: ${paper.title}`)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={14} /> Download Clinical PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

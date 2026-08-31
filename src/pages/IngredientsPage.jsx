import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CustomSelect from '../components/common/CustomSelect';
import { FlaskConical, Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function IngredientsPage() {
  const { ingredients, products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Barrier & Sebum Modulator',
    'Lipophilic Chemical Exfoliant',
    'Advanced Vitamin A Retinoid',
    'Physiological Barrier Lipids',
    'Antioxidant & Collagen Co-Factor',
    'Targeted Anti-Melanogenic Active',
    'Cellular Humectant Matrix',
    'Anti-Redness Dicarboxylic Acid'
  ];

  const filtered = ingredients.filter(ing => {
    if (selectedCategory !== 'All' && ing.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return ing.name.toLowerCase().includes(term) || ing.description.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: 'clamp(1.75rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2.5rem) 0'
      }}>
        <div className="container">
          <Breadcrumbs embedded items={[{ label: 'Home', to: '/' }, { label: 'Ingredients Lab' }]} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'center',
            marginTop: '0.5rem'
          }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
                A-Z Scientific Directory
              </span>
              <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                Active Ingredients Lab & Glossary
              </h1>
              <p style={{ fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Complete transparency into molecular weights, biochemical mechanisms of action, optimal pH stability windows, and certified EWG safety profiles.
              </p>
            </div>

            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              border: '1px solid #E2E8F0',
              height: 'clamp(180px, 22vw, 220px)',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
                alt="Active Molecules Lab"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '0.75rem',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                100% INCI Transparency
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Search & Category Filter Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: 'clamp(1rem, 2.5vw, 1.25rem)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '420px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by molecule (e.g. Niacinamide, Retinal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem 0.6rem 2.5rem',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid #CBD5E1',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ minWidth: '220px', maxWidth: '320px', width: '100%', flex: '1 1 220px' }}>
            <CustomSelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
            />
          </div>
        </div>

        {/* Ingredients Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)' }}>
          {filtered.map(ing => (
            <div
              key={ing.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div>
                {/* Top Meta Row: Category & EWG Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  marginBottom: '0.65rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: '0.72rem',
                    color: '#0284C7',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {ing.category}
                  </span>
                  <span
                    className="badge badge-teal"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.6rem',
                      flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    EWG {ing.ewgScore}
                  </span>
                </div>

                {/* Full-Width Ingredient Title */}
                <h3 style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  margin: '0 0 0.85rem 0',
                  lineHeight: '1.3',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}>
                  {ing.name}
                </h3>

                {/* Specs Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  border: '1px solid #F1F5F9'
                }}>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Optimal pH:</strong> {ing.optimalPh}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>MW:</strong> {ing.molecularWeight.split(' ')[0]} g/mol</div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '1.25rem'
                }}>
                  {ing.description}
                </p>

                {/* Clinical Benefits */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.45rem'
                  }}>
                    Key Clinical Actions:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {ing.clinicalBenefits.slice(0, 3).map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.45' }}>
                        <CheckCircle2 size={15} color="var(--teal-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ wordBreak: 'break-word' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synergies */}
                <div style={{
                  padding: '0.7rem 0.85rem',
                  backgroundColor: 'rgba(2, 132, 199, 0.05)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  color: '#0369A1',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(2, 132, 199, 0.15)',
                  lineHeight: '1.5'
                }}>
                  <strong style={{ color: '#0C4A6E' }}>🧬 Synergistic Pairings:</strong> {ing.synergies.join(', ')}
                </div>
              </div>

              {/* Formulations Link */}
              <Link
                to={`/shop?search=${encodeURIComponent(ing.name.split(' ')[0])}`}
                className="btn btn-secondary btn-sm"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                  padding: '0.65rem 1rem',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  gap: '0.4rem',
                  marginTop: '0.5rem'
                }}
              >
                <span>Shop Formulations With {ing.name.split(' ')[0]}</span>
                <ArrowRight size={14} style={{ flexShrink: 0 }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


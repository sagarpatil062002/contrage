import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
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
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            A-Z Scientific Directory
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Active Ingredients Lab & Glossary
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Complete transparency into molecular weights, biochemical mechanisms of action, optimal pH stability windows, and certified EWG safety profiles.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Search & Category Filter Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
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
                outline: 'none'
              }}
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Ingredients Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filtered.map(ing => (
            <div
              key={ing.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                      {ing.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--teal-800)', fontWeight: '600' }}>
                      {ing.category}
                    </span>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                    EWG {ing.ewgScore}
                  </span>
                </div>

                {/* Specs Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  border: '1px solid #F1F5F9'
                }}>
                  <div><strong>Optimal pH:</strong> {ing.optimalPh}</div>
                  <div><strong>MW:</strong> {ing.molecularWeight.split(' ')[0]} g/mol</div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                  {ing.description}
                </p>

                {/* Clinical Benefits */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Key Clinical Actions:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {ing.clinicalBenefits.slice(0, 3).map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={14} color="var(--teal-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Synergies */}
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--teal-50)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  color: 'var(--teal-900)',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--teal-200)'
                }}>
                  <strong>🧬 Synergies:</strong> {ing.synergies.join(', ')}
                </div>
              </div>

              {/* Formulations Link */}
              <Link
                to={`/shop?search=${encodeURIComponent(ing.name.split(' ')[0])}`}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Shop Formulations With {ing.name.split(' ')[0]} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/common/ProductCard';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';

export default function ShopPage() {
  const { products, concerns, ingredients } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get('concern') || 'All');
  const [selectedActive, setSelectedActive] = useState(searchParams.get('active') || 'All');
  const [selectedSkinType, setSelectedSkinType] = useState('All');
  const [priceRange, setPriceRange] = useState(1500);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const con = searchParams.get('concern');
    const act = searchParams.get('active');
    if (cat) setSelectedCategory(cat);
    if (con) setSelectedConcern(con);
    if (act) setSelectedActive(act);
  }, [searchParams]);

  const categories = [
    'All',
    'Serums & Treatments',
    'Cleansers',
    'Moisturizers & Creams',
    'Sun Protection',
    'Exfoliants & Toners',
    'Eye Care'
  ];

  const skinTypes = ['All', 'Oily / Combination', 'Dry / Dehydrated', 'Sensitive & Reactive', 'All Skin Types'];

  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedConcern !== 'All' && !p.concerns?.includes(selectedConcern) && p.primaryConcern !== selectedConcern) return false;
    if (selectedActive !== 'All' && !p.activeIngredients?.some(a => a.name.toLowerCase().includes(selectedActive.toLowerCase()))) return false;
    if (selectedSkinType !== 'All' && !p.skinTypes?.includes(selectedSkinType) && !p.skinTypes?.includes('All Skin Types')) return false;
    if ((p.salePrice || p.price) > priceRange) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.salePrice || a.price) - (b.salePrice || b.price);
    if (sortBy === 'price-high') return (b.salePrice || b.price) - (a.salePrice || a.price);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSelectedActive('All');
    setSelectedSkinType('All');
    setPriceRange(1500);
    setSearchParams({});
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Editorial Header */}
      <div style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EDEAF4 100%)',
        borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0 2rem 0'
      }}>
        <div className="container">
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.4rem'
          }}>
            SHOP SKINCARE
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
            Targeted Formulations
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Targeted formulations designed around your skin's needs with active percentages and INCI transparency.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Top Control Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <SlidersHorizontal size={14} /> Filter Catalog
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredProducts.length}</strong> active formulations
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(23, 33, 58, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              >
                <option value="featured">Featured Doctors' Choice</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Clinical Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout (Filter Sidebar + Product Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Desktop Filter Sidebar */}
          <aside className="shop-filter-sidebar" style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(23, 33, 58, 0.08)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(23, 33, 58, 0.08)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, fontFamily: 'var(--font-serif)' }}>Filters</h3>
              <button
                onClick={handleResetFilters}
                style={{ background: 'none', border: 'none', color: '#6C5B8B', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
              >
                Reset All
              </button>
            </div>

            {/* 1. Category */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                Product Category
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {categories.map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: selectedCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: selectedCategory === cat ? '700' : '400', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="catFilter"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      style={{ accentColor: 'var(--accent-navy)' }}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Concern */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                Skin Concern
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="concernFilter"
                    checked={selectedConcern === 'All'}
                    onChange={() => setSelectedConcern('All')}
                    style={{ accentColor: 'var(--accent-navy)' }}
                  />
                  <span>All Concerns</span>
                </label>
                {concerns.map(con => (
                  <label key={con.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="concernFilter"
                      checked={selectedConcern === con.name}
                      onChange={() => setSelectedConcern(con.name)}
                      style={{ accentColor: 'var(--accent-navy)' }}
                    />
                    <span>{con.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Max Price Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                <span>Max Price</span>
                <span>₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="300"
                max="1500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-navy)' }}
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main>
            {filteredProducts.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '4rem 2rem',
                textAlign: 'center',
                border: '1px solid rgba(23, 33, 58, 0.08)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>No matching formulations</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Try relaxing your price or category filters to view available products.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid-3">
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 260px 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .shop-filter-sidebar {
            display: ${mobileFilterOpen ? 'flex' : 'none'} !important;
          }
        }
      `}</style>
    </div>
  );
}

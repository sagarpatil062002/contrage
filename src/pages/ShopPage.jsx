import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/common/ProductCard';
import CustomSelect from '../components/common/CustomSelect';
import {
  SlidersHorizontal,
  X,
  Search,
  CheckCircle2,
  Package,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function ShopPage() {
  const { products, concerns, ingredients } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get('concern') || 'All');
  const [selectedActive, setSelectedActive] = useState(searchParams.get('active') || 'All');
  const [selectedSkinType, setSelectedSkinType] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const con = searchParams.get('concern');
    const act = searchParams.get('active');
    if (q) setSearchQuery(q);
    if (cat) setSelectedCategory(cat);
    if (con) setSelectedConcern(con);
    if (act) setSelectedActive(act);
  }, [searchParams]);

  const categories = [
    'All',
    'Serums & Boosters',
    'Moisturizers & Creams',
    'Cleansers & Toners',
    'Exfoliators & Masks',
    'Sun Protection',
    'Professional & Backbar'
  ];

  const concernOptions = [
    'All',
    'Acne & Blemishes',
    'Aging & Fine Lines',
    'Hyperpigmentation',
    'Barrier Repair',
    'Dryness & Dehydration',
    'Redness & Sensitivity',
    'Open Pores & Oiliness',
    'Sun Protection'
  ];

  const skinTypes = [
    'All',
    'All Skin Types',
    'Oily / Combination',
    'Dry',
    'Sensitive',
    'Mature',
    'Professional Clinical Use Only'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(query);
        const matchesSku = p.sku?.toLowerCase().includes(query);
        const matchesTagline = p.tagline?.toLowerCase().includes(query);
        const matchesCategory = p.category?.toLowerCase().includes(query);
        const matchesConcern = p.concerns?.some(c => c.toLowerCase().includes(query)) || p.primaryConcern?.toLowerCase().includes(query);
        const matchesActive = p.activeIngredients?.some(a => a.name?.toLowerCase().includes(query));
        if (!matchesName && !matchesSku && !matchesTagline && !matchesCategory && !matchesConcern && !matchesActive) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Concern filter
      if (selectedConcern !== 'All') {
        const hasConcern = p.concerns?.includes(selectedConcern) || p.primaryConcern === selectedConcern;
        if (!hasConcern) return false;
      }

      // Active ingredient filter
      if (selectedActive !== 'All') {
        const hasActive = p.activeIngredients?.some(a => a.name.toLowerCase().includes(selectedActive.toLowerCase()));
        if (!hasActive) return false;
      }

      // Skin type filter
      if (selectedSkinType !== 'All') {
        const hasSkinType = p.skinTypes?.includes(selectedSkinType) || p.skinTypes?.includes('All Skin Types');
        if (!hasSkinType) return false;
      }

      // In stock filter
      if (inStockOnly && p.stock <= 0) return false;

      // Price filter
      const currentPrice = p.salePrice || p.price;
      if (currentPrice > priceRange) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.salePrice || a.price) - (b.salePrice || b.price);
      if (sortBy === 'price-high') return (b.salePrice || b.price) - (a.salePrice || a.price);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock') return b.stock - a.stock;
      return 0; // Default featured
    });
  }, [products, searchQuery, selectedCategory, selectedConcern, selectedActive, selectedSkinType, inStockOnly, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSelectedActive('All');
    setSelectedSkinType('All');
    setInStockOnly(false);
    setPriceRange(5000);
    setSearchParams({});
  };

  const renderFilterControls = () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>Filter Formulations</h3>
        <button
          onClick={handleResetFilters}
          style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
        >
          <RotateCcw size={11} /> Reset
        </button>
      </div>

      {/* In Stock Only Checkbox */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: '600', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            style={{ accentColor: '#0284C7' }}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Max Price Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A' }}>Max Price</span>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0284C7' }}>₹{priceRange}</span>
        </div>
        <input
          type="range"
          min="400"
          max="5000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#0284C7' }}
        />
      </div>

      {/* Category Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Formulation Category
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '0.35rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.82rem',
                fontWeight: selectedCategory === cat ? '700' : '500',
                color: selectedCategory === cat ? '#0284C7' : '#475569',
                backgroundColor: selectedCategory === cat ? '#F0F9FF' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <CheckCircle2 size={13} color="#0284C7" />}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Concern Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Target Concern
        </div>
        <CustomSelect
          value={selectedConcern}
          onChange={setSelectedConcern}
          options={concernOptions}
          size="sm"
        />
      </div>

      {/* Active Molecule Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Active Molecule
        </div>
        <CustomSelect
          value={selectedActive}
          onChange={setSelectedActive}
          options={[
            { label: 'All Active Ingredients', value: 'All' },
            ...ingredients.map(ing => ({ label: ing.name, value: ing.name.split(' ')[0] }))
          ]}
          size="sm"
        />
      </div>

      {/* Skin Type Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Skin Compatibility
        </div>
        <CustomSelect
          value={selectedSkinType}
          onChange={setSelectedSkinType}
          options={skinTypes}
          size="sm"
        />
      </div>
    </>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0 clamp(1.75rem, 4vw, 2.5rem) 0'
      }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-teal">Pharmaceutical Grade Cosmeceuticals</span>
            <span style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: '600' }}>• Made in Belgium</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            color: '#0F172A',
            marginBottom: '0.75rem',
            lineHeight: 1.15,
            fontFamily: 'var(--font-serif)'
          }}>
            Clinical Formulations Catalogue
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#475569',
            maxWidth: '720px',
            lineHeight: 1.6
          }}>
            Explore bio-compatible dermatological treatments formulated with high-concentration biomimetic actives, liposomal carriers, and clinical efficacy benchmarks.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Top Control Bar & Search */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Real-Time Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 260px',
            maxWidth: '100%',
            width: '100%'
          }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by product, active molecule, concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 2.2rem 0.55rem 2.3rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(15, 23, 42, 0.15)',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#F8FAFC',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  padding: '4px'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
            >
              <SlidersHorizontal size={14} /> Filter ({filteredProducts.length})
            </button>

            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              <strong>{filteredProducts.length}</strong> items
            </span>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', minWidth: '190px' }}>
              <span style={{ color: '#64748B', whiteSpace: 'nowrap' }}>Sort:</span>
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { label: 'Featured / Signature', value: 'featured' },
                  { label: 'Price: Low to High', value: 'price-low' },
                  { label: 'Price: High to Low', value: 'price-high' },
                  { label: 'Product Name (A–Z)', value: 'name' },
                  { label: 'Stock Availability', value: 'stock' }
                ]}
                size="sm"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Desktop Filter Sidebar */}
          <aside
            className="hide-on-mobile"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {renderFilterControls()}
          </aside>

          {/* Product Grid Area */}
          <main style={{ gridColumn: 'span 2' }}>
            {filteredProducts.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '4rem 2rem',
                textAlign: 'center',
                border: '1px dashed rgba(15, 23, 42, 0.15)'
              }}>
                <Package size={48} style={{ color: '#94A3B8', margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
                  No Formulations Found
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                  We couldn't find any products matching your specific search or filter criteria. Try adjusting your filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                gap: '1.5rem'
              }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-out Modal / Drawer */}
      {mobileFilterOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)'
        }}>
          <div
            onClick={() => setMobileFilterOpen(false)}
            style={{ position: 'absolute', inset: 0 }}
          />

          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'min(380px, 100vw)',
            height: '100%',
            backgroundColor: '#FFFFFF',
            boxShadow: '-8px 0 32px rgba(15, 23, 42, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 151
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FAF9F6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.05rem', color: '#0F172A' }}>
                <SlidersHorizontal size={18} color="#0284C7" />
                <span>Filters</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ background: 'none', border: 'none', padding: '0.35rem', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {renderFilterControls()}
            </div>

            {/* Drawer Footer Actions */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(15, 23, 42, 0.08)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary btn-sm"
                style={{ flex: 2 }}
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

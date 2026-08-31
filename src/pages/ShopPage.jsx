import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/common/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  CheckCircle2,
  Package,
  RotateCcw
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

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Editorial Header */}
      <div style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        padding: 'clamp(2.5rem, 4vw, 3.5rem) 0 2rem 0'
      }}>
        <div className="container">
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#0284C7',
            marginBottom: '0.4rem'
          }}>
            CONTRÂGE COSMECEUTICAL FORMULATIONS
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
            Clinical Skincare Catalogue
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '650px', lineHeight: '1.6' }}>
            Targeted active formulations engineered for measurable barrier recovery, cellular antioxidant defense, and clinical skin improvement.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Top Control Bar & Search */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          padding: '1rem 1.5rem',
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
            flex: '1 1 300px',
            maxWidth: '450px'
          }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by product name, active molecule, concern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.85rem 0.55rem 2.3rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(15, 23, 42, 0.15)',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#F8FAFC'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
            >
              <SlidersHorizontal size={14} /> Filter Catalog
            </button>

            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Showing <strong>{filteredProducts.length}</strong> formulation{filteredProducts.length === 1 ? '' : 's'}
            </span>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
              <span style={{ color: '#64748B' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(15, 23, 42, 0.15)',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontWeight: '600',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              >
                <option value="featured">Featured / Signature</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A–Z)</option>
                <option value="stock">Stock Availability</option>
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
            border: '1px solid rgba(15, 23, 42, 0.08)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>Filters</h3>
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

            {/* 1. Category */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0F172A', marginBottom: '0.65rem' }}>
                Categories
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {categories.map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: selectedCategory === cat ? '#0284C7' : '#64748B', fontWeight: selectedCategory === cat ? '700' : '400', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="catFilter"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      style={{ accentColor: '#0284C7' }}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Skin Concern */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0F172A', marginBottom: '0.65rem' }}>
                Target Skin Concern
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {concernOptions.map(con => (
                  <label key={con} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: selectedConcern === con ? '#0284C7' : '#64748B', fontWeight: selectedConcern === con ? '700' : '400', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="conFilter"
                      checked={selectedConcern === con}
                      onChange={() => setSelectedConcern(con)}
                      style={{ accentColor: '#0284C7' }}
                    />
                    <span>{con}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Skin Type */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0F172A', marginBottom: '0.65rem' }}>
                Skin Compatibility
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {skinTypes.map(st => (
                  <label key={st} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: selectedSkinType === st ? '#0284C7' : '#64748B', fontWeight: selectedSkinType === st ? '700' : '400', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="stFilter"
                      checked={selectedSkinType === st}
                      onChange={() => setSelectedSkinType(st)}
                      style={{ accentColor: '#0284C7' }}
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Price Max Range */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0F172A', marginBottom: '0.5rem' }}>
                <span>Max Price</span>
                <span style={{ color: '#0284C7' }}>₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0284C7' }}
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
    </div>
  );
}

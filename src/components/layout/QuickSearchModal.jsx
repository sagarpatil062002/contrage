import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FlaskConical,
  ShoppingBag
} from 'lucide-react';

export default function QuickSearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, concerns, addToCart } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Niacinamide',
    'Salicylic Acid',
    'Retinaldehyde',
    'Ceramides',
    'Vitamin C',
    'Sunscreen SPF 50',
    'Acne',
    'Melasma'
  ];

  // Filter products based on search term
  const term = searchTerm.toLowerCase().trim();
  const filteredProducts = term
    ? products.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(term);
        const taglineMatch = p.tagline.toLowerCase().includes(term);
        const concernMatch = p.concerns.some(c => c.toLowerCase().includes(term));
        const activeMatch = p.activeIngredients.some(a => a.name.toLowerCase().includes(term));
        const categoryMatch = p.category.toLowerCase().includes(term);
        return nameMatch || taglineMatch || concernMatch || activeMatch || categoryMatch;
      }).slice(0, 6)
    : [];

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 110,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '5vh 1rem 1rem 1rem',
      backgroundColor: 'rgba(11, 17, 24, 0.75)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Search Box Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid #E2E8F0',
        zIndex: 111,
        overflow: 'hidden'
      }}>
        {/* Input Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 2vw, 0.85rem)',
          padding: 'clamp(0.85rem, 2.5vw, 1.25rem) clamp(0.85rem, 2.5vw, 1.5rem)',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#FAF9F6'
        }}>
          <Search size={20} color="var(--teal-700)" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search active molecules, concerns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
              fontWeight: '500',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px', display: 'flex', alignItems: 'center' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              padding: '0.3rem 0.65rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid #CBD5E1',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={13} /> Trending Actives:
          </span>
          {popularSearches.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              style={{
                background: 'none',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.65rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--teal-50)';
                e.currentTarget.style.borderColor = 'var(--teal-600)';
                e.currentTarget.style.color = 'var(--teal-900)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {searchTerm ? (
            filteredProducts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Matching Formulations ({filteredProducts.length})
                </div>
                {filteredProducts.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--teal-50)';
                      e.currentTarget.style.borderColor = 'var(--teal-200)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.borderColor = '#F1F5F9';
                    }}
                  >
                    <img
                      src={prod.heroImage}
                      alt={prod.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80';
                      }}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-xs)',
                        objectFit: 'cover',
                        border: '1px solid #E2E8F0'
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <span className="badge badge-teal" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                          {prod.category}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {prod.primaryConcern}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {prod.name}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--teal-900)' }}>
                        ₹{prod.salePrice || prod.price}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1);
                        }}
                        className="btn btn-primary btn-sm btn-icon"
                        title="Add to Cart"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  No clinical formulations matched <strong>"{searchTerm}"</strong>.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  View All Formulations &rarr;
                </Link>
              </div>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                  Explore Skin Concerns
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                  {concerns.slice(0, 4).map(c => (
                    <Link
                      key={c.id}
                      to={`/concerns/${c.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-tertiary)',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <span>{c.name}</span>
                      <ArrowRight size={13} color="var(--teal-700)" />
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--teal-50)',
                padding: 'clamp(0.85rem, 2.5vw, 1.15rem)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.85rem',
                border: '1px solid var(--teal-200)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 200px', minWidth: '180px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(67, 142, 117, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Sparkles size={18} color="var(--teal-700)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.86rem', color: 'var(--teal-950)', lineHeight: '1.3' }}>
                      Need a personalized doctor regimen?
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--teal-800)', lineHeight: '1.35', marginTop: '2px' }}>
                      Take our 4-step skin diagnostic quiz in 60 seconds.
                    </div>
                  </div>
                </div>
                <Link
                  to="/#skin-quiz"
                  onClick={() => setIsSearchOpen(false)}
                  className="btn btn-primary btn-sm"
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.5rem 1.15rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontWeight: '600'
                  }}
                >
                  <span>Start Quiz</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

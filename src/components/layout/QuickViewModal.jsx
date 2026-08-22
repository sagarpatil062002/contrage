import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import StarRating from '../common/StarRating';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || (quickViewProduct.sizes ? quickViewProduct.sizes[0] : 'Standard');
  const wish = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty, currentSize);
    setQuickViewProduct(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'rgba(11, 17, 24, 0.75)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Modal Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '840px',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid #E2E8F0',
        zIndex: 111,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        padding: '2rem'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-tertiary)',
            zIndex: 5
          }}
        >
          <X size={20} />
        </button>

        {/* Left Column: Image & Badge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0'
          }}>
            <img
              src={quickViewProduct.heroImage}
              alt={quickViewProduct.name}
              style={{
                width: '100%',
                height: '360px',
                objectFit: 'cover'
              }}
            />
            {quickViewProduct.badge && (
              <span style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: 'var(--teal-800)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                {quickViewProduct.badge}
              </span>
            )}
          </div>

          {/* Quick Clinical Claim Chips */}
          <div style={{
            backgroundColor: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <ShieldCheck size={20} color="var(--teal-700)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--teal-900)', fontWeight: '600' }}>
              100% Fragrance Free • Non-Comedogenic • Dermatologist Approved
            </span>
          </div>
        </div>

        {/* Right Column: Details & Add to Cart */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-teal">{quickViewProduct.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {quickViewProduct.primaryConcern}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: '700', lineHeight: '1.25', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {quickViewProduct.name}
            </h3>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <StarRating rating={quickViewProduct.rating} />
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {quickViewProduct.rating}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                ({quickViewProduct.reviewCount} verified reviews)
              </span>
            </div>

            {/* Pricing */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--teal-900)' }}>
                ₹{quickViewProduct.salePrice || quickViewProduct.price}
              </span>
              {quickViewProduct.salePrice && quickViewProduct.price > quickViewProduct.salePrice && (
                <>
                  <span style={{ fontSize: '1.05rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                    ₹{quickViewProduct.price}
                  </span>
                  <span className="badge badge-emerald">
                    Save {Math.round(((quickViewProduct.price - quickViewProduct.salePrice) / quickViewProduct.price) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
              {quickViewProduct.tagline}
            </p>

            {/* Key Active Molecules */}
            {quickViewProduct.activeIngredients && quickViewProduct.activeIngredients.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Active Molecules Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {quickViewProduct.activeIngredients.map((act, i) => (
                    <div key={i} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--teal-600)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span><strong>{act.percentage} {act.name}:</strong> {act.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 1 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Select Volume
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {quickViewProduct.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        borderRadius: 'var(--radius-xs)',
                        border: currentSize === sz ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
                        backgroundColor: currentSize === sz ? 'var(--teal-50)' : '#FFFFFF',
                        color: currentSize === sz ? 'var(--teal-900)' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.85rem' }}
              >
                <ShoppingBag size={18} /> Add to Cart • ₹{(quickViewProduct.salePrice || quickViewProduct.price) * qty}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                aria-label="Wishlist toggle"
                className="btn btn-light"
                style={{
                  padding: '0.85rem',
                  color: wish ? 'var(--accent-rose)' : 'var(--text-secondary)',
                  borderColor: wish ? 'var(--accent-rose)' : 'var(--border-subtle)'
                }}
              >
                <Heart size={20} fill={wish ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: 'var(--teal-800)',
                textDecoration: 'underline'
              }}
            >
              View Full Clinical Dossier & INCI Ingredients <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

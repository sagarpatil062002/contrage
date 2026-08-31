import React from 'react';
import CertificationBadge from './CertificationBadge';
import ActiveMoleculeCard from './ActiveMoleculeCard';
import PincodeChecker from '../common/PincodeChecker';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  isWishlisted,
  toggleWishlist,
  onAddToCart,
  onBuyNow
}) {
  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 15;
  const activeMolecule = product.activeIngredients?.[0];

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = product.salePrice && product.price > product.salePrice;
  const savings = hasDiscount ? product.price - product.salePrice : 0;

  return (
    <div className="product-info-wrapper" style={{ width: '100%' }}>
      {/* Category & SKU Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.4rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <span
          style={{
            fontSize: '0.74rem',
            fontWeight: '800',
            color: '#0284C7',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          {product.category || 'Clinical Skincare'}
        </span>

        <span
          style={{
            fontSize: '0.74rem',
            color: '#64748B',
            fontFamily: 'monospace',
            letterSpacing: '0.04em'
          }}
        >
          SKU: {product.sku || product.id?.toUpperCase()}
        </span>
      </div>

      {/* Main Product Title */}
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
          lineHeight: '1.2',
          fontWeight: '800',
          color: '#0F172A',
          marginBottom: '0.6rem',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '-0.01em'
        }}
      >
        {product.name}
      </h1>

      {/* Subtitle / Clinical Tagline */}
      <p
        style={{
          fontSize: 'clamp(0.88rem, 1.8vw, 0.95rem)',
          color: '#475569',
          lineHeight: '1.6',
          marginBottom: '1rem'
        }}
      >
        {product.tagline}
      </p>

      {/* Certification Badge */}
      <div style={{ marginBottom: '1.25rem' }}>
        <CertificationBadge text="Certified Cosmeceutical Formulation" />
      </div>

      {/* Active Molecule Highlight Card */}
      {activeMolecule && (
        <ActiveMoleculeCard activeIngredient={activeMolecule} />
      )}

      {/* Pricing Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.75rem',
          marginBottom: '1.15rem',
          flexWrap: 'wrap'
        }}
      >
        <span
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.15rem)',
            fontWeight: '800',
            color: '#0F172A',
            letterSpacing: '-0.02em',
            lineHeight: '1'
          }}
        >
          ₹{currentPrice.toLocaleString('en-IN')}
        </span>

        {hasDiscount && (
          <>
            <span
              style={{
                fontSize: '1.1rem',
                color: '#94A3B8',
                textDecoration: 'line-through',
                fontWeight: '500'
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#059669',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                border: '1px solid #A7F3D0',
                letterSpacing: '0.02em'
              }}
            >
              Save ₹{savings.toLocaleString('en-IN')}
            </span>
          </>
        )}
      </div>

      {/* Real-Time Stock Availability Indicator */}
      <div style={{ marginBottom: '1.25rem' }}>
        {isOutOfStock ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontSize: '0.84rem', fontWeight: '700' }}>
            <AlertCircle size={16} /> Currently Out of Stock
          </div>
        ) : isLowStock ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '0.84rem', fontWeight: '700' }}>
            <Clock size={16} /> Limited Stock: Only {product.stock} units remaining
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.84rem', fontWeight: '700' }}>
            <CheckCircle2 size={16} /> In Stock ({product.stock} units available)
          </div>
        )}
      </div>

      {/* Volume / Size Selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div style={{ marginBottom: '1.4rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#0F172A',
              marginBottom: '0.45rem',
              letterSpacing: '0.01em'
            }}
          >
            Select Volume / Size:
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {product.sizes.map(sz => {
              const isSelected = selectedSize === sz;

              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  aria-pressed={isSelected}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '6px',
                    border: isSelected ? '2px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                    backgroundColor: isSelected ? '#F0F9FF' : '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.84rem',
                    color: isSelected ? '#0284C7' : '#0F172A',
                    cursor: 'pointer',
                    minHeight: '40px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & Primary Action Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          marginBottom: '1.75rem',
          flexWrap: 'wrap'
        }}
      >
        {/* Quantity Selector */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            backgroundColor: '#FFFFFF',
            height: '46px'
          }}
        >
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            aria-label="Decrease quantity"
            style={{
              width: '38px',
              height: '100%',
              border: 'none',
              background: 'none',
              cursor: quantity <= 1 || isOutOfStock ? 'not-allowed' : 'pointer',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: quantity <= 1 || isOutOfStock ? 0.4 : 1
            }}
          >
            <Minus size={14} />
          </button>

          <span
            style={{
              padding: '0 0.65rem',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: '#0F172A',
              minWidth: '24px',
              textAlign: 'center'
            }}
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock || isOutOfStock}
            aria-label="Increase quantity"
            style={{
              width: '38px',
              height: '100%',
              border: 'none',
              background: 'none',
              cursor: quantity >= product.stock || isOutOfStock ? 'not-allowed' : 'pointer',
              color: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: quantity >= product.stock || isOutOfStock ? 0.4 : 1
            }}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="btn btn-primary"
          style={{
            flex: '1 1 160px',
            height: '46px',
            minHeight: '46px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            opacity: isOutOfStock ? 0.5 : 1,
            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
            fontSize: '0.84rem'
          }}
        >
          <ShoppingBag size={16} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        {/* Buy Now CTA */}
        <button
          type="button"
          onClick={onBuyNow}
          disabled={isOutOfStock}
          className="btn btn-secondary"
          style={{
            flex: '1 1 120px',
            height: '46px',
            minHeight: '46px',
            opacity: isOutOfStock ? 0.5 : 1,
            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
            fontSize: '0.84rem'
          }}
        >
          Buy Now
        </button>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            width: '46px',
            height: '46px',
            minWidth: '46px',
            borderRadius: '6px',
            border: '1px solid rgba(15, 23, 42, 0.15)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isWishlisted ? '#EF4444' : '#64748B',
            transition: 'all 0.15s ease'
          }}
        >
          <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
        </button>
      </div>

      {/* Pincode & Delivery Availability Checker */}
      <div style={{ marginBottom: '1.75rem' }}>
        <PincodeChecker />
      </div>

      {/* Trust & Clinical Assurances */}
      <div
        className="trust-assurances-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem',
          padding: '1rem',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="#0284C7" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#0F172A' }}>100% Authentic Formula</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Truck size={18} color="#0284C7" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#0F172A' }}>Delhivery Express</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={18} color="#0284C7" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#0F172A' }}>Safe Clinical Transit</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import StarRating from './StarRating';
import { Heart, Eye, Plus, AlertCircle, CheckCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useStore();

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const activeMolecule = product.activeIngredients?.[0];
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 15;
  const realReviewCount = product.reviews?.length || product.reviewCount || 0;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: 'var(--shadow-sm)'
      }}
      className="product-card-hover"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 18px 36px -8px rgba(15, 23, 42, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(2, 132, 199, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.08)';
      }}
    >
      {/* Product Image Area with Soft Gradient Base */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Active Percentage Badge or Stock Alert */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {isOutOfStock ? (
            <span style={{
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: '700',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span style={{
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: '700',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              Only {product.stock} Left
            </span>
          ) : activeMolecule ? (
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              color: '#0F172A',
              fontSize: '0.68rem',
              fontWeight: '700',
              padding: '0.25rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              letterSpacing: '0.02em'
            }}>
              {activeMolecule.percentage} {activeMolecule.name.split('(')[0]}
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isWishlisted ? '#EF4444' : '#64748B',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={15} fill={isWishlisted ? '#EF4444' : 'none'} />
        </button>

        {/* Product Photo */}
        <Link to={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.heroImage}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';
            }}
            style={{
              width: '82%',
              height: '82%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-sm)',
              transition: 'transform 0.4s ease',
              filter: isOutOfStock ? 'grayscale(70%) opacity(0.7)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isOutOfStock) e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              if (!isOutOfStock) e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </Link>

        {/* Quick View Floating Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="quick-view-overlay-btn"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '0.35rem 0.85rem',
            fontSize: '0.72rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            cursor: 'pointer',
            opacity: 0.9,
            transition: 'all 0.2s'
          }}
        >
          <Eye size={12} /> Quick View
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.7rem', color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700', marginBottom: '0.35rem' }}>
          {product.category}
        </div>

        <h3 style={{
          fontSize: '0.96rem',
          fontWeight: '700',
          fontFamily: 'var(--font-sans)',
          lineHeight: '1.35',
          marginBottom: '0.35rem'
        }}>
          <Link to={`/product/${product.id}`} style={{ color: '#0F172A' }}>
            {product.name}
          </Link>
        </h3>

        <p style={{
          fontSize: '0.78rem',
          color: '#64748B',
          lineHeight: '1.4',
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.tagline}
        </p>

        {/* Real Review or Clinical Target Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
          {realReviewCount > 0 ? (
            <>
              <StarRating rating={product.rating || 5} size={13} />
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>({realReviewCount})</span>
            </>
          ) : (
            <span style={{ fontSize: '0.72rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
              <CheckCircle size={12} /> Dermatologist Formulated
            </span>
          )}
        </div>

        {/* Price & Add to Cart Footer */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(15, 23, 42, 0.06)'
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
              ₹{product.salePrice || product.price}
            </div>
            {product.salePrice && product.price > product.salePrice && (
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                ₹{product.price}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1, product.sizes?.[0] || 'Standard')}
            disabled={isOutOfStock}
            aria-label="Add to cart"
            className="btn btn-sm btn-primary"
            style={{
              padding: '0.4rem 0.85rem',
              fontSize: '0.78rem',
              opacity: isOutOfStock ? 0.5 : 1,
              cursor: isOutOfStock ? 'not-allowed' : 'pointer'
            }}
          >
            <Plus size={13} /> {isOutOfStock ? 'Out of Stock' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

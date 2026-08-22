import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import StarRating from './StarRating';
import { Heart, Eye, ShoppingBag, Plus } from 'lucide-react';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useStore();

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const activeMolecule = product.activeIngredients?.[0];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(23, 33, 58, 0.08)',
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
        e.currentTarget.style.boxShadow = '0 18px 36px -8px rgba(23, 33, 58, 0.09)';
        e.currentTarget.style.borderColor = 'rgba(216, 210, 231, 0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'rgba(23, 33, 58, 0.08)';
      }}
    >
      {/* Product Image Area with Soft Gradient Base */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        backgroundColor: 'var(--bg-lavender)',
        background: 'linear-gradient(180deg, #F7F5F7 0%, #EDEAF4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Active Percentage Badge */}
        {activeMolecule && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            color: 'var(--text-primary)',
            fontSize: '0.68rem',
            fontWeight: '700',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(23, 33, 58, 0.08)',
            letterSpacing: '0.02em'
          }}>
            {activeMolecule.percentage} {activeMolecule.name}
          </div>
        )}

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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(23, 33, 58, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isWishlisted ? '#D96B7D' : 'var(--text-secondary)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={15} fill={isWishlisted ? '#D96B7D' : 'none'} />
        </button>

        {/* Product Photo */}
        <Link to={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.heroImage}
            alt={product.name}
            loading="lazy"
            style={{
              width: '82%',
              height: '82%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-sm)',
              transition: 'transform 0.4s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
            backgroundColor: 'rgba(23, 33, 58, 0.9)',
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
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
          {product.category}
        </div>

        <h3 style={{
          fontSize: '0.98rem',
          fontWeight: '700',
          fontFamily: 'var(--font-sans)',
          lineHeight: '1.35',
          marginBottom: '0.35rem'
        }}>
          <Link to={`/product/${product.id}`} style={{ color: 'var(--text-primary)' }}>
            {product.name}
          </Link>
        </h3>

        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.4',
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.tagline}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
          <StarRating rating={product.rating || 4.8} size={13} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({product.reviewsCount || 48})</span>
        </div>

        {/* Price & Add to Cart Footer */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(23, 33, 58, 0.06)'
        }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              ₹{product.salePrice || product.price}
            </div>
            {product.salePrice && product.price > product.salePrice && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{product.price}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, product.sizes?.[0] || '30ml', 1)}
            aria-label="Add to cart"
            className="btn btn-sm btn-primary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

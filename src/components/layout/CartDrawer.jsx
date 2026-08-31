import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    user,
    openMobileOtpModal
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(23, 33, 58, 0.45)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Click outside to close backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{ flex: 1 }}
      />

      {/* Slide-out Drawer Panel */}
      <div style={{
        width: '100%',
        maxWidth: 'min(440px, 100vw)',
        height: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: '-8px 0 32px rgba(23, 33, 58, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 101,
        animation: 'slideLeft 0.3s ease-out'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--text-primary)" />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>
              Formulation Cart ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: 'var(--bg-lavender)',
          borderBottom: '1px solid rgba(23, 33, 58, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Truck size={14} />
              {progressPercent >= 100 ? 'Free Express Cold-Chain Shipping Unlocked!' : `Add ₹${amountToFreeShipping} more for Free Express Delivery`}
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: 'var(--accent-navy)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-lavender)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                Your Cart is Empty
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Discover doctor-formulated active molecules tailored for your skin.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="btn btn-primary btn-sm"
              >
                Explore Formulations &rarr;
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                <img
                  src={item.product.heroImage}
                  alt={item.product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80';
                  }}
                  style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid rgba(23, 33, 58, 0.08)' }}
                />

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.selectedSize}</div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.25rem', lineHeight: '1.3' }}>
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.product.name}
                    </Link>
                  </h4>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', marginTop: '0.2rem' }}>
                    ₹{(Number(item.price || item.product?.salePrice || item.product?.price) || 0) * (typeof item.quantity === 'number' ? item.quantity : 1)}
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-xs)',
                    marginTop: '0.4rem',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <button
                      onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', minWidth: '22px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    aria-label="Remove item"
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(23, 33, 58, 0.08)',
            backgroundColor: 'var(--bg-primary)'
          }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: '1rem' }}>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-lavender)',
                  border: '1px dashed #6C5B8B',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    <Tag size={13} />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#D96B7D', fontWeight: '700', cursor: 'pointer', fontSize: '0.72rem' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="Coupon (e.g. DERMA20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.8rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid #CBD5E1',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6C5B8B', fontWeight: '700' }}>
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Express Courier</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#438E75' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                paddingTop: '0.5rem',
                borderTop: '1px solid rgba(23, 33, 58, 0.08)'
              }}>
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => {
                if (user?.isLoggedIn && user?.phone) {
                  setIsCartOpen(false);
                  navigate('/checkout');
                } else {
                  setIsCartOpen(false);
                  openMobileOtpModal(() => {
                    navigate('/checkout');
                  });
                }
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', marginBottom: '0.5rem' }}
            >
              Checkout Securely &rarr;
            </button>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('/cart');
              }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'underline'
              }}
            >
              View Full Cart Details
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

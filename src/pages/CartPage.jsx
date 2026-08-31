import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
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

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApply = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #E2E8F0',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          maxWidth: '520px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--teal-50)',
            color: 'var(--teal-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Your Clinical Cart is Empty
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
            Discover doctor-formulated active molecules tailored specifically for acne, hyperpigmentation, damaged skin barrier, or fine lines.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore Formulations &rarr;
            </Link>
            <Link to="/#skin-quiz" className="btn btn-secondary btn-lg">
              <Sparkles size={16} /> Take 60s Skin Quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <Link to="/" style={{ color: 'inherit' }}>Home</Link> &gt;
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Clinical Cart</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', margin: 0 }}>
            Your Formulation Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Free Shipping Progress Meter */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          padding: '1.25rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: '700' }}>
            <span style={{ color: progressPercent >= 100 ? 'var(--teal-800)' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={18} color="var(--teal-700)" />
              {progressPercent >= 100 ? '🎉 Free Express Cold-Chain Courier Unlocked!' : `Add ₹${amountToFreeShipping} more to qualify for Free Express Courier Delivery`}
            </span>
            <span style={{ color: 'var(--teal-800)' }}>{progressPercent}%</span>
          </div>

          <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: progressPercent >= 100 ? 'var(--teal-600)' : 'var(--accent-cyan)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* 2-Column Cart Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left: Line Items List */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '88px 1fr auto',
                  gap: '1.25rem',
                  alignItems: 'center',
                  paddingBottom: '1.5rem',
                  borderBottom: idx === cart.length - 1 ? 'none' : '1px solid #F1F5F9'
                }}
              >
                <img
                  src={item.product.heroImage}
                  alt={item.product.name}
                  style={{ width: '88px', height: '88px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>{item.selectedSize}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.product.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    <Link to={`/product/${item.product.id}`} style={{ color: 'var(--text-primary)' }}>
                      {item.product.name}
                    </Link>
                  </h3>

                  {item.product.activeIngredients && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--teal-800)', fontWeight: '600', marginBottom: '0.65rem' }}>
                      🔬 {item.product.activeIngredients[0].percentage} {item.product.activeIngredients[0].name}
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <button
                      onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity - 1)}
                      style={{ background: 'none', border: 'none', padding: '0.35rem 0.6rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', minWidth: '28px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', padding: '0.35rem 0.6rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    aria-label="Remove item"
                    style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
                      ₹{(Number(item.price || item.product?.salePrice || item.product?.price) || 0) * (typeof item.quantity === 'number' ? item.quantity : 1)}
                    </div>
                    {item.product && item.product.price > (item.price || item.product.salePrice) && (
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                        ₹{item.product.price * (typeof item.quantity === 'number' ? item.quantity : 1)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--teal-50)',
                  border: '1px dashed var(--teal-600)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--teal-900)', fontWeight: '600' }}>
                    <Tag size={15} />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: '#DC2626', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Coupon (e.g. DERMA20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid #CBD5E1',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Pricing Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--teal-700)', fontWeight: '700' }}>
                  <span>Clinical Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Cold-Chain Express Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--teal-700)' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: '800',
                color: 'var(--text-primary)',
                paddingTop: '0.75rem',
                borderTop: '1px solid #E2E8F0'
              }}>
                <span>Grand Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (user?.isLoggedIn && user?.phone) {
                  navigate('/checkout');
                } else {
                  openMobileOtpModal(() => {
                    navigate('/checkout');
                  });
                }
              }}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', padding: '0.85rem', marginBottom: '0.75rem' }}
            >
              Proceed to Secure Checkout <ArrowRight size={18} />
            </button>

            <Link
              to="/shop"
              style={{
                display: 'block',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--teal-800)',
                fontWeight: '700',
                textDecoration: 'underline'
              }}
            >
              &larr; Continue Shopping Formulations
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '1.25rem',
              fontSize: '0.75rem',
              color: '#64748B'
            }}>
              <ShieldCheck size={16} color="var(--teal-700)" />
              <span>30-Day Clinical Guarantee • Cold-Chain Protected</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

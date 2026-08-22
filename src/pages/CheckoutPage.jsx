import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Lock,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    placeOrder,
    user,
    showToast
  } = useStore();

  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || 'Priya Sharma',
    email: user?.email || 'priya.sharma@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: user?.addresses?.[0]?.street || 'Flat 402, Lotus Greens, Sector 45',
    city: user?.addresses?.[0]?.city || 'Gurugram',
    state: user?.addresses?.[0]?.state || 'Haryana',
    pincode: user?.addresses?.[0]?.pincode || '122003'
  });

  const [shippingMethod, setShippingMethod] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking' | 'cod'

  // Card Simulator State
  const [cardNumber, setCardNumber] = useState('4532 8920 1194 8832');
  const [cardHolder, setCardHolder] = useState('PRIYA SHARMA');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');

  // UPI Simulator
  const [upiId, setUpiId] = useState('priya@okhdfcbank');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid #E2E8F0', maxWidth: '480px' }}>
          <ShoppingBag size={48} color="var(--teal-700)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Your Cart is Empty</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Add dermatologist formulations to your cart before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn btn-primary btn-sm">
            Browse Formulations &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutofillDemo = () => {
    setFormData({
      name: 'Dr. Rohan Mehra',
      email: 'rohan.mehra@example.com',
      phone: '+91 98112 34567',
      address: 'B-12, Green Park Extension, Main Market',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016'
    });
    showToast('Autofilled demo customer shipping address.');
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please complete all shipping address fields.', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate 1.2s clinical payment gateway handshake
    setTimeout(() => {
      const placed = placeOrder({
        ...formData,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Simulated Direct)' :
          paymentMethod === 'upi' ? `Instant UPI (${upiId})` :
          paymentMethod === 'netbanking' ? 'NetBanking (HDFC Bank)' : 'Cash on Delivery (Verified)'
      });

      setIsProcessing(false);

      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.4 }
        });
      } catch (e) {}

      navigate(`/order-confirmation/${placed.id}`);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '1.75rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'var(--teal-800)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--text-primary)' }}>
                AESTHEDERM LABS
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--teal-800)', fontWeight: '700', marginLeft: '0.5rem', textTransform: 'uppercase' }}>
                Secure Clinical Checkout
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--teal-900)', fontWeight: '600' }}>
            <Lock size={14} /> 256-Bit SSL Encrypted Handshake
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <form onSubmit={handleOrderSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '2.5rem',
            alignItems: 'start'
          }}>
            {/* Left: Customer & Address & Payment Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* 1. Shipping Address */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--teal-800)',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Shipping & Contact Information</h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleAutofillDemo}
                    style={{
                      background: 'none',
                      border: '1px dashed var(--teal-600)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '0.25rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: 'var(--teal-800)',
                      cursor: 'pointer'
                    }}
                  >
                    ✨ Autofill Demo Address
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address (for Digital Receipt & Tracking)</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number (SMS Live Courier Updates)</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Flat / House No. / Building / Street</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 2. Cold-Chain Delivery Method */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--teal-800)',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Select Logistics Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: shippingMethod === 'express' ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
                    backgroundColor: shippingMethod === 'express' ? 'var(--teal-50)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        style={{ accentColor: 'var(--teal-700)' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          Express Clinical Air Courier (Temperature Controlled)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          Estimated Delivery: 2–3 Business Days • Real-time GPS Tracking
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: '800', color: 'var(--teal-800)' }}>
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. Simulated Payment Methods */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--teal-800)',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Payment Method (Simulated Instant Verification)</h3>
                </div>

                {/* Payment Option Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[
                    { id: 'card', label: 'Card', icon: <CreditCard size={18} /> },
                    { id: 'upi', label: 'UPI / QR', icon: <QrCode size={18} /> },
                    { id: 'netbanking', label: 'NetBanking', icon: <Building2 size={18} /> },
                    { id: 'cod', label: 'COD', icon: <Banknote size={18} /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPaymentMethod(tab.id)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        border: paymentMethod === tab.id ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
                        backgroundColor: paymentMethod === tab.id ? 'var(--teal-50)' : '#FFFFFF',
                        color: paymentMethod === tab.id ? 'var(--teal-900)' : 'var(--text-secondary)',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Method 1: Credit Card Interactive Mockup */}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Simulated Credit Card Visualizer */}
                    <div style={{
                      background: 'linear-gradient(135deg, #0B1118 0%, #0F766E 100%)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      color: '#FFFFFF',
                      boxShadow: 'var(--shadow-md)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '800', color: '#5EEAD4' }}>
                          AESTHEDERM LABS SECURE
                        </span>
                        <CreditCard size={24} color="#5EEAD4" />
                      </div>
                      <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', letterSpacing: '0.18em', marginBottom: '1.25rem' }}>
                        {cardNumber}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <div>
                          <div style={{ color: '#94A3B8' }}>Cardholder</div>
                          <div style={{ fontWeight: '700', letterSpacing: '0.04em' }}>{cardHolder}</div>
                        </div>
                        <div>
                          <div style={{ color: '#94A3B8' }}>Expires</div>
                          <div style={{ fontWeight: '700' }}>{cardExpiry}</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date</label>
                        <input
                          type="text"
                          className="form-control"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input
                          type="password"
                          className="form-control"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Method 2: Instant UPI */}
                {paymentMethod === 'upi' && (
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#FAF9F6', borderRadius: 'var(--radius-sm)', border: '1px solid #E2E8F0' }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #CBD5E1',
                      borderRadius: '8px',
                      margin: '0 auto 1rem auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--teal-800)'
                    }}>
                      <QrCode size={90} />
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Scan QR with Google Pay, PhonePe, Paytm, or CRED
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Or enter your Virtual Payment Address (VPA) below:
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      style={{ maxWidth: '300px', margin: '0 auto' }}
                    />
                  </div>
                )}

                {/* Method 3: NetBanking */}
                {paymentMethod === 'netbanking' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Select Medical Banking Partner</label>
                      <select className="form-control">
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Method 4: COD */}
                {paymentMethod === 'cod' && (
                  <div style={{ padding: '1rem', backgroundColor: 'var(--teal-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--teal-200)' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--teal-950)', marginBottom: '0.25rem' }}>
                      Cash on Delivery Available
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--teal-800)' }}>
                      Pay via Cash or UPI at your doorstep upon express courier verification.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Itemized Order Summary */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #E2E8F0',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'sticky',
              top: '5.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                Order Items ({cart.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}`} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={item.product.heroImage} alt={item.product.name} style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #E2E8F0' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} • {item.selectedSize}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--teal-950)' }}>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--teal-700)', fontWeight: '700' }}>
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Express Cold-Chain Logistics</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: 'var(--teal-700)' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid #E2E8F0'
                }}>
                  <span>Total Amount</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                {isProcessing ? 'Verifying Clinical Payment...' : (
                  <>
                    <Lock size={16} /> Complete Order (Pay ₹{cartTotal})
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.72rem', color: '#64748B' }}>
                🛡️ 30-Day Money-Back Clinical Satisfaction Guarantee
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          form > div[style*="grid-template-columns: 1fr 420px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

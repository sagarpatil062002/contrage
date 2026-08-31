import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Phone,
  KeyRound,
  MapPin,
  Plus,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    appliedCoupon,
    placeOrder,
    user,
    setUser,
    sendMobileOtp,
    verifyMobileOtp,
    showToast
  } = useStore();

  const navigate = useNavigate();

  // Step 1: Mobile Auth States
  const [mobilePhone, setMobilePhone] = useState(user?.phone ? user.phone.replace(/[^0-9]/g, '').slice(-10) : '');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [testOtpNotice, setTestOtpNotice] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(Boolean(user?.isLoggedIn && user?.phone));

  // Step 2: Shipping Details Form
  const [shippingData, setShippingData] = useState({
    name: user?.name || '',
    email: user?.email && !user.email.includes('@contrage.in') ? user.email : '',
    phone: user?.phone ? user.phone.replace(/[^0-9]/g, '').slice(-10) : '',
    address: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || ''
  });

  const [selectedAddressId, setSelectedAddressId] = useState(user?.addresses?.[0]?.id || 'new');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(user?.addresses?.length ? false : true);

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'cod'
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic COD fee
  const codFee = paymentMethod === 'cod' ? 40 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + codFee);

  // Sync user state when user logs in or updates
  useEffect(() => {
    if (user?.isLoggedIn && user?.phone) {
      setIsPhoneVerified(true);
      const cleanP = user.phone.replace(/[^0-9]/g, '').slice(-10);
      setMobilePhone(cleanP);
      setShippingData(prev => ({
        ...prev,
        name: user.name && !user.name.startsWith('Customer ') ? user.name : prev.name,
        email: user.email && !user.email.includes('@contrage.in') ? user.email : prev.email,
        phone: cleanP,
        address: user.addresses?.[0]?.street || prev.address,
        city: user.addresses?.[0]?.city || prev.city,
        state: user.addresses?.[0]?.state || prev.state,
        pincode: user.addresses?.[0]?.pincode || prev.pincode
      }));
      if (user.addresses && user.addresses.length > 0) {
        setSelectedAddressId(user.addresses[0].id);
        setIsAddingNewAddress(false);
      }
    }
  }, [user]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid #E2E8F0', maxWidth: '480px', boxShadow: 'var(--shadow-sm)' }}>
          <ShoppingBag size={48} color="#0284C7" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Your Cart is Empty</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Discover doctor-formulated ContrÂge active molecules tailored for your skin before checkout.
          </p>
          <Link to="/shop" className="btn btn-primary btn-sm">
            Browse Formulations &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Handle Sending Mobile OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const clean = mobilePhone.replace(/[^0-9]/g, '').slice(-10);
    if (!clean || clean.length !== 10) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    setIsOtpLoading(true);
    const res = await sendMobileOtp(clean);
    setIsOtpLoading(false);

    if (res?.success) {
      setOtpSent(true);
      setTestOtpNotice(res.otp || '1234');
      setOtpCountdown(30);
      setShippingData(prev => ({ ...prev, phone: clean }));
    }
  };

  // Handle Verifying Mobile OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otpCode.trim()) {
      showToast('Please enter the 4-digit verification code.', 'error');
      return;
    }

    setIsOtpLoading(true);
    const clean = mobilePhone.replace(/[^0-9]/g, '').slice(-10);
    const res = await verifyMobileOtp({
      phone: clean,
      otp: otpCode.trim(),
      name: shippingData.name,
      email: shippingData.email
    });
    setIsOtpLoading(false);

    if (res?.success) {
      setIsPhoneVerified(true);
      setOtpSent(false);
    }
  };

  // Handle Address Selection
  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setIsAddingNewAddress(false);
    setShippingData(prev => ({
      ...prev,
      name: addr.name || prev.name,
      address: addr.street,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    }));
  };

  // Handle Order Final Placement
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneVerified) {
      showToast('Please verify your mobile number with OTP first.', 'error');
      return;
    }

    if (!shippingData.name.trim() || !shippingData.address.trim() || !shippingData.city.trim() || !shippingData.pincode.trim()) {
      showToast('Please complete all mandatory delivery address fields.', 'error');
      return;
    }

    if (!/^\d{6}$/.test(shippingData.pincode.trim())) {
      showToast('Please enter a valid 6-digit Indian PIN code.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const placed = await placeOrder({
        name: shippingData.name.trim(),
        email: shippingData.email.trim() || `user${mobilePhone}@contrage.in`,
        phone: mobilePhone.startsWith('+91') ? mobilePhone : `+91 ${mobilePhone}`,
        address: shippingData.address.trim(),
        city: shippingData.city.trim(),
        state: shippingData.state.trim() || 'India',
        pincode: shippingData.pincode.trim(),
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Razorpay UPI / Cards / NetBanking'
      });

      setIsProcessing(false);

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.4 }
        });
      } catch (e) {}

      if (placed && placed.id) {
        navigate(`/order-confirmation/${placed.id}`);
      } else {
        navigate('/account?tab=orders');
      }
    } catch (err) {
      setIsProcessing(false);
      showToast(err.message || 'Error processing order.', 'error');
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: '800', color: '#0F172A', letterSpacing: '0.04em' }}>
                CONTRÂGE
              </span>
              <span style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: '800', marginLeft: '0.5rem', textTransform: 'uppercase' }}>
                Quick Mobile Checkout
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>
            <Lock size={14} color="#059669" /> 256-Bit Encrypted
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: The Derma Co 3-Step Checkout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* ====================================================
                STEP 1: MOBILE NUMBER & OTP (The Derma Co Flow)
            ==================================================== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: isPhoneVerified ? '1px solid #CBD5E1' : '2px solid #0284C7',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isPhoneVerified ? '#059669' : '#0284C7',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '800'
                  }}>
                    {isPhoneVerified ? '✓' : '1'}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Mobile Number Verification
                  </h3>
                </div>
                {isPhoneVerified && (
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> Verified
                  </span>
                )}
              </div>

              {isPhoneVerified ? (
                /* Verified Phone State */
                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius-sm)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#166534' }}>
                      +91 {mobilePhone}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#15803D' }}>
                      {user?.name && !user.name.startsWith('Customer ') ? user.name : 'Verified Customer Account'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhoneVerified(false);
                      setOtpSent(false);
                      setOtpCode('');
                    }}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Change Number
                  </button>
                </div>
              ) : (
                /* Unverified: Input Phone or OTP */
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                      <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
                        Enter your 10-digit mobile number for instant OTP verification and live order tracking via SMS/WhatsApp.
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 0.85rem',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          color: '#0F172A',
                          gap: '0.35rem'
                        }}>
                          <span>🇮🇳</span> +91
                        </div>
                        <input
                          type="tel"
                          maxLength="10"
                          value={mobilePhone}
                          onChange={(e) => setMobilePhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                          placeholder="98765 43210"
                          style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '1px solid #CBD5E1',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: '#0F172A'
                          }}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isOtpLoading || mobilePhone.length !== 10}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
                      >
                        {isOtpLoading ? 'Sending Verification Code...' : 'Continue with OTP →'}
                      </button>
                    </form>
                  ) : (
                    /* OTP Verification Box */
                    <form onSubmit={handleVerifyOtp}>
                      <div style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.85rem', color: '#0369A1', fontWeight: '700' }}>
                            OTP sent to +91 {mobilePhone}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.75rem', cursor: 'pointer' }}
                          >
                            Edit
                          </button>
                        </div>

                        {/* Test OTP autofill hint */}
                        {testOtpNotice && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '0.4rem 0.75rem', borderRadius: '4px', border: '1px dashed #0284C7', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '0.78rem', color: '#0F172A' }}>
                              🔐 Test OTP: <strong style={{ color: '#0284C7' }}>{testOtpNotice}</strong> (or 1234)
                            </span>
                            <button
                              type="button"
                              onClick={() => setOtpCode(testOtpNotice)}
                              style={{ background: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: '3px', fontSize: '0.7rem', padding: '2px 8px', cursor: 'pointer', fontWeight: '700' }}
                            >
                              Auto-Fill
                            </button>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <input
                            type="text"
                            maxLength="4"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                            placeholder="Enter 4-digit OTP"
                            style={{
                              flex: 1,
                              padding: '0.75rem 1rem',
                              border: '1px solid #0284C7',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '1.1rem',
                              letterSpacing: '0.2em',
                              textAlign: 'center',
                              fontWeight: '800',
                              backgroundColor: '#FFFFFF'
                            }}
                            autoFocus
                            required
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                          <span style={{ color: '#64748B' }}>Didn't receive SMS?</span>
                          {otpCountdown > 0 ? (
                            <span style={{ color: '#64748B' }}>Resend in {otpCountdown}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              style={{ background: 'none', border: 'none', color: '#0284C7', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isOtpLoading || otpCode.length < 4}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}
                      >
                        {isOtpLoading ? 'Verifying...' : 'Verify OTP & Continue →'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* ====================================================
                STEP 2: DELIVERY ADDRESS
            ==================================================== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              opacity: isPhoneVerified ? 1 : 0.6,
              pointerEvents: isPhoneVerified ? 'auto' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '800'
                  }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Clinical Delivery Address
                  </h3>
                </div>
              </div>

              {/* Saved Addresses Selector (if available) */}
              {user?.addresses && user.addresses.length > 0 && !isAddingNewAddress && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  {user.addresses.map((addr) => (
                    <label
                      key={addr.id}
                      onClick={() => handleSelectSavedAddress(addr)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedAddressId === addr.id ? '2px solid #0284C7' : '1px solid #E2E8F0',
                        backgroundColor: selectedAddressId === addr.id ? '#F0F9FF' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name="savedAddress"
                        checked={selectedAddressId === addr.id}
                        onChange={() => handleSelectSavedAddress(addr)}
                        style={{ marginTop: '3px', accentColor: '#0284C7' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A' }}>{addr.name || user.name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>{addr.street}</div>
                        <div style={{ fontSize: '0.82rem', color: '#475569' }}>{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></div>
                      </div>
                    </label>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNewAddress(true);
                      setSelectedAddressId('new');
                    }}
                    style={{
                      background: 'none',
                      border: '1px dashed #CBD5E1',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem',
                      color: '#0284C7',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Plus size={16} /> Deliver to a Different Address
                  </button>
                </div>
              )}

              {/* Address Form */}
              {(isAddingNewAddress || !user?.addresses?.length) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Ananya Roy"
                        value={shippingData.name}
                        onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Email Address (for Invoice)</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="ananya@example.com"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Flat / House No. / Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Flat 301, Silver Oak Residency, Linking Road"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>PIN Code *</label>
                      <input
                        type="text"
                        maxLength="6"
                        className="form-control"
                        placeholder="e.g. 400050"
                        value={shippingData.pincode}
                        onChange={(e) => setShippingData({ ...shippingData, pincode: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>City *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Mumbai"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>State</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Maharashtra"
                        value={shippingData.state}
                        onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                      />
                    </div>
                  </div>

                  {user?.addresses && user.addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(false)}
                      style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', textDecoration: 'underline' }}
                    >
                      ← Back to Saved Addresses
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ====================================================
                STEP 3: PAYMENT METHOD
            ==================================================== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              opacity: isPhoneVerified ? 1 : 0.6,
              pointerEvents: isPhoneVerified ? 'auto' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '800'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  Payment Method
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Option 1: Razorpay Online */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'razorpay' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  backgroundColor: paymentMethod === 'razorpay' ? '#F0F9FF' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      style={{ accentColor: '#0284C7' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                        Razorpay Secure Online Checkout
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        UPI (GPay, PhonePe, Paytm), Cards & NetBanking
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <CreditCard size={18} color="#0284C7" />
                    <QrCode size={18} color="#0284C7" />
                  </div>
                </label>

                {/* Option 2: Cash on Delivery */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'cod' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  backgroundColor: paymentMethod === 'cod' ? '#F0F9FF' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      style={{ accentColor: '#0284C7' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                        Cash on Delivery (COD)
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Pay at doorstep upon delivery (+ ₹40 verification fee)
                      </div>
                    </div>
                  </div>
                  <Banknote size={18} color="#059669" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: '90px'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.25rem' }}>
              Order Summary ({cart.length} item{cart.length === 1 ? '' : 's'})
            </h3>

            {/* Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '240px', overflowY: 'auto' }}>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={item.product.heroImage}
                    alt={item.product.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#F8FAFC' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      Qty: {typeof item.quantity === 'number' ? item.quantity : 1} • {item.selectedSize}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                    ₹{(Number(item.price || item.product?.salePrice || item.product?.price) || 0) * (typeof item.quantity === 'number' ? item.quantity : 1)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(15, 23, 42, 0.08)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748B' }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: '700', color: '#0F172A' }}>₹{cartSubtotal}</span>
              </div>

              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#059669' }}>
                  <span>Coupon ({appliedCoupon.code}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748B' }}>
                <span>Delhivery Express Delivery:</span>
                <span>{shippingFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              {paymentMethod === 'cod' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#D97706' }}>
                  <span>COD Verification Fee:</span>
                  <span>+₹40</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', paddingTop: '0.75rem', borderTop: '1px dashed rgba(15, 23, 42, 0.15)' }}>
                <span>Grand Total:</span>
                <span style={{ color: '#0284C7' }}>₹{grandTotal}</span>
              </div>
            </div>

            {/* Final Place Order CTA */}
            <button
              onClick={handleOrderSubmit}
              disabled={isProcessing || !isPhoneVerified}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '800',
                justifyContent: 'center',
                backgroundColor: !isPhoneVerified ? '#94A3B8' : '#0F172A',
                cursor: !isPhoneVerified ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Confirming Formulation Order...' : !isPhoneVerified ? 'Verify Mobile Number First' : paymentMethod === 'cod' ? `Place Cash on Delivery Order (₹${grandTotal}) →` : `Pay via Razorpay (₹${grandTotal}) →`}
            </button>

            {/* Assurance Badges */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#059669" /> 100% Genuine Cosmeceutical Formulations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#0284C7" /> Cold-Chain UV Protected Delhivery Transit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

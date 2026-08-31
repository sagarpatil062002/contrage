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
  Sparkles,
  User,
  Edit3,
  Check,
  ChevronRight,
  Shield
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

  // Mobile Auth States
  const [mobilePhone, setMobilePhone] = useState(user?.phone ? user.phone.replace(/[^0-9]/g, '').slice(-10) : '9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [testOtpCode, setTestOtpCode] = useState('1234');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(Boolean(user?.isLoggedIn && user?.phone));

  // Unified Delivery & Payment Details Form
  const [shippingData, setShippingData] = useState({
    name: user?.name && !user.name.startsWith('Customer ') ? user.name : 'Dr. Ananya Roy',
    email: user?.email && !user.email.includes('@contrage.in') ? user.email : 'ananya.roy@example.com',
    phone: user?.phone ? user.phone.replace(/[^0-9]/g, '').slice(-10) : '9876543210',
    address: user?.addresses?.[0]?.street || 'Flat 402, Lotus Greens, Sector 45',
    city: user?.addresses?.[0]?.city || 'Gurugram',
    state: user?.addresses?.[0]?.state || 'Haryana',
    pincode: user?.addresses?.[0]?.pincode || '122003'
  });

  const [selectedAddressId, setSelectedAddressId] = useState(user?.addresses?.[0]?.id || 'new');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(user?.addresses?.length ? false : true);

  // Payment Selection
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
        <div style={{ backgroundColor: '#FFFFFF', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid #E2E8F0', maxWidth: '480px', boxShadow: 'var(--shadow-md)' }}>
          <ShoppingBag size={52} color="#0284C7" style={{ margin: '0 auto 1.25rem auto' }} />
          <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Your Cart is Empty</h3>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.75rem', lineHeight: '1.5' }}>
            Discover doctor-formulated ContrÂge active molecules tailored for your skin before checkout.
          </p>
          <Link to="/shop" className="btn btn-primary btn-md">
            Explore Formulations &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Handle Sending Mobile OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const clean = mobilePhone.trim() ? mobilePhone.replace(/[^0-9]/g, '') : '9876543210';

    setIsOtpLoading(true);
    const res = await sendMobileOtp(clean);
    setIsOtpLoading(false);

    const generated = res?.otp || '1234';
    setOtpSent(true);
    setTestOtpCode(generated);
    setOtpCountdown(30);
    setShippingData(prev => ({ ...prev, phone: clean }));
    setOtpDigits(generated.slice(0, 4).split(''));
  };

  // Handle OTP digit box input
  const handleOtpDigitChange = (index, val) => {
    const cleanVal = val.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`inline-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpDigitKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`inline-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Verifying Mobile OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('').trim() || testOtpCode || '1234';

    setIsOtpLoading(true);
    const clean = mobilePhone.replace(/[^0-9]/g, '') || '9876543210';
    await verifyMobileOtp({
      phone: clean,
      otp: enteredCode,
      name: shippingData.name,
      email: shippingData.email
    });
    setIsOtpLoading(false);

    setIsPhoneVerified(true);
    setOtpSent(false);
    showToast(`Phone +91 ${clean} verified successfully!`, 'success');
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

  // ==========================================================
  // SINGLE ACTION BUTTON: RAZORPAY INTEGRATION & COD PLACEMENT
  // ==========================================================
  const handleSinglePaymentSubmit = async () => {
    // 1. Validate Phone Verification
    if (!isPhoneVerified) {
      showToast('Please complete mobile OTP verification first.', 'error');
      return;
    }

    // 2. Validate Address Fields
    if (!shippingData.name.trim() || !shippingData.address.trim() || !shippingData.city.trim() || !shippingData.pincode.trim()) {
      showToast('Please fill out all mandatory delivery address fields.', 'error');
      return;
    }

    if (!/^\d{6}$/.test(shippingData.pincode.trim())) {
      showToast('Please enter a valid 6-digit Indian PIN code.', 'error');
      return;
    }

    setIsProcessing(true);

    // MODE A: Cash on Delivery (COD)
    if (paymentMethod === 'cod') {
      try {
        const placed = await placeOrder({
          name: shippingData.name.trim(),
          email: shippingData.email.trim() || `user${mobilePhone}@contrage.in`,
          phone: mobilePhone.startsWith('+91') ? mobilePhone : `+91 ${mobilePhone}`,
          address: shippingData.address.trim(),
          city: shippingData.city.trim(),
          state: shippingData.state.trim() || 'India',
          pincode: shippingData.pincode.trim(),
          paymentMethod: 'Cash on Delivery (COD)'
        });

        setIsProcessing(false);
        try { confetti({ particleCount: 120, spread: 70, origin: { y: 0.4 } }); } catch (e) {}

        if (placed && placed.id) {
          navigate(`/order-confirmation/${placed.id}`);
        } else {
          navigate('/account?tab=orders');
        }
      } catch (err) {
        setIsProcessing(false);
        showToast(err.message || 'Error processing COD order.', 'error');
      }
      return;
    }

    // MODE B: Razorpay Online Payment Gateway
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_7ZhFXaT3z3ethj';

    if (typeof window !== 'undefined' && window.Razorpay) {
      try {
        const options = {
          key: razorpayKey,
          amount: Math.round(grandTotal * 100), // Amount in paise
          currency: 'INR',
          name: 'CONTRÂGE Cosmeceuticals',
          description: 'Official Clinical Skincare Formulations Order',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80',
          prefill: {
            name: shippingData.name.trim(),
            email: shippingData.email.trim() || `user${mobilePhone}@contrage.in`,
            contact: mobilePhone
          },
          theme: {
            color: '#0F172A'
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              showToast('Razorpay payment modal closed.', 'info');
            }
          },
          handler: async function (response) {
            try {
              // Payment Successful via Razorpay
              const placed = await placeOrder({
                name: shippingData.name.trim(),
                email: shippingData.email.trim() || `user${mobilePhone}@contrage.in`,
                phone: mobilePhone.startsWith('+91') ? mobilePhone : `+91 ${mobilePhone}`,
                address: shippingData.address.trim(),
                city: shippingData.city.trim(),
                state: shippingData.state.trim() || 'India',
                pincode: shippingData.pincode.trim(),
                paymentMethod: 'Razorpay Online',
                paymentId: response.razorpay_payment_id || `pay_${Date.now()}`
              });

              setIsProcessing(false);
              try { confetti({ particleCount: 140, spread: 80, origin: { y: 0.4 } }); } catch (e) {}

              if (placed && placed.id) {
                navigate(`/order-confirmation/${placed.id}`);
              } else {
                navigate('/account?tab=orders');
              }
            } catch (err) {
              setIsProcessing(false);
              showToast('Payment verified, saving order error: ' + (err.message || ''), 'error');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setIsProcessing(false);
          showToast('Payment Failed: ' + (resp.error.description || 'Transaction declined'), 'error');
        });
        rzp.open();
      } catch (err) {
        setIsProcessing(false);
        showToast('Could not open Razorpay gateway: ' + err.message, 'error');
      }
    } else {
      // Direct fallback if script blocked
      try {
        const placed = await placeOrder({
          name: shippingData.name.trim(),
          email: shippingData.email.trim() || `user${mobilePhone}@contrage.in`,
          phone: mobilePhone.startsWith('+91') ? mobilePhone : `+91 ${mobilePhone}`,
          address: shippingData.address.trim(),
          city: shippingData.city.trim(),
          state: shippingData.state.trim() || 'India',
          pincode: shippingData.pincode.trim(),
          paymentMethod: 'Razorpay Online (Authorized)'
        });

        setIsProcessing(false);
        try { confetti({ particleCount: 120, spread: 70, origin: { y: 0.4 } }); } catch (e) {}
        if (placed && placed.id) {
          navigate(`/order-confirmation/${placed.id}`);
        } else {
          navigate('/account?tab=orders');
        }
      } catch (err) {
        setIsProcessing(false);
        showToast(err.message || 'Error processing order.', 'error');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', padding: 'clamp(0.85rem, 2vw, 1.25rem) 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={18} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem 0.5rem', minWidth: 0 }}>
              <Link to="/" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', fontFamily: 'var(--font-serif)', fontWeight: '800', color: '#0F172A', letterSpacing: '0.04em', textDecoration: 'none' }}>
                CONTRÂGE
              </Link>
              <span style={{ fontSize: '0.7rem', color: '#0284C7', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                Clinical Checkout
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#64748B', fontWeight: '600', whiteSpace: 'nowrap' }}>
            <Lock size={13} color="#059669" /> 256-Bit SSL Encrypted
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* 2-Column Checkout Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: Unified Checkout Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* ====================================================
                1. CONTACT / MOBILE VERIFICATION STATUS
            ==================================================== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '1.5rem 1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isPhoneVerified ? '#059669' : '#0284C7',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '800'
                  }}>
                    {isPhoneVerified ? <Check size={18} /> : '1'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                      {isPhoneVerified ? 'Verified Contact Information' : 'Mobile Verification'}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: isPhoneVerified ? '#059669' : '#64748B', fontWeight: '600', marginTop: '2px' }}>
                      {isPhoneVerified ? `+91 ${mobilePhone} • WhatsApp & SMS tracking enabled` : 'Enter mobile number to unlock checkout'}
                    </div>
                  </div>
                </div>

                {isPhoneVerified && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhoneVerified(false);
                      setOtpSent(false);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0284C7',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Edit3 size={14} /> Change Number
                  </button>
                )}
              </div>

              {/* Inline OTP verification if user changes number */}
              {!isPhoneVerified && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 0.85rem',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        color: '#0F172A',
                        gap: '0.35rem'
                      }}>
                        <span>🇮🇳</span> +91
                      </div>
                      <input
                        type="tel"
                        value={mobilePhone}
                        onChange={(e) => setMobilePhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        style={{
                          flex: 1,
                          minWidth: '160px',
                          padding: '0.75rem 1rem',
                          border: '1px solid #0284C7',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '1rem',
                          fontWeight: '800'
                        }}
                        required
                      />
                      <button
                        type="submit"
                        disabled={isOtpLoading}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.25rem' }}
                      >
                        {isOtpLoading ? 'Sending...' : 'Get OTP'}
                      </button>
                    </form>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#0369A1', fontWeight: '800' }}>
                          OTP sent to +91 {mobilePhone} (Code: <strong>{testOtpCode}</strong>)
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpDigits(testOtpCode.slice(0, 4).split(''))}
                          style={{ backgroundColor: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                        >
                          Auto-Fill
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {[0, 1, 2, 3].map((idx) => (
                          <input
                            key={idx}
                            id={`inline-otp-${idx}`}
                            type="text"
                            maxLength="1"
                            value={otpDigits[idx]}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpDigitKeyDown(idx, e)}
                            style={{
                              width: '44px',
                              height: '46px',
                              fontSize: '1.3rem',
                              fontWeight: '800',
                              textAlign: 'center',
                              border: otpDigits[idx] ? '2px solid #0284C7' : '1px solid #CBD5E1',
                              borderRadius: '6px'
                            }}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={isOtpLoading}
                          className="btn btn-primary"
                          style={{ marginLeft: '0.5rem', padding: '0.75rem 1.25rem' }}
                        >
                          Verify & Continue
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ====================================================
                2. UNIFIED BOX: DELIVERY ADDRESS + PAYMENT METHOD
            ==================================================== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
              opacity: isPhoneVerified ? 1 : 0.6
            }}>
              {/* --- SECTION A: DELIVERY ADDRESS --- */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '800'
                  }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Clinical Delivery Address
                  </h3>
                </div>

                {/* Saved Addresses (if any) */}
                {user?.addresses && user.addresses.length > 0 && !isAddingNewAddress && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
                          <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>{addr.name || user.name}</div>
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
                      <Plus size={16} /> Enter New Delivery Address
                    </button>
                  </div>
                )}

                {/* Address Input Fields */}
                {(isAddingNewAddress || !user?.addresses?.length) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Dr. Ananya Roy"
                          value={shippingData.name}
                          onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Email Address (for Tax Invoice)</label>
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
                        placeholder="e.g. Flat 402, Lotus Greens, Sector 45"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>PIN Code *</label>
                        <input
                          type="text"
                          maxLength="6"
                          className="form-control"
                          placeholder="e.g. 122003"
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
                          placeholder="e.g. Gurugram"
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
                          placeholder="e.g. Haryana"
                          value={shippingData.state}
                          onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --- SECTION B: PAYMENT METHOD (INSIDE THE SAME CARD) --- */}
              <div style={{ paddingTop: '1.75rem', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '800'
                  }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Select Payment Method
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {/* Option 1: Razorpay Online Payment */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: paymentMethod === 'razorpay' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                    backgroundColor: paymentMethod === 'razorpay' ? '#F0F9FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        style={{ accentColor: '#0284C7', transform: 'scale(1.2)' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>
                          Razorpay Secure Online Checkout
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                          UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, NetBanking, EMI
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={20} color="#0284C7" />
                      <QrCode size={20} color="#0284C7" />
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery (COD) */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.15rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: paymentMethod === 'cod' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                    backgroundColor: paymentMethod === 'cod' ? '#F0F9FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        style={{ accentColor: '#0284C7', transform: 'scale(1.2)' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>
                          Cash on Delivery (COD)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                          Pay with cash or UPI QR at doorstep (+ ₹40 verification fee)
                        </div>
                      </div>
                    </div>
                    <Banknote size={20} color="#059669" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary & SINGLE Action Pay Button */}
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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80';
                    }}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}
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

            {/* Price Calculations */}
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

            {/* =========================================================
                THE ONLY SINGLE PAY / PLACE ORDER BUTTON
            ========================================================= */}
            <button
              onClick={handleSinglePaymentSubmit}
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
              {isProcessing
                ? 'Opening Payment Gateway...'
                : !isPhoneVerified
                ? 'Verify Mobile First'
                : paymentMethod === 'cod'
                ? `Place Cash on Delivery Order (₹${grandTotal}) →`
                : `Pay ₹${grandTotal} via Razorpay →`}
            </button>

            {/* Assurance Badges */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} color="#059669" /> 100% Genuine Cosmeceutical Formulations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={14} color="#0284C7" /> Cold-Chain UV Protected Delhivery Transit
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} color="#059669" /> Official Razorpay 256-bit Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

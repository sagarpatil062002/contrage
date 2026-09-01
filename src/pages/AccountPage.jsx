import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import {
  User,
  Package,
  Heart,
  MapPin,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  LogIn,
  LogOut,
  UserPlus,
  Lock,
  Mail,
  Phone,
  KeyRound,
  Trash2,
  Search,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';

export default function AccountPage() {
  const {
    user,
    orders,
    wishlist,
    products,
    quizResult,
    setUser,
    showToast,
    login,
    register,
    logout,
    sendMobileOtp,
    verifyMobileOtp,
    fetchOrdersByPhone
  } = useStore();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isWishlistRoute = location.pathname === '/wishlist';
  const [activeTab, setActiveTab] = useState(() => {
    if (isWishlistRoute) return 'wishlist';
    const tab = searchParams.get('tab');
    if (tab) return tab;
    return user?.isLoggedIn ? 'orders' : 'auth';
  });

  // Auth Modes: 'mobile_otp' | 'email_password'
  const [authMethod, setAuthMethod] = useState('mobile_otp');

  // Mobile OTP States
  const [mobilePhone, setMobilePhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [testOtp, setTestOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);

  // Email/Password States
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhoneInput, setAuthPhoneInput] = useState('');

  // Quick Order Lookup by Phone
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupResults, setLookupResults] = useState(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  // Address Modal / Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  useEffect(() => {
    if (location.pathname === '/wishlist') {
      setActiveTab('wishlist');
      return;
    }
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams, location.pathname]);

  // Resend OTP Countdown
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const wishlistedProducts = (products || []).filter(p => {
    if (!p) return false;
    const pId = p.id ? String(p.id) : '';
    const pMongoId = p._id ? String(p._id) : '';
    const pSlug = p.slug ? String(p.slug) : '';
    return (wishlist || []).some(item => {
      if (!item) return false;
      const itemId = typeof item === 'object' ? (item.id || item._id || item.slug) : String(item);
      return (pId && itemId === pId) || (pMongoId && itemId === pMongoId) || (pSlug && itemId === pSlug);
    });
  });

  // Send Mobile OTP
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    const clean = mobilePhone.replace(/[^0-9]/g, '').slice(-10);
    if (!clean || clean.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    setAuthLoading(true);
    const res = await sendMobileOtp(clean);
    setAuthLoading(false);

    if (res?.success) {
      setOtpSent(true);
      setTestOtp(res.otp || '1234');
      setOtpTimer(30);
    }
  };

  // Verify Mobile OTP
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otpCode.trim()) {
      showToast('Please enter the 4-digit verification code.', 'error');
      return;
    }

    setAuthLoading(true);
    const clean = mobilePhone.replace(/[^0-9]/g, '').slice(-10);
    const res = await verifyMobileOtp({
      phone: clean,
      otp: otpCode.trim()
    });
    setAuthLoading(false);

    if (res?.success) {
      setActiveTab('orders');
      setSearchParams({ tab: 'orders' });
    }
  };

  // Email / Password Form Submit
  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    if (isRegisterMode) {
      if (!authName || !authEmail || !authPassword) {
        showToast('Please fill out all required registration fields.', 'error');
        setAuthLoading(false);
        return;
      }
      const res = await register({
        name: authName,
        email: authEmail,
        password: authPassword,
        phone: authPhoneInput
      });
      if (res.success) {
        setActiveTab('orders');
        setSearchParams({ tab: 'orders' });
      }
    } else {
      if (!authEmail || !authPassword) {
        showToast('Please enter your email and password.', 'error');
        setAuthLoading(false);
        return;
      }
      const res = await login(authEmail, authPassword);
      if (res.success) {
        setActiveTab('orders');
        setSearchParams({ tab: 'orders' });
      }
    }
    setAuthLoading(false);
  };

  // Quick Order Lookup by Phone
  const handleLookupOrders = async (e) => {
    e.preventDefault();
    const clean = lookupPhone.replace(/[^0-9]/g, '').slice(-10);
    if (!clean || clean.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    setIsLookingUp(true);
    const res = await fetchOrdersByPhone(clean);
    setIsLookingUp(false);

    if (res.success) {
      setLookupResults(res.orders);
      if (res.orders.length === 0) {
        showToast(`No orders found for +91 ${clean}.`, 'info');
      } else {
        showToast(`Found ${res.orders.length} order(s) for +91 ${clean}.`);
      }
    }
  };

  // Add Address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) {
      showToast('Please fill out all address fields.', 'error');
      return;
    }

    try {
      const res = await api.auth.addAddress({
        street: newStreet,
        city: newCity,
        state: newState,
        pincode: newPincode,
        isDefault: user?.addresses?.length === 0
      });

      if (res?.data) {
        setUser({ ...user, addresses: res.data });
        setShowAddressForm(false);
        setNewStreet('');
        setNewCity('');
        setNewState('');
        setNewPincode('');
        showToast('Delivery address saved successfully.');
      }
    } catch (err) {
      // Local fallback
      const newAddr = {
        id: `addr-${Date.now()}`,
        name: user.name || 'Customer',
        phone: user.phone || '',
        street: newStreet,
        city: newCity,
        state: newState,
        pincode: newPincode,
        isDefault: user?.addresses?.length === 0
      };
      const updated = [...(user.addresses || []), newAddr];
      setUser({ ...user, addresses: updated });
      setShowAddressForm(false);
      showToast('Delivery address saved.');
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id) => {
    try {
      await api.auth.deleteAddress(id);
    } catch (e) {}
    const updated = (user.addresses || []).filter(a => a.id !== id);
    setUser({ ...user, addresses: updated });
    showToast('Address removed.');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        padding: 'clamp(1.75rem, 3.5vw, 2.5rem) 0 clamp(1.25rem, 3vw, 2rem) 0'
      }}>
        <div className="container">
          <Breadcrumbs embedded items={[{ label: 'Home', to: '/' }, { label: 'Customer Portal' }]} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.2rem)', color: '#0F172A', margin: 0, fontFamily: 'var(--font-serif)' }}>
                {user?.isLoggedIn ? `Welcome, ${user.name || 'Customer'}` : 'Customer Portal & Order Tracking'}
              </h1>
              <p style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.92rem)', color: '#64748B', marginTop: '0.35rem' }}>
                {user?.isLoggedIn ? `Linked mobile: ${user.phone || 'N/A'} • Authenticated clinical session` : 'Access your formulations, track live Delhivery dispatches, and manage addresses.'}
              </p>
            </div>

            {user?.isLoggedIn && (
              <button
                onClick={logout}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: '#CBD5E1' }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
          marginBottom: '2.5rem',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {user?.isLoggedIn ? (
            <>
              <button
                onClick={() => { setActiveTab('orders'); setSearchParams({ tab: 'orders' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'orders' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'orders' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'orders' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <Package size={18} color={activeTab === 'orders' ? '#0284C7' : '#64748B'} /> My Orders ({orders.length})
              </button>

              <button
                onClick={() => { setActiveTab('addresses'); setSearchParams({ tab: 'addresses' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'addresses' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'addresses' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'addresses' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <MapPin size={18} color={activeTab === 'addresses' ? '#0284C7' : '#64748B'} /> Saved Addresses
              </button>

              <button
                onClick={() => { setActiveTab('wishlist'); setSearchParams({ tab: 'wishlist' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'wishlist' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'wishlist' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'wishlist' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <Heart size={18} color={activeTab === 'wishlist' ? '#E11D48' : '#64748B'} /> Wishlist ({wishlist.length})
              </button>

              <button
                onClick={() => { setActiveTab('track'); setSearchParams({ tab: 'track' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'track' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'track' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'track' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <Truck size={18} color={activeTab === 'track' ? '#0284C7' : '#64748B'} /> Track Any Order
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setActiveTab('auth'); setSearchParams({ tab: 'auth' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'auth' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'auth' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'auth' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <LogIn size={18} color={activeTab === 'auth' ? '#0284C7' : '#64748B'} /> Sign In / Quick OTP Login
              </button>

              <button
                onClick={() => { setActiveTab('wishlist'); setSearchParams({ tab: 'wishlist' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'wishlist' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'wishlist' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'wishlist' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <Heart size={18} color={activeTab === 'wishlist' ? '#E11D48' : '#64748B'} /> Wishlist ({wishlist.length})
              </button>

              <button
                onClick={() => { setActiveTab('track'); setSearchParams({ tab: 'track' }); }}
                style={{
                  padding: '0.85rem 1.25rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'track' ? '3px solid #0284C7' : '3px solid transparent',
                  color: activeTab === 'track' ? '#0F172A' : '#64748B',
                  fontWeight: activeTab === 'track' ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem'
                }}
              >
                <Truck size={18} color={activeTab === 'track' ? '#0284C7' : '#64748B'} /> Track Order by Mobile No.
              </button>
            </>
          )}
        </div>

        {/* TAB 1: AUTH (Mobile OTP & Email/Password) */}
        {!user?.isLoggedIn && activeTab === 'auth' && (
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              {/* Method Switcher */}
              <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '8px', padding: '4px', marginBottom: '2rem' }}>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('mobile_otp'); setOtpSent(false); }}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: authMethod === 'mobile_otp' ? '#FFFFFF' : 'transparent',
                    color: authMethod === 'mobile_otp' ? '#0F172A' : '#64748B',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: authMethod === 'mobile_otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  📱 Mobile OTP (Quick)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('email_password')}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: authMethod === 'email_password' ? '#FFFFFF' : 'transparent',
                    color: authMethod === 'email_password' ? '#0F172A' : '#64748B',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: authMethod === 'email_password' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  ✉️ Email / Password
                </button>
              </div>

              {/* OPTION A: MOBILE OTP (The Derma Co Flow) */}
              {authMethod === 'mobile_otp' ? (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                    {otpSent ? 'Enter Verification Code' : 'Sign In with Mobile'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.75rem' }}>
                    {otpSent ? `We sent a 4-digit code to +91 ${mobilePhone}` : 'Enter your 10-digit phone number to receive a secure login code.'}
                  </p>

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Mobile Number</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
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
                            className="form-control"
                            placeholder="98765 43210"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            style={{ fontSize: '1rem', fontWeight: '700' }}
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading || mobilePhone.length !== 10}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {authLoading ? 'Sending OTP...' : 'Send Login OTP →'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp}>
                      {testOtp && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F9FF', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px dashed #0284C7', marginBottom: '1.25rem' }}>
                          <span style={{ fontSize: '0.82rem', color: '#0F172A' }}>
                            🔐 Test OTP: <strong style={{ color: '#0284C7' }}>{testOtp}</strong> (or 1234)
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpCode(testOtp)}
                            style={{ background: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: '3px', fontSize: '0.72rem', padding: '3px 8px', cursor: 'pointer', fontWeight: '700' }}
                          >
                            Auto-Fill
                          </button>
                        </div>
                      )}

                      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                        <input
                          type="text"
                          maxLength="4"
                          className="form-control"
                          placeholder="Enter 4-Digit Code"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                          style={{ fontSize: '1.2rem', textAlign: 'center', letterSpacing: '0.25em', fontWeight: '800' }}
                          autoFocus
                          required
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Change Number
                        </button>
                        {otpTimer > 0 ? (
                          <span style={{ color: '#64748B' }}>Resend in {otpTimer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            style={{ background: 'none', border: 'none', color: '#0284C7', fontWeight: '700', cursor: 'pointer' }}
                          >
                            Resend Code
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading || otpCode.length < 4}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {authLoading ? 'Verifying...' : 'Verify & Enter Portal →'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                /* OPTION B: EMAIL & PASSWORD */
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                    {isRegisterMode ? 'Create Patient Account' : 'Sign In with Email'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.75rem' }}>
                    {isRegisterMode ? 'Register to receive bespoke formulation updates and saved addresses.' : 'Enter your email credentials to access your clinical account.'}
                  </p>

                  <form onSubmit={handleEmailAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                    {isRegisterMode && (
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Dr. / Ms. / Mr. Full Name"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                      />
                    </div>

                    {isRegisterMode && (
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700' }}>Phone (Optional)</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+91 98765 43210"
                          value={authPhoneInput}
                          onChange={(e) => setAuthPhoneInput(e.target.value)}
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                    >
                      {authLoading ? 'Processing...' : isRegisterMode ? 'Create Account →' : 'Sign In →'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setIsRegisterMode(!isRegisterMode)}
                        style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '600' }}
                      >
                        {isRegisterMode ? 'Already have an account? Sign In' : "Don't have an account? Register"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY ORDERS */}
        {user?.isLoggedIn && activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(15, 23, 42, 0.08)', padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
                <Package size={48} color="#94A3B8" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                  No Orders Placed Yet
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  Explore active cosmeceutical molecules developed under Dr. Siddhi clinical oversight.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Explore Formulations &rarr;
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      padding: '1.75rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
                            Order #{ord.id}
                          </span>
                          <span className={`badge ${ord.status === 'Delivered' ? 'badge-emerald' : 'badge-teal'}`}>
                            {ord.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                          Placed on {new Date(ord.date || ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {ord.paymentMethod}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>
                          ₹{ord.total}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          AWB: <strong>{ord.trackingNumber}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Order Line Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {ord.items && ord.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={item.product?.heroImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80'}
                            alt={item.product?.name || 'Formulation'}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80';
                            }}
                            style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>
                              {item.product?.name || 'ContrÂge Active Formulation'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                              Qty: {item.quantity} • {item.selectedSize}
                            </div>
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                            ₹{(item.price || item.product?.salePrice || item.product?.price || 0) * (item.quantity || 1)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Checkpoints Timeline */}
                    {ord.checkpoints && ord.checkpoints.length > 0 && (
                      <div style={{ backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                          Delhivery Transit Status
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {ord.checkpoints.map((cp, cIdx) => (
                            <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem' }}>
                              <CheckCircle2 size={15} color={cp.completed ? '#059669' : '#CBD5E1'} style={{ marginTop: '2px', flexShrink: 0 }} />
                              <div>
                                <span style={{ fontWeight: '700', color: cp.completed ? '#0F172A' : '#94A3B8' }}>{cp.status}</span>
                                {cp.time && <span style={{ color: '#64748B', marginLeft: '6px' }}>({cp.time})</span>}
                                {cp.note && <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{cp.note}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TRACK ORDER BY MOBILE NUMBER */}
        {activeTab === 'track' && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(15, 23, 42, 0.08)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                Track Orders by Mobile Number
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Enter the 10-digit mobile number used during checkout to check live Delhivery shipping updates.
              </p>

              <form onSubmit={handleLookupOrders} style={{ display: 'flex', gap: '0.75rem' }}>
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
                  className="form-control"
                  placeholder="98765 43210"
                  value={lookupPhone}
                  onChange={(e) => setLookupPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  style={{ flex: 1, fontSize: '1rem', fontWeight: '700' }}
                  required
                />
                <button
                  type="submit"
                  disabled={isLookingUp || lookupPhone.length !== 10}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}
                >
                  {isLookingUp ? 'Searching...' : 'Track Orders →'}
                </button>
              </form>
            </div>

            {/* Lookup Results */}
            {lookupResults && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A' }}>
                  Orders Found ({lookupResults.length})
                </h4>

                {lookupResults.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
                    No orders registered under +91 {lookupPhone}.
                  </div>
                ) : (
                  lookupResults.map((ord) => (
                    <div key={ord.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>Order #{ord.id}</span>
                          <span className={`badge ${ord.status === 'Delivered' ? 'badge-emerald' : 'badge-teal'}`} style={{ marginLeft: '8px' }}>
                            {ord.status}
                          </span>
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>₹{ord.total}</span>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
                        Delhivery Tracking AWB: <strong>{ord.trackingNumber}</strong> • {ord.paymentMethod}
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '4px' }}>
                        {ord.items && ord.items.map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <span style={{ fontWeight: '700', color: '#0F172A' }}>{it.product?.name || 'Formulation'} ({it.selectedSize}) x {it.quantity}</span>
                            <span style={{ fontWeight: '800', color: '#0F172A' }}>₹{(it.price || it.product?.salePrice || it.product?.price || 0) * it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SAVED ADDRESSES */}
        {user?.isLoggedIn && activeTab === 'addresses' && (
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                Saved Clinical Delivery Addresses
              </h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {/* Add Address Form */}
            {showAddressForm && (
              <form onSubmit={handleAddAddress} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid #CBD5E1', marginBottom: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem' }}>New Address Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Flat / House No. / Street</label>
                    <input type="text" className="form-control" value={newStreet} onChange={e => setNewStreet(e.target.value)} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input type="text" className="form-control" value={newCity} onChange={e => setNewCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <input type="text" className="form-control" value={newState} onChange={e => setNewState(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">PIN Code</label>
                      <input type="text" maxLength="6" className="form-control" value={newPincode} onChange={e => setNewPincode(e.target.value)} required />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="btn btn-secondary btn-sm">Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">Save Address</button>
                  </div>
                </div>
              </form>
            )}

            {/* Address List */}
            {(!user.addresses || user.addresses.length === 0) ? (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2.5rem', textAlign: 'center', border: '1px solid #E2E8F0', color: '#64748B' }}>
                No delivery addresses saved yet. Click "Add New Address" above.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {user.addresses.map((addr) => (
                  <div key={addr.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid #E2E8F0', position: 'relative' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                      {addr.name || user.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                      {addr.street}<br />
                      {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                    </div>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      aria-label="Delete address"
                      style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {!user?.isLoggedIn && wishlist.length > 0 && (
              <div style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.25rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Sparkles size={18} color="#2563EB" />
                  <span style={{ fontSize: '0.88rem', color: '#1E40AF', fontWeight: '500' }}>
                    <strong>Guest Wishlist:</strong> Items are saved in your current browser session. Sign In to sync your wishlist across all devices.
                  </span>
                </div>
                <button
                  onClick={() => { setActiveTab('auth'); setSearchParams({ tab: 'auth' }); }}
                  className="btn btn-primary btn-xs"
                  style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap' }}
                >
                  Sign In / Register &rarr;
                </button>
              </div>
            )}

            {wishlistedProducts.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(15, 23, 42, 0.08)', padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
                <Heart size={48} color="#E11D48" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Your Wishlist is Empty
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                  Save your favorite active molecules and clinical routines for easy reordering.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Browse Formulations &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid-4">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id || p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
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
  Trash2
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
    logout
  } = useStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || (user?.email ? 'orders' : 'auth'));

  // Auth Form State
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Address Modal / Form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleAuthSubmit = async (e) => {
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
        phone: authPhone
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

  const handleDemoAdminLogin = async () => {
    setAuthLoading(true);
    await login('admin@contrage.com', 'Admin@ContrAge2026');
    setActiveTab('orders');
    setSearchParams({ tab: 'orders' });
    setAuthLoading(false);
  };

  const handleDemoCustomerLogin = async () => {
    setAuthLoading(true);
    await login('priya.sharma@example.com', 'Customer@123');
    setActiveTab('orders');
    setSearchParams({ tab: 'orders' });
    setAuthLoading(false);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) {
      showToast('Please fill out all address fields.', 'error');
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      name: user.name || 'Customer',
      phone: user.phone || '',
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: false
    };

    try {
      await api.auth.addAddress(newAddr);
    } catch (err) {}

    setUser(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddr]
    }));

    setShowAddressForm(false);
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
    showToast('New shipping address saved.');
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await api.auth.deleteAddress(addressId);
    } catch (err) {}
    setUser(prev => ({
      ...prev,
      addresses: (prev.addresses || []).filter(a => a.id !== addressId)
    }));
    showToast('Address removed.', 'info');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--teal-800)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: '800'
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={24} />}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
                    {user?.name || 'Customer Account'}
                  </h1>
                  {user?.role === 'ADMIN' && (
                    <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>Clinical Admin</span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {user?.email ? `${user.email} • ${user.phone || 'Verified Customer'} • Skin Profile: ` : 'Please log in to manage your orders & clinical profile'}
                  {user?.email && <strong>{user?.skinType || 'Combination Skin'}</strong>}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {user?.email ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link to="/admin" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} /> Admin CMS Portal
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="btn btn-light btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('auth');
                    setSearchParams({ tab: 'auth' });
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <LogIn size={16} /> Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '0.5rem'
        }}>
          {[
            { id: 'orders', label: 'Live Order Tracking & History', icon: <Truck size={16} /> },
            { id: 'wishlist', label: `Clinical Wishlist (${wishlist.length})`, icon: <Heart size={16} /> },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={16} /> },
            { id: 'profile', label: 'Diagnostic Skin Profile', icon: <Sparkles size={16} /> },
            { id: 'auth', label: user?.email ? 'Account Security' : 'Sign In / Register', icon: <Lock size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchParams({ tab: tab.id });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: activeTab === tab.id ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
                backgroundColor: activeTab === tab.id ? 'var(--teal-800)' : '#FFFFFF',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Live Order Tracking & Orders */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <Package size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Orders Found</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  You haven't placed any clinical orders yet.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Explore Formulations &rarr;
                </Link>
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid #E2E8F0',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Order Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid #E2E8F0',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                          Order {order.id}
                        </h3>
                        <span className="badge badge-teal">
                          {order.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Tracking Number: <strong style={{ color: 'var(--teal-900)' }}>{order.trackingNumber}</strong> • Placed on {new Date(order.date || order.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--teal-950)' }}>
                        ₹{order.total}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {order.items?.length} items • {order.paymentMethod}
                      </div>
                    </div>
                  </div>

                  {/* Multi-Stage Checkpoint Timeline */}
                  <div style={{
                    backgroundColor: '#FAF9F6',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #E2E8F0',
                    padding: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--teal-900)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Truck size={18} /> Live Logistics Checkpoints:
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1.5rem',
                      position: 'relative'
                    }}>
                      {order.checkpoints?.map((cp, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'relative' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: cp.completed ? 'var(--teal-700)' : '#CBD5E1',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: '700'
                            }}>
                              {cp.completed ? '✓' : idx + 1}
                            </div>
                            <span style={{
                              fontWeight: '700',
                              fontSize: '0.88rem',
                              color: cp.completed ? 'var(--teal-950)' : 'var(--text-muted)'
                            }}>
                              {cp.status}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.75rem', color: 'var(--teal-700)', fontWeight: '600', paddingLeft: '2rem' }}>
                            {cp.time}
                          </div>
                          {cp.note && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: '2rem' }}>
                              {cp.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items Snapshot */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img
                            src={item.product?.heroImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80'}
                            alt={item.product?.name}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                              {item.product?.name}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Size: {item.selectedSize} • Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontWeight: '700', color: 'var(--teal-900)' }}>
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
                    <div>
                      <strong>Delivery To:</strong> {order.customer?.name}, {order.customer?.address}, {order.customer?.city} - {order.customer?.pincode}
                    </div>
                    <Link to={`/order-confirmation/${order.id}`} className="btn btn-outline btn-sm">
                      View Official Invoice &rarr;
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistedProducts.length === 0 ? (
              <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <Heart size={40} color="var(--text-light)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your Clinical Wishlist is Empty</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Save doctor-formulated cosmeceuticals for your next regimen refill.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Browse Catalog &rarr;
                </Link>
              </div>
            ) : (
              <div className="product-grid">
                {wishlistedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>Registered Delivery Addresses</h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} style={{
                backgroundColor: '#FFFFFF',
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--teal-300)',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '700' }}>Add Shipping Destination</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="House/Flat No, Street, Landmark"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode (e.g. 122003)"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="submit" className="btn btn-primary btn-sm">Save Address</button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="btn btn-light btn-sm">Cancel</button>
                </div>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {user?.addresses?.map((addr, idx) => (
                <div
                  key={addr.id || idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #E2E8F0',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>{addr.name || user?.name}</span>
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      title="Delete Address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {addr.street}<br />
                    {addr.city}, {addr.state} - {addr.pincode}<br />
                    Phone: {addr.phone || user?.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Skin Profile */}
        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #E2E8F0',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              Your Diagnostic Skin Profile
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Baseline Skin Type</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user?.skinType || 'Oily / Combination'}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Primary Target</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user?.primaryConcern || 'Acne & Blemishes'}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Tolerance</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user?.sensitivity || 'Low-Medium'}</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--teal-50)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1rem', color: 'var(--teal-950)', marginBottom: '0.35rem' }}>
                <Sparkles size={18} color="var(--teal-700)" />
                <span>Need to update your clinical routine?</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--teal-800)', marginBottom: '1rem' }}>
                Retake the 4-step skin diagnostic quiz at any time to recalibrate your seasonal skincare formulation requirements.
              </p>
              <Link to="/#skin-quiz" className="btn btn-primary btn-sm">
                Retake Skin Diagnostic Quiz &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Tab 5: Auth / Security */}
        {activeTab === 'auth' && (
          <div style={{ maxWidth: '540px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--teal-50)',
                color: 'var(--teal-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                {isRegisterMode ? <UserPlus size={24} /> : <LogIn size={24} />}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                {isRegisterMode ? 'Create Your Clinical Account' : 'Sign In to ContrAge'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                {isRegisterMode
                  ? 'Access prescription histories, personalized regimens, and order tracking.'
                  : 'Enter your credentials to manage your verified orders and clinical diagnostics.'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit}>
              {isRegisterMode && (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Dr. / Ms. / Mr. Name"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
                disabled={authLoading}
              >
                {authLoading ? 'Authenticating...' : (isRegisterMode ? 'Register Account' : 'Sign In')}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem' }}>
                {isRegisterMode ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegisterMode(false)}
                      style={{ background: 'none', border: 'none', color: 'var(--teal-700)', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    New patient or specialist?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegisterMode(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--teal-700)', fontWeight: '700', cursor: 'pointer' }}
                    >
                      Create Account
                    </button>
                  </span>
                )}
              </div>
            </form>

            {/* Quick Demo Logins for Fast Operational Testing */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #CBD5E1' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', textAlign: 'center', marginBottom: '0.75rem' }}>
                ⚡ Quick 1-Click Operational Test Logins:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleDemoCustomerLogin}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  Customer (Priya)
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  Admin (CMS Full Access)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

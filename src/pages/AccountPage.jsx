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
  ArrowRight
} from 'lucide-react';

export default function AccountPage() {
  const { user, orders, wishlist, products, quizResult, setUser, showToast } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'orders');

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

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newPincode) {
      showToast('Please fill out all address fields.', 'error');
      return;
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      name: user.name,
      phone: user.phone,
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      isDefault: false
    };

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

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0 2rem 0' }}>
        <div className="container">
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
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
                {user.name}
              </h1>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {user.email} • {user.phone} • Skin Profile: <strong>{user.skinType}</strong>
              </div>
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
            { id: 'profile', label: 'Diagnostic Skin Profile', icon: <Sparkles size={16} /> }
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
                        Tracking Number: <strong style={{ color: 'var(--teal-900)' }}>{order.trackingNumber}</strong> • Placed on {new Date(order.date).toLocaleDateString()}
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

                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '2rem', lineHeight: '1.3' }}>
                            {cp.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Items in this order */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Package Formulations:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {order.items?.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.88rem', padding: '0.5rem 0', borderBottom: '1px solid #F1F5F9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={item.product?.heroImage} alt={item.product?.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                            <div>
                              <span style={{ fontWeight: '600' }}>{item.product?.name}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({item.selectedSize} × {item.quantity})</span>
                            </div>
                          </div>
                          <span style={{ fontWeight: '700' }}>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
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
                  Save doctor formulations here to review and purchase later.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Browse Formulations &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid-3">
                {wishlistedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>Saved Shipping Addresses</h3>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--teal-700)',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Add Delivery Address</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="House / Street / Area"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
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
              {user.addresses?.map((addr, idx) => (
                <div
                  key={addr.id || idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #E2E8F0',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>{addr.name}</span>
                    {addr.isDefault && <span className="badge badge-teal">Default</span>}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {addr.street}<br />
                    {addr.city}, {addr.state} - {addr.pincode}<br />
                    Phone: {addr.phone}
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
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user.skinType}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Primary Target</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user.primaryConcern}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Tolerance</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--teal-950)', marginTop: '0.25rem' }}>{user.sensitivity || 'Moderate'}</div>
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
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  FileText,
  HelpCircle,
  Megaphone,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Search,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  Eye,
  AlertTriangle,
  Layers,
  ArrowLeft,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    blogs,
    addBlog,
    deleteBlog,
    faqs,
    addFAQ,
    deleteFAQ,
    announcement,
    setAnnouncement,
    resetDemoData,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'coupons' | 'content' | 'settings'

  // Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    tagline: '',
    category: 'Serums & Treatments',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes'],
    skinTypes: ['All Skin Types', 'Oily / Combination'],
    price: 699,
    salePrice: 549,
    stock: 50,
    sizes: '30ml, 50ml',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    activeName: 'Niacinamide (USP Grade)',
    activePercent: '10%',
    activeRole: 'Sebum control & epidermal barrier reinforcement',
    fullInci: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Sodium Hyaluronate, Phenoxyethanol.',
    howToUseText: 'Apply 2-3 drops morning and evening onto cleansed skin.',
    badge: 'Clinical Formulation'
  });

  // Coupon Form State
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState('percentage');
  const [couponValue, setCouponValue] = useState(20);
  const [couponMinSpend, setCouponMinSpend] = useState(999);
  const [couponDesc, setCouponDesc] = useState('Special clinical promotion');

  // Blog Form State
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Clinical Research');
  const [blogAuthor, setBlogAuthor] = useState('Dr. Alistair Vance, MD');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // FAQ Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqCategory, setFaqCategory] = useState('Formulation & Safety');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Announcement State
  const [announcementText, setAnnouncementText] = useState(announcement?.text || '');
  const [announcementLink, setAnnouncementLink] = useState(announcement?.link || '');
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement?.enabled ?? true);

  // Search & Filter state for catalog table
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');

  // Calculations for Overview Dashboard
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter(p => (p.stock || 0) < 50).length;

  // Open Edit Product
  const handleEditProductClick = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      tagline: prod.tagline,
      category: prod.category,
      primaryConcern: prod.primaryConcern || 'Acne & Blemishes',
      concerns: prod.concerns || ['Acne & Blemishes'],
      skinTypes: prod.skinTypes || ['All Skin Types'],
      price: prod.price,
      salePrice: prod.salePrice || prod.price,
      stock: prod.stock || 50,
      sizes: prod.sizes ? prod.sizes.join(', ') : '30ml',
      heroImage: prod.heroImage,
      activeName: prod.activeIngredients?.[0]?.name || 'Active Molecule',
      activePercent: prod.activeIngredients?.[0]?.percentage || '5%',
      activeRole: prod.activeIngredients?.[0]?.role || 'Skin conditioning',
      fullInci: prod.fullInci || '',
      howToUseText: prod.howToUse?.instructions || '',
      badge: prod.badge || ''
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const formattedSizes = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
    const prodPayload = {
      name: productForm.name,
      tagline: productForm.tagline,
      category: productForm.category,
      primaryConcern: productForm.primaryConcern,
      concerns: productForm.concerns,
      skinTypes: productForm.skinTypes,
      price: Number(productForm.price),
      salePrice: Number(productForm.salePrice),
      stock: Number(productForm.stock),
      sizes: formattedSizes.length > 0 ? formattedSizes : ['30ml'],
      heroImage: productForm.heroImage,
      activeIngredients: [
        {
          name: productForm.activeName,
          percentage: productForm.activePercent,
          role: productForm.activeRole
        }
      ],
      fullInci: productForm.fullInci,
      howToUse: {
        am: true,
        pm: true,
        step: 'Treatment Step',
        instructions: productForm.howToUseText,
        warning: 'Patch test before first use.'
      },
      badge: productForm.badge
    };

    if (editingProductId) {
      updateProduct(editingProductId, prodPayload);
    } else {
      addProduct(prodPayload);
    }

    setShowProductModal(false);
    setEditingProductId(null);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    addCoupon({
      code: couponCode.trim().toUpperCase(),
      type: couponType,
      value: Number(couponValue),
      minSpend: Number(couponMinSpend),
      description: couponDesc
    });

    setShowCouponModal(false);
    setCouponCode('');
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!blogTitle.trim()) return;

    addBlog({
      title: blogTitle,
      category: blogCategory,
      author: blogAuthor,
      authorRole: 'Clinical Advisory Board',
      coverImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=1200&q=80',
      excerpt: blogExcerpt,
      content: `<p>${blogContent || blogExcerpt}</p>`,
      readTime: '5 min read'
    });

    setShowBlogModal(false);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
  };

  const handleCreateFAQ = (e) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;

    addFAQ({
      category: faqCategory,
      question: faqQuestion,
      answer: faqAnswer
    });

    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncement({
      text: announcementText,
      link: announcementLink,
      enabled: announcementEnabled
    });
    showToast('Announcement ticker settings saved!');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div style={{ backgroundColor: '#F7F5F7', minHeight: '100vh', color: '#17213A', paddingBottom: '5rem' }}>
      {/* Top Admin Header */}
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(23, 33, 58, 0.1)',
        padding: '1.15rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 2px 10px rgba(23, 33, 58, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: '#17213A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: '#17213A', margin: 0, fontWeight: '700' }}>
              AESTHEDERM ADMIN CRM & PORTAL
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#6C5B8B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>
              Real-Time Catalog & Fulfillment Engine
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={resetDemoData}
            className="btn btn-sm"
            style={{
              backgroundColor: '#FDF2F4',
              color: '#D96B7D',
              border: '1px solid rgba(217, 107, 125, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: '700'
            }}
          >
            <RotateCcw size={13} /> Reset Factory Seed
          </button>

          <Link
            to="/"
            className="btn btn-primary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <ArrowLeft size={14} /> Back to Live Storefront
          </Link>
        </div>
      </header>

      {/* Main Admin Grid (Sidebar Nav + Panel) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        minHeight: 'calc(100vh - 4.5rem)'
      }}>
        {/* Sidebar Tabs */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '1.75rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <LayoutDashboard size={18} /> },
            { id: 'products', label: `Formulations (${products.length})`, icon: <Package size={18} /> },
            { id: 'orders', label: `Orders & Logistics (${orders.length})`, icon: <ShoppingBag size={18} /> },
            { id: 'coupons', label: `Promo Codes (${coupons.length})`, icon: <Tag size={18} /> },
            { id: 'content', label: 'Content & Editorial', icon: <FileText size={18} /> },
            { id: 'settings', label: 'Storefront Settings', icon: <Megaphone size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'var(--bg-lavender)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? '800' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Panel View */}
        <main style={{ padding: '2.5rem', overflowX: 'auto' }}>
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                  Platform Analytics Overview
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Real-time transaction revenue, active orders, and formula inventory health.
                </p>
              </div>

              {/* Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Gross Platform Revenue</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>₹{totalRevenue.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#438E75', fontWeight: '700', marginTop: '0.35rem' }}>+18.4% vs. previous period</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Total Orders Processed</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{totalOrdersCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#3B5D92', fontWeight: '700', marginTop: '0.35rem' }}>Cold-chain dispatched</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Average Order Value (AOV)</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>₹{avgOrderValue}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>Routine bundles average</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Catalog Formulations</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{products.length}</div>
                  <div style={{ fontSize: '0.75rem', color: lowStockCount > 0 ? '#C28E46' : '#438E75', fontWeight: '700', marginTop: '0.35rem' }}>
                    {lowStockCount > 0 ? `${lowStockCount} items below stock threshold` : 'All inventory healthy'}
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Recent Orders Activity</h3>
                  <button onClick={() => setActiveTab('orders')} className="btn btn-sm btn-secondary">
                    Manage All Orders &rarr;
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.08)', color: 'var(--text-secondary)', textAlign: 'left', backgroundColor: 'var(--bg-lavender)' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Items</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Total</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{o.id}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{o.customer?.name}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>{o.items?.length} items</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: '700' }}>₹{o.total}</td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span className="badge badge-lavender" style={{ fontSize: '0.7rem' }}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT CATALOG CRUD */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Formulations Manager</h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Add, edit molecular specifications, and manage inventory levels.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({
                      name: '',
                      tagline: '',
                      category: 'Serums & Treatments',
                      primaryConcern: 'Acne & Blemishes',
                      concerns: ['Acne & Blemishes'],
                      skinTypes: ['All Skin Types'],
                      price: 699,
                      salePrice: 549,
                      stock: 60,
                      sizes: '30ml, 50ml',
                      heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
                      activeName: 'Niacinamide (USP)',
                      activePercent: '10%',
                      activeRole: 'Sebum regulation',
                      fullInci: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Phenoxyethanol.',
                      howToUseText: 'Apply 2-3 drops morning and evening.',
                      badge: 'New Formulation'
                    });
                    setShowProductModal(true);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} /> Add New Formulation
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: '1.5rem', maxWidth: '380px' }}>
                <input
                  type="text"
                  placeholder="Search catalog by name or category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="form-control"
                  style={{ backgroundColor: '#FFFFFF' }}
                />
              </div>

              {/* Products Table */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.08)', color: 'var(--text-secondary)', textAlign: 'left', backgroundColor: 'var(--bg-lavender)' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>Image</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Formulation Name</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Price</th>
                      <th style={{ padding: '0.85rem 1rem' }}>Stock</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <img src={p.heroImage} alt={p.name} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }} />
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6C5B8B', fontWeight: '600' }}>
                            {p.activeIngredients?.[0]?.percentage} {p.activeIngredients?.[0]?.name}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{p.category}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '700' }}>
                          ₹{p.salePrice || p.price}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: p.stock < 50 ? '#FDF2F4' : '#EFF8F4',
                            color: p.stock < 50 ? '#B44658' : '#2F6D58'
                          }}>
                            {p.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              onClick={() => handleEditProductClick(p)}
                              style={{ background: 'none', border: 'none', color: '#3B5D92', cursor: 'pointer', padding: '4px' }}
                              title="Edit Formulation"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer', padding: '4px' }}
                              title="Delete Formulation"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER FULFILLMENT & LOGISTICS */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Order Logistics & Fulfillment</h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Update order status to sync customer tracking timelines.</p>
                </div>

                {/* Filter */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['all', 'Processing', 'Dispatched', 'In Transit', 'Delivered'].map(st => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        backgroundColor: orderFilter === st ? 'var(--accent-navy)' : '#FFFFFF',
                        color: orderFilter === st ? '#FFFFFF' : 'var(--text-secondary)',
                        border: '1px solid rgba(23, 33, 58, 0.12)',
                        cursor: 'pointer'
                      }}
                    >
                      {st.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(23, 33, 58, 0.08)',
                      padding: '1.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{order.id}</span>
                          <span className="badge badge-lavender">{order.status}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          Tracking: {order.trackingNumber} • {order.paymentMethod}
                        </div>
                      </div>

                      {/* Status Action Dropdown */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Update Live Checkpoint:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '0.45rem 0.85rem',
                            backgroundColor: 'var(--bg-lavender)',
                            color: 'var(--text-primary)',
                            border: '1px solid #6C5B8B',
                            borderRadius: 'var(--radius-xs)',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Processing">Processing (Lab Packed)</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer info & items */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', fontSize: '0.85rem' }}>
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Customer & Destination:</div>
                        <div style={{ color: 'var(--text-primary)' }}>
                          {order.customer?.name} ({order.customer?.phone})<br />
                          {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Formulations ({order.items?.length}):</div>
                        {order.items?.map((it, i) => (
                          <div key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                            • {it.product?.name} ({it.selectedSize}) × {it.quantity} — ₹{it.price * it.quantity}
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>Total Amount Paid:</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>₹{order.total}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COUPON & PROMO ENGINE */}
          {activeTab === 'coupons' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Coupon & Promo Engine</h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Create promotional discount codes with spend thresholds.</p>
                </div>

                <button
                  onClick={() => setShowCouponModal(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} /> Create New Coupon
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {coupons.map(c => (
                  <div
                    key={c.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(23, 33, 58, 0.08)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: '800', color: 'var(--text-primary)' }}>
                          {c.code}
                        </span>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          backgroundColor: c.active ? '#EFF8F4' : '#FDF2F4',
                          color: c.active ? '#2F6D58' : '#B44658'
                        }}>
                          {c.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        {c.description}
                      </p>

                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Discount: <strong>{c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} FLAT`}</strong> • Min Spend: ₹{c.minSpend}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                      <button
                        onClick={() => toggleCoupon(c.id)}
                        className="btn btn-sm btn-secondary"
                        style={{ flex: 1, fontSize: '0.78rem' }}
                      >
                        {c.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteCoupon(c.id)}
                        className="btn btn-sm"
                        style={{ backgroundColor: '#FDF2F4', color: '#D96B7D', border: '1px solid rgba(217, 107, 125, 0.3)', padding: '0 0.65rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONTENT CMS (BLOGS & FAQS) */}
          {activeTab === 'content' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Content & Editorial CMS</h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Publish doctor articles, manage FAQs, and update testimonials.</p>
                </div>

                <button
                  onClick={() => setShowBlogModal(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} /> Publish Doctor Article
                </button>
              </div>

              {/* Blogs Section */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                  Doctor Research Articles ({blogs.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {blogs.map(b => (
                    <div
                      key={b.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(23, 33, 58, 0.08)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{b.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          By {b.author} • {b.category} • {b.publishedDate}
                        </div>
                      </div>

                      <button
                        onClick={() => deleteBlog(b.id)}
                        style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs Section */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                  Help Center FAQs ({faqs.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {faqs.map(f => (
                    <div
                      key={f.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(23, 33, 58, 0.08)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{f.question}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.category}</div>
                      </div>

                      <button
                        onClick={() => deleteFAQ(f.id)}
                        style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Add FAQ Form */}
                <form onSubmit={handleCreateFAQ} style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Quick Add FAQ</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Question"
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      className="form-control"
                      required
                    />
                    <select
                      value={faqCategory}
                      onChange={(e) => setFaqCategory(e.target.value)}
                      className="form-control"
                    >
                      <option>Formulation & Safety</option>
                      <option>Skin Routines & Concerns</option>
                      <option>Orders & Shipping</option>
                      <option>Professional & B2B</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Answer explanation..."
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    rows="3"
                    className="form-control"
                    style={{ marginBottom: '1rem' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary btn-sm">Add FAQ to Knowledge Base</button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: STOREFRONT SETTINGS & BANNERS */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '640px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>Announcement Bar & Header Settings</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Customize the top promotional ticker and clinical alerts.</p>
              </div>

              <form onSubmit={handleSaveAnnouncement} style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                <div className="form-group">
                  <label className="form-label">Top Announcement Ticker Text</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CTA Link Route</label>
                  <input
                    type="text"
                    className="form-control"
                    value={announcementLink}
                    onChange={(e) => setAnnouncementLink(e.target.value)}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={announcementEnabled}
                    onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                    style={{ accentColor: 'var(--accent-navy)' }}
                  />
                  <span>Enable Announcement Ticker on Storefront</span>
                </label>

                <button type="submit" className="btn btn-primary">Save Settings</button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Product Create/Edit Modal */}
      {showProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          backgroundColor: 'rgba(23, 33, 58, 0.6)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(23, 33, 58, 0.1)',
            padding: '2rem',
            boxShadow: 'var(--shadow-luxury)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-serif)' }}>
                {editingProductId ? 'Edit Clinical Formulation' : 'Add New Clinical Formulation'}
              </h3>
              <button onClick={() => setShowProductModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tagline / Short Clinical Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option>Serums & Treatments</option>
                    <option>Cleansers</option>
                    <option>Moisturizers & Creams</option>
                    <option>Sun Protection</option>
                    <option>Exfoliants & Toners</option>
                    <option>Eye Care</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Concern</label>
                  <select
                    className="form-control"
                    value={productForm.primaryConcern}
                    onChange={(e) => setProductForm({ ...productForm, primaryConcern: e.target.value, concerns: [e.target.value] })}
                  >
                    <option>Acne & Blemishes</option>
                    <option>Hyperpigmentation</option>
                    <option>Damaged Barrier</option>
                    <option>Aging & Fine Lines</option>
                    <option>Open Pores & Oiliness</option>
                    <option>Redness & Sensitivity</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">MRP Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sale Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productForm.salePrice}
                    onChange={(e) => setProductForm({ ...productForm, salePrice: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hero Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={productForm.heroImage}
                  onChange={(e) => setProductForm({ ...productForm, heroImage: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Primary Active Molecule</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productForm.activeName}
                    onChange={(e) => setProductForm({ ...productForm, activeName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Concentration (%)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productForm.activePercent}
                    onChange={(e) => setProductForm({ ...productForm, activePercent: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Active Action Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productForm.activeRole}
                    onChange={(e) => setProductForm({ ...productForm, activeRole: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full INCI Ingredients Transparency</label>
                <textarea
                  rows="2"
                  className="form-control"
                  value={productForm.fullInci}
                  onChange={(e) => setProductForm({ ...productForm, fullInci: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                  {editingProductId ? 'Update Formulation' : 'Save & Publish Formulation'}
                </button>
                <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-light btn-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid rgba(23, 33, 58, 0.1)', boxShadow: 'var(--shadow-luxury)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>Create Promo Code</h3>
            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. GLOW30"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{ textTransform: 'uppercase' }}
                  className="form-control"
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Discount Type</label>
                  <select
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value)}
                    className="form-control"
                  >
                    <option value="percentage">Percentage Off (%)</option>
                    <option value="fixed">Fixed Flat Off (₹)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Value</label>
                  <input
                    type="number"
                    value={couponValue}
                    onChange={(e) => setCouponValue(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Minimum Order Spend (₹)</label>
                <input
                  type="number"
                  value={couponMinSpend}
                  onChange={(e) => setCouponMinSpend(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Coupon</button>
                <button type="button" onClick={() => setShowCouponModal(false)} className="btn btn-light">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Publish Modal */}
      {showBlogModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '640px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid rgba(23, 33, 58, 0.1)', boxShadow: 'var(--shadow-luxury)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>Publish Doctor Editorial</h3>
            <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Article Headline</label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="form-control"
                  >
                    <option>Clinical Research</option>
                    <option>Barrier Science</option>
                    <option>Dermatology & Pigment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Author Name</label>
                  <input
                    type="text"
                    value={blogAuthor}
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Summary Excerpt</label>
                <textarea
                  rows="2"
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Article Content (Paragraphs)</label>
                <textarea
                  rows="4"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="form-control"
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Publish Article</button>
                <button type="button" onClick={() => setShowBlogModal(false)} className="btn btn-light">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Style for responsive layout */}
      <style>{`
        @media (max-width: 800px) {
          div[style*="grid-template-columns: 250px 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

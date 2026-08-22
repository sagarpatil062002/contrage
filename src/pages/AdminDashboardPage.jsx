import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles,
  FlaskConical,
  Mail,
  Phone,
  MapPin,
  SlidersHorizontal
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    concerns,
    addConcern,
    updateConcern,
    deleteConcern,
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    clinicalTrials,
    addClinicalTrial,
    updateClinicalTrial,
    deleteClinicalTrial,
    siteContent,
    updateSiteContent,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
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

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'concerns' | 'ingredients' | 'trials' | 'content' | 'inquiries' | 'orders' | 'coupons' | 'editorial' | 'settings'

  // ==========================================
  // PRODUCT MODAL STATE
  // ==========================================
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

  // ==========================================
  // CONCERN MODAL STATE
  // ==========================================
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [editingConcernId, setEditingConcernId] = useState(null);
  const [concernForm, setConcernForm] = useState({
    name: '',
    slug: '',
    shortDesc: '',
    clinicalBackground: '',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    recommendedActives: 'Salicylic Acid 2%, Niacinamide 10%, Zinc PCA 2%',
    contraindications: 'Physical scrubs, Alcohol astringents',
    doctorTips: 'Target active lesions in the morning and seal barrier at night.'
  });

  // ==========================================
  // INGREDIENT MODAL STATE
  // ==========================================
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    category: 'Barrier & Sebum Modulator',
    ewgScore: '1 (Ultra-Safe)',
    optimalPh: '5.0 - 6.5',
    molecularWeight: '122.12 g/mol',
    description: '',
    clinicalBenefits: 'Reduces sebum output\nStimulates ceramide synthesis\nImproves skin tone',
    synergies: 'Zinc PCA, Hyaluronic Acid, Ceramides',
    conflicts: 'Pure L-Ascorbic Acid (direct mix)',
    whoShouldUse: 'Oily, acne-prone, and barrier-compromised skin types.'
  });

  // ==========================================
  // CLINICAL TRIAL MODAL STATE
  // ==========================================
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [editingTrialId, setEditingTrialId] = useState(null);
  const [trialForm, setTrialForm] = useState({
    title: '',
    duration: '4-Week Blinded Study (n=120)',
    formulation: '10% Niacinamide + 2% Zinc PCA Serum',
    notes: 'Zero transepidermal barrier disruption noted during trial period.',
    beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f02e75e921d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    metric1Label: 'Sebum Reduction',
    metric1Value: '43%',
    metric1Inst: 'Sebumeter® SM 815',
    metric2Label: 'Redness Reduction',
    metric2Value: '88%',
    metric2Inst: 'Mexameter® MX 18',
    metric3Label: 'Barrier Improvement',
    metric3Value: '94%',
    metric3Inst: 'Corneometer® CM 825'
  });

  // ==========================================
  // SITE CONTENT STATE (HOMEPAGE & BRAND)
  // ==========================================
  const [heroForm, setHeroForm] = useState({
    eyebrow: siteContent?.hero?.eyebrow || 'DERMATOLOGIST-LED SKINCARE',
    titleLine1: siteContent?.hero?.titleLine1 || 'Advanced Skincare.',
    titleLine2: siteContent?.hero?.titleLine2 || 'Guided by Science.',
    description: siteContent?.hero?.description || 'Premium skincare formulations developed with dermatological expertise and designed around the needs of your skin.',
    primaryCtaText: siteContent?.hero?.primaryCtaText || 'Explore Products',
    primaryCtaLink: siteContent?.hero?.primaryCtaLink || '/shop',
    secondaryCtaText: siteContent?.hero?.secondaryCtaText || 'Find Your Concern',
    secondaryCtaLink: siteContent?.hero?.secondaryCtaLink || '/concerns',
    badgeText: siteContent?.hero?.badgeText || '100% Active Transparency',
    leftProductImage: siteContent?.hero?.leftProductImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    centerProductImage: siteContent?.hero?.centerProductImage || 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=600&q=80',
    rightProductImage: siteContent?.hero?.rightProductImage || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'
  });

  // ==========================================
  // COUPON, BLOG, FAQ FORM STATE
  // ==========================================
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState('percentage');
  const [couponValue, setCouponValue] = useState(20);
  const [couponMinSpend, setCouponMinSpend] = useState(999);
  const [couponDesc, setCouponDesc] = useState('Special clinical promotion');

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Clinical Research');
  const [blogAuthor, setBlogAuthor] = useState('Dr. Alistair Vance, MD');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqCategory, setFaqCategory] = useState('Formulation & Safety');
  const [faqAnswer, setFaqAnswer] = useState('');

  const [announcementText, setAnnouncementText] = useState(announcement?.text || '');
  const [announcementLink, setAnnouncementLink] = useState(announcement?.link || '');
  const [announcementEnabled, setAnnouncementEnabled] = useState(announcement?.enabled ?? true);

  // Search & Filters
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');
  const [inquiryFilter, setInquiryFilter] = useState('all');

  // Calculations for Overview Dashboard
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter(p => (p.stock || 0) < 50).length;
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'New' || i.status === 'Pending Contact').length;

  // ==========================================
  // HANDLERS: PRODUCTS
  // ==========================================
  const handleEditProductClick = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      tagline: prod.tagline || '',
      category: prod.category || 'Serums & Treatments',
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
      concerns: [productForm.primaryConcern],
      skinTypes: productForm.skinTypes,
      price: Number(productForm.price),
      salePrice: Number(productForm.salePrice),
      stock: Number(productForm.stock),
      sizes: formattedSizes,
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
        frequency: 'Daily (AM/PM)',
        instructions: productForm.howToUseText
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

  // ==========================================
  // HANDLERS: CONCERNS
  // ==========================================
  const handleEditConcernClick = (con) => {
    setEditingConcernId(con.id);
    setConcernForm({
      name: con.name,
      slug: con.slug,
      shortDesc: con.shortDesc || '',
      clinicalBackground: con.clinicalBackground || '',
      heroImage: con.heroImage || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      recommendedActives: con.recommendedActives ? con.recommendedActives.join(', ') : '',
      contraindications: con.contraindications ? con.contraindications.join(', ') : '',
      doctorTips: con.doctorTips || ''
    });
    setShowConcernModal(true);
  };

  const handleConcernSubmit = (e) => {
    e.preventDefault();
    const activesArr = concernForm.recommendedActives.split(',').map(s => s.trim()).filter(Boolean);
    const contraArr = concernForm.contraindications.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: concernForm.name,
      slug: concernForm.slug || concernForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDesc: concernForm.shortDesc,
      clinicalBackground: concernForm.clinicalBackground,
      heroImage: concernForm.heroImage,
      recommendedActives: activesArr,
      contraindications: contraArr,
      doctorTips: concernForm.doctorTips
    };

    if (editingConcernId) {
      updateConcern(editingConcernId, payload);
    } else {
      addConcern(payload);
    }
    setShowConcernModal(false);
    setEditingConcernId(null);
  };

  // ==========================================
  // HANDLERS: INGREDIENTS
  // ==========================================
  const handleEditIngredientClick = (ing) => {
    setEditingIngredientId(ing.id);
    setIngredientForm({
      name: ing.name,
      category: ing.category,
      ewgScore: ing.ewgScore,
      optimalPh: ing.optimalPh,
      molecularWeight: ing.molecularWeight,
      description: ing.description,
      clinicalBenefits: ing.clinicalBenefits ? ing.clinicalBenefits.join('\n') : '',
      synergies: ing.synergies ? ing.synergies.join(', ') : '',
      conflicts: ing.conflicts ? ing.conflicts.join(', ') : '',
      whoShouldUse: ing.whoShouldUse || ''
    });
    setShowIngredientModal(true);
  };

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    const benefitsArr = ingredientForm.clinicalBenefits.split('\n').map(s => s.trim()).filter(Boolean);
    const synArr = ingredientForm.synergies.split(',').map(s => s.trim()).filter(Boolean);
    const confArr = ingredientForm.conflicts.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: ingredientForm.name,
      category: ingredientForm.category,
      ewgScore: ingredientForm.ewgScore,
      optimalPh: ingredientForm.optimalPh,
      molecularWeight: ingredientForm.molecularWeight,
      description: ingredientForm.description,
      clinicalBenefits: benefitsArr,
      synergies: synArr,
      conflicts: confArr,
      whoShouldUse: ingredientForm.whoShouldUse
    };

    if (editingIngredientId) {
      updateIngredient(editingIngredientId, payload);
    } else {
      addIngredient(payload);
    }
    setShowIngredientModal(false);
    setEditingIngredientId(null);
  };

  // ==========================================
  // HANDLERS: CLINICAL TRIALS
  // ==========================================
  const handleEditTrialClick = (trial) => {
    setEditingTrialId(trial.id);
    setTrialForm({
      title: trial.title,
      duration: trial.duration,
      formulation: trial.formulation,
      notes: trial.notes || '',
      beforeImage: trial.beforeImage,
      afterImage: trial.afterImage,
      metric1Label: trial.metrics?.[0]?.label || 'Sebum Output Reduction',
      metric1Value: trial.metrics?.[0]?.value || '43%',
      metric1Inst: trial.metrics?.[0]?.instrument || 'Sebumeter® SM 815',
      metric2Label: trial.metrics?.[1]?.label || 'Redness Reduction',
      metric2Value: trial.metrics?.[1]?.value || '88%',
      metric2Inst: trial.metrics?.[1]?.instrument || 'Mexameter® MX 18',
      metric3Label: trial.metrics?.[2]?.label || 'Barrier Improvement',
      metric3Value: trial.metrics?.[2]?.value || '94%',
      metric3Inst: trial.metrics?.[2]?.instrument || 'Corneometer® CM 825'
    });
    setShowTrialModal(true);
  };

  const handleTrialSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: trialForm.title,
      duration: trialForm.duration,
      formulation: trialForm.formulation,
      notes: trialForm.notes,
      beforeImage: trialForm.beforeImage,
      afterImage: trialForm.afterImage,
      metrics: [
        { label: trialForm.metric1Label, value: trialForm.metric1Value, instrument: trialForm.metric1Inst },
        { label: trialForm.metric2Label, value: trialForm.metric2Value, instrument: trialForm.metric2Inst },
        { label: trialForm.metric3Label, value: trialForm.metric3Value, instrument: trialForm.metric3Inst }
      ]
    };

    if (editingTrialId) {
      updateClinicalTrial(editingTrialId, payload);
    } else {
      addClinicalTrial(payload);
    }
    setShowTrialModal(false);
    setEditingTrialId(null);
  };

  // ==========================================
  // HANDLERS: SITE CONTENT CMS
  // ==========================================
  const handleHeroSave = (e) => {
    e.preventDefault();
    updateSiteContent('hero', heroForm);
  };

  // ==========================================
  // HANDLERS: COUPONS, BLOGS, FAQS, ANNOUNCEMENTS
  // ==========================================
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    addCoupon({
      code: couponCode,
      type: couponType,
      value: Number(couponValue),
      minSpend: Number(couponMinSpend),
      description: couponDesc
    });
    setCouponCode('');
    setShowCouponModal(false);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt) return;
    addBlog({
      title: blogTitle,
      category: blogCategory,
      author: blogAuthor,
      excerpt: blogExcerpt,
      content: blogContent,
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      readTime: '4 min read'
    });
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setShowBlogModal(false);
  };

  const handleFAQSubmit = (e) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;
    addFAQ({
      question: faqQuestion,
      answer: faqAnswer,
      category: faqCategory
    });
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleAnnouncementSave = (e) => {
    e.preventDefault();
    setAnnouncement({
      text: announcementText,
      link: announcementLink,
      enabled: announcementEnabled
    });
    showToast('Top announcement banner updated live!');
  };

  // Filtered queries
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase() === orderFilter.toLowerCase();
  });

  const filteredInquiries = inquiries.filter(i => {
    if (inquiryFilter === 'all') return true;
    if (inquiryFilter === 'pending') return i.status === 'New' || i.status === 'Pending Contact';
    return i.type === inquiryFilter;
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
              AESTHEDERM ADMIN & CMS ENGINE
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#6C5B8B', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>
              Dynamic Content, Catalog & Fulfillment Hub
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

      {/* Main Admin Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        minHeight: 'calc(100vh - 4.5rem)'
      }}>
        {/* Sidebar Tabs */}
        <aside style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <LayoutDashboard size={17} /> },
            { id: 'content', label: 'Site Content & Hero', icon: <SlidersHorizontal size={17} /> },
            { id: 'products', label: `Formulations (${products.length})`, icon: <Package size={17} /> },
            { id: 'concerns', label: `Skin Concerns (${concerns.length})`, icon: <ShieldCheck size={17} /> },
            { id: 'ingredients', label: `Ingredients (${ingredients.length})`, icon: <Sparkles size={17} /> },
            { id: 'trials', label: `Clinical Trials (${clinicalTrials.length})`, icon: <FlaskConical size={17} /> },
            { id: 'inquiries', label: `Inquiries (${pendingInquiriesCount} new)`, icon: <Mail size={17} /> },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag size={17} /> },
            { id: 'coupons', label: `Promo Codes (${coupons.length})`, icon: <Tag size={17} /> },
            { id: 'editorial', label: 'Journal & FAQs', icon: <FileText size={17} /> },
            { id: 'settings', label: 'Announcement Bar', icon: <Megaphone size={17} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'var(--bg-lavender)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.id ? '800' : '600',
                fontSize: '0.86rem',
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
                  Real-time transaction revenue, active orders, customer inquiries, and catalog health.
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Total Orders Fulfilled</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{totalOrdersCount}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6C5B8B', fontWeight: '700', marginTop: '0.35rem' }}>Avg. Ticket: ₹{avgOrderValue}</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Customer Inquiries & Leads</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: pendingInquiriesCount > 0 ? '#C28E46' : 'var(--text-primary)', marginTop: '0.25rem' }}>{inquiries.length}</div>
                  <div style={{ fontSize: '0.75rem', color: pendingInquiriesCount > 0 ? '#C28E46' : '#438E75', fontWeight: '700', marginTop: '0.35rem' }}>
                    {pendingInquiriesCount} Require Action
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Active Formulations</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{products.length}</div>
                  <div style={{ fontSize: '0.75rem', color: lowStockCount > 0 ? '#D96B7D' : '#438E75', fontWeight: '700', marginTop: '0.35rem' }}>
                    {lowStockCount > 0 ? `${lowStockCount} Low stock alerts` : 'All Stock Healthy'}
                  </div>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                marginBottom: '2.5rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem' }}>Instant CMS Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setActiveTab('content')} className="btn btn-secondary btn-sm">
                    <SlidersHorizontal size={14} /> Edit Homepage Hero & Copy
                  </button>
                  <button onClick={() => { setEditingProductId(null); setShowProductModal(true); }} className="btn btn-primary btn-sm">
                    <Plus size={14} /> Add New Formulation
                  </button>
                  <button onClick={() => setActiveTab('inquiries')} className="btn btn-secondary btn-sm">
                    <Mail size={14} /> View Inquiries Inbox ({pendingInquiriesCount})
                  </button>
                  <button onClick={() => setActiveTab('concerns')} className="btn btn-secondary btn-sm">
                    <ShieldCheck size={14} /> Manage Skin Concerns
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SITE CONTENT CMS (HERO & MARKETING) */}
          {activeTab === 'content' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Homepage Content & Hero CMS
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Update headline copy, subtitles, CTAs, badge labels, and imagery dynamically without modifying code.
                  </p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: 'var(--shadow-sm)',
                maxWidth: '900px'
              }}>
                <form onSubmit={handleHeroSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    1. Hero Section Content
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Top Eyebrow Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={heroForm.eyebrow}
                      onChange={e => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Title Line 1 (Bold Serif)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.titleLine1}
                        onChange={e => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Title Line 2 (Italic Serif)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.titleLine2}
                        onChange={e => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Supporting Brand Subtitle</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={heroForm.description}
                      onChange={e => setHeroForm({ ...heroForm, description: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Primary CTA Button Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.primaryCtaText}
                        onChange={e => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Primary CTA Destination Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.primaryCtaLink}
                        onChange={e => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Secondary CTA Button Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.secondaryCtaText}
                        onChange={e => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Secondary CTA Destination Link</label>
                      <input
                        type="text"
                        className="form-control"
                        value={heroForm.secondaryCtaLink}
                        onChange={e => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Floating Glass Badge Text</label>
                    <input
                      type="text"
                      className="form-control"
                      value={heroForm.badgeText}
                      onChange={e => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                    />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '1rem 0 0 0', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                    2. Hero Trio Product Composition Images
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Left Serum Bottle URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={heroForm.leftProductImage}
                        onChange={e => setHeroForm({ ...heroForm, leftProductImage: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Center Main Hero Bottle URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={heroForm.centerProductImage}
                        onChange={e => setHeroForm({ ...heroForm, centerProductImage: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Right Cream Jar URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={heroForm.rightProductImage}
                        onChange={e => setHeroForm({ ...heroForm, rightProductImage: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '1rem', width: 'fit-content' }}>
                    <Check size={16} /> Save & Publish Live Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Formulations Catalog
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Manage pharmaceutical actives, price tiers, stock, INCI formulas, and volumes.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search formulas..."
                      className="form-control"
                      style={{ paddingLeft: '2.4rem', width: '240px' }}
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => { setEditingProductId(null); setShowProductModal(true); }}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Add Formulation
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-lavender)', borderBottom: '1px solid rgba(23, 33, 58, 0.08)' }}>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Product</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Category</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Active Molecule</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Pricing</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Inventory</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.06)' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={p.heroImage} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                            <div>
                              <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{p.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.sizes ? p.sizes.join(' / ') : 'Standard'}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>{p.category}</span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span style={{ fontWeight: '600', color: '#6C5B8B' }}>{p.activeIngredients?.[0]?.name || 'Active Bio-Complex'}</span>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.activeIngredients?.[0]?.percentage || 'Clinical Potency'}</div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ fontWeight: '700' }}>₹{p.salePrice || p.price}</div>
                          {p.salePrice && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{p.price}</div>}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: (p.stock || 50) < 30 ? '#FDF2F4' : '#F0F9F5',
                            color: (p.stock || 50) < 30 ? '#D96B7D' : '#438E75'
                          }}>
                            {p.stock || 50} units
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleEditProductClick(p)}
                              style={{ background: 'none', border: 'none', color: '#6C5B8B', cursor: 'pointer', padding: '0.35rem' }}
                              title="Edit Formulation"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer', padding: '0.35rem' }}
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

          {/* TAB 4: SKIN CONCERNS CMS */}
          {activeTab === 'concerns' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Skin Concerns Protocols
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Manage clinical background, recommended actives, contraindications, and routine protocols.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingConcernId(null); setConcernForm({ name: '', slug: '', shortDesc: '', clinicalBackground: '', heroImage: '', recommendedActives: '', contraindications: '', doctorTips: '' }); setShowConcernModal(true); }}
                  className="btn btn-primary"
                >
                  <Plus size={16} /> Add Skin Concern
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {concerns.map(c => (
                  <div key={c.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>/{c.slug}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => handleEditConcernClick(c)} style={{ background: 'none', border: 'none', color: '#6C5B8B', cursor: 'pointer' }}><Edit size={16} /></button>
                        <button onClick={() => deleteConcern(c.id)} style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {c.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
                      {c.shortDesc || c.description}
                    </p>

                    <div style={{ fontSize: '0.78rem', color: '#6C5B8B', fontWeight: '700', marginBottom: '0.25rem' }}>Recommended Actives:</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      {c.recommendedActives ? c.recommendedActives.join(' • ') : 'Niacinamide, BHA'}
                    </div>

                    <Link to={`/concerns/${c.slug}`} style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      View Live Protocol Page <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INGREDIENTS LIBRARY */}
          {activeTab === 'ingredients' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Active Ingredients Library
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Manage molecular profiles, EWG safety rankings, pH ranges, molecular weights, and synergies.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingIngredientId(null); setIngredientForm({ name: '', category: 'Barrier & Sebum Modulator', ewgScore: '1 (Ultra-Safe)', optimalPh: '5.0 - 6.5', molecularWeight: '122.12 g/mol', description: '', clinicalBenefits: '', synergies: '', conflicts: '', whoShouldUse: '' }); setShowIngredientModal(true); }}
                  className="btn btn-primary"
                >
                  <Plus size={16} /> Add Ingredient Molecule
                </button>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid rgba(23, 33, 58, 0.08)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-lavender)', borderBottom: '1px solid rgba(23, 33, 58, 0.08)' }}>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Active Molecule</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Category</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>EWG Score</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Optimal pH</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700' }}>Molecular Weight</th>
                      <th style={{ padding: '1rem 1.25rem', fontWeight: '700', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map(ing => (
                      <tr key={ing.id} style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.06)' }}>
                        <td style={{ padding: '1rem 1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {ing.name}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>{ing.category}</span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', color: '#438E75', fontWeight: '700' }}>
                          {ing.ewgScore}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          {ing.optimalPh}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {ing.molecularWeight}
                        </td>
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => handleEditIngredientClick(ing)} style={{ background: 'none', border: 'none', color: '#6C5B8B', cursor: 'pointer' }}><Edit size={16} /></button>
                            <button onClick={() => deleteIngredient(ing.id)} style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer' }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CLINICAL TRIALS CMS */}
          {activeTab === 'trials' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Clinical Trials & Efficacy Studies
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Manage in-vivo study parameters, Sebumeter & Corneometer instrument metrics, and before/after photos.
                  </p>
                </div>

                <button
                  onClick={() => { setEditingTrialId(null); setTrialForm({ title: '', duration: '', formulation: '', notes: '', beforeImage: '', afterImage: '', metric1Label: '', metric1Value: '', metric1Inst: '', metric2Label: '', metric2Value: '', metric2Inst: '', metric3Label: '', metric3Value: '', metric3Inst: '' }); setShowTrialModal(true); }}
                  className="btn btn-primary"
                >
                  <Plus size={16} /> Add Clinical Study
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {clinicalTrials.map(t => (
                  <div key={t.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>{t.duration}</span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => handleEditTrialClick(t)} style={{ background: 'none', border: 'none', color: '#6C5B8B', cursor: 'pointer' }}><Edit size={16} /></button>
                        <button onClick={() => deleteClinicalTrial(t.id)} style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {t.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#6C5B8B', fontWeight: '700', marginBottom: '0.75rem' }}>
                      Formulation: {t.formulation}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                      {(t.metrics || []).map((m, idx) => (
                        <div key={idx} style={{ backgroundColor: 'var(--bg-lavender)', padding: '0.6rem 0.4rem', borderRadius: '6px' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{m.value}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', height: '100px' }}>
                      <img src={t.beforeImage} alt="Before" style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                      <img src={t.afterImage} alt="After" style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INQUIRIES & LEADS INBOX */}
          {activeTab === 'inquiries' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Customer Inquiries & Clinic Wholesale Applications
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Inbound messages from the Contact Desk and Clinic Backbar partnership requests.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['all', 'pending', 'wholesale', 'general'].map(f => (
                    <button
                      key={f}
                      onClick={() => setInquiryFilter(f)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        border: inquiryFilter === f ? '1px solid var(--accent-navy)' : '1px solid #CBD5E1',
                        backgroundColor: inquiryFilter === f ? 'var(--accent-navy)' : '#FFFFFF',
                        color: inquiryFilter === f ? '#FFFFFF' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredInquiries.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                    No inquiries found under the selected filter.
                  </div>
                ) : (
                  filteredInquiries.map(inq => (
                    <div
                      key={inq.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        border: '1px solid rgba(23, 33, 58, 0.08)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span className={`badge ${inq.type === 'wholesale' ? 'badge-lavender' : 'badge-teal'}`} style={{ fontSize: '0.72rem' }}>
                            {inq.type === 'wholesale' ? 'Clinic / Wholesale Partner' : 'General Care Inquiry'}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {new Date(inq.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              border: '1px solid #CBD5E1',
                              backgroundColor: inq.status === 'Resolved' || inq.status === 'Replied' ? '#F0F9F5' : '#FFFBEB',
                              color: inq.status === 'Resolved' || inq.status === 'Replied' ? '#438E75' : '#C28E46'
                            }}
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Pending Contact">Pending Contact</option>
                            <option value="Replied">Replied</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer' }}
                            title="Remove inquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {inq.name} {inq.clinic && <span style={{ fontWeight: '400', color: 'var(--text-secondary)' }}>({inq.clinic} - {inq.role})</span>}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#6C5B8B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Mail size={14} /> {inq.email}
                        </div>
                        {inq.phone && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Phone size={14} /> {inq.phone}
                          </div>
                        )}
                        {inq.location && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <MapPin size={14} /> {inq.location}
                          </div>
                        )}
                      </div>

                      <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                        {inq.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 8: ORDERS & FULFILLMENT LOGISTICS */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Orders & Medical Dispatch
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Update live order stages from formulation batching to doorstep delivery.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['all', 'processing', 'in transit', 'delivered'].map(f => (
                    <button
                      key={f}
                      onClick={() => setOrderFilter(f)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        border: orderFilter === f ? '1px solid var(--accent-navy)' : '1px solid #CBD5E1',
                        backgroundColor: orderFilter === f ? 'var(--accent-navy)' : '#FFFFFF',
                        color: orderFilter === f ? '#FFFFFF' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredOrders.map(o => (
                  <div key={o.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.75rem', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{o.id}</span>
                        <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>AWB: {o.trackingNumber}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700' }}>Change Status:</span>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            border: '1px solid #CBD5E1',
                            backgroundColor: o.status === 'Delivered' ? '#F0F9F5' : '#EDEAF4'
                          }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Customer</div>
                        <div style={{ fontWeight: '700' }}>{o.customer?.name}</div>
                        <div style={{ color: 'var(--text-secondary)' }}>{o.customer?.city}, {o.customer?.state}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Amount</div>
                        <div style={{ fontWeight: '800', color: 'var(--text-primary)', fontSize: '1.05rem' }}>₹{o.total}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{o.paymentMethod}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Formulations</div>
                        <div style={{ fontWeight: '600' }}>{(o.items || []).map(i => `${i.product.name} (${i.quantity})`).join(', ')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PROMO CODES & COUPONS */}
          {activeTab === 'coupons' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Promotion Codes & Discounts
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Create percentage and fixed value promo codes with minimum basket requirements.
                  </p>
                </div>

                <button onClick={() => setShowCouponModal(true)} className="btn btn-primary">
                  <Plus size={16} /> Create Promo Code
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {coupons.map(c => (
                  <div key={c.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>{c.code}</span>
                      <button onClick={() => toggleCoupon(c.id)} style={{ padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: '700', border: 'none', cursor: 'pointer', backgroundColor: c.active ? '#F0F9F5' : '#FDF2F4', color: c.active ? '#438E75' : '#D96B7D' }}>
                        {c.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#6C5B8B', marginBottom: '0.25rem' }}>
                      {c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`} (Min spend: ₹{c.minSpend})
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{c.description}</p>
                    <button onClick={() => deleteCoupon(c.id)} style={{ color: '#D96B7D', background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}>
                      Delete Promo Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: EDITORIAL & FAQS */}
          {activeTab === 'editorial' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Clinical Journal Articles & FAQs
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Publish peer-reviewed blog articles and update customer questions.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setShowBlogModal(true)} className="btn btn-primary">
                    <Plus size={16} /> New Article
                  </button>
                </div>
              </div>

              {/* Blogs Grid */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Published Journal Entries ({blogs.length})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                {blogs.map(b => (
                  <div key={b.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid rgba(23, 33, 58, 0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="badge badge-lavender" style={{ fontSize: '0.68rem' }}>{b.category}</span>
                      <button onClick={() => deleteBlog(b.id)} style={{ color: '#D96B7D', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={15} /></button>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.4rem 0', fontWeight: '700' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{b.excerpt}</p>
                  </div>
                ))}
              </div>

              {/* FAQs Section */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Frequently Asked Questions ({faqs.length})</h3>
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <form onSubmit={handleFAQSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <input type="text" placeholder="Question..." className="form-control" value={faqQuestion} onChange={e => setFaqQuestion(e.target.value)} required />
                    <input type="text" placeholder="Category" className="form-control" value={faqCategory} onChange={e => setFaqCategory(e.target.value)} />
                  </div>
                  <textarea placeholder="Clinical answer..." className="form-control" rows="2" value={faqAnswer} onChange={e => setFaqAnswer(e.target.value)} required />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }}>Add FAQ Item</button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 11: ANNOUNCEMENT BAR SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                  Top Announcement Ribbon
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Edit the floating top bar message shown across the live store.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '2rem', border: '1px solid rgba(23, 33, 58, 0.08)', maxWidth: '680px' }}>
                <form onSubmit={handleAnnouncementSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Announcement Text</label>
                    <textarea className="form-control" rows="3" value={announcementText} onChange={e => setAnnouncementText(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Link</label>
                    <input type="text" className="form-control" value={announcementLink} onChange={e => setAnnouncementLink(e.target.value)} />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={announcementEnabled} onChange={e => setAnnouncementEnabled(e.target.checked)} />
                    <span>Display announcement ribbon publicly</span>
                  </label>
                  <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                    Save Announcement
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==========================================
          MODALS
      ========================================== */}

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {editingProductId ? 'Edit Formulation' : 'Add New Clinical Formulation'}
              </h3>
              <button onClick={() => setShowProductModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input type="text" className="form-control" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                    <option value="Serums & Treatments">Serums & Treatments</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Moisturizers & Creams">Moisturizers & Creams</option>
                    <option value="Sun Protection">Sun Protection</option>
                    <option value="Exfoliants & Toners">Exfoliants & Toners</option>
                    <option value="Eye Care">Eye Care</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Skin Concern</label>
                  <select className="form-control" value={productForm.primaryConcern} onChange={e => setProductForm({ ...productForm, primaryConcern: e.target.value })}>
                    <option value="Acne & Blemishes">Acne & Blemishes</option>
                    <option value="Hyperpigmentation">Hyperpigmentation</option>
                    <option value="Damaged Barrier">Damaged Barrier</option>
                    <option value="Aging & Fine Lines">Aging & Fine Lines</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Original Price (₹)</label>
                  <input type="number" className="form-control" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Sale Price (₹)</label>
                  <input type="number" className="form-control" value={productForm.salePrice} onChange={e => setProductForm({ ...productForm, salePrice: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock Units</label>
                  <input type="number" className="form-control" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hero Image URL</label>
                <input type="url" className="form-control" value={productForm.heroImage} onChange={e => setProductForm({ ...productForm, heroImage: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Active Ingredient Molecule</label>
                  <input type="text" className="form-control" value={productForm.activeName} onChange={e => setProductForm({ ...productForm, activeName: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Percentage</label>
                  <input type="text" className="form-control" value={productForm.activePercent} onChange={e => setProductForm({ ...productForm, activePercent: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full INCI Ingredient List</label>
                <textarea className="form-control" rows="2" value={productForm.fullInci} onChange={e => setProductForm({ ...productForm, fullInci: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Formulation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONCERN MODAL */}
      {showConcernModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {editingConcernId ? 'Edit Skin Concern' : 'Add New Skin Concern'}
              </h3>
              <button onClick={() => setShowConcernModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleConcernSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Concern Name</label>
                <input type="text" className="form-control" value={concernForm.name} onChange={e => setConcernForm({ ...concernForm, name: e.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea className="form-control" rows="2" value={concernForm.shortDesc} onChange={e => setConcernForm({ ...concernForm, shortDesc: e.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label">Clinical Background (Pathology)</label>
                <textarea className="form-control" rows="3" value={concernForm.clinicalBackground} onChange={e => setConcernForm({ ...concernForm, clinicalBackground: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Recommended Actives (Comma separated)</label>
                <input type="text" className="form-control" value={concernForm.recommendedActives} onChange={e => setConcernForm({ ...concernForm, recommendedActives: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowConcernModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Concern</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INGREDIENT MODAL */}
      {showIngredientModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {editingIngredientId ? 'Edit Ingredient Molecule' : 'Add New Active Molecule'}
              </h3>
              <button onClick={() => setShowIngredientModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleIngredientSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Molecule Name (INCI)</label>
                <input type="text" className="form-control" value={ingredientForm.name} onChange={e => setIngredientForm({ ...ingredientForm, name: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Optimal pH</label>
                  <input type="text" className="form-control" value={ingredientForm.optimalPh} onChange={e => setIngredientForm({ ...ingredientForm, optimalPh: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Molecular Weight</label>
                  <input type="text" className="form-control" value={ingredientForm.molecularWeight} onChange={e => setIngredientForm({ ...ingredientForm, molecularWeight: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Clinical Benefits (1 per line)</label>
                <textarea className="form-control" rows="3" value={ingredientForm.clinicalBenefits} onChange={e => setIngredientForm({ ...ingredientForm, clinicalBenefits: e.target.value })} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowIngredientModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Molecule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLINICAL TRIAL MODAL */}
      {showTrialModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {editingTrialId ? 'Edit Clinical Study' : 'Publish Clinical Trial Study'}
              </h3>
              <button onClick={() => setShowTrialModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleTrialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Trial Title</label>
                <input type="text" className="form-control" value={trialForm.title} onChange={e => setTrialForm({ ...trialForm, title: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration & Cohort</label>
                  <input type="text" className="form-control" value={trialForm.duration} onChange={e => setTrialForm({ ...trialForm, duration: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Formulation Tested</label>
                  <input type="text" className="form-control" value={trialForm.formulation} onChange={e => setTrialForm({ ...trialForm, formulation: e.target.value })} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Before Image URL</label>
                  <input type="url" className="form-control" value={trialForm.beforeImage} onChange={e => setTrialForm({ ...trialForm, beforeImage: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">After Image URL</label>
                  <input type="url" className="form-control" value={trialForm.afterImage} onChange={e => setTrialForm({ ...trialForm, afterImage: e.target.value })} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Metric (Label, Value, Instrument)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: '0.5rem' }}>
                  <input type="text" placeholder="Label" className="form-control" value={trialForm.metric1Label} onChange={e => setTrialForm({ ...trialForm, metric1Label: e.target.value })} />
                  <input type="text" placeholder="Value" className="form-control" value={trialForm.metric1Value} onChange={e => setTrialForm({ ...trialForm, metric1Value: e.target.value })} />
                  <input type="text" placeholder="Instrument" className="form-control" value={trialForm.metric1Inst} onChange={e => setTrialForm({ ...trialForm, metric1Inst: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowTrialModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Trial Dataset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COUPON MODAL */}
      {showCouponModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Create Promo Code</h3>
              <button onClick={() => setShowCouponModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCouponSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Promo Code</label>
                <input type="text" placeholder="e.g. DERMA20" className="form-control" value={couponCode} onChange={e => setCouponCode(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Discount Type</label>
                  <select className="form-control" value={couponType} onChange={e => setCouponType(e.target.value)}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Value</label>
                  <input type="number" className="form-control" value={couponValue} onChange={e => setCouponValue(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Minimum Order Spend (₹)</label>
                <input type="number" className="form-control" value={couponMinSpend} onChange={e => setCouponMinSpend(e.target.value)} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowCouponModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Activate Coupon</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {showBlogModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '640px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Publish Journal Article</h3>
              <button onClick={() => setShowBlogModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Article Title</label>
                <input type="text" className="form-control" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-control" value={blogCategory} onChange={e => setBlogCategory(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-control" value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Summary Excerpt</label>
                <textarea className="form-control" rows="2" value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)} required />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowBlogModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Editorial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

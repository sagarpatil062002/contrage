import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import CustomSelect from '../components/common/CustomSelect';
import confetti from 'canvas-confetti';
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
  EyeOff,
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
  SlidersHorizontal,
  Download,
  Stethoscope,
  Send,
  FileSpreadsheet,
  Menu,
  Lock,
  LogOut,
  KeyRound,
  ShieldAlert,
  Shield
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    user,
    adminLogin,
    adminVerify2FA,
    adminLogout,
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
    marketingLeads = [],
    deleteMarketingLead,
    dermatologistInquiries = [],
    updateDermatologistInquiryStatus,
    deleteDermatologistInquiry,
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

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'concerns' | 'ingredients' | 'trials' | 'content' | 'inquiries' | 'leads' | 'b2b' | 'orders' | 'coupons' | 'editorial' | 'settings'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // HIGH-SECURITY CLINICAL ADMIN AUTH STATE
  // ==========================================
  const [adminEmail, setAdminEmail] = useState('admin@contrage.com');
  const [adminPassword, setAdminPassword] = useState('Admin@ContrAge2026');
  const [showPassword, setShowPassword] = useState(false);
  const [adminAuthStep, setAdminAuthStep] = useState('credentials'); // 'credentials' | '2fa'
  const [twoFactorDigits, setTwoFactorDigits] = useState(['', '', '', '', '', '']);
  const [temp2faToken, setTemp2faToken] = useState('');
  const [test2FACode, setTest2FACode] = useState('889900');
  const [maskedPhone, setMaskedPhone] = useState('+91 98*** ***00');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Resend Countdown
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Handle Step 1: Admin Credentials Verification
  const handleCredentialsSubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAuthError('Please enter both administrator email and password.');
      return;
    }

    setIsAuthLoading(true);
    const res = await adminLogin({ email: adminEmail.trim(), password: adminPassword.trim() });
    setIsAuthLoading(false);

    if (res?.success && res?.data?.requires2FA) {
      setTemp2faToken(res.data.tempToken);
      setTest2FACode(res.data.test2FACode || '889900');
      setMaskedPhone(res.data.adminPhone || '+91 98*** ***00');
      setAdminAuthStep('2fa');
      setResendCountdown(60);
      setTwoFactorDigits((res.data.test2FACode || '889900').split(''));
      showToast('Credentials approved. 2FA Security Code required.', 'info');
    } else if (!res?.success) {
      setAuthError(res?.message || 'Invalid administrator credentials.');
    }
  };

  // Handle 2FA digit box input
  const handle2FADigitChange = (index, val) => {
    const cleanVal = val.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...twoFactorDigits];
    newDigits[index] = cleanVal;
    setTwoFactorDigits(newDigits);

    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`admin-2fa-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle 2FA backspace
  const handle2FADigitKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !twoFactorDigits[index] && index > 0) {
      const prevInput = document.getElementById(`admin-2fa-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Step 2: 2FA Verification & Establish Session
  const handle2FASubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    const fullCode = twoFactorDigits.join('').trim() || test2FACode || '889900';
    if (fullCode.length !== 6) {
      setAuthError('Please enter all 6 digits of the Two-Factor Authorization Key.');
      return;
    }

    setIsAuthLoading(true);
    const res = await adminVerify2FA({ tempToken: temp2faToken, code: fullCode });
    setIsAuthLoading(false);

    if (res?.success) {
      try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 } }); } catch (err) {}
      showToast('Admin Identity Verified: Welcome to ContrÂge Medical CMS', 'success');
    } else {
      setAuthError(res?.message || 'Invalid or expired 2FA code.');
    }
  };

  // ==========================================
  // CSV / EXCEL EXPORT HELPERS (TEAM OPS)
  // ==========================================
  const downloadCSV = (filename, csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filename} successfully!`);
  };

  const exportOrdersCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Email', 'Phone', 'Address', 'City', 'State', 'Pincode', 'Courier', 'Tracking AWB', 'Payment Method', 'Subtotal', 'Discount', 'Shipping', 'Total', 'Status', 'Items'];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${new Date(o.date).toLocaleDateString('en-IN')}"`,
      `"${o.customer?.name || ''}"`,
      `"${o.customer?.email || ''}"`,
      `"${o.customer?.phone || ''}"`,
      `"${(o.customer?.address || '').replace(/"/g, '""')}"`,
      `"${o.customer?.city || ''}"`,
      `"${o.customer?.state || ''}"`,
      `"${o.customer?.pincode || ''}"`,
      `"${o.courier || 'Delhivery Express'}"`,
      `"${o.trackingNumber || ''}"`,
      `"${o.paymentMethod || ''}"`,
      o.subtotal || 0,
      o.discount || 0,
      o.shippingFee || 0,
      o.total || 0,
      `"${o.status || 'Processing'}"`,
      `"${(o.items || []).map(i => `${i.product?.name || 'Item'} (x${i.quantity}, ${i.selectedSize || ''})`).join('; ')}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`Contrage_Orders_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const exportProductsCSV = () => {
    const headers = ['ID', 'SKU / Slug', 'Product Name', 'Category', 'Primary Concern', 'MRP Price', 'Sale Price', 'Stock', 'Sizes', 'Active Ingredients'];
    const rows = products.map(p => [
      `"${p.id}"`,
      `"${p.slug}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.primaryConcern}"`,
      p.price,
      p.salePrice,
      p.stock,
      `"${(p.sizes || []).join('; ')}"`,
      `"${(p.activeIngredients || []).map(a => `${a.name} ${a.percentage}`).join('; ')}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`Contrage_Catalog_Inventory_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const exportMarketingLeadsCSV = () => {
    const headers = ['Lead ID', 'Name', 'Email', 'Phone / WhatsApp', 'Skin Concern', 'Skin Type', 'WhatsApp Optin', 'Email Optin', 'SMS Optin', 'Coupon Generated', 'Source', 'Captured Date'];
    const rows = marketingLeads.map(l => [
      `"${l.id}"`,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.skinConcern || ''}"`,
      `"${l.skinType || ''}"`,
      l.channels?.whatsapp ? 'YES' : 'NO',
      l.channels?.email ? 'YES' : 'NO',
      l.channels?.sms ? 'YES' : 'NO',
      `"${l.couponGenerated || 'CONTRAGE10'}"`,
      `"${l.source || 'Storefront'}"`,
      `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`Contrage_Marketing_Leads_CRM_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  const exportDermatologistInquiriesCSV = () => {
    const headers = ['Inquiry ID', 'Doctor Name', 'Clinic / Hospital', 'Medical License', 'GSTIN', 'Email', 'Phone / WhatsApp', 'City', 'State', 'Monthly Units', 'Selected Tier', 'Preferred Products', 'Notes', 'Status', 'Date'];
    const rows = dermatologistInquiries.map(b => [
      `"${b.id}"`,
      `"${b.doctorName}"`,
      `"${b.clinicName}"`,
      `"${b.licenseNumber || 'N/A'}"`,
      `"${b.gstin || 'N/A'}"`,
      `"${b.email}"`,
      `"${b.phone}"`,
      `"${b.city || ''}"`,
      `"${b.state || ''}"`,
      `"${b.estimatedMonthlyUnits || ''}"`,
      `"${b.selectedTier || ''}"`,
      `"${(b.preferredProducts || []).join('; ')}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
      `"${b.status || 'Pending Review'}"`,
      `"${new Date(b.date).toLocaleDateString('en-IN')}"`
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(`Contrage_Dermatologist_B2B_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

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
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
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
    centerProductImage: siteContent?.hero?.centerProductImage || 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
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

  const adminTabs = [
    { id: 'overview', label: 'Overview & Reports', icon: <LayoutDashboard size={17} /> },
    { id: 'content', label: 'Site Content & Hero', icon: <SlidersHorizontal size={17} /> },
    { id: 'products', label: `Formulations (${products.length})`, icon: <Package size={17} /> },
    { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag size={17} /> },
    { id: 'leads', label: `Marketing Leads (${marketingLeads.length})`, icon: <Users size={17} /> },
    { id: 'b2b', label: `Dermatologist B2B (${dermatologistInquiries.length})`, icon: <Stethoscope size={17} /> },
    { id: 'inquiries', label: `Inquiries (${pendingInquiriesCount} new)`, icon: <Mail size={17} /> },
    { id: 'concerns', label: `Skin Concerns (${concerns.length})`, icon: <ShieldCheck size={17} /> },
    { id: 'ingredients', label: `Ingredients (${ingredients.length})`, icon: <Sparkles size={17} /> },
    { id: 'trials', label: `Clinical Trials (${clinicalTrials.length})`, icon: <FlaskConical size={17} /> },
    { id: 'coupons', label: `Promo Codes (${coupons.length})`, icon: <Tag size={17} /> },
    { id: 'editorial', label: 'Journal & FAQs', icon: <FileText size={17} /> },
    { id: 'settings', label: 'Announcement Bar', icon: <Megaphone size={17} /> }
  ];

  // ==========================================
  // HIGH-SECURITY CLINICAL ADMIN GATEWAY
  // ==========================================
  if (!user?.isLoggedIn || user?.role !== 'ADMIN') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 15%, #1E293B 0%, #0F172A 60%, #020617 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        color: '#F8FAFC',
        fontFamily: 'var(--font-sans)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(2, 132, 199, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          padding: '2.5rem 2.25rem'
        }}>
          {/* Header & Lock Emblem */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              backgroundColor: 'rgba(2, 132, 199, 0.15)',
              border: '1px solid rgba(2, 132, 199, 0.4)',
              color: '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.25)'
            }}>
              <Lock size={30} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34D399', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 12px', borderRadius: '999px', marginBottom: '0.75rem' }}>
              <ShieldCheck size={13} /> 256-Bit Cryptographic SSL Portal
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: '#FFFFFF', margin: '0 0 0.35rem 0', letterSpacing: '0.02em' }}>
              CONTRÂGE CLINICAL
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0, lineHeight: '1.4' }}>
              Restricted Medical CMS & Formulation Backbar Operations
            </p>
          </div>

          {/* Security Alert if Error */}
          {authError && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: '#FCA5A5',
              fontSize: '0.85rem'
            }}>
              <ShieldAlert size={18} color="#EF4444" style={{ flexShrink: 0 }} />
              <div>{authError}</div>
            </div>
          )}

          {adminAuthStep === 'credentials' ? (
            /* ====================================================
               STEP 1: ADMIN CREDENTIALS GATEWAY
            ==================================================== */
            <form onSubmit={handleCredentialsSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#E2E8F0', marginBottom: '0.4rem' }}>
                  Administrator Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@contrage.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.6rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                  <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#E2E8F0' }}>
                    Master Security Password *
                  </label>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{
                      width: '100%',
                      padding: '0.85rem 2.6rem 0.85rem 2.6rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                  <KeyRound size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Quick Auto-Fill Demo Credentials Pill */}
              <div style={{ marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setAdminEmail('admin@contrage.com');
                    setAdminPassword('Admin@ContrAge2026');
                    setAuthError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    border: '1px dashed rgba(2, 132, 199, 0.35)',
                    borderRadius: 'var(--radius-xs)',
                    color: '#38BDF8',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Sparkles size={14} /> Auto-Fill Official Admin Credentials
                </button>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  justifyContent: 'center',
                  backgroundColor: '#0284C7',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
                }}
              >
                {isAuthLoading ? 'Authenticating Security...' : 'AUTHENTICATE & PROCEED TO 2FA →'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link to="/" style={{ color: '#94A3B8', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ArrowLeft size={14} /> Return to Public Storefront
                </Link>
              </div>
            </form>
          ) : (
            /* ====================================================
               STEP 2: TWO-FACTOR AUTHENTICATION (2FA) GATE
            ==================================================== */
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{
                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#38BDF8', marginBottom: '0.35rem' }}>
                  2FA Security Key Dispatched
                </div>
                <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                  A 6-digit cryptographic verification key has been sent to authorized administrator channel (<strong>{maskedPhone}</strong>).
                </div>

                {/* Auto-Generated 2FA Code Pill for Verification */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px dashed rgba(56, 189, 248, 0.5)',
                  marginTop: '0.85rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Generated Security Key:</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#38BDF8', letterSpacing: '0.12em' }}>
                      {test2FACode}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTwoFactorDigits(test2FACode.slice(0, 6).split(''))}
                    style={{
                      backgroundColor: '#0284C7',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    Auto-Fill 2FA
                  </button>
                </div>
              </div>

              {/* 6 Digit 2FA Boxes */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`admin-2fa-${idx}`}
                    type="text"
                    maxLength="1"
                    value={twoFactorDigits[idx]}
                    onChange={(e) => handle2FADigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handle2FADigitKeyDown(idx, e)}
                    style={{
                      width: '46px',
                      height: '52px',
                      fontSize: '1.4rem',
                      fontWeight: '800',
                      textAlign: 'center',
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: twoFactorDigits[idx] ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                ))}
              </div>

              {/* Resend 2FA Timer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setAdminAuthStep('credentials')}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Edit Credentials
                </button>
                {resendCountdown > 0 ? (
                  <span>Resend in {resendCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleCredentialsSubmit}
                    style={{ background: 'none', border: 'none', color: '#38BDF8', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Resend 2FA Code
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handle2FASubmit}
                disabled={isAuthLoading}
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  justifyContent: 'center',
                  backgroundColor: '#059669',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)'
                }}
              >
                {isAuthLoading ? 'Verifying Authorization...' : 'AUTHORIZE ADMIN SESSION →'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#0F172A', paddingBottom: '5rem' }}>
      {/* Top Admin Header */}
      <header className="admin-header">
        <div className="admin-header-title-group">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="admin-header-hamburger"
            aria-label="Open Admin Menu"
            title="Open Admin Navigation"
          >
            <Menu size={20} />
          </button>

          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', color: '#0F172A', margin: 0, fontWeight: '800', letterSpacing: '0.02em' }}>
              CONTRÂGE CLINICAL ADMINISTRATION & CMS
            </h1>
            <span className="admin-header-subtitle" style={{ fontSize: '0.72rem', color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '800' }}>
              Cosmeceuticals Catalog • Clinic Inquiries • Delhivery Fulfillment
            </span>
          </div>
        </div>

        <div className="admin-header-actions">
          {/* Active Admin Session Status Badge */}
          <div className="admin-user-badge">
            <span className="admin-user-pulse" />
            <span>Admin: {user?.email || 'admin@contrage.com'}</span>
          </div>

          <div className="admin-buttons-grid">
            <button
              onClick={resetDemoData}
              className="btn btn-sm admin-btn-reset"
              title="Reset catalog demo data to defaults"
            >
              <RotateCcw size={13} style={{ flexShrink: 0 }} />
              <span className="btn-label-desktop">Reset Catalog Seed</span>
              <span className="btn-label-mobile">Reset Seed</span>
            </button>

            <button
              onClick={adminLogout}
              className="btn btn-sm admin-btn-logout"
              title="Securely log out of administration portal"
            >
              <LogOut size={13} style={{ flexShrink: 0 }} />
              <span className="btn-label-desktop">Secure Logout</span>
              <span className="btn-label-mobile">Logout</span>
            </button>

            <Link
              to="/"
              className="btn btn-secondary btn-sm admin-btn-store"
              title="Return to public customer storefront"
            >
              <ArrowLeft size={14} style={{ flexShrink: 0 }} />
              <span className="btn-label-desktop">Storefront</span>
              <span className="btn-label-mobile">Store</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer with Backdrop */}
      {isSidebarOpen && (
        <div className="admin-drawer-backdrop" onClick={() => setIsSidebarOpen(false)}>
          <div className="admin-drawer-panel" onClick={e => e.stopPropagation()}>
            <div className="admin-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#17213A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <Layers size={16} />
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#17213A', fontFamily: 'var(--font-serif)' }}>
                  Admin Navigation
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.25rem' }}
                aria-label="Close Admin Navigation"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="admin-drawer-nav">
              {adminTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsSidebarOpen(false);
                  }}
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
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    width: '100%'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid rgba(23, 33, 58, 0.08)' }}>
              <Link
                to="/"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <ArrowLeft size={14} /> Back to Live Storefront
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Layout */}
      <div className="admin-layout-wrapper">
        {/* Desktop Sticky Sidebar */}
        <aside className="admin-sidebar-desktop">
          {adminTabs.map(tab => (
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
        <main className="admin-main-panel">
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: 'clamp(1rem, 2.5vw, 1.5rem)',
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
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                marginBottom: '2.5rem'
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem' }}>Instant CMS Actions</h3>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setActiveTab('content')} className="btn btn-secondary btn-sm">
                    <SlidersHorizontal size={14} /> Edit Homepage Hero & Copy
                  </button>
                  <button onClick={() => { setEditingProductId(null); setShowProductModal(true); }} className="btn btn-primary btn-sm">
                    <Plus size={14} /> Add New Formulation
                  </button>
                  <button onClick={() => setActiveTab('leads')} className="btn btn-secondary btn-sm">
                    <Users size={14} /> View Marketing Leads ({marketingLeads.length})
                  </button>
                  <button onClick={() => setActiveTab('b2b')} className="btn btn-secondary btn-sm">
                    <Stethoscope size={14} /> View Clinic B2B Leads ({dermatologistInquiries.length})
                  </button>
                  <button onClick={() => setActiveTab('concerns')} className="btn btn-secondary btn-sm">
                    <ShieldCheck size={14} /> Manage Skin Concerns
                  </button>
                </div>
              </div>

              {/* One-Click Excel / CSV Reports Strip (For HR & Ops Team) */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 0.25rem 0' }}>
                      📊 One-Click Excel / CSV Operations Reports
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Download complete, uncompressed spreadsheets for accounting, inventory tracking, courier reconciliations, and CRM marketing campaigns.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                  <button
                    onClick={exportOrdersCSV}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1rem' }}
                  >
                    <Download size={15} color="var(--accent-blue-dark)" /> Export Orders (CSV)
                  </button>

                  <button
                    onClick={exportProductsCSV}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1rem' }}
                  >
                    <Download size={15} color="var(--accent-blue-dark)" /> Export Inventory (CSV)
                  </button>

                  <button
                    onClick={exportMarketingLeadsCSV}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1rem' }}
                  >
                    <Download size={15} color="var(--accent-emerald)" /> Export Leads / CRM (CSV)
                  </button>

                  <button
                    onClick={exportDermatologistInquiriesCSV}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.75rem 1rem' }}
                  >
                    <Download size={15} color="var(--accent-lavender-dark)" /> Export Clinic B2B (CSV)
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
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: 'var(--shadow-sm)',
                width: '100%',
                boxSizing: 'border-box'
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
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

                <div className="admin-search-wrapper">
                  <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search formulas..."
                      className="form-control"
                      style={{ paddingLeft: '2.4rem' }}
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => { setEditingProductId(null); setShowProductModal(true); }}
                    className="btn btn-primary"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Plus size={16} /> Add Formulation
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="admin-table-container">
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '28%', minWidth: '220px' }}>Product</th>
                      <th style={{ width: '20%', minWidth: '160px' }}>Category</th>
                      <th style={{ width: '20%', minWidth: '160px' }}>Active Molecule</th>
                      <th style={{ width: '12%', minWidth: '100px' }}>Pricing</th>
                      <th style={{ width: '12%', minWidth: '100px' }}>Inventory</th>
                      <th style={{ width: '8%', minWidth: '80px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '100%' }}>
                            <img
                              src={p.heroImage}
                              alt={p.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80';
                              }}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #E2E8F0', flexShrink: 0 }}
                            />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div
                                className="table-cell-truncate"
                                style={{ fontWeight: '700', color: 'var(--text-primary)' }}
                                title={p.name}
                              >
                                {p.name}
                              </div>
                              <div
                                className="table-cell-truncate"
                                style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                                title={p.sizes ? p.sizes.join(' / ') : 'Standard'}
                              >
                                {p.sizes ? p.sizes.join(' / ') : 'Standard'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className="badge badge-teal table-cell-truncate"
                            style={{ fontSize: '0.72rem', display: 'inline-block' }}
                            title={p.category}
                          >
                            {p.category}
                          </span>
                        </td>
                        <td>
                          <span
                            className="table-cell-truncate"
                            style={{ fontWeight: '600', color: '#0F172A' }}
                            title={p.activeIngredients?.[0]?.name || 'Active Bio-Complex'}
                          >
                            {p.activeIngredients?.[0]?.name || 'Active Bio-Complex'}
                          </span>
                          <div
                            className="table-cell-truncate"
                            style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}
                            title={p.activeIngredients?.[0]?.percentage || 'Clinical Potency'}
                          >
                            {p.activeIngredients?.[0]?.percentage || 'Clinical Potency'}
                          </div>
                        </td>
                        <td>
                          <div
                            className="table-cell-truncate"
                            style={{ fontWeight: '700', color: 'var(--text-primary)' }}
                            title={`₹${p.salePrice || p.price}`}
                          >
                            ₹{p.salePrice || p.price}
                          </div>
                          {p.salePrice && (
                            <div
                              className="table-cell-truncate"
                              style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}
                              title={`₹${p.price}`}
                            >
                              ₹{p.price}
                            </div>
                          )}
                        </td>
                        <td>
                          <span
                            className="table-cell-truncate"
                            style={{
                              padding: '0.25rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              backgroundColor: (p.stock || 50) < 30 ? '#FDF2F4' : '#F0F9F5',
                              color: (p.stock || 50) < 30 ? '#EF4444' : '#438E75',
                              display: 'inline-block'
                            }}
                            title={`${p.stock || 50} units in stock`}
                          >
                            {p.stock || 50} units
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleEditProductClick(p)}
                              style={{ background: 'none', border: 'none', color: '#0284C7', cursor: 'pointer', padding: '0.35rem' }}
                              title={`Edit ${p.name}`}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.35rem' }}
                              title={`Delete ${p.name}`}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
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

              <div className="admin-table-container">
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '26%', minWidth: '190px' }}>Active Molecule</th>
                      <th style={{ width: '26%', minWidth: '190px' }}>Category</th>
                      <th style={{ width: '16%', minWidth: '120px' }}>EWG Score</th>
                      <th style={{ width: '12%', minWidth: '95px' }}>Optimal pH</th>
                      <th style={{ width: '12%', minWidth: '105px' }}>Molecular Weight</th>
                      <th style={{ width: '8%', minWidth: '70px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map(ing => (
                      <tr key={ing.id}>
                        <td>
                          <div
                            className="table-cell-truncate"
                            style={{ fontWeight: '700', color: 'var(--text-primary)' }}
                            title={ing.name}
                          >
                            {ing.name}
                          </div>
                        </td>
                        <td>
                          <span
                            className="badge badge-teal table-cell-truncate"
                            style={{ fontSize: '0.72rem', display: 'inline-block', textTransform: 'capitalize', letterSpacing: '0.02em' }}
                            title={ing.category}
                          >
                            {ing.category}
                          </span>
                        </td>
                        <td>
                          <span
                            className="table-cell-truncate"
                            style={{
                              padding: '0.25rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: '#F0F9F5',
                              color: '#438E75',
                              fontWeight: '700',
                              fontSize: '0.75rem',
                              display: 'inline-block'
                            }}
                            title={`EWG Safety Score: ${ing.ewgScore}`}
                          >
                            {ing.ewgScore}
                          </span>
                        </td>
                        <td>
                          <span
                            className="table-cell-truncate"
                            style={{ fontWeight: '600', color: 'var(--text-primary)' }}
                            title={`Optimal pH Range: ${ing.optimalPh}`}
                          >
                            {ing.optimalPh}
                          </span>
                        </td>
                        <td>
                          <span
                            className="table-cell-truncate"
                            style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                            title={`Molecular Weight: ${ing.molecularWeight}`}
                          >
                            {ing.molecularWeight}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleEditIngredientClick(ing)}
                              style={{ background: 'none', border: 'none', color: '#0284C7', cursor: 'pointer', padding: '0.35rem' }}
                              title={`Edit ${ing.name}`}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteIngredient(ing.id)}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.35rem' }}
                              title={`Delete ${ing.name}`}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 80px), 1fr))', gap: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                      {(t.metrics || []).map((m, idx) => (
                        <div key={idx} style={{ backgroundColor: 'var(--bg-lavender)', padding: '0.6rem 0.4rem', borderRadius: '6px' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{m.value}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', height: '100px' }}>
                      <img
                        src={t.beforeImage}
                        alt="Before"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
                        }}
                        style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <img
                        src={t.afterImage}
                        alt="After"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';
                        }}
                        style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                      />
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

                <div className="admin-filter-scroll">
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
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
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

          {/* TAB 7: MARKETING LEADS & CRM OPT-INS */}
          {activeTab === 'leads' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Marketing Leads & Omnichannel CRM
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Customer subscribers captured across Storefront Popups, WhatsApp VIP Club, and Skin Diagnostic Quiz.
                  </p>
                </div>

                <button
                  onClick={exportMarketingLeadsCSV}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={15} /> Export Leads (CSV)
                </button>
              </div>

              <div className="admin-table-container">
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '20%', minWidth: '160px' }}>Name & Date</th>
                      <th style={{ width: '24%', minWidth: '180px' }}>Email & WhatsApp</th>
                      <th style={{ width: '20%', minWidth: '160px' }}>Primary Concern</th>
                      <th style={{ width: '18%', minWidth: '140px' }}>Channels Opted In</th>
                      <th style={{ width: '12%', minWidth: '100px' }}>Coupon Issued</th>
                      <th style={{ width: '6%', minWidth: '60px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketingLeads.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No marketing leads captured yet.
                        </td>
                      </tr>
                    ) : (
                      marketingLeads.map(l => (
                        <tr key={l.id}>
                          <td>
                            <div
                              className="table-cell-truncate"
                              style={{ fontWeight: '700', color: 'var(--text-primary)' }}
                              title={l.name}
                            >
                              {l.name}
                            </div>
                            <div
                              className="table-cell-truncate"
                              style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}
                              title={`${new Date(l.createdAt).toLocaleDateString('en-IN')} • ${l.source || 'Popup'}`}
                            >
                              {new Date(l.createdAt).toLocaleDateString('en-IN')} • {l.source || 'Popup'}
                            </div>
                          </td>
                          <td>
                            <div
                              className="table-cell-truncate"
                              style={{ color: 'var(--text-primary)', fontWeight: '500' }}
                              title={l.email}
                            >
                              {l.email}
                            </div>
                            <div
                              className="table-cell-truncate"
                              style={{ fontSize: '0.78rem', color: '#0284C7', fontWeight: '600' }}
                              title={l.phone || 'No phone provided'}
                            >
                              {l.phone || '—'}
                            </div>
                          </td>
                          <td>
                            <span
                              className="badge badge-teal table-cell-truncate"
                              style={{ fontSize: '0.72rem', display: 'inline-block' }}
                              title={l.skinConcern || 'General Skincare'}
                            >
                              {l.skinConcern || 'General Skincare'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                              {l.channels?.whatsapp && (
                                <span
                                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#EFF8F4', color: '#438E75', borderRadius: '4px', fontWeight: '700', whiteSpace: 'nowrap' }}
                                  title="Subscribed to WhatsApp updates"
                                >
                                  WhatsApp
                                </span>
                              )}
                              {l.channels?.email && (
                                <span
                                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#E5EBF5', color: '#3B5D92', borderRadius: '4px', fontWeight: '700', whiteSpace: 'nowrap' }}
                                  title="Subscribed to Email newsletter"
                                >
                                  Email
                                </span>
                              )}
                              {l.channels?.sms && (
                                <span
                                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: '#EDEAF4', color: '#6C5B8B', borderRadius: '4px', fontWeight: '700', whiteSpace: 'nowrap' }}
                                  title="Subscribed to SMS alerts"
                                >
                                  SMS
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <code
                              className="table-cell-truncate"
                              style={{
                                backgroundColor: '#F1F5F9',
                                color: '#0F172A',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '4px',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                border: '1px solid #E2E8F0',
                                display: 'inline-block'
                              }}
                              title={`Issued Promo Code: ${l.couponGenerated || 'CONTRAGE10'}`}
                            >
                              {l.couponGenerated || 'CONTRAGE10'}
                            </code>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              onClick={() => deleteMarketingLead(l.id)}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.35rem' }}
                              title={`Delete Lead: ${l.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: DERMATOLOGIST & CLINIC B2B INQUIRIES */}
          {activeTab === 'b2b' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Dermatologist & Clinic Wholesale Inquiries
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    High-volume bulk purchase and clinical dispensing inquiries submitted by doctors and aesthetic skin clinics.
                  </p>
                </div>

                <button
                  onClick={exportDermatologistInquiriesCSV}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={15} /> Export B2B Inquiries (CSV)
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {dermatologistInquiries.length === 0 ? (
                  <div style={{ backgroundColor: '#FFFFFF', padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                    No dermatologist B2B inquiries yet.
                  </div>
                ) : (
                  dermatologistInquiries.map(b => (
                    <div
                      key={b.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                        border: '1px solid rgba(23, 33, 58, 0.08)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                              {b.doctorName}
                            </span>
                            <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>{b.selectedTier || 'Tier 2 (45%)'}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                            <strong>{b.clinicName}</strong> • {b.city}, {b.state}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>Inquiry Status:</span>
                          <select
                            value={b.status}
                            onChange={(e) => updateDermatologistInquiryStatus(b.id, e.target.value)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              border: '1px solid #CBD5E1',
                              backgroundColor: b.status === 'Approved' ? '#F0F9F5' : b.status === 'Quotation Sent' ? '#E5EBF5' : '#FFFBEB',
                              color: b.status === 'Approved' ? '#438E75' : b.status === 'Quotation Sent' ? '#3B5D92' : '#C28E46'
                            }}
                          >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Quotation Sent">Quotation Sent</option>
                            <option value="Approved">Approved / Account Active</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => deleteDermatologistInquiry(b.id)}
                            style={{ background: 'none', border: 'none', color: '#D96B7D', cursor: 'pointer' }}
                            title="Remove Inquiry"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                        gap: '1rem',
                        fontSize: '0.82rem',
                        backgroundColor: 'var(--bg-primary)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>License / Registration</div>
                          <div style={{ fontWeight: '700' }}>{b.licenseNumber || 'Verification Pending'}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>Clinic GSTIN</div>
                          <div style={{ fontWeight: '700' }}>{b.gstin || 'N/A (Unregistered)'}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>Contact Info</div>
                          <div>{b.email} | {b.phone}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)' }}>Estimated Volume</div>
                          <div style={{ fontWeight: '700', color: 'var(--accent-blue-dark)' }}>{b.estimatedMonthlyUnits || '50+ Units'}</div>
                        </div>
                      </div>

                      {b.preferredProducts && b.preferredProducts.length > 0 && (
                        <div style={{ fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                          <strong>Preferred Formulations:</strong> {b.preferredProducts.join(', ')}
                        </div>
                      )}

                      {b.notes && (
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                          "{b.notes}"
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 10: ORDERS & FULFILLMENT LOGISTICS */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '0 0 0.35rem 0', fontFamily: 'var(--font-serif)' }}>
                    Orders & Delhivery Logistics
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Update live order stages from formulation batching to Delhivery doorstep delivery.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={exportOrdersCSV}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Download size={15} /> Export Orders (CSV)
                  </button>

                  <div className="admin-filter-scroll">
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
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredOrders.map(o => (
                  <div key={o.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: 'clamp(1.25rem, 3vw, 1.75rem)', border: '1px solid rgba(23, 33, 58, 0.08)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{o.id}</span>
                        <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>AWB: {o.trackingNumber}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem', fontSize: '0.85rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #F1F5F9' }}>
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

          {/* TAB 11: PROMO CODES & COUPONS */}
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
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

          {/* TAB 12: EDITORIAL & FAQS */}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
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
              <div style={{ backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 3vw, 1.5rem)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <form onSubmit={handleFAQSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                    <input type="text" placeholder="Question..." className="form-control" value={faqQuestion} onChange={e => setFaqQuestion(e.target.value)} required />
                    <input type="text" placeholder="Category" className="form-control" value={faqCategory} onChange={e => setFaqCategory(e.target.value)} />
                  </div>
                  <textarea placeholder="Clinical answer..." className="form-control" rows="2" value={faqAnswer} onChange={e => setFaqAnswer(e.target.value)} required />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }}>Add FAQ Item</button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 13: ANNOUNCEMENT BAR SETTINGS */}
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

              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: 'clamp(1.25rem, 3vw, 2rem)', border: '1px solid rgba(23, 33, 58, 0.08)', maxWidth: '680px' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(720px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Category</label>
                  <CustomSelect
                    value={productForm.category}
                    onChange={val => setProductForm({ ...productForm, category: val })}
                    options={[
                      'Serums & Boosters',
                      'Moisturizers & Creams',
                      'Cleansers & Toners',
                      'Exfoliators & Masks',
                      'Sun Protection',
                      'Professional & Backbar'
                    ]}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Primary Skin Concern</label>
                  <CustomSelect
                    value={productForm.primaryConcern}
                    onChange={val => setProductForm({ ...productForm, primaryConcern: val })}
                    options={[
                      'Acne & Blemishes',
                      'Aging & Fine Lines',
                      'Hyperpigmentation',
                      'Barrier Repair',
                      'Dryness & Dehydration',
                      'Redness & Sensitivity',
                      'Open Pores & Oiliness',
                      'Sun Protection'
                    ]}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '1rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(600px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(600px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(640px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration & Cohort</label>
                  <input type="text" className="form-control" value={trialForm.duration} onChange={e => setTrialForm({ ...trialForm, duration: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Formulation Tested</label>
                  <input type="text" className="form-control" value={trialForm.formulation} onChange={e => setTrialForm({ ...trialForm, formulation: e.target.value })} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: '0.5rem' }}>
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(500px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Create Promo Code</h3>
              <button onClick={() => setShowCouponModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCouponSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Promo Code</label>
                <input type="text" placeholder="e.g. DERMA20" className="form-control" value={couponCode} onChange={e => setCouponCode(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Discount Type</label>
                  <CustomSelect
                    value={couponType}
                    onChange={setCouponType}
                    options={[
                      { label: 'Percentage (%)', value: 'percentage' },
                      { label: 'Fixed Amount (₹)', value: 'fixed' }
                    ]}
                  />
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(23, 33, 58, 0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 'min(640px, calc(100vw - 24px))', maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Publish Journal Article</h3>
              <button onClick={() => setShowBlogModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Article Title</label>
                <input type="text" className="form-control" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
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

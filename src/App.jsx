import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import QuickSearchModal from './components/layout/QuickSearchModal';
import QuickViewModal from './components/layout/QuickViewModal';
import Toast from './components/common/Toast';
import MarketingLeadModal from './components/common/MarketingLeadModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ConcernsPage from './pages/ConcernsPage';
import ConcernDetailPage from './pages/ConcernDetailPage';
import IngredientsPage from './pages/IngredientsPage';
import ResearchPage from './pages/ResearchPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';
import LegalPage from './pages/LegalPage';
import DermatologistB2BPage from './pages/DermatologistB2BPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Modals & Overlays */}
      <CartDrawer />
      <QuickSearchModal />
      <QuickViewModal />
      {!isAdmin && <MarketingLeadModal />}
      <Toast />

      {/* Main Storefront Layout (hidden on /admin for dedicated CMS layout) */}
      {!isAdmin && (
        <>
          <AnnouncementBar />
          <Navbar />
        </>
      )}

      {/* Primary Routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/concerns" element={<ConcernsPage />} />
          <Route path="/concerns/:slug" element={<ConcernDetailPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dermatologist-b2b" element={<DermatologistB2BPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/legal/:type" element={<LegalPage />} />
          
          {/* Admin CMS Route */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Footer */}
      {!isAdmin && <Footer />}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen, concerns } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [concernsDropdownOpen, setConcernsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setConcernsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    'Serums & Boosters',
    'Cleansers & Toners',
    'Moisturizers & Creams',
    'Sun Protection',
    'Eye Care'
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(247, 245, 247, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px -2px rgba(23, 33, 58, 0.04)' : 'none',
        width: '100%'
      }}
    >
      <div className="container-wide" style={{ paddingLeft: 'clamp(0.75rem, 3vw, 2rem)', paddingRight: 'clamp(0.75rem, 3vw, 2rem)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'clamp(4rem, 8vw, 4.75rem)',
            gap: '0.5rem'
          }}
        >
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 2vw, 1.25rem)', minWidth: 0 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)',
                flexShrink: 0
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" style={{ display: 'flex', flexDirection: 'column', minWidth: 0, textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.15rem, 3.6vw, 1.65rem)',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  color: 'var(--text-primary)',
                  lineHeight: '1.05',
                  whiteSpace: 'nowrap'
                }}
              >
                CONTRÂGE
              </span>
              <span
                className="brand-subtitle"
                style={{
                  fontSize: 'clamp(0.46rem, 1.3vw, 0.6rem)',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-blue-dark)',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                  whiteSpace: 'nowrap'
                }}
              >
                YOUR PARTNER IN SKIN IMPROVEMENT
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)' }}>
            {/* Shop All Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link
                to="/shop"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  color: location.pathname.startsWith('/shop') ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '0.5rem 0'
                }}
              >
                Shop <ChevronDown size={13} />
              </Link>

              {shopDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-1rem',
                    width: '230px',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 15px 35px -5px rgba(23, 33, 58, 0.1)',
                    border: '1px solid rgba(23, 33, 58, 0.08)',
                    padding: '0.75rem',
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  <Link
                    to="/shop"
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.65rem',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid #F1F5F9',
                      borderRadius: 'var(--radius-xs)',
                      marginBottom: '0.25rem'
                    }}
                  >
                    View All Formulations &rarr;
                  </Link>
                  {categories.map(cat => (
                    <Link
                      key={cat}
                      to={`/shop?category=${encodeURIComponent(cat)}`}
                      style={{
                        display: 'block',
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        borderRadius: 'var(--radius-xs)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--bg-lavender)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Concerns Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setConcernsDropdownOpen(true)}
              onMouseLeave={() => setConcernsDropdownOpen(false)}
            >
              <Link
                to="/concerns"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  color: location.pathname.startsWith('/concerns') ? 'var(--text-primary)' : 'var(--text-secondary)',
                  padding: '0.5rem 0'
                }}
              >
                Skin Concerns <ChevronDown size={13} />
              </Link>

              {concernsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-1.5rem',
                    width: '260px',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 15px 35px -5px rgba(23, 33, 58, 0.1)',
                    border: '1px solid rgba(23, 33, 58, 0.08)',
                    padding: '0.75rem',
                    zIndex: 100,
                    animation: 'fadeIn 0.2s ease-out'
                  }}
                >
                  <Link
                    to="/concerns"
                    style={{
                      display: 'block',
                      padding: '0.45rem 0.65rem',
                      fontWeight: '700',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      borderBottom: '1px solid #F1F5F9',
                      borderRadius: 'var(--radius-xs)',
                      marginBottom: '0.25rem'
                    }}
                  >
                    All Skin Concerns &rarr;
                  </Link>
                  {concerns.map(c => (
                    <Link
                      key={c.id}
                      to={`/concerns/${c.slug}`}
                      style={{
                        display: 'block',
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        borderRadius: 'var(--radius-xs)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--bg-lavender)';
                        e.target.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/ingredients"
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
              })}
            >
              Ingredients
            </NavLink>

            <NavLink
              to="/research"
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
              })}
            >
              Research
            </NavLink>

            <NavLink
              to="/blog"
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
              })}
            >
              Journal
            </NavLink>

            <NavLink
              to="/dermatologist-b2b"
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '0.02em',
                color: isActive ? 'var(--accent-blue-dark)' : 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              })}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-blue-dark)' }}></span>
              Clinic B2B
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
              })}
            >
              About
            </NavLink>
          </nav>

          {/* Right Action Icons & Admin CRM Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.25rem, 1.2vw, 0.75rem)',
              flexShrink: 0
            }}
          >
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s',
                minWidth: '34px',
                minHeight: '34px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-lavender)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              className="hide-on-mobile"
              aria-label="Wishlist"
              style={{
                position: 'relative',
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s',
                minWidth: '34px',
                minHeight: '34px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-lavender)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    backgroundColor: 'var(--accent-navy)',
                    color: '#FFFFFF',
                    fontSize: '0.62rem',
                    fontWeight: '700',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: '1'
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Customer Account */}
            <Link
              to="/account"
              className="hide-on-mobile"
              aria-label="Customer Account"
              style={{
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s',
                minWidth: '34px',
                minHeight: '34px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-lavender)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <User size={18} />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${cartCount} items`}
              style={{
                backgroundColor: 'var(--accent-navy)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem clamp(0.55rem, 1.2vw, 0.85rem)',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: '700',
                fontSize: '0.78rem',
                boxShadow: '0 2px 8px rgba(23, 33, 58, 0.15)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0F1626';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-navy)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ShoppingBag size={15} />
              <span>{cartCount}</span>
            </button>

            {/* Admin CRM Portal Pill */}
            <Link
              to="/admin"
              className="admin-crm-btn hide-on-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: '#EDEAF4',
                color: 'var(--text-primary)',
                padding: '0.4rem clamp(0.5rem, 1vw, 0.75rem)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.74rem',
                fontWeight: '700',
                letterSpacing: '0.02em',
                border: '1px solid rgba(216, 210, 231, 0.9)',
                boxShadow: '0 2px 6px rgba(23, 33, 58, 0.04)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#17213A';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EDEAF4';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Layers size={13} />
              <span className="admin-crm-text">Admin CRM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid rgba(23, 33, 58, 0.08)',
            padding: '1.25rem clamp(1rem, 4vw, 1.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            maxHeight: 'calc(100vh - 5rem)',
            overflowY: 'auto',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <Link
            to="/#skin-quiz"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-lavender)',
              color: 'var(--text-primary)',
              fontWeight: '700',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(216, 210, 231, 0.8)',
              fontSize: '0.85rem'
            }}
          >
            <Sparkles size={16} /> Take Skin Diagnostic Quiz
          </Link>

          <div style={{ fontWeight: '700', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.25rem' }}>
            Shop by Category
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.5rem 0.65rem',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(15, 23, 42, 0.04)'
                }}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div style={{ fontWeight: '700', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.5rem' }}>
            Skin Concerns
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
            {concerns.map(c => (
              <Link
                key={c.id}
                to={`/concerns/${c.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.5rem 0.65rem',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(15, 23, 42, 0.04)'
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(23, 33, 58, 0.08)', margin: '0.4rem 0' }} />

          <Link to="/ingredients" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>Ingredients</Link>
          <Link to="/research" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>Research</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>Journal</Link>
          <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>Testimonials</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '600' }}>Contact</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--accent-navy)' }}>Admin CRM &rarr;</Link>
        </div>
      )}

      {/* Navbar Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 1025px) {
          .mobile-nav-toggle { display: none !important; }
        }
        @media (max-width: 480px) {
          .admin-crm-text { display: none !important; }
          .admin-crm-btn { padding: 0.4rem !important; border-radius: 50% !important; }
        }
      `}</style>
    </header>
  );
}

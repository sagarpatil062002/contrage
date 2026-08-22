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
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    'Serums & Treatments',
    'Cleansers',
    'Moisturizers & Creams',
    'Sun Protection',
    'Exfoliants & Toners',
    'Eye Care'
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(247, 245, 247, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 20px -2px rgba(23, 33, 58, 0.04)' : 'none'
    }}>
      <div className="container-wide" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.75rem'
        }}>
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only-btn"
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                lineHeight: '1'
              }}>
                AESTHEDERM
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: '700',
                letterSpacing: '0.2em',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                marginTop: '3px'
              }}>
                LABORATOIRES DERMATOLOGIQUES
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
                <div style={{
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
                }}>
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
                <div style={{
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
                }}>
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

          {/* Right Action Icons & Admin Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-lavender)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              aria-label="Wishlist"
              style={{
                position: 'relative',
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-lavender)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '1px',
                  right: '1px',
                  backgroundColor: 'var(--accent-navy)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Customer Account */}
            <Link
              to="/account"
              aria-label="Customer Account"
              style={{
                padding: '0.4rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-lavender)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <User size={19} />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              style={{
                background: 'var(--accent-navy)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '600',
                fontSize: '0.82rem',
                boxShadow: '0 2px 8px rgba(23, 33, 58, 0.15)',
                transition: 'all 0.2s ease'
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
              <ShoppingBag size={16} />
              <span>{cartCount}</span>
            </button>

            {/* Admin CRM Portal Switch */}
            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--bg-lavender)',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                border: '1px solid rgba(216, 210, 231, 0.9)',
                boxShadow: '0 2px 6px rgba(23, 33, 58, 0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#17213A';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-lavender)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Layers size={14} /> Admin CRM
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: 'calc(100vh - 5rem)',
          overflowY: 'auto'
        }}>
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
              border: '1px solid rgba(216, 210, 231, 0.8)'
            }}
          >
            <Sparkles size={16} /> Take Skin Diagnostic Quiz
          </Link>

          <div style={{ fontWeight: '700', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Shop by Category</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)'
                }}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div style={{ fontWeight: '700', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.5rem' }}>Skin Concerns</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {concerns.map(c => (
              <Link
                key={c.id}
                to={`/concerns/${c.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.5rem',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-primary)'
                }}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(23, 33, 58, 0.08)', margin: '0.5rem 0' }} />

          <Link to="/ingredients" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>Ingredients</Link>
          <Link to="/research" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>Research</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>Journal</Link>
          <Link to="/testimonials" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>Testimonials</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '600' }}>Contact</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-navy)' }}>Admin CMS &rarr;</Link>
        </div>
      )}

      {/* Responsive helper */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-only-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

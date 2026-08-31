import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { showToast, siteContent } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const brand = siteContent?.brand || {
    name: 'CONTRÂGE',
    tagline: 'YOUR PARTNER IN SKIN IMPROVEMENT',
    shortDescription: 'At ContrÂge, we develop high-quality cosmeceutical formulations, non-invasive treatments, and advanced home care lines with clinical precision and multidisciplinary medical expertise.'
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (showToast) showToast('Thank you! 10% coupon code CONTRAGE10 sent to your email.');
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        paddingTop: 'clamp(3rem, 6vw, 4.5rem)',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        width: '100%',
        overflowX: 'clip'
      }}
    >
      <div className="container">
        {/* Top Grid */}
        <div
          className="footer-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 'clamp(1.75rem, 4vw, 3rem)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
          }}
        >
          {/* Col 1: Brand & Manifesto */}
          <div style={{ minWidth: 0 }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 3.5vw, 1.65rem)',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  color: '#FFFFFF',
                  display: 'block',
                  lineHeight: '1.1'
                }}
              >
                {brand.name}
              </span>
              <span
                style={{
                  fontSize: 'clamp(0.52rem, 1.4vw, 0.62rem)',
                  letterSpacing: '0.16em',
                  color: '#38BDF8',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  display: 'block',
                  marginTop: '4px'
                }}
              >
                {brand.tagline}
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#A3ABB9', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              {brand.shortDescription}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', color: '#D8D2E7' }}>
              <ShieldCheck size={16} color="#38BDF8" style={{ flexShrink: 0 }} />
              <span>Dermatologist Approved & CDSCO In-Process</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1rem' }}>
              Shop Formulations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem', color: '#A3ABB9' }}>
              <li><Link to="/shop" style={{ color: 'inherit' }}>All Formulations</Link></li>
              <li><Link to="/shop?category=Serums%20%26%20Boosters" style={{ color: 'inherit' }}>Active Serums & Ampoules</Link></li>
              <li><Link to="/shop?category=Cleansers%20%26%20Toners" style={{ color: 'inherit' }}>pH-Balanced Cleansers</Link></li>
              <li><Link to="/shop?category=Moisturizers%20%26%20Creams" style={{ color: 'inherit' }}>Ceramide Barrier Creams</Link></li>
              <li><Link to="/shop?category=Sun%20Protection" style={{ color: 'inherit' }}>Mineral & Hybrid SPF</Link></li>
            </ul>
          </div>

          {/* Col 3: Discover & Science */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1rem' }}>
              Science & B2B Clinic
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem', color: '#A3ABB9' }}>
              <li><Link to="/dermatologist-b2b" style={{ color: '#38BDF8', fontWeight: '700' }}>★ Clinic Bulk B2B Portal</Link></li>
              <li><Link to="/concerns" style={{ color: 'inherit' }}>Skin Concerns Index</Link></li>
              <li><Link to="/ingredients" style={{ color: 'inherit' }}>Active Ingredients Lab</Link></li>
              <li><Link to="/research" style={{ color: 'inherit' }}>Clinical Trial Whitepapers</Link></li>
              <li><Link to="/blog" style={{ color: 'inherit' }}>Clinical Journal & Insights</Link></li>
            </ul>
          </div>

          {/* Col 4: Help & Legal */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1rem' }}>
              Support & Logistics
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem', color: '#A3ABB9' }}>
              <li><Link to="/contact" style={{ color: 'inherit' }}>Customer Care & Inquiries</Link></li>
              <li><Link to="/faq" style={{ color: 'inherit' }}>Help Center & FAQ</Link></li>
              <li><Link to="/legal/shipping" style={{ color: 'inherit' }}>Delhivery Logistics & Shipping</Link></li>
              <li><Link to="/legal/refunds" style={{ color: 'inherit' }}>30-Day Guarantee & Returns</Link></li>
              <li><Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="footer-newsletter-col" style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1rem' }}>
              Clinical Dispatch
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#A3ABB9', lineHeight: '1.5', marginBottom: '0.85rem' }}>
              Receive published dermatological studies, formulation updates, and exclusive private release access.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#34D399' }}>
                <CheckCircle2 size={16} />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="footer-newsletter-btn"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.76rem',
            color: '#94A3B8'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} {brand.name} {brand.tagline}. All Rights Reserved. Formulated under strict cGMP.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/legal/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
            <Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/admin" style={{ color: '#38BDF8', fontWeight: '700' }}>Admin CRM</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

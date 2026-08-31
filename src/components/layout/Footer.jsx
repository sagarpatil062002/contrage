import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      showToast('Thank you! 10% coupon code CONTRAGE10 sent to your email.');
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Col 1: Brand & Manifesto */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.65rem',
                fontWeight: '800',
                letterSpacing: '0.06em',
                color: '#FFFFFF',
                display: 'block'
              }}>
                {brand.name}
              </span>
              <span style={{
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: '#38BDF8',
                textTransform: 'uppercase',
                fontWeight: '700'
              }}>
                {brand.tagline}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#A3ABB9', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              {brand.shortDescription}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#D8D2E7' }}>
              <ShieldCheck size={16} />
              <span>Dermatologist Approved & CDSCO In-Process</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Shop Formulations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3ABB9' }}>
              <li><Link to="/shop" style={{ color: 'inherit' }}>All Formulations</Link></li>
              <li><Link to="/shop?category=Serums%20%26%20Treatments" style={{ color: 'inherit' }}>Active Serums & Ampoules</Link></li>
              <li><Link to="/shop?category=Cleansers" style={{ color: 'inherit' }}>pH-Balanced Cleansers</Link></li>
              <li><Link to="/shop?category=Moisturizers%20%26%20Creams" style={{ color: 'inherit' }}>Ceramide Barrier Creams</Link></li>
              <li><Link to="/shop?category=Sun%20Protection" style={{ color: 'inherit' }}>Mineral & Hybrid SPF</Link></li>
            </ul>
          </div>

          {/* Col 3: Discover & Science */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Science & B2B Clinic
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3ABB9' }}>
              <li><Link to="/dermatologist-b2b" style={{ color: '#D8D2E7', fontWeight: '700' }}>★ Dermatologist & Clinic Bulk B2B</Link></li>
              <li><Link to="/concerns" style={{ color: 'inherit' }}>Skin Concerns Index</Link></li>
              <li><Link to="/ingredients" style={{ color: 'inherit' }}>Active Ingredients Lab</Link></li>
              <li><Link to="/research" style={{ color: 'inherit' }}>Clinical Trial Whitepapers</Link></li>
              <li><Link to="/blog" style={{ color: 'inherit' }}>Clinical Journal & Insights</Link></li>
            </ul>
          </div>

          {/* Col 4: Help & Legal */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Support & Logistics
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3ABB9' }}>
              <li><Link to="/contact" style={{ color: 'inherit' }}>Customer Care & Inquiries</Link></li>
              <li><Link to="/faq" style={{ color: 'inherit' }}>Help Center & FAQ</Link></li>
              <li><Link to="/legal/shipping" style={{ color: 'inherit' }}>Delhivery Logistics & Shipping</Link></li>
              <li><Link to="/legal/refunds" style={{ color: 'inherit' }}>30-Day Guarantee & Returns</Link></li>
              <li><Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy Policy (WhatsApp/SMS Opt-in)</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Clinical Dispatch
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#A3ABB9', lineHeight: '1.5', marginBottom: '1rem' }}>
              Receive published dermatological studies, formulation updates, and exclusive private release access.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#438E75' }}>
                <CheckCircle2 size={16} />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Enter email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.85rem',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    width: '100%',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#17213A',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 1rem',
                    cursor: 'pointer',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#6B7280'
        }}>
          <div>
            &copy; {new Date().getFullYear()} {brand.name} {brand.tagline}. All Rights Reserved. Formulated under strict cGMP.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/legal/terms" style={{ color: 'inherit' }}>Terms of Service</Link>
            <Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="/admin" style={{ color: '#D8D2E7', fontWeight: '700' }}>Admin CMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

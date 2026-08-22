import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('Thank you for subscribing to our clinical research newsletter.');
      setEmail('');
    }
  };

  return (
    <footer style={{
      backgroundColor: '#17213A',
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
                fontSize: '1.6rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                display: 'block'
              }}>
                AESTHEDERM
              </span>
              <span style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#D8D2E7',
                textTransform: 'uppercase',
                fontWeight: '700'
              }}>
                LABORATOIRES DERMATOLOGIQUES
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#A3ABB9', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              Advanced dermatological skincare formulations developed with global clinical expertise and 100% molecular transparency.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#D8D2E7' }}>
              <ShieldCheck size={16} />
              <span>Dermatologically Evaluated & Non-Comedogenic</span>
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
              Science & Research
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3ABB9' }}>
              <li><Link to="/concerns" style={{ color: 'inherit' }}>Skin Concerns Index</Link></li>
              <li><Link to="/ingredients" style={{ color: 'inherit' }}>Active Ingredients Lab</Link></li>
              <li><Link to="/research" style={{ color: 'inherit' }}>Clinical Trial Whitepapers</Link></li>
              <li><Link to="/blog" style={{ color: 'inherit' }}>Clinical Journal & Insights</Link></li>
              <li><Link to="/#skin-quiz" style={{ color: 'inherit' }}>Skin Diagnostic Consultation</Link></li>
            </ul>
          </div>

          {/* Col 4: Help & Legal */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Support & Ethics
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: '#A3ABB9' }}>
              <li><Link to="/contact" style={{ color: 'inherit' }}>Customer Care & B2B Inquiries</Link></li>
              <li><Link to="/faq" style={{ color: 'inherit' }}>Help Center & FAQ</Link></li>
              <li><Link to="/legal/shipping" style={{ color: 'inherit' }}>Cold-Chain Logistics Policy</Link></li>
              <li><Link to="/legal/refunds" style={{ color: 'inherit' }}>30-Day Clinical Guarantee</Link></li>
              <li><Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy & Data Security</Link></li>
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

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn btn-sm"
                style={{
                  backgroundColor: '#EDEAF4',
                  color: '#17213A',
                  fontWeight: '700',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                Subscribe to Dispatch &rarr;
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#848D9F'
        }}>
          <div>
            © {new Date().getFullYear()} Aesthederm Labs. All rights reserved. Precision cosmetic dermatological preparations.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/legal/privacy" style={{ color: 'inherit' }}>Privacy</Link>
            <Link to="/legal/terms" style={{ color: 'inherit' }}>Terms</Link>
            <Link to="/legal/shipping" style={{ color: 'inherit' }}>Shipping</Link>
            <Link to="/admin" style={{ color: '#D8D2E7', fontWeight: '600' }}>Admin CMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

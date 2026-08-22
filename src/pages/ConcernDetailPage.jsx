import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/common/ProductCard';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Layers,
  FlaskConical
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConcernDetailPage() {
  const { slug } = useParams();
  const { concerns, products, addRoutineBundleToCart, showToast } = useStore();

  const concern = concerns.find(c => c.slug === slug) || concerns[0];

  // Resolve routine step products
  const routineProducts = concern.routineSteps
    ? concern.routineSteps.map(step => products.find(p => p.id === step.productId)).filter(Boolean)
    : [];

  const bundleOriginalPrice = routineProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleSalePrice = Math.round(routineProducts.reduce((sum, p) => sum + (p.salePrice || p.price), 0) * 0.85);

  // All products matching this concern
  const matchingProducts = products.filter(p => p.concerns.some(c => c.toLowerCase().includes(concern.name.toLowerCase().split(' ')[0])));

  const handleAddBundle = () => {
    if (routineProducts.length > 0) {
      addRoutineBundleToCart(routineProducts);
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3rem 0 2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <Link to="/" style={{ color: 'inherit' }}>Home</Link> &gt;
            <Link to="/concerns" style={{ color: 'inherit' }}>Concerns Hub</Link> &gt;
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{concern.name}</span>
          </div>

          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Dermatological Protocol
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            {concern.name}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '760px', lineHeight: '1.6' }}>
            {concern.clinicalBackground}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        {/* Doctor Protocol & Contraindications Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Doctor Strategy */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--teal-900)', fontWeight: '700', fontSize: '1rem', marginBottom: '0.65rem' }}>
              <ShieldCheck size={20} color="var(--teal-700)" />
              <span>Dermatological Treatment Strategy</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
              {concern.doctorTips}
            </p>
          </div>

          {/* Contraindications (What to Avoid) */}
          <div style={{
            backgroundColor: '#FFFBEB',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FDE68A',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400E', fontWeight: '700', fontSize: '1rem', marginBottom: '0.65rem' }}>
              <AlertTriangle size={20} color="#D97706" />
              <span>Contraindicated Ingredients & Habits to Avoid</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#78350F', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {concern.contraindications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Doctor Prescribed 3-Step Routine Bundle */}
        {routineProducts.length > 0 && (
          <section style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--teal-700)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '3.5rem',
            boxShadow: 'var(--shadow-luxury)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <span className="badge badge-teal" style={{ marginBottom: '0.35rem' }}>
                  Doctor Prescribed AM/PM Protocol
                </span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
                  Curated 3-Step Routine for {concern.name}
                </h2>
              </div>

              <span className="badge badge-emerald" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>
                15% Bundle Discount Included
              </span>
            </div>

            {/* Routine Step Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {concern.routineSteps.map((step, idx) => {
                const prod = products.find(p => p.id === step.productId);
                if (!prod) return null;
                return (
                  <div
                    key={step.step}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #E2E8F0',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--teal-800)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Layers size={14} /> {step.step}
                      </div>

                      <img
                        src={prod.heroImage}
                        alt={prod.name}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', marginBottom: '0.75rem', border: '1px solid #E2E8F0' }}
                      />

                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                        <Link to={`/product/${prod.id}`} style={{ color: 'inherit' }}>
                          {prod.name}
                        </Link>
                      </h4>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '0.75rem' }}>
                        {step.instruction}
                      </p>
                    </div>

                    <div style={{ paddingTop: '0.65rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--teal-950)' }}>₹{prod.salePrice || prod.price}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prod.sizes ? prod.sizes[0] : 'Standard'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bundle Pricing Bar & Add All Button */}
            <div style={{
              backgroundColor: 'var(--teal-900)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#5EEAD4', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
                  Complete Regimen Bundle Price
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF' }}>₹{bundleSalePrice}</span>
                  <span style={{ fontSize: '1rem', color: '#94A3B8', textDecoration: 'line-through' }}>₹{bundleOriginalPrice}</span>
                  <span style={{ fontSize: '0.85rem', color: '#34D399', fontWeight: '700' }}>Save ₹{bundleOriginalPrice - bundleSalePrice} + Free Courier</span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className="btn btn-accent btn-lg"
                style={{ padding: '0.85rem 1.75rem' }}
              >
                <ShoppingBag size={18} /> Add All 3 Formulations to Cart
              </button>
            </div>
          </section>
        )}

        {/* All Matching Formulations for this Concern */}
        <div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            All Formulations Targeting {concern.name}
          </h3>
          <div className="grid-3">
            {(matchingProducts.length > 0 ? matchingProducts : products.slice(0, 3)).map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

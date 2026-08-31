import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function RelatedProducts({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <section aria-label="Complementary Formulations" style={{ marginTop: '3.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)',
            fontWeight: '800',
            color: '#0F172A',
            fontFamily: 'var(--font-serif)',
            margin: 0
          }}
        >
          Complementary Formulations
        </h2>

        <Link
          to="/shop"
          style={{
            color: '#0284C7',
            fontSize: '0.85rem',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(1rem, 2.5vw, 1.75rem)'
        }}
      >
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

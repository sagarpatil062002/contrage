import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function BestsellerSection() {
  const { products } = useStore();
  const bestsellers = products.slice(0, 4);

  return (
    <section className="section-padding" style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)'
    }}>
      <div className="container">
        {/* Centered Editorial Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            CURATED FAVORITES
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-serif)'
          }}>
            Bestsellers
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)'
          }}>
            The formulations our customers return to.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          {bestsellers.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            Explore All Formulations <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

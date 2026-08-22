import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/common/ProductCard';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { blogs, products } = useStore();

  const blog = blogs.find(b => b.id === id || b.slug === id) || blogs[0];

  const relatedProducts = blog.relatedProductIds
    ? blog.relatedProductIds.map(pId => products.find(p => p.id === pId)).filter(Boolean)
    : products.slice(0, 3);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid #E2E8F0', padding: '1rem 0' }}>
        <div className="container-narrow">
          <Link
            to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--teal-800)' }}
          >
            <ArrowLeft size={16} /> Back to Dermatology Editorial
          </Link>
        </div>
      </div>

      <article className="container-narrow" style={{ paddingTop: '3rem' }}>
        {/* Article Meta */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>
            {blog.category}
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text-primary)',
            lineHeight: '1.2',
            marginBottom: '1rem'
          }}>
            {blog.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--teal-800)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                MD
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {blog.author}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {blog.authorRole} • Global Clinical Board
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>{blog.publishedDate}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid #E2E8F0'
        }}>
          <img
            src={blog.coverImage}
            alt={blog.title}
            style={{ width: '100%', maxHeight: '460px', objectFit: 'cover' }}
          />
        </div>

        {/* Article Body */}
        <div
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '3.5rem'
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Doctor Verification Sign-Off */}
        <div style={{
          backgroundColor: 'var(--teal-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--teal-200)',
          padding: '1.5rem',
          marginBottom: '4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <ShieldCheck size={32} color="var(--teal-700)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--teal-950)', marginBottom: '0.2rem' }}>
              Dermatologically Reviewed & Medically Referenced
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--teal-800)', margin: 0 }}>
              This editorial has been reviewed for clinical accuracy by the Aesthederm Global Medical Advisory Board. All clinical percentages referenced correspond directly to published dermatological trial protocols.
            </p>
          </div>
        </div>

        {/* Mentioned Clinical Formulations */}
        {relatedProducts.length > 0 && (
          <div style={{ paddingTop: '2.5rem', borderTop: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Clinical Formulations Mentioned in this Article
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

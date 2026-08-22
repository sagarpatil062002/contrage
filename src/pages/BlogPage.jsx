import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';

export default function BlogPage() {
  const { blogs } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Clinical Research', 'Barrier Science', 'Dermatology & Pigment'];

  const filtered = blogs.filter(b => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return b.title.toLowerCase().includes(term) || b.excerpt.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Doctor-Written Articles
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Dermatology Science & Editorial
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Peer-reviewed insights, cellular biology deep dives, ingredient compatibility guides, and clinical routine protocols authored by our medical board.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Filter Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '400px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search dermatology articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem 0.6rem 2.5rem',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid #CBD5E1',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  border: selectedCategory === cat ? '1px solid var(--teal-800)' : '1px solid #CBD5E1',
                  backgroundColor: selectedCategory === cat ? 'var(--teal-800)' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid-3">
          {filtered.map(b => (
            <div
              key={b.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                <div style={{
                  position: 'relative',
                  aspectRatio: '16 / 10',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  marginBottom: '1.25rem'
                }}>
                  <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '0.65rem',
                    left: '0.65rem',
                    backgroundColor: 'rgba(11, 17, 24, 0.85)',
                    color: '#5EEAD4',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '0.25rem 0.55rem',
                    borderRadius: 'var(--radius-xs)',
                    textTransform: 'uppercase'
                  }}>
                    {b.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} /> {b.publishedDate}
                  </span>
                  <span>• {b.readTime}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.35', marginBottom: '0.5rem' }}>
                  <Link to={`/blog/${b.id}`} style={{ color: 'inherit' }}>
                    {b.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {b.excerpt}
                </p>
              </div>

              <div style={{
                paddingTop: '0.85rem',
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8rem'
              }}>
                <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>By {b.author}</span>
                <Link to={`/blog/${b.id}`} style={{ fontWeight: '700', color: 'var(--teal-800)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                  Read Article <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageSquare } from 'lucide-react';

export default function FAQPage() {
  const { faqs } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIds, setOpenIds] = useState(['faq-1']);

  const categories = ['All', 'Formulation & Safety', 'Skin Routines & Concerns', 'Orders & Shipping', 'Professional & B2B'];

  const toggleAccordion = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filtered = faqs.filter(f => {
    if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Help & Medical Guidance
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Answers to common clinical questions about active ingredient layering, patch testing, shipping timelines, and professional clinic accounts.
          </p>
        </div>
      </div>

      <div className="container-narrow" style={{ paddingTop: '3rem' }}>
        {/* Search & Category Filter */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search clinical questions (e.g. Niacinamide, Returns, Shipping)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid #CBD5E1',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
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

        {/* FAQs Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
          {filtered.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <HelpCircle size={18} color="var(--teal-700)" style={{ flexShrink: 0 }} />
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem 1.25rem',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.65'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Still have questions about your skin regimen?
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Our in-house clinical support team is available 6 days a week to review your routine.
          </p>
          <Link to="/contact" className="btn btn-primary btn-sm">
            Contact Clinical Support Team &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

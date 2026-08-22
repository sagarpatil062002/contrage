import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import StarRating from '../components/common/StarRating';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import { ShieldCheck, CheckCircle2, Star, Award, Heart, MessageSquare } from 'lucide-react';

export default function TestimonialsPage() {
  const { testimonials, addTestimonial, showToast } = useStore();
  const [selectedConcern, setSelectedConcern] = useState('All');

  // Submit Modal / Form
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Verified Customer');
  const [concern, setConcern] = useState('Acne & Blemishes');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [productUsed, setProductUsed] = useState('10% Niacinamide + 2% Zinc PCA Serum');

  const filtered = testimonials.filter(t => {
    if (selectedConcern === 'All') return true;
    return t.concern.toLowerCase().includes(selectedConcern.toLowerCase());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quote) {
      showToast('Please enter your name and review quote.', 'error');
      return;
    }

    addTestimonial({
      name,
      title,
      concern,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating,
      verifiedDerm: false,
      verifiedBuyer: true,
      quote,
      productUsed,
      duration: 'Verified Purchase',
      resultMetric: 'Documented Patient Satisfaction'
    });

    setName('');
    setQuote('');
    showToast('Your verified case study review was submitted!');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Documented Clinical Outcomes
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Patient Results & Doctor Endorsements
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Real case studies from dermatology clinics and verified patients detailing visible reduction in acne, hyperpigmentation, barrier damage, and fine lines.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        {/* Testimonials List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {filtered.map(test => (
            <div
              key={test.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <StarRating rating={test.rating} size={16} />
                  <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                    {test.concern}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{test.quote}"
                </p>

                {/* Formulation Used Badge */}
                <div style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  color: 'var(--teal-900)',
                  fontWeight: '600',
                  marginBottom: '1.25rem',
                  border: '1px solid #F1F5F9'
                }}>
                  🧪 Formulation: <strong>{test.productUsed}</strong>
                </div>

                {/* Metric */}
                <div style={{
                  backgroundColor: 'var(--teal-50)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  color: 'var(--teal-900)',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}>
                  📈 Clinical Outcome: {test.resultMetric}
                </div>
              </div>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                paddingTop: '1rem',
                borderTop: '1px solid #F1F5F9'
              }}>
                <img
                  src={test.avatar}
                  alt={test.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>{test.name}</span>
                    {test.verifiedBuyer && (
                      <CheckCircle2 size={15} color="var(--teal-700)" title="Verified Purchase" />
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {test.title} • {test.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Case Study Review Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #E2E8F0',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          maxWidth: '720px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-luxury)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-teal">Submit Verified Review</span>
            <h2 style={{ fontSize: '1.6rem', marginTop: '0.4rem', color: 'var(--text-primary)' }}>
              Share Your Clinical Journey
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Help others choose the right active formulation for their skin barrier.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Maya Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Primary Skin Concern</label>
                <select className="form-control" value={concern} onChange={(e) => setConcern(e.target.value)}>
                  <option value="Acne & Blemishes">Acne & Blemishes</option>
                  <option value="Hyperpigmentation">Hyperpigmentation</option>
                  <option value="Damaged Barrier">Damaged Barrier</option>
                  <option value="Aging & Fine Lines">Aging & Fine Lines</option>
                  <option value="Open Pores">Open Pores</option>
                  <option value="Sensitive Skin">Sensitive Skin</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Formulation Tested</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 10% Niacinamide + 2% Zinc Serum"
                value={productUsed}
                onChange={(e) => setProductUsed(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Experience & Changes Observed</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="How did your skin respond over 2-4 weeks? Mention texture, redness, or acne clearance..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Submit Verified Case Study Review &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

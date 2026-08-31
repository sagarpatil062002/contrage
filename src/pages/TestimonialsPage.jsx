import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CustomSelect from '../components/common/CustomSelect';
import StarRating from '../components/common/StarRating';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import { ShieldCheck, CheckCircle2, Star, Award, Heart, MessageSquare } from 'lucide-react';

export default function TestimonialsPage() {
  const { testimonials, addTestimonial, showToast } = useStore();
  const [selectedConcern, setSelectedConcern] = useState('All');

  const concernOptions = [
    'Acne & Blemishes',
    'Hyperpigmentation',
    'Damaged Barrier',
    'Aging & Fine Lines',
    'Open Pores',
    'Sensitive Skin'
  ];

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
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: 'clamp(1.75rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2.5rem) 0'
      }}>
        <div className="container">
          <Breadcrumbs embedded items={[{ label: 'Home', to: '/' }, { label: 'Clinical Case Studies' }]} />
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Documented Clinical Outcomes
          </span>
          <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
            Patient Results & Doctor Endorsements
          </h1>
          <p style={{ fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '720px', lineHeight: '1.6' }}>
            Real case studies from dermatology clinics and verified patients detailing visible reduction in acne, hyperpigmentation, barrier damage, and fine lines.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Testimonials List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1.25rem, 3vw, 2rem)',
          marginBottom: '4rem'
        }}>
          {filtered.map(t => (
            <div
              key={t.id}
              className="clinical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                    {t.concern}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "{t.quote}"
                </p>

                {t.resultMetric && (
                  <div style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'rgba(2, 132, 199, 0.06)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.78rem',
                    color: '#0369A1',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <CheckCircle2 size={14} /> <strong>{t.resultMetric}</strong>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid #F1F5F9'
              }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {t.title} • {t.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
          padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
          maxWidth: '720px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-luxury)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-teal">Submit Verified Review</span>
            <h2 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', marginTop: '0.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
              Share Your Clinical Journey
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Help others choose the right active formulation for their skin barrier.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Responsive 2-column grid: stacks 100% full-width on mobile, 2 columns on desktop */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1rem'
            }}>
              <div className="form-group" style={{ width: '100%', marginBottom: 0 }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Maya Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div className="form-group" style={{ width: '100%', marginBottom: 0 }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Primary Skin Concern</label>
                <CustomSelect
                  value={concern}
                  onChange={setConcern}
                  options={concernOptions}
                />
              </div>
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Formulation Tested</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 10% Niacinamide + 2% Zinc Serum"
                value={productUsed}
                onChange={(e) => setProductUsed(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Your Experience & Changes Observed</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="How did your skin respond over 2-4 weeks? Mention texture, redness, or acne clearance..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                justifyContent: 'center',
                boxSizing: 'border-box',
                whiteSpace: 'normal',
                textAlign: 'center',
                padding: '0.75rem 1.25rem'
              }}
            >
              Submit Verified Case Study Review &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

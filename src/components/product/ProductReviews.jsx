import React, { useState } from 'react';
import StarRating from '../common/StarRating';
import CustomSelect from '../common/CustomSelect';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ProductReviews({
  productId,
  reviews = [],
  rating = 5,
  onAddReview,
  showToast
}) {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerSkinType, setReviewerSkinType] = useState('Combination');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      if (showToast) showToast('Please complete all review fields.', 'error');
      return;
    }

    if (onAddReview) {
      onAddReview(productId, {
        name: reviewerName.trim(),
        author: reviewerName.trim(),
        rating: Number(reviewerRating),
        comment: reviewerComment.trim(),
        skinType: reviewerSkinType
      });
    }

    if (showToast) showToast('Thank you! Your verified review has been submitted.');
    setReviewerName('');
    setReviewerComment('');
  };

  return (
    <section
      aria-label="Customer Reviews"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        marginBottom: '3.5rem',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
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
          Customer Feedback & Reviews
        </h2>

        {reviews.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <StarRating rating={rating} size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
              {rating.toFixed(1)} / 5.0
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '2rem',
            border: '1px solid rgba(15, 23, 42, 0.04)'
          }}
        >
          <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
            No customer reviews submitted yet. Have you tried this formulation? Share your clinical experience below.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem 0',
                borderBottom: '1px solid rgba(15, 23, 42, 0.06)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.35rem',
                  flexWrap: 'wrap',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.9rem' }}>
                    {rev.author || rev.name}
                  </span>
                  {rev.skinType && (
                    <span style={{ fontSize: '0.72rem', backgroundColor: '#F1F5F9', color: '#64748B', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      {rev.skinType}
                    </span>
                  )}
                </div>
                <StarRating rating={rev.rating || 5} size={13} />
              </div>
              <p style={{ color: '#475569', fontSize: '0.86rem', lineHeight: '1.55', margin: 0 }}>
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Write a Review Form */}
      <form
        onSubmit={handleReviewSubmit}
        style={{
          backgroundColor: '#F8FAFC',
          padding: 'clamp(1rem, 2.5vw, 1.5rem)',
          borderRadius: '8px',
          border: '1px solid rgba(15, 23, 42, 0.08)'
        }}
      >
        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
          Write a Verified Review
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.85rem',
            marginBottom: '0.85rem'
          }}
        >
          <div>
            <label
              htmlFor="reviewer-name"
              style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.3rem' }}
            >
              Your Name *
            </label>
            <input
              id="reviewer-name"
              type="text"
              required
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="e.g. Dr. Ananya / Priya S."
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <div>
            <label
              style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.3rem' }}
            >
              Rating *
            </label>
            <CustomSelect
              value={reviewerRating}
              onChange={setReviewerRating}
              options={[
                { label: '⭐⭐⭐⭐⭐ (5 - Exceptional Efficacy)', value: 5 },
                { label: '⭐⭐⭐⭐ (4 - Very Good)', value: 4 },
                { label: '⭐⭐⭐ (3 - Moderate)', value: 3 },
                { label: '⭐⭐ (2 - Below Expectation)', value: 2 },
                { label: '⭐ (1 - Unsatisfactory)', value: 1 }
              ]}
              size="sm"
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="reviewer-comment"
            style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.3rem' }}
          >
            Review & Skin Observations *
          </label>
          <textarea
            id="reviewer-comment"
            required
            rows={3}
            value={reviewerComment}
            onChange={(e) => setReviewerComment(e.target.value)}
            placeholder="Describe your experience, texture absorption, and results observed over time..."
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              backgroundColor: '#FFFFFF'
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
        >
          <Send size={13} /> Submit Review
        </button>
      </form>
    </section>
  );
}

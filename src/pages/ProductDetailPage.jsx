import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/common/ProductCard';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Sun,
  Moon,
  Plus,
  Minus,
  CheckCircle2,
  FlaskConical,
  ArrowRight
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, addReview, setIsCartOpen, showToast } = useStore();

  const product = products.find(p => p.id === id) || products[0];

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '30ml');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    benefits: true,
    inci: true,
    usage: false,
    trials: false,
    faq: false
  });

  // Review submission state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerSkinType, setReviewerSkinType] = useState('Oily / Combination');

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const images = product.galleryImages || [product.heroImage, product.heroImage];

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsCartOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      showToast('Please complete all review fields.', 'error');
      return;
    }

    addReview(product.id, {
      name: reviewerName.trim(),
      author: reviewerName.trim(),
      rating: Number(reviewerRating),
      comment: reviewerComment.trim(),
      skinType: reviewerSkinType
    });

    setReviewerName('');
    setReviewerComment('');
  };

  // Related products bundle
  const relatedProducts = products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 2);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(23, 33, 58, 0.08)', padding: '0.85rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <Link to="/" style={{ color: 'inherit' }}>Home</Link> &gt;
            <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link> &gt;
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} style={{ color: 'inherit' }}>{product.category}</Link> &gt;
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Top Split Hero (Gallery + Purchase Dossier) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Left Column: Image Gallery on Soft Gradient Base */}
          <div>
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1/1',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(23, 33, 58, 0.08)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <img
                src={images[selectedImageIdx] || product.heroImage}
                alt={product.name}
                style={{ width: '85%', height: '85%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />

              {product.badge && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--bg-lavender)',
                  color: 'var(--text-primary)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(216, 210, 231, 0.8)',
                  letterSpacing: '0.04em'
                }}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-xs)',
                      border: selectedImageIdx === i ? '2px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.1)',
                      padding: '2px',
                      backgroundColor: '#FFFFFF',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                  >
                    <img src={img} alt={`View ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Prescription & Buying Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-lavender" style={{ fontSize: '0.72rem' }}>
                {product.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                SKU: {product.id.toUpperCase()}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
              lineHeight: '1.2',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-serif)'
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              {product.tagline}
            </p>

            {/* Star Rating & Review Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <StarRating rating={product.rating || 4.9} size={16} />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {product.rating} / 5.0
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                ({product.reviewsCount || 64} verified patient reviews)
              </span>
            </div>

            {/* Active Molecule Highlight Card */}
            {product.activeIngredients && (
              <div style={{
                backgroundColor: 'var(--bg-lavender)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                border: '1px solid rgba(216, 210, 231, 0.8)',
                marginBottom: '1.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6C5B8B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                  Core Active Concentration:
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  🔬 {product.activeIngredients[0].percentage} {product.activeIngredients[0].name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {product.activeIngredients[0].role}
                </div>
              </div>
            )}

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                ₹{product.salePrice || product.price}
              </span>
              {product.salePrice && product.price > product.salePrice && (
                <>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.price}
                  </span>
                  <span className="badge badge-rose">
                    Save ₹{product.price - product.salePrice}
                  </span>
                </>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Select Volume / Size:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '0.5rem 1.15rem',
                        borderRadius: 'var(--radius-xs)',
                        border: selectedSize === sz ? '2px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.12)',
                        backgroundColor: selectedSize === sz ? 'var(--bg-lavender)' : '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: '#FFFFFF'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', padding: '0.65rem 0.9rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                >
                  <Minus size={15} />
                </button>
                <span style={{ fontSize: '0.95rem', fontWeight: '800', minWidth: '32px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', padding: '0.65rem 0.9rem', cursor: 'pointer', display: 'flex', color: 'var(--text-secondary)' }}
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, padding: '0.9rem' }}
              >
                <ShoppingBag size={18} /> Add Formulation to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(23, 33, 58, 0.12)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: isWishlisted ? '#D96B7D' : 'var(--text-secondary)'
                }}
              >
                <Heart size={20} fill={isWishlisted ? '#D96B7D' : 'none'} />
              </button>
            </div>

            {/* Guarantees & Shipping Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(23, 33, 58, 0.08)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} color="#6C5B8B" />
                <span>30-Day Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={16} color="#6C5B8B" />
                <span>Cold-Chain Courier</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={16} color="#6C5B8B" />
                <span>100% INCI Honest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Accordions Dossier */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '4rem'
        }}>
          {/* 1. Full INCI Transparency */}
          <div style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.08)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => toggleSection('inci')}
              style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
            >
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                Full INCI Ingredients Transparency
              </h3>
              {openSections.inci ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.inci && (
              <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ marginBottom: '0.75rem', fontFamily: 'monospace', backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(23, 33, 58, 0.06)' }}>
                  {product.fullInci || 'Aqua (Purified Water), Niacinamide (USP Grade), Glycerin, Zinc PCA, Sodium Hyaluronate, Panthenol, Phenoxyethanol.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                  <span>✓ 0% Synthetic Fragrance</span>
                  <span>✓ 0% Parabens & Sulfates</span>
                  <span>✓ 0% Artificial Colorants</span>
                  <span>✓ Non-Comedogenic Tested</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Usage & Layering Guide */}
          <div style={{ borderBottom: '1px solid rgba(23, 33, 58, 0.08)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => toggleSection('usage')}
              style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
            >
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                Application Protocol & AM/PM Layering
              </h3>
              {openSections.usage ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.usage && (
              <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p style={{ marginBottom: '1rem' }}>
                  {product.howToUse?.instructions || 'Apply 2-3 drops morning and evening directly to clean facial skin. Pat gently until absorbed before applying heavier moisturizers.'}
                </p>
                <div style={{ backgroundColor: 'var(--bg-lavender)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(216, 210, 231, 0.8)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  ⚠️ <strong>Patch Test Advisory:</strong> Apply a dime-sized amount behind the ear or inside forearm 24 hours prior to full facial application.
                </div>
              </div>
            )}
          </div>

          {/* 3. Clinical Trial Results */}
          <div>
            <button
              onClick={() => toggleSection('trials')}
              style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
            >
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                Clinical Trial Evidence
              </h3>
              {openSections.trials ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.trials && (
              <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                <p>
                  Evaluated in a 4-week randomized clinical assessment. 94% of subjects demonstrated measurable improvement in skin barrier resilience and marked reduction in localized erythema.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Prescribed Together Routine Bundle */}
        {relatedProducts.length > 0 && (
          <div style={{
            backgroundColor: 'var(--bg-lavender)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(216, 210, 231, 0.8)',
            padding: '2.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-lavender" style={{ marginBottom: '0.4rem' }}>
                  Doctor Regimen Pairings
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>
                  Frequently Prescribed Together
                </h3>
              </div>

              <button
                onClick={() => {
                  addToCart(product, selectedSize, 1);
                  relatedProducts.forEach(rp => addToCart(rp, rp.sizes?.[0] || '30ml', 1));
                  setIsCartOpen(true);
                  showToast('Added 3-product clinical routine bundle to cart with 15% discount!');
                }}
                className="btn btn-primary btn-md"
              >
                <ShoppingBag size={16} /> Add All 3 to Cart (Save 15%)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <ProductCard product={product} />
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews & Submission Form */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>
                Verified Patient Reviews
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                <StarRating rating={product.rating || 4.9} size={16} />
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{product.rating} out of 5</span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {product.reviews?.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                  border: '1px solid rgba(23, 33, 58, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{rev.name}</span>
                    <span className="badge badge-lavender" style={{ fontSize: '0.65rem' }}>Verified Patient</span>
                  </div>
                  <StarRating rating={rev.rating} size={12} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Skin Type: {rev.skinType || 'Combination'}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* Write a Review Form */}
          <form onSubmit={handleReviewSubmit} style={{
            backgroundColor: 'var(--bg-lavender)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            border: '1px solid rgba(216, 210, 231, 0.8)'
          }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
              Submit Your Clinical Feedback
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Ananya / Priya M."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="form-control"
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(Number(e.target.value))}
                >
                  <option value={5}>5 Stars - Outstanding Efficacy</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Moderate</option>
                  <option value={2}>2 Stars - Mild Reaction</option>
                  <option value={1}>1 Star - Unsatisfied</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Your Skin Type</label>
                <select
                  className="form-control"
                  value={reviewerSkinType}
                  onChange={(e) => setReviewerSkinType(e.target.value)}
                >
                  <option value="Oily / Acne Prone">Oily / Acne Prone</option>
                  <option value="Combination">Combination</option>
                  <option value="Dry / Dehydrated">Dry / Dehydrated</option>
                  <option value="Sensitive & Reactive">Sensitive & Reactive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Clinical Experience Review</label>
              <textarea
                rows="3"
                className="form-control"
                placeholder="Share texture, application notes, and barrier results..."
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
              Submit Verified Patient Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

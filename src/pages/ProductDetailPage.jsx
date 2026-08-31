import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/common/ProductCard';
import PincodeChecker from '../components/common/PincodeChecker';
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
  AlertCircle,
  FlaskConical,
  ArrowRight,
  Send
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, addReview, setIsCartOpen, showToast } = useStore();

  const product = products.find(p => p.id === id || p.slug === id) || products[0];

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    benefits: true,
    inci: true,
    usage: false,
    suitability: false,
    precautions: false
  });

  // Review submission state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewerSkinType, setReviewerSkinType] = useState('Oily / Combination');

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#0F172A', fontFamily: 'var(--font-serif)' }}>Formulation Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const images = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.heroImage];
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 15;
  const reviews = product.reviews || [];

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      showToast('Please complete all review fields.', 'error');
      return;
    }

    if (addReview) {
      addReview(product.id, {
        name: reviewerName.trim(),
        author: reviewerName.trim(),
        rating: Number(reviewerRating),
        comment: reviewerComment.trim(),
        skinType: reviewerSkinType
      });
    }

    showToast('Thank you! Your verified review has been submitted.');
    setReviewerName('');
    setReviewerComment('');
  };

  // Related products
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', padding: '0.85rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#64748B' }}>
            <Link to="/" style={{ color: '#64748B' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: '#64748B' }}>Catalogue</Link>
            <span>/</span>
            <span style={{ color: '#0284C7' }}>{product.category}</span>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: '600' }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'start',
          marginBottom: '4rem'
        }}>
          {/* Left Column: Interactive Image Gallery */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: 'var(--shadow-sm)'
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
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
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
                      border: selectedImageIdx === i ? '2px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.12)',
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
              <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {product.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace' }}>
                SKU: {product.sku || product.id.toUpperCase()}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
              lineHeight: '1.25',
              color: '#0F172A',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-serif)'
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: '0.95rem',
              color: '#64748B',
              lineHeight: '1.6',
              marginBottom: '1.25rem'
            }}>
              {product.tagline}
            </p>

            {/* Real Review or Clinical Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {reviews.length > 0 ? (
                <>
                  <StarRating rating={product.rating || 5} size={16} />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0F172A' }}>
                    {product.rating} / 5.0
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    ({reviews.length} verified review{reviews.length === 1 ? '' : 's'})
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '0.82rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
                  <CheckCircle2 size={14} /> Certified Cosmeceutical Formulation
                </span>
              )}
            </div>

            {/* Active Molecule Highlight Card */}
            {product.activeIngredients && product.activeIngredients.length > 0 && (
              <div style={{
                backgroundColor: '#F0F9FF',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                border: '1px solid #BAE6FD',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                  Key Active Molecule:
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.2rem' }}>
                  🔬 {product.activeIngredients[0].percentage} {product.activeIngredients[0].name}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#334155' }}>
                  {product.activeIngredients[0].role}
                </div>
              </div>
            )}

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A' }}>
                ₹{product.salePrice || product.price}
              </span>
              {product.salePrice && product.price > product.salePrice && (
                <>
                  <span style={{ fontSize: '1.15rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                    ₹{product.price}
                  </span>
                  <span style={{
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid #A7F3D0'
                  }}>
                    Save ₹{product.price - product.salePrice}
                  </span>
                </>
              )}
            </div>

            {/* Stock Availability Indicator */}
            <div style={{ marginBottom: '1.25rem' }}>
              {isOutOfStock ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontSize: '0.85rem', fontWeight: '700' }}>
                  <AlertCircle size={16} /> Currently Out of Stock
                </div>
              ) : isLowStock ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontSize: '0.85rem', fontWeight: '700' }}>
                  <Clock size={16} /> Limited Stock: Only {product.stock} units remaining
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.85rem', fontWeight: '700' }}>
                  <CheckCircle2 size={16} /> In Stock ({product.stock} units available)
                </div>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.5rem' }}>
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
                        border: selectedSize === sz ? '2px solid #0284C7' : '1px solid rgba(15, 23, 42, 0.15)',
                        backgroundColor: selectedSize === sz ? '#F0F9FF' : '#FFFFFF',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        color: '#0F172A',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary CTAs */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #CBD5E1',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: '#FFFFFF'
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  style={{ padding: '0.6rem 0.85rem', border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 0.85rem', fontWeight: '700', fontSize: '0.9rem', color: '#0F172A' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  style={{ padding: '0.6rem 0.85rem', border: 'none', background: 'none', cursor: 'pointer', color: '#0F172A' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn btn-primary"
                style={{
                  flex: '1 1 180px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  opacity: isOutOfStock ? 0.5 : 1,
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingBag size={16} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="btn btn-secondary"
                style={{
                  flex: '1 1 140px',
                  opacity: isOutOfStock ? 0.5 : 1,
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                }}
              >
                Buy Now
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(15, 23, 42, 0.15)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: isWishlisted ? '#EF4444' : '#64748B'
                }}
              >
                <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
              </button>
            </div>

            {/* Pincode & Delivery Availability Checker */}
            <div style={{ marginBottom: '2rem' }}>
              <PincodeChecker />
            </div>

            {/* Trust Assurances */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(15, 23, 42, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={18} style={{ color: '#0284C7' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0F172A' }}>100% Authentic Formula</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Truck size={18} style={{ color: '#0284C7' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0F172A' }}>Delhivery Express</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <RotateCcw size={18} style={{ color: '#0284C7' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0F172A' }}>Safe Clinical Transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Tabs / Accordion Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          overflow: 'hidden',
          marginBottom: '4rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Section 1: Overview & Benefits */}
          <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <button
              onClick={() => toggleSection('benefits')}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
                1. Formulation Overview & Clinical Action
              </span>
              {openSections.benefits ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.benefits && (
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#334155', lineHeight: '1.7', fontSize: '0.92rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  {product.tagline}
                </p>
                {product.doctorNote && (
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderLeft: '3px solid #0284C7',
                    padding: '0.85rem 1rem',
                    borderRadius: '0 4px 4px 0',
                    fontSize: '0.85rem',
                    color: '#0F172A',
                    fontStyle: 'italic'
                  }}>
                    💡 {product.doctorNote}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Active Molecules & Full INCI */}
          <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <button
              onClick={() => toggleSection('inci')}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
                2. Active Molecules & Full INCI Transparency
              </span>
              {openSections.inci ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.inci && (
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                {product.activeIngredients && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {product.activeIngredients.map((act, i) => (
                      <div key={i} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(15, 23, 42, 0.06)' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0284C7', marginBottom: '0.2rem' }}>
                          {act.percentage} {act.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                          {act.role}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {product.fullInci && (
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                      Full INCI Declaration:
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: '1.6', fontFamily: 'monospace', backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
                      {product.fullInci}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 3: How to Use */}
          <div style={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <button
              onClick={() => toggleSection('usage')}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
                3. Application Routine & AM / PM Protocol
              </span>
              {openSections.usage ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {openSections.usage && (
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: '#334155', fontSize: '0.9rem', lineHeight: '1.7' }}>
                {product.howToUse && (
                  <>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      {product.howToUse.am && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FEF3C7', color: '#B45309', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '700' }}>
                          <Sun size={13} /> Morning (AM)
                        </span>
                      )}
                      {product.howToUse.pm && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#EDE9FE', color: '#6D28D9', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '700' }}>
                          <Moon size={13} /> Evening (PM)
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                      {product.howToUse.step}
                    </div>
                    <p style={{ marginBottom: '1rem' }}>
                      {product.howToUse.instructions}
                    </p>
                    {product.howToUse.warning && (
                      <div style={{ backgroundColor: '#FEF2F2', borderLeft: '3px solid #EF4444', padding: '0.75rem 1rem', fontSize: '0.82rem', color: '#991B1B' }}>
                        ⚠️ {product.howToUse.warning}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Real Verified Customer Reviews & Review Submission Form */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          padding: '2rem',
          marginBottom: '4rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
            Customer Feedback & Reviews
          </h2>

          {reviews.length === 0 ? (
            <div style={{ padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)', textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>
                No customer reviews submitted yet. Have you tried this formulation? Share your clinical experience below.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {reviews.map((rev, idx) => (
                <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid rgba(15, 23, 42, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.92rem' }}>{rev.author || rev.name}</span>
                    <StarRating rating={rev.rating} size={14} />
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Write a Review Form */}
          <form onSubmit={handleReviewSubmit} style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(15, 23, 42, 0.08)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
              Write a Verified Review
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Dr. Ananya / Priya S."
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>Rating *</label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional Efficacy)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 - Moderate)</option>
                  <option value={2}>⭐⭐ (2 - Below Expectation)</option>
                  <option value={1}>⭐ (1 - Unsatisfactory)</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>Review & Skin Observations *</label>
              <textarea
                required
                rows={3}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Describe your experience, texture absorption, and results observed over time..."
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Send size={13} /> Submit Review
            </button>
          </form>
        </div>

        {/* Related Formulations */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
              Complementary Formulations
            </h2>
            <Link to="/shop" style={{ color: '#0284C7', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {fallbackRelated.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

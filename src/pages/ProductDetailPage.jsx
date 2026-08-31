import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist, addReview, setIsCartOpen, showToast, user, openMobileOtpModal } = useStore();

  const product = products.find(p => p.id === id || p.slug === id) || products[0];

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Update selected size when product changes
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: '#0F172A', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
          Formulation Not Found
        </h2>
        <Link to="/shop" className="btn btn-primary">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const images = (product.gallery && product.gallery.length > 0) ? product.gallery : [product.heroImage];
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize);
    if (user?.isLoggedIn && user?.phone) {
      navigate('/checkout');
    } else {
      openMobileOtpModal(() => {
        navigate('/checkout');
      });
    }
  };

  // Related formulations
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0
    ? relatedProducts
    : products.filter(p => p.id !== product.id).slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Catalogue', to: '/shop' },
    {
      label: product.category || 'Formulations',
      to: `/shop?category=${encodeURIComponent(product.category || '')}`,
      isHighlight: true
    },
    { label: product.name }
  ];

  return (
    <main
      className="product-detail-page"
      style={{
        backgroundColor: '#F8FAFC',
        minHeight: '100vh',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        width: '100%',
        overflowX: 'clip'
      }}
    >
      {/* 1. Top Breadcrumb Bar */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Main Product Content Container */}
      <div className="container" style={{ paddingTop: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
        {/* Two-Column / Responsive Product Showcase Grid */}
        <div
          className="product-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3.5rem)',
            alignItems: 'start',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
          }}
        >
          {/* Left Column: Interactive Image Gallery */}
          <div className="product-gallery-column" style={{ width: '100%' }}>
            <ProductGallery
              images={images}
              productName={product.name}
              badgeText={product.badge || 'SIGNATURE FORMULATION'}
            />
          </div>

          {/* Right Column: Prescription & Buying Controls */}
          <div className="product-info-column" style={{ width: '100%' }}>
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* 3. Clinical Tabs / Accordion Section */}
        <ProductTabs product={product} />

        {/* 4. Customer Feedback & Verified Reviews */}
        <ProductReviews
          productId={product.id}
          reviews={product.reviews || []}
          rating={product.rating || 5}
          onAddReview={addReview}
          showToast={showToast}
        />

        {/* 5. Complementary Formulations */}
        <RelatedProducts products={fallbackRelated} />
      </div>

      {/* Responsive layout styles for Product Detail Page */}
      <style>{`
        @media (min-width: 1024px) {
          .product-main-grid {
            grid-template-columns: 1fr 1.08fr !important;
          }
          .product-gallery-column {
            position: sticky;
            top: 6rem;
          }
        }
      `}</style>
    </main>
  );
}

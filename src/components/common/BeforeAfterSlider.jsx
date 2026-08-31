import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Baseline (Day 0)',
  afterLabel = 'Verified (Day 28)',
  aspectRatio = '4 / 3'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);

    let observer;
    if (window.ResizeObserver && containerRef.current) {
      observer = new ResizeObserver(updateWidth);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      if (observer) observer.disconnect();
    };
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  // Resolve the single verified face portrait to use across both layers
  const isInvalidOrBottle = (url) => !url || url.includes('1515377905703') || url.includes('1512290900672');

  const facePortrait = (!isInvalidOrBottle(afterImage))
    ? afterImage
    : (!isInvalidOrBottle(beforeImage))
      ? beforeImage
      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid #E2E8F0',
        backgroundColor: '#0F172A'
      }}
    >
      {/* Background Layer: Original / Baseline Skin (Erythema / Tone Texture) */}
      <img
        src={facePortrait}
        alt={afterLabel}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80';
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          filter: 'contrast(1.12) brightness(0.96) saturate(1.22) hue-rotate(-8deg)'
        }}
      />
      {/* Background Natural Erythema / Vascular Tone Tint */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(220, 38, 38, 0.09)',
        mixBlendMode: 'multiply',
        pointerEvents: 'none'
      }} />

      {/* Clipped Overlay: Verified / Post-Treatment Skin (Calmed, Luminous, Clear Skin) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${sliderPosition}%`,
        height: '100%',
        overflow: 'hidden',
        borderRight: '2.5px solid #FFFFFF',
        boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
      }}>
        <img
          src={facePortrait}
          alt={beforeLabel}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80';
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerWidth ? `${containerWidth}px` : '100%',
            height: '100%',
            maxWidth: 'none',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            filter: 'contrast(0.96) brightness(1.05) saturate(0.96)'
          }}
        />
        {/* Subtle Hydration Luminescence Glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Divider Bar & Interactive Pill Handle */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPosition}%`,
        transform: 'translateX(-50%)',
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--teal-800)',
          fontWeight: '800',
          border: '2px solid rgba(23, 33, 58, 0.1)'
        }}>
          ⇄
        </div>
      </div>

      {/* Labels */}
      <span style={{
        position: 'absolute',
        bottom: '0.85rem',
        left: '0.85rem',
        backgroundColor: 'rgba(11, 17, 24, 0.85)',
        backdropFilter: 'blur(4px)',
        color: '#FFFFFF',
        fontSize: '0.72rem',
        fontWeight: '700',
        padding: '0.3rem 0.65rem',
        borderRadius: 'var(--radius-xs)',
        letterSpacing: '0.04em',
        zIndex: 5
      }}>
        {beforeLabel}
      </span>

      <span style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        backgroundColor: 'rgba(15, 118, 110, 0.92)',
        backdropFilter: 'blur(4px)',
        color: '#FFFFFF',
        fontSize: '0.72rem',
        fontWeight: '700',
        padding: '0.3rem 0.65rem',
        borderRadius: 'var(--radius-xs)',
        letterSpacing: '0.04em',
        zIndex: 5
      }}>
        {afterLabel}
      </span>
    </div>
  );
}

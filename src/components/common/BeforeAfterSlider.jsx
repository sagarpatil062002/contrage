import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Day 0 (Baseline)',
  afterLabel = 'Day 28 (After Treatment)',
  aspectRatio = '4 / 3'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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
        border: '1px solid #E2E8F0'
      }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Before Image (Clipped Overlay) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: `${sliderPosition}%`,
        height: '100%',
        overflow: 'hidden',
        borderRight: '2px solid #FFFFFF'
      }}>
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%',
            maxWidth: 'none',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Divider Bar & Handle */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${sliderPosition}%`,
        transform: 'translateX(-50%)',
        width: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: 'var(--teal-800)',
          fontWeight: '800'
        }}>
          ⇄
        </div>
      </div>

      {/* Labels */}
      <span style={{
        position: 'absolute',
        bottom: '0.85rem',
        left: '0.85rem',
        backgroundColor: 'rgba(11, 17, 24, 0.75)',
        backdropFilter: 'blur(4px)',
        color: '#FFFFFF',
        fontSize: '0.72rem',
        fontWeight: '700',
        padding: '0.25rem 0.6rem',
        borderRadius: 'var(--radius-xs)',
        letterSpacing: '0.04em'
      }}>
        {beforeLabel}
      </span>

      <span style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        backgroundColor: 'rgba(15, 118, 110, 0.9)',
        backdropFilter: 'blur(4px)',
        color: '#FFFFFF',
        fontSize: '0.72rem',
        fontWeight: '700',
        padding: '0.25rem 0.6rem',
        borderRadius: 'var(--radius-xs)',
        letterSpacing: '0.04em'
      }}>
        {afterLabel}
      </span>
    </div>
  );
}

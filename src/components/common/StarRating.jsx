import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating = 5, maxStars = 5, size = 14, color = '#D97706' }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(maxStars)].map((_, i) => {
        const fillPercent = Math.max(0, Math.min(1, rounded - i));
        return (
          <div key={i} style={{ position: 'relative', display: 'inline-block', width: size, height: size }}>
            <Star
              size={size}
              color="#CBD5E1"
              fill="#CBD5E1"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            {fillPercent > 0 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${fillPercent * 100}%`,
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}>
                <Star
                  size={size}
                  color={color}
                  fill={color}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

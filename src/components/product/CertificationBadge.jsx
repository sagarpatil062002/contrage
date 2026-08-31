import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function CertificationBadge({ text = 'Certified Cosmeceutical Formulation' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: '#059669',
        fontSize: '0.82rem',
        fontWeight: '700',
        letterSpacing: '0.01em',
        lineHeight: '1.4'
      }}
    >
      <CheckCircle2 size={15} color="#059669" aria-hidden="true" style={{ flexShrink: 0 }} />
      <span>{text}</span>
    </div>
  );
}

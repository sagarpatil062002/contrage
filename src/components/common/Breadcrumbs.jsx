import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [], embedded = false, style = {} }) {
  if (!items || items.length === 0) return null;

  const trail = (
    <div
      className="breadcrumbs-trail"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.3rem 0.45rem',
        fontSize: 'clamp(0.72rem, 1.8vw, 0.8rem)',
        lineHeight: '1.4',
        color: '#64748B',
        ...style
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              minWidth: 0
            }}
          >
            {isLast ? (
              <span
                style={{
                  color: '#0F172A',
                  fontWeight: '700',
                  wordBreak: 'break-word',
                  maxWidth: '100%'
                }}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.to ? (
              <Link
                to={item.to}
                style={{
                  color: item.isHighlight ? '#0284C7' : '#64748B',
                  fontWeight: item.isHighlight ? '600' : '500',
                  transition: 'color 0.15s ease',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#0284C7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = item.isHighlight ? '#0284C7' : '#64748B'; }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  color: item.isHighlight ? '#0284C7' : '#64748B',
                  fontWeight: item.isHighlight ? '600' : '500',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span
                style={{
                  color: '#94A3B8',
                  userSelect: 'none',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                aria-hidden="true"
              >
                /
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <nav aria-label="Breadcrumb" className="breadcrumbs-embedded" style={{ marginBottom: '0.75rem' }}>
        {trail}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="breadcrumbs-wrapper"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
        padding: 'clamp(0.6rem, 1.5vw, 0.8rem) 0',
        width: '100%'
      }}
    >
      <div className="container">
        {trail}
      </div>
    </nav>
  );
}


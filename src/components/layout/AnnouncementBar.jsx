import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const { announcement } = useStore();

  if (!announcement || !announcement.enabled) return null;

  return (
    <aside
      aria-label="Promotional Announcement"
      style={{
        background: 'linear-gradient(90deg, #ECE8F4 0%, #E2E8F5 50%, #ECE8F4 100%)',
        color: '#17213A',
        fontSize: 'clamp(0.72rem, 1.8vw, 0.78rem)',
        fontWeight: '600',
        padding: '0.45rem 1rem',
        textAlign: 'center',
        letterSpacing: '0.02em',
        lineHeight: '1.45',
        position: 'relative',
        zIndex: 50,
        borderBottom: '1px solid rgba(23, 33, 58, 0.08)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem 0.5rem',
          flexWrap: 'wrap',
          textAlign: 'center'
        }}
      >
        <span>{announcement.text}</span>
        {announcement.link && (
          <Link
            to={announcement.link}
            style={{
              color: '#17213A',
              fontWeight: '700',
              textDecoration: 'underline',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              whiteSpace: 'nowrap',
              fontSize: 'inherit'
            }}
          >
            Explore <ArrowRight size={11} aria-hidden="true" />
          </Link>
        )}
      </div>
    </aside>
  );
}

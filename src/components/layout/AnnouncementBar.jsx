import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const { announcement } = useStore();

  if (!announcement || !announcement.enabled) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #EDEAF4 0%, #E5EBF5 50%, #EDEAF4 100%)',
      color: '#17213A',
      fontSize: '0.78rem',
      fontWeight: '600',
      padding: '0.45rem 1rem',
      textAlign: 'center',
      letterSpacing: '0.04em',
      position: 'relative',
      zIndex: 50,
      borderBottom: '1px solid rgba(23, 33, 58, 0.06)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
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
              marginLeft: '0.35rem',
              fontSize: '0.76rem'
            }}
          >
            Explore <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </div>
  );
}

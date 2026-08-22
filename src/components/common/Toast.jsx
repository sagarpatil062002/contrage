import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const bgColors = {
    success: '#0F766E',
    error: '#DC2626',
    info: '#1E293B'
  };

  const icons = {
    success: <CheckCircle2 size={18} color="#5EEAD4" />,
    error: <AlertCircle size={18} color="#FCA5A5" />,
    info: <Info size={18} color="#93C5FD" />
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 200,
      backgroundColor: bgColors[type] || '#1E293B',
      color: '#FFFFFF',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.88rem',
      fontWeight: '500',
      maxWidth: '400px',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      {icons[type] || icons.info}
      <span style={{ flex: 1 }}>{message}</span>
    </div>
  );
}

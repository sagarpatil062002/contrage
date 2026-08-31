import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option...',
  size = 'md',
  disabled = false,
  className = '',
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside or tapping outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const isSmall = size === 'sm';

  const selectedOption = options.find(opt => (typeof opt === 'object' ? opt.value : opt) === value);
  const displayLabel = typeof selectedOption === 'object' 
    ? selectedOption.label 
    : (selectedOption !== undefined && selectedOption !== null && selectedOption !== '' ? selectedOption : placeholder);

  const handleSelect = (val) => {
    if (disabled) return;
    if (onChange) {
      // Handle both direct value passing and event-like objects
      onChange(val);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        ...style
      }}
      className={`custom-select-container ${className}`}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isSmall ? '0.45rem 0.75rem' : '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: isOpen ? '1px solid var(--accent-navy)' : '1px solid var(--border-medium)',
          backgroundColor: disabled ? '#F1F5F9' : '#FFFFFF',
          color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
          fontSize: isSmall ? '0.82rem' : '0.92rem',
          lineHeight: '1.4',
          textAlign: 'left',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxSizing: 'border-box',
          boxShadow: isOpen ? '0 0 0 3px rgba(15, 23, 42, 0.08)' : 'none',
          transition: 'all 0.15s ease'
        }}
      >
        <span style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginRight: '0.5rem',
          fontWeight: isSmall ? '600' : '500',
          color: selectedOption ? 'var(--text-primary)' : 'var(--text-muted)'
        }}>
          {displayLabel}
        </span>
        <ChevronDown
          size={isSmall ? 14 : 16}
          color="#64748B"
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
        />
      </button>

      {/* Dropdown Options Popup */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
            zIndex: 1050,
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '0.35rem 0',
            boxSizing: 'border-box'
          }}
        >
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            const isSelected = optVal === value;

            return (
              <div
                key={optVal}
                onClick={() => handleSelect(optVal)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: isSmall ? '0.5rem 0.75rem' : '0.65rem 1rem',
                  fontSize: isSmall ? '0.8rem' : '0.88rem',
                  color: isSelected ? 'var(--accent-navy)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--bg-primary)' : 'transparent',
                  fontWeight: isSelected ? '700' : '400',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s ease',
                  borderLeft: isSelected ? '3px solid var(--accent-navy)' : '3px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {optLabel}
                </span>
                {isSelected && <Check size={isSmall ? 13 : 14} color="var(--accent-navy)" style={{ flexShrink: 0, marginLeft: '0.5rem' }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

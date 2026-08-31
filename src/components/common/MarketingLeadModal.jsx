import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import CustomSelect from './CustomSelect';
import {
  Sparkles,
  X,
  Gift,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MarketingLeadModal() {
  const { addMarketingLead, applyCoupon, showToast } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isPillDismissed, setIsPillDismissed] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(() => {
    return localStorage.getItem('contrage_lead_modal_dismissed') === 'true';
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    skinConcern: 'Acne & Blemishes',
    skinType: 'Combination',
    channels: {
      email: true,
      whatsapp: true,
      sms: true
    }
  });

  // Auto trigger after 5 seconds if not previously dismissed
  useEffect(() => {
    if (!hasDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    localStorage.setItem('contrage_lead_modal_dismissed', 'true');
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setLeadForm({ ...leadForm, [e.target.name]: e.target.value });
  };

  const handleChannelToggle = (channel) => {
    setLeadForm(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: !prev.channels[channel]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leadForm.name || !leadForm.email || !leadForm.phone) {
      showToast('Please enter your Name, Email, and WhatsApp number.', 'error');
      return;
    }

    addMarketingLead(leadForm);
    applyCoupon('CONTRAGE10');

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setIsSuccess(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CONTRAGE10');
    setCopied(true);
    showToast('Promo code CONTRAGE10 copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating Trigger Pill (always accessible on storefront unless dismissed) */}
      {!isOpen && !isPillDismissed && (
        <div
          style={{
            position: 'fixed',
            bottom: 'clamp(12px, 2.5vw, 24px)',
            left: 'clamp(12px, 2.5vw, 24px)',
            zIndex: 998,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0F172A',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.3)',
            padding: '2px',
            maxWidth: 'calc(100vw - 24px)'
          }}
        >
          <button
            onClick={handleOpen}
            aria-label="Get 10% Off VIP Discount Code"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              padding: 'clamp(0.4rem, 1vw, 0.55rem) clamp(0.65rem, 1.5vw, 0.95rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: 'clamp(0.72rem, 1.6vw, 0.82rem)',
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '0.01em'
            }}
          >
            <Gift size={14} color="#FBBF24" aria-hidden="true" style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>Get 10% Off VIP</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPillDismissed(true);
            }}
            aria-label="Dismiss discount badge"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#CBD5E1',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginRight: '4px',
              flexShrink: 0
            }}
            title="Dismiss"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(23, 33, 58, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              position: 'relative',
              animation: 'fadeInUp 0.3s ease-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            {/* Header / Gradient Accent */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--accent-slate) 100%)',
                padding: '2rem 2rem 1.75rem 2rem',
                color: '#FFFFFF',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}
              >
                <Sparkles size={13} color="#FBBF24" />
                DR. SIDDHI CLINICAL ADVISORY
              </div>

              <h2
                style={{
                  fontSize: '1.75rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  marginBottom: '0.5rem'
                }}
              >
                Unlock 10% Off Your Routine
              </h2>

              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.5 }}>
                Join our VIP Patient Club. Receive personalized routine recommendations and instant promo codes via WhatsApp & Email.
              </p>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              {isSuccess ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-emerald-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem auto'
                    }}
                  >
                    <CheckCircle2 size={32} color="var(--accent-emerald)" />
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Welcome to Contrage VIP!
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    Your 10% welcome coupon has been activated and applied to your cart.
                  </p>

                  {/* Promo Box */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '2px dashed var(--accent-slate)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        YOUR 10% DISCOUNT CODE
                      </div>
                      <div style={{ fontSize: '1.3rem', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>
                        CONTRAGE10
                      </div>
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="btn btn-secondary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.85rem' }}
                    >
                      {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <button
                    onClick={handleClose}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                  >
                    Start Shopping Formulations &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Meera Nambiar"
                      value={leadForm.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(23, 33, 58, 0.15)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@email.com"
                        value={leadForm.email}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(23, 33, 58, 0.15)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={leadForm.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(23, 33, 58, 0.15)',
                          fontSize: '0.88rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      Primary Skin Concern (For Custom Routine Advice):
                    </label>
                    <CustomSelect
                      value={leadForm.skinConcern}
                      onChange={(val) => setLeadForm(prev => ({ ...prev, skinConcern: val }))}
                      options={[
                        { label: 'Acne & Active Blemishes', value: 'Acne & Blemishes' },
                        { label: 'Hyperpigmentation & Melasma', value: 'Hyperpigmentation & Dark Spots' },
                        { label: 'Open Pores & Excess Sebum', value: 'Open Pores & Oiliness' },
                        { label: 'Compromised Barrier & Redness', value: 'Damaged Barrier & Redness' },
                        { label: 'Aging & Fine Lines', value: 'Aging & Fine Lines' },
                        { label: 'Dryness & Rough Texture', value: 'Dryness & Dehydration' }
                      ]}
                    />
                  </div>

                  {/* Multi-channel Opt-in checkboxes */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem'
                    }}
                  >
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={leadForm.channels.whatsapp}
                        onChange={() => handleChannelToggle('whatsapp')}
                      />
                      <span>Receive VIP discounts & order updates via <strong>WhatsApp</strong></span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={leadForm.channels.email}
                        onChange={() => handleChannelToggle('email')}
                      />
                      <span>Receive dermatological routine insights via <strong>Email</strong></span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={leadForm.channels.sms}
                        onChange={() => handleChannelToggle('sms')}
                      />
                      <span>Receive flash drop alerts via <strong>SMS</strong></span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '0.92rem' }}
                  >
                    Unlock 10% Discount Code &rarr;
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.75rem'
                    }}
                  >
                    <ShieldCheck size={14} color="var(--accent-emerald)" />
                    Zero spam. Unsubscribe anytime with 1-click.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

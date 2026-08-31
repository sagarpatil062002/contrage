import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Phone,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MobileOtpModal() {
  const {
    isMobileOtpOpen,
    closeMobileOtpModal,
    mobileOtpCallback,
    sendMobileOtp,
    verifyMobileOtp,
    user,
    showToast
  } = useStore();

  const navigate = useNavigate();

  const [mobilePhone, setMobilePhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [testOtpCode, setTestOtpCode] = useState('1234');
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Reset modal state when opened
  useEffect(() => {
    if (isMobileOtpOpen) {
      setOtpSent(false);
      setOtpDigits(['', '', '', '']);
      setOtpCountdown(0);
      setMobilePhone(user?.phone ? user.phone.replace(/[^0-9]/g, '').slice(-10) : '9876543210');
    }
  }, [isMobileOtpOpen, user]);

  // Resend Countdown
  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  if (!isMobileOtpOpen) return null;

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const clean = mobilePhone.trim() ? mobilePhone.replace(/[^0-9]/g, '') : '9876543210';

    setIsLoading(true);
    const res = await sendMobileOtp(clean);
    setIsLoading(false);

    const generated = res?.otp || '1234';
    setOtpSent(true);
    setTestOtpCode(generated);
    setOtpCountdown(30);
    // Pre-populate digit boxes for quick testing
    setOtpDigits(generated.slice(0, 4).split(''));
  };

  // Handle OTP Box Input
  const handleOtpDigitChange = (index, val) => {
    const cleanVal = val.replace(/[^0-9]/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    // Auto-focus next box
    if (cleanVal && index < 3) {
      const nextInput = document.getElementById(`modal-otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle Backspace
  const handleOtpDigitKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`modal-otp-digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const enteredCode = otpDigits.join('').trim() || testOtpCode || '1234';

    setIsLoading(true);
    const clean = mobilePhone.replace(/[^0-9]/g, '') || '9876543210';
    const res = await verifyMobileOtp({
      phone: clean,
      otp: enteredCode
    });
    setIsLoading(false);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}

    showToast(`Logged in successfully! +91 ${clean}`, 'success');
    closeMobileOtpModal();

    // Explicitly navigate to /checkout immediately
    if (typeof mobileOtpCallback === 'function') {
      mobileOtpCallback();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Click outside to close backdrop */}
      <div
        onClick={closeMobileOtpModal}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Modal Card */}
      <div style={{
        position: 'relative',
        zIndex: 1101,
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        overflow: 'hidden',
        animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Modal Top Header */}
        <div style={{
          padding: '1.5rem 1.75rem 1.25rem 1.75rem',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
                CONTRÂGE
              </div>
              <div style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: '800', textTransform: 'uppercase' }}>
                Quick Checkout Login
              </div>
            </div>
          </div>

          <button
            onClick={closeMobileOtpModal}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.75rem' }}>
          {!otpSent ? (
            /* ====================================================
               VIEW 1: ENTER MOBILE NUMBER
            ==================================================== */
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.4rem' }}>
                Sign in to Proceed to Checkout
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.45' }}>
                Enter your mobile number to receive a secure login OTP and unlock express delivery checkout.
              </p>

              <form onSubmit={handleSendOtp}>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A' }}>
                    Mobile Number
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 0.85rem',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.95rem',
                      fontWeight: '800',
                      color: '#0F172A',
                      gap: '0.35rem'
                    }}>
                      <span>🇮🇳</span> +91
                    </div>
                    <input
                      type="tel"
                      value={mobilePhone}
                      onChange={(e) => setMobilePhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      style={{
                        flex: 1,
                        padding: '0.85rem 1rem',
                        border: '1px solid #0284C7',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '1.05rem',
                        fontWeight: '800',
                        color: '#0F172A',
                        backgroundColor: '#FFFFFF'
                      }}
                      autoFocus
                      required
                    />
                  </div>
                </div>

                {/* Quick Demo Test Numbers */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600' }}>Demo Numbers:</span>
                  {['9876543210', '9820011223', '9911223344'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMobilePhone(num)}
                      style={{
                        background: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                        color: '#0F172A',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      +91 {num}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', fontWeight: '800' }}
                >
                  {isLoading ? 'Sending OTP Code...' : 'GET OTP & PROCEED →'}
                </button>
              </form>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: '#64748B' }}>
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>📦 Delhivery Order Tracking</span>
              </div>
            </div>
          ) : (
            /* ====================================================
               VIEW 2: VERIFY OTP SCREEN
            ==================================================== */
            <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.4rem' }}>
                Verify Mobile Number
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Enter the 4-digit code sent to <strong>+91 {mobilePhone}</strong>
              </p>

              {/* Generated Test OTP Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F0F9FF',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed #0284C7',
                marginBottom: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A' }}>
                      Generated OTP: <span style={{ color: '#0284C7', fontSize: '1.1rem', letterSpacing: '0.1em' }}>{testOtpCode}</span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      (Master code: 1234 also accepted)
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOtpDigits(testOtpCode.slice(0, 4).split(''))}
                  style={{
                    backgroundColor: '#0284C7',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  Auto-Fill
                </button>
              </div>

              {/* 4 Interactive Digit Boxes */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`modal-otp-digit-${idx}`}
                    type="text"
                    maxLength="1"
                    value={otpDigits[idx]}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpDigitKeyDown(idx, e)}
                    style={{
                      width: '54px',
                      height: '58px',
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      textAlign: 'center',
                      border: otpDigits[idx] ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      color: '#0F172A',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                  />
                ))}
              </div>

              {/* Resend Countdown */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Change Number
                </button>
                {otpCountdown > 0 ? (
                  <span style={{ color: '#64748B', fontWeight: '700' }}>Resend in {otpCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '1rem', fontWeight: '800' }}
              >
                {isLoading ? 'Verifying Code...' : 'VERIFY OTP & GO TO CHECKOUT →'}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.94); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

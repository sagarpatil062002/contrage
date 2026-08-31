import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';

export default function PincodeChecker({ compact = false }) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();

    if (!pincode || pincode.trim().length !== 6 || isNaN(pincode)) {
      setResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian Postal PIN code.'
      });
      return;
    }

    setIsChecking(true);

    setTimeout(() => {
      setIsChecking(false);
      const pinPrefix = pincode.substring(0, 2);

      // Metro hubs
      const isMetro = ['11', '12', '40', '41', '56', '50', '60', '70'].includes(pinPrefix);
      const isRemote = ['79', '19', '18'].includes(pinPrefix);

      const today = new Date();
      const addDays = isMetro ? 2 : isRemote ? 5 : 3;
      const etaDate = new Date(today.setDate(today.getDate() + addDays));
      const etaFormatted = etaDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      setResult({
        valid: true,
        pincode: pincode.trim(),
        eta: etaFormatted,
        slaDays: isMetro ? '2–3 Business Days' : isRemote ? '5–7 Business Days' : '3–5 Business Days',
        carrier: 'Delhivery Surface & Express Air',
        isMetro,
        codAvailable: true,
        freeShippingAvailable: true
      });
    }, 350);
  };

  return (
    <div
      style={{
        backgroundColor: compact ? 'var(--bg-primary)' : '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(23, 33, 58, 0.1)',
        padding: compact ? '0.85rem 1rem' : '1.25rem',
        marginTop: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
        <Truck size={16} color="var(--accent-blue-dark)" />
        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          Delhivery Delivery & Pincode Serviceability
        </span>
      </div>

      <form onSubmit={handleCheck} style={{ display: 'flex', gap: '0.5rem', marginBottom: result ? '0.75rem' : '0' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <MapPin
            size={14}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid rgba(23, 33, 58, 0.18)',
              fontSize: '0.82rem',
              backgroundColor: '#FFFFFF'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isChecking}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', minWidth: '70px' }}
        >
          {isChecking ? 'Checking...' : 'Check'}
        </button>
      </form>

      {result && result.valid && (
        <div
          style={{
            backgroundColor: 'var(--accent-emerald-light)',
            border: '1px solid rgba(67, 142, 117, 0.25)',
            borderRadius: 'var(--radius-xs)',
            padding: '0.65rem 0.85rem',
            fontSize: '0.78rem',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            animation: 'fadeIn 0.2s ease-in'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
            <CheckCircle2 size={14} />
            <span>Serviceable via Delhivery Express!</span>
          </div>

          <div>
            Estimated Delivery: <strong>{result.eta}</strong> ({result.slaDays})
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
            <span>✓ Cash on Delivery (COD) Available</span>
            <span>✓ Free Express Shipping on ₹499+</span>
          </div>
        </div>
      )}

      {result && !result.valid && (
        <div
          style={{
            backgroundColor: 'var(--accent-rose-light)',
            border: '1px solid rgba(217, 107, 125, 0.25)',
            borderRadius: 'var(--radius-xs)',
            padding: '0.5rem 0.75rem',
            fontSize: '0.75rem',
            color: 'var(--accent-rose)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.5rem'
          }}
        >
          <AlertCircle size={14} />
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
}

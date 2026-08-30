import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { api } from '../../services/api';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SkinDiagnosticQuiz() {
  const { products, addToCart, setIsCartOpen, setQuizResult, showToast } = useStore();

  const [step, setStep] = useState(1);
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSensitivity, setSelectedSensitivity] = useState('');
  const [isPrescribing, setIsPrescribing] = useState(false);
  const [prescribedRoutine, setPrescribedRoutine] = useState(null);

  const skinTypes = [
    { id: 'Oily', label: 'Oily & Sebum Prone', desc: 'Prone to excess shine, congestion, and visible pores' },
    { id: 'Combination', label: 'Combination', desc: 'Oily T-zone with normal to dry cheeks' },
    { id: 'Dry', label: 'Dry & Dehydrated', desc: 'Tightness, rough texture, and compromised lipid barrier' },
    { id: 'Sensitive', label: 'Reactive & Sensitive', desc: 'Prone to flushing, stinging, and redness' }
  ];

  const concerns = [
    { id: 'Acne & Blemishes', label: 'Acne & Breakouts', desc: 'Active papules, whiteheads, blackheads, and post-acne marks' },
    { id: 'Hyperpigmentation', label: 'Dark Spots & Pigment', desc: 'Melasma, sun spots, and uneven tone' },
    { id: 'Damaged Barrier', label: 'Damaged Barrier', desc: 'Stinging, moisture loss, and compromised stratum corneum' },
    { id: 'Aging & Fine Lines', label: 'Aging & Fine Lines', desc: 'Loss of elasticity, collagen depletion, and crow\'s feet' },
    { id: 'Open Pores & Oiliness', label: 'Open Pores & Texture', desc: 'Enlarged pore architecture and uneven skin relief' }
  ];

  const sensitivities = [
    { id: 'Resilient', label: 'High Active Tolerance', desc: 'Skin easily tolerates acids, retinoids, and high-potency actives' },
    { id: 'Moderate', label: 'Moderate Tolerance', desc: 'Occasional mild tingling with new actives' },
    { id: 'High', label: 'Highly Reactive', desc: 'Flushes easily, requires gentle encapsulation and barrier support' }
  ];

  const handleGenerateRegimen = () => {
    setIsPrescribing(true);

    setTimeout(() => {
      let cleanseProd = products.find(p => p.category.includes('Cleanser')) || products[0];
      let treatProd = products.find(p => p.primaryConcern === selectedConcern) || products[1];
      let protectProd = products.find(p => p.category.includes('Moisturizer') || p.category.includes('Sun')) || products[2];

      const routine = {
        skinType: selectedSkinType,
        concern: selectedConcern,
        sensitivity: selectedSensitivity,
        steps: [
          { stepNum: 'Step 1: Purify', role: 'Cleanser', product: cleanseProd, protocol: 'Gentle pH-balanced morning and evening cleanse' },
          { stepNum: 'Step 2: Treat', role: 'Active Serum', product: treatProd, protocol: 'Apply 3-4 drops directly onto dry epidermis' },
          { stepNum: 'Step 3: Fortify', role: 'Barrier Seal', product: protectProd, protocol: 'Seal in hydration and provide photoprotection' }
        ],
        bundleDiscountPercent: 15,
        totalOriginalPrice: (cleanseProd.price || 599) + (treatProd.price || 799) + (protectProd.price || 699),
        totalDiscountedPrice: Math.round(((cleanseProd.price || 599) + (treatProd.price || 799) + (protectProd.price || 699)) * 0.85)
      };

      setPrescribedRoutine(routine);
      setQuizResult(routine);
      const token = localStorage.getItem('contrage_token');
      if (token) {
        api.auth.saveQuiz({
          skinType: selectedSkinType,
          primaryConcern: selectedConcern,
          tolerance: selectedSensitivity,
          routine: routine.steps.map(s => s.product?.name)
        }).catch(() => {});
      }
      setIsPrescribing(false);
      setStep(4);

      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 900);
  };

  const handleAddBundleToCart = () => {
    if (!prescribedRoutine) return;
    prescribedRoutine.steps.forEach(s => {
      addToCart(s.product, s.product.sizes?.[0] || '30ml', 1);
    });
    showToast('Prescribed 3-step routine bundle added to your cart with 15% discount!');
    setIsCartOpen(true);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSkinType('');
    setSelectedConcern('');
    setSelectedSensitivity('');
    setPrescribedRoutine(null);
  };

  return (
    <section id="skin-quiz" className="section-padding" style={{
      background: 'linear-gradient(135deg, #F2F5FA 0%, #EDEAF4 50%, #F7F5F7 100%)',
      borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Bubbles */}
      <div className="ethereal-bubble animate-float-slow" style={{ top: '8%', right: '8%', width: '50px', height: '50px' }} />
      <div className="ethereal-bubble animate-float-alt" style={{ bottom: '10%', left: '8%', width: '40px', height: '40px' }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem'
          }}>
            PRECISION CONSULTATION
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.7rem)',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)'
          }}>
            Skin Diagnostic Consultation
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Answer 3 quick dermatological questions to generate your custom AM/PM formulation regimen.
          </p>
        </div>

        {/* Wizard Container */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          boxShadow: 'var(--shadow-luxury)',
          padding: 'clamp(1.5rem, 4vw, 3rem)'
        }}>
          {/* Progress Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  style={{
                    width: s <= step ? '28px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: s <= step ? 'var(--accent-navy)' : '#E2E8F0',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {step === 4 ? 'Regimen Prescribed' : `Step ${step} of 3`}
            </span>
          </div>

          {/* STEP 1: Skin Type */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                1. What is your baseline skin type?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                How does your skin feel 1 hour after cleansing without any moisturizers applied?
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {skinTypes.map(st => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedSkinType(st.id)}
                    style={{
                      textAlign: 'left',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedSkinType === st.id ? '2px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.1)',
                      backgroundColor: selectedSkinType === st.id ? 'var(--bg-lavender)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {st.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {st.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  disabled={!selectedSkinType}
                  onClick={() => setStep(2)}
                  className="btn btn-primary"
                  style={{ opacity: selectedSkinType ? 1 : 0.5 }}
                >
                  Continue to Concerns <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Primary Concern */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                2. What is your primary dermatological target?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select the skin condition you would like our clinical actives to prioritize.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {concerns.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedConcern(c.id)}
                    style={{
                      textAlign: 'left',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedConcern === c.id ? '2px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.1)',
                      backgroundColor: selectedConcern === c.id ? 'var(--bg-lavender)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {c.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-light">
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={!selectedConcern}
                  onClick={() => setStep(3)}
                  className="btn btn-primary"
                  style={{ opacity: selectedConcern ? 1 : 0.5 }}
                >
                  Continue to Sensitivity <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Sensitivity */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                3. What is your active tolerance & sensitivity?
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                This helps us determine molecule encapsulation and pH buffering strength.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {sensitivities.map(sen => (
                  <button
                    key={sen.id}
                    type="button"
                    onClick={() => setSelectedSensitivity(sen.id)}
                    style={{
                      textAlign: 'left',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedSensitivity === sen.id ? '2px solid var(--accent-navy)' : '1px solid rgba(23, 33, 58, 0.1)',
                      backgroundColor: selectedSensitivity === sen.id ? 'var(--bg-lavender)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {sen.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {sen.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setStep(2)} className="btn btn-light">
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={!selectedSensitivity || isPrescribing}
                  onClick={handleGenerateRegimen}
                  className="btn btn-primary"
                  style={{ opacity: selectedSensitivity ? 1 : 0.5 }}
                >
                  {isPrescribing ? 'Analyzing Skin Profile...' : (
                    <>
                      <Sparkles size={16} /> Generate Regimen
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Generated Routine */}
          {step === 4 && prescribedRoutine && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="badge badge-lavender" style={{ marginBottom: '0.5rem' }}>
                  Prescription Protocol Generated
                </span>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', margin: '0.35rem 0' }}>
                  Targeted Regimen for {prescribedRoutine.skinType} Skin
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Formulated for <strong>{prescribedRoutine.concern}</strong> • {prescribedRoutine.sensitivity} Tolerance
                </p>
              </div>

              {/* 3 Step Regimen Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {prescribedRoutine.steps.map((st, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.25rem',
                      border: '1px solid rgba(23, 33, 58, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#6C5B8B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                        {st.stepNum}
                      </div>
                      <img
                        src={st.product.heroImage}
                        alt={st.product.name}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', marginBottom: '0.75rem' }}
                      />
                      <div style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {st.product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {st.protocol}
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      ₹{st.product.salePrice || st.product.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Card */}
              <div style={{
                backgroundColor: 'var(--bg-lavender)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.5rem',
                border: '1px solid rgba(216, 210, 231, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    Complete 3-Step Routine Bundle (Save 15%)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Includes Cleanser + Active Treatment Serum + Barrier Moisturizer
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      ₹{prescribedRoutine.totalDiscountedPrice}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ₹{prescribedRoutine.totalOriginalPrice}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBundleToCart}
                    className="btn btn-primary btn-md"
                  >
                    <ShoppingBag size={16} /> Add All 3 to Cart
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <RotateCcw size={13} /> Retake Diagnostic Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

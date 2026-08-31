import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import CustomSelect from '../components/common/CustomSelect';
import {
  Stethoscope,
  Building2,
  Percent,
  FileSpreadsheet,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Download,
  Clock,
  PhoneCall,
  Mail,
  FlaskConical,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function DermatologistB2BPage() {
  const { products, addDermatologistInquiry, showToast } = useStore();

  // Tier Calculator State
  const [selectedUnits, setSelectedUnits] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || 'p-1');

  // Form State
  const [formData, setFormData] = useState({
    doctorName: '',
    clinicName: '',
    licenseNumber: '',
    gstin: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    estimatedMonthlyUnits: '50-100 units',
    selectedProducts: [products[0]?.name || '10% Niacinamide Serum', products[3]?.name || '3% Ceramide Complex Cream'],
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Discount Calculation logic
  let discountPercent = 35;
  let tierLabel = 'Tier 1 (20–49 units)';
  if (selectedUnits >= 100) {
    discountPercent = 50;
    tierLabel = 'Tier 3 (100+ units - Platinum Partner)';
  } else if (selectedUnits >= 50) {
    discountPercent = 45;
    tierLabel = 'Tier 2 (50–99 units - Gold Partner)';
  }

  const activeProductObj = products.find(p => p.id === selectedProduct) || products[0];
  const unitMsp = activeProductObj?.salePrice || 549;
  const grossTotal = unitMsp * selectedUnits;
  const wholesaleDiscountAmount = Math.round(grossTotal * (discountPercent / 100));
  const netSubtotal = grossTotal - wholesaleDiscountAmount;
  const gstAmount = Math.round(netSubtotal * 0.18);
  const estimatedTotalWithGst = netSubtotal + gstAmount;
  const perUnitWholesaleCost = Math.round(netSubtotal / selectedUnits);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductToggle = (prodName) => {
    setFormData(prev => {
      const exists = prev.selectedProducts.includes(prodName);
      if (exists) {
        return { ...prev, selectedProducts: prev.selectedProducts.filter(p => p !== prodName) };
      } else {
        return { ...prev, selectedProducts: [...prev.selectedProducts, prodName] };
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.doctorName || !formData.clinicName || !formData.email || !formData.phone) {
      showToast('Please fill in required fields: Doctor Name, Clinic Name, Email & Phone.', 'error');
      return;
    }

    addDermatologistInquiry({
      doctorName: formData.doctorName,
      clinicName: formData.clinicName,
      licenseNumber: formData.licenseNumber || 'Verification Pending',
      gstin: formData.gstin || 'N/A',
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      estimatedMonthlyUnits: formData.estimatedMonthlyUnits,
      selectedTier: tierLabel,
      preferredProducts: formData.selectedProducts,
      notes: formData.notes
    });

    setIsSubmitted(true);
  };

  const handleDownloadProforma = () => {
    const proformaContent = `
=====================================================
CONTRAGE CLINICAL SKINCARE - B2B WHOLESALE PROFORMA
Founder: Dr. Siddhi | Dermatological Advisory Board
=====================================================
Date: ${new Date().toLocaleDateString('en-IN')}
Proforma Reference: PRO-${Math.floor(100000 + Math.random() * 900000)}

PRODUCT SELECTION:
Item: ${activeProductObj.name}
Standard Retail Price: Rs. ${unitMsp} per unit
Order Quantity: ${selectedUnits} units
Standard Gross Value: Rs. ${grossTotal.toLocaleString('en-IN')}

WHOLESALE APPLIED DISCOUNT:
Wholesale Tier: ${tierLabel}
Discount Rate: ${discountPercent}% (- Rs. ${wholesaleDiscountAmount.toLocaleString('en-IN')})
Net Taxable Subtotal: Rs. ${netSubtotal.toLocaleString('en-IN')}
Net Effective Cost / Unit: Rs. ${perUnitWholesaleCost} per unit

TAXES & LOGISTICS:
Input Tax Credit GST (18%): Rs. ${gstAmount.toLocaleString('en-IN')}
Delhivery Cold-Chain Logistics: FREE (Eligible on 20+ units)
-----------------------------------------------------
ESTIMATED INVOICE TOTAL: Rs. ${estimatedTotalWithGst.toLocaleString('en-IN')}
-----------------------------------------------------

CLINIC COMPLIANCE & TERMS:
1. Formulations are dispatched in UV-shielded temperature-stabilized cartons.
2. Invoiced with complete 18% GST Input Credit for clinic accounting.
3. For immediate dispatch assistance, WhatsApp our B2B Desk at +91 98112 00445.
=====================================================
    `.trim();

    const blob = new Blob([proformaContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Contrage_B2B_Proforma_${activeProductObj.slug || 'quote'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Proforma quote successfully generated and downloaded.');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* 1. Header Banner */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
        padding: '3.5rem 0 3rem 0',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                backgroundColor: 'var(--bg-lavender)',
                color: 'var(--accent-lavender-dark)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1rem'
              }}>
                <Stethoscope size={15} />
                Dermatologist & Clinic Wholesale Program
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1rem',
                fontFamily: 'var(--font-serif)'
              }}>
                Clinical Formulations for Aesthetic Clinics & Dermatologists
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                Formulated under the medical supervision of <strong>Dr. Siddhi</strong>. Contrage provides direct wholesale supply, high-margin retail dispensing, and procedural backbar formulations for licensed dermatologists, plastic surgeons, and medical spas across India.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <a href="#calculator" className="btn btn-primary btn-sm">
                  Calculate Bulk Margins &rarr;
                </a>
                <a href="#inquiry-form" className="btn btn-secondary btn-sm">
                  Register Your Clinic
                </a>
              </div>
            </div>

            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              border: '1px solid #E2E8F0',
              position: 'relative',
              height: 'clamp(260px, 35vw, 380px)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80"
                alt="Aesthetic Clinic Backbar Dispensing"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '0.85rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#5EEAD4', fontWeight: '800' }}>
                  Professional Clinic Backbar
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>
                  Sterile Cosmeceuticals • Cold-Chain Dispensing • 35–50% Margins
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Benefits */}
      <section className="container" style={{ marginTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            {
              icon: <Percent size={24} color="#6C5B8B" />,
              title: '35% to 50% Margins',
              desc: 'High-margin wholesale pricing structure designed for clinic backbar and direct patient retail counters.'
            },
            {
              icon: <FileSpreadsheet size={24} color="#3B5D92" />,
              title: '18% GST Input Credit',
              desc: 'Automated B2B GST tax invoicing for effortless business tax input credit reconciliation.'
            },
            {
              icon: <Truck size={24} color="#438E75" />,
              title: 'Delhivery Express Cargo',
              desc: 'Temperature-stabilized express air/surface shipping with priority dispatch and live tracking.'
            },
            {
              icon: <Award size={24} color="#C28E46" />,
              title: 'Doctor Prescribing Kits',
              desc: 'Complimentary patient routine cards, prescription pads, and active concentration ingredient guides.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '1px solid rgba(23, 33, 58, 0.08)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Tier Calculator & Proforma Estimator */}
      <section id="calculator" className="container" style={{ marginTop: '3.5rem' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '2rem 2.5rem',
            borderBottom: '1px solid rgba(23, 33, 58, 0.08)',
            backgroundColor: 'var(--bg-light-blue)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-blue-dark)', marginBottom: '0.25rem' }}>
                B2B MARGIN & REVENUE ESTIMATOR
              </div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>
                Interactive Wholesale Discount Calculator
              </h2>
            </div>

            <button
              onClick={handleDownloadProforma}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={15} /> Download Proforma (TXT)
            </button>
          </div>

          <div style={{
            padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'center'
          }}>
            {/* Calculator Controls */}
            <div>
              {/* Product selector */}
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Select Clinical Formulation:
              </label>
              <CustomSelect
                value={selectedProduct}
                onChange={setSelectedProduct}
                options={products.map(p => ({
                  label: `${p.name} (Retail ₹${p.salePrice})`,
                  value: p.id
                }))}
                style={{ marginBottom: '1.5rem' }}
              />

              {/* Quantity Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Order Quantity:
                  </label>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-blue-dark)' }}>
                    {selectedUnits} Units
                  </span>
                </div>

                <input
                  type="range"
                  min="20"
                  max="250"
                  step="5"
                  value={selectedUnits}
                  onChange={(e) => setSelectedUnits(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#3B5D92' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  <span>20 units (35% Off)</span>
                  <span>50 units (45% Off)</span>
                  <span>100+ units (50% Off)</span>
                </div>
              </div>

              {/* Tier Pills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 90px), 1fr))',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                {[
                  { count: 20, pct: '35%', label: 'Tier 1' },
                  { count: 50, pct: '45%', label: 'Tier 2' },
                  { count: 100, pct: '50%', label: 'Tier 3' }
                ].map((tier, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedUnits(tier.count)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedUnits >= tier.count && (idx === 2 || (idx === 1 && selectedUnits < 100) || (idx === 0 && selectedUnits < 50))
                        ? '2px solid var(--accent-blue-dark)'
                        : '1px solid rgba(23, 33, 58, 0.1)',
                      backgroundColor: selectedUnits >= tier.count && (idx === 2 || (idx === 1 && selectedUnits < 100) || (idx === 0 && selectedUnits < 50))
                        ? 'var(--bg-soft-blue)'
                        : 'transparent',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{tier.label}</div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{tier.pct} OFF</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid rgba(23, 33, 58, 0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(23, 33, 58, 0.08)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Wholesale Tier</span>
                <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>{tierLabel}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Gross Retail Value:</span>
                <span style={{ fontWeight: '600' }}>₹{grossTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
                <span>Wholesale Discount ({discountPercent}%):</span>
                <span style={{ fontWeight: '700' }}>-₹{wholesaleDiscountAmount.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: '600' }}>₹{netSubtotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GST (18% Input Credit):</span>
                <span style={{ fontWeight: '600' }}>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delhivery Cargo Shipping:</span>
                <span style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>FREE (Insured)</span>
              </div>

              <div style={{
                paddingTop: '1rem',
                borderTop: '2px dashed rgba(23, 33, 58, 0.15)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated B2B Invoice:</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                    ₹{estimatedTotalWithGst.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Effective Cost / Unit:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-blue-dark)' }}>
                    ₹{perUnitWholesaleCost} <span style={{ fontSize: '0.75rem', fontWeight: '400', color: 'var(--text-muted)' }}>/ unit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Clinic Onboarding & Bulk Inquiry Form */}
      <section id="inquiry-form" className="container" style={{ marginTop: '4rem' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(23, 33, 58, 0.08)',
          boxShadow: 'var(--shadow-md)',
          padding: '3rem 2.5rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--accent-lavender-dark)',
              marginBottom: '0.5rem'
            }}>
              <Building2 size={16} />
              CLINIC ONBOARDING PORTAL
            </div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
              Register Your Clinic for Wholesale Dispensing
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0 }}>
              Submit your clinic registration details below. Our medical partnerships lead will verify credentials and activate your wholesale pricing account within 4 business hours.
            </p>
          </div>

          {isSubmitted ? (
            <div style={{
              backgroundColor: 'var(--accent-emerald-light)',
              border: '1px solid rgba(67, 142, 117, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto'
            }}>
              <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                Clinic Inquiry Received!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.doctorName}</strong>. Our clinical account manager will connect with you via WhatsApp ({formData.phone}) with your clinic onboarding kit and tax proforma.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-secondary btn-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Doctor's Full Name & Degrees *
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    required
                    placeholder="e.g. Dr. Siddharth Kapoor (MD Skin)"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Clinic / Hospital / Med-Spa Name *
                  </label>
                  <input
                    type="text"
                    name="clinicName"
                    required
                    placeholder="e.g. Aura Dermatology Clinic"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Medical Registration / License No.
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder="e.g. MCI / State Council Reg No."
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Clinic GSTIN (For 18% Tax Credit)
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    placeholder="e.g. 27AAAAA0000A1Z5 (Optional)"
                    value={formData.gstin}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="doctor@clinic.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    WhatsApp / Direct Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Pincode (For Delhivery) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="e.g. 400050"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(23, 33, 58, 0.15)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              {/* Products of Interest Checklist */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  Formulations of Primary Interest:
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.6rem'
                }}>
                  {products.slice(0, 6).map(p => (
                    <label
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid rgba(23, 33, 58, 0.1)',
                        backgroundColor: formData.selectedProducts.includes(p.name) ? 'var(--bg-soft-blue)' : 'transparent',
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedProducts.includes(p.name)}
                        onChange={() => handleProductToggle(p.name)}
                      />
                      <span>{p.name.split('+')[0]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Specific Requirements / Clinic Notes
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="e.g., Interested in post-chemical peel barrier repair creams, sample testers, or co-branded patient routine leaflets."
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(23, 33, 58, 0.15)',
                    fontSize: '0.88rem',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ minWidth: '260px', padding: '0.9rem 2rem', fontSize: '0.95rem' }}
                >
                  Submit Clinic Wholesale Registration &rarr;
                </button>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                  🔒 Credentials verified confidentially. Never shared with third parties.
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

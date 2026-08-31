import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import CustomSelect from '../components/common/CustomSelect';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const { showToast, addInquiry, siteContent } = useStore();
  const [tab, setTab] = useState('general'); // 'general' | 'wholesale'

  const brand = siteContent?.brand || {
    supportEmail: 'care@aesthedermlabs.com',
    helplinePhone: '+91 1800 233 4567 (Mon-Sat)',
    headquartersAddress: 'Cyber City, Tower 4B, Gurugram',
    consultationHours: '9:00 AM – 7:00 PM IST'
  };

  // General Form
  const [genName, setGenName] = useState('');
  const [genEmail, setGenEmail] = useState('');
  const [genSubject, setGenSubject] = useState('Product / Regimen Advice');
  const [genMsg, setGenMsg] = useState('');
  const [genSuccess, setGenSuccess] = useState(false);

  // B2B Wholesale Form
  const [b2bName, setB2bName] = useState('');
  const [b2bClinic, setB2bClinic] = useState('');
  const [b2bRole, setB2bRole] = useState('Dermatologist');
  const [b2bEmail, setB2bEmail] = useState('');
  const [b2bPhone, setB2bPhone] = useState('');
  const [b2bLocation, setB2bLocation] = useState('');
  const [b2bSuccess, setB2bSuccess] = useState(false);

  const handleGenSubmit = (e) => {
    e.preventDefault();
    if (!genName || !genEmail || !genMsg) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    addInquiry({
      type: 'general',
      name: genName,
      email: genEmail,
      subject: genSubject,
      message: genMsg,
      phone: '',
      clinic: '',
      role: 'Patient / Customer',
      location: 'India'
    });

    setGenSuccess(true);
    setGenName('');
    setGenEmail('');
    setGenMsg('');
    showToast('Your inquiry has been routed to our dermatological care desk.');
  };

  const handleB2bSubmit = (e) => {
    e.preventDefault();
    if (!b2bName || !b2bClinic || !b2bEmail) {
      showToast('Please fill out your clinic and professional details.', 'error');
      return;
    }

    addInquiry({
      type: 'wholesale',
      name: b2bName,
      clinic: b2bClinic,
      role: b2bRole,
      email: b2bEmail,
      phone: b2bPhone,
      location: b2bLocation,
      message: `Wholesale & backbar partnership application from ${b2bRole} at ${b2bClinic}. Location: ${b2bLocation}. Phone: ${b2bPhone}.`,
      subject: `Clinic Partner Application: ${b2bClinic}`
    });

    setB2bSuccess(true);
    setB2bName('');
    setB2bClinic('');
    setB2bEmail('');
    setB2bPhone('');
    setB2bLocation('');
    showToast('Wholesale application received! Our clinical partnership team will contact you within 24 hours.');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <span className="badge badge-teal" style={{ marginBottom: '0.65rem' }}>
            Direct Dermatological Desk
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Contact & Professional Inquiries
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Reach our customer care team or apply for authorized clinic backbar and salon wholesale accounts.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Mail size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Clinical Support Desk</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{brand.supportEmail}</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Phone size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Dermatology Helpline</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{brand.helplinePhone}</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <MapPin size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Formulation Headquarters</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{brand.headquartersAddress}</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Clock size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Consultation Hours</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{brand.consultationHours}</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setTab('general')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: '700',
              border: tab === 'general' ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
              backgroundColor: tab === 'general' ? 'var(--teal-800)' : '#FFFFFF',
              color: tab === 'general' ? '#FFFFFF' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            General Support & Order Inquiry
          </button>
          <button
            onClick={() => setTab('wholesale')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem',
              fontWeight: '700',
              border: tab === 'wholesale' ? '2px solid var(--teal-700)' : '1px solid #CBD5E1',
              backgroundColor: tab === 'wholesale' ? 'var(--teal-800)' : '#FFFFFF',
              color: tab === 'wholesale' ? '#FFFFFF' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            ✨ Clinic & Salon Wholesale Partner Application
          </button>
        </div>
        {/* Form Container & Visual Support Desk */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'start'
        }}>
          {/* Form Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #E2E8F0',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: 'var(--shadow-luxury)'
          }}>
            {tab === 'general' ? (
              genSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--teal-900)' }}>
                  <CheckCircle2 size={48} color="var(--teal-700)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Inquiry Received Successfully</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    A clinical support specialist has been assigned to your ticket. Expect a reply within 4 business hours.
                  </p>
                  <button onClick={() => setGenSuccess(false)} className="btn btn-secondary btn-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGenSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', margin: 0 }}>
                    Send a Message to our Clinical Care Team
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Rahul Verma"
                        value={genName}
                        onChange={(e) => setGenName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="rahul@example.com"
                        value={genEmail}
                        onChange={(e) => setGenEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Subject</label>
                    <CustomSelect
                      value={genSubject}
                      onChange={setGenSubject}
                      options={[
                        'Product / Regimen Advice',
                        'Order & Courier Status',
                        'Ingredient Allergy / Sensitivity',
                        'Dermatologist Prescription Advice',
                        'Other Inquiry'
                      ]}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message or Skin Concern</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Describe your skin concern or order questions in detail..."
                      value={genMsg}
                      onChange={(e) => setGenMsg(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={16} /> Submit Message to Care Desk
                  </button>
                </form>
              )
            ) : (
              b2bSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--teal-900)' }}>
                  <CheckCircle2 size={48} color="var(--teal-700)" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>B2B Application Submitted</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Thank you for applying. A dedicated clinical account executive will verify your clinic credentials and contact you within 24 hours.
                  </p>
                  <button onClick={() => setB2bSuccess(false)} className="btn btn-secondary btn-sm">
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', margin: 0 }}>
                    Apply for Clinic Backbar & Wholesale Dispensing
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name & Qualifications</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Dr. Smita Rao, MD (Derm)"
                        value={b2bName}
                        onChange={(e) => setB2bName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Professional Role</label>
                      <CustomSelect
                        value={b2bRole}
                        onChange={setB2bRole}
                        options={[
                          'Dermatologist',
                          'Plastic Surgeon',
                          'Aesthetic Clinic Owner',
                          'Medical Spa Director',
                          'Cosmetic Pharmacist'
                        ]}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Clinic / Hospital / Practice Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. AURA Derma Clinic & Laser Center"
                      value={b2bClinic}
                      onChange={(e) => setB2bClinic(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Official Work Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="dr.smita@auraderma.com"
                        value={b2bEmail}
                        onChange={(e) => setB2bEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Clinic Contact Phone / WhatsApp</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={b2bPhone}
                        onChange={(e) => setB2bPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Clinic Location (City & State)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Bandra West, Mumbai, Maharashtra"
                      value={b2bLocation}
                      onChange={(e) => setB2bLocation(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%' }}>
                    Submit Professional Wholesale Application &rarr;
                  </button>
                </form>
              )
            )}
          </div>

          {/* Clinical Concierge & Facilities Visual Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-luxury)',
              border: '1px solid #E2E8F0',
              position: 'relative',
              height: '260px'
            }}>
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80"
                alt="ContrÂge Clinical Formulation Desk"
                loading="lazy"
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
                  Dermatological Advisory Desk
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>
                  Mon–Sat • 9:00 AM to 7:00 PM IST
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Direct Clinic & Prescription Support
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                Patients undergoing clinical regimens can reach out directly for ingredient tolerance verification, formula pH inquiries, or personalized step sequencing guidance from our dermatologists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

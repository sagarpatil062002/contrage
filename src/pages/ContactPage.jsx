import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useStore();
  const [tab, setTab] = useState('general'); // 'general' | 'wholesale'

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
    setGenSuccess(true);
    showToast('Your inquiry has been routed to our dermatological care desk.');
  };

  const handleB2bSubmit = (e) => {
    e.preventDefault();
    if (!b2bName || !b2bClinic || !b2bEmail) {
      showToast('Please fill out your clinic and professional details.', 'error');
      return;
    }
    setB2bSuccess(true);
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
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>care@aesthedermlabs.com</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Phone size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Dermatology Helpline</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>+91 1800 233 4567 (Mon-Sat)</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <MapPin size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Formulation Headquarters</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cyber City, Tower 4B, Gurugram</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Clock size={20} />
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Consultation Hours</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>9:00 AM – 7:00 PM IST</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
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

        {/* Form Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #E2E8F0',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          maxWidth: '740px',
          margin: '0 auto',
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <label className="form-label">Subject</label>
                  <select
                    className="form-control"
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value)}
                  >
                    <option value="Product / Regimen Advice">Product Formulation / Regimen Consultation</option>
                    <option value="Order Status & Delivery">Order Status & Delivery Logistics</option>
                    <option value="Adverse Reaction / Patch Test">Adverse Reaction / Patch Test Guidance</option>
                    <option value="Refund & Guarantee Claim">Refund & 30-Day Guarantee Claim</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Describe your skin condition or inquiry in detail..."
                    value={genMsg}
                    onChange={(e) => setGenMsg(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Send size={16} /> Send Inquiry &rarr;
                </button>
              </form>
            )
          ) : (
            b2bSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--teal-900)' }}>
                <CheckCircle2 size={48} color="var(--teal-700)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Professional Application Submitted</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you for applying to the Aesthederm Clinic Collective. Our medical partnership manager will reach out with wholesale pricing and backbar catalogues.
                </p>
                <button onClick={() => setB2bSuccess(false)} className="btn btn-secondary btn-sm">
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleB2bSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', margin: '0 0 0.35rem 0' }}>
                    Clinic Backbar & Salon Wholesale Application
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Exclusive volume wholesale discounts, clinical backbar sizes (500ml), and post-procedure protocols for licensed professionals.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Practitioner / Owner Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Dr. Smita Nair"
                      value={b2bName}
                      onChange={(e) => setB2bName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Professional Role</label>
                    <select
                      className="form-control"
                      value={b2bRole}
                      onChange={(e) => setB2bRole(e.target.value)}
                    >
                      <option value="Dermatologist">Dermatologist / Physician</option>
                      <option value="Plastic Surgeon">Plastic / Aesthetic Surgeon</option>
                      <option value="Cosmetologist">Cosmetologist / Trichologist</option>
                      <option value="Salon Owner">Premium Aesthetic Salon Owner</option>
                      <option value="Clinic Manager">Medical Spa / Clinic Director</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Clinic / Salon Entity Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. AURA Derma Clinic & Laser Center"
                    value={b2bClinic}
                    onChange={(e) => setB2bClinic(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Official Work Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="clinic@auraderma.com"
                      value={b2bEmail}
                      onChange={(e) => setB2bEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp</label>
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
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, FileText, Lock } from 'lucide-react';

export default function LegalPage() {
  const { type = 'privacy' } = useParams();

  const policies = {
    privacy: {
      title: 'Privacy Policy & Data Security',
      icon: <Lock size={22} color="var(--teal-700)" />,
      content: `
        <h3>1. Clinical Data Protection Commitment</h3>
        <p>Aesthederm Labs ("we", "us", "our") is dedicated to protecting the privacy of our patients, consumers, and clinical partners. We collect skin diagnostic profiles and purchase information solely to deliver customized routine prescriptions and optimize order fulfillment.</p>
        
        <h3>2. Information We Collect</h3>
        <ul>
          <li><strong>Skin Diagnostic Tele-Consultation Data:</strong> Information you provide during the 4-step skin diagnostic quiz (skin type, sensitivity level, primary concerns).</li>
          <li><strong>Order & Billing Details:</strong> Shipping address, customer name, contact phone number, and transaction logs. Payment card details are never stored on our local servers.</li>
        </ul>
        
        <h3>3. Zero Third-Party Data Brokering</h3>
        <p>We strictly never sell, rent, or trade your dermatological diagnostic results or personal identifiers to third-party advertising networks or commercial brokers.</p>
      `
    },
    terms: {
      title: 'Terms of Clinical Service',
      icon: <FileText size={22} color="var(--teal-700)" />,
      content: `
        <h3>1. Acceptance of Terms</h3>
        <p>By browsing, accessing, or purchasing formulations on Aesthederm Labs, you agree to comply with and be bound by these Terms of Service.</p>
        
        <h3>2. Cosmetic Formulation Disclaimer</h3>
        <p>Our products are medical-grade cosmetic preparations designed for skin barrier conditioning. They do not replace prescription pharmaceutical interventions for systemic medical conditions (e.g. severe cystic nodular acne requiring oral isotretinoin). Always consult your licensed physician.</p>
        
        <h3>3. Allergy Patch Testing Protocol</h3>
        <p>Because our active ingredients are formulated at high clinical concentrations (e.g. 10% Niacinamide, 0.1% Retinaldehyde, 25% AHA), the customer is responsible for conducting a 24-hour patch test behind the ear or inside the forearm prior to full facial application.</p>
      `
    },
    shipping: {
      title: 'Cold-Chain Shipping & Logistics Policy',
      icon: <Truck size={22} color="var(--teal-700)" />,
      content: `
        <h3>1. Temperature-Controlled Express Logistics</h3>
        <p>To preserve the biological activity of our active antioxidants (such as 15% Vitamin C and 0.1% Retinaldehyde), all orders are packed in UV-shielded packaging and dispatched via express air courier.</p>
        
        <h3>2. Delivery Timelines</h3>
        <ul>
          <li><strong>Metro Cities:</strong> 2 to 3 Business Days.</li>
          <li><strong>Non-Metro & Tier-2/3 Cities:</strong> 3 to 5 Business Days.</li>
          <li><strong>Dispatch Window:</strong> All orders placed before 2:00 PM IST are processed and dispatched on the same business day.</li>
        </ul>
        
        <h3>3. Free Shipping Threshold</h3>
        <p>Orders totaling ₹999 or above qualify for 100% Free Express Cold-Chain Courier Delivery.</p>
      `
    },
    refunds: {
      title: '30-Day Clinical Satisfaction Guarantee',
      icon: <RotateCcw size={22} color="var(--teal-700)" />,
      content: `
        <h3>1. The 30-Day Dermatologist Guarantee</h3>
        <p>We stand completely behind the efficacy and skin tolerance of our formulations. If you introduce a formulation according to our usage protocols and experience an adverse allergic reaction or zero satisfaction within 30 days of delivery, we will issue a full refund or provide a custom routine reformulation at no extra cost.</p>
        
        <h3>2. How to Claim a Clinical Refund</h3>
        <p>Contact our clinical support desk at <code>care@aesthedermlabs.com</code> with your Order ID and a brief description of your skin experience. Our dermatological support team will process your refund back to your original payment method within 3 business days.</p>
      `
    }
  };

  const current = policies[type] || policies.privacy;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '3rem 0 2rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Legal & Compliance Protocols
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Transparent policies governing our clinical formulating standards, logistics, and patient guarantee.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Sidebar Nav */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem'
          }}>
            {[
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms of Service' },
              { id: 'shipping', label: 'Shipping & Logistics' },
              { id: 'refunds', label: '30-Day Guarantee' }
            ].map(item => (
              <Link
                key={item.id}
                to={`/legal/${item.id}`}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.88rem',
                  fontWeight: type === item.id ? '700' : '500',
                  backgroundColor: type === item.id ? 'var(--teal-50)' : 'transparent',
                  color: type === item.id ? 'var(--teal-900)' : 'var(--text-secondary)'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Policy Document Content */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid #E2E8F0',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0' }}>
              {current.icon}
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>
                {current.title}
              </h2>
            </div>

            <div
              style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}
              dangerouslySetInnerHTML={{ __html: current.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

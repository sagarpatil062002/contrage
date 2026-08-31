import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Truck,
  Printer,
  ShieldCheck,
  ArrowRight,
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { orders } = useStore();

  const [order, setOrder] = useState(() => orders.find(o => o.id === id) || orders[0]);

  useEffect(() => {
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}

    // If order not found in memory, load from backend
    if (!order && id) {
      api.orders.getById(id).then(res => {
        if (res?.data) setOrder(res.data);
      }).catch(() => {});
    }
  }, [id, order]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '3.5rem 0 5rem 0' }}>
      <div className="container-narrow">
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          boxShadow: 'var(--shadow-luxury)',
          position: 'relative'
        }}>
          {/* Header Celebration */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
              Order Confirmed & Formulation Queued
            </span>

            <h1 style={{ fontSize: '2.2rem', color: '#0F172A', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
              Thank You for Your Order!
            </h1>

            <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
              Order Reference: <strong style={{ color: '#0F172A' }}>#{order?.id || id}</strong> • Delhivery AWB: <strong style={{ color: '#0284C7' }}>{order?.trackingNumber || 'Manifested'}</strong>
            </p>
          </div>

          {/* Delivery & Tracking Highlight Card */}
          <div style={{
            backgroundColor: '#F0F9FF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #BAE6FD',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: '#0284C7',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Truck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0F172A' }}>
                  Delhivery Cold-Chain Logistics Queued
                </div>
                <div style={{ fontSize: '0.82rem', color: '#0369A1' }}>
                  Estimated Doorstep Delivery: 2–3 Business Days (SMS & WhatsApp updates enabled)
                </div>
              </div>
            </div>

            <Link
              to="/account?tab=orders"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              Track Live Order Status <ArrowRight size={14} />
            </Link>
          </div>

          {/* Itemized Invoice Receipt */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: '#0F172A' }}>Itemized Clinical Receipt</h3>
              <button
                onClick={handlePrint}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Printer size={14} /> Print Invoice
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              {order?.items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid #F1F5F9',
                    fontSize: '0.9rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={item.product?.heroImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80'}
                      alt={item.product?.name}
                      style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: '#0F172A' }}>{item.product?.name || 'ContrÂge Formulation'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Qty: {item.quantity} • Size: {item.selectedSize}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontWeight: '800', color: '#0F172A' }}>
                    ₹{(item.price || item.product?.salePrice || item.product?.price || 0) * (item.quantity || 1)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Subtotal</span>
                <span>₹{order?.subtotal || order?.total}</span>
              </div>
              {order?.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: '700' }}>
                  <span>Clinical Promo Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Delhivery Express Shipping</span>
                <span>{order?.shippingFee === 0 ? <strong style={{ color: '#059669' }}>FREE</strong> : `₹${order?.shippingFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: '800',
                color: '#0F172A',
                borderTop: '1px solid #E2E8F0',
                paddingTop: '0.65rem'
              }}>
                <span>Total Paid</span>
                <span style={{ color: '#0284C7' }}>₹{order?.total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Customer Profile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E2E8F0',
            marginBottom: '2.5rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                Delivery Address:
              </div>
              <div style={{ color: '#475569', lineHeight: '1.4' }}>
                {order?.customer?.name}<br />
                {order?.customer?.address}<br />
                {order?.customer?.city}, {order?.customer?.state} - {order?.customer?.pincode}<br />
                Phone: {order?.customer?.phone}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                Payment & Billing Details:
              </div>
              <div style={{ color: '#475569', lineHeight: '1.4' }}>
                Method: {order?.paymentMethod}<br />
                Status: <strong style={{ color: '#059669' }}>Authorized & Confirmed</strong><br />
                Recipient Phone: {order?.customer?.phone}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore More Formulations &rarr;
            </Link>
            <Link to="/account" className="btn btn-secondary btn-lg">
              View Customer Account & Tracking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

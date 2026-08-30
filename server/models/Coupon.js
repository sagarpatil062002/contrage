import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  id: { type: String, default: () => `coup-${Date.now()}` },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true, min: 0 },
  minSpend: { type: Number, default: 0, min: 0 },
  description: { type: String, default: '' },
  expiry: { type: String, default: '2026-12-31' },
  active: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  usageLimit: { type: Number, default: 1000 }
}, {
  timestamps: true
});

export default mongoose.model('Coupon', couponSchema);

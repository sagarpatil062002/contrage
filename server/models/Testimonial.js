import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, default: '' },
  age: { type: Number },
  city: { type: String },
  concern: { type: String },
  avatar: { type: String, default: '' },
  productUsed: { type: String, default: '' },
  duration: { type: String, default: '' },
  quote: { type: String, required: true },
  rating: { type: Number, default: 5 },
  verifiedDerm: { type: Boolean, default: false },
  verifiedBuyer: { type: Boolean, default: true },
  verified: { type: Boolean, default: true },
  resultMetric: { type: String, default: '' },
  beforeImage: { type: String, default: '' },
  afterImage: { type: String, default: '' }
}, {
  timestamps: true
});

export default mongoose.model('Testimonial', testimonialSchema);

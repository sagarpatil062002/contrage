import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  id: { type: String, default: () => `inq-${Date.now()}` },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  concern: { type: String, default: 'General Clinical Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved', 'Archived'], default: 'New' },
  date: { type: String, default: () => new Date().toISOString() },
  adminNotes: { type: String, default: '' }
}, {
  timestamps: true
});

export default mongoose.model('Inquiry', inquirySchema);

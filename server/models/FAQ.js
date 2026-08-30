import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  id: { type: String, default: () => `faq-${Date.now()}` },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' }
}, {
  timestamps: true
});

export default mongoose.model('FAQ', faqSchema);

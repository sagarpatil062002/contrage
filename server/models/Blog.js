import mongoose from 'mongoose';

const citationSchema = new mongoose.Schema({
  title: String,
  journal: String,
  year: String,
  doi: String
}, { _id: false });

const blogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  authorRole: { type: String, default: 'Clinical Dermatologist' },
  readTime: { type: String, default: '5 min read' },
  publishedDate: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  coverImage: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  relatedProductIds: [{ type: String }],
  citations: [citationSchema],
  published: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);

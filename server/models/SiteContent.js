import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'main_cms_content', 'announcement'
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, {
  timestamps: true
});

export default mongoose.model('SiteContent', siteContentSchema);

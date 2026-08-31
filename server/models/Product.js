import mongoose from 'mongoose';

const activeIngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: String, default: '' },
  role: { type: String, default: '' }
}, { _id: false });

const clinicalResultsSchema = new mongoose.Schema({
  stat1: { type: String, default: '' },
  stat2: { type: String, default: '' },
  stat3: { type: String, default: '' }
}, { _id: false });

const howToUseSchema = new mongoose.Schema({
  am: { type: Boolean, default: true },
  pm: { type: Boolean, default: true },
  step: { type: String, default: '' },
  instructions: { type: String, default: '' },
  warning: { type: String, default: '' }
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  id: { type: String, default: () => `rev-${Date.now()}` },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  skinType: { type: String, default: 'Combination Skin' },
  date: { type: String, default: 'Verified Purchase' },
  verified: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // 'p-1', 'p-2', etc.
  sku: { type: String, default: '' },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  tagline: { type: String, default: '' },
  category: { type: String, required: true },
  primaryConcern: { type: String, required: true },
  concerns: [{ type: String }],
  skinTypes: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 50, min: 0 },
  sizes: [{ type: String }],
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  activeIngredients: [activeIngredientSchema],
  fullInci: { type: String, default: '' },
  clinicalResults: clinicalResultsSchema,
  howToUse: howToUseSchema,
  doctorNote: { type: String, default: '' },
  badge: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  reviews: [reviewSchema]
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);

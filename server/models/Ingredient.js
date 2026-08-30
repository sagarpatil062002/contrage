import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  chemicalName: { type: String, default: '' },
  category: { type: String, required: true },
  ewgScore: { type: String, default: '1 (Ultra-Safe)' },
  optimalPh: { type: String, default: '5.5' },
  molecularWeight: { type: String, default: '' },
  description: { type: String, required: true },
  clinicalBenefits: [{ type: String }],
  synergies: [{ type: String }],
  conflicts: [{ type: String }],
  whoShouldUse: { type: String, default: '' },
  productIds: [{ type: String }],
  featuredProductIds: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model('Ingredient', ingredientSchema);

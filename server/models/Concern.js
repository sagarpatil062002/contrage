import mongoose from 'mongoose';

const routineStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  productId: { type: String, default: '' },
  name: { type: String, default: '' },
  instruction: { type: String, default: '' }
}, { _id: false });

const concernSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true },
  shortDesc: { type: String, required: true },
  iconName: { type: String, default: 'Sparkles' },
  heroImage: { type: String, required: true },
  clinicalBackground: { type: String, default: '' },
  symptoms: [{ type: String }],
  biologicalMechanism: { type: String, default: '' },
  recommendedActives: [{ type: String }],
  contraindications: [{ type: String }],
  doctorTips: { type: String, default: '' },
  routineSteps: [routineStepSchema],
  recommendedProductIds: [{ type: String }],
  regimen: {
    am: [{
      step: String,
      productId: String,
      instruction: String
    }],
    pm: [{
      step: String,
      productId: String,
      instruction: String
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model('Concern', concernSchema);

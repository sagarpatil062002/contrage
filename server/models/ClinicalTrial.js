import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  instrument: { type: String, default: '' }
}, { _id: false });

const clinicalTrialSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  formulation: { type: String, required: true },
  notes: { type: String, default: '' },
  metrics: [metricSchema],
  beforeImage: { type: String, default: '' },
  afterImage: { type: String, default: '' },
  statLabel: { type: String, default: '' },
  statValue: { type: String, default: '' }
}, {
  timestamps: true
});

export default mongoose.model('ClinicalTrial', clinicalTrialSchema);

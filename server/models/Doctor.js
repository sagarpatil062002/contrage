import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  affiliation: { type: String, default: '' },
  specialty: { type: String, default: '' },
  credentials: { type: String, default: '' },
  specialization: { type: String, default: '' },
  hospital: { type: String, default: '' },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  quote: { type: String, default: '' }
}, {
  timestamps: true
});

export default mongoose.model('Doctor', doctorSchema);

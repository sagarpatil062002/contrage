import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  id: { type: String, default: () => `addr-${Date.now()}` },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: {
    type: String,
    enum: ['CUSTOMER', 'ADMIN', 'DERMATOLOGIST'],
    default: 'CUSTOMER'
  },
  skinType: { type: String, default: 'Combination Skin' },
  primaryConcern: { type: String, default: 'Acne & Blemishes' },
  sensitivity: { type: String, default: 'Low-Medium' },
  addresses: [addressSchema],
  wishlist: [{ type: String }], // Product IDs or slugs
  quizResult: {
    skinType: String,
    primaryConcern: String,
    tolerance: String,
    routine: [{ type: String }],
    date: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);

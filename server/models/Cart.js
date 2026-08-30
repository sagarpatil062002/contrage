import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    heroImage: { type: String },
    slug: { type: String },
    category: { type: String },
    stock: { type: Number }
  },
  quantity: { type: Number, required: true, default: 1, min: 1 },
  selectedSize: { type: String, default: 'Standard' },
  price: { type: Number, required: true }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  appliedCoupon: {
    code: String,
    type: { type: String },
    value: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('Cart', cartSchema);

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    heroImage: { type: String },
    category: { type: String },
    slug: { type: String }
  },
  quantity: { type: Number, required: true, min: 1 },
  selectedSize: { type: String, default: 'Standard' },
  price: { type: Number, required: true }
}, { _id: false });

const checkpointSchema = new mongoose.Schema({
  status: { type: String, required: true },
  time: { type: String, required: true },
  completed: { type: Boolean, default: false },
  current: { type: Boolean, default: false },
  note: { type: String, default: '' }
}, { _id: false });

const customerSnapshotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // 'ORD-84920'
  trackingNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  customer: customerSnapshotSchema,
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponApplied: { type: String, default: null },
  paymentMethod: { type: String, default: 'Credit/Debit Card (Simulated)' },
  paymentStatus: { type: String, default: 'Completed (Simulated)' },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  checkpoints: [checkpointSchema]
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);

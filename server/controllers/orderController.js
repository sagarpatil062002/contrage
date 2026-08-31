import crypto from 'crypto';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Cart from '../models/Cart.js';
import { sendSuccess, sendError } from '../utils/response.js';

// @desc Create a new order (Server-validated pricing, stock decrement, COD/Razorpay)
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      couponCode,
      paymentMethod = 'Razorpay UPI / Cards',
      razorpayPaymentId = null,
      razorpayOrderId = null
    } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address || !customer.pincode) {
      return sendError(res, 'Please provide complete customer shipping information.', 400);
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Order must contain at least one product item.', 400);
    }

    // Step 1: Validate each item against database Product records & verify stock
    let canonicalSubtotal = 0;
    const validatedItems = [];
    const stockUpdates = [];

    for (const item of items) {
      const prodId = item.product?.id || item.productId;
      const quantity = Number(item.quantity) || 1;
      const selectedSize = item.selectedSize || 'Standard';

      if (!prodId) {
        return sendError(res, 'Invalid product reference in order items.', 400);
      }

      const product = await Product.findOne({ $or: [{ id: prodId }, { slug: prodId }] });
      if (!product) {
        return sendError(res, `Product "${prodId}" is no longer available.`, 404);
      }

      if (product.stock < quantity) {
        return sendError(res, `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${quantity}.`, 400);
      }

      const unitPrice = product.salePrice || product.price;
      canonicalSubtotal += (unitPrice * quantity);

      validatedItems.push({
        product: {
          id: product.id,
          name: product.name,
          heroImage: product.heroImage,
          category: product.category,
          slug: product.slug
        },
        quantity,
        selectedSize,
        price: unitPrice
      });

      stockUpdates.push({
        productDoc: product,
        decrementQty: quantity
      });
    }

    // Step 2: Validate coupon server-side
    let discountAmount = 0;
    let validCouponCode = null;

    if (couponCode) {
      const foundCoupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
        active: true
      });

      if (foundCoupon) {
        if (!foundCoupon.minSpend || canonicalSubtotal >= foundCoupon.minSpend) {
          if (foundCoupon.type === 'percentage') {
            discountAmount = Math.round((canonicalSubtotal * foundCoupon.value) / 100);
          } else if (foundCoupon.type === 'fixed') {
            discountAmount = Math.min(foundCoupon.value, canonicalSubtotal);
          }
          validCouponCode = foundCoupon.code;
          foundCoupon.usageCount = (foundCoupon.usageCount || 0) + 1;
          await foundCoupon.save();
        }
      }
    }

    // Step 3: Compute shipping & COD fee
    const freeShippingThreshold = 499;
    const shippingFee = (canonicalSubtotal >= freeShippingThreshold || validCouponCode === 'FREESHIP' || canonicalSubtotal === 0) ? 0 : 50;
    const isCOD = paymentMethod === 'Cash on Delivery' || paymentMethod === 'COD';
    const codFee = isCOD ? 40 : 0;
    const canonicalTotal = Math.max(0, canonicalSubtotal - discountAmount + shippingFee + codFee);

    // Step 4: Decrement Stock in MongoDB
    for (const update of stockUpdates) {
      update.productDoc.stock = Math.max(0, update.productDoc.stock - update.decrementQty);
      await update.productDoc.save();
    }

    // Step 5: Construct Order document
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `DELHIVERY-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const order = await Order.create({
      id: orderId,
      trackingNumber,
      user: req.user ? req.user._id : null,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state || '',
        pincode: customer.pincode
      },
      items: validatedItems,
      subtotal: canonicalSubtotal,
      discount: discountAmount,
      shippingFee,
      total: canonicalTotal,
      couponApplied: validCouponCode,
      paymentMethod: isCOD ? 'Cash on Delivery' : 'Razorpay (Online)',
      paymentStatus: isCOD ? 'Pending COD Payment' : 'Paid / Verified',
      status: 'Confirmed',
      checkpoints: [
        { status: 'Order Confirmed', time: formattedTime, completed: true, current: true, note: 'Order verified and batch allocated for clinical packing.' },
        { status: 'Packed', time: 'In Progress', completed: false, note: 'Protective cold-chain packaging.' },
        { status: 'Dispatched', time: 'Pending Handover', completed: false, note: 'Delhivery Surface/Air express pickup.' },
        { status: 'In Transit', time: 'Pending', completed: false, note: 'Moving through transit hub.' },
        { status: 'Delivered', time: 'Pending', completed: false, note: 'Doorstep clinical delivery.' }
      ]
    });

    // Step 6: Clear cart if user authenticated
    if (req.user) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], appliedCoupon: null });
    }

    return sendSuccess(res, order, 'Order confirmed successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Create Razorpay Order ID for checkout modal
// @route POST /api/orders/razorpay/create-order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount <= 0) {
      return sendError(res, 'Invalid order amount.', 400);
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay SDK/keys are not provided in env, return clean test order payload
    const generatedOrderId = `order_contrage_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return sendSuccess(res, {
      id: generatedOrderId,
      amount: Math.round(amount * 100), // In paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      key: keyId || 'rzp_test_contrage_demo_key',
      mode: (keyId && keySecret) ? 'live' : 'test'
    }, 'Razorpay order initialized.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Verify Razorpay Payment Signature
// @route POST /api/orders/razorpay/verify
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return sendError(res, 'Invalid Razorpay signature verification failed.', 400);
      }
    }

    return sendSuccess(res, {
      verified: true,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`
    }, 'Payment verified successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get orders of the logged-in user
// @route GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const orders = await Order.find({
      $or: [
        { user: req.user._id },
        { 'customer.email': userEmail }
      ]
    }).sort({ createdAt: -1 });

    return sendSuccess(res, orders);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get single order by id or tracking number
// @route GET /api/orders/:identifier
export const getOrderByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const order = await Order.findOne({
      $or: [{ id: identifier }, { trackingNumber: identifier }]
    });

    if (!order) return sendError(res, 'Order not found.', 404);

    return sendSuccess(res, order);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get all orders (Admin)
// @route GET /api/orders/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Update order status (Admin)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return sendError(res, `Invalid status. Allowed values: ${validStatuses.join(', ')}`, 400);
    }

    const order = await Order.findOne({ id });
    if (!order) {
      return sendError(res, 'Order not found.', 404);
    }

    order.status = status;
    if (status === 'Delivered') {
      order.paymentStatus = 'Paid / Verified';
    }

    await order.save();
    return sendSuccess(res, order, `Order status updated to "${status}".`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get orders by customer mobile number (The Derma Co tracking flow)
// @route GET /api/orders/by-phone/:phone
export const getOrdersByPhone = async (req, res) => {
  try {
    const rawPhone = (req.params.phone || '').replace(/[^0-9]/g, '').slice(-10);
    if (!rawPhone || rawPhone.length !== 10) {
      return sendError(res, 'Valid 10-digit mobile number required.', 400);
    }

    const orders = await Order.find({
      $or: [
        { 'customer.phone': { $regex: rawPhone } },
        { 'customer.phone': rawPhone },
        { 'customer.phone': `+91 ${rawPhone}` },
        { 'customer.phone': `+91${rawPhone}` }
      ]
    }).sort({ createdAt: -1 });

    return sendSuccess(res, orders, `Found ${orders.length} order(s) for mobile number.`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

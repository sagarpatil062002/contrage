import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Cart from '../models/Cart.js';
import { sendSuccess, sendError } from '../utils/response.js';

// @desc Create a new order (Server-validated pricing & stock decrement)
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      couponCode,
      paymentMethod = 'Credit Card (Simulated Direct)'
    } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address || !customer.pincode) {
      return sendError(res, 'Please provide complete customer shipping information.', 400);
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Order must contain at least one product item.', 400);
    }

    // Step 1: Validate each item against database Product records, verify stock, and compute canonical subtotal
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
          // Increment coupon usage
          foundCoupon.usageCount = (foundCoupon.usageCount || 0) + 1;
          await foundCoupon.save();
        }
      }
    }

    // Step 3: Compute canonical shipping & total
    const freeShippingThreshold = 999;
    const shippingFee = (canonicalSubtotal >= freeShippingThreshold || validCouponCode === 'FREESHIP' || canonicalSubtotal === 0) ? 0 : 99;
    const canonicalTotal = Math.max(0, canonicalSubtotal - discountAmount + shippingFee);

    // Step 4: Decrement Stock
    for (const update of stockUpdates) {
      update.productDoc.stock = Math.max(0, update.productDoc.stock - update.decrementQty);
      await update.productDoc.save();
    }

    // Step 5: Construct Order document
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `DERMA-EXP-${Math.floor(10000 + Math.random() * 90000)}IN`;

    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

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
      paymentMethod,
      paymentStatus: 'Completed (Simulated)',
      status: 'Processing',
      checkpoints: [
        { status: 'Order Placed', time: formattedTime, completed: true, current: true, note: 'Order received and verified for clinical batch packaging.' },
        { status: 'Formulation Packed', time: 'Pending (~2-4 hours)', completed: false, note: 'UV & temperature controlled packaging.' },
        { status: 'Dispatched', time: 'Estimated Tomorrow', completed: false, note: 'Handover to express courier.' },
        { status: 'In Transit', time: 'Estimated 2-3 Days', completed: false, note: 'Local distribution dispatch.' },
        { status: 'Delivered', time: 'Estimated 3-4 Days', completed: false, note: 'Doorstep verification.' }
      ]
    });

    // Step 6: If user is authenticated, clear their DB cart
    if (req.user) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], appliedCoupon: null });
    }

    return sendSuccess(res, order, 'Order placed successfully and confirmed.', 201);
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
// @route GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Update order status & checkpoints (Admin)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
    if (!order) return sendError(res, 'Order not found.', 404);

    order.status = status;

    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    order.checkpoints = order.checkpoints.map(cp => {
      if (cp.status.toLowerCase() === status.toLowerCase()) {
        return { ...cp.toObject(), completed: true, current: true, time: now };
      }
      if (status === 'Delivered') {
        return { ...cp.toObject(), completed: true, current: cp.status === 'Delivered' };
      }
      if (status === 'Dispatched' && (cp.status === 'Order Placed' || cp.status === 'Formulation Packed')) {
        return { ...cp.toObject(), completed: true };
      }
      return cp;
    });

    await order.save();
    return sendSuccess(res, order, `Order status updated to "${status}".`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

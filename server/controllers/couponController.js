import Coupon from '../models/Coupon.js';
import { sendSuccess, sendError } from '../utils/response.js';

// @desc Validate coupon code and return verified discount
// @route POST /api/coupons/validate
export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body;
    if (!code) return sendError(res, 'Please provide a coupon code.', 400);

    const formatted = code.trim().toUpperCase();
    const coupon = await Coupon.findOne({ code: formatted, active: true });

    if (!coupon) {
      return sendError(res, 'Invalid or inactive promotional code.', 404);
    }

    if (coupon.minSpend > 0 && subtotal < coupon.minSpend) {
      return sendError(res, `Coupon requires a minimum order subtotal of ₹${coupon.minSpend}.`, 400);
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon.type === 'fixed') {
      discountAmount = Math.min(coupon.value, subtotal);
    }

    return sendSuccess(res, {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minSpend: coupon.minSpend,
      discountAmount
    }, `Coupon "${coupon.code}" applied successfully.`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get all coupons
// @route GET /api/coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return sendSuccess(res, coupons);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Create coupon (Admin)
// @route POST /api/coupons
export const createCoupon = async (req, res) => {
  try {
    const { code, type, value, minSpend, expiry, usageLimit } = req.body;
    if (!code || !type || value === undefined) {
      return sendError(res, 'Code, type, and value are required.', 400);
    }

    const existing = await Coupon.findOne({ code: code.trim().toUpperCase() });
    if (existing) return sendError(res, 'Coupon with this code already exists.', 400);

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minSpend: minSpend ? Number(minSpend) : 0,
      expiry: expiry || '2026-12-31',
      usageLimit: usageLimit ? Number(usageLimit) : 1000,
      active: true
    });

    return sendSuccess(res, coupon, 'Coupon created successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Toggle or update coupon (Admin)
// @route PUT /api/coupons/:id
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Coupon.findOneAndUpdate(
      { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { code: id.toUpperCase() }] },
      req.body,
      { new: true }
    );
    if (!updated) return sendError(res, 'Coupon not found.', 404);

    return sendSuccess(res, updated, 'Coupon updated successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Delete coupon (Admin)
// @route DELETE /api/coupons/:id
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Coupon.findOneAndDelete({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { code: id.toUpperCase() }]
    });
    if (!deleted) return sendError(res, 'Coupon not found.', 404);

    return sendSuccess(res, { id }, 'Coupon deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

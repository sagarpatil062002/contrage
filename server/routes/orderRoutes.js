import express from 'express';
import {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyOrders,
  getOrderByIdentifier,
  getOrdersByPhone,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, createOrder);
router.post('/razorpay/create-order', createRazorpayOrder);
router.post('/razorpay/verify', verifyRazorpayPayment);
router.get('/myorders', protect, getMyOrders);
router.get('/by-phone/:phone', getOrdersByPhone);
router.get('/all', protect, adminOnly, getAllOrders);
router.get('/:identifier', getOrderByIdentifier);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;

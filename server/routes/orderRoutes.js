import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderByIdentifier,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', optionalAuth, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/all', protect, adminOnly, getAllOrders);
router.get('/:identifier', getOrderByIdentifier);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;

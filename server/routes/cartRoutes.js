import express from 'express';
import {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart,
  mergeGuestCart
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All cart routes require auth

router.route('/')
  .get(getCart)
  .delete(clearCart);

router.post('/items', addOrUpdateCartItem);
router.delete('/items/:productId', removeCartItem);
router.post('/merge', mergeGuestCart);

export default router;

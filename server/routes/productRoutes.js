import express from 'express';
import {
  getProducts,
  getProductByIdentifier,
  addProductReview,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct);

router.route('/:identifier')
  .get(getProductByIdentifier)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

router.post('/:id/reviews', optionalAuth, addProductReview);

export default router;

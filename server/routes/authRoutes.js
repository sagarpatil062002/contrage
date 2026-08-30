import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
  saveQuizResult
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);
router.delete('/address/:id', protect, deleteAddress);
router.post('/wishlist/toggle', protect, toggleWishlist);
router.post('/quiz', protect, saveQuizResult);

export default router;

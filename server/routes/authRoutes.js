import express from 'express';
import {
  sendMobileOtp,
  verifyMobileOtp,
  registerUser,
  loginUser,
  adminLogin,
  adminVerify2FA,
  getMe,
  updateProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
  saveQuizResult
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Mobile OTP Endpoints (The Derma Co Flow)
router.post('/send-otp', sendMobileOtp);
router.post('/verify-otp', verifyMobileOtp);

// Email & Password Auth
router.post('/register', registerUser);
router.post('/login', loginUser);

// High-Security Clinical Admin Portal Auth
router.post('/admin-login', adminLogin);
router.post('/admin-verify-2fa', adminVerify2FA);

// Protected Account Routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);
router.delete('/address/:id', protect, deleteAddress);
router.post('/wishlist/toggle', protect, toggleWishlist);
router.post('/quiz', protect, saveQuizResult);

export default router;

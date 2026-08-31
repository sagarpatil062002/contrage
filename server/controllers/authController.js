import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'contrage_jwt_super_secret_clinical_key_2026_998877', {
    expiresIn: '30d'
  });
};

// In-Memory Temporary OTP Store: Map<phone, { otp, expiresAt }>
const otpStore = new Map();

// Helper to sanitize Indian phone numbers to 10 digits
const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '').slice(-10);
};

// @desc Send Mobile OTP (The Derma Co Style)
// @route POST /api/auth/send-otp
export const sendMobileOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = cleanPhoneNumber(phone);

    if (!cleanPhone || cleanPhone.length !== 10) {
      return sendError(res, 'Please provide a valid 10-digit Indian mobile number.', 400);
    }

    // Generate 4-digit OTP (e.g. 1234 for easy testing, or random)
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    otpStore.set(cleanPhone, { otp: generatedOtp, expiresAt });

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { phone: cleanPhone },
        { phone: `+91 ${cleanPhone}` },
        { phone: `+91${cleanPhone}` }
      ]
    });

    return sendSuccess(res, {
      phone: cleanPhone,
      otp: generatedOtp, // Included in response for seamless test verification
      isExistingUser: Boolean(existingUser),
      expiresInSeconds: 300
    }, `OTP sent successfully to +91 ${cleanPhone}`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Verify Mobile OTP and Log In / Register User
// @route POST /api/auth/verify-otp
export const verifyMobileOtp = async (req, res) => {
  try {
    const { phone, otp, name, email } = req.body;
    const cleanPhone = cleanPhoneNumber(phone);

    if (!cleanPhone || cleanPhone.length !== 10) {
      return sendError(res, 'Please provide a valid 10-digit mobile number.', 400);
    }

    if (!otp) {
      return sendError(res, 'Please enter the 4-digit verification OTP.', 400);
    }

    // Validate against OTP store (allows '1234' as universal master test OTP as well)
    const record = otpStore.get(cleanPhone);
    const isValidOtp = (record && record.otp === otp.trim() && Date.now() < record.expiresAt) || otp.trim() === '1234';

    if (!isValidOtp) {
      return sendError(res, 'Invalid or expired OTP. Please request a new code.', 400);
    }

    // Clear used OTP
    otpStore.delete(cleanPhone);

    // Look up or create user by phone
    let user = await User.findOne({
      $or: [
        { phone: cleanPhone },
        { phone: `+91 ${cleanPhone}` },
        { phone: `+91${cleanPhone}` }
      ]
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const defaultEmail = email ? email.toLowerCase().trim() : `user${cleanPhone}@contrage.in`;
      
      // Check if email taken
      const emailExists = await User.findOne({ email: defaultEmail });
      const finalEmail = emailExists ? `user${cleanPhone}_${Date.now()}@contrage.in` : defaultEmail;

      user = await User.create({
        name: name ? name.trim() : `Customer ${cleanPhone.slice(-4)}`,
        email: finalEmail,
        password: `Otp@${cleanPhone}`,
        phone: `+91 ${cleanPhone}`,
        role: 'CUSTOMER',
        skinType: 'Combination Skin',
        primaryConcern: 'Acne & Blemishes'
      });
    } else {
      // Update name/email if provided
      if (name && (!user.name || user.name.startsWith('Customer '))) {
        user.name = name.trim();
      }
      if (email && user.email.includes('@contrage.in')) {
        user.email = email.toLowerCase().trim();
      }
      await user.save();
    }

    const token = generateToken(user._id);

    return sendSuccess(res, {
      token,
      isNewUser,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        skinType: user.skinType,
        primaryConcern: user.primaryConcern,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
        quizResult: user.quizResult
      }
    }, isNewUser ? 'Account registered successfully.' : 'Logged in successfully via mobile OTP.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Register a new user (Email/Password)
// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, skinType, primaryConcern } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Please provide name, email, and password.', 400);
    }

    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return sendError(res, 'An account with this email already exists.', 400);
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : '',
      skinType: skinType || 'Combination Skin',
      primaryConcern: primaryConcern || 'Acne & Blemishes'
    });

    const token = generateToken(user._id);

    return sendSuccess(res, {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        skinType: user.skinType,
        primaryConcern: user.primaryConcern,
        sensitivity: user.sensitivity,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
        quizResult: user.quizResult
      }
    }, 'User registered successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Authenticate user & get token (Email/Password)
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide email and password.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !(await user.matchPassword(password))) {
      return sendError(res, 'Invalid email or password credentials.', 401);
    }

    const token = generateToken(user._id);

    return sendSuccess(res, {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        skinType: user.skinType,
        primaryConcern: user.primaryConcern,
        sensitivity: user.sensitivity,
        addresses: user.addresses || [],
        wishlist: user.wishlist || [],
        quizResult: user.quizResult
      }
    }, 'Logged in successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get current logged-in user profile
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return sendError(res, 'User not found.', 404);

    return sendSuccess(res, user);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    const { name, phone, skinType, primaryConcern, sensitivity } = req.body;
    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (skinType) user.skinType = skinType;
    if (primaryConcern) user.primaryConcern = primaryConcern;
    if (sensitivity) user.sensitivity = sensitivity;

    const updated = await user.save();
    return sendSuccess(res, updated, 'Profile updated successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Add user shipping address
// @route POST /api/auth/address
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    const { name, phone, street, city, state, pincode, isDefault } = req.body;
    if (!street || !city || !pincode) {
      return sendError(res, 'Street, city, and pincode are required.', 400);
    }

    const newAddr = {
      id: `addr-${Date.now()}`,
      name: name || user.name,
      phone: phone || user.phone,
      street,
      city,
      state: state || '',
      pincode,
      isDefault: Boolean(isDefault)
    };

    if (isDefault) {
      user.addresses.forEach(a => a.isDefault = false);
    }

    user.addresses.push(newAddr);
    await user.save();

    return sendSuccess(res, user.addresses, 'Address added successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Delete user shipping address
// @route DELETE /api/auth/address/:id
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    user.addresses = user.addresses.filter(a => a.id !== req.params.id);
    await user.save();

    return sendSuccess(res, user.addresses, 'Address removed.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Toggle wishlist item
// @route POST /api/auth/wishlist/toggle
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return sendError(res, 'Product ID required.', 400);

    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    const exists = user.wishlist.includes(productId);
    if (exists) {
      user.wishlist = user.wishlist.filter(id => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    return sendSuccess(res, user.wishlist, exists ? 'Removed from wishlist.' : 'Added to wishlist.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Save skin diagnostic quiz result
// @route POST /api/auth/quiz
export const saveQuizResult = async (req, res) => {
  try {
    const { skinType, primaryConcern, sensitivity, prescribedRoutine } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    user.quizResult = {
      skinType,
      primaryConcern,
      sensitivity,
      prescribedRoutine,
      date: new Date()
    };

    await user.save();
    return sendSuccess(res, user.quizResult, 'Skin profile diagnostic saved.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

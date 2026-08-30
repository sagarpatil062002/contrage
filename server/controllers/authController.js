import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'contrage_jwt_super_secret_clinical_key_2026_998877', {
    expiresIn: '30d'
  });
};

// @desc Register a new user
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
      name,
      email: email.toLowerCase().trim(),
      password,
      phone: phone || '',
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
        addresses: user.addresses,
        wishlist: user.wishlist,
        quizResult: user.quizResult
      }
    }, 'User registered successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Authenticate user & get token
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
        addresses: user.addresses,
        wishlist: user.wishlist,
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
    if (!user) {
      return sendError(res, 'User not found.', 404);
    }
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

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (skinType) user.skinType = skinType;
    if (primaryConcern) user.primaryConcern = primaryConcern;
    if (sensitivity) user.sensitivity = sensitivity;

    const updatedUser = await user.save();
    return sendSuccess(res, {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      skinType: updatedUser.skinType,
      primaryConcern: updatedUser.primaryConcern,
      sensitivity: updatedUser.sensitivity,
      addresses: updatedUser.addresses,
      wishlist: updatedUser.wishlist,
      quizResult: updatedUser.quizResult
    }, 'Profile updated successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Add address
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
      isDefault: isDefault || user.addresses.length === 0
    };

    if (newAddr.isDefault) {
      user.addresses.forEach(a => a.isDefault = false);
    }

    user.addresses.push(newAddr);
    await user.save();

    return sendSuccess(res, user.addresses, 'Address added successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Delete address
// @route DELETE /api/auth/address/:id
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    user.addresses = user.addresses.filter(a => a.id !== req.params.id);
    await user.save();

    return sendSuccess(res, user.addresses, 'Address deleted successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Toggle wishlist item
// @route POST /api/auth/wishlist/toggle
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    const { productId } = req.body;
    if (!productId) return sendError(res, 'Product ID is required.', 400);

    const index = user.wishlist.indexOf(productId);
    let action = 'added';
    if (index > -1) {
      user.wishlist.splice(index, 1);
      action = 'removed';
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    return sendSuccess(res, { wishlist: user.wishlist, action }, `Item ${action} from wishlist.`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Save Skin Diagnostic Quiz Result
// @route POST /api/auth/quiz
export const saveQuizResult = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, 'User not found.', 404);

    const { skinType, primaryConcern, tolerance, routine } = req.body;
    user.quizResult = {
      skinType,
      primaryConcern,
      tolerance,
      routine,
      date: new Date()
    };
    if (skinType) user.skinType = skinType;
    if (primaryConcern) user.primaryConcern = primaryConcern;
    if (tolerance) user.sensitivity = tolerance;

    await user.save();
    return sendSuccess(res, user.quizResult, 'Diagnostic quiz saved to your profile.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

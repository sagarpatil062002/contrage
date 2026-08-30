import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'contrage_jwt_super_secret_clinical_key_2026_998877');
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return sendError(res, 'User not found for provided token.', 401);
      }
      return next();
    } catch (error) {
      return sendError(res, 'Not authorized, invalid or expired token.', 401);
    }
  }

  if (!token) {
    return sendError(res, 'Not authorized, no authentication token provided.', 401);
  }
};

export const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'contrage_jwt_super_secret_clinical_key_2026_998877');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return sendError(res, 'Access denied. Admin clinical privileges required.', 403);
  }
};

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/response.js';

// @desc Get authenticated user's cart
// @route GET /api/cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    return sendSuccess(res, cart);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Add / update item in cart
// @route POST /api/cart/items
export const addOrUpdateCartItem = async (req, res) => {
  try {
    const { productId, quantity = 1, selectedSize = 'Standard' } = req.body;

    const product = await Product.findOne({ $or: [{ id: productId }, { slug: productId }] });
    if (!product) return sendError(res, 'Product not found.', 404);

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const unitPrice = product.salePrice || product.price;

    const existingIndex = cart.items.findIndex(
      item => item.product.id === product.id && item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += Number(quantity);
      if (cart.items[existingIndex].quantity <= 0) {
        cart.items.splice(existingIndex, 1);
      }
    } else {
      if (quantity > 0) {
        cart.items.push({
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            salePrice: product.salePrice,
            heroImage: product.heroImage,
            slug: product.slug,
            category: product.category,
            stock: product.stock
          },
          quantity: Number(quantity),
          selectedSize,
          price: unitPrice
        });
      }
    }

    await cart.save();
    return sendSuccess(res, cart, 'Cart updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Remove specific item from cart
// @route DELETE /api/cart/items/:productId
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { size = 'Standard' } = req.query;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return sendSuccess(res, { items: [] });

    cart.items = cart.items.filter(
      item => !(item.product.id === productId && item.selectedSize === size)
    );

    await cart.save();
    return sendSuccess(res, cart, 'Item removed from cart.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Clear cart
// @route DELETE /api/cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      cart.appliedCoupon = null;
      await cart.save();
    }
    return sendSuccess(res, { items: [], appliedCoupon: null }, 'Cart cleared.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Merge guest local cart with DB cart upon login
// @route POST /api/cart/merge
export const mergeGuestCart = async (req, res) => {
  try {
    const { guestItems = [] } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    for (const item of guestItems) {
      if (!item.product || !item.product.id) continue;
      const product = await Product.findOne({ id: item.product.id });
      if (!product) continue;

      const size = item.selectedSize || 'Standard';
      const qty = item.quantity || 1;
      const price = product.salePrice || product.price;

      const existingIndex = cart.items.findIndex(
        ci => ci.product.id === product.id && ci.selectedSize === size
      );

      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += qty;
      } else {
        cart.items.push({
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            salePrice: product.salePrice,
            heroImage: product.heroImage,
            slug: product.slug,
            category: product.category,
            stock: product.stock
          },
          quantity: qty,
          selectedSize: size,
          price
        });
      }
    }

    await cart.save();
    return sendSuccess(res, cart, 'Guest cart merged successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

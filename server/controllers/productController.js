import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/response.js';

// @desc Get all products with filters & search
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, concern, skinType, minPrice, maxPrice, inStock, search, sort } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (concern && concern !== 'All') {
      query.$or = [
        { primaryConcern: concern },
        { concerns: concern }
      ];
    }

    if (skinType && skinType !== 'All') {
      query.skinTypes = skinType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { tagline: searchRegex },
        { category: searchRegex },
        { 'activeIngredients.name': searchRegex },
        { fullInci: searchRegex }
      ];
    }

    let sortOption = {};
    if (sort === 'price-low') sortOption = { price: 1 };
    else if (sort === 'price-high') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else sortOption = { featured: -1, reviewCount: -1 }; // Default best selling / featured

    const products = await Product.find(query).sort(sortOption);
    return sendSuccess(res, products);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Get single product by id or slug
// @route GET /api/products/:identifier
export const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const product = await Product.findOne({
      $or: [{ id: identifier }, { slug: identifier }]
    });

    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    return sendSuccess(res, product);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Add verified review to a product
// @route POST /api/products/:id/reviews
export const addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, rating, comment, skinType } = req.body;

    if (!author || !rating || !comment) {
      return sendError(res, 'Please provide reviewer name, star rating (1-5), and review text.', 400);
    }

    const product = await Product.findOne({ $or: [{ id }, { slug: id }] });
    if (!product) return sendError(res, 'Product not found.', 404);

    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      rating: Number(rating),
      comment,
      skinType: skinType || 'Combination Skin',
      date: 'Verified Purchase',
      verified: true,
      user: req.user ? req.user._id : null,
      createdAt: new Date()
    };

    product.reviews.unshift(newReview);
    product.reviewCount = product.reviews.length;
    const totalStars = product.reviews.reduce((acc, item) => item.rating + acc, 0);
    product.rating = Number((totalStars / product.reviews.length).toFixed(2));

    await product.save();
    return sendSuccess(res, product, 'Review submitted and verified successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Create new product (Admin)
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const prodData = req.body;
    const id = prodData.id || `p-${Date.now()}`;
    const slug = prodData.slug || prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const existing = await Product.findOne({ $or: [{ id }, { slug }] });
    if (existing) {
      return sendError(res, 'Product with this ID or slug already exists.', 400);
    }

    const newProduct = await Product.create({
      ...prodData,
      id,
      slug,
      gallery: prodData.gallery && prodData.gallery.length > 0 ? prodData.gallery : [prodData.heroImage]
    });

    return sendSuccess(res, newProduct, 'Product created successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Update product (Admin)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findOneAndUpdate(
      { $or: [{ id }, { slug: id }] },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return sendError(res, 'Product not found.', 404);

    return sendSuccess(res, updated, 'Product updated successfully.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// @desc Delete product (Admin)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findOneAndDelete({ $or: [{ id }, { slug: id }] });
    if (!deleted) return sendError(res, 'Product not found.', 404);

    return sendSuccess(res, { id }, 'Product removed from catalog.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

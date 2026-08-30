import Concern from '../models/Concern.js';
import Ingredient from '../models/Ingredient.js';
import Blog from '../models/Blog.js';
import Doctor from '../models/Doctor.js';
import ClinicalTrial from '../models/ClinicalTrial.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import Inquiry from '../models/Inquiry.js';
import SiteContent from '../models/SiteContent.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Coupon from '../models/Coupon.js';
import { sendSuccess, sendError } from '../utils/response.js';

// ==========================================
// CONCERNS
// ==========================================
export const getConcerns = async (req, res) => {
  try {
    const concerns = await Concern.find().sort({ createdAt: 1 });
    return sendSuccess(res, concerns);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getConcernBySlug = async (req, res) => {
  try {
    const concern = await Concern.findOne({ slug: req.params.slug });
    if (!concern) return sendError(res, 'Skin concern protocol not found.', 404);
    return sendSuccess(res, concern);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createConcern = async (req, res) => {
  try {
    const data = req.body;
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const concern = await Concern.create({ ...data, id: `concern-${Date.now()}`, slug });
    return sendSuccess(res, concern, 'Skin concern created.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateConcern = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Concern.findOneAndUpdate(
      { $or: [{ id }, { slug: id }] },
      req.body,
      { new: true }
    );
    if (!updated) return sendError(res, 'Concern not found.', 404);
    return sendSuccess(res, updated, 'Concern updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteConcern = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Concern.findOneAndDelete({ $or: [{ id }, { slug: id }] });
    if (!deleted) return sendError(res, 'Concern not found.', 404);
    return sendSuccess(res, { id }, 'Concern deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// ==========================================
// INGREDIENTS
// ==========================================
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find().sort({ name: 1 });
    return sendSuccess(res, ingredients);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getIngredientBySlug = async (req, res) => {
  try {
    const ingredient = await Ingredient.findOne({ slug: req.params.slug });
    if (!ingredient) return sendError(res, 'Ingredient not found.', 404);
    return sendSuccess(res, ingredient);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createIngredient = async (req, res) => {
  try {
    const data = req.body;
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const ingredient = await Ingredient.create({ ...data, id: `ing-${Date.now()}`, slug });
    return sendSuccess(res, ingredient, 'Ingredient created.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Ingredient.findOneAndUpdate(
      { $or: [{ id }, { slug: id }] },
      req.body,
      { new: true }
    );
    if (!updated) return sendError(res, 'Ingredient not found.', 404);
    return sendSuccess(res, updated, 'Ingredient updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ingredient.findOneAndDelete({ $or: [{ id }, { slug: id }] });
    if (!deleted) return sendError(res, 'Ingredient not found.', 404);
    return sendSuccess(res, { id }, 'Ingredient deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// ==========================================
// BLOGS / EDITORIAL
// ==========================================
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return sendSuccess(res, blogs);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ $or: [{ id }, { slug: id }] });
    if (!blog) return sendError(res, 'Article not found.', 404);
    return sendSuccess(res, blog);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createBlog = async (req, res) => {
  try {
    const data = req.body;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const blog = await Blog.create({ ...data, id: `blog-${Date.now()}`, slug });
    return sendSuccess(res, blog, 'Article published.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Blog.findOneAndUpdate({ $or: [{ id }, { slug: id }] }, req.body, { new: true });
    if (!updated) return sendError(res, 'Article not found.', 404);
    return sendSuccess(res, updated, 'Article updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findOneAndDelete({ $or: [{ id }, { slug: id }] });
    if (!deleted) return sendError(res, 'Article not found.', 404);
    return sendSuccess(res, { id }, 'Article deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// ==========================================
// DOCTORS & CLINICAL TRIALS & FAQS & TESTIMONIALS
// ==========================================
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: 1 });
    return sendSuccess(res, doctors);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createDoctor = async (req, res) => {
  try {
    const doc = await Doctor.create({ ...req.body, id: `doc-${Date.now()}` });
    return sendSuccess(res, doc, 'Doctor added to advisory board.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    return sendSuccess(res, updated, 'Doctor profile updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findOneAndDelete({ id: req.params.id });
    return sendSuccess(res, { id: req.params.id }, 'Doctor removed.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getClinicalTrials = async (req, res) => {
  try {
    const trials = await ClinicalTrial.find().sort({ createdAt: 1 });
    return sendSuccess(res, trials);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createClinicalTrial = async (req, res) => {
  try {
    const trial = await ClinicalTrial.create({ ...req.body, id: `trial-${Date.now()}` });
    return sendSuccess(res, trial, 'Clinical trial published.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateClinicalTrial = async (req, res) => {
  try {
    const updated = await ClinicalTrial.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    return sendSuccess(res, updated, 'Clinical trial updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteClinicalTrial = async (req, res) => {
  try {
    await ClinicalTrial.findOneAndDelete({ id: req.params.id });
    return sendSuccess(res, { id: req.params.id }, 'Clinical trial removed.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: 1 });
    return sendSuccess(res, faqs);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create({ ...req.body, id: `faq-${Date.now()}` });
    return sendSuccess(res, faq, 'FAQ created.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findOneAndDelete({ id: req.params.id });
    return sendSuccess(res, { id: req.params.id }, 'FAQ deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return sendSuccess(res, testimonials);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const test = await Testimonial.create({ ...req.body, id: `test-${Date.now()}` });
    return sendSuccess(res, test, 'Testimonial submitted for clinical review.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// ==========================================
// INQUIRIES / CONTACT
// ==========================================
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, concern, message } = req.body;
    if (!name || !email || !message) {
      return sendError(res, 'Please provide name, email, and message.', 400);
    }
    const inquiry = await Inquiry.create({
      id: `inq-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      concern: concern || 'General Clinical Inquiry',
      message,
      status: 'New',
      date: new Date().toISOString()
    });
    return sendSuccess(res, inquiry, 'Consultation inquiry submitted successfully.', 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return sendSuccess(res, inquiries);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const inquiry = await Inquiry.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) },
      { new: true }
    );
    if (!inquiry) return sendError(res, 'Inquiry not found.', 404);
    return sendSuccess(res, inquiry, 'Inquiry status updated.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findOneAndDelete({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] });
    return sendSuccess(res, { id }, 'Inquiry deleted.');
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

// ==========================================
// SITE CONTENT & CMS
// ==========================================
export const getSiteContent = async (req, res) => {
  try {
    const contents = await SiteContent.find();
    const formatted = {};
    contents.forEach(c => {
      formatted[c.key] = c.data;
    });
    return sendSuccess(res, formatted);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const updateSiteContent = async (req, res) => {
  try {
    const { key, data } = req.body;
    if (!key || !data) return sendError(res, 'Key and data required.', 400);

    const content = await SiteContent.findOneAndUpdate(
      { key },
      { key, data },
      { upsert: true, new: true }
    );
    return sendSuccess(res, content, `Content for "${key}" updated.`);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

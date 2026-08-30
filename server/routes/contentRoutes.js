import express from 'express';
import {
  getConcerns,
  getConcernBySlug,
  createConcern,
  updateConcern,
  deleteConcern,
  getIngredients,
  getIngredientBySlug,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getClinicalTrials,
  createClinicalTrial,
  updateClinicalTrial,
  deleteClinicalTrial,
  getFAQs,
  createFAQ,
  deleteFAQ,
  getTestimonials,
  createTestimonial,
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getSiteContent,
  updateSiteContent
} from '../controllers/contentController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Concerns
router.route('/concerns')
  .get(getConcerns)
  .post(protect, adminOnly, createConcern);
router.route('/concerns/:slug')
  .get(getConcernBySlug)
  .put(protect, adminOnly, updateConcern)
  .delete(protect, adminOnly, deleteConcern);

// Ingredients
router.route('/ingredients')
  .get(getIngredients)
  .post(protect, adminOnly, createIngredient);
router.route('/ingredients/:slug')
  .get(getIngredientBySlug)
  .put(protect, adminOnly, updateIngredient)
  .delete(protect, adminOnly, deleteIngredient);

// Blogs
router.route('/blogs')
  .get(getBlogs)
  .post(protect, adminOnly, createBlog);
router.route('/blogs/:id')
  .get(getBlogById)
  .put(protect, adminOnly, updateBlog)
  .delete(protect, adminOnly, deleteBlog);

// Doctors
router.route('/doctors')
  .get(getDoctors)
  .post(protect, adminOnly, createDoctor);
router.route('/doctors/:id')
  .put(protect, adminOnly, updateDoctor)
  .delete(protect, adminOnly, deleteDoctor);

// Clinical Trials
router.route('/trials')
  .get(getClinicalTrials)
  .post(protect, adminOnly, createClinicalTrial);
router.route('/trials/:id')
  .put(protect, adminOnly, updateClinicalTrial)
  .delete(protect, adminOnly, deleteClinicalTrial);

// FAQs
router.route('/faqs')
  .get(getFAQs)
  .post(protect, adminOnly, createFAQ);
router.route('/faqs/:id')
  .delete(protect, adminOnly, deleteFAQ);

// Testimonials
router.route('/testimonials')
  .get(getTestimonials)
  .post(createTestimonial);

// Inquiries / Consultation
router.route('/inquiries')
  .post(createInquiry)
  .get(protect, adminOnly, getInquiries);
router.route('/inquiries/:id')
  .put(protect, adminOnly, updateInquiryStatus)
  .delete(protect, adminOnly, deleteInquiry);

// Site Content CMS
router.route('/site-content')
  .get(getSiteContent)
  .put(protect, adminOnly, updateSiteContent);

export default router;

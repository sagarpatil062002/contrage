import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Import seed datasets from src/data
import { initialProducts } from '../../src/data/seedProducts.js';
import { initialConcerns } from '../../src/data/seedConcerns.js';
import { initialIngredients } from '../../src/data/seedIngredients.js';
import { initialBlogs } from '../../src/data/seedBlogs.js';
import { initialDoctors } from '../../src/data/seedDoctors.js';
import { initialCoupons, initialFAQs } from '../../src/data/seedCoupons.js';
import { initialSiteContent, initialClinicalTrials, initialInquiries } from '../../src/data/seedSiteContent.js';
import { initialTestimonials } from '../../src/data/seedTestimonials.js';

// Import Mongoose Models
import User from '../models/User.js';
import Product from '../models/Product.js';
import Concern from '../models/Concern.js';
import Ingredient from '../models/Ingredient.js';
import Blog from '../models/Blog.js';
import Doctor from '../models/Doctor.js';
import Coupon from '../models/Coupon.js';
import FAQ from '../models/FAQ.js';
import ClinicalTrial from '../models/ClinicalTrial.js';
import Inquiry from '../models/Inquiry.js';
import Testimonial from '../models/Testimonial.js';
import SiteContent from '../models/SiteContent.js';
import Order from '../models/Order.js';

export const runSeed = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI not defined in environment.');
    }

    console.log('\nConnecting to MongoDB Atlas for seed migration...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB Atlas successfully!\n');

    // 1. Users (Admin + Demo Customer) - Idempotent
    console.log('Seeding Users...');
    const adminEmail = 'admin@contrage.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Clinical Admin',
        email: adminEmail,
        password: 'Admin@ContrAge2026',
        role: 'ADMIN',
        phone: '+91 98000 00000',
        skinType: 'Normal',
        primaryConcern: 'Aging & Fine Lines'
      });
      console.log('  -> Created default Admin user: admin@contrage.com');
    } else {
      console.log('  -> Admin user already exists (idempotent skipped).');
    }

    const customerEmail = 'priya.sharma@example.com';
    const existingCustomer = await User.findOne({ email: customerEmail });
    if (!existingCustomer) {
      await User.create({
        name: 'Priya Sharma',
        email: customerEmail,
        password: 'Customer@123',
        role: 'CUSTOMER',
        phone: '+91 98765 43210',
        skinType: 'Oily / Combination',
        primaryConcern: 'Acne & Blemishes',
        sensitivity: 'Low-Medium',
        addresses: [
          {
            id: 'addr-1',
            name: 'Priya Sharma',
            phone: '+91 98765 43210',
            street: 'Flat 402, Lotus Greens, Sector 45',
            city: 'Gurugram',
            state: 'Haryana',
            pincode: '122003',
            isDefault: true
          }
        ],
        wishlist: ['p-1', 'p-4']
      });
      console.log('  -> Created default Customer user: priya.sharma@example.com');
    } else {
      console.log('  -> Customer user already exists (idempotent skipped).');
    }

    // 2. Products - Upsert by id
    console.log('Seeding Products...');
    for (const prod of initialProducts) {
      await Product.findOneAndUpdate(
        { id: prod.id },
        prod,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialProducts.length} clinical products.`);

    // 3. Concerns - Upsert by id / slug
    console.log('Seeding Concerns...');
    for (const concern of initialConcerns) {
      await Concern.findOneAndUpdate(
        { id: concern.id },
        concern,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialConcerns.length} skin concerns.`);

    // 4. Ingredients - Upsert by id / slug
    console.log('Seeding Ingredients...');
    for (const ing of initialIngredients) {
      const slug = ing.slug || ing.id.replace('ing-', '') || ing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await Ingredient.findOneAndUpdate(
        { id: ing.id },
        { ...ing, slug },
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialIngredients.length} ingredients.`);

    // 5. Blogs - Upsert by id
    console.log('Seeding Blogs...');
    for (const blog of initialBlogs) {
      await Blog.findOneAndUpdate(
        { id: blog.id },
        {
          ...blog,
          coverImage: blog.coverImage || blog.heroImage || '',
          heroImage: blog.heroImage || blog.coverImage || ''
        },
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialBlogs.length} clinical blog articles.`);

    // 6. Doctors - Upsert by id
    console.log('Seeding Doctors...');
    for (const doc of initialDoctors) {
      await Doctor.findOneAndUpdate(
        { id: doc.id },
        doc,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialDoctors.length} advisory board doctors.`);

    // 7. Coupons & FAQs - Upsert by code / id
    console.log('Seeding Coupons & FAQs...');
    for (const coup of initialCoupons) {
      await Coupon.findOneAndUpdate(
        { code: coup.code.toUpperCase() },
        coup,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialCoupons.length} coupons.`);

    for (const faq of initialFAQs) {
      await FAQ.findOneAndUpdate(
        { id: faq.id },
        faq,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialFAQs.length} FAQs.`);

    // 8. Clinical Trials - Upsert by id
    console.log('Seeding Clinical Trials...');
    for (const trial of initialClinicalTrials) {
      await ClinicalTrial.findOneAndUpdate(
        { id: trial.id },
        trial,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialClinicalTrials.length} clinical trials.`);

    // 9. Inquiries - Upsert by id
    console.log('Seeding Inquiries...');
    for (const inq of initialInquiries) {
      await Inquiry.findOneAndUpdate(
        { id: inq.id },
        inq,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialInquiries.length} initial inquiries.`);

    // 10. Testimonials - Upsert by id
    console.log('Seeding Testimonials...');
    for (const test of initialTestimonials) {
      await Testimonial.findOneAndUpdate(
        { id: test.id },
        test,
        { upsert: true, new: true }
      );
    }
    console.log(`  -> Upserted ${initialTestimonials.length} patient testimonials.`);

    // 11. Site CMS Content - Upsert by key
    console.log('Seeding Site CMS Content...');
    await SiteContent.findOneAndUpdate(
      { key: 'main_site_content' },
      { key: 'main_site_content', data: initialSiteContent },
      { upsert: true, new: true }
    );
    await SiteContent.findOneAndUpdate(
      { key: 'announcement' },
      {
        key: 'announcement',
        data: {
          text: '🌿 Formulated by 42+ Global Dermatologists • FREE Express Delivery Above ₹999 • Use Code FIRSTSKIN for 15% Off',
          link: '/shop',
          enabled: true
        }
      },
      { upsert: true, new: true }
    );
    console.log('  -> Upserted Site CMS content & announcement banner.');

    // 12. Seed Baseline Demo Order - Upsert by id
    const existingOrder = await Order.findOne({ id: 'ORD-84920' });
    if (!existingOrder) {
      await Order.create({
        id: 'ORD-84920',
        trackingNumber: 'DERMA-EXP-84920IN',
        status: 'In Transit',
        total: 1248,
        subtotal: 1248,
        discount: 0,
        shippingFee: 0,
        paymentMethod: 'UPI (Instant Verified)',
        customer: {
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          phone: '+91 98765 43210',
          address: 'Flat 402, Lotus Greens, Sector 45',
          city: 'Gurugram',
          state: 'Haryana',
          pincode: '122003'
        },
        items: [
          {
            product: {
              id: initialProducts[0].id,
              name: initialProducts[0].name,
              heroImage: initialProducts[0].heroImage,
              category: initialProducts[0].category,
              slug: initialProducts[0].slug
            },
            quantity: 1,
            selectedSize: '30ml',
            price: 549
          },
          {
            product: {
              id: initialProducts[3].id,
              name: initialProducts[3].name,
              heroImage: initialProducts[3].heroImage,
              category: initialProducts[3].category,
              slug: initialProducts[3].slug
            },
            quantity: 1,
            selectedSize: '50g',
            price: 699
          }
        ],
        checkpoints: [
          { status: 'Order Placed', time: 'Aug 20, 10:30 AM', completed: true, note: 'Prescription & formulation verified by clinical lab.' },
          { status: 'Formulation Packed', time: 'Aug 20, 02:15 PM', completed: true, note: 'Packed in cold-chain UV protective container.' },
          { status: 'Dispatched', time: 'Aug 21, 09:00 AM', completed: true, note: 'Handed over to Express Medical Logistics courier.' },
          { status: 'In Transit', time: 'Aug 22, 06:45 AM', completed: true, current: true, note: 'Out for local delivery via Delhi Central Hub.' },
          { status: 'Delivered', time: 'Estimated Today by 5:00 PM', completed: false, note: 'Pending customer doorstep delivery.' }
        ]
      });
      console.log('  -> Created baseline demo order ORD-84920.');
    } else {
      console.log('  -> Baseline demo order ORD-84920 already exists.');
    }

    // Collection Counts Verification
    console.log('\n--- VERIFYING DOCUMENT COUNTS IN MONGODB ATLAS ---');
    const counts = {
      users: await User.countDocuments(),
      products: await Product.countDocuments(),
      concerns: await Concern.countDocuments(),
      ingredients: await Ingredient.countDocuments(),
      blogs: await Blog.countDocuments(),
      doctors: await Doctor.countDocuments(),
      coupons: await Coupon.countDocuments(),
      faqs: await FAQ.countDocuments(),
      clinicaltrials: await ClinicalTrial.countDocuments(),
      inquiries: await Inquiry.countDocuments(),
      testimonials: await Testimonial.countDocuments(),
      sitecontents: await SiteContent.countDocuments(),
      orders: await Order.countDocuments()
    };

    console.table(counts);

    console.log('🎉 ALL SEED DATA MIGRATED TO MONGODB ATLAS SUCCESSFULLY!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeed();
}

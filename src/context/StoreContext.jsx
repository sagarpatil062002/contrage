import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/seedProducts';
import { initialConcerns } from '../data/seedConcerns';
import { initialIngredients } from '../data/seedIngredients';
import { initialBlogs } from '../data/seedBlogs';
import { initialDoctors } from '../data/seedDoctors';
import { initialTestimonials } from '../data/seedTestimonials';
import { initialCoupons, initialFAQs } from '../data/seedCoupons';
import { initialSiteContent, initialClinicalTrials, initialInquiries } from '../data/seedSiteContent';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  // 1. Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aesthederm_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // 2. Concerns & Ingredients
  const [concerns, setConcerns] = useState(() => {
    const saved = localStorage.getItem('aesthederm_concerns');
    return saved ? JSON.parse(saved) : initialConcerns;
  });

  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('aesthederm_ingredients');
    return saved ? JSON.parse(saved) : initialIngredients;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('aesthederm_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  // 3. Clinical Trials
  const [clinicalTrials, setClinicalTrials] = useState(() => {
    const saved = localStorage.getItem('aesthederm_clinical_trials');
    return saved ? JSON.parse(saved) : initialClinicalTrials;
  });

  // 4. Site CMS Content
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('aesthederm_site_content');
    return saved ? JSON.parse(saved) : initialSiteContent;
  });

  // 5. Inquiries & Contact Submissions
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('aesthederm_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // 6. Blogs & FAQs & Testimonials
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('aesthederm_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('aesthederm_faqs');
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('aesthederm_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // 7. Coupons & Announcement
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('aesthederm_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('aesthederm_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [announcement, setAnnouncement] = useState(() => {
    const saved = localStorage.getItem('aesthederm_announcement');
    return saved ? JSON.parse(saved) : {
      text: '🌿 Formulated by 42+ Global Dermatologists • FREE Express Delivery Above ₹999 • Use Code FIRSTSKIN for 15% Off',
      link: '/shop',
      enabled: true
    };
  });

  // 8. Cart & Wishlist
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aesthederm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aesthederm_wishlist');
    return saved ? JSON.parse(saved) : ['p-1', 'p-4'];
  });

  // 9. Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aesthederm_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ORD-84920',
        trackingNumber: 'DERMA-EXP-84920IN',
        date: '2026-08-20T10:30:00Z',
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
            product: initialProducts[0],
            quantity: 1,
            selectedSize: '30ml',
            price: 549
          },
          {
            product: initialProducts[3],
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
      }
    ];
  });

  // 10. User Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aesthederm_user');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: true,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
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
      ]
    };
  });

  // 11. Skin Quiz Diagnostic State
  const [quizResult, setQuizResult] = useState(() => {
    const saved = localStorage.getItem('aesthederm_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });

  // 12. UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('aesthederm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aesthederm_concerns', JSON.stringify(concerns));
  }, [concerns]);

  useEffect(() => {
    localStorage.setItem('aesthederm_ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('aesthederm_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('aesthederm_clinical_trials', JSON.stringify(clinicalTrials));
  }, [clinicalTrials]);

  useEffect(() => {
    localStorage.setItem('aesthederm_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('aesthederm_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('aesthederm_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('aesthederm_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('aesthederm_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('aesthederm_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('aesthederm_applied_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('aesthederm_announcement', JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem('aesthederm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aesthederm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aesthederm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aesthederm_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (quizResult) {
      localStorage.setItem('aesthederm_quiz_result', JSON.stringify(quizResult));
    }
  }, [quizResult]);

  // Toast Notification Helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Site Content Updater
  const updateSiteContent = (sectionKey, newSectionData) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...newSectionData
      }
    }));
    showToast(`Updated site content for "${sectionKey}".`);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const price = product.salePrice || product.price;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize: size, price }];
      }
    });

    showToast(`Added "${product.name.slice(0, 30)}..." to your clinical cart.`);
    setIsCartOpen(true);
  };

  const addRoutineBundleToCart = (bundleProducts) => {
    bundleProducts.forEach(prod => {
      const size = prod.sizes ? prod.sizes[0] : 'Standard';
      const price = prod.salePrice || prod.price;
      setCart(prev => {
        const existingIndex = prev.findIndex(item => item.product.id === prod.id && item.selectedSize === size);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += 1;
          return updated;
        } else {
          return [...prev, { product: prod, quantity: 1, selectedSize: size, price }];
        }
      });
    });
    showToast(`Added Complete Routine Bundle (${bundleProducts.length} items) to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, selectedSize, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
    showToast('Removed item from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  const freeShippingThreshold = 999;
  const shippingFee = (cartSubtotal >= freeShippingThreshold || (appliedCoupon && appliedCoupon.code === 'FREESHIP') || cartSubtotal === 0) ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Coupon Engine
  const applyCoupon = (code) => {
    const formatted = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === formatted && c.active);

    if (!found) {
      showToast('Invalid or expired coupon code.', 'error');
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (cartSubtotal < found.minSpend) {
      showToast(`Coupon requires a minimum order value of ₹${found.minSpend}.`, 'error');
      return { success: false, message: `Minimum spend of ₹${found.minSpend} required.` };
    }

    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied successfully! You saved ₹${found.type === 'percentage' ? Math.round((cartSubtotal * found.value) / 100) : found.value}.`);
    return { success: true };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your clinical wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTrackingNum = `DERMA-EXP-${Math.floor(10000 + Math.random() * 90000)}IN`;

    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: newOrderId,
      trackingNumber: newTrackingNum,
      date: now.toISOString(),
      status: 'Processing',
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee: shippingFee,
      total: cartTotal,
      couponApplied: appliedCoupon ? appliedCoupon.code : null,
      paymentMethod: orderData.paymentMethod || 'Credit/Debit Card (Simulated)',
      customer: {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        pincode: orderData.pincode
      },
      items: [...cart],
      checkpoints: [
        { status: 'Order Placed', time: formattedTime, completed: true, current: true, note: 'Order received and verified for clinical batch packaging.' },
        { status: 'Formulation Packed', time: 'Pending (~2-4 hours)', completed: false, note: 'UV & temperature controlled packaging.' },
        { status: 'Dispatched', time: 'Estimated Tomorrow', completed: false, note: 'Handover to express courier.' },
        { status: 'In Transit', time: 'Estimated 2-3 Days', completed: false, note: 'Local distribution dispatch.' },
        { status: 'Delivered', time: 'Estimated 3-4 Days', completed: false, note: 'Doorstep verification.' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Order Status update for Admin CMS
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
          new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const updatedCheckpoints = ord.checkpoints.map(cp => {
          if (cp.status.toLowerCase() === newStatus.toLowerCase()) {
            return { ...cp, completed: true, current: true, time: now };
          }
          if (newStatus === 'Delivered') {
            return { ...cp, completed: true, current: cp.status === 'Delivered' };
          }
          if (newStatus === 'Dispatched' && (cp.status === 'Order Placed' || cp.status === 'Formulation Packed')) {
            return { ...cp, completed: true };
          }
          return cp;
        });

        return {
          ...ord,
          status: newStatus,
          checkpoints: updatedCheckpoints
        };
      }
      return ord;
    }));
    showToast(`Order ${orderId} updated to "${newStatus}".`);
  };

  // Product CRUD (Admin CMS)
  const addProduct = (prodData) => {
    const newProduct = {
      ...prodData,
      id: `p-${Date.now()}`,
      slug: prodData.slug || prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewCount: 1,
      gallery: prodData.gallery && prodData.gallery.length > 0 ? prodData.gallery : [prodData.heroImage]
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast('New clinical product successfully created!');
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    showToast('Product specifications updated successfully.');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  // Product Review System
  const addReview = (productId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      rating: reviewData.rating,
      comment: reviewData.comment,
      skinType: reviewData.skinType || 'Combination Skin',
      date: 'Just now',
      verified: true
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const existingReviews = p.reviews || [];
        const updatedReviews = [newReview, ...existingReviews];
        const avgRating = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1);
        return {
          ...p,
          reviews: updatedReviews,
          rating: parseFloat(avgRating),
          reviewCount: updatedReviews.length
        };
      }
      return p;
    }));
    showToast('Your verified clinical review has been published!');
  };

  // Concern CRUD
  const addConcern = (concernData) => {
    const newConcern = {
      ...concernData,
      id: `concern-${Date.now()}`,
      slug: concernData.slug || concernData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setConcerns(prev => [newConcern, ...prev]);
    showToast(`Skin Concern "${newConcern.name}" created!`);
    return newConcern;
  };

  const updateConcern = (id, updatedData) => {
    setConcerns(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    showToast('Skin Concern protocol updated successfully.');
  };

  const deleteConcern = (id) => {
    setConcerns(prev => prev.filter(c => c.id !== id));
    showToast('Skin Concern protocol deleted.', 'info');
  };

  // Ingredients CRUD
  const addIngredient = (ingData) => {
    const newIng = {
      ...ingData,
      id: `ing-${Date.now()}`,
      slug: ingData.slug || ingData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    setIngredients(prev => [newIng, ...prev]);
    showToast(`Ingredient molecule "${newIng.name}" added to catalog.`);
    return newIng;
  };

  const updateIngredient = (id, updatedData) => {
    setIngredients(prev => prev.map(ing => ing.id === id ? { ...ing, ...updatedData } : ing));
    showToast('Ingredient profile updated.');
  };

  const deleteIngredient = (id) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
    showToast('Ingredient profile removed.', 'info');
  };

  // Clinical Trials CRUD
  const addClinicalTrial = (trialData) => {
    const newTrial = {
      ...trialData,
      id: `trial-${Date.now()}`
    };
    setClinicalTrials(prev => [newTrial, ...prev]);
    showToast('Published new clinical trial dataset.');
    return newTrial;
  };

  const updateClinicalTrial = (id, updatedData) => {
    setClinicalTrials(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
    showToast('Clinical trial updated.');
  };

  const deleteClinicalTrial = (id) => {
    setClinicalTrials(prev => prev.filter(t => t.id !== id));
    showToast('Clinical trial removed.', 'info');
  };

  // Doctor Board CRUD
  const addDoctor = (docData) => {
    const newDoc = {
      ...docData,
      id: `doc-${Date.now()}`
    };
    setDoctors(prev => [newDoc, ...prev]);
    showToast(`Dermatologist "${newDoc.name}" added to advisory board.`);
  };

  const updateDoctor = (id, updatedData) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...updatedData } : d));
    showToast('Doctor profile updated.');
  };

  const deleteDoctor = (id) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    showToast('Doctor profile removed.', 'info');
  };

  // Inquiries / Contact Leads
  const addInquiry = (inquiryData) => {
    const newInq = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'New'
    };
    setInquiries(prev => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
    showToast(`Inquiry status updated to "${status}".`);
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
    showToast('Inquiry removed from log.', 'info');
  };

  // Blog CRUD
  const addBlog = (blogData) => {
    const newBlog = {
      ...blogData,
      id: `blog-${Date.now()}`,
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setBlogs(prev => [newBlog, ...prev]);
    showToast('Published new clinical editorial!');
  };

  const updateBlog = (id, updatedData) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
    showToast('Article updated.');
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Article removed.', 'info');
  };

  // Coupon CRUD
  const addCoupon = (coupData) => {
    const newCoupon = {
      ...coupData,
      id: `coup-${Date.now()}`,
      code: coupData.code.toUpperCase().trim(),
      usageCount: 0,
      active: true
    };
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Created coupon "${newCoupon.code}".`);
  };

  const toggleCoupon = (id) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    showToast('Coupon status updated.');
  };

  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon deleted.', 'info');
  };

  // FAQ CRUD
  const addFAQ = (faqData) => {
    const newFAQ = { ...faqData, id: `faq-${Date.now()}` };
    setFaqs(prev => [...prev, newFAQ]);
    showToast('FAQ added.');
  };

  const deleteFAQ = (id) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast('FAQ deleted.', 'info');
  };

  // Testimonial CRUD
  const addTestimonial = (testData) => {
    const newTest = { ...testData, id: `test-${Date.now()}` };
    setTestimonials(prev => [newTest, ...prev]);
    showToast('Review submitted for clinical verification.');
  };

  // 1-Click Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setProducts(initialProducts);
    setConcerns(initialConcerns);
    setIngredients(initialIngredients);
    setDoctors(initialDoctors);
    setClinicalTrials(initialClinicalTrials);
    setSiteContent(initialSiteContent);
    setInquiries(initialInquiries);
    setBlogs(initialBlogs);
    setFaqs(initialFAQs);
    setTestimonials(initialTestimonials);
    setCoupons(initialCoupons);
    setCart([]);
    setWishlist(['p-1', 'p-4']);
    setAppliedCoupon(null);
    showToast('Demo store data successfully restored to factory defaults!');
  };

  const value = {
    // Data states
    products,
    concerns,
    ingredients,
    doctors,
    clinicalTrials,
    siteContent,
    inquiries,
    blogs,
    faqs,
    testimonials,
    coupons,
    appliedCoupon,
    announcement,
    cart,
    wishlist,
    orders,
    user,
    quizResult,

    // Calculations
    cartSubtotal,
    cartCount,
    discountAmount,
    shippingFee,
    cartTotal,
    freeShippingThreshold,

    // Modals
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    quickViewProduct,
    setQuickViewProduct,
    toastMessage,
    showToast,

    // Methods
    addToCart,
    addRoutineBundleToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    isWishlisted,
    placeOrder,
    updateOrderStatus,
    setUser,
    setQuizResult,
    setAnnouncement,

    // CMS Handlers
    updateSiteContent,
    addProduct,
    updateProduct,
    deleteProduct,
    addReview,
    addConcern,
    updateConcern,
    deleteConcern,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addClinicalTrial,
    updateClinicalTrial,
    deleteClinicalTrial,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,
    addBlog,
    updateBlog,
    deleteBlog,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    addFAQ,
    deleteFAQ,
    addTestimonial,
    resetDemoData
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

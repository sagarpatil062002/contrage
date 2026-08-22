import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/seedProducts';
import { initialConcerns } from '../data/seedConcerns';
import { initialIngredients } from '../data/seedIngredients';
import { initialBlogs } from '../data/seedBlogs';
import { initialDoctors } from '../data/seedDoctors';
import { initialTestimonials } from '../data/seedTestimonials';
import { initialCoupons, initialFAQs } from '../data/seedCoupons';

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

  const [ingredients] = useState(initialIngredients);
  const [doctors] = useState(initialDoctors);

  // 3. Blogs & FAQs & Testimonials
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

  // 4. Coupons & Announcement
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

  // 5. Cart & Wishlist
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aesthederm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aesthederm_wishlist');
    return saved ? JSON.parse(saved) : ['p-1', 'p-4'];
  });

  // 6. Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aesthederm_orders');
    if (saved) return JSON.parse(saved);
    // Seed initial demo orders
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

  // 7. User Profile
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

  // 8. Skin Quiz Diagnostic State
  const [quizResult, setQuizResult] = useState(() => {
    const saved = localStorage.getItem('aesthederm_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });

  // 9. UI Modals
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
    showToast(`Added Complete 3-Step Routine Bundle (${bundleProducts.length} items) to cart!`);
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
      slug: prodData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
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
    addProduct,
    updateProduct,
    deleteProduct,
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

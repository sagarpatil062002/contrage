const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('contrage_token') || localStorage.getItem('aesthederm_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `API Error: ${response.status} ${response.statusText}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    console.error(`Fetch error at ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Health
  checkHealth: () => request('/health'),

  // Auth
  auth: {
    sendOtp: (phone) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
    verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    adminLogin: (credentials) => request('/auth/admin-login', { method: 'POST', body: JSON.stringify(credentials) }),
    adminVerify2FA: (payload) => request('/auth/admin-verify-2fa', { method: 'POST', body: JSON.stringify(payload) }),
    getMe: () => request('/auth/me'),
    updateProfile: (profileData) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(profileData) }),
    addAddress: (addrData) => request('/auth/address', { method: 'POST', body: JSON.stringify(addrData) }),
    deleteAddress: (id) => request('/auth/address/' + id, { method: 'DELETE' }),
    toggleWishlist: (productId) => request('/auth/wishlist/toggle', { method: 'POST', body: JSON.stringify({ productId }) }),
    saveQuiz: (quizData) => request('/auth/quiz', { method: 'POST', body: JSON.stringify(quizData) })
  },

  // Products
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/products${query ? `?${query}` : ''}`);
    },
    getById: (idOrSlug) => request(`/products/${idOrSlug}`),
    addReview: (id, reviewData) => request(`/products/${id}/reviews`, { method: 'POST', body: JSON.stringify(reviewData) }),
    create: (prodData) => request('/products', { method: 'POST', body: JSON.stringify(prodData) }),
    update: (id, prodData) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(prodData) }),
    delete: (id) => request(`/products/${id}`, { method: 'DELETE' })
  },

  // Cart
  cart: {
    get: () => request('/cart'),
    addItem: (productId, quantity, selectedSize) => request('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, selectedSize })
    }),
    removeItem: (productId, size) => request(`/cart/items/${productId}${size ? `?size=${encodeURIComponent(size)}` : ''}`, {
      method: 'DELETE'
    }),
    clear: () => request('/cart', { method: 'DELETE' }),
    merge: (guestItems) => request('/cart/merge', { method: 'POST', body: JSON.stringify({ guestItems }) })
  },

  // Coupons
  coupons: {
    validate: (code, subtotal) => request('/coupons/validate', { method: 'POST', body: JSON.stringify({ code, subtotal }) }),
    getAll: () => request('/coupons'),
    create: (couponData) => request('/coupons', { method: 'POST', body: JSON.stringify(couponData) }),
    update: (id, couponData) => request(`/coupons/${id}`, { method: 'PUT', body: JSON.stringify(couponData) }),
    delete: (id) => request(`/coupons/${id}`, { method: 'DELETE' })
  },

  // Orders
  orders: {
    create: (orderPayload) => request('/orders', { method: 'POST', body: JSON.stringify(orderPayload) }),
    getMyOrders: () => request('/orders/myorders'),
    getByPhone: (phone) => request(`/orders/by-phone/${encodeURIComponent(phone)}`),
    getById: (idOrTracking) => request(`/orders/${idOrTracking}`),
    getAll: () => request('/orders/all'),
    updateStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) })
  },

  // Content & CMS
  content: {
    getConcerns: () => request('/content/concerns'),
    getConcern: (slug) => request(`/content/concerns/${slug}`),
    createConcern: (data) => request('/content/concerns', { method: 'POST', body: JSON.stringify(data) }),
    updateConcern: (id, data) => request(`/content/concerns/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteConcern: (id) => request(`/content/concerns/${id}`, { method: 'DELETE' }),

    getIngredients: () => request('/content/ingredients'),
    getIngredient: (slug) => request(`/content/ingredients/${slug}`),
    createIngredient: (data) => request('/content/ingredients', { method: 'POST', body: JSON.stringify(data) }),
    updateIngredient: (id, data) => request(`/content/ingredients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteIngredient: (id) => request(`/content/ingredients/${id}`, { method: 'DELETE' }),

    getBlogs: () => request('/content/blogs'),
    getBlog: (id) => request(`/content/blogs/${id}`),
    createBlog: (data) => request('/content/blogs', { method: 'POST', body: JSON.stringify(data) }),
    updateBlog: (id, data) => request(`/content/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBlog: (id) => request(`/content/blogs/${id}`, { method: 'DELETE' }),

    getDoctors: () => request('/content/doctors'),
    createDoctor: (data) => request('/content/doctors', { method: 'POST', body: JSON.stringify(data) }),
    updateDoctor: (id, data) => request(`/content/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteDoctor: (id) => request(`/content/doctors/${id}`, { method: 'DELETE' }),

    getTrials: () => request('/content/trials'),
    createTrial: (data) => request('/content/trials', { method: 'POST', body: JSON.stringify(data) }),
    updateTrial: (id, data) => request(`/content/trials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteTrial: (id) => request(`/content/trials/${id}`, { method: 'DELETE' }),

    getFAQs: () => request('/content/faqs'),
    createFAQ: (data) => request('/content/faqs', { method: 'POST', body: JSON.stringify(data) }),
    deleteFAQ: (id) => request(`/content/faqs/${id}`, { method: 'DELETE' }),

    getTestimonials: () => request('/content/testimonials'),
    createTestimonial: (data) => request('/content/testimonials', { method: 'POST', body: JSON.stringify(data) }),

    createInquiry: (data) => request('/content/inquiries', { method: 'POST', body: JSON.stringify(data) }),
    getInquiries: () => request('/content/inquiries'),
    updateInquiryStatus: (id, status, adminNotes) => request(`/content/inquiries/${id}`, { method: 'PUT', body: JSON.stringify({ status, adminNotes }) }),
    deleteInquiry: (id) => request(`/content/inquiries/${id}`, { method: 'DELETE' }),

    getSiteContent: () => request('/content/site-content'),
    updateSiteContent: (key, data) => request('/content/site-content', { method: 'PUT', body: JSON.stringify({ key, data }) })
  }
};

export const initialCoupons = [
  {
    id: 'coup-0',
    code: 'CONTRAGE10',
    type: 'percentage',
    value: 10,
    minSpend: 0,
    description: '10% Welcome Discount for Email, WhatsApp & SMS Subscribers',
    active: true,
    usageCount: 520
  },
  {
    id: 'coup-01',
    code: 'DRSIDDHI10',
    type: 'percentage',
    value: 10,
    minSpend: 0,
    description: '10% Dr. Siddhi VIP Clinical Welcome Offer',
    active: true,
    usageCount: 310
  },
  {
    id: 'coup-1',
    code: 'DERMA20',
    type: 'percentage',
    value: 20,
    minSpend: 999,
    description: '20% off on all clinical formulations (Min spend ₹999)',
    active: true,
    usageCount: 142
  },
  {
    id: 'coup-2',
    code: 'CLINIC500',
    type: 'fixed',
    value: 500,
    minSpend: 1999,
    description: 'Flat ₹500 discount on clinical bundles over ₹1,999',
    active: true,
    usageCount: 88
  },
  {
    id: 'coup-3',
    code: 'FIRSTSKIN',
    type: 'percentage',
    value: 15,
    minSpend: 0,
    description: '15% off on your first clinical order with zero minimum spend',
    active: true,
    usageCount: 421
  },
  {
    id: 'coup-4',
    code: 'FREESHIP',
    type: 'fixed',
    value: 99,
    minSpend: 499,
    description: 'Free Express Courier Shipping on all orders above ₹499',
    active: true,
    usageCount: 310
  }
];

export const initialFAQs = [
  {
    id: 'faq-1',
    category: 'Formulation & Safety',
    question: 'How do Aesthederm Labs formulations differ from conventional cosmetic brands?',
    answer: 'Every Aesthederm Labs product is formulated by practicing dermatologists using peer-reviewed, medical-grade active molecules at clinically validated concentrations. We disclose 100% of our active percentages, utilize buffered physiological pH levels (4.5–5.5), and eliminate synthetic fragrances, parabens, drying alcohols, and essential oils.'
  },
  {
    id: 'faq-2',
    category: 'Formulation & Safety',
    question: 'Can I use Niacinamide and Vitamin C in the same skincare routine?',
    answer: 'Yes! Modern clinical research shows that stable 3-O-Ethyl Ascorbic Acid and pure USP-grade Niacinamide can be layered together. However, for sensitive or reactive skin, we recommend applying your 15% Vitamin C serum in the morning (for daytime antioxidant protection) and your 10% Niacinamide serum in the evening.'
  },
  {
    id: 'faq-3',
    category: 'Skin Routines & Concerns',
    question: 'How do I know which products are right for my specific skin concern?',
    answer: 'You can use our interactive 4-step Skin Diagnostic Quiz on the website. Based on your skin type, primary concern, and sensitivity level, our diagnostic engine automatically builds a personalized 3-step routine (Cleanse, Treat, Seal/Protect) curated by our global dermatologist panel.'
  },
  {
    id: 'faq-4',
    category: 'Orders & Shipping',
    question: 'What are the delivery timelines and how can I track my order?',
    answer: 'Orders are dispatched within 24 hours via temperature-controlled express clinical courier. Standard delivery takes 2–4 business days across metro cities. Once your order is confirmed, you can track every checkpoint in real-time in your Customer Account portal using our live order tracking timeline.'
  },
  {
    id: 'faq-5',
    category: 'Professional & B2B',
    question: 'Do you provide wholesale formulations for dermatology clinics and aesthetic salons?',
    answer: 'Yes. We offer professional-size backbar products, clinical post-procedure protocols, and wholesale partnership pricing for licensed dermatologists, plastic surgeons, cosmetologists, and premium aesthetic salon owners. You can apply via our Contact & Professional Inquiries page.'
  },
  {
    id: 'faq-6',
    category: 'Orders & Shipping',
    question: 'What is your refund and return policy if a product does not suit my skin?',
    answer: 'We offer a 30-Day Clinical Satisfaction Guarantee. If you experience an adverse allergic reaction or are unsatisfied with your formulation, contact our dermatological support team with photos for a full refund or routine adjustment.'
  }
];

export const initialSiteContent = {
  hero: {
    eyebrow: 'DERMATOLOGIST-LED SKINCARE',
    titleLine1: 'Advanced Skincare.',
    titleLine2: 'Guided by Science.',
    description: 'Premium skincare formulations developed with dermatological expertise and designed around the needs of your skin.',
    primaryCtaText: 'Explore Products',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'Find Your Concern',
    secondaryCtaLink: '/concerns',
    badgeText: '100% Active Transparency',
    leftProductImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    centerProductImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    rightProductImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'
  },
  trustStrip: [
    {
      id: 'trust-1',
      title: '42+ Global Dermatologists',
      subtitle: 'Formulated & clinically validated by MDs across 12 countries'
    },
    {
      id: 'trust-2',
      title: '100% INCI Transparency',
      subtitle: 'Active molecule percentage disclosure on every single bottle'
    },
    {
      id: 'trust-3',
      title: 'In-Vivo Clinical Trials',
      subtitle: 'Corneometer & Sebumeter verified results without compromises'
    },
    {
      id: 'trust-4',
      title: 'Hypoallergenic Standard',
      subtitle: 'Fragrance-free, non-comedogenic, buffered at pH 4.5 – 5.5'
    }
  ],
  formulationPillars: [
    {
      id: 'pillar-1',
      title: 'Dermatological Expertise',
      description: 'Developed with professional skincare expertise and clinical advisory oversight.',
      iconKey: 'ShieldCheck',
      iconColor: '#6C5B8B'
    },
    {
      id: 'pillar-2',
      title: 'Research Driven',
      description: 'Formulations informed by published scientific dermatological research and in-vivo assays.',
      iconKey: 'FlaskConical',
      iconColor: '#3B5D92'
    },
    {
      id: 'pillar-3',
      title: 'Purposeful Ingredients',
      description: 'Carefully selected active molecules at functional percentages with 100% INCI transparency.',
      iconKey: 'Sparkles',
      iconColor: '#C28E46'
    },
    {
      id: 'pillar-4',
      title: 'Skin First',
      description: 'Designed around real skin concerns to restore, protect, and fortify your natural barrier.',
      iconKey: 'HeartHandshake',
      iconColor: '#438E75'
    }
  ],
  brand: {
    name: 'CONTRÂGE',
    tagline: 'YOUR PARTNER IN SKIN IMPROVEMENT',
    shortDescription: 'High-quality cosmeceutical formulations, non-invasive clinical treatments, and home care lines developed with medical precision, NDGA antioxidant science, and Dr. Siddhi advisory oversight.',
    supportEmail: 'care@contrage.com',
    helplinePhone: '+91 1800 233 4567',
    headquartersAddress: 'Clinical Formulation Labs, Mumbai & Gurugram, India',
    consultationHours: '9:00 AM – 7:00 PM IST (Mon-Sat)'
  }
};

export const initialClinicalTrials = [
  {
    id: 'trial-1',
    title: 'Post-Acne Erythema & Blemish Clearance',
    duration: '4-Week Randomized Blinded Trial (n=120)',
    formulation: '10% Niacinamide + 2% Zinc PCA Serum',
    metrics: [
      { label: 'Sebum Output Reduction', value: '43%', instrument: 'Sebumeter® SM 815' },
      { label: 'Blemish Redness Reduction', value: '88%', instrument: 'Mexameter® MX 18' },
      { label: 'Patient Barrier Improvement', value: '94%', instrument: 'Corneometer® CM 825' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    notes: 'Formulation introduced daily PM after mild cleansing. Zero transepidermal barrier disruption noted.'
  },
  {
    id: 'trial-2',
    title: 'Epidermal Barrier Restoration & Lipid Replenishment',
    duration: '14-Day Clinical Patch & Barrier Assay (n=85)',
    formulation: '5-Ceramide Biomimetic Restorative Emulsion',
    metrics: [
      { label: 'Transepidermal Water Loss', value: '-62%', instrument: 'Tewameter® TM 300' },
      { label: 'Epidermal Hydration', value: '+140%', instrument: 'Corneometer® CM 825' },
      { label: 'Sensitivity Index Reduction', value: '91%', instrument: 'Clinical Erythema Score' }
    ],
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    notes: 'Applied twice daily to chemically sensitized facial epidermis. Significant filaggrin protein upregulation observed.'
  }
];

export const initialInquiries = [
  {
    id: 'inq-1',
    type: 'wholesale',
    name: 'Dr. Ramesh Kulkarni',
    clinic: 'Kulkarni Dermatology & Laser Clinic',
    role: 'Medical Director',
    email: 'dr.kulkarni@dermlaser.in',
    phone: '+91 98230 11223',
    location: 'Bandra West, Mumbai',
    message: 'We are looking to stock Contrage post-laser restorative barrier creams and retinaldehyde serums for our clinical backbar and outpatient retail pharmacy.',
    date: '2026-08-21T14:30:00Z',
    status: 'Pending Contact'
  },
  {
    id: 'inq-2',
    type: 'general',
    name: 'Ananya Deshmukh',
    clinic: '',
    role: 'Patient',
    email: 'ananya.d@gmail.com',
    phone: '+91 97654 32190',
    location: 'Pune',
    message: 'Can I use the 10% Niacinamide serum together with the 15% Vitamin C serum in the morning, or should I alternate them?',
    date: '2026-08-22T09:15:00Z',
    status: 'Replied'
  }
];

export const initialDermatologistInquiries = [
  {
    id: 'b2b-1',
    doctorName: 'Dr. Siddharth Kapoor (MD, DNB Dermatology)',
    clinicName: 'Aura Skin & Cosmetology Centre',
    licenseNumber: 'MCI-REG-489201',
    gstin: '27AAAAA0000A1Z5',
    email: 'dr.kapoor@auraskinclinic.com',
    phone: '+91 98110 44552',
    city: 'Mumbai',
    state: 'Maharashtra',
    estimatedMonthlyUnits: '50-100 units',
    selectedTier: 'Tier 2 (45% Discount)',
    preferredProducts: ['3% Ceramide Complex Barrier Cream', '10% Niacinamide + 2% Zinc Serum', '0.1% Retinaldehyde Night Cream'],
    notes: 'Interested in post-chemical peel barrier repair protocol bundles for our aesthetic dermatology clinic patients.',
    status: 'Quotation Sent',
    date: '2026-08-28T11:20:00Z'
  },
  {
    id: 'b2b-2',
    doctorName: 'Dr. Radhika Sen (MBBS, MD Skin & VD)',
    clinicName: 'Sen Aesthetic Dermatology Studio',
    licenseNumber: 'WB-MED-89210',
    gstin: '19AABCS1429B1ZX',
    email: 'radhika.sen@dermatologystudio.com',
    phone: '+91 98300 77112',
    city: 'Kolkata',
    state: 'West Bengal',
    estimatedMonthlyUnits: '100+ units',
    selectedTier: 'Tier 3 (50% Discount)',
    preferredProducts: ['15% Vitamin C Ethyl Ascorbic Serum', '2% Salicylic Acid Cleanser', 'Centella Soothing Gel'],
    notes: 'Need sample testers and wholesale GST proforma for retail counter and procedural backbar.',
    status: 'Pending Review',
    date: '2026-08-30T16:45:00Z'
  }
];

export const initialMarketingLeads = [
  {
    id: 'lead-1',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@gmail.com',
    phone: '+91 98450 12345',
    skinConcern: 'Hyperpigmentation & Dark Spots',
    skinType: 'Combination',
    channels: {
      email: true,
      whatsapp: true,
      sms: true
    },
    couponGenerated: 'CONTRAGE10',
    source: 'Hero Lead Popup',
    createdAt: '2026-08-29T10:15:00Z'
  },
  {
    id: 'lead-2',
    name: 'Kavita Menon',
    email: 'kavita.m@yahoo.com',
    phone: '+91 97112 88990',
    skinConcern: 'Acne & Blemishes',
    skinType: 'Oily',
    channels: {
      email: true,
      whatsapp: true,
      sms: false
    },
    couponGenerated: 'CONTRAGE10',
    source: 'Footer WhatsApp Club',
    createdAt: '2026-08-30T14:22:00Z'
  },
  {
    id: 'lead-3',
    name: 'Arjun Singhania',
    email: 'arjun.singh@outlook.com',
    phone: '+91 98200 45678',
    skinConcern: 'Damaged Barrier & Redness',
    skinType: 'Sensitive',
    channels: {
      email: true,
      whatsapp: true,
      sms: true
    },
    couponGenerated: 'CONTRAGE10',
    source: 'Skin Diagnostic Consultation',
    createdAt: '2026-08-31T07:40:00Z'
  }
];


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
    centerProductImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=600&q=80',
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
    name: 'AESTHEDERM',
    tagline: 'LABORATOIRES DERMATOLOGIQUES',
    shortDescription: 'Advanced dermatological skincare formulations developed with global clinical expertise and 100% molecular transparency.',
    supportEmail: 'care@aesthedermlabs.com',
    helplinePhone: '+91 1800 233 4567',
    headquartersAddress: 'Cyber City, Tower 4B, Gurugram, India',
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
    beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f02e75e921d?auto=format&fit=crop&w=800&q=80',
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
    beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
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
    message: 'We are looking to stock Aesthederm post-laser restorative barrier creams and retinaldehyde serums for our clinical backbar and outpatient retail pharmacy.',
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

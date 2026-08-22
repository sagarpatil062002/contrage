export const initialProducts = [
  {
    id: 'p-1',
    name: '10% Niacinamide + 2% Zinc PCA Blemish Barrier Serum',
    slug: '10-niacinamide-2-zinc-pca-blemish-serum',
    tagline: 'High-strength clinical serum to regulate sebum, minimize enlarged pores, and fade post-acne blemishes.',
    category: 'Serums & Treatments',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes', 'Open Pores & Oiliness', 'Hyperpigmentation'],
    skinTypes: ['Oily / Combination', 'Acne-Prone', 'Sensitive', 'All Skin Types'],
    price: 699,
    salePrice: 549,
    rating: 4.88,
    reviewCount: 642,
    stock: 85,
    sizes: ['30ml', '50ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Niacinamide (Vitamin B3)', percentage: '10%', role: 'Suppresses sebum overproduction, calms inflammation and strengthens the epidermal lipid barrier.' },
      { name: 'Zinc PCA', percentage: '2%', role: 'Targeted antimicrobial active that inhibits Cutibacterium acnes and promotes cellular healing.' },
      { name: 'EUGELIA Bio-Ferment', percentage: '1.5%', role: 'Balances skin microbiome biodiversity.' }
    ],
    fullInci: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Butylene Glycol, Dimethyl Isosorbide, Propanediol, Sodium Hyaluronate, Centella Asiatica Extract, Allantoin, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA, Xanthan Gum.',
    clinicalResults: {
      stat1: '-42% Sebum secretion in 14 days',
      stat2: '91% saw visible reduction in acne marks within 3 weeks',
      stat3: '96% experienced refined pore elasticity'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Treatment Serum (After cleansing & toning, before moisturizer)',
      instructions: 'Dispense 2–3 drops onto fingertips and gently press into cleansed face and neck until fully absorbed.',
      warning: 'Perform a patch test 24 hours before first use. If pairing with Vitamin C, use Niacinamide in PM and Vitamin C in AM for optimal skin comfort.'
    },
    doctorNote: 'Formulated with ultra-pure Grade-USP Niacinamide with minimal residual nicotinic acid to prevent transient flushing. Recommended by Dr. Alistair Vance, Harley St.',
    badge: 'Clinical Best Seller',
    featured: true
  },
  {
    id: 'p-2',
    name: '2% Salicylic Acid (BHA) Deep Pore Clarifying Cleanser',
    slug: '2-salicylic-acid-bha-deep-pore-cleanser',
    tagline: 'Lipophilic beta-hydroxy acid foaming wash to dissolve blackheads, dead cellular buildup, and congested sebum.',
    category: 'Cleansers',
    primaryConcern: 'Open Pores & Oiliness',
    concerns: ['Acne & Blemishes', 'Open Pores & Oiliness'],
    skinTypes: ['Oily / Combination', 'Acne-Prone', 'Normal'],
    price: 499,
    salePrice: 429,
    rating: 4.82,
    reviewCount: 489,
    stock: 120,
    sizes: ['100ml', '200ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Encapsulated Salicylic Acid', percentage: '2%', role: 'Oil-soluble exfoliant penetrating deep inside follicular pores.' },
      { name: 'Betaine & Glycerin', percentage: '4%', role: 'Prevents barrier striping and maintains cellular hydration.' },
      { name: 'Tea Tree Terpinen-4-ol', percentage: '0.5%', role: 'Purifies bacterial congestion without irritation.' }
    ],
    fullInci: 'Aqua, Sodium Cocoyl Glycinate, Cocamidopropyl Betaine, Salicylic Acid, Glycerin, Betaine, Polyacrylate Crosspolymer-6, Melaleuca Alternifolia Leaf Extract, Citric Acid, Phenoxyethanol, Sodium Hydroxide.',
    clinicalResults: {
      stat1: '-58% Micro-comedones in 21 days',
      stat2: '88% reduction in active blackhead density',
      stat3: '100% non-stripping gentle surfactant base'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 1: Cleanser',
      instructions: 'Lather a coin-sized amount with lukewarm water on wet skin. Massage in circular motions for 60 seconds. Rinse thoroughly.',
      warning: 'Avoid direct contact with eyes. If dryness occurs, reduce usage to once daily.'
    },
    doctorNote: 'Encapsulated BHA allows time-released penetration, minimizing skin surface irritation while delivering maximum follicular decongestion.',
    badge: 'Dermatologist Choice',
    featured: true
  },
  {
    id: 'p-3',
    name: '0.1% Retinaldehyde + 1% Bakuchiol Age-Renewal Elixir',
    slug: '01-retinaldehyde-1-bakuchiol-age-renewal-elixir',
    tagline: 'Next-generation Vitamin A retinoid working 11x faster than retinol to stimulate collagen and smooth fine wrinkles.',
    category: 'Serums & Treatments',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Hyperpigmentation', 'Open Pores & Oiliness'],
    skinTypes: ['All Skin Types', 'Mature', 'Normal', 'Dry'],
    price: 1199,
    salePrice: 949,
    rating: 4.94,
    reviewCount: 382,
    stock: 40,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Crystal-Encapsulated Retinaldehyde', percentage: '0.1%', role: 'Direct precursor to retinoic acid, accelerating cellular turnover 11x faster than standard retinol.' },
      { name: 'Pure Bakuchiol Extract', percentage: '1%', role: 'Natural phyto-retinol synergy that boosts collagen synthesis while soothing.' },
      { name: 'Bisabolol & Allantoin', percentage: '0.8%', role: 'Prevents retinization flaking and reinforces barrier integrity.' }
    ],
    fullInci: 'Aqua, Caprylic/Capric Triglyceride, Squalane, Glycerin, Bakuchiol, Retinal, Bisabolol, Sodium Hyaluronate, Ceramide NP, Tocopherol, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin.',
    clinicalResults: {
      stat1: '+34% Dermal Collagen density in 8 weeks',
      stat2: '-27% Reduction in fine line depth after 6 weeks',
      stat3: '94% reported smoother, firmer skin elasticity'
    },
    howToUse: {
      am: false,
      pm: true,
      step: 'Step 2: PM Treatment Serum',
      instructions: 'Apply 1–2 pumps in the evening onto clean, dry skin. Follow with Ceramide Barrier Cream.',
      warning: 'Use sunscreen every morning. Introduce gradually: twice a week for the first 2 weeks, then alternate nights.'
    },
    doctorNote: 'Retinaldehyde provides prescription-like clinical results with minimal erythema. Formulated in airless protective pump packaging to preserve potency.',
    badge: 'Clinical Gold Standard',
    featured: true
  },
  {
    id: 'p-4',
    name: '3% Ceramide Complex + Ectoin Intensive Barrier Repair Cream',
    slug: '3-ceramide-complex-ectoin-intensive-barrier-cream',
    tagline: 'Multi-lamellar emulsion with physiological 3:1:1 lipid ratio (Ceramides, Cholesterol, Fatty Acids) + Ectoin.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Damaged Barrier',
    concerns: ['Damaged Barrier', 'Redness & Sensitivity', 'Dryness & Dehydration'],
    skinTypes: ['Sensitive', 'Dry', 'Compromised Barrier', 'All Skin Types'],
    price: 849,
    salePrice: 699,
    rating: 4.96,
    reviewCount: 712,
    stock: 95,
    sizes: ['50g', '100g'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Phyto-Ceramide Complex (NP, AP, EOP)', percentage: '3%', role: 'Mimics natural stratum corneum lipid bilayers to seal micro-fissures.' },
      { name: 'Ectoin Extreme-Protection Molecule', percentage: '1.5%', role: 'Protects cells from environmental stressors and transepidermal water loss.' },
      { name: 'Centella Asiatica (Madecassoside)', percentage: '1%', role: 'Immediate soothing of neuro-sensory redness and burning sensations.' }
    ],
    fullInci: 'Aqua, Butylene Glycol, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Ectoin, Madecassoside, Squalane, Panthenol, Carbomer.',
    clinicalResults: {
      stat1: '+68% Skin barrier recovery within 48 hours',
      stat2: '-53% Transepidermal Water Loss (TEWL) in 7 days',
      stat3: '98% relief in stinging & irritation on compromised skin'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Moisturizer & Barrier Seal',
      instructions: 'Apply generously to face and neck as the final hydrating step in your routine.',
      warning: 'Safe for post-dermatological procedures, laser recovery, and chemical peel aftercare.'
    },
    doctorNote: 'Restores the exact biomimetic 3:1:1 lipid balance essential for clinical barrier recovery after over-exfoliation or harsh climates.',
    badge: 'Dermatologist Prescribed',
    featured: true
  },
  {
    id: 'p-5',
    name: '15% Vitamin C (Ethyl Ascorbic) + Ferulic Acid Radiance Serum',
    slug: '15-vitamin-c-ethyl-ascorbic-ferulic-acid-serum',
    tagline: 'High-potency ultra-stable Vitamin C formulation that brightens stubborn dark spots and neutralizes free radicals.',
    category: 'Serums & Treatments',
    primaryConcern: 'Hyperpigmentation',
    concerns: ['Hyperpigmentation', 'Aging & Fine Lines'],
    skinTypes: ['All Skin Types', 'Normal', 'Oily / Combination', 'Dry'],
    price: 799,
    salePrice: 649,
    rating: 4.87,
    reviewCount: 524,
    stock: 65,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '3-O-Ethyl Ascorbic Acid', percentage: '15%', role: '86% pure ascorbic acid conversion with 18-month oxidative stability without yellowing.' },
      { name: 'Ferulic Acid', percentage: '0.5%', role: 'Doubles photoprotective efficacy and stabilizes active antioxidants.' },
      { name: 'Glutathione & Sodium Hyaluronate', percentage: '1%', role: 'Master intracellular antioxidant booster for luminous radiance.' }
    ],
    fullInci: 'Aqua, 3-O-Ethyl Ascorbic Acid, Ethoxydiglycol, Propanediol, Ferulic Acid, Glutathione, Sodium Hyaluronate, Polyacrylate Crosspolymer-6, Phenoxyethanol, Ethylhexylglycerin.',
    clinicalResults: {
      stat1: '-46% Melanin index in sun spots in 4 weeks',
      stat2: '89% demonstrated luminous complexion improvement',
      stat3: '+8x Environmental free radical protection'
    },
    howToUse: {
      am: true,
      pm: false,
      step: 'Step 2: AM Antioxidant Shield',
      instructions: 'Apply 3-4 drops to cleansed face in the morning. Always follow with Broad Spectrum SPF 50+.',
      warning: 'Store in a cool, dry place away from direct sunlight.'
    },
    doctorNote: 'Ethyl Ascorbic acid bypasses the rapid oxidation of L-Ascorbic acid while delivering equivalent cellular brightening.',
    badge: 'Clinical Award Winner',
    featured: true
  },
  {
    id: 'p-6',
    name: 'Invisible Fluid Sunscreen SPF 50+ PA++++ Hybrid UV Shield',
    slug: 'invisible-fluid-sunscreen-spf-50-hybrid-uv-shield',
    tagline: 'Ultra-lightweight, zero white cast fluid with Tinosorb S, Uvinul A Plus, and encapsulated mineral filters.',
    category: 'Sun Protection',
    primaryConcern: 'Sun Protection & UV Defense',
    concerns: ['Sun Protection & UV Defense', 'Aging & Fine Lines', 'Hyperpigmentation'],
    skinTypes: ['All Skin Types', 'Oily / Combination', 'Sensitive', 'Normal'],
    price: 649,
    salePrice: 519,
    rating: 4.95,
    reviewCount: 934,
    stock: 140,
    sizes: ['50ml', '100ml'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Tinosorb S & Uvinul A Plus', percentage: '6%', role: 'Photostable next-gen broad spectrum filters protecting against UVA I, UVA II, and UVB rays.' },
      { name: 'Niacinamide', percentage: '2%', role: 'Prevents UV-induced hyperpigmentation and calms redness.' },
      { name: 'Ectoin & Green Tea Leaf Extract', percentage: '1%', role: 'Defends against high-energy visible blue light and urban pollution.' }
    ],
    fullInci: 'Aqua, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Niacinamide, Glycerin, Ectoin, Camellia Sinensis Leaf Extract, Silica, Carbomer, Phenoxyethanol.',
    clinicalResults: {
      stat1: 'SPF 58.4 & PA++++ in-vivo certified clinical testing',
      stat2: '0% White cast across all Fitzpatrick skin phototypes I–VI',
      stat3: 'Water & sweat resistant for up to 80 minutes'
    },
    howToUse: {
      am: true,
      pm: false,
      step: 'Step 4: AM Final Shield',
      instructions: 'Apply 2 finger-lengths generously to face, neck, and ears 15 minutes before sun exposure. Reapply every 3 hours.',
      warning: 'For external use only. Keep out of eyes.'
    },
    doctorNote: 'Non-comedogenic, oil-free aqueous emulsion that leaves a breathable velvet matte finish without clogging pores.',
    badge: 'Voted Best Sunscreen 2026',
    featured: true
  },
  {
    id: 'p-7',
    name: '2% Alpha Arbutin + 5% Tranexamic Acid Pigmentation Corrector',
    slug: '2-alpha-arbutin-5-tranexamic-acid-pigmentation-corrector',
    tagline: 'Targeted dual-action depigmenting suspension for melasma, PIH, and stubborn post-inflammatory brown spots.',
    category: 'Serums & Treatments',
    primaryConcern: 'Hyperpigmentation',
    concerns: ['Hyperpigmentation', 'Acne & Blemishes'],
    skinTypes: ['All Skin Types', 'Melasma-Prone', 'Uneven Tone'],
    price: 899,
    salePrice: 729,
    rating: 4.89,
    reviewCount: 412,
    stock: 55,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Pure Alpha Arbutin', percentage: '2%', role: 'Inhibits tyrosinase activity to prevent excessive melanin transfer.' },
      { name: 'Tranexamic Acid', percentage: '5%', role: 'Suppresses plasmin-induced melanogenesis, specifically proven for stubborn hormonal melasma.' },
      { name: 'Kojic Acid Dipalmitate', percentage: '1%', role: 'Enhances cellular depigmentation without cytotoxicity.' }
    ],
    fullInci: 'Aqua, Tranexamic Acid, Alpha-Arbutin, Ethoxydiglycol, Kojic Dipalmitate, Glycerin, Sodium Hyaluronate, Hydroxyethylcellulose, Phenoxyethanol, Disodium EDTA.',
    clinicalResults: {
      stat1: '-51% Melasma severity score in 6 weeks',
      stat2: '93% visible fading of stubborn post-acne marks',
      stat3: 'Zero rebound hyperpigmentation upon discontinuation'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Pigment Targeted Treatment',
      instructions: 'Apply 2-3 drops to areas with localized hyperpigmentation or all over face. Layer with moisturizer and SPF.',
      warning: 'Continuous use for 6-8 weeks is recommended for optimal clinical outcomes.'
    },
    doctorNote: 'Combines two synergistic depigmenting pathways: tyrosinase inhibition and anti-plasmin inflammatory block.',
    badge: 'Clinical Grade Pigment Solution',
    featured: true
  },
  {
    id: 'p-8',
    name: 'Multi-Molecular 2% Hyaluronic Acid + Polyglutamic Hydrating Drops',
    slug: 'multi-molecular-2-hyaluronic-acid-polyglutamic-drops',
    tagline: '5 distinct molecular weights of Hyaluronic Acid + 0.5% Polyglutamic Acid for multi-depth cellular hydration.',
    category: 'Serums & Treatments',
    primaryConcern: 'Dryness & Dehydration',
    concerns: ['Dryness & Dehydration', 'Damaged Barrier', 'Aging & Fine Lines'],
    skinTypes: ['All Skin Types', 'Dehydrated', 'Dry', 'Sensitive'],
    price: 649,
    salePrice: 499,
    rating: 4.91,
    reviewCount: 580,
    stock: 90,
    sizes: ['30ml', '50ml'],
    heroImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '5-D Multi-Weight Hyaluronic Acid', percentage: '2%', role: 'Penetrates low, medium, and high dermal strata for instant and prolonged moisture.' },
      { name: 'Polyglutamic Acid (PGA)', percentage: '0.5%', role: 'Holds 5x more water than HA, forming a breathable moisture-locking film.' },
      { name: 'Pro-Vitamin B5 (Panthenol)', percentage: '1.5%', role: 'Supports tissue repair and enhances hydration retention.' }
    ],
    fullInci: 'Aqua, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Sodium Hyaluronate Crosspolymer, Polyglutamic Acid, Panthenol, Glycerin, Phenoxyethanol.',
    clinicalResults: {
      stat1: '+124% Instant epidermal hydration surge',
      stat2: '48-hour continuous moisture retention reservoir',
      stat3: '96% noticed instant plumping of dehydration lines'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Hydration Layer',
      instructions: 'Apply 2-3 drops onto damp skin immediately after cleansing. Gently pat and seal with a moisturizer.',
      warning: 'Always apply to damp skin to maximize water attraction into the stratum corneum.'
    },
    doctorNote: 'Combining HA with high-molecular Polyglutamic Acid prevents rapid transepidermal evaporation in air-conditioned or arid environments.',
    badge: 'Hydration Essential',
    featured: false
  },
  {
    id: 'p-9',
    name: '10% Azelaic Acid + Centella Soothing Suspension for Redness',
    slug: '10-azelaic-acid-centella-soothing-suspension',
    tagline: 'Medical-grade dicarboxylic acid cream-gel to calm facial erythema, rosacea flaring, and bumpy texture.',
    category: 'Serums & Treatments',
    primaryConcern: 'Redness & Sensitivity',
    concerns: ['Redness & Sensitivity', 'Acne & Blemishes', 'Hyperpigmentation'],
    skinTypes: ['Sensitive', 'Rosacea-Prone', 'Acne-Prone', 'All Skin Types'],
    price: 749,
    salePrice: 599,
    rating: 4.86,
    reviewCount: 310,
    stock: 50,
    sizes: ['30g'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Potassium Azeloyl Diglycinate & Azelaic Acid', percentage: '10%', role: 'Normalizes epidermal keratinization and calms inflammatory vascular flare-ups.' },
      { name: 'Centella Asiatica (Cica)', percentage: '2%', role: 'Soothes reactive irritation and accelerates micro-repair.' },
      { name: 'Colloidal Oat Extract', percentage: '1%', role: 'Natural beta-glucan barrier comfort.' }
    ],
    fullInci: 'Aqua, Azelaic Acid, Potassium Azeloyl Diglycinate, Propanediol, Cetearyl Alcohol, Centella Asiatica Extract, Avena Sativa Kernel Extract, Allantoin, Carbomer, Phenoxyethanol.',
    clinicalResults: {
      stat1: '-47% Facial erythema in 3 weeks',
      stat2: '86% reduction in rosacea flushing episodes',
      stat3: 'Safe for sensitive and reactive barrier conditions'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Soothing Treatment',
      instructions: 'Apply a pea-sized amount evenly across face. Can be used AM and PM.',
      warning: 'A slight tingling sensation may occur in the first few applications as your skin acclimates.'
    },
    doctorNote: 'Azelaic acid is a dermatologist favorite for dual-action targeting of both papulopustular rosacea and hyperpigmentation.',
    badge: 'Rosacea & Calming Hero',
    featured: false
  },
  {
    id: 'p-10',
    name: 'Peptide Matrix 5% + Matrixyl 3000 Firming Neck & Face Cream',
    slug: 'peptide-matrix-5-matrixyl-firming-cream',
    tagline: 'Multi-peptide firming peptide complex with Copper Tripeptide-1, Matrixyl 3000, and Argireline for skin elasticity.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Damaged Barrier'],
    skinTypes: ['Mature', 'Dry', 'Normal', 'All Skin Types'],
    price: 999,
    salePrice: 849,
    rating: 4.92,
    reviewCount: 295,
    stock: 45,
    sizes: ['50g'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Matrixyl 3000 & Palmitoyl Tripeptide-38', percentage: '3%', role: 'Signal peptides signaling dermal fibroblasts to synthesize new collagen & elastin.' },
      { name: 'Copper Tripeptide-1 (GHK-Cu)', percentage: '1%', role: 'Supports wound repair, tissue remodeling, and skin firmness.' },
      { name: 'Argireline (Acetyl Hexapeptide-8)', percentage: '1%', role: 'Botox-mimetic neurotransmitter peptide reducing expression line tension.' }
    ],
    fullInci: 'Aqua, Glycerin, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Copper Tripeptide-1, Acetyl Hexapeptide-8, Squalane, Butyrospermum Parkii Butter, Ceramide NP, Phenoxyethanol.',
    clinicalResults: {
      stat1: '+39% Skin elasticity & dermal firmness in 4 weeks',
      stat2: '-21% Deep wrinkle volume in 28 days',
      stat3: '92% noted visible jawline and neck tightening'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Firming Cream',
      instructions: 'Smooth over face, neck, and décolletage in an upward sweeping motion.',
      warning: 'Do not use simultaneously with strong acidic exfoliants (like 25% AHA) in the same routine to avoid peptide denaturation.'
    },
    doctorNote: 'Provides comprehensive peptide signal remodeling for patients who are retinol-sensitive or desiring collagen rejuvenation.',
    badge: 'Clinical Firming Formula',
    featured: false
  },
  {
    id: 'p-11',
    name: 'AHA 25% + BHA 2% + PHA 5% Weekly Peeling Solution',
    slug: 'aha-25-bha-2-pha-5-weekly-peeling-solution',
    tagline: 'Professional-strength at-home chemical peel with Glycolic, Lactic, Salicylic, and Gluconolactone acids + Tasmanian Pepperberry.',
    category: 'Exfoliants & Toners',
    primaryConcern: 'Open Pores & Oiliness',
    concerns: ['Open Pores & Oiliness', 'Hyperpigmentation', 'Acne & Blemishes'],
    skinTypes: ['Tolerant Skin', 'Oily / Combination', 'Dull / Textured'],
    price: 699,
    salePrice: 579,
    rating: 4.85,
    reviewCount: 620,
    stock: 75,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Glycolic & Lactic Acid (AHA)', percentage: '25%', role: 'Dissolves desmosomes holding dead cells together on skin surface for glass-skin luminosity.' },
      { name: 'Salicylic Acid (BHA)', percentage: '2%', role: 'Penetrates oil glands to clear stubborn comedones.' },
      { name: 'Gluconolactone (PHA) & Tasmanian Pepperberry', percentage: '5%', role: 'Gentle large-molecule acid + plant active to neutralize acid stinging.' }
    ],
    fullInci: 'Aqua, Glycolic Acid, Lactic Acid, Gluconolactone, Salicylic Acid, Tasmannia Lanceolata Fruit Extract, Sodium Hyaluronate, Hydroxyethylcellulose, Sodium Hydroxide, Phenoxyethanol.',
    clinicalResults: {
      stat1: 'Immediate 10-minute skin clarity & pore unblocking',
      stat2: '89% smoother dermal texture within 2 weekly uses',
      stat3: 'Buffered pH 3.6 for clinical safety and efficacy'
    },
    howToUse: {
      am: false,
      pm: true,
      step: 'Weekly Treatment (1x per week)',
      instructions: 'Apply evenly across clean, dry face. Leave on for NO MORE than 10 minutes. Rinse thoroughly with lukewarm water.',
      warning: 'Do not use on wet or peeling skin. Always use SPF 50+ during the week following chemical peeling.'
    },
    doctorNote: 'Formulated at buffered pH 3.5–3.7 to optimize free acid bioavailability while preventing epidermal burns.',
    badge: '10-Minute Clinical Glow',
    featured: false
  },
  {
    id: 'p-12',
    name: 'Micro-Exfoliating 5% Mandelic Acid Gentle Toner',
    slug: '5-mandelic-acid-gentle-exfoliating-toner',
    tagline: 'Large-molecule gentle AHA derived from bitter almonds, safe for sensitive skin and melanin-rich Fitzpatrick tones.',
    category: 'Exfoliants & Toners',
    primaryConcern: 'Open Pores & Oiliness',
    concerns: ['Open Pores & Oiliness', 'Hyperpigmentation', 'Redness & Sensitivity'],
    skinTypes: ['Sensitive', 'Uneven Texture', 'All Skin Types'],
    price: 549,
    salePrice: 449,
    rating: 4.81,
    reviewCount: 260,
    stock: 80,
    sizes: ['150ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Mandelic Acid', percentage: '5%', role: 'Gentle large molecular structure penetrates slower, avoiding inflammatory rebound.' },
      { name: 'Panthenol & Allantoin', percentage: '2%', role: 'Hydrating, skin-soothing conditioning.' }
    ],
    fullInci: 'Aqua, Mandelic Acid, Propanediol, Glycerin, Panthenol, Allantoin, Disodium EDTA, Phenoxyethanol.',
    clinicalResults: {
      stat1: '94% reported zero stinging or irritation',
      stat2: '-36% dead skin cell buildup in 10 days',
      stat3: 'Safe for daily or alternate night usage'
    },
    howToUse: {
      am: false,
      pm: true,
      step: 'Step 1.5: PM Toning Clarifier',
      instructions: 'Pour onto a reusable cotton pad or palms and sweep gently across face avoiding immediate eye contour.',
      warning: 'Use SPF the next morning.'
    },
    doctorNote: 'The gold-standard chemical exfoliant for sensitive, rosacea, or dark-skin patients susceptible to post-inflammatory pigment.',
    badge: 'Gentle Daily Exfoliant',
    featured: false
  },
  {
    id: 'p-13',
    name: 'Caffeine 5% + EGCG De-Puffing & Dark Circle Eye Contour Serum',
    slug: 'caffeine-5-egcg-eye-contour-serum',
    tagline: 'Vasoconstrictor caffeine solution with green tea epigallocatechin gallatyl glucoside to diminish periorbital puffiness.',
    category: 'Eye Care',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Hyperpigmentation'],
    skinTypes: ['All Skin Types'],
    price: 599,
    salePrice: 479,
    rating: 4.84,
    reviewCount: 390,
    stock: 65,
    sizes: ['15ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Pharmaceutical Grade Caffeine', percentage: '5%', role: 'Topical vasoconstrictor that rapidly drains fluid retention under the ocular orbital.' },
      { name: 'Green Tea EGCG Extract', percentage: '1%', role: 'Potent polyphenol neutralizing dark periorbital oxidative discoloration.' },
      { name: 'Micro-Hyaluronic Acid', percentage: '0.5%', role: 'Plumps delicate tear-trough fine lines without causing fluid edema.' }
    ],
    fullInci: 'Aqua, Caffeine, Epigallocatechin Gallatyl Glucoside, Glycerin, Sodium Hyaluronate, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin.',
    clinicalResults: {
      stat1: '-41% Under-eye puffiness in 30 minutes',
      stat2: '84% saw noticeable lightening of vascular dark circles in 4 weeks',
      stat3: 'Ophthalmologically tested and safe for contact lens wearers'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2.5: Eye Contour Care',
      instructions: 'Massage 1 drop around the eye contour in gentle tapping motions with ring finger.',
      warning: 'Avoid direct eye contact.'
    },
    doctorNote: 'Addresses both vascular fluid accumulation (caffeine) and hyperpigmentation deposits around the delicate periorbital area.',
    badge: 'Eye Care Favorite',
    featured: false
  },
  {
    id: 'p-14',
    name: 'Squalane + 5-Lipid Cleansing Oil with Vitamin E',
    slug: 'squalane-5-lipid-cleansing-oil',
    tagline: 'Silky, water-emulsifying oil cleanser to dissolve stubborn waterproof SPF, heavy makeup, and trapped sebum plugs.',
    category: 'Cleansers',
    primaryConcern: 'Open Pores & Oiliness',
    concerns: ['Open Pores & Oiliness', 'Damaged Barrier', 'Dryness & Dehydration'],
    skinTypes: ['All Skin Types', 'Dry', 'Oily / Combination', 'Sensitive'],
    price: 649,
    salePrice: 529,
    rating: 4.90,
    reviewCount: 345,
    stock: 70,
    sizes: ['150ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '100% Plant-Derived Squalane', percentage: '15%', role: 'Biocompatible lipid that dissolves stubborn sebum and silicones effortlessly.' },
      { name: 'Jojoba & Camellia Seed Oil Complex', percentage: '20%', role: 'Balances skin fatty acid composition without clogging pores.' },
      { name: 'Tocopherol (Pure Vitamin E)', percentage: '1%', role: 'Prevents lipid peroxidation.' }
    ],
    fullInci: 'Caprylic/Capric Triglyceride, Squalane, Simmondsia Chinensis Seed Oil, Camellia Oleifera Seed Oil, PEG-20 Glyceryl Triisostearate, Tocopherol.',
    clinicalResults: {
      stat1: '100% removal of waterproof sunscreen & pollutants in 1 step',
      stat2: '0% greasy residue after water rinse',
      stat3: 'Leaves barrier moisture levels elevated by +42%'
    },
    howToUse: {
      am: false,
      pm: true,
      step: 'Step 1: PM First Cleanse (Double Cleansing)',
      instructions: 'Pump 2–3 drops into dry hands. Massage onto dry face for 60 seconds. Add warm water to emulsify into a milky lotion, then rinse clean.',
      warning: 'Follow with BHA or gentle gel cleanser for complete double cleansing.'
    },
    doctorNote: 'Non-comedogenic hydrophilic formula that rinses clean without leaving an occlusive film that causes breakout breakouts.',
    badge: 'First Cleanse Essential',
    featured: false
  },
  {
    id: 'p-15',
    name: 'Cica Soothing Gel Moisturizer with Madecassoside',
    slug: 'cica-soothing-gel-moisturizer-madecassoside',
    tagline: 'Ultralight oil-free calming gel formulated for oily, acne-prone, and heat-inflamed reactive complexions.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes', 'Redness & Sensitivity', 'Open Pores & Oiliness'],
    skinTypes: ['Oily / Combination', 'Acne-Prone', 'Sensitive'],
    price: 649,
    salePrice: 519,
    rating: 4.88,
    reviewCount: 460,
    stock: 95,
    sizes: ['50g', '100g'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Centella Asiatica Leaf Water & Madecassoside', percentage: '70%', role: 'Cools surface skin temperature and down-regulates inflammatory cytokines.' },
      { name: 'Niacinamide & Zinc Gluconate', percentage: '2%', role: 'Controls shine and mattifies T-zone throughout the day.' }
    ],
    fullInci: 'Centella Asiatica Leaf Water, Aqua, Glycerin, Madecassoside, Asiaticoside, Niacinamide, Zinc Gluconate, Betaine, Carbomer, Arginine, Phenoxyethanol.',
    clinicalResults: {
      stat1: '-3.2°C Instant skin cooling sensation upon contact',
      stat2: '8-Hour oil-control shine reduction',
      stat3: '95% reported zero clogged pores or greasy sheen'
    },
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Lightweight Moisturizer',
      instructions: 'Apply a dime-sized amount across face and neck. Absorbs within 30 seconds to a refreshing matte finish.',
      warning: 'Ideal for tropical climates and humid summer seasons.'
    },
    doctorNote: 'The ultimate weightless moisturizer for oily and blemish-prone patients who hate the heavy feel of traditional creams.',
    badge: 'Oil-Free Calming Gel',
    featured: false
  },
  {
    id: 'p-16',
    name: 'Overnight Blemish Drying Lotion with Colloidal Sulfur & Zinc Oxide',
    slug: 'overnight-blemish-drying-lotion',
    tagline: 'Emergency spot treatment that visibly shrinks active inflammatory whiteheads and hormonal cystic bumps overnight.',
    category: 'Serums & Treatments',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes'],
    skinTypes: ['Acne-Prone', 'Emergency Spot Care'],
    price: 499,
    salePrice: 399,
    rating: 4.89,
    reviewCount: 512,
    stock: 85,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Colloidal Bio-Sulfur', percentage: '10%', role: 'Rapidly dehydrates surface sebum and sheds dead cells blocking the pore.' },
      { name: 'Zinc Oxide & Calamine', percentage: '8%', role: 'Calms redness, swelling, and localized skin heat.' },
      { name: 'Salicylic Acid', percentage: '2%', role: 'Clears deep follicular impactions.' }
    ],
    fullInci: 'Isopropyl Alcohol, Aqua, Zinc Oxide, Sulfur, Calamine, Salicylic Acid, Talc, Glycerin, Camphor.',
    clinicalResults: {
      stat1: '88% reduction in pimple size in 8 hours (overnight)',
      stat2: 'Prevents picking and scarring',
      stat3: 'Dries out active whiteheads without spreading bacteria'
    },
    howToUse: {
      am: false,
      pm: true,
      step: 'PM Emergency Spot Care',
      instructions: 'DO NOT SHAKE THE BOTTLE. Dip a clean cotton swab into the pink sediment at the bottom. Dab directly onto blemishes. Leave overnight and wash off in AM.',
      warning: 'Do not apply to broken or open wounds.'
    },
    doctorNote: 'Preserves the bi-phase solution so the isopropyl alcohol acts as an antiseptic vehicle while the active sediment dries the lesion.',
    badge: 'Overnight Rescue',
    featured: false
  }
];

// Authentic ContrÂge Clinical Skincare & Cosmeceutical Formulations
// Developed under Dr. Siddhi Dermatological Advisory Standards

export const initialProducts = [
  {
    id: 'p-1',
    sku: 'CON-SRM-NDGA-30',
    name: 'ContrÂge Cellular Intervention NDGA Serum',
    slug: 'contrage-cellular-intervention-ndga-serum',
    tagline: 'High-potency cellular antioxidant formulation with NDGA (Nordihydroguaiaretic Acid) to neutralize free radicals and fortify cellular integrity.',
    category: 'Serums & Boosters',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Barrier Repair', 'Open Pores & Oiliness'],
    skinTypes: ['All Skin Types', 'Mature', 'Sensitive', 'Normal'],
    price: 1899,
    salePrice: 1599,
    rating: 0,
    reviewCount: 0,
    stock: 65,
    sizes: ['30ml', '50ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Nordihydroguaiaretic Acid (NDGA)', percentage: '1.5%', role: 'Cellular antioxidant that regulates cell proliferation and neutralizes environmental free radicals.' },
      { name: 'Oleanolic Acid', percentage: '1.0%', role: 'Inhibits 5-alpha reductase to refine follicular elasticity and texture.' },
      { name: 'Biomimetic Tripeptide Complex', percentage: '2.0%', role: 'Stimulates extracellular matrix collagen synthesis.' }
    ],
    fullInci: 'Aqua, Butylene Glycol, PEG-60 Almond Glycerides, Caprylyl Glycol, Glycerin, Carbomer, Nordihydroguaiaretic Acid, Oleanolic Acid, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Sodium Hyaluronate, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Treatment Serum (After cleansing, before moisturizer)',
      instructions: 'Dispense 3–4 drops onto fingertips and gently press into cleansed face and neck until fully absorbed.',
      warning: 'For external use only. Perform a patch test 24 hours prior to initial application. Avoid contact with eyes.'
    },
    doctorNote: 'Dr. Siddhi Clinical Advisory: NDGA cellular serum is optimal for photo-damaged, environmentally stressed skin requiring deep antioxidant support.',
    badge: 'Signature Formulation',
    featured: true,
    reviews: []
  },
  {
    id: 'p-2',
    sku: 'CON-HYD-CRM-50',
    name: 'ContrÂge Hydra Line Intense Moisture Cream',
    slug: 'contrage-hydra-line-intense-moisture-cream',
    tagline: 'Multi-depth biomimetic hydration cream enriched with cross-linked Hyaluronic Acid and natural moisturizing factors (NMF).',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Dryness & Dehydration',
    concerns: ['Dryness & Dehydration', 'Barrier Repair', 'Redness & Sensitivity'],
    skinTypes: ['Dry', 'Dehydrated', 'Normal', 'Sensitive'],
    price: 1499,
    salePrice: 1249,
    rating: 0,
    reviewCount: 0,
    stock: 80,
    sizes: ['50ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Cross-Linked Hyaluronic Acid', percentage: '2.5%', role: 'Multi-molecular moisture reservoir providing 72-hour continuous hydration.' },
      { name: 'Ceramide NP & Phytosphingosine', percentage: '1.2%', role: 'Replenishes intercellular lipid matrix and seals transepidermal water loss.' },
      { name: 'Squalane (Plant-Derived)', percentage: '5.0%', role: 'Biocompatible lipid that softens skin texture without pore clogging.' }
    ],
    fullInci: 'Aqua, Squalane, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Sodium Hyaluronate Crosspolymer, Ceramide NP, Phytosphingosine, Cholesterol, Tocopherol, Dimethicone, Polyacrylate Crosspolymer-6, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Moisturizer',
      instructions: 'Smooth a dime-sized amount over face and neck morning and evening as the final hydration step.',
      warning: 'Store in a cool, dry place away from direct sunlight.'
    },
    doctorNote: 'Hydra Line formula is designed for instantaneous barrier recovery post-exposure to dry or air-conditioned environments.',
    badge: 'Hydra Collection',
    featured: true,
    reviews: []
  },
  {
    id: 'p-3',
    sku: 'CON-CLN-BHA-150',
    name: 'ContrÂge 2% Salicylic Acid Deep Pore Clarifying Cleanser',
    slug: 'contrage-2-salicylic-acid-deep-pore-cleanser',
    tagline: 'Lipophilic beta-hydroxy acid foaming wash to dissolve congested sebum, blackheads, and dead follicular buildup.',
    category: 'Cleansers & Toners',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes', 'Open Pores & Oiliness'],
    skinTypes: ['Oily / Combination', 'Acne-Prone', 'Normal'],
    price: 899,
    salePrice: 749,
    rating: 0,
    reviewCount: 0,
    stock: 95,
    sizes: ['150ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Encapsulated Salicylic Acid (BHA)', percentage: '2.0%', role: 'Time-released follicular exfoliant that clears comedones without surface irritation.' },
      { name: 'Zinc PCA', percentage: '1.0%', role: 'Antimicrobial regulator of sebaceous gland activity.' },
      { name: 'Betaine', percentage: '3.0%', role: 'Natural osmolyte that buffers skin against moisture loss during cleansing.' }
    ],
    fullInci: 'Aqua, Sodium Cocoyl Glycinate, Cocamidopropyl Betaine, Salicylic Acid, Glycerin, Betaine, Zinc PCA, Polyacrylate Crosspolymer-6, Melaleuca Alternifolia Leaf Extract, Allantoin, Citric Acid, Phenoxyethanol, Sodium Hydroxide.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 1: Cleanser',
      instructions: 'Lather a coin-sized amount with lukewarm water. Gently massage over face for 60 seconds. Rinse thoroughly.',
      warning: 'Avoid direct eye contact. If irritation occurs, reduce frequency to once daily.'
    },
    doctorNote: 'Formulated at pH 4.5–5.0 to optimize salicylic acid bioavailability without stripping the protective acid mantle.',
    badge: 'Dermatologist Choice',
    featured: true,
    reviews: []
  },
  {
    id: 'p-4',
    sku: 'CON-SRM-NIA-30',
    name: 'ContrÂge 10% Niacinamide + 2% Zinc PCA Blemish Barrier Serum',
    slug: 'contrage-10-niacinamide-2-zinc-pca-blemish-serum',
    tagline: 'High-purity clinical serum to regulate excess sebum, refine pore diameter, and fade post-inflammatory hyperpigmentation.',
    category: 'Serums & Boosters',
    primaryConcern: 'Acne & Blemishes',
    concerns: ['Acne & Blemishes', 'Open Pores & Oiliness', 'Hyperpigmentation'],
    skinTypes: ['Oily / Combination', 'Acne-Prone', 'Sensitive', 'All Skin Types'],
    price: 999,
    salePrice: 849,
    rating: 0,
    reviewCount: 0,
    stock: 110,
    sizes: ['30ml', '50ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Ultra-Pure Niacinamide (USP Grade)', percentage: '10.0%', role: 'Inhibits melanosome transfer, suppresses sebum output, and strengthens ceramide synthesis.' },
      { name: 'Zinc PCA', percentage: '2.0%', role: 'Synergistic anti-inflammatory zinc salt that targets blemish-causing bacteria.' },
      { name: 'Centella Asiatica (Cica) Extract', percentage: '2.0%', role: 'Calms redness and accelerates dermal recovery.' }
    ],
    fullInci: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Butylene Glycol, Centella Asiatica Leaf Extract, Propanediol, Sodium Hyaluronate, Allantoin, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA, Xanthan Gum.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Treatment Serum',
      instructions: 'Apply 2–3 drops morning and night to clean, damp face and neck before heavier creams.',
      warning: 'Patch test before use. Compatible with all ContrÂge formulations.'
    },
    doctorNote: 'Ultra-low residual nicotinic acid content ensures zero flushing response even on sensitive post-acne skin.',
    badge: 'Clinical Best Seller',
    featured: true,
    reviews: []
  },
  {
    id: 'p-5',
    sku: 'CON-SRM-RET-30',
    name: 'ContrÂge 0.1% Retinaldehyde + 1% Bakuchiol Age-Renewal Elixir',
    slug: 'contrage-01-retinaldehyde-1-bakuchiol-age-renewal-elixir',
    tagline: 'Next-generation Vitamin A retinoid requiring only one conversion step to retinoic acid for 11x faster collagen stimulation than retinol.',
    category: 'Serums & Boosters',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Hyperpigmentation', 'Open Pores & Oiliness'],
    skinTypes: ['All Skin Types', 'Mature', 'Normal'],
    price: 1999,
    salePrice: 1699,
    rating: 0,
    reviewCount: 0,
    stock: 45,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Encapsulated Retinaldehyde', percentage: '0.1%', role: 'Potent precursor directly converting to active retinoic acid, minimizing irritation while boosting elastin.' },
      { name: 'Bakuchiol (Psoralea Corylifolia)', percentage: '1.0%', role: 'Botanical retinoid-mimicking active that stabilizes retinal and boosts firmness.' },
      { name: 'Ectoin', percentage: '1.5%', role: 'Extremolyte cellular membrane stabilizer that protects against oxidative stress.' }
    ],
    fullInci: 'Aqua, Caprylic/Capric Triglyceride, Glycerin, Bakuchiol, Ectoin, Retinal, Phospholipids, Sodium Hyaluronate, Tocopheryl Acetate, Bisabolol, Polyacrylamide, C13-14 Isoparaffin, Laureth-7, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: {
      am: false,
      pm: true,
      step: 'Step 2: Night Treatment',
      instructions: 'Use PM only. Dispense 1 pump onto fingertips and distribute across face. Introduce 2–3 times per week, building up to nightly use.',
      warning: 'Always apply broad-spectrum SPF 50+ the following morning. Not recommended during pregnancy.'
    },
    doctorNote: 'Liposomal delivery shields the retinal molecule from photolytic degradation, maximizing nocturnal cellular renewal.',
    badge: 'High Potency',
    featured: true,
    reviews: []
  },
  {
    id: 'p-6',
    sku: 'CON-CRM-CER-50',
    name: 'ContrÂge 5-Ceramide Biomimetic Barrier Repair Emulsion',
    slug: 'contrage-5-ceramide-biomimetic-barrier-repair-emulsion',
    tagline: 'Physiological 3:1:1:1 lipid ratio emulsion formulated with 5 human-identical ceramides, cholesterol, and free fatty acids.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Barrier Repair',
    concerns: ['Barrier Repair', 'Dryness & Dehydration', 'Redness & Sensitivity'],
    skinTypes: ['Dry', 'Compromised Barrier', 'Sensitive', 'Normal'],
    price: 1399,
    salePrice: 1199,
    rating: 0,
    reviewCount: 0,
    stock: 75,
    sizes: ['50ml', '100ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '5-Ceramide Complex (EOP, NP, AP, AS, NS)', percentage: '3.0%', role: 'Identical lipid lamellae that rapidly repair damaged stratum corneum.' },
      { name: 'Physiological Cholesterol & Free Fatty Acids', percentage: '2.0%', role: 'Essential co-factors necessary for spontaneous lipid bilayer assembly.' },
      { name: 'Oat Beta-Glucan & Madecassoside', percentage: '1.5%', role: 'Deeply soothes stinging, erythema, and micro-fissures.' }
    ],
    fullInci: 'Aqua, Caprylic/Capric Triglyceride, Butyrospermum Parkii Butter, Ceramide EOP, Ceramide NP, Ceramide AP, Ceramide AS, Ceramide NS, Cholesterol, Phytosphingosine, Hydrogenated Lecithin, Avena Sativa Kernel Extract, Madecassoside, Glycerin, 1,2-Hexanediol, Carbomer.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Barrier Seal',
      instructions: 'Apply generously to face, neck, and any compromised zones requiring accelerated barrier recovery.',
      warning: 'Sterile pump packaging ensures active lipid preservation.'
    },
    doctorNote: 'Essential post-peel, post-laser, or during retinoid acclimatization to eliminate flaking and restore barrier competence.',
    badge: 'Barrier Fortification',
    featured: true,
    reviews: []
  },
  {
    id: 'p-7',
    sku: 'CON-SRM-TXA-30',
    name: 'ContrÂge 3% Tranexamic Acid + 2% Alpha Arbutin Pigment Corrector',
    slug: 'contrage-3-tranexamic-acid-2-alpha-arbutin-pigment-corrector',
    tagline: 'Multi-pathway clinical melanosome inhibitor to clear stubborn melasma, sun spots, and post-acne dark marks.',
    category: 'Serums & Boosters',
    primaryConcern: 'Hyperpigmentation',
    concerns: ['Hyperpigmentation', 'Aging & Fine Lines'],
    skinTypes: ['All Skin Types', 'Hyperpigmented', 'Sensitive'],
    price: 1299,
    salePrice: 1099,
    rating: 0,
    reviewCount: 0,
    stock: 55,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Tranexamic Acid (USP Grade)', percentage: '3.0%', role: 'Inhibits plasmin-induced melanocyte activation and reduces vascular redness in melasma.' },
      { name: 'Alpha Arbutin', percentage: '2.0%', role: 'Direct competitive tyrosinase enzyme inhibitor fading existing hyperpigmentation.' },
      { name: 'N-Acetyl Glucosamine', percentage: '2.0%', role: 'Synergistically accelerates pigment shedding with zero peeling.' }
    ],
    fullInci: 'Aqua, Tranexamic Acid, Alpha-Arbutin, Acetyl Glucosamine, Glycerin, Propanediol, Sodium Hyaluronate, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Sodium Metabisulfite.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Pigment Serum',
      instructions: 'Apply 3–4 drops directly to hyperpigmented zones or entire face morning and night.',
      warning: 'Pair with daily broad-spectrum sunscreen to prevent UV-mediated pigment recurrence.'
    },
    doctorNote: 'Dual action targeting both melanin synthesis and inflammatory angiogenesis associated with hormonal melasma.',
    badge: 'Clinical Depigmenting',
    featured: true,
    reviews: []
  },
  {
    id: 'p-8',
    sku: 'CON-SPF-MIN-50',
    name: 'ContrÂge Mineral Fluid Sunscreen SPF 50+ PA++++',
    slug: 'contrage-mineral-fluid-sunscreen-spf-50-pa',
    tagline: '100% mineral photostable photoprotection with non-nano Zinc Oxide, blue light defense, and invisible matte finish.',
    category: 'Sun Protection',
    primaryConcern: 'Sun Protection',
    concerns: ['Sun Protection', 'Aging & Fine Lines', 'Redness & Sensitivity'],
    skinTypes: ['All Skin Types', 'Sensitive', 'Post-Procedure', 'Acne-Prone'],
    price: 1199,
    salePrice: 999,
    rating: 0,
    reviewCount: 0,
    stock: 90,
    sizes: ['50ml'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Non-Nano Zinc Oxide', percentage: '18.0%', role: 'Full-spectrum physical barrier reflecting UVA/UVB photons without chemical filter sensitization.' },
      { name: 'Titanium Dioxide', percentage: '4.0%', role: 'Broad-spectrum UVB blocker and visible light shield.' },
      { name: 'Iron Oxides & Ectoin', percentage: '1.5%', role: 'Neutralizes High-Energy Visible (HEV) blue light and infrared radiation.' }
    ],
    fullInci: 'Zinc Oxide, Aqua, Cyclopentasiloxane, Titanium Dioxide, Isododecane, Butyloctyl Salicylate, Silica, Propanediol, Ectoin, Tocopherol, Dimethicone/Vinyl Dimethicone Crosspolymer, Polyglyceryl-4 Diisostearate, Iron Oxides, Phenoxyethanol.',
    howToUse: {
      am: true,
      pm: false,
      step: 'Step 4: Morning Sun Shield',
      instructions: 'Apply two finger-lengths generously to face and neck 15 minutes before sun exposure. Reapply every 2 hours if outdoors.',
      warning: 'Shake well before use. Suitable for post-laser and compromised barrier skin.'
    },
    doctorNote: 'Provides certified PA++++ critical wavelength protection (>370nm), essential for preventing pigment relapse.',
    badge: 'Mineral Defense',
    featured: true,
    reviews: []
  },
  {
    id: 'p-9',
    sku: 'CON-SRM-VITC-30',
    name: 'ContrÂge 15% Ethyl Ascorbic Acid + 0.5% Ferulic Radiance Booster',
    slug: 'contrage-15-ethyl-ascorbic-acid-05-ferulic-radiance-booster',
    tagline: 'Next-generation stable Vitamin C derivative delivering 86% pure ascorbic acid conversion with zero oxidation or discoloration.',
    category: 'Serums & Boosters',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Hyperpigmentation', 'Barrier Repair'],
    skinTypes: ['All Skin Types', 'Dull', 'Normal', 'Combination'],
    price: 1499,
    salePrice: 1249,
    rating: 0,
    reviewCount: 0,
    stock: 60,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '3-O-Ethyl Ascorbic Acid', percentage: '15.0%', role: 'Highly stable etherified Vitamin C active directly neutralizing reactive oxygen species and boosting collagen synthesis.' },
      { name: 'Ferulic Acid', percentage: '0.5%', role: 'Plant antioxidant that doubles the photoprotective efficiency of Vitamin C.' },
      { name: 'Sodium Hyaluronate', percentage: '1.0%', role: 'Hydrating osmotic buffer.' }
    ],
    fullInci: 'Aqua, 3-O-Ethyl Ascorbic Acid, Propanediol, Ethoxydiglycol, Ferulic Acid, Sodium Hyaluronate, Tocopherol, Panthenol, Phenoxyethanol, Ethylhexylglycerin, Sodium Citrate.',
    howToUse: {
      am: true,
      pm: false,
      step: 'Step 2: Morning Antioxidant Shield',
      instructions: 'Apply 3–4 drops in the morning to cleansed face and neck prior to moisturizer and SPF.',
      warning: 'Store away from direct light. Stable formula does not require refrigeration.'
    },
    doctorNote: 'Unlike conventional L-ascorbic acid, 3-O-Ethyl Ascorbic Acid does not require low irritating pH (<3.0) to penetrate the stratum corneum.',
    badge: 'Radiance Booster',
    featured: true,
    reviews: []
  },
  {
    id: 'p-10',
    sku: 'CON-EXF-AHA-30',
    name: 'ContrÂge 10% AHA + 2% BHA Chemical Resurfacing Solution',
    slug: 'contrage-10-aha-2-bha-chemical-resurfacing-solution',
    tagline: 'Dual-phase glycolic, lactic, and salicylic acid treatment to dissolve intercellular desmosomes and uncover radiant skin.',
    category: 'Exfoliators & Masks',
    primaryConcern: 'Open Pores & Oiliness',
    concerns: ['Open Pores & Oiliness', 'Acne & Blemishes', 'Hyperpigmentation'],
    skinTypes: ['Oily', 'Combination', 'Normal', 'Acne-Prone'],
    price: 1199,
    salePrice: 999,
    rating: 0,
    reviewCount: 0,
    stock: 40,
    sizes: ['30ml'],
    heroImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Glycolic & Lactic Acid Complex (AHA)', percentage: '10.0%', role: 'Loosens dead corneum corneocyte adhesion and stimulates cellular turnover.' },
      { name: 'Salicylic Acid (BHA)', percentage: '2.0%', role: 'Unclogs congested pore infundibulum.' },
      { name: 'Tasmanian Pepperberry Extract', percentage: '1.0%', role: 'Significantly reduces sensory discomfort and chemical erythema.' }
    ],
    fullInci: 'Aqua, Glycolic Acid, Lactic Acid, Salicylic Acid, Glycerin, Sodium Hydroxide, Tasmannia Lanceolata Fruit Extract, Propanediol, Sodium Hyaluronate, Panthenol, Xanthan Gum, Phenoxyethanol.',
    howToUse: {
      am: false,
      pm: true,
      step: 'Weekly Exfoliating Treatment',
      instructions: 'Apply evenly to clean, dry skin. Leave on for maximum 10 minutes. Rinse thoroughly with lukewarm water. Use once weekly.',
      warning: 'Do not leave on for longer than 10 minutes. Not suitable for compromised or broken skin. Use SPF daily.'
    },
    doctorNote: 'Buffered at pH 3.6 for optimal free acid availability with minimal stinging index.',
    badge: 'Weekly Intensive',
    featured: false,
    reviews: []
  },
  {
    id: 'p-11',
    sku: 'CON-GEL-CICA-60',
    name: 'ContrÂge Centella Asiatica & Madecassoside Calming Recovery Gel',
    slug: 'contrage-centella-asiatica-madecassoside-calming-recovery-gel',
    tagline: 'Sterile soothing recovery gel engineered with pure titrated Cica extracts for compromised, irritated, or post-procedure skin.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Redness & Sensitivity',
    concerns: ['Redness & Sensitivity', 'Barrier Repair'],
    skinTypes: ['Sensitive', 'Reactive', 'Post-Procedure', 'All Skin Types'],
    price: 999,
    salePrice: 849,
    rating: 0,
    reviewCount: 0,
    stock: 70,
    sizes: ['60ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Titrated Centella Asiatica (TECA)', percentage: '3.0%', role: 'Standardized Asiaticoside, Madecassic, and Asiatic acids promoting micro-vascular healing.' },
      { name: 'Madecassoside', percentage: '0.5%', role: 'Inhibits inflammatory cytokines and calms burning sensations.' },
      { name: 'Allantoin & Panthenol', percentage: '2.0%', role: 'Accelerates re-epithelialization.' }
    ],
    fullInci: 'Centella Asiatica Leaf Water, Aqua, Glycerin, Butylene Glycol, Madecassoside, Asiaticoside, Asiatic Acid, Madecassic Acid, Panthenol, Allantoin, Carbomer, Arginine, 1,2-Hexanediol, Hydroxyethylcellulose.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Soothing Gel',
      instructions: 'Apply a generous layer over sensitized areas. Can be applied as an intensive overnight sleeping soothing pack.',
      warning: 'Hypoallergenic and fragrance-free.'
    },
    doctorNote: 'Ideal soothing emergency care after chemical peels, microneedling, or acute barrier degradation.',
    badge: 'Post-Care Shield',
    featured: false,
    reviews: []
  },
  {
    id: 'p-12',
    sku: 'CON-EYE-PEP-15',
    name: 'ContrÂge Multi-Peptide & Caffeine Eye Contour Complex',
    slug: 'contrage-multi-peptide-caffeine-eye-contour-complex',
    tagline: 'Targeted periorbital treatment addressing micro-circulatory stagnation, dark shadows, and fine expression lines.',
    category: 'Serums & Boosters',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Hyperpigmentation'],
    skinTypes: ['All Skin Types', 'Mature', 'Sensitive'],
    price: 1399,
    salePrice: 1199,
    rating: 0,
    reviewCount: 0,
    stock: 50,
    sizes: ['15ml'],
    heroImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Encapsulated Caffeine', percentage: '3.0%', role: 'Vasoconstrictor that drains excess lymphatic fluid and reduces sub-orbital puffiness.' },
      { name: 'Eyeseryl® Tetrapeptide', percentage: '2.0%', role: 'Prevents vascular permeability and cross-linking of dermal collagen.' },
      { name: 'Matrixyl Synthe\'6', percentage: '2.0%', role: 'Fills crow\'s feet and under-eye hollows.' }
    ],
    fullInci: 'Aqua, Caffeine, Glycerin, Acetyl Tetrapeptide-5, Palmitoyl Tripeptide-38, Niacinamide, Sodium Hyaluronate, Hesperidin Methyl Chalcone, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 2: Eye Treatment',
      instructions: 'Dot half a pump along the orbital bone. Gently tap with ring finger until fully absorbed.',
      warning: 'Avoid getting product directly into the eyes.'
    },
    doctorNote: 'Ophthalmologist-evaluated formula suitable for contact lens wearers.',
    badge: 'Eye Care Precision',
    featured: false,
    reviews: []
  },
  {
    id: 'p-13',
    sku: 'CON-CLN-MIC-200',
    name: 'ContrÂge Purifying Micellar pH 5.5 Gentle Cleanser',
    slug: 'contrage-purifying-micellar-ph-55-gentle-cleanser',
    tagline: 'Non-ionic micellar surfactant wash buffered at biological pH 5.5 to remove particulate matter without barrier disruption.',
    category: 'Cleansers & Toners',
    primaryConcern: 'Barrier Repair',
    concerns: ['Barrier Repair', 'Redness & Sensitivity', 'Dryness & Dehydration'],
    skinTypes: ['Sensitive', 'Dry', 'Normal', 'Post-Procedure'],
    price: 799,
    salePrice: 699,
    rating: 0,
    reviewCount: 0,
    stock: 120,
    sizes: ['200ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Non-Ionic Poloxamer Micelles', percentage: '5.0%', role: 'Attracts lipophilic debris and dirt without stripping stratum corneum lipids.' },
      { name: 'Panthenol (Pro-Vitamin B5)', percentage: '1.5%', role: 'Prevents transepidermal water loss during rinsing.' },
      { name: 'Chamomile Bisabolol', percentage: '0.5%', role: 'Anti-irritant that soothes tight skin.' }
    ],
    fullInci: 'Aqua, Poloxamer 184, Glycerin, Panthenol, Bisabolol, Disodium Cocoamphodiacetate, Citric Acid, Disodium EDTA, Sodium Benzoate, Potassium Sorbate.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 1: Gentle Cleanser',
      instructions: 'Apply to wet skin or with a soft cotton pad. Gently cleanse face and neck. Rinse with lukewarm water.',
      warning: 'Suitable for daily morning and evening use.'
    },
    doctorNote: 'Buffered at exact skin barrier pH 5.5 to safeguard acid mantle microbiome integrity.',
    badge: 'Gentle Care',
    featured: false,
    reviews: []
  },
  {
    id: 'p-14',
    sku: 'CON-CRM-CRF-50',
    name: 'ContrÂge CereFino Liposomal Biomimetic Restorative Cream',
    slug: 'contrage-cerefino-liposomal-biomimetic-restorative-cream',
    tagline: 'Advanced European biotechnology cream utilizing CereFino lipid sphere delivery to transform skin resilience and density from within.',
    category: 'Moisturizers & Creams',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Barrier Repair', 'Dryness & Dehydration'],
    skinTypes: ['All Skin Types', 'Mature', 'Compromised'],
    price: 2499,
    salePrice: 2199,
    rating: 0,
    reviewCount: 0,
    stock: 35,
    sizes: ['50ml'],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'CereFino® Bio-Lipid Delivery Spheres', percentage: '4.0%', role: 'Encapsulated restorative lipids penetrating deep intercellular pathways.' },
      { name: 'Copper Tripeptide-1', percentage: '1.0%', role: 'Accelerates wound remodeling and collagen matrix density.' },
      { name: 'Niacinamide USP', percentage: '3.0%', role: 'Strengthens dermal barrier resilience.' }
    ],
    fullInci: 'Aqua, Caprylic/Capric Triglyceride, CereFino Lipid Complex, Copper Tripeptide-1, Niacinamide, Squalane, Butyrospermum Parkii, Dimethicone, Cetearyl Olivate, Sorbitan Olivate, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: {
      am: true,
      pm: true,
      step: 'Step 3: Advanced Bio-Restoration',
      instructions: 'Warm between fingertips and gently press into cleansed face and neck morning and evening.',
      warning: 'Store below 25°C.'
    },
    doctorNote: 'Dr. Siddhi Masterpiece: Combines Belgian cosmeceutical lipid technology with regenerative copper peptides.',
    badge: 'CereFino Technology',
    featured: true,
    reviews: []
  },
  {
    id: 'p-15',
    sku: 'CON-MSK-HYD-5PK',
    name: 'ContrÂge Bio-Cellulose Hyaluronic Infusion Mask (Box of 5)',
    slug: 'contrage-bio-cellulose-hyaluronic-infusion-mask-box-of-5',
    tagline: 'Fermented coconut bio-cellulose sheet mask drenched in 28ml of sterile multi-molecular hydration serum per pouch.',
    category: 'Exfoliators & Masks',
    primaryConcern: 'Dryness & Dehydration',
    concerns: ['Dryness & Dehydration', 'Redness & Sensitivity'],
    skinTypes: ['All Skin Types', 'Dehydrated', 'Post-Treatment'],
    price: 1299,
    salePrice: 1099,
    rating: 0,
    reviewCount: 0,
    stock: 55,
    sizes: ['5 Sheets (28ml each)'],
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '4D Hyaluronic Acid Matrix', percentage: '2.0%', role: 'Targeted hydration across surface, epidermal, and deep layers.' },
      { name: 'Polyglutamic Acid', percentage: '1.0%', role: 'Holds 5000x its weight in water, locking moisture inside skin cells.' },
      { name: 'Cucumber & Allantoin Elixir', percentage: '2.0%', role: 'Instantly cools skin temperature by 3°C.' }
    ],
    fullInci: 'Aqua, Glycerin, Sodium Hyaluronate Crosspolymer, Polyglutamic Acid, Cucumis Sativus Extract, Allantoin, Betaine, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: {
      am: false,
      pm: true,
      step: 'Intensive Hydration Mask',
      instructions: 'Unfold mask, remove protective mesh, and apply closely to contours of face. Relax for 20 minutes. Pat remaining serum into skin.',
      warning: 'Single use bio-cellulose mask.'
    },
    doctorNote: 'Second-skin bio-cellulose adhesion allows 10x higher serum absorption than traditional paper sheet masks.',
    badge: 'Express Hydration',
    featured: false,
    reviews: []
  },
  {
    id: 'p-16',
    sku: 'CON-PRO-PEEL-100',
    name: 'ContrÂge Professional Medical Peeling Complex 30% (Clinical Backbar)',
    slug: 'contrage-professional-medical-peeling-complex-30',
    tagline: 'Exclusive clinical backbar formulation for certified dermatologists and aesthetic clinics. Multi-acid peeling solution.',
    category: 'Professional & Backbar',
    primaryConcern: 'Hyperpigmentation',
    concerns: ['Hyperpigmentation', 'Aging & Fine Lines', 'Acne & Blemishes'],
    skinTypes: ['Professional Clinical Use Only'],
    price: 3499,
    salePrice: 2999,
    rating: 0,
    reviewCount: 0,
    stock: 25,
    sizes: ['100ml'],
    heroImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: 'Glycolic, Mandelic & Salicylic Acid Complex', percentage: '30.0%', role: 'Deep epidermolysis and controlled stratum corneum renewal under professional neutralization.' },
      { name: 'Glutathione & Kojic Acid', percentage: '3.0%', role: 'Targeted inhibition of dermal melanin clusters.' }
    ],
    fullInci: 'Aqua, Glycolic Acid, Mandelic Acid, Salicylic Acid, Kojic Acid, Glutathione, Sodium Hydroxide, Propylene Glycol, Hydroxyethylcellulose.',
    howToUse: {
      am: false,
      pm: false,
      step: 'In-Clinic Treatment Only',
      instructions: 'For registered dermatologists and certified clinicians only. Apply with fan brush according to clinic protocol.',
      warning: 'RESTRICTED: Medical registration required. Not for retail home use.'
    },
    doctorNote: 'Designed strictly for professional clinical dispensing and in-office chemical resurfacing protocols.',
    badge: 'Clinic Professional Only',
    featured: false,
    reviews: []
  },
  {
    id: 'p-17',
    sku: 'CON-PRO-MESO-50',
    name: 'ContrÂge Professional Meso-Infusion Multivitamin Ampoules (5 x 10ml)',
    slug: 'contrage-professional-meso-infusion-multivitamin-ampoules',
    tagline: 'Sterile clinical infusion vials with 50+ bio-revitalizing active molecules, hyaluronic acid, and oligopeptides.',
    category: 'Professional & Backbar',
    primaryConcern: 'Aging & Fine Lines',
    concerns: ['Aging & Fine Lines', 'Barrier Repair', 'Dryness & Dehydration'],
    skinTypes: ['Professional Clinical Use Only'],
    price: 4999,
    salePrice: 4299,
    rating: 0,
    reviewCount: 0,
    stock: 20,
    sizes: ['5 x 10ml Vials'],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    activeIngredients: [
      { name: '56 Bio-Revitalizing Active Nutrient Complex', percentage: '10.0%', role: 'Amino acids, co-enzymes, minerals, and nucleic acids for intense cellular revitalizing.' },
      { name: 'Uncross-Linked High Molecular HA', percentage: '1.5%', role: 'Immediate deep hydration and dermal volume replenishment.' }
    ],
    fullInci: 'Aqua, Sodium Hyaluronate, Alanine, Arginine, Asparagine, Glutamine, Glycine, Histidine, Isoleucine, Leucine, Lysine, Methionine, Phenylalanine, Proline, Serine, Threonine, Tryptophan, Tyrosine, Valine, Ascorbic Acid, Biotin, Cyanocobalamin, Folic Acid.',
    howToUse: {
      am: false,
      pm: false,
      step: 'In-Clinic Infusion Only',
      instructions: 'For use with clinical electroporation, sonophoresis, and professional transdermal delivery devices.',
      warning: 'Medical license verification required for wholesale purchase.'
    },
    doctorNote: 'Sterile grade bio-revitalizing cocktail meeting highest pharmaceutical purity standards.',
    badge: 'Clinic Professional Only',
    featured: false,
    reviews: []
  }
];

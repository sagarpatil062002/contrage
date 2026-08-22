export const initialConcerns = [
  {
    id: 'concern-acne',
    name: 'Acne & Active Blemishes',
    slug: 'acne-and-blemishes',
    shortDesc: 'Comedones, hormonal breakouts, cystic inflammation, and clogged follicular micro-channels.',
    iconName: 'Sparkles',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Acne vulgaris develops when androgen-driven sebaceous hyper-secretion combines with abnormal follicular hyper-keratinization, trapping Cutibacterium acnes bacteria and triggering inflammatory cascades.',
    recommendedActives: ['Salicylic Acid 2%', 'Niacinamide 10%', 'Zinc PCA 2%', 'Colloidal Sulfur', 'Azelaic Acid 10%'],
    contraindications: ['High-concentration physical facial scrubs', 'Comedogenic coconut oils', 'Heavy occlusive balms'],
    doctorTips: 'Target active lesions with lipophilic BHA and Niacinamide in the AM, and spot-treat at night. Never pick or squeeze inflammatory pustules to prevent post-inflammatory hyperpigmentation (PIH).',
    routineSteps: [
      { step: 'Step 1: Cleanse', productId: 'p-2', name: '2% Salicylic Acid BHA Cleanser', instruction: 'Massage 60s into wet skin to dissolve sebum plugs.' },
      { step: 'Step 2: Treat', productId: 'p-1', name: '10% Niacinamide + 2% Zinc PCA Serum', instruction: 'Apply 3 drops to calm redness and control oil.' },
      { step: 'Step 3: Moisturize', productId: 'p-15', name: 'Cica Soothing Gel Moisturizer', instruction: 'Hydrate without clogging pores with lightweight cica gel.' }
    ],
    recommendedProductIds: ['p-1', 'p-2', 'p-15', 'p-16', 'p-9']
  },
  {
    id: 'concern-pigmentation',
    name: 'Hyperpigmentation & Dark Spots',
    slug: 'hyperpigmentation-and-dark-spots',
    shortDesc: 'Melasma, post-inflammatory erythema/pigmentation (PIE/PIH), and UV-induced sun spots.',
    iconName: 'Sun',
    heroImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Melanogenesis is stimulated by UV radiation, vascular inflammation, and hormonal shifts. Excess melanin is packaged into melanosomes and transferred to keratinocytes, causing visible uneven skin tone.',
    recommendedActives: ['Tranexamic Acid 5%', 'Alpha Arbutin 2%', 'Ethyl Ascorbic Acid 15%', 'Kojic Acid', 'Retinaldehyde 0.1%'],
    contraindications: ['Unprotected UV sun exposure', 'Harsh friction on melanated skin'],
    doctorTips: 'Melanin control requires a multi-pathway strategy: block tyrosinase synthesis with Alpha Arbutin, inhibit melanosome transfer with Niacinamide, and shield daily with Broad Spectrum SPF 50+.',
    routineSteps: [
      { step: 'Step 1: AM Antioxidant', productId: 'p-5', name: '15% Vitamin C + Ferulic Acid Serum', instruction: 'Brighten and neutralize UV-induced oxidative stress.' },
      { step: 'Step 2: Targeted Corrector', productId: 'p-7', name: '2% Alpha Arbutin + 5% Tranexamic Acid', instruction: 'Inhibit melanin transfer on stubborn spots.' },
      { step: 'Step 3: UV Shield', productId: 'p-6', name: 'Invisible Fluid Sunscreen SPF 50+ PA++++', instruction: 'Essential daily defense against UV-triggered pigmentation.' }
    ],
    recommendedProductIds: ['p-7', 'p-5', 'p-6', 'p-1', 'p-3']
  },
  {
    id: 'concern-barrier',
    name: 'Damaged Skin Barrier & Redness',
    slug: 'damaged-skin-barrier',
    shortDesc: 'Stinging, sensitized erythema, transepidermal water loss (TEWL), and over-exfoliated skin.',
    iconName: 'ShieldCheck',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'When stratum corneum lipid bilayers (ceramides, cholesterol, fatty acids) are depleted by aggressive actives or harsh climates, microscopic cracks form, allowing moisture to escape and environmental allergens to penetrate.',
    recommendedActives: ['Ceramides NP/AP/EOP 3%', 'Ectoin', 'Madecassoside', 'Centella Asiatica', 'Panthenol 5%'],
    contraindications: ['Chemical peeling solutions', 'High strength retinoids during flare-ups', 'Alcohol-based astringents'],
    doctorTips: 'Adopt a "skin fasting" rehabilitation routine: pause all active acids and retinoids for 14 days, cleansing only with gentle non-foaming wash and applying physiological 3:1:1 lipid barrier creams.',
    routineSteps: [
      { step: 'Step 1: Gentle Cleanse', productId: 'p-14', name: 'Squalane + 5-Lipid Cleansing Oil', instruction: 'Cleanse without depleting essential natural lipids.' },
      { step: 'Step 2: Hydrate', productId: 'p-8', name: 'Multi-Molecular Hyaluronic Acid Drops', instruction: 'Saturate dehydrated cells with multi-depth moisture.' },
      { step: 'Step 3: Seal Barrier', productId: 'p-4', name: '3% Ceramide Complex + Ectoin Cream', instruction: 'Lock in moisture and repair stratum corneum lipid bilayers.' }
    ],
    recommendedProductIds: ['p-4', 'p-8', 'p-9', 'p-14', 'p-6']
  },
  {
    id: 'concern-aging',
    name: 'Aging, Fine Lines & Loss of Firmness',
    slug: 'aging-fine-lines-firmness',
    shortDesc: 'Collagen depletion, loss of dermal elasticity, dynamic wrinkles, and cellular slowdown.',
    iconName: 'Clock',
    heroImage: 'https://images.unsplash.com/photo-1608248597359-0f4f9db5642c?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Intrinsic cellular senescence combined with photoaging reduces fibroblast collagen I/III synthesis by ~1% per year after age 25. Dermal extracellular matrix thins, leading to wrinkle formation.',
    recommendedActives: ['Retinaldehyde 0.1%', 'Matrixyl 3000 Peptides', 'Copper Tripeptide-1', 'Bakuchiol', 'Ferulic Acid'],
    contraindications: ['Skipping sunscreen', 'Over-drying alcohol toners'],
    doctorTips: 'Retinoids are the only topical molecule proven to stimulate new pro-collagen in the dermis. Pair PM Retinaldehyde with daytime Vitamin C and multi-peptides.',
    routineSteps: [
      { step: 'Step 1: Daytime Protect', productId: 'p-5', name: '15% Vitamin C + Ferulic Acid', instruction: 'Shield collagen from free radical oxidation.' },
      { step: 'Step 2: PM Renewal', productId: 'p-3', name: '0.1% Retinaldehyde + 1% Bakuchiol', instruction: 'Stimulate cellular renewal 11x faster than retinol.' },
      { step: 'Step 3: Peptide Plump', productId: 'p-10', name: 'Peptide Matrix 5% Firming Cream', instruction: 'Signal fibroblasts to reconstruct extracellular matrix.' }
    ],
    recommendedProductIds: ['p-3', 'p-10', 'p-5', 'p-13', 'p-6']
  },
  {
    id: 'concern-pores',
    name: 'Enlarged Pores & Excess Sebum',
    slug: 'open-pores-excess-sebum',
    shortDesc: 'Oiliness, enlarged follicular openings, textured skin, and congested T-zone.',
    iconName: 'Maximize2',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Sebaceous gland hyperactivity expands the follicular infundibulum. When oxidized sebum and keratinized skin cells accumulate, the pore wall stretches and loses elastic recoil.',
    recommendedActives: ['Salicylic Acid (BHA)', 'Niacinamide 10%', 'Zinc PCA', 'Mandelic Acid 5%', 'Clay & Sulfur'],
    contraindications: ['Pore vacuum extractors causing broken capillaries', 'Aggressive alcohol pads'],
    doctorTips: 'You cannot physically "close" pores, but by keeping follicular canals free of oxidized sebum plugs and boosting surrounding collagen, pores appear tight and invisible.',
    routineSteps: [
      { step: 'Step 1: Clarify', productId: 'p-2', name: '2% Salicylic Acid Foaming Cleanser', instruction: 'Decongest pore walls daily.' },
      { step: 'Step 2: Tone & Exfoliate', productId: 'p-12', name: '5% Mandelic Acid Gentle Toner', instruction: 'Sweep away dead stratum corneum debris.' },
      { step: 'Step 3: Sebum Regulate', productId: 'p-1', name: '10% Niacinamide + 2% Zinc PCA Serum', instruction: 'Tighten pore elasticity and downregulate oil.' }
    ],
    recommendedProductIds: ['p-1', 'p-2', 'p-11', 'p-12', 'p-15']
  },
  {
    id: 'concern-sensitivity',
    name: 'Sensitive Skin, Rosacea & Flushing',
    slug: 'sensitive-skin-rosacea',
    shortDesc: 'Vascular reactivity, transient erythema, heat sensations, and allergic skin barrier.',
    iconName: 'HeartHandshake',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Heightened TRPV1 thermal receptor hypersensitivity and hyper-reactive micro-vasculature cause dilated capillaries, neurogenic stinging, and localized redness.',
    recommendedActives: ['Azelaic Acid 10%', 'Centella Asiatica', 'Colloidal Oat', 'Ectoin', 'Bisabolol'],
    contraindications: ['Essential oils', 'Synthetic fragrances', 'Astringent alcohol', 'Physical facial scrubs'],
    doctorTips: 'Use fragrance-free, dermatologically tested hypoallergenic products formulated at physiological skin pH (5.5) with soothing botanical adaptogens.',
    routineSteps: [
      { step: 'Step 1: Ultra-Gentle Cleanse', productId: 'p-14', name: 'Squalane + 5-Lipid Cleansing Oil', instruction: 'Cleanse without triggering vascular erythema.' },
      { step: 'Step 2: Anti-Redness Calm', productId: 'p-9', name: '10% Azelaic Acid + Centella Suspension', instruction: 'Calm dilated vessels and reduce inflammatory flushing.' },
      { step: 'Step 3: Barrier Guard', productId: 'p-4', name: '3% Ceramide Complex + Ectoin Cream', instruction: 'Reinforce defensive lipid envelope.' }
    ],
    recommendedProductIds: ['p-9', 'p-4', 'p-15', 'p-6', 'p-14']
  }
];

export const initialConcerns = [
  {
    id: 'concern-acne',
    name: 'Acne & Active Blemishes',
    slug: 'acne-and-blemishes',
    shortDesc: 'Comedones, hormonal breakouts, follicular congestion, and post-acne redness.',
    iconName: 'Sparkles',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Acne vulgaris develops when sebum hyper-secretion combines with abnormal follicular hyper-keratinization, trapping Cutibacterium acnes bacteria and triggering inflammatory cascades.',
    recommendedActives: ['Salicylic Acid 2%', 'Niacinamide 10%', 'Zinc PCA 2%', 'Centella Asiatica'],
    contraindications: ['High-friction physical facial scrubs', 'Comedogenic pore-clogging oils'],
    doctorTips: 'Target active lesions with lipophilic BHA and Niacinamide in the AM, and spot-treat at night. Never pick or squeeze inflammatory pustules to prevent post-inflammatory hyperpigmentation (PIH).',
    routineSteps: [
      { step: 'Step 1: Cleanse', productId: 'p-3', name: 'ContrÂge 2% Salicylic Acid Cleanser', instruction: 'Massage 60s into wet skin to dissolve sebum plugs.' },
      { step: 'Step 2: Treat', productId: 'p-4', name: 'ContrÂge 10% Niacinamide + 2% Zinc PCA Serum', instruction: 'Apply 3 drops to calm redness and control oil.' },
      { step: 'Step 3: Moisturize', productId: 'p-11', name: 'ContrÂge Centella Calming Recovery Gel', instruction: 'Hydrate without clogging pores with lightweight cica gel.' }
    ],
    recommendedProductIds: ['p-3', 'p-4', 'p-10', 'p-11']
  },
  {
    id: 'concern-pigmentation',
    name: 'Hyperpigmentation & Dark Spots',
    slug: 'hyperpigmentation-and-dark-spots',
    shortDesc: 'Melasma, post-inflammatory hyperpigmentation (PIH), and UV-induced sun spots.',
    iconName: 'Sun',
    heroImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Melanogenesis is stimulated by UV radiation, vascular inflammation, and hormonal shifts. Excess melanin is packaged into melanosomes and transferred to keratinocytes, causing uneven tone.',
    recommendedActives: ['Tranexamic Acid 3%', 'Alpha Arbutin 2%', 'Ethyl Ascorbic Acid 15%', 'Niacinamide 10%'],
    contraindications: ['Unprotected UV sun exposure', 'Harsh friction on melanated skin'],
    doctorTips: 'Melanin control requires a multi-pathway strategy: block tyrosinase synthesis with Alpha Arbutin & Tranexamic Acid, and shield daily with Broad Spectrum Mineral SPF 50+.',
    routineSteps: [
      { step: 'Step 1: AM Antioxidant', productId: 'p-9', name: 'ContrÂge 15% Ethyl Ascorbic Acid Booster', instruction: 'Brighten and neutralize UV-induced oxidative stress.' },
      { step: 'Step 2: Targeted Corrector', productId: 'p-7', name: 'ContrÂge 3% Tranexamic + 2% Alpha Arbutin', instruction: 'Inhibit melanin transfer on stubborn spots.' },
      { step: 'Step 3: UV Shield', productId: 'p-8', name: 'ContrÂge Mineral Fluid Sunscreen SPF 50+', instruction: 'Essential daily physical barrier against UV-triggered pigmentation.' }
    ],
    recommendedProductIds: ['p-7', 'p-9', 'p-8', 'p-4']
  },
  {
    id: 'concern-barrier',
    name: 'Damaged Skin Barrier & Redness',
    slug: 'damaged-skin-barrier',
    shortDesc: 'Stinging, sensitized erythema, transepidermal water loss (TEWL), and over-exfoliated skin.',
    iconName: 'ShieldCheck',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'When stratum corneum lipid bilayers (ceramides, cholesterol, fatty acids) are depleted by aggressive actives or harsh climates, microscopic cracks form, allowing moisture to escape.',
    recommendedActives: ['5-Ceramide Complex', 'Phytosphingosine', 'Madecassoside', 'Cross-Linked Hyaluronic Acid'],
    contraindications: ['Chemical peeling solutions during flare-ups', 'High-strength acids on broken skin'],
    doctorTips: 'Adopt a "barrier recovery" routine: pause all active acids and retinoids for 14 days, cleansing only with gentle pH 5.5 micellar wash and applying physiological 3:1:1 lipid barrier creams.',
    routineSteps: [
      { step: 'Step 1: Gentle Cleanse', productId: 'p-13', name: 'ContrÂge Purifying Micellar pH 5.5 Cleanser', instruction: 'Cleanse without depleting essential natural lipids.' },
      { step: 'Step 2: Hydrate', productId: 'p-2', name: 'ContrÂge Hydra Line Intense Moisture Cream', instruction: 'Saturate dehydrated cells with multi-depth moisture.' },
      { step: 'Step 3: Seal Barrier', productId: 'p-6', name: 'ContrÂge 5-Ceramide Barrier Repair Emulsion', instruction: 'Lock in moisture and repair stratum corneum lipid bilayers.' }
    ],
    recommendedProductIds: ['p-6', 'p-2', 'p-11', 'p-13', 'p-15']
  },
  {
    id: 'concern-aging',
    name: 'Aging, Fine Lines & Loss of Firmness',
    slug: 'aging-fine-lines-firmness',
    shortDesc: 'Collagen depletion, oxidative stress, dynamic wrinkles, and loss of dermal density.',
    iconName: 'Clock',
    heroImage: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Intrinsic cellular senescence combined with photoaging reduces fibroblast collagen synthesis. Dermal extracellular matrix thins, leading to fine lines and loss of elasticity.',
    recommendedActives: ['NDGA (Nordihydroguaiaretic Acid)', 'Retinaldehyde 0.1%', 'Copper Tripeptide-1', 'Bakuchiol 1%'],
    contraindications: ['Skipping sunscreen', 'Over-drying alcohol toners'],
    doctorTips: 'Pair nocturnal Retinaldehyde with morning NDGA antioxidant protection and liposomal biomimetic peptide creams.',
    routineSteps: [
      { step: 'Step 1: Daytime Protect', productId: 'p-1', name: 'ContrÂge Cellular Intervention NDGA Serum', instruction: 'Shield collagen from free radical oxidation.' },
      { step: 'Step 2: PM Renewal', productId: 'p-5', name: 'ContrÂge 0.1% Retinaldehyde + 1% Bakuchiol', instruction: 'Stimulate cellular renewal 11x faster than retinol.' },
      { step: 'Step 3: Bio-Restoration', productId: 'p-14', name: 'ContrÂge CereFino Liposomal Restorative Cream', instruction: 'Reconstruct extracellular matrix and restore density.' }
    ],
    recommendedProductIds: ['p-1', 'p-5', 'p-14', 'p-12', 'p-9']
  },
  {
    id: 'concern-pores',
    name: 'Enlarged Pores & Excess Sebum',
    slug: 'open-pores-excess-sebum',
    shortDesc: 'Oiliness, enlarged follicular openings, textured skin, and congested T-zone.',
    iconName: 'Maximize2',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Sebaceous gland hyperactivity expands the follicular infundibulum. When oxidized sebum and keratinized skin cells accumulate, the pore wall stretches and loses elastic recoil.',
    recommendedActives: ['Salicylic Acid 2%', 'Niacinamide 10%', 'Zinc PCA 2%', 'AHA/BHA Complex'],
    contraindications: ['Aggressive pore vacuum extractors', 'Harsh alcohol astringents'],
    doctorTips: 'Keep follicular canals free of oxidized sebum plugs and support collagen scaffolding to make pores appear refined and tight.',
    routineSteps: [
      { step: 'Step 1: Clarify', productId: 'p-3', name: 'ContrÂge 2% Salicylic Acid Cleanser', instruction: 'Decongest pore walls daily.' },
      { step: 'Step 2: Sebum Regulate', productId: 'p-4', name: 'ContrÂge 10% Niacinamide + 2% Zinc PCA Serum', instruction: 'Tighten pore elasticity and downregulate oil.' },
      { step: 'Step 3: Weekly Peel', productId: 'p-10', name: 'ContrÂge 10% AHA + 2% BHA Chemical Solution', instruction: 'Dissolve stubborn micro-comedones once weekly.' }
    ],
    recommendedProductIds: ['p-3', 'p-4', 'p-1', 'p-10']
  },
  {
    id: 'concern-sensitivity',
    name: 'Sensitive Skin, Rosacea & Flushing',
    slug: 'sensitive-skin-rosacea',
    shortDesc: 'Vascular reactivity, transient erythema, heat sensations, and reactive skin barrier.',
    iconName: 'HeartHandshake',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    clinicalBackground: 'Capillary hyper-reactivity and elevated inflammatory cytokines cause dilated micro-vessels, neurogenic stinging, and localized flushing.',
    recommendedActives: ['Centella Asiatica (TECA)', 'Madecassoside', '5-Ceramides', 'Non-Nano Zinc Oxide'],
    contraindications: ['Essential oils', 'Synthetic fragrances', 'Astringent alcohol', 'Physical facial scrubs'],
    doctorTips: 'Use fragrance-free, dermatologically evaluated hypoallergenic products formulated at physiological pH 5.5 with soothing Centella and mineral physical filters.',
    routineSteps: [
      { step: 'Step 1: Ultra-Gentle Cleanse', productId: 'p-13', name: 'ContrÂge Purifying Micellar pH 5.5 Cleanser', instruction: 'Cleanse without triggering vascular erythema.' },
      { step: 'Step 2: Anti-Redness Calm', productId: 'p-11', name: 'ContrÂge Centella Recovery Gel', instruction: 'Calm dilated micro-vessels and reduce burning sensations.' },
      { step: 'Step 3: Mineral Shield', productId: 'p-8', name: 'ContrÂge Mineral Fluid Sunscreen SPF 50+', instruction: 'Shield reactive skin from UV-triggered erythema.' }
    ],
    recommendedProductIds: ['p-11', 'p-13', 'p-6', 'p-8', 'p-15']
  }
];

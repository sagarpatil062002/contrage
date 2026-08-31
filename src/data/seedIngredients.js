export const initialIngredients = [
  {
    id: 'ing-ndga',
    name: 'Nordihydroguaiaretic Acid (NDGA)',
    category: 'Cellular Antioxidant & 5-Alpha Reductase Regulator',
    ewgScore: '1 (Ultra-Safe)',
    optimalPh: '5.0 - 6.5',
    molecularWeight: '302.36 g/mol',
    description: 'A botanical-derived antioxidant with potent lipoxygenase-inhibiting activity that protects cell membranes, neutralizes reactive oxygen species, and balances sebum production.',
    clinicalBenefits: [
      'Neutralizes free radical damage and oxidative stress at the cellular level',
      'Regulates hyper-keratinization in follicular canals',
      'Protects elastin and collagen fibers from glycation and photoaging'
    ],
    synergies: ['Peptides', 'Hyaluronic Acid', 'Oleanolic Acid', 'Niacinamide'],
    conflicts: ['Strong bleaching oxidizers'],
    whoShouldUse: 'Photo-damaged, mature, environmentally stressed, and combination skin types.',
    productIds: ['p-1']
  },
  {
    id: 'ing-niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    category: 'Barrier & Sebum Modulator',
    ewgScore: '1 (Ultra-Safe)',
    optimalPh: '5.0 - 6.5',
    molecularWeight: '122.12 g/mol',
    description: 'A vital co-enzyme precursor (NAD+/NADH) that boosts natural ceramide synthesis, reduces inflammation, suppresses sebum overproduction, and fades pigmentation.',
    clinicalBenefits: [
      'Downregulates sebum gland output by up to 42%',
      'Stimulates endogenous ceramide synthesis in the stratum corneum',
      'Inhibits melanosome transfer from melanocytes to keratinocytes',
      'Significantly refines pore diameter and surface texture'
    ],
    synergies: ['Zinc PCA', 'Salicylic Acid', 'Hyaluronic Acid', 'Ceramides', 'Alpha Arbutin', 'NDGA'],
    conflicts: ['High concentrations of acidic L-Ascorbic Acid in the same immediate layer'],
    whoShouldUse: 'Oily, acne-prone, hyperpigmented, and barrier-compromised skin types.',
    productIds: ['p-4', 'p-14']
  },
  {
    id: 'ing-salicylic-acid',
    name: 'Salicylic Acid (BHA)',
    category: 'Lipophilic Chemical Exfoliant',
    ewgScore: '1 (Safe)',
    optimalPh: '3.5 - 4.5',
    molecularWeight: '138.12 g/mol',
    description: 'An oil-soluble beta-hydroxy acid that penetrates lipid-rich sebaceous glands, dissolving intercellular desmosomes and trapped comedones.',
    clinicalBenefits: [
      'Penetrates follicular sebum to clear blackheads & micro-comedones',
      'Anti-inflammatory properties calm red pustular breakouts',
      'Refines bumpy keratosis and uneven textural congestion'
    ],
    synergies: ['Niacinamide', 'Hyaluronic Acid', 'Centella Asiatica', 'Zinc PCA'],
    conflicts: ['Retinaldehyde on the same evening', 'High strength chemical peels (AHA 30%)'],
    whoShouldUse: 'Congested, oily, acne-prone skin with visible blackheads and enlarged pores.',
    productIds: ['p-3', 'p-10']
  },
  {
    id: 'ing-retinaldehyde',
    name: 'Retinaldehyde (Retinal)',
    category: 'Advanced Vitamin A Retinoid',
    ewgScore: '1 (Clinical Grade)',
    optimalPh: '5.5 - 6.5',
    molecularWeight: '284.44 g/mol',
    description: 'The direct precursor to retinoic acid. Requires only 1 enzymatic conversion step in human skin cells, acting 11x faster than traditional retinol with superior biological tolerance.',
    clinicalBenefits: [
      'Boosts pro-collagen I and III synthesis in fibroblasts',
      'Accelerates epidermal turnover cycle back to youthful 28 days',
      'Antibacterial activity against Cutibacterium acnes',
      'Smooths deep static wrinkles and expression lines'
    ],
    synergies: ['Bakuchiol', 'Ceramides', 'Peptides', 'Squalane', 'Ectoin'],
    conflicts: ['Direct chemical peels', 'Benzoyl Peroxide', 'Daytime sun exposure without SPF'],
    whoShouldUse: 'Premature aging, loss of elasticity, stubborn adult acne, and sun-damaged complexions.',
    productIds: ['p-5']
  },
  {
    id: 'ing-ceramides',
    name: 'Phyto-Ceramide Complex (NP, AP, EOP, AS, NS)',
    category: 'Physiological Lipid Lamellae',
    ewgScore: '1 (Biomimetic)',
    optimalPh: '4.5 - 6.0',
    molecularWeight: '550 - 680 g/mol',
    description: 'Structural building blocks comprising 50% of the stratum corneum extracellular lipid matrix. Reconstructs protective barriers and arrests transepidermal water loss.',
    clinicalBenefits: [
      'Restores compromised intercellular lipid lamellae',
      'Stops moisture loss and prevents environmental allergen ingress',
      'Eliminates flaking, micro-fissures, and irritation from retinoid use'
    ],
    synergies: ['Cholesterol', 'Fatty Acids', 'Hyaluronic Acid', 'Squalane', 'Madecassoside'],
    conflicts: ['None (universal biocompatibility)'],
    whoShouldUse: 'Dry, sensitized, irritated, over-exfoliated, or post-procedure skin.',
    productIds: ['p-2', 'p-6', 'p-14']
  },
  {
    id: 'ing-tranexamic-acid',
    name: 'Tranexamic Acid (TXA)',
    category: 'Targeted Melanosome Inhibitor',
    ewgScore: '1 (Safe)',
    optimalPh: '5.0 - 7.0',
    molecularWeight: '157.21 g/mol',
    description: 'A synthetic lysine amino acid derivative that inhibits UV-induced plasmin activity in keratinocytes, interrupting the inflammatory cascade that triggers stubborn melasma.',
    clinicalBenefits: [
      'Blocks plasminogen-melanocyte signaling pathways',
      'Fades dermal melasma patches and post-inflammatory erythema (PIE)',
      'Prevents UV-induced melanogenesis recurrence'
    ],
    synergies: ['Alpha Arbutin', 'Niacinamide', 'Vitamin C', 'Kojic Acid'],
    conflicts: ['None'],
    whoShouldUse: 'Melasma, post-acne dark marks, age spots, and uneven skin tone.',
    productIds: ['p-7']
  },
  {
    id: 'ing-hyaluronic-acid',
    name: 'Multi-Molecular Hyaluronic Acid Matrix',
    category: 'Universal Humectant',
    ewgScore: '1 (Ultra-Safe)',
    optimalPh: '4.0 - 7.0',
    molecularWeight: '5 kDa (Micro) to 1.8 MDa (Macro)',
    description: 'A multi-weight polysaccharide network where high molecular weights form a moisture-locking surface shield while micro-molecular weights penetrate deep into the dermis.',
    clinicalBenefits: [
      'Binds up to 1000x its molecular weight in water',
      'Fills micro-dehydration lines and restores skin turgor',
      'Enhances transdermal delivery of paired active molecules'
    ],
    synergies: ['Ceramides', 'Vitamin B5 (Panthenol)', 'Centella', 'Peptides'],
    conflicts: ['None'],
    whoShouldUse: 'All skin types, especially dehydrated, dry, or aging complexions.',
    productIds: ['p-2', 'p-4', 'p-6', 'p-15', 'p-17']
  },
  {
    id: 'ing-zinc-oxide',
    name: 'Non-Nano Zinc Oxide',
    category: 'Physical Mineral Photoprotector',
    ewgScore: '1 (Ecocert)',
    optimalPh: '6.0 - 7.5',
    molecularWeight: '81.38 g/mol',
    description: 'Photostable physical mineral filter that reflects UVA and UVB radiation across the entire 290–400nm spectrum without chemical filter sensitization or coral reef toxicity.',
    clinicalBenefits: [
      'Broad spectrum critical wavelength protection (>370nm)',
      'Anti-inflammatory properties calm reactive, acne-prone, and post-procedure skin',
      'Zero penetration into the bloodstream due to non-nano particle size'
    ],
    synergies: ['Titanium Dioxide', 'Iron Oxides', 'Ectoin', 'Vitamin E'],
    conflicts: ['None'],
    whoShouldUse: 'All skin types, especially sensitive, rosacea-prone, and post-procedure skin.',
    productIds: ['p-8']
  }
];

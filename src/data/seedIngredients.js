export const initialIngredients = [
  {
    id: 'ing-niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    category: 'Barrier & Sebum Modulator',
    ewgScore: '1 (Ultra-Safe)',
    optimalPh: '5.0 - 6.5',
    molecularWeight: '122.12 g/mol (Small - Deep Transdermal)',
    description: 'A vital water-soluble co-enzyme precursor (NAD+/NADH) that boosts ceramide synthesis, reduces inflammation, and regulates sebocyte oil secretion.',
    clinicalBenefits: [
      'Downregulates sebum gland output by up to 42%',
      'Stimulates endogenous ceramide synthesis in the stratum corneum',
      'Inhibits melanosome transfer from melanocytes to keratinocytes',
      'Significantly reduces pore diameter and surface texture roughness'
    ],
    synergies: ['Zinc PCA', 'Salicylic Acid', 'Hyaluronic Acid', 'Ceramides', 'Alpha Arbutin'],
    conflicts: ['High concentrations of pure L-Ascorbic Acid in the same immediate formula (may cause transient flushing)'],
    whoShouldUse: 'Oily, acne-prone, hyperpigmented, and barrier-compromised skin types.',
    productIds: ['p-1', 'p-6', 'p-15']
  },
  {
    id: 'ing-salicylic-acid',
    name: 'Salicylic Acid (BHA)',
    category: 'Lipophilic Chemical Exfoliant',
    ewgScore: '1 (Safe)',
    optimalPh: '3.2 - 4.0',
    molecularWeight: '138.12 g/mol',
    description: 'An oil-soluble beta-hydroxy acid that penetrates lipid-rich sebaceous glands, dissolving intercellular desmosomes and trapped comedones.',
    clinicalBenefits: [
      'Penetrates follicular sebum to clear blackheads & micro-comedones',
      'Anti-inflammatory properties calm red pustular breakouts',
      'Refines bumpy keratosis pilaris and uneven textural congestion'
    ],
    synergies: ['Niacinamide (PM)', 'Hyaluronic Acid', 'Centella Asiatica', 'Zinc PCA'],
    conflicts: ['Retinaldehyde on the same evening', 'High strength chemical peels (AHA 25%)'],
    whoShouldUse: 'Congested, oily, acne-prone skin with visible blackheads and large pores.',
    productIds: ['p-2', 'p-11', 'p-16']
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
      'Accelerates epidermal turnover cycle from 45 days back to youthful 28 days',
      'Antibacterial activity against acne-causing bacteria',
      'Smooths deep static wrinkles and crow\'s feet'
    ],
    synergies: ['Bakuchiol', 'Ceramides', 'Peptides', 'Squalane', 'Centella'],
    conflicts: ['AHA/BHA chemical peels', 'Benzoyl Peroxide', 'Direct daytime sun exposure without SPF'],
    whoShouldUse: 'Premature aging, loss of elasticity, stubborn adult acne, and sun-damaged complexions.',
    productIds: ['p-3']
  },
  {
    id: 'ing-ceramides',
    name: 'Phyto-Ceramide Complex (NP, AP, EOP)',
    category: 'Physiological Barrier Lipids',
    ewgScore: '1 (Biomimetic)',
    optimalPh: '4.5 - 6.0',
    molecularWeight: '537.86 g/mol',
    description: 'Crucial waxy lipid molecules that constitute over 50% of the skin\'s inter-cellular cement. Combined with cholesterol and free fatty acids in a 3:1:1 biomimetic ratio.',
    clinicalBenefits: [
      'Repairs compromised stratum corneum barrier within 48 hours',
      'Prevents Transepidermal Water Loss (TEWL)',
      'Shields against environmental pathogen infiltration and allergens',
      'Calms stinging, flaking, and chemical peel irritation'
    ],
    synergies: ['Ectoin', 'Hyaluronic Acid', 'Squalane', 'Panthenol', 'Niacinamide'],
    conflicts: ['None — completely bio-compatible with all cosmetic actives'],
    whoShouldUse: 'Sensitive, eczema-prone, post-procedure, dry, or over-exfoliated damaged skin.',
    productIds: ['p-4', 'p-10']
  },
  {
    id: 'ing-vitamin-c',
    name: '3-O-Ethyl Ascorbic Acid (Next-Gen Vitamin C)',
    category: 'Antioxidant & Collagen Co-Factor',
    ewgScore: '1 (Safe)',
    optimalPh: '4.0 - 5.5',
    molecularWeight: '204.18 g/mol',
    description: 'An etherified, highly stable derivative of ascorbic acid with exceptional dermis penetration and zero oxidative degradation or yellowing over 18+ months.',
    clinicalBenefits: [
      '86% direct metabolization into active ascorbic acid in epidermal cells',
      'Directly halts tyrosinase enzyme melanogenesis to fade sun spots',
      'Potent neutralizer of UV and blue-light reactive oxygen species (ROS)',
      'Essential co-factor for prolyl and lysyl hydroxylase in collagen synthesis'
    ],
    synergies: ['Ferulic Acid', 'Glutathione', 'Sunscreen SPF 50+', 'Hyaluronic Acid'],
    conflicts: ['Retinoids in the exact same AM application (use Retinoids in PM)'],
    whoShouldUse: 'Dull complexions, dark spots, photo-damaged skin, and daytime antioxidant defense.',
    productIds: ['p-5']
  },
  {
    id: 'ing-tranexamic',
    name: 'Tranexamic Acid',
    category: 'Targeted Anti-Melanogenic Active',
    ewgScore: '1 (Medical Pure)',
    optimalPh: '5.5 - 7.0',
    molecularWeight: '157.21 g/mol',
    description: 'An amino acid derivative that blocks the interaction between melanocytes and keratinocytes by inhibiting plasmin activation induced by UV and inflammation.',
    clinicalBenefits: [
      'Clinical gold-standard for stubborn hormonal melasma and dark patches',
      'Fades post-inflammatory erythema (red acne marks) and brown PIH',
      'Zero rebound pigmentation or skin bleaching toxicity'
    ],
    synergies: ['Alpha Arbutin', 'Niacinamide', 'Kojic Acid', 'Vitamin C'],
    conflicts: ['None — extremely gentle and non-photosensitizing'],
    whoShouldUse: 'Anyone struggling with stubborn melasma, sun freckles, and dark acne scars.',
    productIds: ['p-7']
  },
  {
    id: 'ing-hyaluronic',
    name: 'Multi-Molecular Weight Hyaluronic Acid (5D)',
    category: 'Cellular Humectant Matrix',
    ewgScore: '1 (Non-Toxic)',
    optimalPh: '4.0 - 7.5',
    molecularWeight: '5 kDa (Micro) to 1.8 MDa (Macro)',
    description: 'A biological glycosaminoglycan capable of binding up to 1,000 times its weight in water, engineered in 5 distinct molecular sizes to saturate every skin layer.',
    clinicalBenefits: [
      'Low molecular weight (5kDa) penetrates deep into dermal extracellular matrix',
      'High molecular weight forms a protective non-occlusive moisture veil on surface',
      'Instantly plumps dehydration wrinkles and crepey skin texture'
    ],
    synergies: ['Polyglutamic Acid', 'Panthenol (B5)', 'Ceramides', 'Glycerin'],
    conflicts: ['Applying to completely dry skin in arid zero-humidity environments (apply to damp skin)'],
    whoShouldUse: 'All skin types, especially dehydrated, dry, or sensitized complexions.',
    productIds: ['p-8', 'p-1', 'p-13']
  },
  {
    id: 'ing-azelaic',
    name: 'Azelaic Acid & Potassium Azeloyl Diglycinate',
    category: 'Anti-Redness Dicarboxylic Acid',
    ewgScore: '1 (Safe)',
    optimalPh: '4.5 - 5.5',
    molecularWeight: '188.22 g/mol',
    description: 'Naturally occurring dicarboxylic acid with targeted anti-inflammatory, antimicrobial, and mild tyrosinase-inhibiting properties.',
    clinicalBenefits: [
      'Clinically proven to reduce papulopustular rosacea and facial erythema',
      'Selectively targets abnormal hyperactive melanocytes without lightening normal skin',
      'Normalizes follicular hyper-keratinization to prevent comedone blockage'
    ],
    synergies: ['Centella Asiatica', 'Niacinamide', 'Salicylic Acid', 'Ceramides'],
    conflicts: ['None — exceptionally well tolerated even on rosacea-prone skin'],
    whoShouldUse: 'Rosacea, vascular redness, melasma, and persistent acne blemishes.',
    productIds: ['p-9']
  }
];

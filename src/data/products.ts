/**
 * ============================================================================
 * Centralized Product Data Layer
 * ============================================================================
 * This file serves as the single source of truth for mock products during the
 * storefront phase. The data structures and helper functions are architected
 * so they can easily be replaced by Firestore queries in future milestones.
 * ============================================================================
 */

export type ProductCategory =
  | 'Rings'
  | 'Necklaces'
  | 'Earrings'
  | 'Bracelets'
  | 'Bangles'
  | 'Chains'
  | 'Pendants'
  | 'Bridal Jewellery'
  | 'Jewellery Sets';

export type ProductAvailability = 'In Stock' | 'Custom Order' | 'Limited Edition';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in LKR
  category: ProductCategory;
  purity: string; // e.g. "22K Hallmarked Gold"
  weight: string; // e.g. "12.5 Grams"
  productCode: string; // e.g. "ZJ-RNG-101"
  image: string;
  featured: boolean;
  availability: ProductAvailability;
  createdAt: string; // ISO date string
}

export const CATEGORIES: ProductCategory[] = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bracelets',
  'Bangles',
  'Chains',
  'Pendants',
  'Bridal Jewellery',
  'Jewellery Sets',
];

// High-quality gold jewellery image URLs curated from Unsplash
const IMAGES = {
  ring1: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
  ring2: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
  necklace1: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
  necklace2: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
  earrings1: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
  earrings2: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000&auto=format&fit=crop',
  bangles1: 'https://images.unsplash.com/photo-1611591475777-233cd7322084?q=80&w=1000&auto=format&fit=crop',
  bangles2: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop',
  bridal1: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1000&auto=format&fit=crop',
  bracelet1: 'https://images.unsplash.com/photo-1611591475777-233cd7322084?q=80&w=1000&auto=format&fit=crop',
  chain1: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
  pendant1: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop',
  set1: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'zj-rng-101',
    name: 'Zeenath Sovereign Solitaire Ring',
    description: 'An elegant 22K gold solitaire ring featuring diamond-cut micro facets and certified hallmarked purity. Ideal for engagements and modern luxury daily wear.',
    price: 185000,
    category: 'Rings',
    purity: '22K Hallmarked Gold',
    weight: '6.8 Grams',
    productCode: 'ZJ-RNG-101',
    image: IMAGES.ring1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'zj-bdl-201',
    name: 'Imperial Maharani Bridal Choker Set',
    description: 'Bespoke Sri Lankan bridal trousseau choker meticulously handcrafted in 22K yellow gold with antique filigree motifs and drop pearls.',
    price: 1250000,
    category: 'Bridal Jewellery',
    purity: '22K Hallmarked Gold',
    weight: '48.0 Grams (6 Sovereigns)',
    productCode: 'ZJ-BDL-201',
    image: IMAGES.bridal1,
    featured: true,
    availability: 'Limited Edition',
    createdAt: '2026-03-05T12:00:00Z',
  },
  {
    id: 'zj-bng-401',
    name: 'Peacock Diamond-Cut Gold Bangles (Pair)',
    description: 'A pair of traditional diamond-cut 22K gold bangles engineered for timeless elegance and comfortable daily or ceremonial wear.',
    price: 640000,
    category: 'Bangles',
    purity: '22K Hallmarked Gold',
    weight: '24.0 Grams (3 Sovereigns)',
    productCode: 'ZJ-BNG-401',
    image: IMAGES.bangles1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-02-15T09:30:00Z',
  },
  {
    id: 'zj-nck-301',
    name: 'Grand Ceylon Filigree Gold Necklace',
    description: 'Heritage goldsmithing masterpiece showcasing detailed filigree artwork, adjustable luxury clasp, and certified 22K gold standard.',
    price: 420000,
    category: 'Necklaces',
    purity: '22K Hallmarked Gold',
    weight: '16.0 Grams',
    productCode: 'ZJ-NCK-301',
    image: IMAGES.necklace1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-03-10T14:20:00Z',
  },
  {
    id: 'zj-erg-501',
    name: 'Filigree Antique Jhumka Gold Earrings',
    description: 'Exquisite 22K antique gold Jhumka earrings with intricate granular work and secure screw-back closures.',
    price: 198000,
    category: 'Earrings',
    purity: '22K Hallmarked Gold',
    weight: '7.4 Grams',
    productCode: 'ZJ-ERG-501',
    image: IMAGES.earrings1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-03-12T11:00:00Z',
  },
  {
    id: 'zj-brc-601',
    name: 'Royal Oval Gold Cuff Bracelet',
    description: 'Contemporary sleek 22K gold cuff bracelet with high-polish finish and double safety lock.',
    price: 350000,
    category: 'Bracelets',
    purity: '22K Hallmarked Gold',
    weight: '13.5 Grams',
    productCode: 'ZJ-BRC-601',
    image: IMAGES.bracelet1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-02-28T16:45:00Z',
  },
  {
    id: 'zj-chn-701',
    name: 'Solid 24K Pure Gold Rope Chain',
    description: 'Pure 24K gold investment chain handcrafted with heavy rope links for lifetime durability and maximum gold density.',
    price: 480000,
    category: 'Chains',
    purity: '24K Pure Gold',
    weight: '16.0 Grams (2 Sovereigns)',
    productCode: 'ZJ-CHN-701',
    image: IMAGES.chain1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-03-15T08:15:00Z',
  },
  {
    id: 'zj-pnd-801',
    name: 'Traditional Ganesha & Ruby Gold Pendant',
    description: 'Divine motif gold pendant set in 22K hallmarked gold with a natural ruby accent at the center.',
    price: 115000,
    category: 'Pendants',
    purity: '22K Gold',
    weight: '4.2 Grams',
    productCode: 'ZJ-PND-801',
    image: IMAGES.pendant1,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-01-20T13:10:00Z',
  },
  {
    id: 'zj-set-901',
    name: 'Royal Heritage Sovereign Necklace & Earrings Set',
    description: 'Complete matching 22K gold jewellery set featuring a structured necklace and drop earrings in luxury presentation box.',
    price: 720000,
    category: 'Jewellery Sets',
    purity: '22K Hallmarked Gold',
    weight: '28.0 Grams',
    productCode: 'ZJ-SET-901',
    image: IMAGES.set1,
    featured: true,
    availability: 'In Stock',
    createdAt: '2026-03-18T15:00:00Z',
  },
  {
    id: 'zj-rng-102',
    name: 'Empress Crown Diamond-Cut Gold Ring',
    description: 'Regal crown-shaped gold ring in 22K gold with polished edges and micro-beaded borders.',
    price: 142000,
    category: 'Rings',
    purity: '22K Gold',
    weight: '5.2 Grams',
    productCode: 'ZJ-RNG-102',
    image: IMAGES.ring2,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-02-10T10:30:00Z',
  },
  {
    id: 'zj-nck-302',
    name: 'Modern Layered Minimalist Gold Chain Necklace',
    description: 'Sleek double-strand 22K gold chain necklace for effortless everyday luxury styling.',
    price: 295000,
    category: 'Necklaces',
    purity: '22K Hallmarked Gold',
    weight: '11.2 Grams',
    productCode: 'ZJ-NCK-302',
    image: IMAGES.necklace2,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-03-02T11:45:00Z',
  },
  {
    id: 'zj-erg-502',
    name: 'Classic Solitaire Diamond-Cut Gold Studs',
    description: 'Minimalist 22K gold stud earrings with diamond-cut geometric faceting for subtle daily shimmer.',
    price: 125000,
    category: 'Earrings',
    purity: '22K Gold',
    weight: '4.5 Grams',
    productCode: 'ZJ-ERG-502',
    image: IMAGES.earrings2,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-01-25T09:00:00Z',
  },
  {
    id: 'zj-bng-402',
    name: 'Intricate Matte Gold Broad Bangle',
    description: 'Heavy matte-finish 22K gold broad bangle with hand-engraved traditional floral scrolls.',
    price: 380000,
    category: 'Bangles',
    purity: '22K Gold',
    weight: '14.5 Grams',
    productCode: 'ZJ-BNG-402',
    image: IMAGES.bangles2,
    featured: false,
    availability: 'Custom Order',
    createdAt: '2026-02-20T14:15:00Z',
  },
  {
    id: 'zj-bdl-202',
    name: 'Royal Emerald-Studded Gold Bridal Necklace',
    description: 'Luxury Sri Lankan bridal necklace adorned with synthetic emerald cabochons and certified 22K gold craftsmanship.',
    price: 980000,
    category: 'Bridal Jewellery',
    purity: '22K Hallmarked Gold',
    weight: '36.5 Grams',
    productCode: 'ZJ-BDL-202',
    image: IMAGES.bridal1,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-03-08T17:30:00Z',
  },
  {
    id: 'zj-brc-602',
    name: 'Delicate Gold Link Chain Bracelet',
    description: 'Graceful 22K gold chain bracelet with polished interlocking links and lobster clasp.',
    price: 175000,
    category: 'Bracelets',
    purity: '22K Gold',
    weight: '6.8 Grams',
    productCode: 'ZJ-BRC-602',
    image: IMAGES.bracelet1,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-02-05T12:00:00Z',
  },
  {
    id: 'zj-chn-702',
    name: 'Textured 22K Singapore Gold Chain',
    description: 'Classic Singapore-style twisted gold chain crafted in 22K hallmarked gold for light reflection.',
    price: 310000,
    category: 'Chains',
    purity: '22K Hallmarked Gold',
    weight: '12.0 Grams',
    productCode: 'ZJ-CHN-702',
    image: IMAGES.chain1,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-03-14T10:45:00Z',
  },
  {
    id: 'zj-pnd-802',
    name: 'Luxury Diamond-Cut Solitaire Gold Pendant',
    description: 'Chic 22K gold teardrop pendant with faceted gold edges and bail fitting for chains up to 4mm.',
    price: 145000,
    category: 'Pendants',
    purity: '22K Hallmarked Gold',
    weight: '5.5 Grams',
    productCode: 'ZJ-PND-802',
    image: IMAGES.pendant1,
    featured: false,
    availability: 'In Stock',
    createdAt: '2026-02-18T16:00:00Z',
  },
  {
    id: 'zj-set-902',
    name: 'Artisan Ruby & Emerald Matching Gold Set',
    description: 'Exclusive custom order 22K gold jewellery set featuring matching necklace and stud earrings.',
    price: 890000,
    category: 'Jewellery Sets',
    purity: '22K Hallmarked Gold',
    weight: '34.0 Grams',
    productCode: 'ZJ-SET-902',
    image: IMAGES.set1,
    featured: false,
    availability: 'Custom Order',
    createdAt: '2026-03-19T11:30:00Z',
  },
];

/**
 * Helper to fetch all products (simulates async Firestore call)
 */
export const fetchProducts = async (): Promise<Product[]> => {
  return Promise.resolve([...MOCK_PRODUCTS]);
};

/**
 * Helper to get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id || p.productCode.toLowerCase() === id.toLowerCase());
};

/**
 * Helper to format price in LKR currency format
 */
export const formatPrice = (price: number): string => {
  return `LKR ${price.toLocaleString('en-US')}`;
};

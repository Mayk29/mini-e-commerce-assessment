// Centralized mock inventory of premium electronics catalog 
export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Phone (2a)',
    brand: 'Nothing',
    price: 349,
    category: 'smartphones',
    image: '/assets/images/phone2a.png',
    description: 'Linear design symmetry meets raw performance.',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Ultra Book 16',
    brand: 'Premium',
    price: 1299,
    category: 'laptops',
    image: '/assets/images/notebook16.png',
    description: 'Anodized aluminum chassis with ultra-thin bezels.',
    featured: true,
  }
];

export const CATEGORIES = ['all', 'smartphones', 'laptops', 'audio', 'accessories'];
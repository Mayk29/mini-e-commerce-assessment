// Centralized inventory database for CellWego Store
// Images are imported so Vite can process and fingerprint them at build time.

import iphone15ProMax from '../assets/images/iphone-15-pro-max-natural.png';
import iphone15Pro from '../assets/images/iphone-15-pro-black.png';
import iphone15 from '../assets/images/iphone-15-white.png';
import s24Ultra from '../assets/images/s24-ultra-gray.png';
import s24Plus from '../assets/images/s24-plus-black.png';
import galaxyA55 from '../assets/images/galaxy-a55-blue.png';
import pixel8Pro from '../assets/images/pixel-8-pro-bay.png';
import pixel8 from '../assets/images/pixel-8-obsidian.png';
import xiaomi14Ultra from '../assets/images/xiaomi-14-ultra-black.png';
import nothingPhone2 from '../assets/images/nothing-phone-2-gray.png';
import nothingPhone2a from '../assets/images/nothing-phone-2a-milk.png';
import redmiNote13 from '../assets/images/redmi-note-13-white.png';

export const INITIAL_PRODUCTS = [
  // Apple
  { id: 'apple-iphone-15-pro-1', name: 'iPhone 15 Pro Max', brand: 'Apple', storage: '256GB', color: 'Natural Titanium', image: iphone15ProMax, price: 67990 },
  { id: 'apple-iphone-15-pro-2', name: 'iPhone 15 Pro',     brand: 'Apple', storage: '128GB', color: 'Space Black',      image: iphone15Pro,    price: 56990 },
  { id: 'apple-iphone-15-3',     name: 'iPhone 15',         brand: 'Apple', storage: '128GB', color: 'White',            image: iphone15,       price: 45490 },

  // Samsung
  { id: 'samsung-galaxy-s24-ultra-1', name: 'Galaxy S24 Ultra', brand: 'Samsung', storage: '512GB', color: 'Titanium Gray',    image: s24Ultra,   price: 73990 },
  { id: 'samsung-galaxy-s24-plus-2',  name: 'Galaxy S24+',      brand: 'Samsung', storage: '256GB', color: 'Onyx Black',       image: s24Plus,    price: 56990 },
  { id: 'samsung-galaxy-a55-3',       name: 'Galaxy A55 5G',    brand: 'Samsung', storage: '128GB', color: 'Awesome Iceblue',  image: galaxyA55,  price: 25490 },

  // Google
  { id: 'google-pixel-8-pro-1', name: 'Pixel 8 Pro', brand: 'Google', storage: '256GB', color: 'Bay Blue',  image: pixel8Pro, price: 56990 },
  { id: 'google-pixel-8-2',     name: 'Pixel 8',     brand: 'Google', storage: '128GB', color: 'Obsidian',  image: pixel8,    price: 39690 },

  // Xiaomi
  { id: 'xiaomi-14-ultra-1',       name: 'Xiaomi 14 Ultra',        brand: 'Xiaomi', storage: '512GB', color: 'Black',           image: xiaomi14Ultra, price: 62490 },
  { id: 'xiaomi-redmi-note-13-2',  name: 'Redmi Note 13 Pro+ 5G',  brand: 'Xiaomi', storage: '256GB', color: 'Moonlight White',  image: redmiNote13,   price: 22690 },

  // Nothing
  { id: 'nothing-phone-2-1',  name: 'Phone (2)',  brand: 'Nothing', storage: '256GB', color: 'Dark Gray', image: nothingPhone2,  price: 34090 },
  { id: 'nothing-phone-2a-2', name: 'Phone (2a)', brand: 'Nothing', storage: '128GB', color: 'Milk',      image: nothingPhone2a, price: 19840 },
];


/**
 * CellWego localStorage utility
 * Keys: cellwego_products, cellwego_cart
 */
const STORAGE_PREFIX = 'cellwego_';

// One-time migration: move legacy "products" key → "cellwego_products"
(function migrateProducts() {
  try {
    const legacy = localStorage.getItem('products');
    const current = localStorage.getItem(`${STORAGE_PREFIX}products`);
    if (legacy !== null && current === null) {
      localStorage.setItem(`${STORAGE_PREFIX}products`, legacy);
      localStorage.removeItem('products');
    }
  } catch (_) {
    // silent – storage may be unavailable (private mode, etc.)
  }
})();

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },
};
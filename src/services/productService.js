import { INITIAL_PRODUCTS } from '../data/products';
import { storage } from '../utils/storage';

const PRODUCTS_KEY = 'products';   // storage utility prepends 'cellwego_'
const NETWORK_DELAY = 500;

/** Simulate API latency */
const simulateDelay = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), NETWORK_DELAY));

/** Read products from localStorage; seeds with INITIAL_PRODUCTS on first run */
const getStoredProducts = () => {
  const stored = storage.get(PRODUCTS_KEY);
  if (stored !== null) return stored;
  storage.set(PRODUCTS_KEY, INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
};

/** Persist products array to localStorage */
const saveProducts = (products) => storage.set(PRODUCTS_KEY, products);

/** Get all products */
export const getAllProducts = async () => simulateDelay(getStoredProducts());

/**
 * Create a new product.
 * ProductService is the ONLY place IDs are generated.
 * Any id passed in from a form is discarded and replaced here.
 */
export const createProduct = async (product) => {
  const products = getStoredProducts();

  const newProduct = {
    ...product,
    // Always overwrite id – single source of truth
    id: `${(product.brand || 'item').toLowerCase()}-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  saveProducts(products);

  return simulateDelay(newProduct);
};

/** Update an existing product */
export const updateProduct = async (updatedProduct) => {
  const products = getStoredProducts();
  const updatedList = products.map((p) =>
    p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
  );
  saveProducts(updatedList);
  return simulateDelay(updatedProduct);
};

/** Delete a product by ID */
export const deleteProduct = async (id) => {
  const products = getStoredProducts();
  saveProducts(products.filter((p) => p.id !== id));
  return simulateDelay({ success: true, deletedId: id });
};

const productService = { getAllProducts, createProduct, updateProduct, deleteProduct };
export default productService;
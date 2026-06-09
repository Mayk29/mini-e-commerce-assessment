const STORAGE_KEY = 'products';
const NETWORK_DELAY = 500;

/**
 * Simulate API latency
 */
const simulateDelay = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), NETWORK_DELAY);
  });

/**
 * Get products from localStorage
 */
const getStoredProducts = () => {
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [];
};

/**
 * Save products to localStorage
 */
const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

/**
 * Get all products
 */
export const getAllProducts = async () => {
  const products = getStoredProducts();
  return simulateDelay(products);
};

/**
 * Create a new product
 */
export const createProduct = async (product) => {
  const products = getStoredProducts();

  const newProduct = {
    ...product,
    id: product.id || Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  saveProducts(products);

  return simulateDelay(newProduct);
};

/**
 * Update an existing product
 */
export const updateProduct = async (updatedProduct) => {
  const products = getStoredProducts();

  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id
      ? { ...product, ...updatedProduct }
      : product
  );

  saveProducts(updatedProducts);

  return simulateDelay(updatedProduct);
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (id) => {
  const products = getStoredProducts();

  const filteredProducts = products.filter(
    (product) => product.id !== id
  );

  saveProducts(filteredProducts);

  return simulateDelay({
    success: true,
    deletedId: id,
  });
};

const productService = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
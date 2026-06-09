import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllProducts } from '../services/productService';
import { INITIAL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import ToastContainer from '../components/ToastNotification';

const TOAST_DURATION = 2500;

export default function Storefront() {
  const { cartCount } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const heroRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const stored = await getAllProducts();
        setProducts(stored.length > 0 ? stored : INITIAL_PRODUCTS);
      } catch {
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Toast management
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((productName) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message: `${productName} added to cart successfully` }]);
    setTimeout(() => dismissToast(id), TOAST_DURATION);
  }, [dismissToast]);

  // Logo click: reset everything and scroll to top
  const handleLogoClick = useCallback(() => {
    setIsCartOpen(false);
    setSearchQuery('');
    setSelectedBrand('all');
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Continue shopping: close cart, scroll to products
  const handleContinueShopping = useCallback(() => {
    setIsCartOpen(false);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const brands = ['all', ...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Clickable logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-70 active:scale-95"
            aria-label="CellWego — go to top"
          >
            <span className="text-lg font-semibold tracking-tight text-neutral-900">CellWego</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
              Store
            </span>
          </button>

          {/* Cart toggle */}
          <button
            type="button"
            onClick={() => setIsCartOpen((o) => !o)}
            className="group relative flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:text-neutral-900 active:scale-95"
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-medium text-white transition-transform group-hover:scale-105">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Hero */}
        <header ref={heroRef} className="py-12 md:py-20 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            The Future of Mobile
          </span>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Designed to inspire.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
            Explore our curated selection of ultra-premium smartphones, setting new benchmarks in engineering symmetry.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">
          {/* Filters sidebar */}
          <section className="space-y-6 lg:col-span-1" aria-label="Filters">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Filter Inventory
              </h2>

              <div className="space-y-2">
                <label htmlFor="search" className="text-xs font-medium text-neutral-500">Search Devices</label>
                <input
                  id="search"
                  type="text"
                  placeholder="iPhone, Galaxy, Pixel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all focus:border-neutral-400 focus:bg-white"
                />
              </div>

              <div className="mt-6 space-y-2">
                <span className="text-xs font-medium text-neutral-500 block">Brands</span>
                <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-stretch">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-8 w-full animate-pulse rounded-xl bg-neutral-100" />
                      ))
                    : brands.map((brand) => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => setSelectedBrand(brand)}
                          className={`rounded-xl px-3 py-2 text-left text-xs font-medium capitalize transition-all duration-150 ${
                            selectedBrand === brand
                              ? 'bg-neutral-900 text-white shadow-sm'
                              : 'bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                </div>
              </div>
            </div>
          </section>

          {/* Products + Cart panel */}
          <div className="lg:col-span-3 space-y-10">
            {isCartOpen && (
              <section aria-label="Active Selection Context">
                <ShoppingCart onContinueShopping={handleContinueShopping} />
              </section>
            )}

            <div ref={productsRef}>
              {isLoading ? (
                <section
                  className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3"
                  aria-label="Loading products"
                  aria-busy="true"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                      <div className="h-56 bg-neutral-100" />
                      <div className="p-4 space-y-3">
                        <div className="h-3 w-1/3 rounded bg-neutral-100" />
                        <div className="h-4 w-3/4 rounded bg-neutral-100" />
                        <div className="h-3 w-1/2 rounded bg-neutral-100" />
                        <div className="flex items-center justify-between pt-1">
                          <div className="h-5 w-16 rounded bg-neutral-100" />
                          <div className="h-8 w-24 rounded-full bg-neutral-100" />
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-20 text-center">
                  <p className="text-sm font-medium text-neutral-900">No products matched your criteria</p>
                  <p className="mt-1 text-xs text-neutral-400">
                    Try checking spelling variations or resetting applied brand filter segments.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setSelectedBrand('all'); }}
                    className="mt-4 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <section
                  className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3"
                  aria-label="Filtered Catalog Collection"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={showToast}
                    />
                  ))}
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
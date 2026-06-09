import { useState } from 'react';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';

export default function Storefront() {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Extract unique brands dynamically from data array
  const brands = ['all', ...new Set(INITIAL_PRODUCTS.map((p) => p.brand))];

  // Filter products based on search query and chosen brand category
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Navigation Bar Header */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-neutral-900">CellWego</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">Store</span>
          </div>

          {/* Cart Toggle Trigger Button with Dynamic Count Badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(!isCartOpen)}
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
        {/* Premium Minimalist Hero Banner Section */}
        <header className="py-12 md:py-20 text-center">
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

        {/* Layout Grid Separating Interactive Search Controls and Content Panels */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">
          
          {/* Controls Panel: Search & Brand Filters */}
          <section className="space-y-6 lg:col-span-1" aria-label="Filters">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
                Filter Inventory
              </h2>
              
              {/* Search Text Input Box */}
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

              {/* Dynamic Brand Selection List Buttons */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-medium text-neutral-500 block">Brands</span>
                <div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-stretch">
                  {brands.map((brand) => (
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

          {/* Catalog Matrix Display Panel & Embedded Sidebar ShoppingCart Integration */}
          <div className="lg:col-span-3 space-y-10">
            {isCartOpen && (
              <section aria-label="Active Selection Context" className="animate-fadeIn">
                <ShoppingCart />
              </section>
            )}

            {filteredProducts.length === 0 ? (
              /* Catalog Fallback Empty Match Layout State */
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-20 text-center">
                <p className="text-sm font-medium text-neutral-900">No products matched your criteria</p>
                <p className="mt-1 text-xs text-neutral-400">Try checking spelling variations or resetting applied brand filter segments.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedBrand('all'); }}
                  className="mt-4 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm hover:bg-neutral-50"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Responsive Layout Assembly Display Loop */
              <section 
                className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3"
                aria-label="Filtered Catalog Collection"
              >
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </section>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
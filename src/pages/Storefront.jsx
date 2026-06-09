import { INITIAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Storefront() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-12 md:py-24">
      <main className="mx-auto max-w-7xl">
        <header className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            CellWego Catalog
          </span>
          <h1 className="mt-2 text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
            Premium Electronics
          </h1>
        </header>

        {/* Absorbed ProductGrid layout mapping functionality natively */}
        <section 
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Products Collection"
        >
          {INITIAL_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </section>
      </main>
    </div>
  );
}
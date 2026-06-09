import { useState, useEffect } from 'react';
import productService from '../services/productService';
import AddProductForm from '../components/AddProductForm';
import { formatPHP } from '../utils/currency';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    productService.getAllProducts()
      .then((data) => { if (isMounted) { setProducts(data); setIsLoading(false); } })
      .catch((err) => {
        if (isMounted) {
          setError('Failed to fetch store inventory. Please try refreshing.');
          setIsLoading(false);
          console.error(err);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const saved = await productService.createProduct(productData);
      setProducts((prev) => [saved, ...prev]);
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Permanently remove this device from inventory?')) return;
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete item.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-neutral-900">CellWego</span>
            <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-medium text-white">
              Management Panel
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
          {/* Add Product Form */}
          <section className="lg:col-span-1" aria-label="Inventory Control Entry Form">
            <AddProductForm onAddProduct={handleAddProduct} />
          </section>

          {/* Inventory Table */}
          <section className="lg:col-span-2 space-y-4" aria-label="Active Stock Layout">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-100 p-5">
                <h2 className="text-lg font-medium tracking-tight text-neutral-900">Stock Control Matrix</h2>
                <p className="mt-1 text-xs text-neutral-400">
                  Monitor, register updates, and remove item schemas from the live local marketplace repository.
                </p>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                  <svg className="h-6 w-6 animate-spin text-neutral-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Syncing Inventory Records...
                  </span>
                </div>
              ) : error ? (
                <div className="py-20 text-center text-sm text-red-500 font-medium">{error}</div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-sm font-medium text-neutral-900">No inventory found</p>
                  <p className="mt-1 text-xs text-neutral-400">Register devices via the entry controller panel.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-100 bg-neutral-50/50 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                        <th className="px-6 py-3.5">Device Specs</th>
                        <th className="px-6 py-3.5">Storage</th>
                        <th className="px-6 py-3.5">Color</th>
                        <th className="px-6 py-3.5">Price</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                      {products.map((product) => (
                        <tr key={product.id} className="transition-colors hover:bg-neutral-50/40">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50 p-1 border border-neutral-100">
                                <img
                                  src={product.image}
                                  alt=""
                                  className="h-full w-full object-contain"
                                  onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=No+Image'; }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-neutral-900">{product.name}</div>
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                                  {product.brand}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-xs font-mono text-neutral-500">
                            {product.storage}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-neutral-600">{product.color}</td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900">
                            {formatPHP(product.price)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-400 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
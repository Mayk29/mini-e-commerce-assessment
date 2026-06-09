import { useState } from 'react';

export default function AddProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    storage: '',
    color: '',
    price: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand selection is required';
    if (!formData.storage.trim()) newErrors.storage = 'Storage capacity is required';
    if (!formData.color.trim()) newErrors.color = 'Color designation is required';

    const parsedPrice = parseFloat(formData.price);
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL path is required';
    } else if (!formData.image.startsWith('/') && !formData.image.startsWith('http')) {
      newErrors.image = 'Provide a valid local path (e.g., /assets/...) or standard web URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Pass only the product data — ID generation happens in productService.createProduct()
      const productData = {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        storage: formData.storage.trim(),
        color: formData.color.trim(),
        image: formData.image.trim(),
        price: parseFloat(formData.price),
      };

      onAddProduct(productData);

      setFormData({ name: '', brand: '', storage: '', color: '', price: '', image: '' });
    } catch (error) {
      console.error('Failed to submit product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-all ${
      errors[field]
        ? 'border-red-500 bg-red-50/30'
        : 'border-neutral-200 focus:border-neutral-400 focus:bg-white'
    }`;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium tracking-tight text-neutral-900 border-b border-neutral-100 pb-4">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Brand */}
          <div className="space-y-1.5">
            <label htmlFor="brand" className="text-xs font-medium text-neutral-500">Brand</label>
            <input
              id="brand" type="text" name="brand"
              placeholder="e.g., Apple, Samsung, Nothing"
              value={formData.brand} onChange={handleChange} disabled={isLoading}
              className={inputClass('brand')}
            />
            {errors.brand && <p className="text-[11px] text-red-500">{errors.brand}</p>}
          </div>

          {/* Product Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-neutral-500">Product Name</label>
            <input
              id="name" type="text" name="name"
              placeholder="e.g., iPhone 15 Pro, Phone (2a)"
              value={formData.name} onChange={handleChange} disabled={isLoading}
              className={inputClass('name')}
            />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Storage */}
          <div className="space-y-1.5">
            <label htmlFor="storage" className="text-xs font-medium text-neutral-500">Storage Capacity</label>
            <input
              id="storage" type="text" name="storage"
              placeholder="e.g., 128GB, 256GB"
              value={formData.storage} onChange={handleChange} disabled={isLoading}
              className={inputClass('storage')}
            />
            {errors.storage && <p className="text-[11px] text-red-500">{errors.storage}</p>}
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <label htmlFor="color" className="text-xs font-medium text-neutral-500">Color Variant</label>
            <input
              id="color" type="text" name="color"
              placeholder="e.g., Space Black, Milk"
              value={formData.color} onChange={handleChange} disabled={isLoading}
              className={inputClass('color')}
            />
            {errors.color && <p className="text-[11px] text-red-500">{errors.color}</p>}
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label htmlFor="price" className="text-xs font-medium text-neutral-500">Price (PHP ₱)</label>
            <input
              id="price" type="number" name="price"
              placeholder="e.g., 45490"
              value={formData.price} onChange={handleChange} disabled={isLoading}
              min="0" step="0.01"
              className={`${inputClass('price')} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            />
            {errors.price && <p className="text-[11px] text-red-500">{errors.price}</p>}
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-1.5">
          <label htmlFor="image" className="text-xs font-medium text-neutral-500">Image Asset URL Path</label>
          <input
            id="image" type="text" name="image"
            placeholder="e.g., /assets/images/device.png or https://..."
            value={formData.image} onChange={handleChange} disabled={isLoading}
            className={inputClass('image')}
          />
          {errors.image && <p className="text-[11px] text-red-500">{errors.image}</p>}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[140px] rounded-full bg-neutral-900 px-6 py-2.5 text-xs font-medium text-white transition-all duration-200 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:scale-100 active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="h-3.5 w-3.5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>Add Product</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
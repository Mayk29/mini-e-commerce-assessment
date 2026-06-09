import { useCart } from '../context/CartContext';
import { formatPHP } from '../utils/currency';

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const { brand, name, storage, color, image, price } = product;

  const handleAdd = () => {
    addToCart(product);
    if (onAddToCart) onAddToCart(name);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-md">
      {/* Product Image */}
      <div className="relative mb-6 flex aspect-square w-full items-center justify-center bg-transparent">
        <img
          src={image}
          alt={`${brand} ${name}`}
          className="h-48 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {brand}
          </span>
          <span className="text-xs text-neutral-500">{storage}</span>
        </div>

        <h3 className="mt-1 text-lg font-medium tracking-tight text-neutral-900">{name}</h3>
        <p className="mt-1 text-xs text-neutral-400">{color}</p>

        {/* Price + CTA */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-lg font-semibold tracking-tight text-neutral-900">
            {formatPHP(price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-neutral-800 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
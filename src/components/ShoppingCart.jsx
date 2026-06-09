import { useCart } from '../context/CartContext';

export default function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900">
          Shopping Cart
        </h2>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-medium text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm font-medium text-neutral-900">Your cart is empty</p>
          <p className="mt-1 text-xs text-neutral-400">
            Items you add to your cart will appear here.
          </p>
        </div>
      ) : (
        /* Cart Item List */
        <div className="divide-y divide-neutral-100">
          <div className="max-h-[60vh] overflow-y-auto py-2 pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-50 p-2">
                    <img
                      src={item.image}
                      alt={`${item.brand} ${item.name}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">{item.name}</h4>
                    <p className="text-xs text-neutral-400">{item.storage} · {item.color}</p>
                    <p className="mt-1 text-sm font-medium text-neutral-900">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Remove Action */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center rounded-full border border-neutral-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-50 active:scale-90"
                    >
                      —
                    </button>
                    <span className="w-8 text-center text-xs font-medium text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-50 active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-neutral-400 transition-colors duration-200 hover:text-neutral-900"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total Aggregates */}
          <div className="pt-4 mt-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-900">Total</span>
              <span className="text-2xl font-semibold tracking-tight text-neutral-900">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-full bg-neutral-900 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-800 active:scale-98"
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
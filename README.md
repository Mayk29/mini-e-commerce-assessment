# CellWego Store
### Frontend Developer Technical Assessment — Mini E-Commerce & Admin PWA

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally (PWA features require this step)
npm run preview
```

> **Note:** PWA installation prompts and service worker caching only activate on the production build (`npm run build && npm run preview`), not in `npm run dev` mode.

---

## Project Overview

CellWego Store is a single-page React application featuring a customer-facing storefront and an admin dashboard for product management. It uses a simulated async API layer (Promise + setTimeout) to mimic real network requests, with localStorage handling both cart and product persistence across sessions.

---

## Feature Checklist

### Customer Storefront
- [x] **Product Catalog** — Responsive grid displaying product images, names, prices (₱ PHP), and an Add to Cart button
- [x] **Shopping Cart** — Add/remove items, adjust quantities, and view a real-time running total
- [x] **Cart Persistence** — Cart contents survive page refreshes via `localStorage` (`cellwego_cart` key)
- [x] **Offline Banner** — A sticky notification appears at the bottom of the screen when the browser loses network connectivity, using native `online`/`offline` browser events

### Admin Dashboard (`/admin`)
- [x] **Product List View** — Table layout displaying all current products with thumbnail, name, brand, storage, color, and price
- [x] **Add Product Form** — Controlled React form with validation for product name, brand, storage, color, price, and image URL
- [x] **API Simulation** — Form submission triggers a simulated async network request (500ms delay via `setTimeout`) before saving the product to local state and `localStorage`

### PWA Capabilities
- [x] **Installability** — `public/manifest.json` configured with `name`, `short_name`, `theme_color`, `background_color`, `display: standalone`, and both 192×192 and 512×512 PNG icons, satisfying Chrome's installability requirements
- [x] **Offline App Shell** — Service worker (via `vite-plugin-pwa`) precaches all compiled JS, CSS, HTML, SVG, and PNG assets so the app loads even with no internet connection

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State | React Context API + `useState` / `useEffect` |
| PWA | vite-plugin-pwa (Workbox) |
| Persistence | `localStorage` (via custom `storage` utility) |

---

## PWA & Offline Approach

The app uses `vite-plugin-pwa` with Workbox's `autoUpdate` strategy to register and silently update the service worker in the background. At build time, Workbox generates a precache manifest covering all compiled JS, CSS, HTML, SVG, and PNG assets — this forms the "app shell" that the service worker caches on first install.

When the device goes offline, the service worker intercepts navigation and asset requests and serves them from cache, keeping the full UI operational. On the UI layer, an `OfflineBanner` component independently listens to the browser's native `window.online` / `window.offline` events and displays a persistent alert so users always know their current connectivity state — even when the cached app is functioning normally.

---

## Project Structure

```
src/
├── components/
│   ├── AddProductForm.jsx     # Admin: controlled form with validation
│   ├── OfflineBanner.jsx      # Connectivity status notification
│   ├── ProductCard.jsx        # Storefront product tile
│   ├── ShoppingCart.jsx       # Cart panel with quantity controls
│   └── ToastNotification.jsx  # Add-to-cart success toasts
├── context/
│   └── CartContext.jsx        # Global cart state via React Context
├── data/
│   └── products.js            # Seed product catalogue
├── pages/
│   ├── AdminDashboard.jsx     # /admin route
│   └── Storefront.jsx         # / route
├── services/
│   └── productService.js      # Simulated async CRUD API
└── utils/
    ├── currency.js            # Shared PHP formatter (Intl.NumberFormat)
    └── storage.js             # localStorage wrapper (cellwego_ prefix)
public/
├── manifest.json              # PWA manifest
├── icon-192.png               # PWA icon (192×192)
└── icon-512.png               # PWA icon (512×512)
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Customer storefront — product catalog and shopping cart |
| `/admin` | Admin dashboard — inventory table and add product form |
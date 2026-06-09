# CellWego Store

A mini e-commerce storefront with an admin dashboard, built as a front-end assessment project.

## Project Overview

CellWego Store is a single-page application featuring a customer-facing storefront and an admin dashboard for product management. It uses a simulated API layer (Promise + setTimeout) to mimic real async data fetching, with localStorage handling cart and product persistence across sessions.

## Features

**Storefront**
- Browse and search products with live filtering
- Add to cart with quantity controls
- Persistent cart via localStorage
- Offline detection banner when network is unavailable

**Admin Dashboard**
- Add, edit, and delete products
- Form validation with error feedback
- Changes persist across page reloads via localStorage

## Tech Stack

React 19, Vite 8, Tailwind CSS 4, React Router 7, vite-plugin-pwa

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## PWA Implementation

Configured via `vite-plugin-pwa` with the following setup:

- **Register type:** `autoUpdate` — service worker registers and updates automatically
- **Precache:** All compiled JS, CSS, HTML, SVG, PNG, and font assets are precached as the app shell
- **Manifest:** Includes app name, theme color, display mode (`standalone`), and PWA icons (192×192 and 512×512)

The app is installable on supported browsers and devices as a standalone application.

## Offline Support

An `OfflineBanner` component listens to the browser's `online`/`offline` events and displays a persistent notification when the network is unavailable. Because all assets are precached by the service worker, the app remains fully functional offline — browsing products, managing the cart, and using the admin dashboard all work without a connection.
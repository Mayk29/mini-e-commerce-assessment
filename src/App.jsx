import { Routes, Route, Navigate } from 'react-router-dom';

// Placeholder view components matching the established folder architecture
const StorefrontPlaceholder = () => (
  <div className="flex min-h-screen items-center justify-center p-6 bg-[#f5f5f7]">
    <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Public Catalog</span>
      <h1 className="mt-2 text-2xl font-medium tracking-tight text-neutral-900">CellWego Storefront</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">Premium electronics marketplace interface.</p>
    </div>
  </div>
);

const AdminPlaceholder = () => (
  <div className="flex min-h-screen items-center justify-center p-6 bg-[#f5f5f7]">
    <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Management Panel</span>
      <h1 className="mt-2 text-2xl font-medium tracking-tight text-neutral-900">Inventory Dashboard</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">Administrative tools and stock control metrics.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <Routes>
        {/* Storefront Route */}
        <Route path="/" element={<StorefrontPlaceholder />} />
        
        {/* Admin Route */}
        <Route path="/admin" element={<AdminPlaceholder />} />
        
        {/* Catch-all Wildcard Redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
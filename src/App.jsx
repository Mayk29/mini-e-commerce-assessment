import { Routes, Route, Navigate } from 'react-router-dom';
import Storefront from './pages/Storefront';

const AdminDashboardPlaceholder = () => (
  <div className="flex min-h-screen items-center justify-center p-6 bg-[#f5f5f7]">
    <div className="max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Management Panel</span>
      <h1 className="mt-2 text-2xl font-medium tracking-tight text-neutral-900">Admin Dashboard</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">Administrative tools and stock control metrics.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <Routes>
        {/* Public Catalog storefront route */}
        <Route path="/" element={<Storefront />} />
        
        {/* Administrative panel control route */}
        <Route path="/admin" element={<AdminDashboardPlaceholder />} />
        
        {/* Fallback pattern redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
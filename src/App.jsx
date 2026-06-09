import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Storefront from './pages/Storefront';
import OfflineBanner from './components/OfflineBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <OfflineBanner />
      <Routes>
        {/* Public Catalog storefront route */}
        <Route path="/" element={<Storefront />} />

        {/* Administrative panel control route */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback pattern redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
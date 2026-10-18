import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Synchronous Layout & Guards
import { PublicLayout } from '../components/layout/PublicLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { PublicOnlyAdminRoute } from '../components/auth/PublicOnlyAdminRoute';

// Synchronous Core Public Landing Page for Instant First Paint
import { HomePage } from '../pages/public/HomePage';

// Lazy Loaded Secondary Public Pages
const ShopPage = lazy(() =>
  import('../pages/public/ShopPage').then((m) => ({ default: m.ShopPage }))
);
const ProductDetailPage = lazy(() =>
  import('../pages/public/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const AboutPage = lazy(() =>
  import('../pages/public/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('../pages/public/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const CustomJewelleryPage = lazy(() =>
  import('../pages/public/CustomJewelleryPage').then((m) => ({ default: m.CustomJewelleryPage }))
);

// Lazy Loaded Admin Layout & Pages (Excluded from initial storefront bundle)
const AdminLayout = lazy(() =>
  import('../components/layout/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);
const AdminLoginPage = lazy(() =>
  import('../pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
);
const AdminDashboardPage = lazy(() =>
  import('../pages/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const AdminProductsPage = lazy(() =>
  import('../pages/admin/AdminProductsPage').then((m) => ({ default: m.AdminProductsPage }))
);
const AdminCustomRequestsPage = lazy(() =>
  import('../pages/admin/AdminCustomRequestsPage').then((m) => ({ default: m.AdminCustomRequestsPage }))
);
const AdminCategoriesPage = lazy(() =>
  import('../pages/admin/AdminCategoriesPage').then((m) => ({ default: m.AdminCategoriesPage }))
);
const AdminEnquiriesPage = lazy(() =>
  import('../pages/admin/AdminEnquiriesPage').then((m) => ({ default: m.AdminEnquiriesPage }))
);

// Luxury Loading Fallback Component
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-transparent">
    <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin" />
    <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-mono">
      Zeenath Jewellers
    </span>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public Storefront Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/custom-jewellery" element={<CustomJewelleryPage />} />
        </Route>

        {/* Admin Login Route (Guarded for public only - redirects auth users to /admin/dashboard) */}
        <Route element={<PublicOnlyAdminRoute />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        {/* Protected Admin Routes (Guarded by ProtectedRoute - redirects unauthenticated users to /admin/login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="custom-requests" element={<AdminCustomRequestsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
          </Route>
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

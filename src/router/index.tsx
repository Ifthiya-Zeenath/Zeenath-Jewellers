import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Auth Guards
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { PublicOnlyAdminRoute } from '../components/auth/PublicOnlyAdminRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { ShopPage } from '../pages/public/ShopPage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { CustomJewelleryPage } from '../pages/public/CustomJewelleryPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminCustomRequestsPage } from '../pages/admin/AdminCustomRequestsPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminEnquiriesPage } from '../pages/admin/AdminEnquiriesPage';

export const AppRoutes: React.FC = () => {
  return (
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
  );
};

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Loader2 } from 'lucide-react';

export const PublicOnlyAdminRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-[#C6A15B]/10 border border-[#C6A15B]/30 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-lg animate-pulse">
            <Shield className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2 text-white font-serif-luxury text-sm">
            <Loader2 className="w-4 h-4 text-[#C6A15B] animate-spin" />
            <span>Checking Session...</span>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to /admin/dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

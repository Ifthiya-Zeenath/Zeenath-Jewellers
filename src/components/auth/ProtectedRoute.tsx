import React from 'react';
import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, ShieldAlert, Loader2, LogOut, ArrowLeft } from 'lucide-react';

export const ProtectedRoute: React.FC = () => {
  const { user, isAuthenticated, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Authentication & Admin Verification Loading State to prevent brief flicker
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-[#C6A15B]/10 border border-[#C6A15B]/30 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-lg animate-pulse">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-white font-serif-luxury text-lg">
              <Loader2 className="w-4 h-4 text-[#C6A15B] animate-spin" />
              <span>Verifying Admin Credentials</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
              Zeenath Security System
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 1. Unauthenticated users are redirected to admin login
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // 2. Authenticated non-administrators are denied access with clear feedback
  if (!isAdmin) {
    const handleSignOut = async () => {
      await logout();
      navigate('/admin/login', { replace: true });
    };

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4 sm:p-6 text-gray-100">
        <div className="w-full max-w-md bg-gray-900 border border-red-500/30 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-red-950/60 border border-red-800/80 rounded-full flex items-center justify-center mx-auto text-red-400 shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-luxury text-xl font-bold text-white tracking-wider">
              ZEENATH JEWELLERY
            </h1>
            <p className="text-xs text-red-400 uppercase tracking-[0.2em] font-semibold">
              Access Restricted
            </p>
          </div>

          <div className="p-4 bg-gray-950 border border-gray-800 rounded-lg space-y-2 text-xs">
            <p className="font-semibold text-white">
              Administrator Privileges Required
            </p>
            <p className="text-gray-400 leading-relaxed">
              Your account (<strong className="text-gray-200">{user.email}</strong>) is signed in, but it does not have authorized administrative permissions in the security directory.
            </p>
            <p className="text-[11px] text-gray-500 pt-1 font-mono">
              UID: {user.uid}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-red-200 hover:text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out & Switch Account</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Return to Public Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated, verified administrators can access protected pages
  return <Outlet />;
};

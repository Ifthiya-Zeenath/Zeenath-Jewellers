import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login action
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#C6A15B]/10 rounded-full flex items-center justify-center mx-auto text-[#C6A15B]">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-serif-luxury text-2xl font-bold text-white tracking-wider">
            ZEENATH JEWELLERY
          </h1>
          <p className="text-xs text-[#C6A15B] uppercase tracking-widest">Admin Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Username / Email
            </label>
            <input
              type="text"
              placeholder="admin@zeenath.com"
              disabled
              className="w-full px-4 py-2 text-xs bg-gray-800 border border-gray-700 text-gray-400 rounded cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              disabled
              className="w-full px-4 py-2 text-xs bg-gray-800 border border-gray-700 text-gray-400 rounded cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#C6A15B] text-gray-950 font-bold text-xs uppercase tracking-widest hover:bg-[#A88645] transition-colors rounded shadow"
          >
            <Lock className="w-4 h-4" />
            <span>Enter Admin Dashboard (Demo)</span>
          </button>
        </form>

        <div className="pt-4 border-t border-gray-800 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Zeenath Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

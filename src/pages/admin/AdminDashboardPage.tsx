import React from 'react';
import { Package, Layers, MessageSquare, TrendingUp, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gray-950 border border-[#C6A15B]/30 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#C6A15B] uppercase tracking-widest font-bold">
            <UserCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Authenticated Session</span>
          </div>
          <h1 className="text-2xl font-serif-luxury font-bold text-white">
            Welcome to Zeenath Admin Console
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Signed in as: <strong className="text-white">{user?.email || 'Admin User'}</strong>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-900 border border-gray-800 text-xs text-gray-300 rounded font-medium">
          <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
          <span>Firebase Auth Guard Active</span>
        </div>
      </div>

      {/* Metrics & Overview Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Products</span>
            <Package className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">18</p>
          <p className="text-[11px] text-gray-400">Catalogue items loaded</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Categories</span>
            <Layers className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">9</p>
          <p className="text-[11px] text-gray-400">Jewellery categories</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Enquiries</span>
            <MessageSquare className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-[11px] text-gray-400">Pending customer messages</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Gold Rate Standard</span>
            <TrendingUp className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-[#C6A15B]">22K / 24K</p>
          <p className="text-[11px] text-gray-400">Hallmarked Sri Lankan Gold</p>
        </div>
      </div>
    </div>
  );
};

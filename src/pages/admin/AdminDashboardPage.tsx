import React from 'react';
import { Package, Layers, MessageSquare, TrendingUp } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-serif-luxury font-bold text-white">Admin Dashboard</h1>
        <p className="text-xs text-gray-400 mt-1">
          Overview & metrics placeholder for Zeenath Jewellery administration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-850 bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Products</span>
            <Package className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-[11px] text-gray-400">Products ready for creation</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Categories</span>
            <Layers className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-[11px] text-gray-400">Categories placeholder</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Customer Enquiries</span>
            <MessageSquare className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-white">0</p>
          <p className="text-[11px] text-gray-400">WhatsApp / Contact form logs</p>
        </div>

        <div className="bg-gray-800/80 border border-gray-700/60 p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs uppercase tracking-wider font-semibold">Gold Rate Sync</span>
            <TrendingUp className="w-5 h-5 text-[#C6A15B]" />
          </div>
          <p className="text-2xl font-bold text-[#C6A15B]">22K Gold</p>
          <p className="text-[11px] text-gray-400">Market price indicator</p>
        </div>
      </div>
    </div>
  );
};

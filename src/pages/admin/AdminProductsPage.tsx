import React from 'react';
import { Package, Plus } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-serif-luxury font-bold text-white">Products Management</h1>
          <p className="text-xs text-gray-400 mt-1">Manage gold jewellery catalog items.</p>
        </div>

        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-400 rounded text-xs font-semibold uppercase tracking-wider cursor-not-allowed border border-gray-700"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product (Disabled in Setup Phase)</span>
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center space-y-4">
        <Package className="w-12 h-12 text-[#C6A15B] mx-auto opacity-70" />
        <h3 className="text-lg font-bold text-white">Admin Products Route Initialized</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          The admin products page structure is configured. Firebase product CRUD integration will be added when specified.
        </p>
      </div>
    </div>
  );
};

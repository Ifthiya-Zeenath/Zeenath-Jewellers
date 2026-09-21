import React from 'react';
import { MessageSquare } from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-serif-luxury font-bold text-white">Customer Enquiries</h1>
        <p className="text-xs text-gray-400 mt-1">
          Review customer inquiries, custom jewellery requests, and messages.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 text-center space-y-4">
        <MessageSquare className="w-12 h-12 text-[#C6A15B] mx-auto opacity-70" />
        <h3 className="text-lg font-bold text-white">Admin Enquiries Route Initialized</h3>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          The customer enquiry management log route is ready for data binding.
        </p>
      </div>
    </div>
  );
};

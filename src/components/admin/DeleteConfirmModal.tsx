import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { FirestoreProduct } from '../../services/firestoreService';
import { formatPrice } from '../../data/products';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  product: FirestoreProduct | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  product,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-gray-900 border border-red-800/60 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-950/40 border-b border-red-800/40">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-serif-luxury font-bold text-white">
              Confirm Product Deletion
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="p-1 text-gray-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-gray-300">
            Are you sure you want to permanently delete this product from Cloud Firestore? This action cannot be undone.
          </p>

          {/* Product Summary Card */}
          <div className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 object-cover rounded border border-gray-800 bg-gray-900 shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&auto=format&fit=crop';
              }}
            />
            <div className="space-y-1 overflow-hidden">
              <h4 className="font-semibold text-white truncate">{product.name}</h4>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
                <span>{product.productCode}</span>
                <span>•</span>
                <span className="text-[#C6A15B]">{formatPrice(product.price)}</span>
              </div>
              <span className="inline-block px-2 py-0.5 bg-gray-900 border border-gray-800 rounded text-[10px] text-gray-300">
                Category: {product.category}
              </span>
            </div>
          </div>

          <div className="p-3 bg-red-950/30 border border-red-900/40 rounded text-[11px] text-red-300/90 leading-relaxed">
            Note: Once deleted, this product will no longer appear on the public storefront or in search results.
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-950 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Product</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

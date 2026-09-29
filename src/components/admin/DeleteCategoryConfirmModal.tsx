import React, { useMemo } from 'react';
import { AlertTriangle, X, ShieldAlert, CheckCircle } from 'lucide-react';
import type { FirestoreCategory, FirestoreProduct } from '../../services/firestoreService';

interface DeleteCategoryConfirmModalProps {
  isOpen: boolean;
  category: FirestoreCategory | null;
  products: FirestoreProduct[];
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteCategoryConfirmModal: React.FC<DeleteCategoryConfirmModalProps> = ({
  isOpen,
  category,
  products,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !category) return null;

  // Calculate how many products reference this category name
  const referencingProducts = useMemo(() => {
    const targetName = category.name.trim().toLowerCase();
    return products.filter(
      (p) => p.category && p.category.trim().toLowerCase() === targetName
    );
  }, [category, products]);

  const usageCount = referencingProducts.length;
  const isBlockedFromDeletion = usageCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-gray-900 border border-red-800/60 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-950/40 border-b border-red-800/40">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-serif-luxury font-bold text-white">
              Confirm Category Deletion
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
          <div className="p-3 bg-gray-950 border border-gray-800 rounded flex items-center justify-between">
            <span className="font-semibold text-white text-sm">{category.name}</span>
            <span className="text-gray-400 text-[11px] font-mono">
              {category.id}
            </span>
          </div>

          {isBlockedFromDeletion ? (
            /* Blocked Warning Banner */
            <div className="p-4 bg-amber-950/60 border border-amber-800/80 rounded-lg space-y-2 text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>Cannot Delete Active Category</span>
              </div>
              <p className="text-xs leading-relaxed font-light">
                This category is currently used by <strong className="text-white">{usageCount} product(s)</strong> in your catalog and cannot be deleted.
              </p>
              <p className="text-[11px] text-amber-300/80 italic">
                Please reassign or delete those products before deleting this category.
              </p>

              <div className="pt-2 border-t border-amber-800/50 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-semibold block">
                  Referencing Products:
                </span>
                <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                  {referencingProducts.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      className="text-[11px] bg-black/40 px-2 py-1 rounded flex justify-between text-gray-300"
                    >
                      <span className="truncate max-w-[200px]">{p.name}</span>
                      <span className="font-mono text-gray-400">{p.productCode}</span>
                    </div>
                  ))}
                  {usageCount > 5 && (
                    <div className="text-[10px] text-amber-400 italic">
                      + {usageCount - 5} more products...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Safe Confirmation Notice */
            <div className="space-y-3">
              <p className="text-gray-300">
                Are you sure you want to permanently delete the category <strong className="text-white">"{category.name}"</strong>? This action cannot be undone.
              </p>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>No products currently reference this category. Safe to delete.</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-950 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isBlockedFromDeletion ? 'Close' : 'Cancel'}
          </button>
          {!isBlockedFromDeletion && (
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
                <span>Delete Category</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

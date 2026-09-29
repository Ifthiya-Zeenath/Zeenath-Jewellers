import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { FirestoreCustomRequest } from '../../services/firestoreService';

interface DeleteRequestConfirmModalProps {
  isOpen: boolean;
  request: FirestoreCustomRequest | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteRequestConfirmModal: React.FC<DeleteRequestConfirmModalProps> = ({
  isOpen,
  request,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-gray-900 border border-red-800/60 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-950/40 border-b border-red-800/40">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-serif-luxury font-bold text-white">
              Confirm Request Deletion
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
            Are you sure you want to permanently delete this custom jewellery request from Cloud Firestore? This action cannot be undone.
          </p>

          {/* Request Summary Box */}
          <div className="p-3 bg-gray-950 border border-gray-800 rounded space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-white font-semibold">
              <span>{request.customerName}</span>
              <span className="font-mono text-[#C6A15B] text-[11px]">{request.jewelleryType}</span>
            </div>
            <div className="text-gray-400 text-[11px]">
              Phone: {request.phone} • Email: {request.email}
            </div>
            <div className="text-gray-400 text-[11px]">
              Budget: {request.budgetRange} ({request.metalType})
            </div>
          </div>

          <div className="p-3 bg-red-950/30 border border-red-900/40 rounded text-[11px] text-red-300/90 leading-relaxed">
            Warning: Once deleted, this request will be permanently removed from the admin panel database.
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
              <span>Delete Request</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

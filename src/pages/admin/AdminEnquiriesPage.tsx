import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} from '../../services/firestoreService';
import type { FirestoreEnquiry, EnquiryStatus } from '../../services/firestoreService';
import { ENQUIRY_STATUS_LABELS } from '../../services/firestoreService';
import { EnquiryTable } from '../../components/admin/EnquiryTable';
import { EnquiryDetailsModal } from '../../components/admin/EnquiryDetailsModal';
import { DeleteEnquiryConfirmModal } from '../../components/admin/DeleteEnquiryConfirmModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminEnquiriesPage: React.FC = () => {
  useDocumentTitle('Admin Enquiries | Zeenath Jewellers');
  const [enquiries, setEnquiries] = useState<FirestoreEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal States
  const [selectedEnquiry, setSelectedEnquiry] = useState<FirestoreEnquiry | null>(null);
  const [deletingEnquiry, setDeletingEnquiry] = useState<FirestoreEnquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Notification Toast State
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loadEnquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch customer enquiries';
      showNotification('error', `Firestore Read Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  // Update Status Handler
  const handleUpdateStatus = async (
    id: string,
    newStatus: EnquiryStatus
  ): Promise<boolean> => {
    const target = enquiries.find((item) => item.id === id);
    if (!target || target.status === newStatus) return true;

    const oldStatus = target.status;
    setIsUpdating(true);

    // Optimistic Update
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateEnquiry(id, { status: newStatus });
    setIsUpdating(false);

    if (res.success) {
      showNotification(
        'success',
        `Enquiry status for "${target.customerName}" updated to ${ENQUIRY_STATUS_LABELS[newStatus]}.`
      );
      return true;
    } else {
      // Revert Optimistic Update
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: oldStatus } : item))
      );
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: oldStatus } : null));
      }
      showNotification('error', res.error || 'Failed to update enquiry status.');
      return false;
    }
  };

  // Delete Enquiry Handler
  const handleConfirmDelete = async () => {
    if (!deletingEnquiry?.id) return;
    setIsDeleting(true);

    try {
      const res = await deleteEnquiry(deletingEnquiry.id);
      if (res.success) {
        showNotification(
          'success',
          `Customer enquiry from "${deletingEnquiry.customerName}" deleted successfully.`
        );
        setDeletingEnquiry(null);
        if (selectedEnquiry?.id === deletingEnquiry.id) {
          setSelectedEnquiry(null);
        }
        await loadEnquiries();
      } else {
        showNotification('error', res.error || 'Failed to delete enquiry.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion error';
      showNotification('error', msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#C6A15B]" />
            <h1 className="text-2xl font-serif-luxury font-bold text-white">
              Customer Enquiries
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Review customer inquiries, product requests, and boutique messages logged from the storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadEnquiries}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            title="Refresh customer enquiries list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notification Toast Banner */}
      {notification && (
        <div
          className={`flex items-center justify-between p-4 rounded-lg border text-xs font-medium transition-all shadow-lg ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-800/80 text-emerald-200'
              : 'bg-red-950/90 border-red-800/80 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs underline opacity-70 hover:opacity-100 cursor-pointer ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Enquiry Table Component */}
      <EnquiryTable
        enquiries={enquiries}
        onViewDetails={(item) => setSelectedEnquiry(item)}
        onDelete={(item) => setDeletingEnquiry(item)}
        onChangeStatus={(item, newStatus) => handleUpdateStatus(item.id, newStatus)}
        isLoading={isLoading}
      />

      {/* Enquiry Details Modal */}
      <EnquiryDetailsModal
        isOpen={Boolean(selectedEnquiry)}
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteEnquiryConfirmModal
        isOpen={Boolean(deletingEnquiry)}
        enquiry={deletingEnquiry}
        onClose={() => setDeletingEnquiry(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

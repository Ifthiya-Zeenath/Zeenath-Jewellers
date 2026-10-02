import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  getCustomRequests,
  updateCustomRequest,
  deleteCustomRequest,
} from '../../services/firestoreService';
import type { FirestoreCustomRequest, CustomRequestStatus } from '../../services/firestoreService';
import { CUSTOM_REQUEST_STATUS_LABELS } from '../../services/firestoreService';
import { CustomRequestTable } from '../../components/admin/CustomRequestTable';
import { CustomRequestDetailsModal } from '../../components/admin/CustomRequestDetailsModal';
import { DeleteRequestConfirmModal } from '../../components/admin/DeleteRequestConfirmModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminCustomRequestsPage: React.FC = () => {
  useDocumentTitle('Admin Custom Requests | Zeenath Jewellers');
  const [requests, setRequests] = useState<FirestoreCustomRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal States
  const [selectedRequest, setSelectedRequest] = useState<FirestoreCustomRequest | null>(null);
  const [deletingRequest, setDeletingRequest] = useState<FirestoreCustomRequest | null>(null);
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

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCustomRequests();
      setRequests(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch custom requests';
      showNotification('error', `Firestore Read Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Update Status Handler
  const handleUpdateStatus = async (
    id: string,
    newStatus: CustomRequestStatus
  ): Promise<boolean> => {
    const target = requests.find((r) => r.id === id);
    if (!target || target.status === newStatus) return true;

    const oldStatus = target.status;
    setIsUpdating(true);

    // Optimistic Update
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest?.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateCustomRequest(id, { status: newStatus });
    setIsUpdating(false);

    if (res.success) {
      showNotification(
        'success',
        `Request status for "${target.customerName}" updated to ${CUSTOM_REQUEST_STATUS_LABELS[newStatus]}.`
      );
      return true;
    } else {
      // Revert Optimistic Update
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: oldStatus } : r))
      );
      if (selectedRequest?.id === id) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: oldStatus } : null));
      }
      showNotification('error', res.error || 'Failed to update request status.');
      return false;
    }
  };

  // Delete Request Handler
  const handleConfirmDelete = async () => {
    if (!deletingRequest?.id) return;
    setIsDeleting(true);

    try {
      const res = await deleteCustomRequest(deletingRequest.id);
      if (res.success) {
        showNotification(
          'success',
          `Custom request from "${deletingRequest.customerName}" deleted successfully.`
        );
        setDeletingRequest(null);
        if (selectedRequest?.id === deletingRequest.id) {
          setSelectedRequest(null);
        }
        await loadRequests();
      } else {
        showNotification('error', res.error || 'Failed to delete request.');
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
            <Sparkles className="w-6 h-6 text-[#C6A15B]" />
            <h1 className="text-2xl font-serif-luxury font-bold text-white">
              Bespoke Custom Requests
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Manage custom jewellery orders, sovereign requests, and customer design specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadRequests}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            title="Refresh custom requests list"
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

      {/* Request Table Component */}
      <CustomRequestTable
        requests={requests}
        onViewDetails={(req) => setSelectedRequest(req)}
        onDelete={(req) => setDeletingRequest(req)}
        onChangeStatus={(req, newStatus) => handleUpdateStatus(req.id, newStatus)}
        isLoading={isLoading}
      />

      {/* Custom Request Details Modal */}
      <CustomRequestDetailsModal
        isOpen={Boolean(selectedRequest)}
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onUpdateStatus={handleUpdateStatus}
        isUpdating={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteRequestConfirmModal
        isOpen={Boolean(deletingRequest)}
        request={deletingRequest}
        onClose={() => setDeletingRequest(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

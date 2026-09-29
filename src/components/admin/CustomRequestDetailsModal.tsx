import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  User,
  Phone,
  Mail,
  Gem,
  Coins,
  FileText,
  MessageSquare,
  Clock,
  ExternalLink,
  Save,
} from 'lucide-react';
import type { FirestoreCustomRequest, CustomRequestStatus } from '../../services/firestoreService';
import { CUSTOM_REQUEST_STATUS_LABELS } from '../../services/firestoreService';
import { getCustomerWhatsAppUrl } from '../../constants/businessDetails';

interface CustomRequestDetailsModalProps {
  isOpen: boolean;
  request: FirestoreCustomRequest | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: CustomRequestStatus) => Promise<boolean>;
  isUpdating: boolean;
}

export const CustomRequestDetailsModal: React.FC<CustomRequestDetailsModalProps> = ({
  isOpen,
  request,
  onClose,
  onUpdateStatus,
  isUpdating,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<CustomRequestStatus>('pending');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (request) {
      setSelectedStatus(request.status);
      setStatusMessage(null);
    }
  }, [request]);

  if (!isOpen || !request) return null;

  const handleSaveStatus = async () => {
    if (selectedStatus === request.status) return;
    const success = await onUpdateStatus(request.id, selectedStatus);
    if (success) {
      setStatusMessage('Status updated successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const whatsappUrl = getCustomerWhatsAppUrl(
    request.phone,
    request.customerName,
    request.jewelleryType
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C6A15B]" />
            <div>
              <h2 className="text-base font-serif-luxury font-bold text-white">
                Bespoke Request Details
              </h2>
              <p className="text-[11px] text-gray-400 font-mono">
                ID: {request.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Customer Core Contact Card */}
          <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <User className="w-4 h-4 text-[#C6A15B]" />
                  <span>{request.customerName}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-[11px] flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>{request.phone}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <a href={`mailto:${request.email}`} className="hover:underline text-gray-300">
                      {request.email}
                    </a>
                  </span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-2xs shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp Customer</span>
              </a>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-950 p-4 border border-gray-800 rounded-lg">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-medium">
                Jewellery Type
              </span>
              <strong className="text-white font-semibold flex items-center gap-1 mt-0.5">
                <Gem className="w-3.5 h-3.5 text-[#C6A15B]" />
                {request.jewelleryType}
              </strong>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-medium">
                Metal Purity
              </span>
              <strong className="text-white font-semibold block mt-0.5">
                {request.metalType}
              </strong>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-medium">
                Budget Range
              </span>
              <strong className="text-[#C6A15B] font-semibold flex items-center gap-1 mt-0.5">
                <Coins className="w-3.5 h-3.5" />
                {request.budgetRange}
              </strong>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-medium">
                Target Date
              </span>
              <strong className="text-gray-200 block mt-0.5">
                {request.preferredCompletionDate || 'Flexible'}
              </strong>
            </div>
          </div>

          {/* Design Description */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#C6A15B]" />
              <span>Design Description & Specifications</span>
            </h4>
            <div className="p-4 bg-gray-950 border border-gray-800 rounded-lg text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
              {request.designDescription}
            </div>
          </div>

          {/* Special Requirements */}
          {request.specialRequirements && (
            <div className="space-y-1.5">
              <h4 className="font-semibold text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                <span>Special Requirements & Engravings</span>
              </h4>
              <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg text-gray-300 font-light">
                {request.specialRequirements}
              </div>
            </div>
          )}

          {/* Submitted Date & Timestamps */}
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] pt-1">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Submitted on: {new Date(request.createdAt).toLocaleString()}</span>
          </div>

          {/* Interactive Status Management Bar */}
          <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg space-y-3 pt-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                  Update Request Status
                </span>
                <p className="text-[11px] text-gray-400">
                  Current status: <strong className="text-[#C6A15B]">{CUSTOM_REQUEST_STATUS_LABELS[request.status]}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as CustomRequestStatus)}
                  className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  type="button"
                  onClick={handleSaveStatus}
                  disabled={isUpdating || selectedStatus === request.status}
                  className="px-4 py-2 bg-[#C6A15B] hover:bg-[#A88645] text-gray-950 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isUpdating ? (
                    <div className="w-3.5 h-3.5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Save</span>
                </button>
              </div>
            </div>

            {statusMessage && (
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                {statusMessage}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-gray-950 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

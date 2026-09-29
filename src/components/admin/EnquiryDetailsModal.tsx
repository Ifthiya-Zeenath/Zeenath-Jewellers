import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquare,
  User,
  Phone,
  Mail,
  ExternalLink,
  Clock,
  Save,
  Tag,
} from 'lucide-react';
import type { FirestoreEnquiry, EnquiryStatus } from '../../services/firestoreService';
import { ENQUIRY_STATUS_LABELS } from '../../services/firestoreService';
import { getCustomerWhatsAppUrl } from '../../constants/businessDetails';

interface EnquiryDetailsModalProps {
  isOpen: boolean;
  enquiry: FirestoreEnquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: EnquiryStatus) => Promise<boolean>;
  isUpdating: boolean;
}

export const EnquiryDetailsModal: React.FC<EnquiryDetailsModalProps> = ({
  isOpen,
  enquiry,
  onClose,
  onUpdateStatus,
  isUpdating,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus>('new');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (enquiry) {
      setSelectedStatus(enquiry.status);
      setStatusMessage(null);
    }
  }, [enquiry]);

  if (!isOpen || !enquiry) return null;

  const handleSaveStatus = async () => {
    if (selectedStatus === enquiry.status) return;
    const success = await onUpdateStatus(enquiry.id, selectedStatus);
    if (success) {
      setStatusMessage('Status updated successfully!');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const whatsappUrl = getCustomerWhatsAppUrl(
    enquiry.phone,
    enquiry.customerName,
    enquiry.productName || 'jewellery'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C6A15B]" />
            <div>
              <h2 className="text-base font-serif-luxury font-bold text-white">
                Customer Enquiry Details
              </h2>
              <p className="text-[11px] text-gray-400 font-mono">
                ID: {enquiry.id}
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

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Customer Core Info Card */}
          <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <User className="w-4 h-4 text-[#C6A15B]" />
                  <span>{enquiry.customerName}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-[11px] flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>{enquiry.phone}</span>
                  </span>
                  {enquiry.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-500" />
                      <a href={`mailto:${enquiry.email}`} className="hover:underline text-gray-300">
                        {enquiry.email}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="pt-3 border-t border-gray-800/80 flex items-center gap-2 flex-wrap">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Phone Call */}
              <a
                href={`tel:${enquiry.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-950/70 hover:bg-blue-900 border border-blue-800/80 text-blue-300 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Phone</span>
              </a>

              {/* Email */}
              {enquiry.email && (
                <a
                  href={`mailto:${enquiry.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/70 hover:bg-purple-900 border border-purple-800/80 text-purple-300 rounded text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Product Reference Badge if present */}
          {(enquiry.productCode || enquiry.productName) && (
            <div className="p-3 bg-gray-950 border border-gray-800 rounded-lg flex items-center gap-2 text-xs">
              <Tag className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <div className="space-y-0.5">
                <span className="text-gray-400 text-[10px] uppercase block">Referenced Product</span>
                <strong className="text-white">
                  {enquiry.productName || enquiry.productCode} {enquiry.productCode && `(${enquiry.productCode})`}
                </strong>
              </div>
            </div>
          )}

          {/* Complete Message */}
          <div className="space-y-1.5">
            <h4 className="font-semibold text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
              <span>Enquiry Message</span>
            </h4>
            <div className="p-4 bg-gray-950 border border-gray-800 rounded-lg text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Submitted on: {new Date(enquiry.createdAt).toLocaleString()}</span>
          </div>

          {/* Status Update Bar */}
          <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                  Update Enquiry Status
                </span>
                <p className="text-[11px] text-gray-400">
                  Current status: <strong className="text-[#C6A15B]">{ENQUIRY_STATUS_LABELS[enquiry.status]}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as EnquiryStatus)}
                  className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  type="button"
                  onClick={handleSaveStatus}
                  disabled={isUpdating || selectedStatus === enquiry.status}
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

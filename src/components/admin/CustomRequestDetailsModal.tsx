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
  Image as ImageIcon,
  ZoomIn,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
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
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (request) {
      setSelectedStatus(request.status);
      setStatusMessage(null);
      setEnlargedImageIndex(null);
    }
  }, [request]);

  // Handle escape key to close enlarged image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargedImageIndex !== null) {
        setEnlargedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedImageIndex]);

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

          {/* Customer Reference Sketches & Inspiration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#C6A15B]" />
                <span>Customer Reference Sketches & Inspiration</span>
              </h4>
              {request.referenceImages && request.referenceImages.length > 0 && (
                <span className="text-[10px] text-gray-400 font-mono">
                  {request.referenceImages.length} attached {request.referenceImages.length === 1 ? 'image' : 'images'}
                </span>
              )}
            </div>

            {request.referenceImages && request.referenceImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-gray-950 border border-gray-800 rounded-lg">
                {request.referenceImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-lg overflow-hidden border border-gray-800 bg-gray-900 aspect-square flex flex-col justify-between"
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={imgUrl}
                      alt={`Reference sketch ${idx + 1} for ${request.customerName}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                      onClick={() => setEnlargedImageIndex(idx)}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.img-error-fallback');
                        if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                      }}
                    />

                    {/* Broken image fallback */}
                    <div className="img-error-fallback hidden absolute inset-0 bg-gray-900 flex flex-col items-center justify-center p-3 text-center text-gray-400">
                      <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />
                      <span className="text-[10px]">Image could not be rendered</span>
                    </div>

                    {/* Reference Index Badge */}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 border border-gray-700 text-[9px] font-mono text-gray-300 backdrop-blur-xs">
                      Sketch #{idx + 1}
                    </span>

                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        type="button"
                        onClick={() => setEnlargedImageIndex(idx)}
                        className="p-2 bg-[#C6A15B] text-gray-950 rounded-full hover:bg-[#DFBA73] transition-transform hover:scale-110 shadow-lg cursor-pointer"
                        title="Enlarge Reference"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const win = window.open();
                          if (win) {
                            win.document.write(`<iframe src="${imgUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                          }
                        }}
                        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-transform hover:scale-110 shadow-lg cursor-pointer border border-gray-600"
                        title="Open in Full Window"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-gray-950 border border-gray-800 rounded-lg text-gray-500 text-xs text-center flex items-center justify-center gap-2 font-light">
                <ImageIcon className="w-4 h-4 text-gray-600" />
                <span>No reference sketches or images were attached with this request.</span>
              </div>
            )}
          </div>

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

      {/* Lightbox Enlarged Viewer */}
      {enlargedImageIndex !== null && request.referenceImages && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setEnlargedImageIndex(null)}
        >
          {/* Lightbox Header Bar */}
          <div
            className="flex items-center justify-between w-full max-w-5xl mx-auto py-2 px-4 bg-gray-900/80 border border-gray-800 rounded-lg text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#C6A15B]" />
              <span className="text-xs font-semibold">
                Reference Sketch {enlargedImageIndex + 1} of {request.referenceImages.length}
              </span>
              <span className="text-[10px] text-gray-400 hidden sm:inline">
                ({request.customerName} - {request.jewelleryType})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={request.referenceImages[enlargedImageIndex]}
                download={`zeenath-sketch-${request.customerName.replace(/\s+/g, '-').toLowerCase()}-${enlargedImageIndex + 1}.webp`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs rounded transition-colors"
                title="Download Sketch"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const win = window.open();
                  if (win) {
                    win.document.write(`<iframe src="${request.referenceImages![enlargedImageIndex]}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs rounded transition-colors"
                title="Open in Full Window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Resolution</span>
              </button>

              <button
                type="button"
                onClick={() => setEnlargedImageIndex(null)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors cursor-pointer ml-2"
                title="Close Viewer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image & Navigation */}
          <div
            className="flex-1 flex items-center justify-center relative my-4 max-w-5xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {request.referenceImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setEnlargedImageIndex((prev) =>
                    prev !== null ? (prev - 1 + request.referenceImages!.length) % request.referenceImages!.length : 0
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-[#C6A15B] hover:text-gray-950 text-white border border-gray-700 transition-all cursor-pointer"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <img
              src={request.referenceImages[enlargedImageIndex]}
              alt={`Enlarged reference sketch ${enlargedImageIndex + 1}`}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-lg border border-[#C6A15B]/30 shadow-2xl bg-black"
            />

            {request.referenceImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setEnlargedImageIndex((prev) =>
                    prev !== null ? (prev + 1) % request.referenceImages!.length : 0
                  )
                }
                className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-[#C6A15B] hover:text-gray-950 text-white border border-gray-700 transition-all cursor-pointer"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Lightbox Footer Note */}
          <div className="text-center text-[11px] text-gray-500 font-mono">
            Press Esc or click anywhere outside to close
          </div>
        </div>
      )}
    </div>
  );
};

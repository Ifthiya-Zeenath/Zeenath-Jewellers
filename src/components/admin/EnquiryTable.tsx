import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  ExternalLink,
  MessageSquareX,
} from 'lucide-react';
import type { FirestoreEnquiry, EnquiryStatus } from '../../services/firestoreService';
import { ENQUIRY_STATUS_LABELS } from '../../services/firestoreService';
import { getCustomerWhatsAppUrl } from '../../constants/businessDetails';

interface EnquiryTableProps {
  enquiries: FirestoreEnquiry[];
  onViewDetails: (enquiry: FirestoreEnquiry) => void;
  onDelete: (enquiry: FirestoreEnquiry) => void;
  onChangeStatus: (enquiry: FirestoreEnquiry, newStatus: EnquiryStatus) => void;
  isLoading: boolean;
}

export const EnquiryTable: React.FC<EnquiryTableProps> = ({
  enquiries,
  onViewDetails,
  onDelete,
  onChangeStatus,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Status filter
      if (selectedStatus !== 'All' && item.status !== selectedStatus) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.customerName.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);
        const matchesEmail = item.email ? item.email.toLowerCase().includes(q) : false;
        const matchesMsg = item.message.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesMsg) {
          return false;
        }
      }
      return true;
    });
  }, [enquiries, searchQuery, selectedStatus]);

  if (isLoading) {
    return (
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-mono">
          Loading customer enquiries from Cloud Firestore...
        </p>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return 'text-amber-400 border-amber-800/60 bg-amber-950/40';
      case 'contacted':
        return 'text-blue-400 border-blue-800/60 bg-blue-950/40';
      case 'resolved':
        return 'text-emerald-400 border-emerald-800/60 bg-emerald-950/40';
      case 'cancelled':
        return 'text-red-400 border-red-800/60 bg-red-950/40';
      default:
        return 'text-gray-400 border-gray-800 bg-gray-900';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone, email, or message text..."
            className="w-full bg-gray-900 border border-gray-800 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 hidden sm:inline" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#C6A15B]"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            <option value="new">New ({enquiries.filter((e) => e.status === 'new').length})</option>
            <option value="contacted">Contacted ({enquiries.filter((e) => e.status === 'contacted').length})</option>
            <option value="resolved">Resolved ({enquiries.filter((e) => e.status === 'resolved').length})</option>
            <option value="cancelled">Cancelled ({enquiries.filter((e) => e.status === 'cancelled').length})</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      {filteredEnquiries.length > 0 ? (
        <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Contact Phone</th>
                  <th className="px-4 py-3 font-semibold">Message Preview</th>
                  <th className="px-4 py-3 font-semibold">Submitted Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredEnquiries.map((item) => {
                  const whatsappUrl = getCustomerWhatsAppUrl(
                    item.phone,
                    item.customerName,
                    item.productName || 'enquiry'
                  );

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-900/50 transition-colors group"
                    >
                      {/* Customer Info */}
                      <td className="px-4 py-3">
                        <div className="space-y-0.5 max-w-[180px]">
                          <span className="font-semibold text-white block truncate">
                            {item.customerName}
                          </span>
                          <span className="text-[10px] text-gray-500 block truncate">
                            {item.email || 'No Email Provided'}
                          </span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3 font-mono text-gray-300 font-medium">
                        {item.phone}
                      </td>

                      {/* Message Preview */}
                      <td className="px-4 py-3">
                        <p className="text-gray-300 max-w-[280px] sm:max-w-[340px] truncate font-light">
                          {item.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-gray-400 text-[11px] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            onChangeStatus(item, e.target.value as EnquiryStatus)
                          }
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border cursor-pointer focus:outline-none ${getStatusBadgeStyle(
                            item.status
                          )}`}
                        >
                          {Object.entries(ENQUIRY_STATUS_LABELS).map(([val, label]) => (
                            <option key={val} value={val} className="bg-gray-950 text-white">
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Action */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 rounded transition-colors"
                            title="Contact Customer on WhatsApp"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* View Details */}
                          <button
                            onClick={() => onViewDetails(item)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 rounded transition-colors cursor-pointer"
                            title="View Complete Enquiry Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => onDelete(item)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded transition-colors cursor-pointer"
                            title="Delete Customer Enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800 text-[11px] text-gray-400 flex justify-between items-center">
            <span>
              Showing <strong className="text-white">{filteredEnquiries.length}</strong> of{' '}
              {enquiries.length} enquiries
            </span>
            <span className="font-mono text-gray-500">
              Firestore collection: enquiries
            </span>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
            <MessageSquareX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              No Customer Enquiries Found
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchQuery || selectedStatus !== 'All'
                ? 'No enquiry matches your active search or status filter. Try resetting your filter criteria.'
                : 'There are currently no customer enquiries in Cloud Firestore.'}
            </p>
          </div>
          {(searchQuery || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('All');
              }}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded uppercase font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

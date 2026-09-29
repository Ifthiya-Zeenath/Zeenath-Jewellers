import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  ExternalLink,
  MessageSquareX,
  Gem,
} from 'lucide-react';
import type { FirestoreCustomRequest, CustomRequestStatus } from '../../services/firestoreService';
import { CUSTOM_REQUEST_STATUS_LABELS } from '../../services/firestoreService';
import { getCustomerWhatsAppUrl } from '../../constants/businessDetails';

interface CustomRequestTableProps {
  requests: FirestoreCustomRequest[];
  onViewDetails: (request: FirestoreCustomRequest) => void;
  onDelete: (request: FirestoreCustomRequest) => void;
  onChangeStatus: (request: FirestoreCustomRequest, newStatus: CustomRequestStatus) => void;
  isLoading: boolean;
}

export const CustomRequestTable: React.FC<CustomRequestTableProps> = ({
  requests,
  onViewDetails,
  onDelete,
  onChangeStatus,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Status filter
      if (selectedStatus !== 'All' && req.status !== selectedStatus) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = req.customerName.toLowerCase().includes(q);
        const matchesPhone = req.phone.toLowerCase().includes(q);
        const matchesEmail = req.email.toLowerCase().includes(q);
        const matchesType = req.jewelleryType.toLowerCase().includes(q);
        const matchesMetal = req.metalType.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesType && !matchesMetal) {
          return false;
        }
      }
      return true;
    });
  }, [requests, searchQuery, selectedStatus]);

  if (isLoading) {
    return (
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-mono">
          Loading custom requests from Cloud Firestore...
        </p>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: CustomRequestStatus) => {
    switch (status) {
      case 'pending':
        return 'text-amber-400 border-amber-800/60 bg-amber-950/40';
      case 'contacted':
        return 'text-blue-400 border-blue-800/60 bg-blue-950/40';
      case 'in_progress':
        return 'text-purple-400 border-purple-800/60 bg-purple-950/40';
      case 'completed':
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
            placeholder="Search by customer name, phone, email, or jewellery type..."
            className="w-full bg-gray-900 border border-gray-800 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 hidden sm:inline" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#C6A15B]"
          >
            <option value="All">All Statuses ({requests.length})</option>
            <option value="pending">Pending ({requests.filter((r) => r.status === 'pending').length})</option>
            <option value="contacted">Contacted ({requests.filter((r) => r.status === 'contacted').length})</option>
            <option value="in_progress">In Progress ({requests.filter((r) => r.status === 'in_progress').length})</option>
            <option value="completed">Completed ({requests.filter((r) => r.status === 'completed').length})</option>
            <option value="cancelled">Cancelled ({requests.filter((r) => r.status === 'cancelled').length})</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length > 0 ? (
        <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Jewellery / Metal</th>
                  <th className="px-4 py-3 font-semibold">Budget Range</th>
                  <th className="px-4 py-3 font-semibold">Submitted Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredRequests.map((req) => {
                  const whatsappUrl = getCustomerWhatsAppUrl(
                    req.phone,
                    req.customerName,
                    req.jewelleryType
                  );

                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-gray-900/50 transition-colors group"
                    >
                      {/* Customer Info */}
                      <td className="px-4 py-3">
                        <div className="space-y-0.5 max-w-[200px]">
                          <span className="font-semibold text-white block truncate">
                            {req.customerName}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400">
                            <span>{req.phone}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 block truncate">
                            {req.email}
                          </span>
                        </div>
                      </td>

                      {/* Jewellery & Metal Type */}
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <span className="font-medium text-[#C6A15B] flex items-center gap-1">
                            <Gem className="w-3 h-3 shrink-0" />
                            {req.jewelleryType}
                          </span>
                          <span className="text-[10px] text-gray-400 block">
                            {req.metalType}
                          </span>
                        </div>
                      </td>

                      {/* Budget & Target Date */}
                      <td className="px-4 py-3 space-y-0.5">
                        <div className="text-gray-200 font-medium">{req.budgetRange}</div>
                        <div className="text-gray-500 text-[10px]">
                          Target: {req.preferredCompletionDate || 'Flexible'}
                        </div>
                      </td>

                      {/* Submitted Date */}
                      <td className="px-4 py-3 text-gray-400 text-[11px] whitespace-nowrap">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-3">
                        <select
                          value={req.status}
                          onChange={(e) =>
                            onChangeStatus(req, e.target.value as CustomRequestStatus)
                          }
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border cursor-pointer focus:outline-none ${getStatusBadgeStyle(
                            req.status
                          )}`}
                        >
                          {Object.entries(CUSTOM_REQUEST_STATUS_LABELS).map(([val, label]) => (
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

                          {/* View Details Modal */}
                          <button
                            onClick={() => onViewDetails(req)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 rounded transition-colors cursor-pointer"
                            title="View Complete Request Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Action */}
                          <button
                            onClick={() => onDelete(req)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded transition-colors cursor-pointer"
                            title="Delete Custom Request"
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
              Showing <strong className="text-white">{filteredRequests.length}</strong> of{' '}
              {requests.length} requests
            </span>
            <span className="font-mono text-gray-500">
              Firestore collection: customRequests
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
              No Custom Requests Found
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchQuery || selectedStatus !== 'All'
                ? 'No request matches your active filter parameters. Try clearing your search filters.'
                : 'There are currently no custom jewellery requests in Cloud Firestore.'}
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

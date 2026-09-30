import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  MessageSquare,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Tag,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getFirestoreProducts,
  getEnquiries,
  getCustomRequests,
  getCategories,
  ENQUIRY_STATUS_LABELS,
  CUSTOM_REQUEST_STATUS_LABELS,
} from '../../services/firestoreService';
import type {
  FirestoreProduct,
  FirestoreEnquiry,
  FirestoreCustomRequest,
  FirestoreCategory,
  EnquiryStatus,
  CustomRequestStatus,
} from '../../services/firestoreService';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Data states
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [enquiries, setEnquiries] = useState<FirestoreEnquiry[]>([]);
  const [customRequests, setCustomRequests] = useState<FirestoreCustomRequest[]>([]);
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all dashboard metrics from Firestore cleanly in parallel
  const loadDashboardData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [prodsData, enquiriesData, requestsData, categoriesData] = await Promise.all([
        getFirestoreProducts(),
        getEnquiries(),
        getCustomRequests(),
        getCategories(),
      ]);

      setProducts(prodsData);
      setEnquiries(enquiriesData);
      setCustomRequests(requestsData);
      setCategories(categoriesData);
    } catch (err: unknown) {
      console.error('Failed to load dashboard data from Firestore:', err);
      const msg =
        err instanceof Error ? err.message : 'An error occurred while connecting to Firestore.';
      setError(`Dashboard Data Fetch Error: ${msg}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Client-side statistics calculations from real Firestore collections
  const totalProductsCount = products.length;
  const availableProductsCount = products.filter((p) => p.availability === 'In Stock').length;
  const unavailableProductsCount = products.filter((p) => p.availability !== 'In Stock').length;
  const featuredProductsCount = products.filter((p) => p.featured).length;

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const pendingRequestsCount = customRequests.filter((r) => r.status === 'pending').length;
  const totalCategoriesCount = categories.length;

  // Format date strings safely for UI display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Status Badge Helper for Customer Enquiries
  const getEnquiryStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return 'bg-sky-950/80 text-sky-400 border-sky-800/60';
      case 'contacted':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'resolved':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
      case 'cancelled':
        return 'bg-gray-900 text-gray-400 border-gray-800';
      default:
        return 'bg-gray-900 text-gray-400 border-gray-800';
    }
  };

  // Status Badge Helper for Custom Requests
  const getCustomRequestStatusBadge = (status: CustomRequestStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'contacted':
        return 'bg-blue-950/80 text-blue-400 border-blue-800/60';
      case 'in_progress':
        return 'bg-purple-950/80 text-purple-400 border-purple-800/60';
      case 'completed':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
      case 'cancelled':
        return 'bg-gray-900 text-gray-400 border-gray-800';
      default:
        return 'bg-gray-900 text-gray-400 border-gray-800';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header & Welcome Banner */}
      <div className="bg-gray-950 border border-[#C6A15B]/30 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#C6A15B] uppercase tracking-widest font-bold">
            <UserCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Admin Console Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Signed in as: <strong className="text-white">{user?.email || 'Admin User'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-900/90 border border-gray-800 text-xs text-gray-300 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
            <span>Firebase Security Guard</span>
          </div>

          <button
            onClick={() => loadDashboardData(true)}
            disabled={isLoading || isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-[#C6A15B] hover:text-white border border-[#C6A15B]/30 hover:border-[#C6A15B] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
            title="Refresh latest data from Cloud Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>

      {/* Error Alert Banner */}
      {error && (
        <div className="bg-red-950/80 border border-red-800/80 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadDashboardData()}
            className="underline font-semibold hover:text-white cursor-pointer whitespace-nowrap"
          >
            Retry
          </button>
        </div>
      )}

      {/* 2. Key Metrics & Statistics Cards */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
          Catalogue & Activity Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Card 1: Total Products */}
          <div className="bg-gray-950 border border-gray-800 hover:border-[#C6A15B]/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Total Products
              </span>
              <div className="p-2 bg-[#C6A15B]/10 rounded-lg text-[#C6A15B]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-white tracking-tight">{totalProductsCount}</p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">
                {totalCategoriesCount} Categories active
              </p>
            </div>
          </div>

          {/* Card 2: Available Products */}
          <div className="bg-gray-950 border border-gray-800 hover:border-emerald-800/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                In Stock
              </span>
              <div className="p-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-emerald-400 tracking-tight">
                  {availableProductsCount}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">Available for order</p>
            </div>
          </div>

          {/* Card 3: Unavailable Products */}
          <div className="bg-gray-950 border border-gray-800 hover:border-rose-800/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Unavailable
              </span>
              <div className="p-2 bg-rose-950/80 text-rose-400 border border-rose-800/50 rounded-lg">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-rose-400 tracking-tight">
                  {unavailableProductsCount}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">Custom or limited</p>
            </div>
          </div>

          {/* Card 4: Featured Products */}
          <div className="bg-gray-950 border border-gray-800 hover:border-amber-800/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Featured Items
              </span>
              <div className="p-2 bg-amber-950/80 text-amber-400 border border-amber-800/50 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-amber-400 tracking-tight">
                  {featuredProductsCount}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">Showcased items</p>
            </div>
          </div>

          {/* Card 5: New Customer Enquiries */}
          <div className="bg-gray-950 border border-gray-800 hover:border-sky-800/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                New Enquiries
              </span>
              <div className="p-2 bg-sky-950/80 text-sky-400 border border-sky-800/50 rounded-lg">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-sky-400 tracking-tight">
                  {newEnquiriesCount}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">
                {enquiries.length} total messages
              </p>
            </div>
          </div>

          {/* Card 6: Pending Custom Requests */}
          <div className="bg-gray-950 border border-gray-800 hover:border-purple-800/50 p-4 rounded-xl space-y-3 transition-all shadow-md group">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                Pending Requests
              </span>
              <div className="p-2 bg-purple-950/80 text-purple-400 border border-purple-800/50 rounded-lg">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="h-7 w-16 bg-gray-800 animate-pulse rounded" />
              ) : (
                <p className="text-2xl font-bold text-purple-400 tracking-tight">
                  {pendingRequestsCount}
                </p>
              )}
              <p className="text-[11px] text-gray-400 mt-1 font-mono">
                {customRequests.length} custom orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions Toolbar */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase font-bold text-gray-400 tracking-wider">
          Management Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            to="/admin/products"
            className="flex items-center justify-between p-3.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-[#C6A15B] rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                Add Product
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center justify-between p-3.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-[#C6A15B] rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                Manage Products
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center justify-between p-3.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-[#C6A15B] rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                Manage Categories
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/admin/enquiries"
            className="flex items-center justify-between p-3.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-[#C6A15B] rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                View Enquiries
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/admin/custom-requests"
            className="flex items-center justify-between p-3.5 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-[#C6A15B] rounded-xl transition-all group cursor-pointer col-span-2 sm:col-span-1"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C6A15B] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                Custom Requests
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#C6A15B] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>

      {/* 4. Recent Data Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel A: Recent Customer Enquiries */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-sky-950/60 border border-sky-800/50 rounded-lg">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Recent Customer Enquiries
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Latest 5 customer messages from public site
                  </p>
                </div>
              </div>

              <Link
                to="/admin/enquiries"
                className="flex items-center gap-1 text-xs text-[#C6A15B] hover:text-white font-semibold transition-colors uppercase tracking-wider"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List Content */}
            {isLoading ? (
              <div className="space-y-3 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-900 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : enquiries.length > 0 ? (
              <div className="divide-y divide-gray-800/80">
                {enquiries.slice(0, 5).map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-gray-900/40 px-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white truncate">
                          {enquiry.customerName}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getEnquiryStatusBadge(
                            enquiry.status
                          )}`}
                        >
                          {ENQUIRY_STATUS_LABELS[enquiry.status] || enquiry.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1 italic">
                        "{enquiry.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <MessageSquare className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-400 font-medium">No customer enquiries received yet.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-900 text-right">
            <Link
              to="/admin/enquiries"
              className="text-xs text-gray-400 hover:text-[#C6A15B] transition-colors"
            >
              Go to Enquiry Management &rarr;
            </Link>
          </div>
        </div>

        {/* Panel B: Recent Custom Jewellery Requests */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-950/60 border border-purple-800/50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Recent Custom Requests
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Latest 5 bespoke jewellery commission requests
                  </p>
                </div>
              </div>

              <Link
                to="/admin/custom-requests"
                className="flex items-center gap-1 text-xs text-[#C6A15B] hover:text-white font-semibold transition-colors uppercase tracking-wider"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List Content */}
            {isLoading ? (
              <div className="space-y-3 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-900 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : customRequests.length > 0 ? (
              <div className="divide-y divide-gray-800/80">
                {customRequests.slice(0, 5).map((request) => (
                  <div
                    key={request.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-gray-900/40 px-2 rounded-lg transition-colors"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-white truncate">
                          {request.customerName}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getCustomRequestStatusBadge(
                            request.status
                          )}`}
                        >
                          {CUSTOM_REQUEST_STATUS_LABELS[request.status] || request.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400">
                        <span className="text-[#C6A15B] font-medium flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#C6A15B]" />
                          {request.jewelleryType}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-gray-300">
                          {request.budgetRange}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-400 font-medium">No custom jewellery requests submitted yet.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-900 text-right">
            <Link
              to="/admin/custom-requests"
              className="text-xs text-gray-400 hover:text-[#C6A15B] transition-colors"
            >
              Go to Custom Requests &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

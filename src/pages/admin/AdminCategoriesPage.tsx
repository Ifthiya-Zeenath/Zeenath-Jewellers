import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Layers,
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  PackageX,
  Check,
  X as XIcon,
} from 'lucide-react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getFirestoreProducts,
} from '../../services/firestoreService';
import type { FirestoreCategory, FirestoreProduct } from '../../services/firestoreService';
import { CategoryFormModal } from '../../components/admin/CategoryFormModal';
import { DeleteCategoryConfirmModal } from '../../components/admin/DeleteCategoryConfirmModal';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<FirestoreCategory[]>([]);
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<FirestoreCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<FirestoreCategory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        getCategories(),
        getFirestoreProducts().catch(() => []),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch categories';
      showNotification('error', `Firestore Read Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute product counts by category name
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.category) {
        const key = p.category.trim().toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Search Filtered Categories
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase().trim();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categories, searchQuery]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (cat: FirestoreCategory) => {
    setEditingCategory(cat);
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (formData: {
    name: string;
    description?: string;
    active?: boolean;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true);
    try {
      if (editingCategory?.id) {
        const res = await updateCategory(editingCategory.id, formData);
        if (res.success) {
          showNotification('success', `Category "${formData.name}" updated successfully.`);
          await loadData();
          return { success: true };
        } else {
          showNotification('error', res.error || 'Failed to update category.');
          return { success: false, error: res.error };
        }
      } else {
        const res = await addCategory(formData);
        if (res.success) {
          showNotification('success', `Category "${formData.name}" created successfully.`);
          await loadData();
          return { success: true };
        } else {
          showNotification('error', res.error || 'Failed to create category.');
          return { success: false, error: res.error };
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      showNotification('error', msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingCategory?.id) return;
    setIsDeleting(true);
    try {
      const res = await deleteCategory(deletingCategory.id);
      if (res.success) {
        showNotification(
          'success',
          `Category "${deletingCategory.name}" deleted successfully.`
        );
        setDeletingCategory(null);
        await loadData();
      } else {
        showNotification('error', res.error || 'Failed to delete category.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion error';
      showNotification('error', msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleActive = async (cat: FirestoreCategory) => {
    const updatedActive = !cat.active;
    // Optimistic update
    setCategories((prev) =>
      prev.map((c) => (c.id === cat.id ? { ...c, active: updatedActive } : c))
    );

    const res = await updateCategory(cat.id, { active: updatedActive });
    if (res.success) {
      showNotification(
        'success',
        `Category "${cat.name}" is now ${updatedActive ? 'Active' : 'Inactive'}.`
      );
    } else {
      // Revert optimistic update
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, active: cat.active } : c))
      );
      showNotification('error', res.error || 'Failed to update category status.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#C6A15B]" />
            <h1 className="text-2xl font-serif-luxury font-bold text-white">
              Category Management
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Organize gold jewellery catalog categories and storefront filter options.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            title="Refresh category list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#C6A15B] hover:bg-[#A88645] text-gray-950 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
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

      {/* Search Bar */}
      <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg flex items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or description..."
            className="w-full bg-gray-900 border border-gray-800 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
          />
        </div>
      </div>

      {/* Category List Table */}
      {isLoading ? (
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-400 font-mono">Loading categories from Cloud Firestore...</p>
        </div>
      ) : filteredCategories.length > 0 ? (
        <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Category Name</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold text-center">Status</th>
                  <th className="px-4 py-3 font-semibold text-center">Products Linked</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredCategories.map((cat) => {
                  const pCount = productCounts[cat.name.trim().toLowerCase()] || 0;
                  const isActive = cat.active !== false;

                  return (
                    <tr
                      key={cat.id}
                      className="hover:bg-gray-900/50 transition-colors group"
                    >
                      {/* Name */}
                      <td className="px-4 py-3 font-semibold text-white">
                        {cat.name}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {cat.description || <span className="text-gray-600 italic">No description provided</span>}
                      </td>

                      {/* Status Toggle Badge */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggleActive(cat)}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-all cursor-pointer ${
                            isActive
                              ? 'text-emerald-400 border-emerald-800/60 bg-emerald-950/40 hover:bg-emerald-900/60'
                              : 'text-gray-400 border-gray-800 bg-gray-900 hover:bg-gray-800'
                          }`}
                          title="Click to toggle category status"
                        >
                          {isActive ? <Check className="w-3 h-3 text-emerald-400" /> : <XIcon className="w-3 h-3 text-gray-500" />}
                          <span>{isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      {/* Product Count Badge */}
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block px-2.5 py-0.5 bg-gray-900 border border-gray-800 rounded font-mono font-semibold text-[#C6A15B] text-xs">
                          {pCount} Products
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(cat)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 rounded transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingCategory(cat)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded transition-colors cursor-pointer"
                            title="Delete Category"
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
              Showing <strong className="text-white">{filteredCategories.length}</strong> of{' '}
              {categories.length} categories
            </span>
            <span className="font-mono text-gray-500">
              Firestore collection: categories
            </span>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-500">
            <PackageX className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              No Categories Found
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchQuery
                ? `No category matched "${searchQuery}". Try clearing your search query.`
                : 'There are currently no categories in Cloud Firestore. Click "Add New Category" to create one.'}
            </p>
          </div>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded uppercase font-semibold cursor-pointer"
            >
              Reset Search
            </button>
          ) : (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-[#C6A15B] text-gray-950 rounded text-xs font-bold uppercase tracking-wider shadow cursor-pointer hover:bg-[#A88645]"
            >
              Add First Category
            </button>
          )}
        </div>
      )}

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingCategory}
        existingCategories={categories}
        isSubmitting={isSubmitting}
      />

      {/* Delete Category Confirmation Modal */}
      <DeleteCategoryConfirmModal
        isOpen={Boolean(deletingCategory)}
        category={deletingCategory}
        products={products}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

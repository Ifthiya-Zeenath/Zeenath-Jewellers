import React, { useState, useEffect, useCallback } from 'react';
import { Package, Plus, RefreshCw, CheckCircle2, AlertCircle, Database } from 'lucide-react';
import {
  getFirestoreProducts,
  addFirestoreProduct,
  updateFirestoreProduct,
  deleteFirestoreProduct,
} from '../../services/firestoreService';
import type { FirestoreProduct } from '../../services/firestoreService';
import { MOCK_PRODUCTS } from '../../data/products';
import type { ProductAvailability } from '../../data/products';
import { ProductTable } from '../../components/admin/ProductTable';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<FirestoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<FirestoreProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<FirestoreProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // User Notification Feedback Toast
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

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFirestoreProducts();
      setProducts(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch products';
      showNotification('error', `Firestore Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handler: Open Add Product Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Handler: Open Edit Product Modal
  const handleOpenEditModal = (product: FirestoreProduct) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // Handler: Submit Create or Edit Form
  const handleSubmitForm = async (
    formData: Omit<FirestoreProduct, 'id' | 'createdAt'>
  ): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true);
    try {
      if (editingProduct?.id) {
        // Update existing product
        const res = await updateFirestoreProduct(editingProduct.id, formData);
        if (res.success) {
          showNotification('success', `Product "${formData.name}" updated successfully.`);
          await loadProducts();
          return { success: true };
        } else {
          showNotification('error', res.error || 'Failed to update product.');
          return { success: false, error: res.error || 'Failed to update product.' };
        }
      } else {
        // Add new product
        const res = await addFirestoreProduct(formData);
        if (res.success) {
          showNotification('success', `Product "${formData.name}" created successfully.`);
          await loadProducts();
          return { success: true };
        } else {
          showNotification('error', res.error || 'Failed to create product.');
          return { success: false, error: res.error || 'Failed to create product.' };
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected Firestore error';
      showNotification('error', msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler: Confirm Delete Product
  const handleConfirmDelete = async () => {
    if (!deletingProduct?.id) return;
    setIsDeleting(true);
    try {
      const res = await deleteFirestoreProduct(deletingProduct.id);
      if (res.success) {
        showNotification('success', `Product "${deletingProduct.name}" deleted from database.`);
        setDeletingProduct(null);
        await loadProducts();
      } else {
        showNotification('error', res.error || 'Failed to delete product.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion error';
      showNotification('error', msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handler: Toggle Featured Status
  const handleToggleFeatured = async (product: FirestoreProduct) => {
    const updatedFeatured = !product.featured;
    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, featured: updatedFeatured } : p))
    );

    const res = await updateFirestoreProduct(product.id, { featured: updatedFeatured });
    if (res.success) {
      showNotification(
        'success',
        `Product "${product.name}" is now ${updatedFeatured ? 'Featured' : 'Unfeatured'}.`
      );
    } else {
      // Revert optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, featured: product.featured } : p))
      );
      showNotification('error', res.error || 'Failed to toggle featured status.');
    }
  };

  // Handler: Quick Change Availability
  const handleChangeAvailability = async (
    product: FirestoreProduct,
    newAvailability: ProductAvailability
  ) => {
    if (product.availability === newAvailability) return;

    const oldAvailability = product.availability;
    // Optimistic update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, availability: newAvailability } : p))
    );

    const res = await updateFirestoreProduct(product.id, { availability: newAvailability });
    if (res.success) {
      showNotification(
        'success',
        `Stock status for "${product.name}" updated to ${newAvailability}.`
      );
    } else {
      // Revert
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, availability: oldAvailability } : p))
      );
      showNotification('error', res.error || 'Failed to update availability.');
    }
  };

  // Helper: Seed Initial Mock Products to Firestore (Convenience tool for initial database setup)
  const handleSeedInitialProducts = async () => {
    if (
      !window.confirm(
        'This will copy the initial sample jewellery products into your Cloud Firestore database. Continue?'
      )
    ) {
      return;
    }
    setIsSeeding(true);
    let count = 0;
    try {
      for (const item of MOCK_PRODUCTS) {
        const { id: _, ...payload } = item;
        await addFirestoreProduct(payload);
        count++;
      }
      showNotification('success', `Successfully seeded ${count} products into Cloud Firestore!`);
      await loadProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Seeding failed';
      showNotification('error', `Seeding error: ${msg}`);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action & Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-[#C6A15B]" />
            <h1 className="text-2xl font-serif-luxury font-bold text-white">Product Catalog</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Manage certified gold jewellery listings, prices, availability, and featured items in Cloud Firestore.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={loadProducts}
            disabled={isLoading}
            className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors cursor-pointer"
            title="Refresh product list from Firestore"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {products.length === 0 && !isLoading && (
            <button
              onClick={handleSeedInitialProducts}
              disabled={isSeeding}
              className="flex items-center gap-2 px-3 py-2 bg-amber-950/60 hover:bg-amber-900 border border-amber-800/80 text-amber-300 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              title="Populate Cloud Firestore with sample gold jewellery products"
            >
              <Database className="w-4 h-4" />
              <span>{isSeeding ? 'Seeding...' : 'Seed Sample Catalog'}</span>
            </button>
          )}

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#C6A15B] hover:bg-[#A88645] text-gray-950 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
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

      {/* Product Table Component */}
      <ProductTable
        products={products}
        onEdit={handleOpenEditModal}
        onDelete={(p) => setDeletingProduct(p)}
        onToggleFeatured={handleToggleFeatured}
        onChangeAvailability={handleChangeAvailability}
        isLoading={isLoading}
      />

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingProduct}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

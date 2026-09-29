import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import type { FirestoreProduct } from '../../services/firestoreService';
import { getCategories } from '../../services/firestoreService';
import { CATEGORIES } from '../../data/products';
import type { ProductAvailability } from '../../data/products';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    formData: Omit<FirestoreProduct, 'id' | 'createdAt'>
  ) => Promise<{ success: boolean; error?: string }>;
  initialData?: FirestoreProduct | null;
  isSubmitting: boolean;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [category, setCategory] = useState<string>('Rings');
  const [availableCategories, setAvailableCategories] = useState<string[]>(CATEGORIES);
  const [price, setPrice] = useState<string>('');
  const [purity, setPurity] = useState('22K Hallmarked Gold');
  const [weight, setWeight] = useState('');
  const [availability, setAvailability] = useState<ProductAvailability>('In Stock');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [craftsmanshipNotes, setCraftsmanshipNotes] = useState('');
  const [hallmarkInfo, setHallmarkInfo] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getCategories().then((cats) => {
      if (isMounted && cats.length > 0) {
        const catNames = Array.from(
          new Set([...cats.filter((c) => c.active !== false).map((c) => c.name), ...CATEGORIES])
        );
        setAvailableCategories(catNames);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setProductCode(initialData.productCode || '');
      setCategory(initialData.category || 'Rings');
      setPrice(initialData.price ? String(initialData.price) : '');
      setPurity(initialData.purity || '22K Hallmarked Gold');
      setWeight(initialData.weight || '');
      setAvailability(initialData.availability || 'In Stock');
      setFeatured(Boolean(initialData.featured));
      setImage(initialData.image || '');
      setDescription(initialData.description || '');
      setCraftsmanshipNotes(initialData.craftsmanshipNotes || '');
      setHallmarkInfo(initialData.hallmarkInfo || '');
    } else {
      // Reset defaults for Add Product
      setName('');
      setProductCode('');
      setCategory('Rings');
      setPrice('');
      setPurity('22K Hallmarked Gold');
      setWeight('');
      setAvailability('In Stock');
      setFeatured(false);
      setImage('');
      setDescription('');
      setCraftsmanshipNotes('');
      setHallmarkInfo('');
    }
    setFormError(null);
    setImageError(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!name.trim()) {
      setFormError('Product Name is required.');
      return;
    }
    if (!productCode.trim()) {
      setFormError('Product Code is required.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setFormError('Valid Product Price (LKR) is required.');
      return;
    }
    if (!purity.trim()) {
      setFormError('Gold Purity details are required.');
      return;
    }
    if (!weight.trim()) {
      setFormError('Approximate Gold Weight is required.');
      return;
    }
    if (!image.trim()) {
      setFormError('Image URL is required.');
      return;
    }
    if (!description.trim()) {
      setFormError('Product Description is required.');
      return;
    }

    const payload: Omit<FirestoreProduct, 'id' | 'createdAt'> = {
      name: name.trim(),
      productCode: productCode.trim().toUpperCase(),
      category,
      price: Number(price),
      purity: purity.trim(),
      weight: weight.trim(),
      availability,
      featured,
      image: image.trim(),
      description: description.trim(),
      ...(craftsmanshipNotes.trim() ? { craftsmanshipNotes: craftsmanshipNotes.trim() } : {}),
      ...(hallmarkInfo.trim() ? { hallmarkInfo: hallmarkInfo.trim() } : {}),
    };

    const res = await onSubmit(payload);
    if (res.success) {
      onClose();
    } else {
      setFormError(res.error || 'Failed to save product in Firestore.');
    }
  };

  const isEdit = Boolean(initialData?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C6A15B]" />
            <h2 className="text-lg font-serif-luxury font-bold text-white">
              {isEdit ? `Edit Product: ${initialData?.productCode}` : 'Add New Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {formError && (
            <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 rounded text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zeenath Sovereign Solitaire Ring"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Product Code */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Product Code (SKU) *
              </label>
              <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                placeholder="e.g. ZJ-RNG-101"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price in LKR */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Estimated Price (LKR) *
              </label>
              <input
                type="number"
                min="0"
                step="500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 185000"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Purity */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Purity Standard *
              </label>
              <input
                type="text"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
                placeholder="e.g. 22K Hallmarked Gold"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Approx Weight *
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 6.8 Grams (or 1 Sovereign)"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Stock Status *
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as ProductAvailability)}
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="In Stock">In Stock</option>
                <option value="Custom Order">Custom Order</option>
                <option value="Limited Edition">Limited Edition</option>
              </select>
            </div>

            {/* Image URL & Live Preview */}
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Product Image URL *
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageError(false);
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
              <p className="text-[11px] text-gray-400">
                Note: Cloud Storage will be enabled in a future release. Please enter a valid public image URL.
              </p>

              {image.trim() && (
                <div className="flex items-center gap-3 p-3 bg-gray-950 border border-gray-800 rounded">
                  <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded overflow-hidden flex items-center justify-center shrink-0">
                    {!imageError ? (
                      <img
                        src={image}
                        alt="Preview"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-semibold text-gray-300">Live Image Preview</span>
                    <p className={`text-[11px] ${imageError ? 'text-red-400' : 'text-emerald-400'}`}>
                      {imageError ? 'Invalid or unaccessible image URL' : 'Image loaded successfully'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 bg-gray-950 text-[#C6A15B] focus:ring-[#C6A15B]"
              />
              <label htmlFor="featured" className="text-xs text-gray-200 font-semibold cursor-pointer">
                Mark product as Featured on Storefront Home Page
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the jewellery piece..."
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
                required
              />
            </div>

            {/* Craftsmanship Notes */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Craftsmanship & Artisan Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={craftsmanshipNotes}
                onChange={(e) => setCraftsmanshipNotes(e.target.value)}
                placeholder="Details on goldsmith technique, alloy composition, or handcrafting..."
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            {/* Hallmark Info */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Hallmark & Certificate Info (Optional)
              </label>
              <input
                type="text"
                value={hallmarkInfo}
                onChange={(e) => setHallmarkInfo(e.target.value)}
                placeholder="e.g. Stamped with National Assay Office 22K Hallmark Certificate"
                className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#C6A15B] hover:bg-[#A88645] text-gray-950 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEdit ? 'Update Product' : 'Create Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

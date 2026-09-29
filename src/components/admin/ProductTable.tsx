import React, { useState, useMemo } from 'react';
import {
  Edit3,
  Trash2,
  Star,
  Search,
  SlidersHorizontal,
  PackageX,
  ExternalLink,
} from 'lucide-react';
import type { FirestoreProduct } from '../../services/firestoreService';
import { CATEGORIES, formatPrice } from '../../data/products';
import type { ProductAvailability } from '../../data/products';
import { Link } from 'react-router-dom';

interface ProductTableProps {
  products: FirestoreProduct[];
  onEdit: (product: FirestoreProduct) => void;
  onDelete: (product: FirestoreProduct) => void;
  onToggleFeatured: (product: FirestoreProduct) => void;
  onChangeAvailability: (product: FirestoreProduct, newAvailability: ProductAvailability) => void;
  isLoading: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleFeatured,
  onChangeAvailability,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (availabilityFilter !== 'All' && p.availability !== availabilityFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCode = p.productCode.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesPurity = p.purity.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCategory && !matchesPurity) {
          return false;
        }
      }
      return true;
    });
  }, [products, searchQuery, selectedCategory, availabilityFilter]);

  if (isLoading) {
    return (
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-12 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-mono">Loading product inventory from Cloud Firestore...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="bg-gray-950 p-4 border border-gray-800 rounded-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, code, category, or purity..."
            className="w-full bg-gray-900 border border-gray-800 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#C6A15B]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Category Select */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500 hidden sm:inline" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="All">All Categories ({products.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Select */}
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#C6A15B]"
          >
            <option value="All">All Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Custom Order">Custom Order</option>
            <option value="Limited Edition">Limited Edition</option>
          </select>
        </div>
      </div>

      {/* Product List Table / Grid */}
      {filteredProducts.length > 0 ? (
        <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-900/80 border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">SKU / Code</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price (LKR)</th>
                  <th className="px-4 py-3 font-semibold">Purity & Weight</th>
                  <th className="px-4 py-3 font-semibold">Availability</th>
                  <th className="px-4 py-3 font-semibold text-center">Featured</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-900/50 transition-colors group"
                  >
                    {/* Item Name & Image */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-11 h-11 object-cover rounded border border-gray-800 bg-gray-900 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=200&auto=format&fit=crop';
                          }}
                        />
                        <div className="space-y-0.5 max-w-[200px] sm:max-w-[260px]">
                          <span className="font-semibold text-white block truncate hover:text-[#C6A15B]">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-gray-500 line-clamp-1">
                            {product.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SKU Code */}
                    <td className="px-4 py-3 font-mono text-gray-300 font-medium">
                      {product.productCode}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="inline-block bg-gray-900 border border-gray-800 px-2 py-1 rounded text-[10px] text-gray-300">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-serif font-bold text-[#C6A15B]">
                      {formatPrice(product.price)}
                    </td>

                    {/* Purity & Weight */}
                    <td className="px-4 py-3 space-y-0.5 text-[11px]">
                      <div className="text-gray-200 font-medium">{product.purity}</div>
                      <div className="text-gray-500 text-[10px]">{product.weight}</div>
                    </td>

                    {/* Quick Availability Selector */}
                    <td className="px-4 py-3">
                      <select
                        value={product.availability}
                        onChange={(e) =>
                          onChangeAvailability(
                            product,
                            e.target.value as ProductAvailability
                          )
                        }
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border bg-gray-950 cursor-pointer focus:outline-none ${
                          product.availability === 'In Stock'
                            ? 'text-emerald-400 border-emerald-800/60'
                            : product.availability === 'Limited Edition'
                            ? 'text-amber-400 border-amber-800/60'
                            : 'text-stone-300 border-stone-800/60'
                        }`}
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Custom Order">Custom Order</option>
                        <option value="Limited Edition">Limited Edition</option>
                      </select>
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onToggleFeatured(product)}
                        className={`p-1.5 rounded transition-all cursor-pointer ${
                          product.featured
                            ? 'text-[#C6A15B] bg-[#C6A15B]/10 hover:bg-[#C6A15B]/20'
                            : 'text-gray-600 hover:text-gray-400 bg-gray-900'
                        }`}
                        title={
                          product.featured ? 'Featured on homepage' : 'Not featured'
                        }
                      >
                        <Star
                          className={`w-4 h-4 ${
                            product.featured ? 'fill-[#C6A15B]' : ''
                          }`}
                        />
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/product/${product.id}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 rounded transition-colors"
                          title="View product page on public store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => onEdit(product)}
                          className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40 rounded transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(product)}
                          className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800 text-[11px] text-gray-400 flex justify-between items-center">
            <span>
              Showing <strong className="text-white">{filteredProducts.length}</strong> of{' '}
              {products.length} products
            </span>
            <span className="font-mono text-gray-500">Firestore collection: products</span>
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
              No Products Found
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All' || availabilityFilter !== 'All'
                ? 'No product matches your active filter criteria. Try resetting your search filters.'
                : 'There are currently no products in the Cloud Firestore database.'}
            </p>
          </div>
          {(searchQuery || selectedCategory !== 'All' || availabilityFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setAvailabilityFilter('All');
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

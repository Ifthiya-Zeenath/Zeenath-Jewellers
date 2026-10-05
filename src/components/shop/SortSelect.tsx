import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

interface SortSelectProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Featured',
  newest: 'Newest Arrivals',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name: A-Z',
};

export const SortSelect: React.FC<SortSelectProps> = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="shop-sort-select" className="text-xs text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5 text-[#C6A15B]" />
        <span>Sort by:</span>
      </label>
      <select
        id="shop-sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-[#121212] focus:outline-none focus:border-[#C6A15B] hover:border-[#C6A15B] transition-all cursor-pointer shadow-xs"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest Arrivals</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
      </select>
    </div>
  );
};

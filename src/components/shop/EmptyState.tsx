import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery?: string;
  selectedCategory?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  searchQuery,
  selectedCategory,
}) => {
  return (
    <div className="bg-white rounded-xs border border-[#C6A15B]/30 p-12 text-center space-y-6 max-w-lg mx-auto my-12 shadow-2xs">
      <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/30 flex items-center justify-center mx-auto text-[#C6A15B]">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold text-[#121212]">
          No Jewellery Found
        </h3>
        <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
          {searchQuery
            ? `We couldn't find any gold ornaments matching "${searchQuery}"${
                selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''
              }.`
            : selectedCategory !== 'All'
            ? `No jewellery currently listed in the ${selectedCategory} category.`
            : 'No products currently match your selected filters.'}
        </p>
      </div>

      <div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all text-xs font-semibold uppercase tracking-[0.18em] rounded-xs shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Clear All Filters</span>
        </button>
      </div>
    </div>
  );
};

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
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-6 max-w-lg mx-auto my-12 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/30 flex items-center justify-center mx-auto text-[#C6A15B]">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#121212]">
          No pieces found
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
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
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.18em] rounded-full shadow-md cursor-pointer hover:scale-105"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>View All Collections</span>
        </button>
      </div>
    </div>
  );
};

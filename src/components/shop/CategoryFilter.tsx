import React from 'react';
import { CATEGORIES } from '../../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  productCounts?: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  productCounts,
}) => {
  const allCategories = ['All', ...CATEGORIES];

  return (
    <div className="w-full">
      {/* Scrollable Container with touch support and no truncation */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none scroll-smooth whitespace-nowrap -mx-1 px-1">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = productCounts ? productCounts[category] : undefined;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 px-3.5 py-2 rounded-xs text-[11px] sm:text-xs uppercase tracking-[0.14em] font-medium transition-all duration-200 border flex items-center gap-2 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#121212] text-white border-[#121212] shadow-xs'
                  : 'bg-[#FAF8F3] text-[#121212]/80 border-[#C6A15B]/25 hover:border-[#C6A15B] hover:text-[#C6A15B] hover:bg-white'
              }`}
            >
              <span>{category}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#C6A15B] text-white'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

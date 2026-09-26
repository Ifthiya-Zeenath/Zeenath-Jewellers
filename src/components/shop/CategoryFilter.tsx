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
    <div className="w-full overflow-hidden">
      {/* Desktop & Mobile Scrollable Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = productCounts ? productCounts[category] : undefined;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-xs text-xs uppercase tracking-[0.14em] font-medium whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#121212] text-white border-[#121212] shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
              }`}
            >
              <span>{category}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                    isSelected ? 'bg-[#C6A15B] text-white' : 'bg-gray-100 text-gray-500'
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

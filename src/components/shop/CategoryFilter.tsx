import React, { useEffect, useState } from 'react';
import { CATEGORIES } from '../../data/products';
import { getCategories } from '../../services/firestoreService';

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
  const [categoriesList, setCategoriesList] = useState<string[]>(CATEGORIES);

  useEffect(() => {
    let isMounted = true;
    getCategories()
      .then((fsCategories) => {
        if (!isMounted) return;
        const activeCatNames = fsCategories
          .filter((c) => c.active !== false)
          .map((c) => c.name.trim());

        if (activeCatNames.length > 0) {
          const combined = Array.from(new Set([...CATEGORIES, ...activeCatNames]));
          setCategoriesList(combined);
        }
      })
      .catch((err) => {
        console.warn('Could not load categories from Firestore, using static list fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allCategories = ['All', ...categoriesList];

  return (
    <div className="w-full">
      {/* Scrollable Pill Container with hidden scrollbar and mobile touch support */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none scroll-smooth whitespace-nowrap -mx-1 px-1">
        {allCategories.map((category) => {
          const isSelected = selectedCategory === category;
          const count = productCounts ? productCounts[category] : undefined;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 border flex items-center gap-2 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#121212] text-white border-[#121212] shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
              }`}
            >
              <span>{category}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#C6A15B] text-white'
                      : 'bg-gray-100 text-gray-500'
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

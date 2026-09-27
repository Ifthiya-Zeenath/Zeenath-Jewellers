import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { ProductCategory } from '../../data/products';

interface BreadcrumbsProps {
  category?: ProductCategory;
  productName: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productName }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex items-center gap-1.5 flex-wrap text-xs text-gray-500 font-sans tracking-wide">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-600 hover:text-[#C6A15B] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </li>

        <li className="flex items-center gap-1.5">
          <Link
            to="/shop"
            className="text-gray-600 hover:text-[#C6A15B] transition-colors font-medium"
          >
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </li>

        {category && (
          <li className="flex items-center gap-1.5">
            <Link
              to="/shop"
              className="text-gray-600 hover:text-[#C6A15B] transition-colors font-medium"
            >
              {category}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </li>
        )}

        <li className="text-[#121212] font-semibold truncate max-w-[200px] sm:max-w-xs" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
};

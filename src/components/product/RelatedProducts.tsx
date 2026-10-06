import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedProducts } from '../../data/products';
import type { Product } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const relatedList = getRelatedProducts(currentProduct, 4);

  if (relatedList.length === 0) return null;

  return (
    <section className="pt-12 border-t border-gray-200 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-bold block">
            More From This Collection
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#121212]">
            You May Also Admire
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[#C6A15B] hover:text-[#121212] transition-colors flex items-center gap-1.5"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedList.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

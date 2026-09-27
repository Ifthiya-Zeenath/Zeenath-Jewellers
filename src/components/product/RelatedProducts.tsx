import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { getRelatedProducts, formatPrice } from '../../data/products';
import type { Product } from '../../data/products';

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const relatedList = getRelatedProducts(currentProduct, 4);

  if (relatedList.length === 0) return null;

  return (
    <section className="pt-8 border-t border-[#C6A15B]/20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold block">
            You May Also Admire
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
            Related Gold Creations
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[#C6A15B] hover:text-[#121212] transition-colors flex items-center gap-1"
        >
          <span>Explore Entire Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {relatedList.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xs border border-[#C6A15B]/20 overflow-hidden hover:border-[#C6A15B]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square bg-[#FAF8F3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#121212] text-[#C6A15B] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[#C6A15B] font-semibold uppercase">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
                    {item.purity}
                  </span>
                  <span className="text-gray-400 font-normal">{item.weight}</span>
                </div>

                <Link
                  to={`/product/${item.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="block group-hover:text-[#C6A15B] transition-colors"
                >
                  <h3 className="font-serif text-base font-bold text-[#121212] leading-snug line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="pt-1 flex items-baseline justify-between border-t border-gray-100">
                  <span className="font-serif text-base font-bold text-[#121212]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Link
                to={`/product/${item.id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-[11px] font-semibold uppercase tracking-wider rounded-xs text-center"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

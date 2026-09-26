import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { formatPrice } from '../../data/products';
import type { Product } from '../../data/products';
import { getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappMsg = `Hello Zeenath Jewellers, I am interested in ${product.name} (Code: ${product.productCode}). Please share more details and today's gold rate.`;
  const whatsappUrl = getWhatsAppEnquiryUrl(whatsappMsg);

  return (
    <div className="group bg-white rounded-xs border border-[#C6A15B]/20 overflow-hidden hover:border-[#C6A15B]/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative">
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-[4/4] bg-[#FAF8F3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* Category & Availability Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className="bg-[#121212] text-[#C6A15B] text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-xs shadow-xs">
              {product.category}
            </span>
            {product.featured && (
              <span className="bg-[#C6A15B] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-xs shadow-xs inline-flex items-center gap-1 w-fit">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs backdrop-blur-md shadow-xs ${
                product.availability === 'In Stock'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : product.availability === 'Limited Edition'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                  : 'bg-stone-900/80 text-stone-300 border border-stone-500/30'
              }`}
            >
              {product.availability}
            </span>
          </div>

          {/* Code pill */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs pointer-events-none">
            {product.productCode}
          </div>
        </div>

        {/* Product Details Content */}
        <div className="p-5 space-y-3">
          {/* Purity & Weight */}
          <div className="flex items-center justify-between text-[10px] text-[#C6A15B] font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
              {product.purity}
            </span>
            <span className="text-gray-500 font-normal">{product.weight}</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#C6A15B] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#121212] leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="pt-1 flex items-baseline justify-between border-t border-gray-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">Estimated Price</span>
              <span className="font-serif text-lg font-bold text-[#121212]">
                {formatPrice(product.price)}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 italic font-serif">Daily rate sync</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center justify-center gap-1 py-2.5 px-3 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all duration-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs text-center"
        >
          <span>Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all duration-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-2xs"
          title={`Enquire on WhatsApp for ${product.name}`}
        >
          <Phone className="w-3 h-3" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

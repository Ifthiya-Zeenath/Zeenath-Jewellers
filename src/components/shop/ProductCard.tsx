import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../../data/products';
import type { Product } from '../../data/products';
import { getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.image);

  const whatsappMsg = `Hello Zeenath Jewellers, I am interested in ${product.name} (Code: ${product.productCode}). Please share more details and today's gold rate.`;
  const whatsappUrl = getWhatsAppEnquiryUrl(whatsappMsg);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:border-[#C6A15B]/50 shadow-xs hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between relative">
      <div>
        {/* 1. Product Image Container (Apple-Style Clean Focus & Hover Scale) */}
        <div className="relative aspect-[4/3] bg-[#FAF8F3] overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc('/ring-collection.jpg')}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* 2. Category & Availability Badges (Small, Subtle & Clean) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span className="bg-[#121212]/90 backdrop-blur-md text-[#C6A15B] text-[9px] font-bold uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full shadow-2xs">
              {product.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-2xs ${
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
        </div>

        {/* Product Details Section */}
        <div className="p-5 space-y-2.5">
          {/* 4. Gold Purity & Weight */}
          <div className="flex items-center justify-between text-[10px] text-[#C6A15B] font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
              {product.purity}
            </span>
            <span className="text-gray-400 font-normal">{product.weight}</span>
          </div>

          {/* 3. Product Name (Serif Heading) */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#C6A15B] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-medium text-[#121212] leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* 5. Estimated Price & Secondary Product Code */}
          <div className="pt-2 flex items-baseline justify-between border-t border-gray-100">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-medium">Estimated Price</span>
              <span className="font-serif text-base sm:text-lg font-bold text-[#121212]">
                {formatPrice(product.price)}
              </span>
            </div>
            <span className="text-[9px] text-gray-400 font-mono tracking-wider">
              {product.productCode}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center justify-center gap-1 py-2 px-3 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all duration-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-full text-center"
        >
          <span>Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all duration-300 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-2xs"
          title={`Enquire on WhatsApp for ${product.name}`}
        >
          <Phone className="w-3 h-3" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

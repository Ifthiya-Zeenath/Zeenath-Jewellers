import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import type { Product } from '../../data/products';

interface ImageGalleryProps {
  product: Product;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  // Reset selected image when product changes
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    } else {
      setSelectedImage(product.image);
    }
  }, [product]);

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-square bg-[#FAF8F3] rounded-xs border border-[#C6A15B]/30 overflow-hidden shadow-2xs group">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Category & Status Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="bg-[#121212] text-[#C6A15B] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-xs shadow-xs">
            {product.category}
          </span>
          {product.featured && (
            <span className="bg-[#C6A15B] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-xs shadow-xs inline-flex items-center gap-1 w-fit">
              <Sparkles className="w-3 h-3" />
              Featured Masterpiece
            </span>
          )}
        </div>

        {/* Code Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#121212] border border-[#C6A15B]/30 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-xs shadow-2xs">
            {product.productCode}
          </span>
        </div>
      </div>

      {/* Thumbnail Gallery Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative aspect-square w-20 sm:w-22 rounded-xs border overflow-hidden transition-all duration-200 cursor-pointer ${
                selectedImage === img
                  ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/40 shadow-xs'
                  : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-[#C6A15B]/50'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import type { Product } from '../../data/products';

interface ImageGalleryProps {
  product: Product;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ product }) => {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [imgSrc, setImgSrc] = useState<string>(images[0]);

  // Reset selected image when product changes
  useEffect(() => {
    const initialImg = (product.images && product.images.length > 0) ? product.images[0] : product.image;
    setSelectedImage(initialImg);
    setImgSrc(initialImg);
  }, [product]);

  const handleThumbnailClick = (img: string) => {
    setSelectedImage(img);
    setImgSrc(img);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Frame (Hero Focus, Clean Cream/White Presentation) */}
      <div className="relative aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs group">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc('/ring-collection.jpg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#121212]/90 backdrop-blur-md text-[#C6A15B] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs">
            {product.category}
          </span>
        </div>

        {/* Code Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#121212] border border-gray-200 text-[10px] font-mono font-medium uppercase px-3 py-1 rounded-full shadow-2xs">
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
              onClick={() => handleThumbnailClick(img)}
              className={`relative aspect-square w-20 sm:w-22 rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                selectedImage === img
                  ? 'border-[#C6A15B] ring-2 ring-[#C6A15B]/40 shadow-xs'
                  : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-[#C6A15B]/50'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/ring-collection.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

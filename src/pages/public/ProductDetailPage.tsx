import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, ShieldCheck, Tag, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { getProductById, formatPrice } from '../../data/products';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = useMemo(() => {
    if (!id) return undefined;
    return getProductById(id);
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#FAF8F3] border border-[#C6A15B]/30 rounded-full flex items-center justify-center mx-auto text-[#C6A15B]">
          <Tag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-[#121212]">Jewellery Piece Not Found</h2>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            The requested product (ID: {id || 'N/A'}) could not be located in our catalog.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white hover:bg-[#C6A15B] transition-colors text-xs font-semibold uppercase tracking-widest rounded-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop Collection</span>
        </Link>
      </div>
    );
  }

  const whatsappMsg = `Hello Zeenath Jewellers, I am interested in purchasing/enquiring about ${product.name} (Code: ${product.productCode}). Please share available custom weights and today's gold rate.`;
  const whatsappUrl = getWhatsAppEnquiryUrl(whatsappMsg);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb / Back Link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-gray-600 hover:text-[#C6A15B] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 text-[#C6A15B] group-hover:-translate-x-1 transition-transform" />
        <span>Back to Collection</span>
      </Link>

      {/* Main Product Detail Grid */}
      <div className="bg-white rounded-xs border border-[#C6A15B]/25 p-6 sm:p-10 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Product Image Gallery / Media */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/4] bg-[#FAF8F3] rounded-xs border border-[#C6A15B]/20 overflow-hidden shadow-xs group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Category & Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              <span className="bg-[#121212] text-[#C6A15B] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-xs shadow-sm">
                {product.category}
              </span>
              {product.featured && (
                <span className="bg-[#C6A15B] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-xs shadow-sm inline-flex items-center gap-1 w-fit">
                  <Sparkles className="w-3 h-3" />
                  Featured Creation
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 z-10">
              <span className="bg-white/90 backdrop-blur-md text-[#121212] border border-[#C6A15B]/30 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-xs shadow-2xs">
                {product.productCode}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & WhatsApp Enquiry */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Title */}
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#C6A15B] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                {product.purity}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs ${
                  product.availability === 'In Stock'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-100 text-stone-800 border border-stone-300'
                }`}
              >
                {product.availability}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212]">
              {product.name}
            </h1>

            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Estimated Price</span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C6A15B]">
                  {formatPrice(product.price)}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-serif italic">
                Daily gold market sync
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#121212]">
              Product Overview
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Technical Specs Table */}
          <div className="bg-[#FAF8F3] rounded-xs border border-[#C6A15B]/20 p-4 space-y-3 text-xs">
            <h4 className="font-serif font-bold text-[#121212] uppercase tracking-wider border-b border-[#C6A15B]/20 pb-1.5">
              Specifications
            </h4>
            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Product Code</span>
                <strong className="font-mono text-[#121212]">{product.productCode}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Purity Standard</span>
                <strong className="text-[#121212]">{product.purity}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Approx. Weight</span>
                <strong className="text-[#121212]">{product.weight}</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase">Category</span>
                <strong className="text-[#121212]">{product.category}</strong>
              </div>
            </div>
          </div>

          {/* Highlights & Guarantees */}
          <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Certified 22K & 24K Sri Lankan Gold Hallmarking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Custom adjustments & sovereign weights available</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span>Available for inspection at boutique: {BUSINESS_DETAILS.address}</span>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md group"
            >
              <Phone className="w-4 h-4" />
              <span>Enquire via WhatsApp: {BUSINESS_DETAILS.whatsapp}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

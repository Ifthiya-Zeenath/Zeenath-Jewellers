import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Phone, ShieldCheck } from 'lucide-react';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 hover:text-[#C6A15B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop Catalog</span>
      </Link>

      <div className="bg-white rounded-xl border border-[#C6A15B]/30 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Placeholder */}
        <div className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-[#C6A15B]/40 flex flex-col items-center justify-center p-6 text-center">
          <Tag className="w-12 h-12 text-[#C6A15B] mb-2 opacity-60" />
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Product Media Placeholder</p>
          <p className="text-[11px] text-gray-400 mt-1">Item ID: {id || 'N/A'}</p>
        </div>

        {/* Info Placeholder */}
        <div className="space-y-6">
          <div>
            <span className="text-xs text-[#C6A15B] font-semibold tracking-widest uppercase">22K Fine Gold</span>
            <h1 className="font-serif text-3xl font-bold text-[#121212] mt-1">
              Sample Jewellery Item #{id}
            </h1>
            <p className="text-xl font-bold text-[#C6A15B] mt-2">Price on Request / Daily Market Rate</p>
          </div>

          <div className="text-xs text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4 space-y-2">
            <p><strong>Description:</strong> Product details and weight specifications placeholder for route `/product/{id}`.</p>
            <p className="flex items-center gap-2 text-[#121212]">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
              <span>Certified Gold Purity & Hallmarked</span>
            </p>
          </div>

          <a
            href={getWhatsAppEnquiryUrl(`Hello ${BUSINESS_DETAILS.brandName}, I am interested in product ID ${id}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#A88645] transition-colors rounded"
          >
            <Phone className="w-4 h-4" />
            <span>Enquire via WhatsApp ({BUSINESS_DETAILS.whatsapp})</span>
          </a>
        </div>
      </div>
    </div>
  );
};

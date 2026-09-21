import React, { useState } from 'react';
import { Filter, Phone, Sparkles } from 'lucide-react';
import heroBanner from '../../assets/hero-banner.jpg';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Rings',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Bangles',
    'Chains',
    'Pendants',
    'Bridal Jewellery',
    'Jewellery Sets',
  ];

  const sampleProducts = [
    {
      id: '101',
      title: 'Zeenath Signature 22K Gold Bridal Choker',
      category: 'Bridal Jewellery',
      karat: '22K Hallmarked Fine Gold',
      price: 'Market Rate (Enquire for Daily Price)',
    },
    {
      id: '102',
      title: 'Embossed Royal Peacock Gold Bangles',
      category: 'Bangles',
      karat: '22K Hallmarked Gold',
      price: 'Market Rate (Enquire for Daily Price)',
    },
    {
      id: '103',
      title: 'Heritage Diamond-Cut Solitaire Ring',
      category: 'Rings',
      karat: '22K Gold with Gemstone',
      price: 'Market Rate (Enquire for Daily Price)',
    },
    {
      id: '104',
      title: 'Filigree Floral Gold Drop Earrings',
      category: 'Earrings',
      karat: '22K Fine Gold',
      price: 'Market Rate (Enquire for Daily Price)',
    },
    {
      id: '105',
      title: 'Solid Rope 24K Pure Gold Chain',
      category: 'Chains',
      karat: '24K Pure Gold',
      price: 'Market Rate (Enquire for Daily Price)',
    },
    {
      id: '106',
      title: 'Ornate Ruby-Accent Gold Pendant',
      category: 'Pendants',
      karat: '22K Gold',
      price: 'Market Rate (Enquire for Daily Price)',
    },
  ];

  const filteredProducts = selectedCategory === 'All'
    ? sampleProducts
    : sampleProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-[#C6A15B]/30 pb-6 text-center sm:text-left space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-bold">Gold Collection</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
          {BUSINESS_DETAILS.brandName} Catalog
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 font-serif italic">
          "{BUSINESS_DETAILS.tagline}" — Certified 22K & 24K gold jewellery in Colombo 7.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-gray-100">
        <Filter className="w-4 h-4 text-[#C6A15B] shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#C6A15B] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-[#C6A15B]/30 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] bg-[#121212] overflow-hidden">
                <img
                  src={heroBanner}
                  alt={product.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#C6A15B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {product.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] text-[#C6A15B] font-semibold uppercase tracking-wider block">
                  {product.karat}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#121212]">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500">{product.price}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <a
                href={getWhatsAppEnquiryUrl(`Hello Zeenath Jewellers, I am enquiring about ${product.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FAF8F3] border border-[#C6A15B] text-[#121212] hover:bg-[#C6A15B] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider rounded"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>WhatsApp Enquiry ({BUSINESS_DETAILS.whatsapp})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-[#FAF8F3] p-6 rounded-lg border border-[#C6A15B]/30 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs text-[#C6A15B] font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Need a Specific Custom Weight or Design?</span>
        </div>
        <p className="text-xs text-gray-600">
          Visit {BUSINESS_DETAILS.brandName} at {BUSINESS_DETAILS.address} or contact us on WhatsApp: <strong>{BUSINESS_DETAILS.whatsapp}</strong>.
        </p>
      </div>
    </div>
  );
};

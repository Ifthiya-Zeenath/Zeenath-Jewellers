import React from 'react';
import { Award, MapPin, HeartHandshake, Phone } from 'lucide-react';
import logoFull from '../../assets/logo-full.jpg';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AboutPage: React.FC = () => {
  useDocumentTitle(
    'About Us | Zeenath Jewellers',
    'Learn about Zeenath Jewellers — Hambantota\'s premier destination for certified hallmarked 22K and 24K gold jewellery and custom goldsmithing.'
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">Our Heritage</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#121212]">
          About {BUSINESS_DETAILS.brandName}
        </h1>
        <p className="text-base text-gray-600 font-serif italic text-xl">
          "{BUSINESS_DETAILS.tagline}"
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-[#C6A15B]/30 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <img
              src={logoFull}
              alt="Zeenath Jewellers Logo"
              className="w-full max-w-xs rounded-lg border border-[#C6A15B]/30 shadow"
            />
          </div>
          
          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
            <p>
              Located at <strong>{BUSINESS_DETAILS.address}</strong>, {BUSINESS_DETAILS.brandName} is built on an enduring commitment to purity, traditional artisan craftsmanship, and transparent customer service.
            </p>
            <p>
              Whether you are selecting a timeless 22K gold wedding trousseau, handcrafted bangles, or bespoke custom jewellery, our master jewelers craft every ornament to celebrate life's most cherished moments.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#A88645] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact {BUSINESS_DETAILS.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-base text-[#121212]">Guaranteed Hallmarked Purity</h4>
              <p className="text-xs text-gray-500 mt-1">Certified 22K and 24K gold standard.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <HeartHandshake className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-base text-[#121212]">Trusted Relationship</h4>
              <p className="text-xs text-gray-500 mt-1">Honest advice and transparent pricing for every client.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#C6A15B] shrink-0 mt-1" />
            <div>
              <h4 className="font-serif font-bold text-base text-[#121212]">Flagship Boutique</h4>
              <p className="text-xs text-gray-500 mt-1">{BUSINESS_DETAILS.address}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

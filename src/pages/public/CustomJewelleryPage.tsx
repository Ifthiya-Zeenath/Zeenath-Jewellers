import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import logoFull from '../../assets/logo-full.jpg';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const CustomJewelleryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">Bespoke Goldsmithing</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#121212]">
          Custom Jewellery Service
        </h1>
        <p className="text-sm text-gray-600 font-serif italic text-lg">
          "{BUSINESS_DETAILS.tagline}"
        </p>
      </div>

      {/* Intro */}
      <div className="bg-white rounded-xl border border-[#C6A15B]/30 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <img
            src={logoFull}
            alt="Zeenath Jewellers Logo"
            className="w-full max-w-xs rounded-lg border border-[#C6A15B]/30 shadow"
          />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6A15B]/10 text-[#C6A15B] rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Handcrafted in Colombo 7
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
            Turn Your Dream Design into 22K Gold Reality
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-light">
            At <strong>{BUSINESS_DETAILS.brandName}</strong>, we specialize in translating your unique ideas, family heirlooms, or bridal sketches into certified gold masterworks.
          </p>
        </div>
      </div>

      {/* Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl border border-[#C6A15B]/30 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#C6A15B] text-white flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="font-serif text-xl font-bold text-[#121212]">Design Consultation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Discuss gold weight, karat purity (22K/24K), gemstone options, and budget with our master jewelers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#C6A15B]/30 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#C6A15B] text-white flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="font-serif text-xl font-bold text-[#121212]">Handcrafting & Hallmarking</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our artisan goldsmiths forge your custom ornament with guaranteed hallmarked gold quality.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#C6A15B]/30 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#C6A15B] text-white flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="font-serif text-xl font-bold text-[#121212]">Luxury Delivery</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your finished bespoke masterpiece undergoes inspection and is delivered in signature Zeenath packaging.
          </p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#121212] text-white rounded-xl p-8 sm:p-12 border border-[#C6A15B]/40 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#C6A15B]">Start Your Custom Jewellery Order</h3>
          <p className="text-xs text-white/70">Visit {BUSINESS_DETAILS.address} or talk to us directly on WhatsApp.</p>
        </div>

        <a
          href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, I would like to discuss a custom gold jewellery design.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#A88645] transition-colors rounded shadow whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp {BUSINESS_DETAILS.whatsapp}</span>
        </a>
      </div>
    </div>
  );
};

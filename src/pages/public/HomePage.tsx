import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Sparkles, Gem, ShieldCheck, HeartHandshake } from 'lucide-react';

import heroBanner from '../../assets/hero-banner.jpg';
import logoFull from '../../assets/logo-full.jpg';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const HomePage: React.FC = () => {
  // 9 Required Categories
  const categories = [
    { number: '01', name: 'Rings', detail: 'Solitaire & 22K Bands' },
    { number: '02', name: 'Necklaces', detail: 'Chokers & Statement Chains' },
    { number: '03', name: 'Earrings', detail: 'Studs, Jhumkas & Drops' },
    { number: '04', name: 'Bracelets', detail: 'Intricate Gold Cuffs' },
    { number: '05', name: 'Bangles', detail: 'Traditional & Modern Pairs' },
    { number: '06', name: 'Chains', detail: '22K & 24K Daily Wear' },
    { number: '07', name: 'Pendants', detail: 'Gemstone & Motif Pieces' },
    { number: '08', name: 'Bridal Jewellery', detail: 'Wedding Trousseau Sets' },
    { number: '09', name: 'Jewellery Sets', detail: 'Matching Necklaces & Earrings' },
  ];

  // Featured Products
  const featuredProducts = [
    {
      id: '1',
      title: 'Royal Heritage 22K Gold Bridal Necklace',
      category: 'Bridal Collection',
      purity: '22K Hallmarked Gold',
      rate: 'Market Rate (Daily Sync)',
    },
    {
      id: '2',
      title: 'Empress Diamond-Cut Gold Bangles',
      category: 'Bangles',
      purity: '22K Gold • 24 Grams',
      rate: 'Market Rate (Daily Sync)',
    },
    {
      id: '3',
      title: 'Classic Crown Solitaire Gold Ring',
      category: 'Rings',
      purity: '22K Gold with Gemstone',
      rate: 'Market Rate (Daily Sync)',
    },
    {
      id: '4',
      title: 'Traditional Filigree Floral Earrings',
      category: 'Earrings',
      purity: '22K Fine Gold',
      rate: 'Market Rate (Daily Sync)',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 4. EDITORIAL / FUTURISTIC HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:py-24 bg-gradient-to-b from-[#FAF8F3] via-[#FAF5EB] to-[#FAF8F3]">
        {/* Soft Background Accent Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A15B]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white border border-[#C6A15B]/30 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B]"></span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
                  Contemporary Fine Gold • Colombo 7
                </span>
              </div>

              {/* Script + Serif Typographic Hero Header */}
              <div className="space-y-1">
                <span className="font-script text-6xl sm:text-8xl text-[#C6A15B] block font-bold leading-tight drop-shadow-xs">
                  Zeenath
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121212] uppercase leading-none">
                  JEWELLERS
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl text-[#121212]/70 pt-2">
                  "{BUSINESS_DETAILS.tagline}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Discover an unprecedented synthesis of Sri Lankan gold heritage and 2026 modern minimal aesthetics. Every piece is crafted in certified 22K & 24K gold with meticulous hallmarking precision.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md"
                >
                  <span>Shop Jewellery</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                </Link>

                <Link
                  to="/custom-jewellery"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C6A15B]/40 text-[#121212] hover:border-[#121212] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs"
                >
                  <span>Custom Jewellery</span>
                </Link>
              </div>

            </div>

            {/* Right Asymmetrical Editorial Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Card */}
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-white/60 bg-white group">
                  <img
                    src={heroBanner}
                    alt="Zeenath Jewellers Editorial Gold Collection"
                    className="w-full h-[420px] sm:h-[480px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-bold">2026 Fine Collection</span>
                    <h3 className="font-serif text-xl font-bold">22K Handcrafted Masterpieces</h3>
                    <p className="text-xs text-white/70">Boutique: {BUSINESS_DETAILS.address}</p>
                  </div>
                </div>

                {/* Floating Accent Badge 1 */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-[#C6A15B]/30 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C6A15B]/10 flex items-center justify-center text-[#C6A15B]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#121212]">100% Certified Purity</p>
                    <p className="text-[10px] text-gray-500">Hallmarked 22K & 24K Gold</p>
                  </div>
                </div>

                {/* Floating Accent Badge 2 */}
                <div className="absolute -top-6 -right-6 bg-[#121212] text-white p-3.5 rounded-lg shadow-lg border border-[#C6A15B]/40 hidden sm:flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  <span className="text-xs font-semibold tracking-wider">Colombo 7 Flagship</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOMEPAGE SECTIONS */}

      {/* SECTION A: CREATIVE CATEGORIES PRESENTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 border-b border-[#C6A15B]/20 pb-6">
          <div>
            <span className="font-script text-3xl text-[#C6A15B] block">Curated Masterworks</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212] uppercase tracking-wide">
              Jewellery Categories
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-xs font-light">
            Explore 9 specialized categories of certified gold craftsmanship designed for weddings, investments, and luxury wear.
          </p>
        </div>

        {/* Creative Asymmetrical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              className="group bg-white p-8 rounded-lg border border-gray-100 hover:border-[#C6A15B]/50 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <span className="font-serif text-2xl font-bold text-[#C6A15B]/40 group-hover:text-[#C6A15B] transition-colors">
                  {cat.number}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#FAF8F3] flex items-center justify-center text-[#121212] group-hover:bg-[#121212] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="mt-8 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 font-light">{cat.detail}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 group-hover:text-[#C6A15B] transition-colors">
                <span>Browse Designs</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION B: FEATURED JEWELLERY (CLEAN MODERN CARDS) */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-14">
            <span className="font-script text-3xl text-[#C6A15B] block">Selected Creations</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212] uppercase tracking-wide">
              Featured Gold Designs
            </h2>
            <div className="w-12 h-0.5 bg-[#C6A15B] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-[#FAF8F3] rounded-md overflow-hidden mb-4">
                    <img
                      src={heroBanner}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#121212] text-[#C6A15B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#C6A15B] tracking-wider uppercase block">
                      {product.purity}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">{product.rate}</p>
                  </div>
                </div>

                <a
                  href={getWhatsAppEnquiryUrl(`Hello Zeenath Jewellers, I am interested in ${product.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-sm"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION C: EDITORIAL BRAND STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F3] rounded-2xl p-8 sm:p-16 border border-[#C6A15B]/20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              <img
                src={logoFull}
                alt="Zeenath Jewellers Brand Story"
                className="w-full rounded-lg border border-[#C6A15B]/30 shadow-md"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#121212] text-white p-4 rounded-lg shadow-lg border border-[#C6A15B]/40">
                <p className="font-script text-2xl text-[#C6A15B]">Est. Colombo 7</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-script text-3xl text-[#C6A15B] block">Artistry & Trust</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
              The Legacy of Zeenath Jewellers
            </h2>
            <p className="font-serif italic text-xl text-[#121212]/80">
              "{BUSINESS_DETAILS.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              Situated in the prestigious boutique district at <strong>{BUSINESS_DETAILS.address}</strong>, Zeenath Jewellers crafts fine 22K and 24K gold jewellery that celebrates life's most precious milestones. We bridge traditional goldsmithing mastery with modern luxury aesthetics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <Gem className="w-5 h-5 text-[#C6A15B]" />
                <h4 className="font-serif font-bold text-base text-[#121212]">Pure Gold</h4>
                <p className="text-xs text-gray-500">22K & 24K Hallmarked Standard</p>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#C6A15B]" />
                <h4 className="font-serif font-bold text-base text-[#121212]">Bespoke Craft</h4>
                <p className="text-xs text-gray-500">Custom Bridal & Heirloom Designs</p>
              </div>
              <div className="space-y-1">
                <HeartHandshake className="w-5 h-5 text-[#C6A15B]" />
                <h4 className="font-serif font-bold text-base text-[#121212]">Lifetime Value</h4>
                <p className="text-xs text-gray-500">Honest Pricing & Personal Guidance</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C6A15B] hover:text-[#121212] transition-colors"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION D: WHATSAPP ENQUIRY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121212] text-white rounded-xl p-8 sm:p-12 border border-[#C6A15B]/40 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 text-center md:text-left z-10">
            <span className="font-script text-3xl text-[#C6A15B] block">Direct Consultation</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Daily Gold Rates & Custom Orders
            </h3>
            <p className="text-xs text-white/70 max-w-xl font-light">
              Contact Zeenath Jewellers directly on WhatsApp for daily gold rate updates, bespoke order quotes, or boutique appointments.
            </p>
          </div>

          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 inline-flex items-center gap-3 px-8 py-4 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#A88645] transition-all rounded-xs shadow-lg whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Chat on WhatsApp: {BUSINESS_DETAILS.whatsapp}</span>
          </a>
        </div>
      </section>

    </div>
  );
};

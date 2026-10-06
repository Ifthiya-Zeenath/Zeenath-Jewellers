import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

import atelierImg from '../../assets/custom-atelier.jpg';
import necklaceImg from '../../assets/necklace-collection.jpg';

import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AboutPage: React.FC = () => {
  useDocumentTitle(
    'About Us | Zeenath Jewellers Hambantota',
    'Learn about Zeenath Jewellers — Hambantota\'s gold partner for life. Established 19 December 2021, offering 22K and 24K gold jewellery and custom goldsmithing.'
  );

  // Scroll reveal observer for subtle Apple-style entry animations
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#121212] overflow-x-hidden selection:bg-[#C6A15B] selection:text-white">
      
      {/* ====================================================================
          1. HERO SECTION (DARK obsidian background with gold radial ambient)
          ==================================================================== */}
      <section className="relative bg-[#121212] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#C6A15B]/20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6A15B]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Heritage Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6A15B]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
              Established 19 December 2021 • Hambantota
            </span>
          </div>

          {/* Natural Brand PNG Asset */}
          <div className="flex justify-center pt-2 pb-1">
            <img
              src="/zeenathjewellers.png"
              alt="Zeenath Jewellers"
              className="h-10 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(198,161,91,0.25)]"
              onError={(e) => {
                // Fallback to text if PNG fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Your Gold Partner <span className="italic font-normal text-[#C6A15B]">for Life</span>
          </h1>

          {/* Concise Supporting Text */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Founded on 19 December 2021 in Hambantota, Sri Lanka. Built on authentic 22K hallmarked gold, transparent customer service, and dedicated artisan goldsmithing.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-center">
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C6A15B]">5 Years</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Trust & Service</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">22K & 24K</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Gold Standard</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C0C0C0]">Custom</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Bespoke Designs</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C6A15B]">Hambantota</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Flagship Boutique</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. OUR STORY SECTION (LIGHT cream background)
          ==================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C6A15B]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212] tracking-tight">
              Craftsmanship & Trust Built in Hambantota
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-light">
              <p>
                Opened on <strong>19 December 2021</strong> at No.31, Wilmot Street, Hambantota, Zeenath Jewellers was established with a clear commitment: to provide pure 22K hallmarked gold jewellery with complete transparency and personal customer care.
              </p>
              <p>
                As we approach our 5th anniversary on <strong>19 December 2026</strong>, our guiding principle remains unchanged — to be your trusted gold partner for life. From traditional wedding trousseaus to delicate daily gold pieces and custom bespoke creations, every ornament is crafted to celebrate your family’s most cherished occasions.
              </p>
              <p>
                We work directly with our clients to guide them on weight, gold rates, and design options so every customer walks away with absolute confidence in their piece.
              </p>
            </div>

            {/* Key Features List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-gray-800">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>22K Hallmarked Gold Standard</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Custom Jewellery Goldsmithing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Transparent Gold Rate Guidance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Hambantota Town Flagship Store</span>
              </div>
            </div>

            {/* WhatsApp Contact Action */}
            <div className="pt-4">
              <a
                href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, I would like to learn more about your gold jewellery.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#C6A15B] transition-colors duration-300 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                <span>Speak With Our Team</span>
              </a>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-150">
            <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-white group">
              <img
                src={necklaceImg}
                alt="Zeenath Jewellers Craftsmanship"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40">
                    <Award className="w-5 h-5 text-[#C6A15B]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-sm sm:text-base text-white">5 Years of Community Trust</h4>
                    <p className="text-xs text-gray-300">19 December 2021 – 19 December 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          3. HERITAGE TIMELINE SECTION (DARK obsidian background)
          ==================================================================== */}
      <section className="bg-[#121212] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#C6A15B]/20">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-3 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
              Heritage Timeline
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Our Journey
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto font-light">
              A journey defined by customer relationships, gold purity, and artisan goldsmithing in Hambantota.
            </p>
          </div>

          {/* Simple Elegant Timeline */}
          <div className="relative pl-6 sm:pl-8 border-l border-[#C6A15B]/30 space-y-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            
            {/* Timeline Item 1 */}
            <div className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#C6A15B] border-4 border-[#121212] group-hover:scale-125 transition-transform" />
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C6A15B]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#C6A15B]">
                    19 December 2021
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/30">
                    Grand Opening
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-semibold text-white mb-2">
                  Zeenath Jewellers Opens in Hambantota
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Opened our flagship boutique at No. 31, Wilmot Street in Hambantota, bringing certified 22K hallmarked gold, transparent pricing, and custom goldsmithing to local families.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#C0C0C0] border-4 border-[#121212] group-hover:scale-125 transition-transform" />
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#C6A15B]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#C0C0C0]">
                    19 December 2026
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium bg-white/10 text-gray-300 border border-white/20">
                    5-Year Milestone
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-semibold text-white mb-2">
                  Celebrating 5 Years of Trust & Craftsmanship
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Completing five years as Hambantota’s gold partner for life — honoring thousands of wedding trousseaus, custom jewellery creations, and lasting customer relationships across Sri Lanka.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          4. WHY CHOOSE ZEENATH (LIGHT background with 4 trust pillars)
          ==================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
            The Zeenath Distinction
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212] tracking-tight">
            Why Families Choose Zeenath
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto font-light">
            Core commitments that guide every piece we showcase and craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          
          {/* Pillar 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 hover:border-[#C6A15B]/40 hover:shadow-xl transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-colors duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Quality Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Master goldsmithing dedicated to 22K and 24K gold standards, ensuring durable elegance for daily wear and grand occasions.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 hover:border-[#C6A15B]/40 hover:shadow-xl transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-colors duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Custom Jewellery Design
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Transform your design idea into reality with bespoke gold weight, custom sizing, and custom engraving services.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 hover:border-[#C6A15B]/40 hover:shadow-xl transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-colors duration-300">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Trusted Local Service
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Rooted in Hambantota, serving families with honest consultation, gold rate clarity, and long-term customer relationships.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 hover:border-[#C6A15B]/40 hover:shadow-xl transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-colors duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#121212]">
              Personal Customer Care
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Direct guidance for investment gold, bridal trousseau planning, and maintenance for your family heirloom pieces.
            </p>
          </div>

        </div>
      </section>

      {/* ====================================================================
          5. CUSTOM JEWELLERY SECTION (LIGHT background callout card)
          ==================================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#121212] text-white p-8 sm:p-12 lg:p-16 border border-[#C6A15B]/30 shadow-2xl reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          {/* Subtle image overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay">
            <img src={atelierImg} alt="Custom Atelier" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6A15B]">
                Bespoke Goldsmithing
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Looking for Something Unique?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Collaborate directly with our master goldsmiths to craft custom gold rings, bangles, bridal necklaces, or personalized gifts tailored to your exact weight and design preferences.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/custom-jewellery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#A88645] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Start Your Custom Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <a
                href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, I would like to enquire about custom jewellery crafting.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <MessageSquare className="w-4 h-4 text-[#C6A15B]" />
                <span>WhatsApp Goldsmith</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. BUSINESS DETAILS & STORE INFORMATION
          ==================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
            Boutique Information
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212] tracking-tight">
            Visit Us in Hambantota
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto font-light">
            We welcome you to visit our store for consultations, gold rates, and custom jewellery requests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          
          {/* Location */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-3 hover:border-[#C6A15B]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#121212]">Address</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              {BUSINESS_DETAILS.address}
              <br />
              {BUSINESS_DETAILS.location}
            </p>
          </div>

          {/* Contact Phone & WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-3 hover:border-[#C6A15B]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#121212]">Phone & WhatsApp</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              <a href={`tel:${BUSINESS_DETAILS.phone}`} className="hover:text-[#C6A15B] transition-colors block">
                {BUSINESS_DETAILS.phone}
              </a>
              <a href={BUSINESS_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C6A15B] transition-colors block">
                WhatsApp: {BUSINESS_DETAILS.whatsapp}
              </a>
            </p>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-3 hover:border-[#C6A15B]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#121212]">Email Enquiry</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light break-all">
              <a href={`mailto:${BUSINESS_DETAILS.email}`} className="hover:text-[#C6A15B] transition-colors">
                {BUSINESS_DETAILS.email}
              </a>
            </p>
          </div>

          {/* Hours */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-3 hover:border-[#C6A15B]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#121212]">Boutique Hours</h3>
            <div className="text-xs text-gray-600 leading-relaxed font-light space-y-1">
              <p>{BUSINESS_DETAILS.hours.weekdays}</p>
              <p>{BUSINESS_DETAILS.hours.weekends}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          7. FINAL CTA SECTION (DARK obsidian banner)
          ==================================================================== */}
      <section className="bg-[#121212] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-t border-[#C6A15B]/20">
        <div className="max-w-3xl mx-auto space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
            Begin Your Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Connect With Zeenath Jewellers
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Visit our boutique in Hambantota or reach out via WhatsApp for current gold rates, jewellery enquiries, or custom orders.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#A88645] transition-all duration-300 shadow-lg"
            >
              Enquire Via WhatsApp
            </a>
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-white/10 text-white text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Explore Shop Catalogue
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

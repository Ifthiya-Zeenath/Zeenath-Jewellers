import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Award,
  ExternalLink,
  Palette,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

import heroBanner from '../../assets/hero-banner.jpg';
import ringImg from '../../assets/ring-collection.jpg';
import necklaceImg from '../../assets/necklace-collection.jpg';
import atelierImg from '../../assets/custom-atelier.jpg';

import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { DailyGoldRates } from '../../components/home/DailyGoldRates';

export const HomePage: React.FC = () => {
  useDocumentTitle(
    'Zeenath Jewellers | Gold Jewellery in Hambantota',
    'Discover premium gold jewellery, wedding jewellery, rings, necklaces, bracelets and custom jewellery designs at Zeenath Jewellers in Hambantota, Sri Lanka.'
  );

  // Parallax Mouse Track State for Apple-Style Hero Depth
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  // Scroll Reveal Observer for Apple-Level Motion
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

  // 1. FEATURED CATEGORIES DATA
  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      tagline: 'Solitaire & 22K Bands',
      desc: 'Exquisite 22K gold rings featuring solitaire gems, filigree cuts, and wedding bands.',
      img: ringImg,
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      tagline: 'Chokers & Statement Chains',
      desc: 'Royal bridal chokers, elegant layered gold chains, and hand-engraved traditional necklaces.',
      img: necklaceImg,
    },
    {
      id: 'earrings',
      name: 'Earrings',
      tagline: 'Studs, Jhumkas & Drops',
      desc: 'From daily wear gold studs to grand wedding jhumkas with intricate gold detailing.',
      img: heroBanner,
    },
    {
      id: 'bracelets',
      name: 'Bracelets & Bangles',
      tagline: 'Intricate Gold Cuffs',
      desc: 'Solid 22K & 24K gold bangles, flexible charm bracelets, and luxury cuffs.',
      img: heroBanner,
    },
    {
      id: 'wedding',
      name: 'Wedding Jewellery',
      tagline: 'Bridal Trousseau Sets',
      desc: 'Complete bridal jewellery sets handcrafted for your unforgettable wedding day.',
      img: necklaceImg,
    },
    {
      id: 'custom',
      name: 'Custom Designs',
      tagline: 'Bespoke Atelier',
      desc: 'Turn your dream jewellery sketch or reference image into a handcrafted gold masterpiece.',
      img: atelierImg,
    },
  ];

  // 2. WHY CHOOSE ZEENATH FEATURES
  const whyChooseUs = [
    {
      number: '01',
      title: 'Experienced Craftsmanship',
      description:
        'Master goldsmiths combining generations of Sri Lankan heritage with meticulous precision.',
    },
    {
      number: '02',
      title: 'Personalized Service',
      description:
        'One-on-one consultation in our Hambantota boutique atelier or online via WhatsApp.',
    },
    {
      number: '03',
      title: 'Custom Jewellery Options',
      description:
        'Bespoke goldsmithing converting your ideas into certified 22K & 24K gold reality.',
    },
    {
      number: '04',
      title: 'Trusted Local Business',
      description:
        'Hambantota’s premier gold partner built on price transparency and hallmarked purity.',
    },
  ];

  // 3. BUSINESS INFO CARDS
  const contactCards = [
    {
      icon: Phone,
      title: 'Phone Consultation',
      value: BUSINESS_DETAILS.phone,
      actionText: 'Call Now',
      actionUrl: `tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Concierge',
      value: BUSINESS_DETAILS.whatsapp,
      actionText: 'Chat on WhatsApp',
      actionUrl: getWhatsAppEnquiryUrl(),
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: BUSINESS_DETAILS.email,
      actionText: 'Send Email',
      actionUrl: `mailto:${BUSINESS_DETAILS.email}`,
    },
    {
      icon: MapPin,
      title: 'Boutique Atelier',
      value: BUSINESS_DETAILS.address,
      actionText: 'Directions',
      actionUrl: `https://maps.google.com/?q=${encodeURIComponent(BUSINESS_DETAILS.address)}`,
    },
  ];

  // 4. SOCIAL MEDIA PLATFORMS
  const socialPlatforms = [
    {
      name: 'Facebook',
      handle: '@ZeenathJewellers',
      description: 'Follow our latest 22K gold collections and boutique updates.',
      url: BUSINESS_DETAILS.social.facebookUrl,
      svgIcon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@zeenathjewellers',
      description: 'Explore high-definition reels of bridal jewelry and gold artistry.',
      url: BUSINESS_DETAILS.social.instagramUrl,
      svgIcon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      handle: '@zeenathjewellers.lk',
      description: 'Watch behind-the-scenes gold crafting videos and daily showcases.',
      url: BUSINESS_DETAILS.social.tiktokUrl,
      svgIcon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.28 1.76-.23.94.07 1.96.72 2.62.63.66 1.59.97 2.49.82.97-.13 1.83-.82 2.17-1.74.15-.43.2-.89.2-1.35.03-4.76.01-9.52.02-14.28z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#121212] overflow-x-hidden selection:bg-[#C6A15B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. DARK HERO — CLEAN, ATMOSPHERIC, APPLE-STYLE (NO GRID OF BOXES) */}
      {/* ========================================================================= */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]"
      >
        
        {/* Subtle Gold & Silver Atmospheric Lighting (NO BOX GRID) */}
        <div 
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] bg-radial from-[#C6A15B]/18 via-[#E2E8F0]/5 to-transparent blur-3xl pointer-events-none transition-transform duration-500 ease-out"
        ></div>

        <div className="max-w-5xl mx-auto relative z-10 w-full text-center space-y-8">
          
          {/* BRAND HIERARCHY 1: Natural Brand PNG Asset (Strong prominence, Sitting naturally on dark background) */}
          <div 
            style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)` }}
            className="inline-block transition-transform duration-300 ease-out pt-2"
          >
            <img
              src="/zeenathjewellers.png"
              alt="Zeenath Jewellers"
              className="h-16 sm:h-24 md:h-28 w-auto object-contain filter drop-shadow-[0_10px_25px_rgba(198,161,91,0.3)] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* BRAND HIERARCHY 2: Reduced Headline Size */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Your Gold Partner <span className="font-serif italic text-[#C6A15B]">for Life</span>
          </h1>

          {/* BRAND HIERARCHY 3: Short, Elegant Supporting Sentence */}
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            Sri Lanka's trusted boutique for hallmarked 22K & 24K gold jewellery, custom bridal heirlooms, and master goldsmithing.
          </p>

          {/* BRAND HIERARCHY 4: Pill CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#C6A15B] to-[#A88645] text-white hover:from-[#DFBA73] hover:to-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-[0_10px_25px_rgba(198,161,91,0.25)] hover:scale-105"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              to="/custom-jewellery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#121212] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:scale-105"
            >
              <Palette className="w-4 h-4 text-[#C6A15B]" />
              <span>Custom Jewellery</span>
            </Link>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. LIGHT SECTION — DAILY GOLD RATES & CURATED COLLECTIONS */}
      {/* ========================================================================= */}
      <div className="bg-[#FAF8F3] text-[#121212] py-16 transition-colors">
        
        {/* Daily Gold Rates Component (Placed after Hero, before Collections) */}
        <div className="reveal-on-scroll opacity-0 translate-y-8">
          <DailyGoldRates />
        </div>

        {/* CURATED COLLECTIONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 reveal-on-scroll opacity-0 translate-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-serif italic text-lg text-[#C6A15B] block">Exquisite Artistry</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#121212] tracking-wide">
                Curated Collections
              </h2>
              <div className="w-16 h-0.5 bg-[#C6A15B]"></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md font-light leading-relaxed">
              Explore 6 specialized gold jewellery categories designed for bridal celebrations, everyday elegance, and heirloom investments.
            </p>
          </div>

          {/* Clean Light Category Cards Grid (High Whitespace, Editorial Feel) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/shop"
                className="group bg-white rounded-xl border border-gray-200 hover:border-[#C6A15B] shadow-xs hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F3]">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#C6A15B] uppercase tracking-widest block">
                      {cat.tagline}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#121212] group-hover:text-[#C6A15B] transition-colors mt-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed mt-1">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                    <span>Explore Category</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 3. DARK SECTION — THE ZEENATH DISTINCTION & HERITAGE */}
      {/* ========================================================================= */}
      <section className="bg-[#0A0A0A] text-white py-24 border-y border-white/10 reveal-on-scroll opacity-0 translate-y-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Visual & Integrated Brand PNG (/zeenath.png) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-[#080808] group">
                <img
                  src={heroBanner}
                  alt="Zeenath Jewellers Heritage"
                  className="w-full h-[420px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Natural Brand PNG Asset */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
                  <img
                    src="/zeenath.png"
                    alt="Zeenath"
                    className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                  />
                  
                  {/* Subtle Refined Heritage Detail */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-[#C6A15B] font-mono">
                    <Award className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Established 2021 • 5 Years of Trust</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Concise Storytelling */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="font-serif italic text-lg text-[#C6A15B] block">Heritage & Precision</span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide mt-1">
                  The Zeenath Distinction
                </h2>
                <div className="w-16 h-0.5 bg-[#C6A15B] mt-2"></div>
              </div>

              {/* 4 Concise Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {whyChooseUs.map((reason) => (
                  <div key={reason.number} className="space-y-2 group">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-xl font-bold text-[#C6A15B]">
                        {reason.number}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed border-l border-[#C6A15B]/30 pl-3">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Story Link */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all text-xs font-semibold uppercase tracking-[0.18em] rounded-full shadow-md"
                >
                  <span>Our Full Heritage Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LIGHT SECTION — CUSTOM JEWELLERY EXPERIENCE */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF8F3] text-[#121212] py-20 reveal-on-scroll opacity-0 translate-y-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl p-8 sm:p-14 border border-[#C6A15B]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Natural Brand PNG Asset (/name.png) */}
              <div className="space-y-2">
                <img
                  src="/name.png"
                  alt="Zeenath Jewellers Atelier"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-xs"
                />
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#C6A15B] block pt-1">
                  Bespoke Goldsmith Atelier
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#121212] tracking-wide leading-tight">
                Craft Your Custom Piece
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Bring your unique vision to life with Zeenath Jewellers. From a reference sketch or photo, our master artisans craft bespoke 22K & 24K gold pieces tailored precisely to your specifications.
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-3 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                  <span>3D CAD Preview & Master Goldsmith Consultation</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                  <span>Certified 22K & 24K Hallmarked Gold Purity</span>
                </div>
              </div>

              {/* PRIMARY CTA REQUIRED */}
              <div className="pt-2">
                <Link
                  to="/custom-jewellery"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-md hover:scale-105"
                >
                  <Palette className="w-4 h-4 text-[#C6A15B]" />
                  <span>Request Custom Design</span>
                </Link>
              </div>

            </div>

            {/* Atelier Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
                <img
                  src={atelierImg}
                  alt="Custom Atelier Crafting"
                  className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#C6A15B] font-bold">Bespoke Studio</p>
                  <p className="font-serif text-lg font-light">Handcrafted Perfection</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LIGHT / GLASS SECTION — BOUTIQUE DETAILS & SOCIAL */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF8F3] text-[#121212] pb-20 border-t border-gray-200/60 reveal-on-scroll opacity-0 translate-y-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          
          <div className="text-center space-y-2 mb-12">
            <span className="font-serif italic text-lg text-[#C6A15B] block">Boutique Details</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#121212] tracking-wide">
              Visit & Contact Us
            </h2>
            <div className="w-12 h-0.5 bg-[#C6A15B] mx-auto"></div>
          </div>

          {/* 4 Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contactCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#C6A15B] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#121212] group-hover:text-white transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#121212]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-light mt-0.5 break-words">
                        {card.value}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-100">
                    <a
                      href={card.actionUrl}
                      target={card.actionUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[#C6A15B] group-hover:text-[#121212] transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Platforms Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#C6A15B] shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#FAF8F3] text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                    {platform.svgIcon}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-base text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                      {platform.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-mono">{platform.handle}</p>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#C6A15B] transition-colors" />
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DARK / LUXURY SECTION — FINAL CTA */}
      {/* ========================================================================= */}
      <section className="bg-[#0A0A0A] text-white py-20 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <span className="font-serif italic text-lg text-[#C6A15B] block">Boutique Atelier</span>

          {/* EXACT REQUIRED HEADLINE */}
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
            Create Something Timeless
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            Experience handcrafted 22K and 24K gold elegance designed to last generations. Contact us today or initiate a custom order with our master goldsmiths.
          </p>

          {/* EXACT TWO REQUIRED BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#C6A15B] to-[#A88645] text-white hover:from-[#DFBA73] hover:to-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>

            <Link
              to="/custom-jewellery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-[#121212] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-xs hover:scale-105"
            >
              <Palette className="w-4 h-4 text-[#C6A15B]" />
              <span>Start Custom Order</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

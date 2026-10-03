import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Gem,
  ShieldCheck,
  HeartHandshake,
  Award,
  ExternalLink,
  Palette,
  CheckCircle2,
  MessageSquare,
  ChevronDown
} from 'lucide-react';

import heroBanner from '../../assets/hero-banner.jpg';
import ringImg from '../../assets/ring-collection.jpg';
import necklaceImg from '../../assets/necklace-collection.jpg';
import atelierImg from '../../assets/custom-atelier.jpg';

import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const HomePage: React.FC = () => {
  useDocumentTitle(
    'Zeenath Jewellers | Gold Jewellery in Hambantota',
    'Discover premium gold jewellery, wedding jewellery, rings, necklaces, bracelets and custom jewellery designs at Zeenath Jewellers in Hambantota, Sri Lanka.'
  );

  // Parallax Mouse Track State for Apple-Style Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  // Scroll Reveal Observer for Apple-Level Motion
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 1. TRUST BAR DATA
  const trustBarItems = [
    {
      icon: MapPin,
      title: 'Trusted Local Jeweller',
      description: 'Decades of heritage & community trust at 31 Wilmot Street, Hambantota.',
    },
    {
      icon: Palette,
      title: 'Custom Jewellery Designs',
      description: 'Bespoke 3D CAD & master goldsmith artisan creations.',
    },
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: '100% Certified 22K & 24K hallmarked gold with lifetime purity.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      description: 'Transparent daily market rates, personal guidance, and care.',
    },
  ];

  // 2. FEATURED CATEGORIES DATA
  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      tagline: 'Solitaire & 22K Bands',
      desc: 'Exquisite 22K gold rings featuring diamond-cut finishes, solitaire gems, and wedding bands.',
      img: ringImg,
      count: '45+ Designs',
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      tagline: 'Chokers & Statement Chains',
      desc: 'Royal bridal chokers, elegant layered gold chains, and hand-engraved traditional statement necklaces.',
      img: necklaceImg,
      count: '60+ Designs',
    },
    {
      id: 'earrings',
      name: 'Earrings',
      tagline: 'Studs, Jhumkas & Drops',
      desc: 'From daily wear gold studs to grand wedding jhumkas with filigree detailing.',
      img: heroBanner,
      count: '50+ Designs',
    },
    {
      id: 'bracelets',
      name: 'Bracelets & Bangles',
      tagline: 'Intricate Gold Cuffs',
      desc: 'Solid 22K & 24K gold bangles, flexible charm bracelets, and luxury cuffs.',
      img: heroBanner,
      count: '40+ Designs',
    },
    {
      id: 'wedding',
      name: 'Wedding Jewellery',
      tagline: 'Grand Bridal Trousseau Sets',
      desc: 'Complete bridal jewellery sets handcrafted for your unforgettable wedding day.',
      img: necklaceImg,
      count: '30+ Sets',
    },
    {
      id: 'custom',
      name: 'Custom Designs',
      tagline: 'Personalized Gold Atelier',
      desc: 'Turn your dream jewellery sketch or reference image into a handcrafted masterpiece.',
      img: atelierImg,
      count: 'Tailor-Made',
    },
  ];

  // 3. WHY CHOOSE ZEENATH FEATURES
  const whyChooseUs = [
    {
      number: '01',
      title: 'Experienced Craftsmanship',
      description:
        'Our master goldsmiths bring generations of Sri Lankan heritage and meticulous precision to every ornament, ensuring flawlessness down to the smallest detail.',
    },
    {
      number: '02',
      title: 'Personalized Service',
      description:
        'We offer one-on-one consultation in our Hambantota boutique atelier or online via WhatsApp, tailoring recommendations to your taste, budget, and occasion.',
    },
    {
      number: '03',
      title: 'Custom Jewellery Options',
      description:
        'Whether replicating a family heirloom or bringing a brand new CAD sketch to life, our custom goldsmithing service converts your ideas into certified gold reality.',
    },
    {
      number: '04',
      title: 'Trusted Local Business',
      description:
        'As Hambantota’s premier gold partner, we pride ourselves on absolute price transparency, hallmarked purity verification, and long-term customer trust.',
    },
  ];

  // 4. BUSINESS INFO CARDS
  const contactCards = [
    {
      icon: Phone,
      title: 'Phone Consultation',
      value: BUSINESS_DETAILS.phone,
      actionText: 'Call Now',
      actionUrl: `tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`,
      badge: 'Direct Line',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Concierge',
      value: BUSINESS_DETAILS.whatsapp,
      actionText: 'Chat on WhatsApp',
      actionUrl: getWhatsAppEnquiryUrl(),
      badge: 'Fast Response',
    },
    {
      icon: Mail,
      title: 'Email Address',
      value: BUSINESS_DETAILS.email,
      actionText: 'Send Email',
      actionUrl: `mailto:${BUSINESS_DETAILS.email}`,
      badge: 'Inquiries',
    },
    {
      icon: MapPin,
      title: 'Boutique Atelier',
      value: BUSINESS_DETAILS.address,
      actionText: 'Location Details',
      actionUrl: `https://maps.google.com/?q=${encodeURIComponent(BUSINESS_DETAILS.address)}`,
      badge: 'Hambantota Flagship',
    },
  ];

  // 5. SOCIAL MEDIA PLATFORMS
  const socialPlatforms = [
    {
      name: 'Facebook',
      handle: '@ZeenathJewellers',
      description: 'Follow our latest 22K gold collections, client stories, and boutique updates.',
      url: BUSINESS_DETAILS.social.facebookUrl,
      borderColor: 'border-[#1877F2]/30',
      iconColor: 'text-[#1877F2]',
      svgIcon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      handle: '@zeenathjewellers',
      description: 'Explore high-definition reels of bridal jewelry, custom fittings, and gold artistry.',
      url: BUSINESS_DETAILS.social.instagramUrl,
      borderColor: 'border-[#E1306C]/30',
      iconColor: 'text-[#E1306C]',
      svgIcon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      handle: '@zeenathjewellers.lk',
      description: 'Watch behind-the-scenes gold crafting videos and daily spotlight showcases.',
      url: BUSINESS_DETAILS.social.tiktokUrl,
      borderColor: 'border-[#121212]/30',
      iconColor: 'text-[#121212]',
      svgIcon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.28 1.76-.23.94.07 1.96.72 2.62.63.66 1.59.97 2.49.82.97-.13 1.83-.82 2.17-1.74.15-.43.2-.89.2-1.35.03-4.76.01-9.52.02-14.28z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-[#C6A15B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. APPLE-LEVEL DRAMATIC HERO SECTION */}
      {/* ========================================================================= */}
      <section 
        onMouseMove={handleMouseMove}
        className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-center items-center pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#080808] via-[#0E0D0B] to-[#0A0A0A]"
      >
        
        {/* Dynamic Parallax Radial Glow */}
        <div 
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[850px] sm:h-[1100px] bg-radial from-[#C6A15B]/20 via-[#E2E8F0]/5 to-transparent blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        ></div>

        {/* Delicate Silver Architectural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F00A_1px,transparent_1px),linear-gradient(to_bottom,#C6A15B0A_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full text-center space-y-10">
          
          {/* Top Pill Badge: Apple Style */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-[#C6A15B]/50 transition-all duration-500 group">
            <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-ping"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-slate-200 font-medium">
              Hambantota Boutique • <span className="text-[#C6A15B]">Haute Joaillerie Atelier</span>
            </span>
          </div>

          {/* Central Natural Brand PNG Integration (No White Box, Natural Background) */}
          <div className="flex flex-col items-center justify-center space-y-4 pt-2">
            <div 
              style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
              className="relative inline-block transition-transform duration-300 ease-out"
            >
              {/* Natural transparent PNG logo sitting directly on obsidian canvas */}
              <img
                src="/zeenathjewellers.png"
                alt="Zeenath Jewellers"
                className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(198,161,91,0.25)] hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            
            <p className="font-serif italic text-base sm:text-xl text-[#C6A15B] tracking-widest font-light">
              "{BUSINESS_DETAILS.tagline}"
            </p>
          </div>

          {/* EXACT REQUIRED HEADLINE WITH APPLE-LEVEL TYPOGRAPHY */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Your Gold Partner <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal gold-gradient-text relative inline-block">
              for Life
            </span>
          </h1>

          {/* Rich Supporting Text with Silver Highlights */}
          <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Experience an unprecedented synthesis of Sri Lankan gold heritage and high-luxury design. Every masterpiece is handcrafted in 100% hallmarked <span className="text-[#C6A15B] font-medium">22K & 24K gold</span> at our Hambantota boutique atelier.
          </p>

          {/* Apple-Style Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            
            {/* CTA 1: Shop Collection */}
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] text-white hover:from-[#DFBA73] hover:to-[#C6A15B] transition-all duration-500 text-xs font-semibold uppercase tracking-[0.22em] rounded-full shadow-[0_10px_30px_rgba(198,161,91,0.3)] group hover:scale-105"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* CTA 2: Custom Jewellery */}
            <Link
              to="/custom-jewellery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-[#121212] transition-all duration-500 text-xs font-semibold uppercase tracking-[0.22em] rounded-full shadow-lg hover:scale-105"
            >
              <Palette className="w-4 h-4 text-[#C6A15B]" />
              <span>Custom Jewellery</span>
            </Link>

            {/* WhatsApp Daily Rate Button */}
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-slate-300 hover:text-white border border-white/10 hover:border-white/30 transition-all text-xs font-semibold uppercase tracking-wider rounded-full bg-white/5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Daily Rates</span>
            </a>

          </div>

          {/* Floating Glass Badges */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-4 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
              100% Certified 22K & 24K
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Gem className="w-4 h-4 text-[#C6A15B]" />
              Bespoke Bridal Atelier
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#C6A15B]" />
              Direct WhatsApp Concierge
            </span>
          </div>

        </div>

        {/* Scroll Indicator Arrow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-scroll-pulse pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-mono">Scroll</span>
          <ChevronDown className="w-4 h-4 text-[#C6A15B]" />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST BAR (Directly below hero) */}
      {/* ========================================================================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-24 reveal-on-scroll opacity-0 translate-y-12">
        <div className="glass-obsidian-gold rounded-2xl shadow-2xl p-6 sm:p-10 border border-[#C6A15B]/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBarItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="group p-4 rounded-xl border border-transparent hover:border-[#C6A15B]/30 hover:bg-white/5 transition-all duration-500 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-all duration-500 shrink-0 shadow-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-semibold text-white group-hover:text-[#C6A15B] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED CATEGORIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="space-y-3">
            <span className="font-serif italic text-xl text-[#C6A15B] block">Curated Collections</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
              Featured Jewellery Categories
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#C6A15B] to-transparent"></div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light leading-relaxed">
            Discover 6 specialized gold jewellery categories meticulously designed for bridal celebrations, everyday elegance, and heirloom investments.
          </p>
        </div>

        {/* 6 Category Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/shop"
              className="group bg-[#121212] rounded-2xl border border-white/10 hover:border-[#C6A15B] shadow-xl hover:shadow-[0_15px_40px_rgba(198,161,91,0.2)] transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0D0D0D]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
                <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-[#C6A15B] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#C6A15B]/30">
                  {cat.count}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#C6A15B] uppercase tracking-widest block">
                    {cat.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#C6A15B] transition-colors mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mt-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-200 group-hover:text-[#C6A15B] transition-colors">
                  <span>Explore Designs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE ZEENATH (Luxury Split-Section) */}
      {/* ========================================================================= */}
      <section className="my-24 bg-gradient-to-b from-[#0D0D0D] via-[#121212] to-[#0D0D0D] text-white py-24 relative overflow-hidden border-y border-white/10 reveal-on-scroll opacity-0 translate-y-12">
        
        {/* Subtle Ambient Radial Light */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#C6A15B]/15 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image & Brand PNG Lockup */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/40 shadow-2xl group bg-[#080808]">
                <img
                  src={heroBanner}
                  alt="Zeenath Jewellers Heritage"
                  className="w-full h-[460px] object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Integrated Natural Brand Asset (zeenath.png) */}
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3 z-10">
                  <img
                    src="/zeenath.png"
                    alt="Zeenath"
                    className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                  />
                  <span className="font-serif italic text-base text-[#C6A15B] block">
                    Established Flagship in Hambantota
                  </span>
                  <p className="text-xs text-slate-300 font-light">
                    Generations of Sri Lankan goldsmithing mastery and hallmarked purity.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Structured Features List */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="font-serif italic text-xl text-[#C6A15B] block">The Zeenath Distinction</span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide mt-1">
                  Why Choose Zeenath Jewellers
                </h2>
                <div className="w-20 h-0.5 bg-[#C6A15B] mt-3"></div>
              </div>

              {/* 4 Structured Reasons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                {whyChooseUs.map((reason) => (
                  <div key={reason.number} className="space-y-3 group">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl font-bold text-[#C6A15B] group-hover:text-white transition-colors">
                        {reason.number}
                      </span>
                      <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#C6A15B] transition-colors">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed border-l-2 border-[#C6A15B]/30 pl-3">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg"
                >
                  <span>Learn Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CUSTOM JEWELLERY SHOWCASE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal-on-scroll opacity-0 translate-y-12">
        <div className="glass-obsidian-gold rounded-3xl p-8 sm:p-14 border border-[#C6A15B]/40 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Natural Brand PNG (name.png) */}
              <div className="space-y-2">
                <img
                  src="/name.png"
                  alt="Zeenath Jewellers Atelier"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-md"
                />
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#C6A15B]/20 border border-[#C6A15B]/40 rounded-full text-[#C6A15B] text-[11px] uppercase tracking-widest font-semibold mt-2">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Bespoke Goldsmith Atelier</span>
                </div>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide leading-tight">
                Have a Custom Design in Mind?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Bring your unique vision to life with Zeenath Jewellers. Whether you have a reference sketch, a photograph, or an idea in mind, our master artisans craft bespoke 22K and 24K gold pieces tailored precisely to your specifications.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                  <span>3D Design Preview & Personal Goldsmith Consultation</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                  <span>Crafted in Certified 22K & 24K Hallmarked Gold</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A15B]" />
                  <span>Direct WhatsApp progress updates from Hambantota atelier</span>
                </div>
              </div>

              {/* STRONG CTA BUTTON REQUIRED */}
              <div className="pt-4">
                <Link
                  to="/custom-jewellery"
                  className="inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] text-white hover:from-[#DFBA73] hover:to-[#C6A15B] transition-all duration-500 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg hover:scale-105"
                >
                  <Palette className="w-4 h-4 text-white" />
                  <span>Request Custom Design</span>
                </Link>
              </div>
            </div>

            {/* Atelier Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C6A15B]/40 group">
                <img
                  src={atelierImg}
                  alt="Custom Jewellery Atelier Crafting"
                  className="w-full h-[380px] object-cover transform group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[11px] uppercase tracking-widest text-[#C6A15B] font-bold">Master Goldsmith at Work</p>
                  <p className="font-serif text-xl font-light">Handcrafted Perfection</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BUSINESS INFORMATION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-12">
        
        <div className="text-center space-y-3 mb-14">
          <span className="font-serif italic text-xl text-[#C6A15B] block">Boutique Information</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
            Visit & Contact Zeenath Jewellers
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#C6A15B] to-transparent mx-auto"></div>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contactCards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#121212] p-6 rounded-2xl border border-white/10 hover:border-[#C6A15B] shadow-xl hover:shadow-[0_10px_30px_rgba(198,161,91,0.2)] transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#C6A15B] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg font-semibold text-white">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-light mt-1 break-words">
                      {card.value}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10">
                  <a
                    href={card.actionUrl}
                    target={card.actionUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[#C6A15B] group-hover:text-white transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Opening Hours Premium Card */}
        <div className="bg-gradient-to-r from-[#121212] via-[#161616] to-[#121212] text-white p-8 rounded-2xl border border-[#C6A15B]/40 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-light tracking-wide text-white">Boutique Opening Hours</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">Visit us for personalized 1-on-1 gold consultations</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-xs text-slate-200">
            <div className="bg-white/5 border border-white/10 px-6 py-3.5 rounded-xl">
              <span className="text-[#C6A15B] font-bold block uppercase text-[10px] tracking-widest mb-1">Weekdays</span>
              <span>{BUSINESS_DETAILS.hours.weekdays}</span>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-3.5 rounded-xl">
              <span className="text-[#C6A15B] font-bold block uppercase text-[10px] tracking-widest mb-1">Weekends</span>
              <span>{BUSINESS_DETAILS.hours.weekends}</span>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. SOCIAL MEDIA SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-12">
        
        <div className="text-center space-y-3 mb-14">
          <span className="font-serif italic text-xl text-[#C6A15B] block">Join Our Community</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-wide">
            Follow Zeenath Jewellers
          </h2>
          <p className="text-xs text-slate-400 font-light max-w-md mx-auto">
            Stay connected on Facebook, Instagram, and TikTok for daily gold rate updates, new design launches, and customer stories.
          </p>
        </div>

        {/* 3 Social Media Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-[#121212] p-8 rounded-2xl border ${platform.borderColor} hover:border-[#C6A15B] shadow-xl hover:shadow-[0_15px_35px_rgba(198,161,91,0.25)] transition-all duration-500 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <div className={`p-3 rounded-xl bg-white/5 ${platform.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {platform.svgIcon}
                  </div>
                  <span className="text-xs text-slate-400 font-mono font-medium">{platform.handle}</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-[#C6A15B] transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mt-2">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C6A15B] relative z-10">
                <span>Visit Profile</span>
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 reveal-on-scroll opacity-0 translate-y-12">
        <div className="bg-gradient-to-b from-[#121212] via-[#0E0D0B] to-[#0A0A0A] text-white rounded-3xl p-10 sm:p-24 border border-[#C6A15B]/50 shadow-2xl relative overflow-hidden text-center">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#C6A15B]/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C6A15B]/20 border border-[#C6A15B]/40 rounded-full text-[#C6A15B] text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Boutique Gold Atelier</span>
            </div>

            {/* EXACT REQUIRED HEADLINE */}
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-wide">
              Create Something Timeless
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
              Experience handcrafted 22K and 24K gold elegance designed to last generations. Contact us today or initiate a custom design order with our master goldsmiths.
            </p>

            {/* EXACT TWO REQUIRED BUTTONS */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
              
              {/* Button 1: Contact Us */}
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] text-white hover:from-[#DFBA73] hover:to-[#C6A15B] transition-all duration-500 text-xs font-semibold uppercase tracking-[0.22em] rounded-full shadow-lg hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </Link>

              {/* Button 2: Start Custom Order */}
              <Link
                to="/custom-jewellery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-white/5 border border-white/20 text-white hover:bg-white hover:text-[#121212] transition-all duration-500 text-xs font-semibold uppercase tracking-[0.22em] rounded-full shadow-sm hover:scale-105"
              >
                <Palette className="w-4 h-4 text-[#C6A15B]" />
                <span>Start Custom Order</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

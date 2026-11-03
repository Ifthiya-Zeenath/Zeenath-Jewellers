import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const Footer: React.FC = () => {
  const categoryLinks = [
    { name: 'Rings', path: '/shop?category=Rings' },
    { name: 'Necklaces', path: '/shop?category=Necklaces' },
    { name: 'Earrings', path: '/shop?category=Earrings' },
    { name: 'Bracelets & Bangles', path: '/shop?category=Bracelets' },
    { name: 'Wedding Jewellery', path: '/shop?category=Bridal' },
    { name: 'Custom Designs', path: '/custom-jewellery' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gold Collection', path: '/shop' },
    { name: 'Custom Jewellery', path: '/custom-jewellery' },
    { name: 'Our Heritage', path: '/about' },
    { name: 'Contact & Atelier', path: '/contact' },
  ];

  return (
    <footer className="relative bg-[#121212] text-white border-t border-[#C6A15B]/25 overflow-hidden">
      {/* Subtle warm ambient gold glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-24 bg-[#C6A15B]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 sm:pt-16 sm:pb-10 relative z-10">
        
        {/* Main Grid: Responsive columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand, Tagline, Flagship Boutique & Socials */}
          <div className="col-span-2 lg:col-span-5 space-y-4 sm:space-y-5">
            <Link to="/" className="inline-block group focus:outline-none">
              <img
                src="/zeenathjewellers.png"
                alt="Zeenath Jewellers"
                className="h-10 sm:h-12 w-auto object-contain brightness-105 group-hover:opacity-90 transition-opacity filter drop-shadow-[0_2px_12px_rgba(198,161,91,0.2)]"
              />
            </Link>

            {/* Brand Tagline */}
            <p className="font-serif italic text-base sm:text-lg text-[#C6A15B] tracking-wide">
              Your gold partner for life.
            </p>

            {/* Boutique Location Details */}
            <div className="pt-1 text-xs sm:text-sm text-gray-300 font-light space-y-1">
              <div className="flex items-start gap-2 text-gray-200">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <p className="leading-relaxed text-gray-300">
                  No. 31, Wilmot Street, Hambantota, Sri Lanka
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={BUSINESS_DETAILS.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B]/50 hover:bg-white/10 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={BUSINESS_DETAILS.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B]/50 hover:bg-white/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={BUSINESS_DETAILS.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C6A15B] hover:border-[#C6A15B]/50 hover:bg-white/10 transition-all duration-200"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.88.37z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4">
            <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-gray-300 font-light">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#C6A15B] transition-colors inline-block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4">
            <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              Collections
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-gray-300 font-light">
              {categoryLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#C6A15B] transition-colors inline-block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Boutique Hours */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-4">
            <h3 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              Concierge & Hours
            </h3>
            <div className="space-y-2.5 sm:space-y-3 text-xs text-gray-300 font-light">
              <a
                href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-[#C6A15B] transition-colors py-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>{BUSINESS_DETAILS.phone}</span>
              </a>
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#C6A15B] transition-colors py-0.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span>WhatsApp Consultation</span>
              </a>
              <a
                href={`mailto:${BUSINESS_DETAILS.email}`}
                className="flex items-center gap-2 hover:text-[#C6A15B] transition-colors py-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="truncate">{BUSINESS_DETAILS.email}</span>
              </a>

              <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-gray-400">
                <p className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                  <span>{BUSINESS_DETAILS.hours.weekdays}</span>
                </p>
                <p className="pl-5 text-gray-400">
                  {BUSINESS_DETAILS.hours.weekends}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Purity Guarantee */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {BUSINESS_DETAILS.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            <span>Certified 22K & 24K Gold Boutique</span>
            <span className="w-1 h-1 rounded-full bg-[#C6A15B]" />
            <span>Hambantota, Sri Lanka</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

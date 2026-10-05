import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';

import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Custom', path: '/custom-jewellery' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Pill Container */}
        <div className="bg-[#0A0A0A]/85 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
          
          {/* LEFT SIDE: Unified Brand Lockup (Logo PNG + Brand Name PNG) */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group py-0.5">
            {/* Emblem Emblem PNG */}
            <img 
              src="/logo.png" 
              alt="ZJ Emblem" 
              className="h-8 w-8 sm:h-9 sm:w-9 object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
            />
            {/* Brand Name PNG Asset */}
            <img 
              src="/zeenathjewellers.png" 
              alt="Zeenath Jewellers" 
              className="h-6 sm:h-8 w-auto object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform hidden xs:block sm:block"
            />
          </Link>

          {/* MIDDLE: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] lg:text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 py-1 ${
                  isActive(link.path)
                    ? 'text-[#C6A15B] font-bold border-b border-[#C6A15B]'
                    : 'text-slate-300 hover:text-[#C6A15B]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE: Premium Pill Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Explore Collection Pill */}
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white transition-all text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-md hover:scale-105"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Explore Collection</span>
            </Link>

            {/* Contact Phone Number Pill */}
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white hover:bg-white hover:text-[#121212] transition-all text-[11px] font-semibold tracking-wider rounded-full border border-white/15 hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{BUSINESS_DETAILS.phone}</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#C6A15B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 space-y-3 shadow-2xl animate-fade-in-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-[#C6A15B] bg-[#C6A15B]/15'
                    : 'text-slate-200 hover:text-[#C6A15B] hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-[#C6A15B] rounded-full"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Collection</span>
              </Link>
              <a
                href={getWhatsAppEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-wider font-semibold text-slate-200 bg-white/10 rounded-full border border-white/10"
              >
                <Phone className="w-4 h-4 text-[#C6A15B]" />
                <span>WhatsApp: {BUSINESS_DETAILS.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

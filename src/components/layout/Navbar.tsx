import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingBag } from 'lucide-react';

import logoMark from '../../assets/logo.png';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Custom Jewellery', path: '/custom-jewellery' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F3]/90 backdrop-blur-md border-b border-[#C6A15B]/20 transition-all">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Brand Integration */}
          <Link to="/" className="flex items-center gap-3.5 sm:gap-4 group py-1">
            {/* Logo Emblem inside refined luxury crest frame */}
            <div className="relative p-1.5 bg-white border border-[#C6A15B]/30 rounded-lg shadow-xs group-hover:border-[#C6A15B] group-hover:shadow-md transition-all duration-300">
              <img 
                src={logoMark} 
                alt="Zeenath Jewellers Logo Emblem" 
                className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-xs"
              />
            </div>
            
            {/* Unified Brand Lockup */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="font-script text-2xl sm:text-3xl text-[#C6A15B] leading-none font-medium">Zeenath</span>
                <span className="font-serif text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#121212] uppercase leading-none">
                  JEWELLERS
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-gray-500 uppercase font-medium mt-1">
                {BUSINESS_DETAILS.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 relative py-1 ${
                  isActive(link.path)
                    ? 'text-[#C6A15B] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                    : 'text-[#121212]/80 hover:text-[#C6A15B]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Explore Collection</span>
            </Link>

            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all text-xs font-semibold uppercase tracking-wider rounded-xs shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_DETAILS.whatsapp}</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#121212] hover:text-[#C6A15B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F3] border-b border-[#C6A15B]/30 px-6 pt-4 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm uppercase tracking-wider font-semibold rounded transition-colors ${
                isActive(link.path)
                  ? 'text-[#C6A15B] bg-[#C6A15B]/10'
                  : 'text-[#121212] hover:text-[#C6A15B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase tracking-wider font-bold text-white bg-[#C6A15B] hover:bg-[#A88645] transition-colors rounded"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp: {BUSINESS_DETAILS.whatsapp}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

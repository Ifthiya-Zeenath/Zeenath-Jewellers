import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const Footer: React.FC = () => {
  const categories = [
    'Rings',
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Wedding Jewellery',
    'Custom Designs',
  ];

  return (
    <footer className="bg-[#FAF8F3] text-[#121212] py-8 border-t border-[#C6A15B]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Compact Main Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-gray-200">
          
          {/* Brand PNG & Short Tagline */}
          <div className="space-y-1">
            <Link to="/" className="inline-block">
              <img 
                src="/zeenathjewellers.png" 
                alt="Zeenath Jewellers" 
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-xs"
              />
            </Link>
            <p className="text-xs font-serif italic text-[#C6A15B]">
              "{BUSINESS_DETAILS.tagline}"
            </p>
          </div>

          {/* Essential Navigation Links */}
          <nav className="flex flex-wrap gap-5 text-xs uppercase tracking-wider font-semibold text-gray-700">
            <Link to="/" className="hover:text-[#C6A15B] transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-[#C6A15B] transition-colors">Shop</Link>
            <Link to="/custom-jewellery" className="hover:text-[#C6A15B] transition-colors">Custom</Link>
            <Link to="/about" className="hover:text-[#C6A15B] transition-colors">About</Link>
            <Link to="/contact" className="hover:text-[#C6A15B] transition-colors">Contact</Link>
          </nav>

          {/* Categories Quick Bar */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-light">
            <span className="font-semibold text-[#121212] uppercase text-[10px] tracking-wider">Categories:</span>
            {categories.map((cat) => (
              <Link key={cat} to="/shop" className="hover:text-[#C6A15B] transition-colors">
                {cat}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href={BUSINESS_DETAILS.social.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-all shadow-2xs"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={BUSINESS_DETAILS.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-all shadow-2xs"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href={BUSINESS_DETAILS.social.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#C6A15B] hover:border-[#C6A15B] transition-all shadow-2xs"
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.88.37z"/>
              </svg>
            </a>
          </div>

        </div>

        {/* Contact Links & Copyright Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 gap-3">
          <div className="flex flex-wrap items-center gap-5 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              {BUSINESS_DETAILS.address}
            </span>
            <a href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-[#C6A15B] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
              {BUSINESS_DETAILS.phone}
            </a>
            <a href={getWhatsAppEnquiryUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#C6A15B] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#C6A15B]" />
              {BUSINESS_DETAILS.email}
            </a>
          </div>

          <p className="text-gray-500 font-light">© {new Date().getFullYear()} {BUSINESS_DETAILS.brandName}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { Sparkles, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export interface DailyGoldRatesProps {
  /** Optional 22K Gold rate string; if undefined, displays placeholder for live market sync */
  rate22k?: string;
  /** Optional 24K Gold rate string; if undefined, displays placeholder for live market sync */
  rate24k?: string;
  /** Optional last updated date/time string */
  lastUpdated?: string;
}

export const DailyGoldRates: React.FC<DailyGoldRatesProps> = ({
  rate22k,
  rate24k,
  lastUpdated,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
      <div className="bg-white rounded-2xl border border-[#C6A15B]/30 shadow-md p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#C6A15B]/10 to-transparent pointer-events-none rounded-full"></div>

        {/* Component Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C6A15B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
                Live Market Rates
              </span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#121212] tracking-wide">
              TODAY'S GOLD RATES
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-light">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>{lastUpdated ? `Updated: ${lastUpdated}` : 'Updated Daily at Boutique'}</span>
          </div>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* 22K Gold Rate Card */}
          <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#C6A15B]/20 flex justify-between items-center group hover:border-[#C6A15B] transition-colors">
            <div>
              <span className="text-xs font-bold text-[#121212] tracking-wider uppercase block">
                22K GOLD
              </span>
              <p className="text-xs text-gray-500 font-light mt-0.5">Hallmarked Standard</p>
            </div>
            <div className="text-right">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#C6A15B] block">
                {rate22k ? `Rs. ${rate22k}` : 'Rs. Daily Market Rate'}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">1 Sovereign / Gram</span>
            </div>
          </div>

          {/* 24K Gold Rate Card */}
          <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#C6A15B]/20 flex justify-between items-center group hover:border-[#C6A15B] transition-colors">
            <div>
              <span className="text-xs font-bold text-[#121212] tracking-wider uppercase block">
                24K GOLD
              </span>
              <p className="text-xs text-gray-500 font-light mt-0.5">Pure Gold Standard</p>
            </div>
            <div className="text-right">
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#C6A15B] block">
                {rate24k ? `Rs. ${rate24k}` : 'Rs. Daily Market Rate'}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">1 Sovereign / Gram</span>
            </div>
          </div>

        </div>

        {/* Footer Disclaimer & Direct WhatsApp Rate Action */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 text-xs text-gray-500">
          <p className="font-light italic text-center sm:text-left flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
            <span>Rates may change according to the daily market.</span>
          </p>

          <a
            href={getWhatsAppEnquiryUrl("Hello Zeenath Jewellers, I would like to get today's live gold rate.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Check Live Rate on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};

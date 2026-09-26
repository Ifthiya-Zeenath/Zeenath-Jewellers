import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClear,
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[#C6A15B] absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search jewellery by name, code, or category..."
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#C6A15B]/30 rounded-xs text-xs text-[#121212] placeholder-gray-400 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/40 transition-all shadow-2xs font-sans"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute right-3 p-1 text-gray-400 hover:text-[#121212] transition-colors"
            title="Clear search"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

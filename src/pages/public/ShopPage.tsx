import React, { useState, useMemo } from 'react';
import { Sparkles, Phone } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import { SearchBar } from '../../components/shop/SearchBar';
import { CategoryFilter } from '../../components/shop/CategoryFilter';
import { SortSelect } from '../../components/shop/SortSelect';
import type { SortOption } from '../../components/shop/SortSelect';
import { ProductCard } from '../../components/shop/ProductCard';
import { EmptyState } from '../../components/shop/EmptyState';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ShopPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Compute category item counts based on search query
  const categoryCounts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const baseProducts = query
      ? MOCK_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.productCode.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        )
      : MOCK_PRODUCTS;

    const counts: Record<string, number> = { All: baseProducts.length };
    baseProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return counts;
  }, [searchQuery]);

  // Filter & Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result: Product[] = [...MOCK_PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'featured':
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('featured');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* EDITORIAL HERO BANNER HEADER */}
      <section className="relative py-12 bg-[#FAF8F3] border-b border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#C6A15B]/30 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#C6A15B] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                  Haute Joaillerie • Colombo 7
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight">
                Explore Our Collection
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Discover certified 22K & 24K gold ornaments crafted with Sri Lankan heritage mastery and modern minimal aesthetics. Every piece is certified for gold purity and hallmarking precision.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right space-y-1 text-xs text-gray-500 font-serif italic border-l border-[#C6A15B]/30 pl-6 py-2">
              <span className="text-[#C6A15B] font-bold not-italic tracking-wider uppercase text-[11px]">
                "{BUSINESS_DETAILS.tagline}"
              </span>
              <span>Flagship Boutique: {BUSINESS_DETAILS.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG & FILTER CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search, Filter & Sort Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xs border border-[#C6A15B]/25 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />

            {/* Sort & Count */}
            <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
              <span className="text-xs font-mono text-gray-500">
                Showing <strong className="text-[#121212] font-semibold">{filteredAndSortedProducts.length}</strong> of {MOCK_PRODUCTS.length} items
              </span>

              <SortSelect currentSort={sortOption} onSortChange={setSortOption} />
            </div>
          </div>

          {/* Category Filter Navigation */}
          <div className="pt-2 border-t border-gray-100">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              productCounts={categoryCounts}
            />
          </div>
        </div>

        {/* Active Filter Pills Indicator */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between bg-[#FAF8F3] px-4 py-2.5 rounded-xs border border-[#C6A15B]/20 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 font-medium">Active Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-[#121212] text-white px-2.5 py-0.5 rounded-xs text-[11px] font-semibold flex items-center gap-1">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#C6A15B] text-white px-2.5 py-0.5 rounded-xs text-[11px] font-semibold flex items-center gap-1">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#C6A15B] font-bold uppercase tracking-wider hover:underline ml-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PRODUCT GRID OR EMPTY STATE */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            onReset={handleResetFilters}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}

        {/* FOOTER DIRECT CONSULTATION BANNER */}
        <div className="bg-[#121212] text-white rounded-xs p-8 sm:p-10 border border-[#C6A15B]/40 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C6A15B] font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Bespoke Custom Orders</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Looking for a Custom Weight or Unique Design?
            </h3>
            <p className="text-xs text-white/70 max-w-xl font-light">
              Send your design references or custom sovereign requirements directly to our master goldsmiths via WhatsApp.
            </p>
          </div>

          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#A88645] transition-all rounded-xs shadow-md whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>

      </section>
    </div>
  );
};

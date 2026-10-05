import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import { getFirestoreProducts } from '../../services/firestoreService';
import { SearchBar } from '../../components/shop/SearchBar';
import { CategoryFilter } from '../../components/shop/CategoryFilter';
import { SortSelect } from '../../components/shop/SortSelect';
import type { SortOption } from '../../components/shop/SortSelect';
import { ProductCard } from '../../components/shop/ProductCard';
import { EmptyState } from '../../components/shop/EmptyState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { DailyGoldRates } from '../../components/home/DailyGoldRates';

export const ShopPage: React.FC = () => {
  useDocumentTitle(
    'Curated Collections | Zeenath Jewellers',
    'Browse our certified 22K & 24K gold jewellery collection including rings, necklaces, earrings, bangles, and bridal sets at Zeenath Jewellers.'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    getFirestoreProducts().then((fsProducts) => {
      if (isMounted && fsProducts.length > 0) {
        const mapped: Product[] = fsProducts.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          craftsmanshipNotes: p.craftsmanshipNotes,
          hallmarkInfo: p.hallmarkInfo,
          price: p.price,
          category: p.category,
          purity: p.purity,
          weight: p.weight,
          productCode: p.productCode,
          image: p.image,
          images: p.images || [p.image],
          featured: p.featured,
          availability: p.availability,
          createdAt: p.createdAt,
        }));
        setProductsList(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute category item counts based on search query
  const categoryCounts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const baseProducts = query
      ? productsList.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.productCode.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        )
      : productsList;

    const counts: Record<string, number> = { All: baseProducts.length };
    baseProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return counts;
  }, [searchQuery, productsList]);

  // Filter & Sort Products
  const filteredAndSortedProducts = useMemo(() => {
    let result: Product[] = [...productsList];

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
    <div className="bg-[#FAF8F3] text-[#121212] min-h-screen pt-28 sm:pt-32 pb-20 selection:bg-[#C6A15B] selection:text-white">
      
      {/* 1. CLEAN EDITORIAL SHOP HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8">
        <span className="font-serif italic text-lg sm:text-xl text-[#C6A15B] block">
          Zeenath Catalogue
        </span>

        {/* EXACT REQUIRED MAIN HEADING */}
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#121212] tracking-wide">
          Curated Collections
        </h1>

        {/* SHORT SUPPORTING TEXT */}
        <p className="text-xs sm:text-sm text-gray-500 font-light max-w-md mx-auto">
          Timeless pieces, crafted to become part of your story.
        </p>
      </section>

      {/* 2. COMPACT PREMIUM GOLD RATE STRIP (Visible near top of Shop Page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <DailyGoldRates />
      </section>

      {/* 3. MAIN CATALOGUE CONTROLS & PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search, Sort, and Category Filter Controls Container */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />

            {/* Item Count & Sort Select */}
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                {filteredAndSortedProducts.length} of {productsList.length} Items
              </span>
              <SortSelect currentSort={sortOption} onSortChange={setSortOption} />
            </div>
          </div>

          {/* Refined Category Pill Filter Buttons */}
          <div className="pt-3 border-t border-gray-100">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              productCounts={categoryCounts}
            />
          </div>
        </div>

        {/* Active Filter Pill Bar */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-full border border-gray-200 text-xs shadow-2xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-400 text-[11px] font-medium">Active Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-[#121212] text-white px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#C6A15B] text-white px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={handleResetFilters}
              className="text-[11px] text-[#C6A15B] font-bold uppercase tracking-wider hover:underline ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. PRODUCT GRID OR PREMIUM EMPTY STATE */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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

        {/* 5. SMALL PREMIUM CLOSING CTA SECTION (DARK OBSIDIAN) */}
        <div className="bg-[#0A0A0A] text-white rounded-3xl p-8 sm:p-12 border border-[#C6A15B]/30 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl my-12 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#C6A15B]/20 border border-[#C6A15B]/30 rounded-full text-[#C6A15B] text-[10px] uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Atelier</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Have a Custom Jewellery Idea?
            </h3>
            <p className="text-xs text-slate-300 font-light">
              Send reference sketches or sovereign specifications directly to our Hambantota master goldsmiths via WhatsApp.
            </p>
          </div>

          <Link
            to="/custom-jewellery"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-full shadow-lg whitespace-nowrap hover:scale-105"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Request Custom Design</span>
          </Link>
        </div>

      </section>
    </div>
  );
};

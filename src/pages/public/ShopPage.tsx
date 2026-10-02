import React, { useState, useEffect, useMemo } from 'react';
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
import { getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ShopPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    getFirestoreProducts().then((fsProducts) => {
      if (isMounted && fsProducts.length > 0) {
        // Map Firestore products to Product interface
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
    <div className="space-y-6 pb-16">
      {/* COMPACT LUXURY CATALOGUE HEADER */}
      <section className="py-5 bg-[#FAF8F3] border-b border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
                Explore Our Collection
              </h1>
              <p className="text-xs text-gray-600 font-light mt-0.5">
                Certified 22K & 24K gold jewellery handcrafted at our Hambantota boutique atelier.
              </p>
            </div>
            <div className="text-[11px] font-mono text-gray-500 whitespace-nowrap bg-white/80 px-3 py-1 border border-[#C6A15B]/20 rounded-xs w-fit">
              Showing <strong className="text-[#121212]">{filteredAndSortedProducts.length}</strong> of {productsList.length} Items
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CATALOGUE & CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Compact Controls Bar: Search, Sorting, and Categories */}
        <div className="bg-white p-4 rounded-xs border border-[#C6A15B]/25 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-2 md:pt-0 border-gray-100">
              <SortSelect currentSort={sortOption} onSortChange={setSortOption} />
            </div>
          </div>

          {/* Category Filters Bar */}
          <div className="pt-2 border-t border-gray-100">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              productCounts={categoryCounts}
            />
          </div>
        </div>

        {/* Active Filter Pill Bar */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center justify-between bg-[#FAF8F3] px-4 py-2 rounded-xs border border-[#C6A15B]/20 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 text-[11px] font-medium">Active Filters:</span>
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
              className="text-[11px] text-[#C6A15B] font-bold uppercase tracking-wider hover:underline ml-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PRODUCT GRID OR EMPTY STATE */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
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

        {/* COMPACT FOOTER WHATSAPP CONSULTATION BANNER */}
        <div className="bg-[#121212] text-white rounded-xs p-6 sm:p-8 border border-[#C6A15B]/40 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C6A15B] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Sovereign Atelier</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Need a Custom Sovereign Weight or Bespoke Design?
            </h3>
            <p className="text-xs text-white/70 max-w-xl font-light">
              Send reference sketches or sovereign specifications directly to our Hambantota goldsmiths via WhatsApp.
            </p>
          </div>

          <a
            href={getWhatsAppEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#A88645] transition-all rounded-xs shadow-md whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>

      </section>
    </div>
  );
};

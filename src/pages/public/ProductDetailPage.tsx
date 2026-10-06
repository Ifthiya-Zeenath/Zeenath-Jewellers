import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  ShieldCheck,
  Tag,
  MapPin,
  ArrowLeft,
  Award,
  Clock,
  Share2,
  Palette,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { getProductById, formatPrice } from '../../data/products';
import type { Product } from '../../data/products';
import { getFirestoreProductById } from '../../services/firestoreService';
import { Breadcrumbs } from '../../components/product/Breadcrumbs';
import { ImageGallery } from '../../components/product/ImageGallery';
import { RelatedProducts } from '../../components/product/RelatedProducts';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'description' | 'craftsmanship' | 'hallmark'>('description');
  const [copied, setCopied] = useState(false);

  const [product, setProduct] = useState<Product | undefined>(() => {
    if (!id) return undefined;
    return getProductById(id);
  });

  useDocumentTitle(
    product ? `${product.name} | Zeenath Jewellers` : 'Jewellery Details | Zeenath Jewellers',
    product?.description
  );
  const [loading, setLoading] = useState<boolean>(!product && Boolean(id));

  useEffect(() => {
    if (!id) return;
    const mockMatch = getProductById(id);
    if (mockMatch) {
      setProduct(mockMatch);
      setLoading(false);
      return;
    }

    // Try fetching from Firestore
    setLoading(true);
    let isMounted = true;
    getFirestoreProductById(id).then((fsItem) => {
      if (isMounted) {
        if (fsItem) {
          setProduct({
            id: fsItem.id,
            name: fsItem.name,
            description: fsItem.description,
            craftsmanshipNotes: fsItem.craftsmanshipNotes,
            hallmarkInfo: fsItem.hallmarkInfo,
            price: fsItem.price,
            category: fsItem.category,
            purity: fsItem.purity,
            weight: fsItem.weight,
            productCode: fsItem.productCode,
            image: fsItem.image,
            images: fsItem.images || [fsItem.image],
            featured: fsItem.featured,
            availability: fsItem.availability,
            createdAt: fsItem.createdAt,
          });
        } else {
          setProduct(undefined);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#FAF8F3] min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-mono">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Luxury 404 State if Product is Not Found
  if (!product) {
    return (
      <div className="bg-[#FAF8F3] min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-white border border-[#C6A15B]/40 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-2xs">
            <Tag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
              Catalog Notice
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#121212]">
              Piece Not Found
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto font-light leading-relaxed">
              The requested jewellery piece (ID: <code className="font-mono text-[#121212]">{id || 'N/A'}</code>) could not be found in our current catalog.
            </p>
          </div>
          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-md hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 text-[#C6A15B]" />
              <span>Return to Shop Collections</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Existing WhatsApp Enquiry Message Generator
  const whatsappMsg = `Hello Zeenath Jewellers, I am interested in ${product.name} (Code: ${product.productCode}). Please share details and today's gold rate.`;
  const whatsappUrl = getWhatsAppEnquiryUrl(whatsappMsg);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FAF8F3] text-[#121212] min-h-screen pt-28 sm:pt-32 pb-20 selection:bg-[#C6A15B] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 2. SUBTLE BREADCRUMB */}
        <Breadcrumbs category={product.category} productName={product.name} />

        {/* 3. HERO TWO-COLUMN EDITORIAL PRODUCT DISPLAY (Desktop 2-Col, Mobile Image First) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ImageGallery product={product} />
          </div>

          {/* Right Column: Product Brand Hierarchy & Details */}
          <div className="lg:col-span-6 space-y-6">

            {/* Header Lockup */}
            <div className="space-y-3 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold text-[#C6A15B] tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  {product.category} • {product.purity}
                </span>

                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full backdrop-blur-md shadow-2xs ${
                    product.availability === 'In Stock'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                      : product.availability === 'Limited Edition'
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-500/30'
                      : 'bg-stone-900/90 text-stone-300 border border-stone-500/30'
                  }`}
                >
                  {product.availability}
                </span>
              </div>

              {/* Product Name (Serif Heading) */}
              <h1 className="font-serif text-2xl sm:text-4xl font-light text-[#121212] leading-tight">
                {product.name}
              </h1>

              {/* Short Factual Description */}
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Price & Daily Gold Rate Relationship */}
              <div className="pt-2 flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-medium">Estimated Price</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C6A15B]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-light italic flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  Subject to daily gold market rate
                </span>
              </div>
            </div>

            {/* COMPACT DAILY GOLD RATES ELEMENT NEAR PRICE */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#C6A15B]/30 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                <span className="font-bold uppercase tracking-wider text-[10px] text-[#121212]">
                  Daily Gold Rates:
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span>22K: <strong className="text-[#C6A15B]">Market Sync</strong></span>
                <span className="text-gray-300">•</span>
                <span>24K: <strong className="text-[#C6A15B]">Market Sync</strong></span>
              </div>
            </div>

            {/* SPECIFICATIONS GRID (Clean Stacked Layout) */}
            <div className="bg-[#FAF8F3] p-5 rounded-xl border border-gray-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Gold Purity</span>
                <strong className="text-[#121212] font-semibold">{product.purity}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Approx. Weight</span>
                <strong className="text-[#121212] font-semibold">{product.weight}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Product Code</span>
                <strong className="font-mono text-[#121212] font-semibold">{product.productCode}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Category</span>
                <strong className="text-[#121212] font-semibold">{product.category}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider font-semibold">Availability</span>
                <strong className="text-[#121212] font-semibold">{product.availability}</strong>
              </div>
            </div>

            {/* PRIMARY ACTION CTAs */}
            <div className="space-y-3 pt-2">
              
              {/* Primary Pill Button: ENQUIRE VIA WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg hover:scale-105 group"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>

              {/* Secondary Actions Row */}
              <div className="flex items-center justify-between gap-3 text-xs pt-1">
                <a
                  href={`tel:${BUSINESS_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-[#121212] hover:text-[#121212] transition-colors text-[11px] font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Call Boutique</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] text-[#C6A15B] hover:text-[#121212] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share Piece'}</span>
                </button>
              </div>

            </div>

            {/* CUSTOM JEWELLERY SECONDARY PROMPT */}
            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-600 font-light">Looking for something unique?</span>
              <Link
                to="/custom-jewellery"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C6A15B] hover:text-[#121212] transition-colors whitespace-nowrap"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Request Custom Jewellery</span>
              </Link>
            </div>

            {/* CONCISE TRUST HIGHLIGHTS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-light">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#C6A15B]" />
                Trusted Local Jeweller
              </span>
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-[#C6A15B]" />
                Custom Orders Available
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                Hambantota Boutique
              </span>
            </div>

          </div>

        </div>

        {/* TABBED INFORMATION (Description, Craftsmanship, Hallmark) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                  : 'text-gray-400 hover:text-[#121212]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${
                activeTab === 'craftsmanship'
                  ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                  : 'text-gray-400 hover:text-[#121212]'
              }`}
            >
              Artisan Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('hallmark')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${
                activeTab === 'hallmark'
                  ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                  : 'text-gray-400 hover:text-[#121212]'
              }`}
            >
              Hallmark Information
            </button>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light min-h-[90px]">
            {activeTab === 'description' && (
              <p>{product.description}</p>
            )}

            {activeTab === 'craftsmanship' && (
              <p>
                {product.craftsmanshipNotes ||
                  'Hand-crafted by master goldsmiths in Hambantota using traditional techniques and certified gold alloys.'}
              </p>
            )}

            {activeTab === 'hallmark' && (
              <p>
                {product.hallmarkInfo ||
                  'Certified hallmarked gold standard backed by Zeenath Atelier purity assurance.'}
              </p>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION ("More From This Collection") */}
        <RelatedProducts currentProduct={product} />

      </div>
    </div>
  );
};

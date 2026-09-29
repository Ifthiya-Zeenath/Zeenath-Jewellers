import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  ShieldCheck,
  Tag,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  Award,
  Clock,
  Share2,
} from 'lucide-react';
import { getProductById, formatPrice } from '../../data/products';
import type { Product } from '../../data/products';
import { getFirestoreProductById } from '../../services/firestoreService';
import { Breadcrumbs } from '../../components/product/Breadcrumbs';
import { ImageGallery } from '../../components/product/ImageGallery';
import { RelatedProducts } from '../../components/product/RelatedProducts';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'description' | 'craftsmanship' | 'hallmark'>('description');
  const [copied, setCopied] = useState(false);

  const [product, setProduct] = useState<Product | undefined>(() => {
    if (!id) return undefined;
    return getProductById(id);
  });
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#C6A15B] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-500 font-mono">Loading product details from catalog...</p>
      </div>
    );
  }

  // Luxury 404 State if Product is Not Found
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#FAF8F3] border border-[#C6A15B]/40 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-2xs">
          <Tag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
            Catalog Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
            Product Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto font-light leading-relaxed">
            The requested jewellery piece (ID: <code className="font-mono text-[#121212]">{id || 'N/A'}</code>) could not be found in our current inventory catalog.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-white hover:bg-[#C6A15B] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#C6A15B]" />
            <span>Return to Shop Collection</span>
          </Link>
        </div>
      </div>
    );
  }

  // WhatsApp Enquiry Message
  const whatsappMsg = `Hello Zeenath Jewellers, I am interested in purchasing/enquiring about ${product.name} (Product Code: ${product.productCode}). Please share available weights and today's gold rate.`;
  const whatsappUrl = getWhatsAppEnquiryUrl(whatsappMsg);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* TOP CONTAINER & BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <Breadcrumbs category={product.category} productName={product.name} />

        {/* HERO TWO-COLUMN EDITORIAL PRODUCT SECTION */}
        <div className="bg-white rounded-xs border border-[#C6A15B]/25 p-5 sm:p-8 lg:p-10 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ImageGallery product={product} />
          </div>

          {/* Right Column: Product Core Specifications */}
          <div className="lg:col-span-6 space-y-6">

            {/* Header Lockup */}
            <div className="space-y-3 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-[#C6A15B] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                  {product.purity}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs backdrop-blur-md shadow-2xs ${product.availability === 'In Stock'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                    : product.availability === 'Limited Edition'
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-500/30'
                      : 'bg-stone-900/90 text-stone-300 border border-stone-500/30'
                    }`}
                >
                  {product.availability}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121212] leading-tight">
                {product.name}
              </h1>

              {/* Price & Gold Sync */}
              <div className="pt-2 flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">Estimated Price</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C6A15B]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-serif italic flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  Daily gold market sync
                </span>
              </div>
            </div>

            {/* Quick Specs Grid Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FAF8F3] p-4 rounded-xs border border-[#C6A15B]/20 text-xs">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Product Code</span>
                <strong className="font-mono text-[#121212] font-semibold">{product.productCode}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Approx Weight</span>
                <strong className="text-[#121212] font-semibold">{product.weight}</strong>
              </div>

              <div>
                <span className="text-gray-400 block text-[9px] uppercase tracking-wider">Category</span>
                <strong className="text-[#121212] font-semibold">{product.category}</strong>
              </div>
            </div>

            {/* Main Action CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md group"
              >
                <Phone className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1 px-1">
                <span className="flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  Direct Goldsmith Sync: {BUSINESS_DETAILS.whatsapp}
                </span>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 text-[11px] text-[#C6A15B] hover:text-[#121212] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share Piece'}</span>
                </button>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>100% Certified 22K & 24K Sri Lankan Gold Hallmarking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Custom Sovereign Adjustments & Bespoke Orders Available</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Boutique Atelier: {BUSINESS_DETAILS.address}</span>
              </div>
            </div>

          </div>

        </div>

        {/* PRODUCT DESCRIPTION & CRAFTSMANSHIP TABS */}
        <div className="bg-white rounded-xs border border-[#C6A15B]/25 p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Tab Selection */}
          <div className="flex items-center gap-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${activeTab === 'description'
                ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                : 'text-gray-500 hover:text-[#121212]'
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('craftsmanship')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${activeTab === 'craftsmanship'
                ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                : 'text-gray-500 hover:text-[#121212]'
                }`}
            >
              Artisan Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('hallmark')}
              className={`pb-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all relative cursor-pointer ${activeTab === 'hallmark'
                ? 'text-[#C6A15B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#C6A15B]'
                : 'text-gray-500 hover:text-[#121212]'
                }`}
            >
              Hallmark Certification
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light min-h-[100px]">
            {activeTab === 'description' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Crafted for heirloom permanence, this piece combines structural stability with fine gold polishing. Every curve and joint is hand-finished to ensure lasting beauty across generations.
                </p>
              </div>
            )}

            {activeTab === 'craftsmanship' && (
              <div className="space-y-3">
                <p>
                  {product.craftsmanshipNotes ||
                    'Hand-crafted by master goldsmiths in Colombo 7 using traditional Sri Lankan techniques alloyed with certified pure precious metals.'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500">
                  <li>Forged with high-density gold wire for structural integrity</li>
                  <li>Micro-beaded and hand-chased surface work</li>
                  <li>High-polish mirror finish resistant to tarnish</li>
                </ul>
              </div>
            )}

            {activeTab === 'hallmark' && (
              <div className="space-y-3">
                <p>
                  {product.hallmarkInfo ||
                    'Stamped with National Assay Office Hallmarking standards and Zeenath Atelier Maker Mark.'}
                </p>
                <div className="p-4 bg-[#FAF8F3] border border-[#C6A15B]/20 rounded-xs space-y-1 text-xs">
                  <span className="font-bold text-[#121212] block">Zeenath Guarantee Certificate</span>
                  <p className="text-gray-500">
                    Guaranteed 91.6% fine gold content for 22K pieces and 99.9% fine gold for 24K pieces. Fully backed by our boutique lifetime exchange and melt value assurance.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <RelatedProducts currentProduct={product} />

      </div>
    </div>
  );
};

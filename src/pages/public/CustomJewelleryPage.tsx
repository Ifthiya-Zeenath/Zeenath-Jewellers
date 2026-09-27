import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Send,
  RotateCcw,
  AlertCircle,
  Gem,
} from 'lucide-react';
import { ImageUploadDropzone } from '../../components/custom/ImageUploadDropzone';
import type { ReferenceImage } from '../../components/custom/ImageUploadDropzone';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';

export interface CustomRequestPayload {
  customerName: string;
  phone: string;
  email: string;
  jewelleryType: string;
  metalType: string;
  budgetRange: string;
  preferredCompletionDate: string;
  designDescription: string;
  specialRequirements: string;
}

export const JEWELLERY_TYPES = [
  'Ring',
  'Necklace',
  'Earrings',
  'Bracelet',
  'Bangle',
  'Pendant',
  'Bridal Jewellery',
  'Jewellery Set',
  'Other',
];

export const METAL_TYPES = ['22K Gold', '24K Gold', 'White Gold', 'Rose Gold'];

export const BUDGET_RANGES = [
  'Under LKR 50,000',
  'LKR 50,000 - 100,000',
  'LKR 100,000 - 250,000',
  'LKR 250,000+',
];

export const CustomJewelleryPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState<CustomRequestPayload>({
    customerName: '',
    phone: '',
    email: '',
    jewelleryType: 'Ring',
    metalType: '22K Gold',
    budgetRange: 'LKR 100,000 - 250,000',
    preferredCompletionDate: '',
    designDescription: '',
    specialRequirements: '',
  });

  const [images, setImages] = useState<ReferenceImage[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomRequestPayload, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on field edit
    if (errors[name as keyof CustomRequestPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Add Reference Images
  const handleAddImages = (fileList: FileList | null) => {
    if (!fileList) return;

    const newImages: ReferenceImage[] = [];
    Array.from(fileList).forEach((file) => {
      if (images.length + newImages.length >= 5) return; // Limit 5 max
      newImages.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      });
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  // Remove Reference Image
  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((img) => img.id !== id);
    });
  };

  // Validate Form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomRequestPayload, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone/WhatsApp number.';
    } else if (!/^[0-9+\s-]{9,}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (at least 9 digits).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.jewelleryType) {
      newErrors.jewelleryType = 'Please select a jewellery type.';
    }

    if (!formData.designDescription.trim()) {
      newErrors.designDescription = 'Please provide a brief description of your design idea.';
    } else if (formData.designDescription.trim().length < 10) {
      newErrors.designDescription = 'Description should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const elem = document.getElementsByName(firstErrorKey)[0];
      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate async network request (Future Firestore & Storage call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 800);
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      jewelleryType: 'Ring',
      metalType: '22K Gold',
      budgetRange: 'LKR 100,000 - 250,000',
      preferredCompletionDate: '',
      designDescription: '',
      specialRequirements: '',
    });
    setImages([]);
    setErrors({});
    setIsSubmitted(false);
  };

  // Build WhatsApp prefilled message for custom request
  const customWhatsAppMessage = `Hello Zeenath Jewellers, I have submitted a custom jewellery request:
- Name: ${formData.customerName}
- Type: ${formData.jewelleryType}
- Metal: ${formData.metalType}
- Budget: ${formData.budgetRange}
- Target Date: ${formData.preferredCompletionDate || 'Flexible'}
- Design: ${formData.designDescription}
Please advise on design consultation and next steps.`;

  const whatsappSubmissionUrl = getWhatsAppEnquiryUrl(customWhatsAppMessage);

  return (
    <div className="space-y-12 pb-20">
      {/* HERO SECTION */}
      <section className="relative py-12 bg-[#FAF8F3] border-b border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#C6A15B]/30 rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                  Bespoke Goldsmithing Atelier • Colombo 7
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121212] tracking-tight">
                Create Your Dream Jewellery
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                Transform your design ideas, bridal trousseau sketches, or family heirlooms into certified hallmarked gold masterworks crafted by master Sri Lankan jewelers.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right space-y-1 text-xs text-gray-500 font-serif italic border-l border-[#C6A15B]/30 pl-6 py-2">
              <span className="text-[#C6A15B] font-bold not-italic tracking-wider uppercase text-[11px]">
                "{BUSINESS_DETAILS.tagline}"
              </span>
              <span>Boutique Atelier: {BUSINESS_DETAILS.address}</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          /* SUCCESS CONFIRMATION PANEL */
          <div className="max-w-3xl mx-auto bg-white rounded-xs border border-[#C6A15B]/40 p-8 sm:p-12 shadow-md space-y-8 text-center my-8">
            <div className="w-16 h-16 bg-[#FAF8F3] border border-[#C6A15B]/40 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-bold">
                Request Prepared
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#121212]">
                Thank You, {formData.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto font-light leading-relaxed">
                Your custom jewellery request for a bespoke <strong>{formData.jewelleryType}</strong> has been saved. Our master goldsmiths at Colombo 7 will review your specifications.
              </p>
            </div>

            {/* Request Summary Box */}
            <div className="bg-[#FAF8F3] p-6 rounded-xs border border-[#C6A15B]/20 text-left text-xs space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#121212] uppercase tracking-wider border-b border-[#C6A15B]/20 pb-2">
                Request Specifications Summary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Customer Name</span>
                  <strong className="text-[#121212]">{formData.customerName}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Contact Phone</span>
                  <strong className="text-[#121212]">{formData.phone}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Jewellery Type</span>
                  <strong className="text-[#121212]">{formData.jewelleryType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Metal Purity</span>
                  <strong className="text-[#121212]">{formData.metalType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Budget Range</span>
                  <strong className="text-[#121212]">{formData.budgetRange}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block">Completion Target</span>
                  <strong className="text-[#121212]">
                    {formData.preferredCompletionDate || 'Flexible / Unspecified'}
                  </strong>
                </div>
              </div>
              {images.length > 0 && (
                <div className="pt-2 border-t border-[#C6A15B]/20 text-gray-600 text-[11px]">
                  <strong>{images.length} Reference Sketches/Photos Attached</strong>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Action & Submit Another Request */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={whatsappSubmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#A88645] transition-all rounded-xs shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Send via WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.18em] rounded-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* MAIN TWO-COLUMN FORM & SUMMARY SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-8 bg-white rounded-xs border border-[#C6A15B]/25 p-6 sm:p-10 shadow-2xs space-y-8">
              <div className="border-b border-gray-100 pb-4 space-y-1">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                  Custom Request Form
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#121212]">
                  Specify Your Jewellery Requirements
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Customer Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                      Full Name <span className="text-[#C6A15B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Priyanthi Perera"
                      className={`w-full px-4 py-2.5 bg-white border text-xs text-[#121212] rounded-xs focus:outline-none transition-colors ${
                        errors.customerName
                          ? 'border-red-500 focus:border-red-500 ring-1 ring-red-200'
                          : 'border-gray-300 focus:border-[#C6A15B]'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                      Phone / WhatsApp Number <span className="text-[#C6A15B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={`e.g. ${BUSINESS_DETAILS.phone}`}
                      className={`w-full px-4 py-2.5 bg-white border text-xs text-[#121212] rounded-xs focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 ring-1 ring-red-200'
                          : 'border-gray-300 focus:border-[#C6A15B]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                    Email Address <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. client@example.com"
                    className={`w-full px-4 py-2.5 bg-white border text-xs text-[#121212] rounded-xs focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 ring-1 ring-red-200'
                        : 'border-gray-300 focus:border-[#C6A15B]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 2. Jewellery Type Options */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-2">
                    Jewellery Type <span className="text-[#C6A15B]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {JEWELLERY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, jewelleryType: type }))}
                        className={`px-3 py-2.5 text-xs font-medium rounded-xs border text-center transition-all cursor-pointer ${
                          formData.jewelleryType === type
                            ? 'bg-[#121212] text-white border-[#121212] shadow-xs'
                            : 'bg-[#FAF8F3] text-gray-700 border-gray-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Metal Type & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                      Metal Purity / Type
                    </label>
                    <select
                      name="metalType"
                      value={formData.metalType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xs text-xs text-[#121212] focus:border-[#C6A15B] focus:outline-none cursor-pointer"
                    >
                      {METAL_TYPES.map((metal) => (
                        <option key={metal} value={metal}>
                          {metal}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xs text-xs text-[#121212] focus:border-[#C6A15B] focus:outline-none cursor-pointer"
                    >
                      {BUDGET_RANGES.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Preferred Completion Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Preferred Completion Date</span>
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="preferredCompletionDate"
                    value={formData.preferredCompletionDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full sm:w-1/2 px-4 py-2.5 bg-white border border-gray-300 rounded-xs text-xs text-[#121212] focus:border-[#C6A15B] focus:outline-none cursor-pointer"
                  />
                </div>

                {/* 5. Design Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                    Design Description & Ideas <span className="text-[#C6A15B]">*</span>
                  </label>
                  <textarea
                    name="designDescription"
                    rows={4}
                    value={formData.designDescription}
                    onChange={handleChange}
                    placeholder="Describe the ornament design, motif preferences, ring size, chain thickness, or sovereign weights you desire..."
                    className={`w-full px-4 py-2.5 bg-white border text-xs text-[#121212] rounded-xs focus:outline-none transition-colors ${
                      errors.designDescription
                        ? 'border-red-500 focus:border-red-500 ring-1 ring-red-200'
                        : 'border-gray-300 focus:border-[#C6A15B]'
                    }`}
                  ></textarea>
                  {errors.designDescription && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.designDescription}
                    </p>
                  )}
                </div>

                {/* 6. Special Requirements */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-1.5">
                    Special Requirements or Engraving <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="specialRequirements"
                    rows={2}
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="Custom name engravings, date inscriptions, gemstone color preferences, or gift packaging instructions..."
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 text-xs text-[#121212] rounded-xs focus:border-[#C6A15B] focus:outline-none"
                  ></textarea>
                </div>

                {/* 7. Design Reference Image Upload */}
                <ImageUploadDropzone
                  images={images}
                  onAddImages={handleAddImages}
                  onRemoveImage={handleRemoveImage}
                />

                {/* Submit Action */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C6A15B] text-white hover:bg-[#A88645] transition-all duration-300 text-xs font-semibold uppercase tracking-[0.2em] rounded-xs shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Request...' : 'Submit Custom Request'}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Right Column: Why Choose Zeenath Card & Direct WhatsApp Banner */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary / Why Choose Card */}
              <div className="bg-[#FAF8F3] rounded-xs border border-[#C6A15B]/30 p-6 space-y-6 shadow-2xs">
                <div className="space-y-1 border-b border-[#C6A15B]/20 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                    Atelier Standard
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#121212]">
                    Why Choose Zeenath
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-gray-700">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Hallmarked Purity
                      </strong>
                      <p className="text-gray-500 font-light mt-0.5">
                        Certified 22K (91.6%) and 24K (99.9%) Sri Lankan gold standard.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Gem className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Master Goldsmith Artistry
                      </strong>
                      <p className="text-gray-500 font-light mt-0.5">
                        Over 40 years of traditional handcrafting & precision 3D CAD modeling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Personalized Consultations
                      </strong>
                      <p className="text-gray-500 font-light mt-0.5">
                        Direct 1-on-1 gold weight guidance and design approval before forging.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Boutique Warranty
                      </strong>
                      <p className="text-gray-500 font-light mt-0.5">
                        Lifetime exchange, finishing, and honest weight pricing guarantees.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Instant Consultation Banner */}
              <div className="bg-[#121212] text-white rounded-xs p-6 border border-[#C6A15B]/40 space-y-4 shadow-md">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#C6A15B] font-bold uppercase tracking-widest block">
                    Instant Goldsmith Sync
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Prefer Direct WhatsApp Consultation?
                  </h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Send photos of your design idea directly to our master jewelers on WhatsApp for an immediate gold estimate.
                  </p>
                </div>

                <a
                  href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, I would like to enquire about a custom gold jewellery order.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#A88645] transition-all rounded-xs shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat: {BUSINESS_DETAILS.whatsapp}</span>
                </a>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

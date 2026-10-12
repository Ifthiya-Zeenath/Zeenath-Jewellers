import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Clock,
  MapPin,
  Palette,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import { ImageUploadDropzone } from '../../components/custom/ImageUploadDropzone';
import type { ReferenceImage } from '../../components/custom/ImageUploadDropzone';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { submitCustomRequestToFirestore } from '../../services/firestoreService';
import { validatePhone, validateEmail } from '../../utils/validation';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import atelierImg from '../../assets/custom-atelier.jpg';

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
  'Below Rs. 25,000',
  'Rs. 25,000 – 50,000',
  'Rs. 50,000 – 100,000',
  'Rs. 100,000 – 250,000',
  'Rs. 250,000 – 500,000',
  'Above Rs. 500,000',
  'Prefer not to say',
];

export const CustomJewelleryPage: React.FC = () => {
  useDocumentTitle(
    'Custom Jewellery | Zeenath Jewellers Hambantota',
    'Design bespoke 22K & 24K gold jewellery with master goldsmiths at Zeenath Jewellers in Hambantota, Sri Lanka. Handcrafted bridal sets, rings, and family heirlooms.'
  );

  // Form State
  const [formData, setFormData] = useState<CustomRequestPayload>({
    customerName: '',
    phone: '',
    email: '',
    jewelleryType: 'Ring',
    metalType: '22K Gold',
    budgetRange: 'Rs. 50,000 – 100,000',
    preferredCompletionDate: '',
    designDescription: '',
    specialRequirements: '',
  });

  const [images, setImages] = useState<ReferenceImage[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomRequestPayload, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Scroll reveal observer for subtle Apple-style entry animations
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isSubmitted]);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error
    if (errors[name as keyof CustomRequestPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (formError) {
      setFormError(null);
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

    const phoneResult = validatePhone(formData.phone);
    if (!phoneResult.isValid) {
      newErrors.phone = phoneResult.error;
    }

    const emailResult = validateEmail(formData.email, true);
    if (!emailResult.isValid) {
      newErrors.email = emailResult.error;
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      setFormError('Please resolve the highlighted fields before submitting.');
      const firstErrorKey = Object.keys(errors)[0];
      const elem = document.getElementsByName(firstErrorKey)[0];
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCustomRequestToFirestore({
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        jewelleryType: formData.jewelleryType,
        metalType: formData.metalType,
        budgetRange: formData.budgetRange,
        preferredCompletionDate: formData.preferredCompletionDate.trim() || undefined,
        designDescription: formData.designDescription.trim(),
        specialRequirements: formData.specialRequirements.trim() || undefined,
      });

      if (res.success) {
        if (res.id) setSubmissionId(res.id);
        setIsSubmitted(true);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        setFormError(
          res.error ||
            'Failed to submit your custom request. Please try again or contact us directly via WhatsApp.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setFormError(`Submission error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      jewelleryType: 'Ring',
      metalType: '22K Gold',
      budgetRange: 'Rs. 50,000 – 100,000',
      preferredCompletionDate: '',
      designDescription: '',
      specialRequirements: '',
    });
    setImages([]);
    setErrors({});
    setFormError(null);
    setSubmissionId(null);
    setIsSubmitted(false);
  };

  // Build WhatsApp prefilled message for custom request
  const customWhatsAppMessage = `Hello Zeenath Jewellers, I have submitted a custom jewellery request:
- Name: ${formData.customerName}
- Phone: ${formData.phone}
- Email: ${formData.email}
- Type: ${formData.jewelleryType}
- Metal: ${formData.metalType}
- Budget: ${formData.budgetRange}
- Target Date: ${formData.preferredCompletionDate || 'Flexible'}
- Design: ${formData.designDescription}
${formData.specialRequirements ? `- Special Requirements: ${formData.specialRequirements}\n` : ''}
Please advise on design consultation and next steps.`;

  const whatsappSubmissionUrl = getWhatsAppEnquiryUrl(customWhatsAppMessage);

  // Crafting Journey Steps
  const craftingSteps = [
    {
      number: '01',
      title: 'Inspiration & Consultation',
      subtitle: 'Share Your Vision',
      desc: 'Submit your design sketch, Pinterest reference, or heirloom idea. We discuss motif details, ring sizing, and personal styling.',
    },
    {
      number: '02',
      title: 'Purity & Weight Guidance',
      subtitle: 'Transparent Estimation',
      desc: 'Select 22K (91.6%) or 24K (99.9%) gold. We provide transparent gram calculations and daily gold rate estimation tailored to your budget.',
    },
    {
      number: '03',
      title: 'Artisan Goldsmithing & CAD',
      subtitle: 'Precision Handcrafting',
      desc: 'Master jewelers forge your piece using traditional Sri Lankan hand carving, filigree, and precision 3D CAD modeling at our Hambantota atelier.',
    },
    {
      number: '04',
      title: 'Certification & Handover',
      subtitle: 'Hallmark Verification',
      desc: 'Every custom jewel undergoes strict purity testing, finishing inspection, and is presented in luxury packaging with boutique assurance.',
    },
  ];

  // Custom Atelier FAQs
  const customFaqs = [
    {
      question: 'Can I bring my own gold or family heirlooms to be remade?',
      answer:
        'Yes. We regularly assist customers with melting down and purifying inherited 22K or 24K gold heirlooms to create new contemporary designs, with honest weight tracking and verified purity.',
    },
    {
      question: 'How long does a bespoke custom jewellery piece take to complete?',
      answer:
        'Standard custom creations typically take 7 to 14 business days, depending on design intricacy and gemstone settings. For wedding dates and urgent bridal occasions, express crafting schedules can be arranged.',
    },
    {
      question: 'How is the pricing for custom jewellery calculated?',
      answer:
        'Pricing is determined transparently: Net gold weight evaluated at current market rates, plus minimal craftsman wastage and making charges. No hidden commissions or unexpected add-ons.',
    },
    {
      question: 'Will I see a design preview before gold crafting begins?',
      answer:
        'Yes. For intricate bridal necklaces, custom rings, and bespoke sets, we discuss dimensions, weight targets, and sketches with you prior to gold forging to ensure complete peace of mind.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#121212] overflow-x-hidden selection:bg-[#C6A15B] selection:text-white">
      
      {/* ====================================================================
          1. HERO SECTION (Dark obsidian background, gold ambient radial glow)
          ==================================================================== */}
      <section className="relative bg-[#121212] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-[#C6A15B]/20 overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C6A15B]/12 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Atelier Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6A15B]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
              Bespoke Goldsmithing Atelier • Hambantota
            </span>
          </div>

          {/* Natural Brand PNG Asset */}
          <div className="flex justify-center pt-1 pb-1">
            <img
              src="/zeenathjewellers.png"
              alt="Zeenath Jewellers"
              className="h-10 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(198,161,91,0.25)]"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Bespoke Gold Jewellery <span className="italic font-normal text-[#C6A15B]">Made For You</span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed">
            Turn your unique vision, bridal sketches, or family heirlooms into certified 22K and 24K gold masterpieces, handcrafted with traditional artisan excellence at our Hambantota boutique atelier.
          </p>

          {/* Quick Pillars Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-center">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C6A15B]">22K & 24K</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Hallmarked Purity</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">Direct Sync</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Artisan Guidance</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C0C0C0]">3D CAD & Wax</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Precision Artistry</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C6A15B]/30 transition-colors">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#C6A15B]">Hambantota</div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Wilmot St Atelier</div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          2. THE BESPOKE JOURNEY (Step-by-step crafting process)
          ==================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C6A15B]/15">
        <div className="text-center space-y-3 mb-14 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
              The Atelier Experience
            </span>
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#121212] tracking-tight">
            How Your Custom Masterpiece Is Created
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
            From your initial sketch to final hallmarked gold delivery, each step is completed with meticulous care and price transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftingSteps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-[#C6A15B]/20 shadow-xs hover:border-[#C6A15B]/60 hover:shadow-md transition-all duration-300 space-y-4 group reveal-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-serif text-2xl font-bold text-[#C6A15B] group-hover:scale-105 transition-transform">
                  {step.number}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  Step {idx + 1}
                </span>
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#121212] group-hover:text-[#C6A15B] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-[#C6A15B] font-medium mt-0.5">
                  {step.subtitle}
                </p>
              </div>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          3. MAIN INTERACTIVE FORM & ATELIER SIDEBAR SECTION
          ==================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isSubmitted ? (
          /* ==================================================================
             SUCCESS CONFIRMATION PANEL (Luxury Certificate Presentation)
             ================================================================== */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-[#C6A15B]/40 p-8 sm:p-14 shadow-xl space-y-8 text-center animate-fade-in-up">
            
            <div className="w-20 h-20 bg-[#FAF8F3] border border-[#C6A15B]/40 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/30 text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Bespoke Request Confirmed</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
                Thank You, {formData.customerName}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto font-light leading-relaxed">
                Your bespoke request for a custom <strong>{formData.jewelleryType}</strong> has been safely recorded in our system. Our master goldsmiths at Wilmot Street will review your specifications.
              </p>
              {submissionId && (
                <p className="text-[11px] font-mono text-gray-500 pt-1">
                  Reference Reference ID: <span className="text-[#121212] font-semibold">{submissionId}</span>
                </p>
              )}
            </div>

            {/* Request Summary Certificate Box */}
            <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-xl border border-[#C6A15B]/25 text-left text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-3">
                <h4 className="font-serif font-bold text-sm text-[#121212] uppercase tracking-wider flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#C6A15B]" />
                  <span>Specification Summary</span>
                </h4>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Status: Pending Review
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Customer Name</span>
                  <strong className="text-[#121212] font-semibold">{formData.customerName}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Contact Phone</span>
                  <strong className="text-[#121212] font-semibold">{formData.phone}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Email Address</span>
                  <strong className="text-[#121212] font-semibold">{formData.email}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Jewellery Type</span>
                  <strong className="text-[#121212] font-semibold">{formData.jewelleryType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Metal Standard</span>
                  <strong className="text-[#121212] font-semibold">{formData.metalType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Estimated Budget</span>
                  <strong className="text-[#C6A15B] font-semibold">{formData.budgetRange}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Completion Target</span>
                  <strong className="text-[#121212] font-semibold">
                    {formData.preferredCompletionDate || 'Flexible / Unspecified'}
                  </strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Reference Attachments</span>
                  <strong className="text-[#121212] font-semibold">
                    {images.length > 0 ? `${images.length} Image(s) Attached` : 'None Provided'}
                  </strong>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C6A15B]/20">
                <span className="text-gray-400 text-[10px] uppercase block font-medium">Design Notes</span>
                <p className="text-gray-700 italic mt-0.5 whitespace-pre-wrap">{formData.designDescription}</p>
              </div>

              {formData.specialRequirements && (
                <div className="pt-2 border-t border-[#C6A15B]/20">
                  <span className="text-gray-400 text-[10px] uppercase block font-medium">Special Requirements</span>
                  <p className="text-gray-700 mt-0.5">{formData.specialRequirements}</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href={whatsappSubmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all rounded-full shadow-lg hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Connect on WhatsApp Now</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.18em] rounded-full cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Request</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-500 font-light">
              <span>Boutique Address: {BUSINESS_DETAILS.address} • Phone: {BUSINESS_DETAILS.phone}</span>
            </div>

          </div>
        ) : (
          /* ==================================================================
             MAIN TWO-COLUMN FORM & ATELIER SUMMARY
             ================================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Controls (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#C6A15B]/25 p-6 sm:p-10 shadow-lg space-y-8">
              
              <div className="border-b border-gray-100 pb-5 space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/30 text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-bold">
                  <Palette className="w-3 h-3" />
                  <span>Custom Commission Form</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
                  Specify Your Jewellery Requirements
                </h2>
                <p className="text-xs text-gray-500 font-light">
                  Please provide details about your desired gold design. Our master goldsmith will review your request and get in touch with personalized options.
                </p>
              </div>

              {/* In-Page Form Error Alert Banner */}
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-start gap-3 text-xs animate-fade-in-up">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Unable to Submit Request</p>
                    <p className="text-red-700 font-light mt-0.5">{formError}</p>
                  </div>
                </div>
              )}

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
                      className={`w-full px-4 py-3 bg-white border text-xs text-[#121212] rounded-xl focus:outline-none transition-all ${
                        errors.customerName
                          ? 'border-red-500 focus:border-red-500 ring-2 ring-red-100'
                          : 'border-gray-200 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15'
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
                      className={`w-full px-4 py-3 bg-white border text-xs text-[#121212] rounded-xl focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 ring-2 ring-red-100'
                          : 'border-gray-200 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15'
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
                    className={`w-full px-4 py-3 bg-white border text-xs text-[#121212] rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 ring-2 ring-red-100'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 2. Jewellery Type Options Grid */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212] mb-2">
                    Jewellery Type <span className="text-[#C6A15B]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {JEWELLERY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, jewelleryType: type }));
                          if (errors.jewelleryType) {
                            setErrors((prev) => ({ ...prev, jewelleryType: undefined }));
                          }
                        }}
                        className={`px-3.5 py-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          formData.jewelleryType === type
                            ? 'bg-[#121212] text-white border-[#C6A15B] shadow-md ring-1 ring-[#C6A15B]/30'
                            : 'bg-[#FAF8F3] text-gray-700 border-gray-200 hover:border-[#C6A15B] hover:text-[#C6A15B]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {errors.jewelleryType && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {errors.jewelleryType}
                    </p>
                  )}
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#121212] focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15 focus:outline-none cursor-pointer"
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
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#121212] focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15 focus:outline-none cursor-pointer"
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
                    className="w-full sm:w-1/2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-[#121212] focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15 focus:outline-none cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    Helpful for upcoming weddings, anniversaries, or special gift occasions.
                  </p>
                </div>

                {/* 5. Design Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#121212]">
                      Design Description & Ideas <span className="text-[#C6A15B]">*</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {formData.designDescription.length} characters
                    </span>
                  </div>
                  <textarea
                    name="designDescription"
                    rows={4}
                    value={formData.designDescription}
                    onChange={handleChange}
                    placeholder="Describe your design vision, motif preferences (e.g. traditional peacock, floral, filigree, modern minimalist), ring sizing, preferred sovereign weight, or chain gauge..."
                    className={`w-full px-4 py-3 bg-white border text-xs text-[#121212] rounded-xl focus:outline-none transition-all ${
                      errors.designDescription
                        ? 'border-red-500 focus:border-red-500 ring-2 ring-red-100'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15'
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
                    placeholder="Custom name engravings, anniversary date inscriptions, gemstone color choices, or bridal box packaging..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-xs text-[#121212] rounded-xl focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/15 focus:outline-none"
                  ></textarea>
                </div>

                {/* 7. Design Reference Image Upload Dropzone */}
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
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg hover:shadow-xl hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Custom Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-gray-500 font-light mt-3">
                    Submitting this form creates a saved request for our Hambantota atelier. No payment is required until design approval.
                  </p>
                </div>

              </form>
            </div>

            {/* Right Column: Atelier Standards, Visuals & Direct WhatsApp (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Atelier Visual Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 shadow-lg bg-[#080808] group">
                <img
                  src={atelierImg}
                  alt="Zeenath Jewellers Goldsmith Atelier"
                  className="w-full h-56 sm:h-64 object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-[#C6A15B]/40 text-[9px] uppercase font-bold tracking-widest text-[#C6A15B] backdrop-blur-md">
                    <span>Hambantota Flagship</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Master Goldsmith Atelier
                  </h4>
                  <p className="text-[11px] text-gray-300 font-light">
                    Wilmot Street, Hambantota • Traditional Goldsmithing & 3D CAD
                  </p>
                </div>
              </div>

              {/* Atelier Standards / Why Choose Zeenath Card */}
              <div className="bg-[#FAF8F3] rounded-2xl border border-[#C6A15B]/30 p-6 sm:p-7 space-y-6 shadow-xs">
                <div className="space-y-1 border-b border-[#C6A15B]/20 pb-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C6A15B] font-bold">
                    Atelier Standards
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#121212]">
                    Why Choose Zeenath
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5 shadow-2xs">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Hallmarked Purity Standards
                      </strong>
                      <p className="text-gray-600 font-light mt-0.5 leading-relaxed">
                        Certified 22K (91.6%) and 24K (99.9%) Sri Lankan gold standards with verified karat purity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5 shadow-2xs">
                      <Gem className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Master Artisan Goldsmithing
                      </strong>
                      <p className="text-gray-600 font-light mt-0.5 leading-relaxed">
                        Generations of traditional handcrafting combined with modern precision 3D CAD modeling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5 shadow-2xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Direct 1-on-1 Consultation
                      </strong>
                      <p className="text-gray-600 font-light mt-0.5 leading-relaxed">
                        Transparent gold weight guidance, market rates, and design approval before forging begins.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-serif text-sm font-bold text-[#121212] block">
                        Boutique Lifetime Care
                      </strong>
                      <p className="text-gray-600 font-light mt-0.5 leading-relaxed">
                        Honest weight pricing, lifetime finishing, polishing, and exchange confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Instant Consultation Banner */}
              <div className="bg-[#121212] text-white rounded-2xl p-6 sm:p-7 border border-[#C6A15B]/40 space-y-4 shadow-xl">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] text-[#C6A15B] font-bold uppercase tracking-widest">
                    <MessageSquare className="w-3 h-3" />
                    <span>Instant Goldsmith Sync</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Prefer Direct WhatsApp Consultation?
                  </h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Have photos, sketches, or reference links right now? Chat directly with our master jewelers on WhatsApp for immediate guidance.
                  </p>
                </div>

                <a
                  href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, I would like to consult with a master goldsmith regarding a custom gold jewellery design.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#C6A15B] to-[#A88645] hover:from-[#DFBA73] hover:to-[#C6A15B] text-white font-bold text-xs uppercase tracking-[0.18em] transition-all rounded-full shadow-md hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span>Chat: {BUSINESS_DETAILS.whatsapp}</span>
                </a>
              </div>

              {/* Boutique Flagship Visiting Details */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-3.5 text-xs text-gray-700 shadow-xs">
                <h4 className="font-serif font-bold text-sm text-[#121212] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C6A15B]" />
                  <span>Flagship Boutique Atelier</span>
                </h4>
                <div className="space-y-2 text-gray-600 font-light">
                  <p>
                    <strong className="text-[#121212] font-semibold">Address:</strong> {BUSINESS_DETAILS.address}
                  </p>
                  <p>
                    <strong className="text-[#121212] font-semibold">Phone:</strong> {BUSINESS_DETAILS.phone}
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                    <span>{BUSINESS_DETAILS.hours.weekdays}</span>
                  </p>
                  <p className="text-gray-500 pl-5 text-[11px]">
                    {BUSINESS_DETAILS.hours.weekends}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    to="/contact"
                    className="text-[#C6A15B] hover:text-[#A88645] font-semibold text-[11px] uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    <span>View Map & Boutique Hours</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}
      </section>

      {/* ====================================================================
          4. CUSTOM GOLDSMITHING FAQ SECTION
          ==================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#C6A15B]/15">
        <div className="text-center space-y-3 mb-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
              Frequently Asked Questions
            </span>
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
            Custom Gold Jewellery Inquiries
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {customFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-200/80 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#121212]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6A15B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-gray-500 font-serif italic">
          <span>"{BUSINESS_DETAILS.tagline}" • Flagship boutique located at {BUSINESS_DETAILS.address}</span>
        </div>
      </section>

    </div>
  );
};

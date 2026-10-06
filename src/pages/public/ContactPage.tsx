import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { submitEnquiryToFirestore } from '../../services/firestoreService';
import { validatePhone, validateEmail } from '../../utils/validation';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ContactPage: React.FC = () => {
  useDocumentTitle(
    'Contact Us | Zeenath Jewellers Hambantota',
    'Get in touch with Zeenath Jewellers in Hambantota, Sri Lanka. Contact us via WhatsApp, phone, email, or visit our boutique for 22K gold enquiries and custom designs.'
  );

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [fieldErrors, setFieldErrors] = useState<{
    customerName?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Scroll reveal observer for Apple-style motion
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const newFieldErrors: typeof fieldErrors = {};

    if (!customerName.trim()) {
      newFieldErrors.customerName = 'Please enter your full name.';
    }

    const phoneVal = validatePhone(phone);
    if (!phoneVal.isValid) {
      newFieldErrors.phone = phoneVal.error;
    }

    const emailVal = validateEmail(email, false);
    if (!emailVal.isValid) {
      newFieldErrors.email = emailVal.error;
    }

    if (!message.trim()) {
      newFieldErrors.message = 'Please enter your enquiry message.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setFormError('Please resolve the highlighted fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitEnquiryToFirestore({
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        message: message.trim(),
      });

      if (res.success) {
        setIsSubmitted(true);
        setCustomerName('');
        setPhone('');
        setEmail('');
        setMessage('');
        setFieldErrors({});
      } else {
        setFormError(res.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setFormError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Zeenath Jewellers No. 31 Wilmot Street Hambantota Sri Lanka'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#121212] overflow-x-hidden selection:bg-[#C6A15B] selection:text-white">
      
      {/* ====================================================================
          1. CONTACT HERO (DARK obsidian background with gold radial glow)
          ==================================================================== */}
      <section className="relative bg-[#121212] text-white pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C6A15B]/20 overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#C6A15B]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          {/* Sub-tag badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6A15B]/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
              Boutique Consultation & Enquiries
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
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Get in <span className="italic font-normal text-[#C6A15B]">Touch</span>
          </h1>

          {/* Concise Supporting Copy */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            We're here to help you find something timeless. Reach out via WhatsApp, phone, email, or visit our Hambantota boutique.
          </p>
        </div>
      </section>

      {/* ====================================================================
          2. PRIMARY CONTACT ACTIONS (LIGHT background with 4 action cards)
          ==================================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          
          {/* Action 1: WHATSAPP (PRIMARY CTA - Visually strongest) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C6A15B]/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Fastest Response</span>
                <h3 className="font-serif text-lg font-bold text-[#121212] mt-0.5">WhatsApp Direct</h3>
                <p className="text-xs text-gray-600 font-light mt-1">
                  Instant response for gold rate updates, product enquiries, and custom designs.
                </p>
              </div>
            </div>

            <a
              href={getWhatsAppEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#C6A15B] hover:bg-[#A88645] text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-colors duration-300 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Action 2: CALL BOUTIQUE (SECONDARY CTA) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-[#C6A15B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#121212] group-hover:text-[#C6A15B] transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Direct Line</span>
                <h3 className="font-serif text-lg font-bold text-[#121212] mt-0.5">Phone Call</h3>
                <p className="text-xs text-gray-600 font-light mt-1">
                  {BUSINESS_DETAILS.phone}
                </p>
              </div>
            </div>

            <a
              href={`tel:${BUSINESS_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#121212] hover:bg-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call Zeenath</span>
            </a>
          </div>

          {/* Action 3: EMAIL CONSULTATION */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-[#C6A15B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#121212] group-hover:text-[#C6A15B] transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Written Request</span>
                <h3 className="font-serif text-lg font-bold text-[#121212] mt-0.5">Email Us</h3>
                <p className="text-xs text-gray-600 font-light mt-1 break-all">
                  {BUSINESS_DETAILS.email}
                </p>
              </div>
            </div>

            <a
              href={`mailto:${BUSINESS_DETAILS.email}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FAF8F3] hover:bg-[#121212] text-[#121212] hover:text-white border border-gray-300 hover:border-[#121212] font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-[#C6A15B]" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Action 4: BOUTIQUE LOCATION */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-[#C6A15B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] group-hover:bg-[#121212] group-hover:text-[#C6A15B] transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Visit Boutique</span>
                <h3 className="font-serif text-lg font-bold text-[#121212] mt-0.5">Hambantota Store</h3>
                <p className="text-xs text-gray-600 font-light mt-1">
                  {BUSINESS_DETAILS.address}
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FAF8F3] hover:bg-[#121212] text-[#121212] hover:text-white border border-gray-300 hover:border-[#121212] font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4 text-[#C6A15B]" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>

        {/* Compact Daily Gold Rate Banner Indicator */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#C6A15B]/20 flex flex-wrap items-center justify-between gap-4 text-xs reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-gray-700">Daily Gold Rate Updates Available</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 font-light">22K & 24K Sri Lankan Gold</span>
          </div>
          <a
            href={getWhatsAppEnquiryUrl('Hello Zeenath Jewellers, please share today\'s 22K and 24K gold rates.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#C6A15B] hover:underline flex items-center gap-1"
          >
            <span>Ask for Today's Rate via WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ====================================================================
          3. CONTACT FORM & BOUTIQUE HOURS (LIGHT background)
          ==================================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Luxury Consultation Form (8 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
                Boutique Enquiry
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                Please complete the form below. Our boutique team will review your enquiry promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-[#FAF8F3] border border-[#C6A15B]/40 rounded-2xl p-8 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#121212]">Enquiry Submitted</h3>
                  <p className="text-xs text-gray-600 font-light max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Zeenath Jewellers. Our team will review your message and contact you via phone or WhatsApp shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#121212] hover:bg-[#C6A15B] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {formError && (
                  <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (fieldErrors.customerName) setFieldErrors((prev) => ({ ...prev, customerName: undefined }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF8F3] border rounded-xl focus:outline-none transition-colors ${
                      fieldErrors.customerName
                        ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:bg-white'
                    }`}
                    required
                  />
                  {fieldErrors.customerName && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.customerName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#C6A15B]">*</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder={`e.g. ${BUSINESS_DETAILS.phone}`}
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF8F3] border rounded-xl focus:outline-none transition-colors ${
                      fieldErrors.phone
                        ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:bg-white'
                    }`}
                    required
                  />
                  {fieldErrors.phone && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="zeenathjewellers22@gmail.com"
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF8F3] border rounded-xl focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:bg-white'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Message or Jewellery Enquiry <span className="text-[#C6A15B]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Tell us about the gold piece, ring size, bridal set, or custom jewellery design you require..."
                    className={`w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF8F3] border rounded-xl focus:outline-none transition-colors ${
                      fieldErrors.message
                        ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                        : 'border-gray-200 focus:border-[#C6A15B] focus:bg-white'
                    }`}
                    required
                  ></textarea>
                  {fieldErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#121212] hover:bg-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-colors duration-300 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C6A15B]" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Boutique Information, Hours & Socials (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-150">
            
            {/* Hours Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A15B]">Flagship Hours</span>
                  <h3 className="font-serif font-bold text-lg text-[#121212]">Opening Hours</h3>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-gray-900">Monday – Saturday</span>
                  <span className="font-mono text-gray-600 bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-gray-200">
                    8:30 AM – 6:30 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium text-gray-900">Sunday</span>
                  <span className="font-mono text-gray-600 bg-[#FAF8F3] px-2.5 py-1 rounded-md border border-gray-200">
                    8:30 AM – 1:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-[#121212]">Follow Our Collection</h4>
              <p className="text-xs text-gray-500 font-light">
                Stay updated with new 22K gold designs and showcase pieces on social channels.
              </p>

              <div className="pt-2 flex flex-col space-y-2">
                <a
                  href={BUSINESS_DETAILS.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] hover:bg-[#121212] hover:text-white group transition-all duration-300 text-xs font-medium text-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C6A15B]" />
                </a>

                <a
                  href={BUSINESS_DETAILS.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] hover:bg-[#121212] hover:text-white group transition-all duration-300 text-xs font-medium text-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C6A15B]" />
                </a>

                <a
                  href={BUSINESS_DETAILS.social.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] hover:bg-[#121212] hover:text-white group transition-all duration-300 text-xs font-medium text-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.88.37z"/>
                    </svg>
                    <span>TikTok</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#C6A15B]" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          4. BOUTIQUE LOCATION SECTION (DARK obsidian banner)
          ==================================================================== */}
      <section className="bg-[#121212] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#C6A15B]/20">
        <div className="max-w-5xl mx-auto text-center space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#C6A15B]/30">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6A15B]">
              Hambantota Boutique Location
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Visit Us in Person
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
            {BUSINESS_DETAILS.brandName}
            <br />
            {BUSINESS_DETAILS.address}
            <br />
            {BUSINESS_DETAILS.location}
          </p>

          <div className="pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C6A15B] hover:bg-[#A88645] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. CUSTOM JEWELLERY CTA (LIGHT background)
          ==================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-5 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#C6A15B]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C6A15B]">
              Bespoke Jewellery Request
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212]">
            Looking for something unique?
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-md mx-auto leading-relaxed">
            Bring your idea to life with a custom jewellery design. Work directly with our goldsmiths to craft custom rings, bangles, and bridal pieces.
          </p>

          <div className="pt-2">
            <Link
              to="/custom-jewellery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] hover:bg-[#C6A15B] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-300 shadow-md"
            >
              <span>Start Custom Design</span>
              <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

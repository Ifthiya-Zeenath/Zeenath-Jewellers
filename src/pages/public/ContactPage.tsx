import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS_DETAILS, getWhatsAppEnquiryUrl } from '../../constants/businessDetails';
import { submitEnquiryToFirestore } from '../../services/firestoreService';
import { validatePhone, validateEmail } from '../../utils/validation';

export const ContactPage: React.FC = () => {
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
      setFormError('Please resolve the errors below before submitting.');
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">Visit Our Boutique</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#121212]">
          Contact {BUSINESS_DETAILS.brandName}
        </h1>
        <p className="text-sm text-gray-600 font-serif italic text-lg">
          "{BUSINESS_DETAILS.tagline}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-[#121212] text-white rounded-xl p-8 sm:p-10 border border-[#C6A15B]/40 space-y-8 flex flex-col justify-between shadow-lg">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#C6A15B]">Boutique Information</h3>
            
            <ul className="space-y-6 text-xs sm:text-sm text-white/80">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Store Address</p>
                  <p className="text-xs text-white/70 mt-0.5">{BUSINESS_DETAILS.address}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#C6A15B] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Phone & WhatsApp</p>
                  <a href={getWhatsAppEnquiryUrl()} className="text-xs text-[#C6A15B] hover:underline mt-0.5 block font-bold">
                    {BUSINESS_DETAILS.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#C6A15B] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <a href={`mailto:${BUSINESS_DETAILS.email}`} className="text-xs text-[#C6A15B] hover:underline mt-0.5 block">
                    {BUSINESS_DETAILS.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#C6A15B] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Boutique Hours</p>
                  <p className="text-xs text-white/70 mt-0.5">{BUSINESS_DETAILS.hours.weekdays}</p>
                  <p className="text-xs text-white/50">{BUSINESS_DETAILS.hours.weekends}</p>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_DETAILS.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#C6A15B] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{BUSINESS_DETAILS.social.facebook}</span>
              </a>
              <a
                href={BUSINESS_DETAILS.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#C6A15B] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{BUSINESS_DETAILS.social.instagram}</span>
              </a>
              <a
                href={BUSINESS_DETAILS.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-[#C6A15B] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#C6A15B]" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.86a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 1 0 15.7 12V8.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.88.37z"/>
                </svg>
                <span>{BUSINESS_DETAILS.social.tiktok}</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs text-white/60">
            <p>{BUSINESS_DETAILS.brandName} — "{BUSINESS_DETAILS.tagline}"</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-[#C6A15B]/30 p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#121212]">Send Us an Enquiry</h3>

          {isSubmitted ? (
            <div className="bg-[#FAF8F3] border border-[#C6A15B]/30 rounded-lg p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-lg text-[#121212]">Enquiry Submitted</h4>
                <p className="text-xs text-gray-600">
                  Thank you for reaching out to Zeenath Jewellers. Our team will review your message and contact you shortly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 bg-[#121212] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer hover:bg-[#C6A15B] transition-colors"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {formError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (fieldErrors.customerName) setFieldErrors((prev) => ({ ...prev, customerName: undefined }));
                  }}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2.5 text-xs border rounded focus:outline-none ${
                    fieldErrors.customerName
                      ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#C6A15B]'
                  }`}
                  required
                />
                {fieldErrors.customerName && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder={`e.g. ${BUSINESS_DETAILS.phone}`}
                  className={`w-full px-4 py-2.5 text-xs border rounded focus:outline-none ${
                    fieldErrors.phone
                      ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#C6A15B]'
                  }`}
                  required
                />
                {fieldErrors.phone && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="zeenathjewellers22@gmail.com"
                  className={`w-full px-4 py-2.5 text-xs border rounded focus:outline-none ${
                    fieldErrors.email
                      ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#C6A15B]'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Message or Jewellery Requirements *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Tell us about the gold design, bridal set, or custom piece you require..."
                  className={`w-full px-4 py-2.5 text-xs border rounded focus:outline-none ${
                    fieldErrors.message
                      ? 'border-red-500 ring-1 ring-red-200 focus:border-red-500'
                      : 'border-gray-300 focus:border-[#C6A15B]'
                  }`}
                  required
                ></textarea>
                {fieldErrors.message && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C6A15B] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#A88645] transition-colors rounded shadow disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * TEMPORARY BUSINESS DETAILS & CONSTANTS
 * ============================================================================
 * IMPORTANT: The business contact details, social links, and physical address
 * below are TEMPORARY / PLACEHOLDER information for the setup phase.
 * 
 * Update this centralized configuration file whenever real client details are provided.
 * ============================================================================
 */

export const BUSINESS_DETAILS = {
  // Official Brand Identity
  brandName: 'Zeenath Jewellers',
  tagline: 'Your gold partner for life.',

  // Temporary Business Contact Information
  phone: '0776539462',
  whatsapp: '0776539462',
  whatsappNumberClean: '94776539462',
  whatsappUrl: 'https://wa.me/94776539462',
  email: 'ifthi@gmail.com',
  address: '65, Bay Street, Colombo 7',
  location: 'Colombo 7, Sri Lanka',

  // Temporary Social Handles & Links
  social: {
    facebook: 'ifthfb',
    facebookUrl: 'https://facebook.com/ifthfb',
    instagram: 'ifthis',
    instagramUrl: 'https://instagram.com/ifthis',
  },

  // Boutique Hours
  hours: {
    weekdays: 'Monday - Saturday: 9:30 AM - 6:30 PM',
    weekends: 'Sunday: By Appointment Only',
  },
};

/**
 * Helper to build custom WhatsApp enquiry links with pre-filled message text
 */
export const getWhatsAppEnquiryUrl = (message?: string): string => {
  const defaultMsg = 'Hello Zeenath Jewellers, I would like to enquire about your gold jewellery collection.';
  const msg = message ? message : defaultMsg;
  return `https://wa.me/${BUSINESS_DETAILS.whatsappNumberClean}?text=${encodeURIComponent(msg)}`;
};

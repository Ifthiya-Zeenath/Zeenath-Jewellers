/**
 * ============================================================================
 * Centralized Business Details & Contact Configuration
 * ============================================================================
 * Temporary business details - replace before production.
 * 
 * Note: Phone, WhatsApp, Email, Address, Facebook, and Instagram details below
 * are temporary placeholders and will change before production.
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

/**
 * Helper to build custom WhatsApp link targeting a customer's phone number
 */
export const getCustomerWhatsAppUrl = (
  customerPhone: string,
  customerName?: string,
  jewelleryType?: string
): string => {
  let cleanPhone = customerPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '94' + cleanPhone.substring(1);
  }
  const defaultMsg = customerName
    ? `Hello ${customerName}, this is Zeenath Jewellers regarding your custom ${jewelleryType || 'jewellery'} request.`
    : 'Hello, this is Zeenath Jewellers regarding your custom jewellery request.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;
};

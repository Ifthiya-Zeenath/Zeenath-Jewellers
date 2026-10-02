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

  // Official Business Contact Information
  phone: '+94 77 93 26 428',
  whatsapp: '+94 77 93 26 428',
  whatsappNumberClean: '94779326428',
  whatsappUrl: 'https://wa.me/94779326428',
  email: 'zeenathjewellers22@gmail.com',
  address: 'No.31, Wilmot Street, Hambantota.',
  location: 'Hambantota, Sri Lanka',

  // Official Social Media Links
  social: {
    facebook: 'Facebook',
    facebookUrl: 'https://www.facebook.com/share/1C26Rr5oWe/?mibextid=wwXIfr',
    instagram: 'Instagram',
    instagramUrl: 'https://www.instagram.com/zeenathjewellers?stkn=aGllbzg0ZHdrY29q&utm_source=qr',
    tiktok: 'TikTok',
    tiktokUrl: 'https://www.tiktok.com/@zeenathjewellers.lk?_r=1&_t=ZS-9ABgt5FCdBV',
  },

  // Boutique Hours
  hours: {
    weekdays: 'Monday – Saturday: 8:30 AM – 6:30 PM',
    weekends: 'Sunday: 8:30 AM – 1:00 PM',
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

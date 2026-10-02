/**
 * Validation utilities for Sri Lankan phone numbers and email addresses.
 */

/**
 * Validates a phone number, tailored for Sri Lankan formats and standard international formats.
 * Accepts formats like:
 * - 0779326428 (10 digits starting with 0)
 * - +94779326428 (with +94 prefix)
 * - 94779326428 (with 94 prefix)
 * - 077 93 26 428 / +94 77 93 26 428 (formatted with spaces/dashes)
 */
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your phone or WhatsApp number.' };
  }

  // Remove spaces, dashes, and parentheses for format checking
  const cleaned = trimmed.replace(/[\s\-\(\)]/g, '');

  // Sri Lankan phone number patterns:
  // Starts with 0 followed by 9 digits (total 10 digits), e.g., 0779326428
  // Starts with +94 followed by 9 digits (total 12 chars), e.g., +94779326428
  // Starts with 94 followed by 9 digits (total 11 digits), e.g., 94779326428
  // Or standard international number starting with + and 10-15 digits
  const isSriLankanFormat = /^(?:\+94|94|0)\d{9}$/.test(cleaned);
  const isGeneralIntlFormat = /^\+\d{10,15}$/.test(cleaned);

  if (!isSriLankanFormat && !isGeneralIntlFormat) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number (e.g. 0779326428 or +94779326428).',
    };
  }

  return { isValid: true };
};

/**
 * Validates an email address.
 * Accepts real email formats such as zeenathjewellers22@gmail.com, customer@example.com, work@company.lk.
 */
export const validateEmail = (
  email: string,
  isRequired: boolean = false
): { isValid: boolean; error?: string } => {
  const trimmed = email.trim();
  if (!trimmed) {
    if (isRequired) {
      return { isValid: false, error: 'Please enter your email address.' };
    }
    return { isValid: true };
  }

  // Standard email validation regex matching RFC 5322 specs for domain and TLDs
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g. customer@example.com).',
    };
  }

  return { isValid: true };
};

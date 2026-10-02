import { useEffect } from 'react';

/**
 * Custom React hook for dynamic page titles and meta descriptions
 */
export const useDocumentTitle = (title: string, description?: string) => {
  useEffect(() => {
    // Update browser tab document title
    if (title) {
      document.title = title;
    }

    // Update meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }

      // Also update og:description for social sharing
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);
};

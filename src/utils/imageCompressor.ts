/**
 * ============================================================================
 * Image Compression & Optimization Utility
 * ============================================================================
 * Converts client-side uploaded files into persistent, compressed Data URLs
 * (WebP / JPEG format) suitable for direct Cloud Firestore persistence without
 * requiring the Firebase Blaze plan or external paid third-party storage.
 * ============================================================================
 */

export interface ProcessedImageResult {
  dataUrl: string;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  format: string;
}

const MAX_DIMENSION = 1000; // 1000px max width or height preserves fine jewellery details
const COMPRESSION_QUALITY = 0.8;
const MAX_RAW_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB raw file limit

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/gif',
];

/**
 * Validates whether an uploaded file is an allowed image format and under size limit
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file provided.' };
  }

  const isTypeAllowed =
    ALLOWED_MIME_TYPES.includes(file.type.toLowerCase()) ||
    /\.(jpe?g|png|webp|heic|gif)$/i.test(file.name);

  if (!isTypeAllowed) {
    return {
      valid: false,
      error: `"${file.name}" is not a supported image format. Please upload JPG, PNG, WEBP, or HEIC.`,
    };
  }

  if (file.size > MAX_RAW_SIZE_BYTES) {
    return {
      valid: false,
      error: `"${file.name}" exceeds the 10MB file limit. Please select a smaller photo or sketch.`,
    };
  }

  return { valid: true };
};

/**
 * Compresses an image file via HTMLCanvas to an optimized WebP or JPEG Data URL.
 */
export const compressImageToDataUrl = (file: File): Promise<ProcessedImageResult> => {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return reject(new Error(validation.error || 'Invalid image file.'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error(`Failed to read file "${file.name}".`));
    };

    reader.onload = () => {
      const img = new Image();

      img.onerror = () => {
        reject(
          new Error(
            `Unable to decode image "${file.name}". The file may be corrupted or an unsupported format.`
          )
        );
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Compute aspect ratio scaling
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
              height = Math.round((height * MAX_DIMENSION) / width);
              width = MAX_DIMENSION;
            } else {
              width = Math.round((width * MAX_DIMENSION) / height);
              height = MAX_DIMENSION;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('Canvas 2D rendering context not available.'));
          }

          // Draw with high image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Attempt WebP export, falling back to JPEG if browser doesn't support WebP export
          let format = 'image/webp';
          let dataUrl = canvas.toDataURL(format, COMPRESSION_QUALITY);

          if (!dataUrl.startsWith('data:image/webp')) {
            format = 'image/jpeg';
            dataUrl = canvas.toDataURL(format, COMPRESSION_QUALITY);
          }

          // Estimate approximate size from Base64 string length
          const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
          const compressedSize = Math.round((base64Length * 3) / 4);

          resolve({
            dataUrl,
            originalName: file.name,
            originalSize: file.size,
            compressedSize,
            width,
            height,
            format,
          });
        } catch (err) {
          reject(
            err instanceof Error
              ? err
              : new Error(`Compression failed for "${file.name}".`)
          );
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
};

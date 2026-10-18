import React, { useState } from 'react';
import { Upload, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { compressImageToDataUrl, validateImageFile } from '../../utils/imageCompressor';

export interface ReferenceImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  compressedSize?: number;
  status: 'processing' | 'ready' | 'error';
  error?: string;
}

interface ImageUploadDropzoneProps {
  images: ReferenceImage[];
  onAddImages: (newImages: ReferenceImage[]) => void;
  onRemoveImage: (id: string) => void;
  maxImages?: number;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  images,
  onAddImages,
  onRemoveImage,
  maxImages = 5,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const processFiles = async (fileList: FileList | File[]) => {
    setUploadError(null);
    const files = Array.from(fileList);
    if (files.length === 0) return;

    const availableSlots = maxImages - images.length;
    if (availableSlots <= 0) {
      setUploadError(`Maximum of ${maxImages} design reference images allowed.`);
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);
    if (files.length > availableSlots) {
      setUploadError(
        `Only ${availableSlots} more image(s) could be added. Maximum is ${maxImages}.`
      );
    }

    // Create initial placeholder entries with 'processing' status
    const initialPlaceholders: ReferenceImage[] = filesToProcess.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      file,
      previewUrl: '',
      name: file.name,
      size: file.size,
      status: 'processing',
    }));

    onAddImages(initialPlaceholders);

    // Process each file concurrently
    for (const placeholder of initialPlaceholders) {
      const validation = validateImageFile(placeholder.file);
      if (!validation.valid) {
        placeholder.status = 'error';
        placeholder.error = validation.error;
        onAddImages([placeholder]);
        continue;
      }

      try {
        const result = await compressImageToDataUrl(placeholder.file);
        placeholder.previewUrl = result.dataUrl;
        placeholder.compressedSize = result.compressedSize;
        placeholder.status = 'ready';
        onAddImages([placeholder]);
      } catch (err: unknown) {
        placeholder.status = 'error';
        placeholder.error =
          err instanceof Error ? err.message : 'Failed to compress image.';
        onAddImages([placeholder]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so re-selecting same file triggers event
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || isNaN(bytes)) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#121212]">
          Design Reference Sketches & Photos{' '}
          <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <span className="text-[10px] text-gray-500 font-mono">
          {images.length} of {maxImages} uploaded
        </span>
      </div>

      {/* Upload Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xs p-6 transition-all text-center cursor-pointer group ${
          dragOver
            ? 'border-[#C6A15B] bg-[#FAF8F3]'
            : 'border-[#C6A15B]/40 hover:border-[#C6A15B] bg-[#FAF8F3]/60'
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp, image/heic"
          onChange={handleFileChange}
          disabled={images.length >= maxImages}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
          aria-label="Upload design reference images"
        />

        <div className="space-y-2 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white border border-[#C6A15B]/30 flex items-center justify-center mx-auto text-[#C6A15B] shadow-2xs group-hover:scale-105 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#121212]">
              Click to browse or drop reference sketches here
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              PNG, JPG, WEBP, or HEIC up to 10MB each (Saved persistently for admin inspection)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Thumbnail Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square bg-white border border-[#C6A15B]/30 rounded-xs overflow-hidden shadow-2xs"
            >
              {img.status === 'processing' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-[#FAF8F3] space-y-1.5 text-center">
                  <Loader2 className="w-5 h-5 text-[#C6A15B] animate-spin" />
                  <span className="text-[10px] text-gray-600 font-medium">Optimizing...</span>
                  <span className="text-[9px] text-gray-400 truncate max-w-full px-1">
                    {img.name}
                  </span>
                </div>
              ) : img.status === 'error' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-red-50 text-red-700 space-y-1 text-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-[9px] leading-tight font-medium">
                    {img.error || 'Failed'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveImage(img.id)}
                    className="mt-1 text-[9px] text-red-600 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={img.previewUrl}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Ready Badge */}
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs rounded-full p-0.5 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white text-[9px]">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onRemoveImage(img.id)}
                        className="p-1 bg-red-600/90 text-white rounded-xs hover:bg-red-700 transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="truncate font-mono bg-black/40 p-1 rounded">
                      <p className="truncate font-semibold">{img.name}</p>
                      <p className="text-gray-300">
                        {img.compressedSize
                          ? `${formatFileSize(img.compressedSize)} (Ready)`
                          : formatFileSize(img.size)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

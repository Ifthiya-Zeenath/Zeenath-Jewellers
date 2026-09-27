import React from 'react';
import { Upload, X } from 'lucide-react';

export interface ReferenceImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

interface ImageUploadDropzoneProps {
  images: ReferenceImage[];
  onAddImages: (files: FileList | null) => void;
  onRemoveImage: (id: string) => void;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  images,
  onAddImages,
  onRemoveImage,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddImages(e.target.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#121212]">
        Design Reference Images <span className="text-gray-400 font-normal">(Optional)</span>
      </label>

      {/* Upload Dropzone Container */}
      <div className="relative border-2 border-dashed border-[#C6A15B]/40 hover:border-[#C6A15B] rounded-xs p-6 bg-[#FAF8F3]/60 transition-colors text-center cursor-pointer group">
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp, image/heic"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
              PNG, JPG, WEBP or HEIC up to 10MB each (Max 5 images)
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnail Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square bg-white border border-[#C6A15B]/30 rounded-xs overflow-hidden shadow-2xs"
            >
              <img
                src={img.previewUrl}
                alt={img.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white text-[9px]">
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
                <div className="truncate font-mono">
                  <p className="truncate">{img.name}</p>
                  <p className="text-gray-300">{formatFileSize(img.size)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

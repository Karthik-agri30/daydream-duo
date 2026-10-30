import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  currentPhoto,
  photos,
  currentIndex,
  onNavigate,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && photos.length > 1) {
        onNavigate((currentIndex + 1) % photos.length);
      }
      if (e.key === 'ArrowLeft' && photos.length > 1) {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev Button */}
      {photos.length > 1 && (
        <button
          onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Next Button */}
      {photos.length > 1 && (
        <button
          onClick={() => onNavigate((currentIndex + 1) % photos.length)}
          aria-label="Next photo"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Modal Content Frame */}
      <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
        {/* Main Image Frame */}
        <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-purple-300/30 shadow-2xl max-h-[75vh] flex items-center justify-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt || currentPhoto.title}
            style={{
              imageRendering: '-webkit-optimize-contrast',
              filter: 'contrast(102%) saturate(103%)',
            }}
            className="max-h-[75vh] w-auto max-w-full object-contain select-none shadow-lg"
          />
        </div>

        {/* Caption & Metadata Bar Below */}
        <div className="w-full max-w-2xl mt-4 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm sm:text-base text-purple-100">
                {currentPhoto.title}
              </h4>
              {currentPhoto.date && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  {currentPhoto.date}
                </span>
              )}
            </div>
            {currentPhoto.caption && (
              <p className="text-xs text-purple-200/90 mt-1 leading-relaxed">
                {currentPhoto.caption}
              </p>
            )}
          </div>

          <div className="text-[11px] text-purple-300 font-mono flex-shrink-0 self-end sm:self-center">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}

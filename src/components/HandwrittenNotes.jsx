import React, { useState } from 'react';
import { PenLine, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

const notePhotos = [
  {
    id: 1,
    url: '/images/notes/note_1.jpg',
    title: 'Note Page 1',
    caption: 'Namma Kulla Sanda Vanthuchu... — The heart of every word written here. 💜',
  },
  {
    id: 2,
    url: '/images/notes/note_2.jpg',
    title: 'Note Page 2',
    caption: '"Nee Happy ahh Iruntha Naanum Happy." — Words written with pure care.',
  },
  {
    id: 3,
    url: '/images/notes/note_3.jpg',
    title: 'Note Page 3',
    caption: 'Every line, a little piece of this bond written in ink. 🤍',
  },
  {
    id: 4,
    url: '/images/notes/note_4.jpg',
    title: 'Note Page 4',
    caption: '"Thank you Diii..." — Gratitude that no words can fully capture.',
  },
  {
    id: 5,
    url: '/images/notes/note_5.jpg',
    title: 'Note Page 5',
    caption: '"So, Happy Raksha Bandhan! Stay Happy, Stay the same..." 🎉',
  },
  {
    id: 6,
    url: '/images/notes/note_6.jpg',
    title: 'Note Page 6',
    caption: 'Signed — Your Friend & Bro. Always. ✍️',
  },
];

export default function HandwrittenNotes() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % notePhotos.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + notePhotos.length) % notePhotos.length);

  // Keyboard navigation inside lightbox
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, activeIndex]);

  return (
    <section className="py-16 px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
          <PenLine className="w-3.5 h-3.5 text-purple-600" />
          <span>HANDWRITTEN WITH LOVE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
          📝 View Handwritten Notes
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Words penned in ink, straight from the heart — tap any page to read it fully.
        </p>
      </div>

      {/* Notes Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {notePhotos.map((note, index) => (
          <button
            key={note.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-purple-200/60 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            aria-label={`Open ${note.title}`}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-purple-50/20 z-10 pointer-events-none" />

            {/* Photo */}
            <img
              src={note.url}
              alt={note.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              style={{ imageRendering: '-webkit-optimize-contrast', filter: 'contrast(103%) brightness(1.02)' }}
            />

            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/25 transition-all duration-300 z-20 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                <ZoomIn className="w-5 h-5 text-purple-700" />
              </div>
            </div>

            {/* Page number badge */}
            <div className="absolute top-2 left-2 z-30 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-purple-800 text-[10px] font-bold border border-purple-200 shadow-sm">
              Page {index + 1}
            </div>

            {/* Washi tape decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-purple-200/70 rounded-sm rotate-1 z-30 shadow-sm" />
          </button>
        ))}
      </div>

      {/* CTA below grid */}
      <div className="mt-8 text-center">
        <p className="text-xs text-purple-600/80 italic flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Click any page to zoom in and read the full note
          <Sparkles className="w-3.5 h-3.5" />
        </p>
      </div>

      {/* ——— LIGHTBOX ——— */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-105"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Prev */}
          {notePhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Next */}
          {notePhotos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-2xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Paper-style frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-amber-50 border-4 border-white/30 max-h-[78vh]">
              <img
                key={activeIndex}
                src={notePhotos[activeIndex].url}
                alt={notePhotos[activeIndex].title}
                className="max-h-[78vh] w-auto object-contain animate-in fade-in zoom-in-95 duration-300"
                style={{ imageRendering: '-webkit-optimize-contrast', filter: 'contrast(108%) brightness(1.04) saturate(0.9)' }}
              />
            </div>

            {/* Caption bar */}
            <div className="w-full max-w-lg px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-semibold text-sm text-purple-100">
                  {notePhotos[activeIndex].title}
                </h4>
                <p className="text-xs text-purple-200/90 mt-0.5 leading-relaxed">
                  {notePhotos[activeIndex].caption}
                </p>
              </div>
              <div className="text-[11px] text-purple-300 font-mono flex-shrink-0">
                {activeIndex + 1} / {notePhotos.length}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {notePhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? 'bg-purple-400 scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

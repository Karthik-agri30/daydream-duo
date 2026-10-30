import React, { useState } from 'react';
import { galleryMemories } from '../data/galleryData';
import { Sparkles, Maximize2, Camera, Heart, CheckCircle2 } from 'lucide-react';

export default function PhotoGallery({ onOpenLightbox }) {
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', ...new Set(galleryMemories.map((m) => m.tag))];

  const filteredMemories =
    selectedTag === 'All'
      ? galleryMemories
      : galleryMemories.filter((m) => m.tag === selectedTag);

  return (
    <section id="memories" className="py-24 px-4 relative bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF]/40 to-[#FAF5FF]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-purple-600" />
            <span>MOMENTS WE CHERISH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Our Memories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-4">
            A visual digital scrapbook celebrating laughter, talks, and milestones.
          </p>

          {/* Genuine Memories Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/70 border border-purple-300 text-xs text-purple-900 font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Real Captured Moments • Friendship & Brotherhood</span>
            <span className="text-purple-400">✦</span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                    : 'bg-white/80 text-slate-600 hover:text-purple-800 hover:bg-purple-50 border border-purple-200/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid - Responsive grid for all 8 memories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredMemories.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo, filteredMemories, index)}
              className="group relative cursor-pointer rounded-3xl bg-white p-3.5 border-2 border-purple-200 hover:border-violet-400 shadow-md hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Image Container with rounded corners & enhanced sharpness */}
              <div className="relative overflow-hidden rounded-2xl bg-purple-100/50 aspect-[4/5] shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.alt || photo.title}
                  loading="lazy"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    filter: 'contrast(103%) saturate(104%) brightness(101%)',
                  }}
                  className={`w-full h-full object-cover ${photo.objectPosition || 'object-center'} transition-all duration-500 group-hover:scale-105 group-hover:contrast-105`}
                />

                {/* Subtle soft vignette on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-xs font-medium flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View HD Photo</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] text-white font-medium">
                    {photo.tag}
                  </span>
                </div>
              </div>

              {/* Photo Caption & Info Below */}
              <div className="mt-4 px-1 pb-1">
                <div className="flex items-center justify-between text-[11px] text-purple-700 font-medium mb-1.5">
                  <span className="bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">{photo.date}</span>
                  <span className="text-purple-400">✦</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-violet-700 transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                {photo.caption && (
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

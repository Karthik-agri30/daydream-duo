import React, { useState } from 'react';
import { letterContent } from '../data/letterData';
import { Mail, Sparkles, Heart, FileText, ChevronUp, Image as ImageIcon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LetterSection({ onOpenOriginalPhotos }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    // Subtle pastel confetti sparkle
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#A78BFA', '#E9D5FF', '#BFDBFE', '#DDD6FE']
    });
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <section id="letter" className="py-24 px-4 relative bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF]/70 to-[#FAF5FF] overflow-hidden">
      {/* Background Dreamy Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-200/40 via-violet-200/30 to-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5 text-purple-600" />
            <span>PERSONAL & SACRED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            A Letter From My Heart
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Written with pure gratitude, warmth, and the everlasting bond of Raksha Bandhan.
          </p>
        </div>

        {/* Envelope & Letter Container */}
        <div className="flex flex-col items-center">
          {!isOpen ? (
            /* SEALED ENVELOPE STATE */
            <div className="w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center mb-6">
                <p className="font-serif italic text-xl sm:text-2xl text-purple-950 mb-2">
                  "There's something I've always wanted to tell you..."
                </p>
                <p className="text-xs text-purple-600/80">
                  Click the button or envelope below to unseal
                </p>
              </div>

              {/* 3D-styled Interactive Envelope */}
              <div
                onClick={handleOpenLetter}
                className="w-full max-w-md aspect-[16/10] bg-gradient-to-br from-[#EDE9FE] via-[#DDD6FE] to-[#C4B5FD] rounded-3xl shadow-envelope border-2 border-purple-300 relative cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between p-6 overflow-hidden"
              >
                {/* Envelope Flap Top V-shape */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#DDD6FE] to-[#C4B5FD] [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-purple-300/60 shadow-md group-hover:brightness-105 transition-all" />

                {/* Wax Seal in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 via-violet-600 to-indigo-700 border-4 border-amber-200/90 shadow-xl flex items-center justify-center text-amber-100 group-hover:scale-110 transition-transform">
                  <span className="font-serif font-bold text-2xl tracking-tighter">R</span>
                </div>

                {/* Top Label */}
                <div className="relative z-10 flex items-center justify-between text-xs text-purple-900/80 font-medium">
                  <span className="bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-200/50">
                    ✉️ For Raksha
                  </span>
                  <span className="bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-200/50">
                    Raksha Bandhan
                  </span>
                </div>

                {/* Bottom Prompt */}
                <div className="relative z-10 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-900/10 text-purple-950 text-xs font-semibold backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    <span>Click to Unseal Letter</span>
                  </span>
                </div>
              </div>

              {/* Glowing Open Button */}
              <button
                onClick={handleOpenLetter}
                className="mt-8 group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-purple-200" />
                <span>Open My Letter</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          ) : (
            /* UNSEALED LETTER STATE */
            <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Paper Stationery Letter Card */}
              <div className="paper-texture rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl relative border-2 border-purple-200">
                {/* Washi Tape at Top */}
                <div className="washi-tape top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44" />

                {/* Letter Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-200/80 pb-6 mb-8">
                  <div>
                    <h3 className="font-handwriting text-3xl sm:text-4xl font-bold text-purple-950">
                      {letterContent.salutation}
                    </h3>
                    <p className="text-xs text-purple-700/80 font-medium mt-1">
                      {letterContent.tagline}
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium border border-purple-200">
                    {letterContent.date}
                  </div>
                </div>

                {/* Letter Body in Handwritten Style */}
                <div className="space-y-6 font-handwriting text-xl sm:text-2xl text-slate-800 leading-relaxed tracking-wide">
                  {letterContent.paragraphs.map((para, index) => (
                    <p key={index} className="indent-4 sm:indent-8 text-purple-950/90">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Letter Sign-Off */}
                <div className="mt-12 pt-8 border-t border-purple-200/80 flex flex-col items-end text-right">
                  <p className="font-handwriting text-xl text-purple-800 italic">
                    {letterContent.signOff}
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl font-bold text-purple-950 mt-1">
                    {letterContent.senderName}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-600 font-sans">
                    <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                    <span>Always your friend & bro</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Below Letter */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {/* View Original Scanned Photos Lightbox Button */}
                <button
                  onClick={onOpenOriginalPhotos}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-800 border-2 border-purple-300 font-semibold text-xs sm:text-sm shadow-md hover:bg-purple-50 hover:border-purple-400 transition-all hover:scale-105"
                >
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  <span>View Original Handwritten Letter Photos</span>
                </button>

                {/* Fold Letter Back */}
                <button
                  onClick={handleCloseLetter}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-purple-100/80 text-purple-700 text-xs sm:text-sm font-medium hover:bg-purple-200 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Fold Letter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

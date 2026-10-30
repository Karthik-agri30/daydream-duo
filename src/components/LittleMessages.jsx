import React, { useState, useEffect } from 'react';
import { littleMessages } from '../data/messagesData';
import { ChevronLeft, ChevronRight, Sparkles, HeartHandshake, Smile, Sun, Star, LayoutGrid, Eye } from 'lucide-react';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Smile: Smile,
  Sparkles: Sparkles,
  Sun: Sun,
  Star: Star,
};

export default function LittleMessages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto advance every 6 seconds when not in viewAll mode
  useEffect(() => {
    if (viewAll || !isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % littleMessages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [viewAll, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + littleMessages.length) % littleMessages.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % littleMessages.length);
  };

  const currentMsg = littleMessages[currentIndex];
  const CurrentIcon = iconMap[currentMsg.icon] || Sparkles;

  return (
    <section id="messages" className="py-24 px-4 relative bg-gradient-to-b from-[#E9D5FF]/40 via-[#F3E8FF]/50 to-[#FAF5FF]">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>WORDS FROM THE HEART</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            A Little Message for You
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Thoughts I cherish, gentle reminders, and how much your friendship means to me.
          </p>

          {/* View toggle (One-by-one vs View All) */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setViewAll(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                !viewAll
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white/80 text-purple-800 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Read One by One</span>
            </button>
            <button
              onClick={() => setViewAll(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                viewAll
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white/80 text-purple-800 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Show All Together</span>
            </button>
          </div>
        </div>

        {/* Mode 1: Interactive One-by-One Presentation */}
        {!viewAll ? (
          <div className="relative">
            {/* Scrapbook Card with Washi Tape */}
            <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-14 border border-purple-200/90 shadow-xl shadow-purple-900/5 text-center min-h-[340px] sm:min-h-[320px] flex flex-col justify-between transition-all duration-500">
              {/* Washi Tape styling at the top */}
              <div className="washi-tape top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36" />

              {/* Top Card Header */}
              <div className="flex items-center justify-between text-xs text-purple-600/80 mb-6">
                <span className="font-semibold tracking-wider uppercase">
                  Note #{currentIndex + 1} of {littleMessages.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-medium flex items-center gap-1">
                  <CurrentIcon className="w-3 h-3 text-purple-600" />
                  <span>{currentMsg.reflection}</span>
                </span>
              </div>

              {/* Main Friendship Quote */}
              <div className="my-auto py-4">
                <div className="text-4xl text-purple-300 font-serif leading-none mb-3">“</div>
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-slate-800 font-normal leading-relaxed tracking-wide px-2 sm:px-6">
                  {currentMsg.quote}
                </blockquote>
                <div className="text-4xl text-purple-300 font-serif leading-none mt-3 text-right">”</div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 border-t border-purple-100 flex items-center justify-between text-xs text-purple-700">
                <span className="font-handwriting text-xl text-purple-800">For Raksha, with gratitude</span>
                <span className="text-purple-400">✦ ✦ ✦</span>
              </div>
            </div>

            {/* Navigation Arrows & Dot Indicators */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrev}
                aria-label="Previous message"
                className="w-11 h-11 rounded-full bg-white/90 border border-purple-200 flex items-center justify-center text-purple-800 hover:bg-purple-100 transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {littleMessages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to message ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-8 bg-purple-600 shadow-sm'
                        : 'w-2.5 bg-purple-200 hover:bg-purple-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next message"
                className="w-11 h-11 rounded-full bg-white/90 border border-purple-200 flex items-center justify-center text-purple-800 hover:bg-purple-100 transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Mode 2: Show All Messages at a Glance */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {littleMessages.map((msg, idx) => {
              const IconComp = iconMap[msg.icon] || Sparkles;
              return (
                <div
                  key={msg.id}
                  className={`glass-card glass-card-hover rounded-2xl p-6 border border-purple-200/80 shadow-md flex flex-col justify-between ${
                    idx === 0 ? 'md:col-span-2 bg-gradient-to-br from-white/90 via-purple-50/70 to-blue-50/70' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">
                      0{idx + 1}
                    </span>
                    <IconComp className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-slate-800 leading-relaxed mb-4">
                    "{msg.quote}"
                  </p>
                  <p className="text-xs text-purple-700/80 font-medium pt-3 border-t border-purple-100">
                    ✦ {msg.reflection}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

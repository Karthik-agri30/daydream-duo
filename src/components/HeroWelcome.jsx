import React from 'react';
import { Sparkles, Heart, ArrowDown, Star, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroWelcome({ onExploreClick }) {
  const handleOpenSurprise = () => {
    // Gentle pastel confetti burst on opening
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#A78BFA', '#BFDBFE', '#E9D5FF', '#F3E8FF', '#DDD6FE']
    });

    if (onExploreClick) {
      onExploreClick();
    } else {
      const nextElem = document.getElementById('messages');
      if (nextElem) {
        nextElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="welcome"
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF]/60 to-[#E9D5FF]/40"
    >
      {/* Dreamy Ambient Blurred Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-purple-200/50 via-violet-200/40 to-blue-200/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-100/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-200/50 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Floating Star Decor */}
      <div className="absolute top-28 left-[12%] text-purple-300 animate-float-slow hidden sm:block">
        <Star className="w-5 h-5 fill-purple-200 text-purple-300 opacity-70" />
      </div>
      <div className="absolute bottom-24 left-[15%] text-blue-300 animate-float-reverse hidden sm:block">
        <Sparkles className="w-6 h-6 text-blue-300 opacity-60" />
      </div>
      <div className="absolute top-36 right-[14%] text-violet-300 animate-float-reverse hidden sm:block">
        <Star className="w-6 h-6 fill-violet-200 text-violet-300 opacity-80" />
      </div>
      <div className="absolute bottom-32 right-[18%] text-purple-400 animate-float-slow hidden sm:block">
        <Sparkles className="w-5 h-5 text-purple-300 opacity-70" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Welcome Scrapbook Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-sm text-xs font-semibold text-purple-800 mb-6 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Dedicated to Raksha • A Bond of Friendship & Trust</span>
          <span className="text-violet-400">✦</span>
        </div>

        {/* Main Welcome Heading */}
        <div className="mb-4">
          <span className="block text-2xl sm:text-3xl md:text-4xl font-serif italic text-purple-900 font-normal mb-2 tracking-wide">
            Welcome to
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Nexora
            </span>
          </h1>
        </div>

        {/* World Tagline */}
        <div className="inline-block px-5 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-purple-200/80 shadow-sm mb-6">
          <p className="font-serif italic text-lg sm:text-2xl text-purple-950 font-medium tracking-wide">
            “A World Connected by a Special Bond”
          </p>
        </div>

        {/* Emotional Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-700 font-light max-w-2xl mx-auto mb-6 leading-relaxed font-sans">
          "Some friendships are too special to be explained in words."
        </p>

        {/* Life of Pazham Featured Lyric Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 border border-purple-200 text-purple-900 text-xs sm:text-sm font-medium mb-8 shadow-sm backdrop-blur-sm max-w-xl">
          <span className="text-purple-600 flex-shrink-0">🎵</span>
          <span className="font-tamil font-semibold">“என் வாழ்க்கை இது தான்னு கதையாக சொல்ல... உன் பேரு இல்லாம ஒரு பக்கம் இல்ல”</span>
        </div>

        {/* Glowing Interactive Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleOpenSurprise}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            {/* Pulsing ring aura */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-violet-400 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
            
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
              <span>Enter Nexora • Open Surprise</span>
            </span>
          </button>
        </div>

        {/* Next Page Prompt */}
        <div
          onClick={handleOpenSurprise}
          className="mt-12 flex flex-col items-center gap-1.5 text-purple-600/80 text-xs font-semibold cursor-pointer hover:text-purple-900 transition-colors group"
        >
          <span className="group-hover:translate-x-1 transition-transform">
            Click to turn to Chapter 1: Our Story ➔
          </span>
          <span className="w-12 h-0.5 bg-purple-300 rounded-full group-hover:w-20 transition-all" />
        </div>
      </div>
    </section>
  );
}

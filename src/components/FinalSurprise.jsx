import React, { useState } from 'react';
import { Sparkles, Heart, Star, Send, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalSurprise({ onRestart }) {
  const [lanternCount, setLanternCount] = useState(3);
  const [wishesLaunched, setWishesLaunched] = useState(0);

  const handleLaunchLantern = () => {
    setLanternCount((prev) => prev + 2);
    setWishesLaunched((prev) => prev + 1);

    // Multi-shot celebratory confetti
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.8 },
      colors: ['#A78BFA', '#BFDBFE', '#E9D5FF', '#F3E8FF', '#F472B6', '#FDE047']
    });

    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#A78BFA', '#BFDBFE', '#E9D5FF']
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#A78BFA', '#BFDBFE', '#E9D5FF']
      });
    }, 250);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="surprise"
      className="relative min-h-screen py-24 px-4 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#18122B] via-[#20163B] to-[#120B24] text-white"
    >
      {/* Night Sky Stars & Nebula Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Stars across the night sky */}
      <div className="absolute top-16 left-[10%] text-purple-200/60 animate-twinkle">
        <Star className="w-4 h-4 fill-purple-200" />
      </div>
      <div className="absolute top-28 right-[15%] text-blue-200/70 animate-twinkle" style={{ animationDelay: '1s' }}>
        <Star className="w-5 h-5 fill-blue-200" />
      </div>
      <div className="absolute top-1/2 left-[8%] text-purple-300/50 animate-twinkle" style={{ animationDelay: '2s' }}>
        <Star className="w-3 h-3 fill-purple-300" />
      </div>
      <div className="absolute bottom-40 right-[12%] text-violet-200/80 animate-twinkle" style={{ animationDelay: '1.5s' }}>
        <Star className="w-6 h-6 fill-violet-200" />
      </div>

      {/* Floating Wish Lanterns */}
      {Array.from({ length: lanternCount }).map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-float-slow"
          style={{
            left: `${15 + (i * 20) % 75}%`,
            bottom: `${20 + (i * 18) % 60}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${7 + (i % 4)}s`,
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-6 h-8 sm:w-8 sm:h-10 rounded-t-xl rounded-b-sm bg-gradient-to-t from-amber-400 via-orange-300 to-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.8)] opacity-90" />
            <div className="w-2 h-1 bg-amber-600 rounded-full blur-[0.5px] mt-0.5" />
          </div>
        </div>
      ))}

      {/* Content Center */}
      <div className="relative z-10 max-w-3xl mx-auto my-auto text-center py-12 flex flex-col items-center">
        {/* Glow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg shadow-purple-950/40">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>CELEBRATING OUR BEAUTIFUL BOND</span>
        </div>

        {/* Main Surprising Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="bg-gradient-to-r from-purple-200 via-violet-300 to-blue-200 bg-clip-text text-transparent">
            Happy Raksha Bandhan,
          </span>
          <br />
          <span className="font-serif italic text-purple-200">
            Raksha! 💜
          </span>
        </h2>

        {/* Sender Sign-off */}
        <p className="font-handwriting text-3xl sm:text-4xl text-purple-300 tracking-wide mb-10">
          From your friend & bro.
        </p>

        {/* Emotional blessing statement */}
        <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto leading-relaxed mb-10">
          May your journey be filled with happiness, gentle peace, and endless reasons to smile.
          No matter where life leads us, this little world of ours will always remain sacred.
        </p>

        {/* Interactive Sky Lantern / Confetti Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleLaunchLantern}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-purple-950 bg-gradient-to-r from-purple-200 via-violet-200 to-blue-200 shadow-xl shadow-purple-900/50 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Send className="w-4 h-4 text-purple-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            <span>
              {wishesLaunched === 0
                ? 'Launch a Sky Lantern & Wish 🏮'
                : `Send Another Wish (${wishesLaunched} Sent) ✨`}
            </span>
          </button>

          <button
            onClick={onRestart || scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-medium hover:bg-purple-900/70 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Revisit From Page 1</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full pt-12 pb-4 border-t border-purple-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400/80 gap-3">
        <div className="flex items-center gap-1.5">
          <span>Crafted with pure memories & care for Raksha</span>
          <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Internship • Friendship • Brotherhood</span>
          <span>•</span>
          <span>Nexora – A World Connected by a Special Bond</span>
        </div>
      </footer>
    </section>
  );
}

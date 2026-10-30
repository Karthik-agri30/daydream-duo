import React, { useState } from 'react';
import { Sparkles, Heart, ShieldCheck, Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PromiseSection() {
  const [sealed, setSealed] = useState(false);

  const handleSealPromise = () => {
    setSealed(true);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#A78BFA', '#C084FC', '#BFDBFE', '#E9D5FF', '#F3E8FF']
    });
  };

  return (
    <section id="promise" className="py-24 px-4 relative bg-[#FAF5FF] overflow-hidden">
      {/* Soft Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-200/30 via-violet-200/20 to-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
            <span>A SACRED PROMISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            One Thing I Want You to Know
          </h2>
        </div>

        {/* Promise Keepsake Plaque */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-12 md:p-14 border-2 border-purple-200 shadow-2xl shadow-purple-900/10 text-center flex flex-col items-center">
          {/* Top Seal Accent */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-violet-500 border-4 border-white shadow-lg flex items-center justify-center text-white mb-6 -mt-14 sm:-mt-16">
            <Heart className="w-7 h-7 fill-white/90" />
          </div>

          {/* Promise Text */}
          <div className="space-y-6 max-w-xl mx-auto font-serif text-lg sm:text-2xl text-slate-800 leading-relaxed">
            <p>
              "I don't know what the future holds for us, but I genuinely hope this friendship stays special. We may have arguments, misunderstandings and different moments in life, but I hope we never forget how this beautiful friendship started."
            </p>

            <p className="font-sans text-base sm:text-lg text-purple-900 font-medium">
              "Thank you for being my friend, accepting me as your bro, and becoming such an important part of my life."
            </p>

            <p className="font-handwriting text-2xl sm:text-3xl text-violet-800 font-bold tracking-wide">
              "Stay happy, stay the same, and always keep that smile."
            </p>
          </div>

          {/* Bottom Interactive Seal */}
          <div className="mt-10 pt-8 border-t border-purple-100/90 w-full flex flex-col items-center">
            {!sealed ? (
              <button
                onClick={handleSealPromise}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Tap to Seal This Promise Forever 💜</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-100 text-purple-800 text-xs sm:text-sm font-semibold border border-purple-300 animate-in fade-in duration-300">
                <Check className="w-4 h-4 text-purple-700" />
                <span>Sealed with Trust, Respect & Brotherly Love</span>
              </div>
            )}
            <p className="text-[11px] text-purple-600/70 mt-3 font-medium">
              Lifelong bond • Raksha Bandhan & Beyond
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

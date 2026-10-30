import React, { useState } from 'react';
import { thingsToKnowList } from '../data/messagesData';
import { CloudSun, ShieldAlert, HeartHandshake, MessageSquareHeart, Sparkles, Bookmark, Heart, Sparkle } from 'lucide-react';

const iconMap = {
  CloudSun: CloudSun,
  ShieldAlert: ShieldAlert,
  HeartHandshake: HeartHandshake,
  MessageSquareHeart: MessageSquareHeart,
  Sparkles: Sparkles,
  Bookmark: Bookmark,
};

export default function ThingsToKnow() {
  const [lovedCards, setLovedCards] = useState({});

  const toggleLove = (id) => {
    setLovedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="things" className="py-24 px-4 relative bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF]/60 to-[#FAF5FF] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/30 via-violet-200/20 to-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/90 border border-violet-200 text-violet-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>UNSPOKEN TRUTHS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Things I Want You to Know
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Gentle promises, honest thoughts, and the genuine depth of our friendship.
          </p>
        </div>

        {/* 6 Individual Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thingsToKnowList.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isLoved = !!lovedCards[item.id];

            return (
              <div
                key={item.id}
                className={`relative group rounded-3xl p-6 sm:p-7 transition-all duration-300 border-2 bg-gradient-to-br ${item.accent} ${item.border} shadow-sm hover:shadow-xl hover:shadow-purple-500/15 hover:-translate-y-1 flex flex-col justify-between`}
              >
                {/* Scrapbook corner pin */}
                <div className="absolute top-3 right-3 text-purple-300 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Sparkle className="w-4 h-4 text-purple-400" />
                </div>

                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/80 border border-purple-200/60 shadow-sm flex items-center justify-center text-purple-700">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600">
                        Card 0{idx + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Message Quote */}
                  <p className="font-serif text-lg sm:text-xl text-slate-800 leading-snug tracking-normal my-2">
                    "{item.message}"
                  </p>
                </div>

                {/* Footer with Heart Keepsake Button */}
                <div className="mt-6 pt-3 border-t border-purple-200/50 flex items-center justify-between text-xs">
                  <span className="text-purple-700/70 font-medium font-sans">
                    Always true
                  </span>
                  <button
                    onClick={() => toggleLove(item.id)}
                    aria-label="Keep this message in heart"
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                      isLoved
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white/70 text-purple-700 hover:bg-white'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform ${
                        isLoved ? 'fill-white scale-110' : 'text-purple-600'
                      }`}
                    />
                    <span>{isLoved ? 'Saved in heart' : 'Save'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

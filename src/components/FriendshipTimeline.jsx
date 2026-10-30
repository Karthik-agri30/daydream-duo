import React, { useState } from 'react';
import { timelineStages } from '../data/timelineData';
import { Sparkles, MessageCircleHeart, HeartHandshake, ShieldCheck, Star, ChevronDown, Compass, Award } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  MessageCircleHeart: MessageCircleHeart,
  HeartHandshake: HeartHandshake,
  ShieldCheck: ShieldCheck,
  Star: Star,
};

export default function FriendshipTimeline() {
  const [activeStageId, setActiveStageId] = useState(1);

  const toggleStage = (id) => {
    setActiveStageId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="story" className="py-24 px-4 relative bg-[#FAF5FF] overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/90 border border-violet-200 text-violet-800 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-violet-600" />
            <span>HOW IT ALL UNFOLDED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Our Little Story
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            From two strangers at an internship to a bond that became lifelong family by heart.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Connecting Vertical Line (Desktop & Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-purple-300 via-violet-400 to-indigo-300 rounded-full shadow-[0_0_12px_rgba(167,139,250,0.6)]" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineStages.map((stage, index) => {
              const IconComponent = iconMap[stage.iconName] || Sparkles;
              const isEven = index % 2 === 0;
              const isActive = activeStageId === stage.id;

              return (
                <div
                  key={stage.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Icon Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <button
                      onClick={() => toggleStage(stage.id)}
                      aria-label={`Toggle stage: ${stage.title}`}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300 hover:scale-110 ${
                        isActive
                          ? 'bg-gradient-to-tr from-violet-600 to-purple-500 text-white shadow-purple-500/40 ring-4 ring-purple-200'
                          : 'bg-white text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternating Grid */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Stage Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    } w-[calc(100%-4rem)] md:w-1/2`}
                  >
                    <div
                      onClick={() => toggleStage(stage.id)}
                      className={`glass-card rounded-2xl p-6 md:p-7 border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-purple-300 bg-white/95 shadow-xl shadow-purple-900/10'
                          : 'border-purple-100/80 bg-white/75 hover:bg-white/90 shadow-md'
                      }`}
                    >
                      {/* Stage Top Tag & Title */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${stage.badgeColor}`}
                        >
                          {stage.tag}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-purple-500 transition-transform duration-300 ${
                            isActive ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-700/80 font-medium mb-3">
                        {stage.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      {/* Highlight Quote Box */}
                      <div className="p-3.5 rounded-xl bg-purple-50/80 border-l-4 border-violet-400 text-xs sm:text-sm text-purple-950 font-serif italic mb-3">
                        "{stage.quote}"
                      </div>

                      {/* Expandable Key Details */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-purple-100 space-y-2 animate-in fade-in duration-300">
                          <p className="text-xs font-semibold text-purple-900 uppercase tracking-wider mb-2">
                            Key Moments:
                          </p>
                          {stage.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                              <span className="text-purple-400 mt-1">✦</span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Disc3, Sparkles, Heart, Video, Volume2 } from 'lucide-react';
import { songAudio } from '../utils/audioEngine';

export default function SongTribute({ isMusicPlaying, setIsMusicPlaying }) {
  const iframeRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (iframeRef.current) {
      songAudio.registerIframe(iframeRef.current);
    }

    const unsubscribe = songAudio.subscribe((state) => {
      setIsMusicPlaying(state);
    });

    return () => unsubscribe();
  }, [setIsMusicPlaying]);

  const togglePlay = () => {
    songAudio.toggle();
  };

  return (
    <section className="py-16 px-4 relative bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF]/60 to-[#FAF5FF] overflow-hidden">
      {/* Dreamy Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden/Embedded Official Audio Stream for Life of Pazham (ID: g4KADSMQDL8) */}
      <div className={`mx-auto max-w-4xl transition-all duration-500 mb-6 ${showVideo ? 'block' : 'h-0 overflow-hidden opacity-0 pointer-events-none'}`}>
        <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-purple-300 shadow-2xl bg-black">
          <iframe
            ref={iframeRef}
            id="youtube-audio-player"
            className="w-full h-full"
            src="https://www.youtube.com/embed/g4KADSMQDL8?enablejsapi=1&origin=http://localhost:5173&playsinline=1&rel=0"
            title="Life of Pazham - Thiruchitrambalam"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      {!showVideo && (
        /* Standalone hidden iframe when video is closed so audio still plays */
        <iframe
          ref={iframeRef}
          id="youtube-audio-player-hidden"
          className="w-1 h-1 opacity-0 pointer-events-none fixed -top-40 -left-40"
          src="https://www.youtube.com/embed/g4KADSMQDL8?enablejsapi=1&origin=http://localhost:5173&playsinline=1&rel=0"
          title="Life of Pazham - Thiruchitrambalam (Audio Stream)"
          allow="autoplay; encrypted-media"
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Card with Glassmorphic Vinyl Aesthetic */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-purple-200/90 shadow-xl shadow-purple-900/10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          
          {/* Left: Spinning Vinyl Disc / Cover */}
          <div className="relative flex-shrink-0">
            {/* Vinyl record disc */}
            <div
              onClick={togglePlay}
              className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-900 border-4 border-purple-200 shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-700 cursor-pointer group ${
                isMusicPlaying ? 'animate-[spin_10s_linear_infinite]' : 'hover:scale-105'
              }`}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-slate-700/60" />
              <div className="absolute inset-5 rounded-full border border-slate-700/60" />
              <div className="absolute inset-8 rounded-full border border-slate-700/60" />
              <div className="absolute inset-11 rounded-full border border-slate-700/60" />

              {/* Center Label */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-600 border-4 border-amber-200 flex flex-col items-center justify-center text-white text-center p-1 shadow-inner">
                <span className="text-[9px] font-bold tracking-tighter uppercase leading-none">
                  Thiruchitrambalam
                </span>
                <Disc3 className="w-4 h-4 text-amber-200 my-0.5" />
                <span className="text-[8px] font-mono opacity-80 leading-none">
                  Pazham
                </span>
              </div>
            </div>

            {/* Play/Pause Float Overlay Button */}
            <button
              onClick={togglePlay}
              aria-label={isMusicPlaying ? "Pause Life of Pazham" : "Play Life of Pazham (Original Song)"}
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform border-2 border-white"
            >
              {isMusicPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>
          </div>

          {/* Right: Lyrics & Meaning */}
          <div className="flex-1 text-center md:text-left">
            {/* Tag Badge & Video Toggle */}
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-900 text-xs font-semibold">
                <Music className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span>OUR FRIENDSHIP ANTHEM • THIRUCHITRAMBALAM</span>
              </div>

              {/* Toggle Video view */}
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-purple-100 text-purple-800 text-[11px] font-medium border border-purple-200 transition-colors shadow-sm"
              >
                <Video className="w-3.5 h-3.5 text-purple-600" />
                <span>{showVideo ? 'Hide Video' : 'Watch Video'}</span>
              </button>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Life of Pazham
              </h3>
              {isMusicPlaying && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-medium border border-emerald-200 animate-pulse">
                  <Volume2 className="w-3 h-3 text-emerald-600" />
                  Playing Original Song
                </span>
              )}
            </div>

            <p className="text-xs text-purple-700 font-medium mb-5">
              Original Vocals by Anirudh Ravichander • Lyrics by Vivek
            </p>

            {/* Featured Tamil Lyric Block */}
            <div className="p-5 rounded-2xl bg-purple-50/90 border-l-4 border-violet-500 shadow-sm text-left mb-4">
              {/* Tamil Script */}
              <p className="font-tamil font-bold text-lg sm:text-xl text-purple-950 leading-relaxed tracking-wide">
                “என் வாழ்க்கை இது தான்னு கதையாக சொல்ல...<br />
                உன் பேரு இல்லாம ஒரு பக்கம் இல்ல.”
              </p>

              {/* Transliteration */}
              <p className="text-xs sm:text-sm text-purple-700 italic mt-2 font-serif">
                “En vazhkai idhu dhaan kadhaiyaaga solla... Un peru illamaa oru pakkam illa.”
              </p>

              {/* English Meaning */}
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2 pt-2 border-t border-purple-200/60 leading-relaxed">
                <span className="text-purple-900 font-semibold">Meaning:</span> “If I ever tell the story of my life... there isn’t a single page without your name in it.”
              </p>
            </div>

            {/* Second Supporting Stanza */}
            <div className="text-xs sm:text-sm text-slate-600 italic font-serif leading-relaxed space-y-1">
              <p>
                "தாங்காத பாரம் நான் தாங்கும் போதும், எனை தாங்கும் தூணாக நீதானடி..."
              </p>
              <p className="text-[11px] text-purple-800/80 not-italic font-sans">
                (When burdens feel too heavy, you are the pillar holding me up. Whoever comes or goes, you never walk away.)
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3 border-t border-purple-100 flex flex-wrap items-center justify-between text-xs text-purple-900 font-medium gap-2">
              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-sm"
              >
                {isMusicPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isMusicPlaying ? 'Pause Song' : 'Play Original Song (Life of Pazham) ♫'}</span>
              </button>

              <div className="flex items-center gap-1 text-slate-600">
                <span>Just like Pazham & Shobana, true friendship is pure family.</span>
                <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

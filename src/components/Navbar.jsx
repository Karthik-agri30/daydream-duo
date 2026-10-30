import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, Heart, BookOpen } from 'lucide-react';
import { songAudio } from '../utils/audioEngine';

export default function Navbar({
  currentPage,
  onNavigate,
  isMusicPlaying,
  setIsMusicPlaying,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = songAudio.subscribe((state) => {
      setIsMusicPlaying(state);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [setIsMusicPlaying]);

  const toggleMusic = () => {
    songAudio.toggle();
  };

  const navLinks = [
    { name: 'Welcome', page: 0 },
    { name: 'Our Story', page: 1 },
    { name: 'Messages', page: 2 },
    { name: 'Memories', page: 3 },
    { name: 'Anthem', page: 4 },
    { name: 'Truths', page: 5 },
    { name: 'The Letter', page: 6 },
    { name: 'Promise', page: 7 },
    { name: 'Surprise', page: 8 },
  ];

  const handleNavClick = (pageIndex) => {
    onNavigate(pageIndex);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-4 sm:px-5 py-2.5 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-purple-900/10 border border-purple-200/90'
            : 'bg-white/60 backdrop-blur-md border border-white/70 shadow-sm'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-300 via-violet-400 to-blue-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-purple-950 tracking-tight text-sm sm:text-base group-hover:text-violet-700 transition-colors">
              Nexora
            </span>
            <span className="hidden md:inline-block text-[11px] text-purple-600/80 ml-2 font-medium">
              • A World Connected by a Special Bond
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                    : 'text-slate-700 hover:text-purple-900 hover:bg-purple-100/70'
                }`}
              >
                <span>{link.name}</span>
                {isActive && <span className="text-[9px] text-purple-200">✦</span>}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Music Player & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          {/* Ambient Music Button */}
          <button
            onClick={toggleMusic}
            aria-label={isMusicPlaying ? 'Pause song' : 'Play Life of Pazham'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              isMusicPlaying
                ? 'bg-purple-100/90 text-purple-900 border-purple-300 shadow-sm'
                : 'bg-white/80 text-slate-700 border-purple-200 hover:bg-purple-50'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span className="hidden sm:inline">Life of Pazham</span>
                {/* Audio visualizer bars */}
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-purple-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
                  <span className="w-0.5 bg-purple-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-2" />
                  <span className="w-0.5 bg-purple-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Life of Pazham ♫</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full text-purple-900 hover:bg-purple-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-purple-200 rounded-2xl p-4 shadow-xl shadow-purple-900/10 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider px-3 pb-1 border-b border-purple-100">
            Book Chapters
          </div>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page)}
              className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between text-left ${
                currentPage === link.page
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-700 hover:text-purple-900 hover:bg-purple-50'
              }`}
            >
              <span>{link.name}</span>
              <span className="text-xs opacity-75">Page 0{link.page + 1}</span>
            </button>
          ))}
          <div className="mt-2 pt-2 border-t border-purple-100 flex items-center justify-between px-3 text-xs text-purple-600">
            <span>Nexora • Brother & Sister Bond</span>
            <Heart className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
          </div>
        </div>
      )}
    </header>
  );
}

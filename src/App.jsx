import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundParticles from './components/BackgroundParticles';
import HeroWelcome from './components/HeroWelcome';
import FriendshipTimeline from './components/FriendshipTimeline';
import LittleMessages from './components/LittleMessages';
import PhotoGallery from './components/PhotoGallery';
import SongTribute from './components/SongTribute';
import ThingsToKnow from './components/ThingsToKnow';
import LetterSection from './components/LetterSection';
import HandwrittenNotes from './components/HandwrittenNotes';
import PromiseSection from './components/PromiseSection';
import FinalSurprise from './components/FinalSurprise';
import PageNavigation from './components/PageNavigation';
import LightboxModal from './components/LightboxModal';
import { letterContent } from './data/letterData';
import { chapters } from './data/chaptersData';
import { ArrowRight, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'
  const [showCurtain, setShowCurtain] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const totalPages = chapters.length;

  const handleNavigate = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= totalPages || pageIndex === currentPage) return;
    
    // Determine transition direction
    const newDir = pageIndex > currentPage ? 'next' : 'prev';
    setDirection(newDir);
    setShowCurtain(true);
    setCurrentPage(pageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Subtle gentle sparkle burst on page change
    if (pageIndex === 9) {
      // Big celebration on surprise page
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#A78BFA', '#BFDBFE', '#E9D5FF', '#F3E8FF', '#F472B6']
      });
    }

    // Hide curtain after sweep completes
    setTimeout(() => {
      setShowCurtain(false);
    }, 600);
  };

  // Keyboard navigation (ArrowLeft & ArrowRight flip pages when lightbox is closed)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) return; // let lightbox handle its own keys
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPage < totalPages - 1) {
          handleNavigate(currentPage + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 0) {
          handleNavigate(currentPage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, lightboxOpen]);

  // Open photo gallery lightbox
  const handleOpenGalleryLightbox = (photo, allPhotos, index) => {
    setLightboxPhotos(allPhotos);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Open handwritten letter scans lightbox
  const handleOpenLetterPhotos = () => {
    setLightboxPhotos(letterContent.originalLetterPhotos);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const handleNavigateLightbox = (newIndex) => {
    setLightboxIndex(newIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const currentChapter = chapters[currentPage];

  return (
    <div className="relative min-h-screen bg-[#FAF5FF] text-slate-800 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      {/* 1. Floating Canvas Particles, Shooting Stars & Aurora Mesh */}
      <BackgroundParticles />

      {/* 2. Shimmer Portal Light Sweep during page turns */}
      {showCurtain && <div className="shimmer-curtain" aria-hidden="true" />}

      {/* 3. Floating Glassmorphic Navbar with Chapter Indicators */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* 4. Main Page Stage with 3D Book Page Flip Animation */}
      <main
        key={currentPage}
        className={`min-h-screen pt-20 pb-28 flex flex-col justify-center ${
          direction === 'next' ? 'page-flip-next' : 'page-flip-prev'
        }`}
      >
        {/* Top Chapter Breadcrumb Bar (Pages 1 to 7) */}
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <div className="max-w-4xl mx-auto w-full px-4 mb-2 flex items-center justify-between text-xs text-purple-800 font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-purple-200/90 shadow-sm backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
              <span>{currentChapter.icon}</span>
              <span>Chapter 0{currentPage} of 0{totalPages - 1}:</span>
              <span className="text-purple-950 font-bold">{currentChapter.title}</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-purple-600/80 font-normal text-[11px] bg-purple-50/80 px-2.5 py-1 rounded-full border border-purple-100">
              <span>Press</span>
              <kbd className="px-1 py-0.5 rounded bg-white font-mono border text-[10px]">⟵</kbd>
              <kbd className="px-1 py-0.5 rounded bg-white font-mono border text-[10px]">⟶</kbd>
              <span>to turn pages</span>
            </span>
          </div>
        )}

        {/* PAGE 0: Welcome to Nexora */}
        {currentPage === 0 && (
          <HeroWelcome onExploreClick={() => handleNavigate(1)} />
        )}

        {/* PAGE 1: Our Little Story (Vertical Timeline) */}
        {currentPage === 1 && (
          <div>
            <FriendshipTimeline />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(0)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Welcome</span>
              </button>
              <button
                onClick={() => handleNavigate(2)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: Little Messages</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: A Little Message for You */}
        {currentPage === 2 && (
          <div>
            <LittleMessages />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Our Story</span>
              </button>
              <button
                onClick={() => handleNavigate(3)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: Our Memories (8 Photos)</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 3: Our Memories – Photo Gallery */}
        {currentPage === 3 && (
          <div>
            <PhotoGallery onOpenLightbox={handleOpenGalleryLightbox} />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Messages</span>
              </button>
              <button
                onClick={() => handleNavigate(4)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: Life of Pazham Anthem ♫</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 4: Featured Friendship Anthem: Life of Pazham */}
        {currentPage === 4 && (
          <div>
            <SongTribute
              isMusicPlaying={isMusicPlaying}
              setIsMusicPlaying={setIsMusicPlaying}
            />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Memories</span>
              </button>
              <button
                onClick={() => handleNavigate(5)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: Things I Want You to Know</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 5: Things I Want You to Know */}
        {currentPage === 5 && (
          <div>
            <ThingsToKnow />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(4)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Anthem</span>
              </button>
              <button
                onClick={() => handleNavigate(6)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: A Letter From My Heart ✉️</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 6: A Letter From My Heart (Interactive Envelope) */}
        {currentPage === 6 && (
          <div>
            <LetterSection onOpenOriginalPhotos={handleOpenLetterPhotos} />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(5)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Things to Know</span>
              </button>
              <button
                onClick={() => handleNavigate(7)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: Handwritten Notes 📝</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 7: Handwritten Notes Gallery */}
        {currentPage === 7 && (
          <div>
            <HandwrittenNotes />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(6)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>The Letter</span>
              </button>
              <button
                onClick={() => handleNavigate(8)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <span>Next: A Little Promise 💜</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 8: A Little Promise */}
        {currentPage === 8 && (
          <div>
            <PromiseSection />
            <div className="max-w-md mx-auto text-center px-4 mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => handleNavigate(7)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-medium hover:bg-purple-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Handwritten Notes</span>
              </button>
              <button
                onClick={() => handleNavigate(9)}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Open Final Surprise Page ✦</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* PAGE 9: Final Surprise Screen */}
        {currentPage === 9 && (
          <FinalSurprise onRestart={() => handleNavigate(0)} />
        )}
      </main>

      {/* 5. Floating Storybook Page Navigation Controller */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        chapters={chapters}
        onNavigate={handleNavigate}
      />

      {/* 6. Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        currentPhoto={lightboxPhotos[lightboxIndex]}
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}

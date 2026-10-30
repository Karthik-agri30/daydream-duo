import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

export default function PageNavigation({
  currentPage,
  totalPages,
  chapters,
  onNavigate,
}) {
  const currentChapter = chapters[currentPage];
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <aside
      aria-label="Storybook page navigation"
      className="fixed bottom-4 left-0 right-0 z-40 px-3 pointer-events-none"
    >
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2 p-2 rounded-full bg-white/90 backdrop-blur-xl border border-purple-200/90 shadow-2xl shadow-purple-900/15 pointer-events-auto">
        
        {/* Previous Page Button */}
        <button
          onClick={() => onNavigate(currentPage - 1)}
          disabled={isFirst}
          aria-label="Turn to previous page"
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            isFirst
              ? 'opacity-35 cursor-not-allowed text-slate-400'
              : 'text-purple-900 hover:bg-purple-100 hover:scale-105 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Center: Chapter Info & Mini Page Indicator */}
        <div className="flex flex-col items-center text-center px-2">
          <div className="flex items-center gap-1.5 mb-1">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => onNavigate(idx)}
                aria-label={`Go to page ${idx + 1}: ${ch.title}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentPage
                    ? 'w-6 h-2 bg-gradient-to-r from-violet-600 to-purple-600 shadow-sm'
                    : 'w-2 h-2 bg-purple-200 hover:bg-purple-300'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] font-semibold text-purple-950 flex items-center gap-1">
            <span className="text-purple-600">Page {currentPage + 1} of {totalPages}:</span>
            <span className="truncate max-w-[120px] sm:max-w-[180px] font-bold">
              {currentChapter.title}
            </span>
          </div>
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onNavigate(isLast ? 0 : currentPage + 1)}
          aria-label={isLast ? "Revisit from Page 1" : "Turn to next page"}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="hidden sm:inline">{isLast ? 'Start Over ↺' : 'Next Page'}</span>
          <span className="sm:hidden">{isLast ? '↺' : 'Next'}</span>
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

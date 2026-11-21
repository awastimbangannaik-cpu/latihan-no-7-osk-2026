import React, { useEffect, useState } from 'react';
import { BarChart3, Menu, X } from 'lucide-react';
import { AnimationLabView } from './components/AnimationLabView';
import { HomeView } from './components/HomeView';
import { KnowledgeCenterView } from './components/KnowledgeCenterView';
import { PerformanceCenterView } from './components/PerformanceCenterView';
import { QuestionBankView } from './components/QuestionBankView';
import { SolutionCenterView } from './components/SolutionCenterView';
import { AppTab, ProgressMap } from './types/physics';

const STORAGE_KEY = 'opl_misterjo_progress_v1';

function loadInitialProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

const NAV_ITEMS: Array<{ id: AppTab; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'knowledge', label: 'Knowledge Center' },
  { id: 'bank', label: 'Question Bank' },
  { id: 'animation', label: 'Animation Lab' },
  { id: 'solutions', label: 'Solution Center' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'bank';
    }
    return 'home';
  });
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [activeKnowledgeLevel, setActiveKnowledgeLevel] = useState<number>(1);
  const [progress, setProgress] = useState<ProgressMap>(loadInitialProgress);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleNavigate = (
    tab: AppTab,
    opts?: { questionId?: number; knowledgeLevel?: number }
  ) => {
    if (opts?.questionId) setActiveQuestionId(opts.questionId);
    if (opts?.knowledgeLevel) setActiveKnowledgeLevel(opts.knowledgeLevel);
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAnswer = (
    questionId: number,
    isCorrect: boolean,
    rawInput: string
  ) => {
    setProgress((prev) => {
      const existing = prev[questionId] ?? {
        status: 'unattempted',
        attempts: 0,
        lastInput: '',
        hintsRevealed: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          status: isCorrect ? 'correct' : 'incorrect',
          attempts: existing.attempts + 1,
          lastInput: rawInput,
          solvedAt: isCorrect ? new Date().toISOString() : existing.solvedAt,
        },
      };
    });
  };

  const handleRevealHint = (questionId: number, hintLevel: number) => {
    setProgress((prev) => {
      const existing = prev[questionId] ?? {
        status: 'unattempted',
        attempts: 0,
        lastInput: '',
        hintsRevealed: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          hintsRevealed: Math.max(existing.hintsRevealed, hintLevel),
        },
      };
    });
  };

  const handleResetProgress = () => {
    setProgress({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const solvedCount = Object.values(progress).filter(
    (p) => p.status === 'correct'
  ).length;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3B261E]">
      {/* Swiss Chocolate Top Bar (3-zone contract) */}
      <header className="border-b border-[#3B261E] bg-[#5B3828] text-[#FFFDF9]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-2 px-3 py-3 sm:gap-6 sm:px-6 sm:py-3.5 lg:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="font-display text-sm font-extrabold tracking-tight text-[#FFFDF9] whitespace-nowrap shrink-0 hover:text-[#E9DDD1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A62] sm:text-lg"
          >
            OLYMPIAD PHYSICS LAB
          </button>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Navigasi Utama"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 underline-offset-8 ${
                    isActive
                      ? 'font-semibold text-[#FFFDF9] underline decoration-[#C49A62] decoration-2'
                      : 'text-[#E9DDD1] hover:text-[#FFFDF9] hover:underline hover:decoration-[#C49A62]/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 shrink-0 sm:gap-2">
            <button
              type="button"
              onClick={() => handleNavigate('performance')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs ${
                activeTab === 'performance'
                  ? 'bg-[#C49A62] text-[#3B261E]'
                  : 'bg-[#FFFDF9] text-[#3B261E] hover:bg-[#E9DDD1]'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Performance ({solvedCount}/15)</span>
              <span className="sm:hidden">Skor ({solvedCount}/15)</span>
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#80563F] text-[#FFFDF9] lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            className="border-t border-[#80563F]/50 bg-[#3B261E] px-4 py-3 lg:hidden"
            aria-label="Navigasi Seluler"
          >
            <div className="flex flex-col gap-1">
              {[...NAV_ITEMS, { id: 'performance' as AppTab, label: 'Performance Center' }].map(
                (item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
                        isActive
                          ? 'bg-[#5B3828] text-[#FFFDF9]'
                          : 'text-[#E9DDD1] hover:bg-[#5B3828]/60'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-[1280px] px-4 py-7 sm:px-6 sm:py-9">
        {activeTab === 'home' && (
          <HomeView progress={progress} onNavigate={handleNavigate} />
        )}
        {activeTab === 'knowledge' && (
          <KnowledgeCenterView
            activeLevel={activeKnowledgeLevel}
            onSelectLevel={setActiveKnowledgeLevel}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'bank' && (
          <QuestionBankView
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
            progress={progress}
            onSubmitAnswer={handleSubmitAnswer}
            onRevealHint={handleRevealHint}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'animation' && (
          <AnimationLabView
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'solutions' && (
          <SolutionCenterView
            activeQuestionId={activeQuestionId}
            onSelectQuestion={setActiveQuestionId}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'performance' && (
          <PerformanceCenterView
            progress={progress}
            onResetProgress={handleResetProgress}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E9DDD1] bg-[#F4EEE7]/70 py-6 text-xs text-[#5B3828]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div>
            <strong className="font-semibold text-[#3B261E]">OLYMPIAD PHYSICS LAB</strong> · CITY
            LEVEL TRAINING · MENTOR: <strong className="font-semibold text-[#3B261E]">MISTER JO</strong>
          </div>
          <div>
            15 Soal Latihan Terstruktur Berbasis Soal Nomor 7 OSK Fisika SMA 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

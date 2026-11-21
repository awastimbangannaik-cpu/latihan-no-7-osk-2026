import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TIER_METADATA } from '../data/soal7Analysis';
import { AppTab, DifficultyTier } from '../types/physics';
import { NarratorBar, useNarrator } from './NarratorBar';
import { StructuredSolution } from './StructuredSolution';

interface SolutionCenterViewProps {
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  onNavigate: (
    tab: AppTab,
    opts?: { questionId?: number; knowledgeLevel?: number }
  ) => void;
}

export const SolutionCenterView: React.FC<SolutionCenterViewProps> = ({
  activeQuestionId,
  onSelectQuestion,
  onNavigate,
}) => {
  const narrator = useNarrator();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | DifficultyTier>('all');

  const filteredList = QUESTIONS_DATA.filter((q) => {
    const matchesTier = tierFilter === 'all' || q.tier === tierFilter;
    const term = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !term ||
      q.title.toLowerCase().includes(term) ||
      q.contextSubtitle.toLowerCase().includes(term) ||
      String(q.id) === term;
    return matchesTier && matchesSearch;
  });

  const currentQuestion =
    QUESTIONS_DATA.find((q) => q.id === activeQuestionId) ?? QUESTIONS_DATA[0];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              SOLUTION CENTER · MENTOR: MISTER JO
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#3B261E] sm:text-3xl">
              Pusat Pembahasan Lengkap, FBD, & Strategi Olimpiade
            </h1>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#80563F]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor atau topik soal..."
              aria-label="Cari pembahasan soal"
              className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] py-2 pr-3 pl-9 text-xs text-[#3B261E] placeholder:text-[#80563F]/70 focus:border-[#5B3828] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setTierFilter('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              tierFilter === 'all'
                ? 'bg-[#5B3828] text-[#FFFDF9]'
                : 'bg-[#F4EEE7] text-[#5B3828] hover:bg-[#E9DDD1]'
            }`}
          >
            Semua Pembahasan
          </button>
          {TIER_METADATA.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTierFilter(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                tierFilter === t.id
                  ? 'bg-[#5B3828] text-[#FFFDF9]'
                  : 'bg-[#F4EEE7] text-[#5B3828] hover:bg-[#E9DDD1]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Sidebar Selector */}
        <aside className="min-w-0 space-y-2 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-4 lg:col-span-4">
          <h2 className="px-2 text-xs font-bold tracking-wider text-[#80563F]">
            DAFTAR PEMBAHASAN ({filteredList.length})
          </h2>
          <div className="max-h-[580px] space-y-1.5 overflow-y-auto pr-1">
            {filteredList.length === 0 ? (
              <p className="px-2 py-4 text-xs text-[#80563F]">
                Tidak ada pembahasan yang cocok dengan pencarian Anda.
              </p>
            ) : (
              filteredList.map((q) => {
                const isSelected = q.id === currentQuestion.id;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      narrator.stop();
                      onSelectQuestion(q.id);
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      isSelected
                        ? 'border-[#5B3828] bg-[#5B3828] text-[#FFFDF9]'
                        : 'border-[#E9DDD1] bg-[#F4EEE7]/45 text-[#3B261E] hover:bg-[#E9DDD1]/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span>
                        Soal {q.id} · {q.tierLabel}
                      </span>
                      <span className="font-mono-num">
                        {q.formattedAnswer} {q.answerUnit}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-bold">{q.title}</div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Active Full 12-Step Solution + Narrator */}
        <div className="min-w-0 space-y-5 lg:col-span-8">
          <NarratorBar
            title={`Narator Pembahasan Soal ${currentQuestion.id} – Mister Jo`}
            narrator={narrator}
            actions={[
              {
                id: 'sol-diagram',
                buttonLabel: 'DENGARKAN DIAGRAM',
                text: currentQuestion.narratorScripts.diagram,
              },
              {
                id: 'sol-pembahasan',
                buttonLabel: 'DENGARKAN PEMBAHASAN',
                text: currentQuestion.narratorScripts.pembahasan,
              },
              {
                id: 'sol-soal',
                buttonLabel: 'DENGARKAN SOAL',
                text: currentQuestion.narratorScripts.soal,
              },
            ]}
          />

          <StructuredSolution
            question={currentQuestion}
            onJumpToKnowledge={(lv) =>
              onNavigate('knowledge', { knowledgeLevel: lv })
            }
          />
        </div>
      </div>
    </div>
  );
};

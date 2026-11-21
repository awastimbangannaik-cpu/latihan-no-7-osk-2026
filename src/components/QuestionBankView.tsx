import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  PlayCircle,
  XCircle,
} from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TIER_METADATA } from '../data/soal7Analysis';
import { AppTab, DifficultyTier, ProgressMap } from '../types/physics';
import { checkNumericAnswer } from '../utils/physicsMath';
import { MathRender } from './MathBlock';
import { NarratorBar, useNarrator } from './NarratorBar';
import { PhysicsAnimationCanvas } from './PhysicsAnimationCanvas';
import { PhysicsStimulus } from './PhysicsStimulus';
import { StructuredSolution } from './StructuredSolution';

interface QuestionBankViewProps {
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  progress: ProgressMap;
  onSubmitAnswer: (
    questionId: number,
    isCorrect: boolean,
    rawInput: string
  ) => void;
  onRevealHint: (questionId: number, hintLevel: number) => void;
  onNavigate: (
    tab: AppTab,
    opts?: { questionId?: number; knowledgeLevel?: number }
  ) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  activeQuestionId,
  onSelectQuestion,
  progress,
  onSubmitAnswer,
  onRevealHint,
  onNavigate,
}) => {
  const narrator = useNarrator();
  const [tierFilter, setTierFilter] = useState<'all' | DifficultyTier>('all');
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'invalid';
    message: string;
  } | null>(null);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const currentQuestion =
    QUESTIONS_DATA.find((q) => q.id === activeQuestionId) ?? QUESTIONS_DATA[0];
  const currentAttempt = progress[currentQuestion.id] ?? {
    status: 'unattempted',
    attempts: 0,
    lastInput: '',
    hintsRevealed: 0,
  };

  useEffect(() => {
    setInputValue(currentAttempt.lastInput || '');
    setFeedback(null);
    setIsSolutionOpen(false);
    narrator.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion.id]);

  const filteredQuestions =
    tierFilter === 'all'
      ? QUESTIONS_DATA
      : QUESTIONS_DATA.filter((q) => q.tier === tierFilter);

  const totalSolved = Object.values(progress).filter(
    (p) => p.status === 'correct'
  ).length;

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkNumericAnswer(inputValue, currentQuestion.exactNumericValue);
    if (!res.valid) {
      setFeedback({
        type: 'invalid',
        message:
          'Masukkan nilai numerik yang valid (gunakan koma atau titik sebagai pemisah desimal, contoh: 13,6).',
      });
      return;
    }

    onSubmitAnswer(currentQuestion.id, res.isCorrect, inputValue);

    if (res.isCorrect) {
      setFeedback({
        type: 'success',
        message: `Luar biasa! Jawaban Anda tepat: ${res.expectedFormatted} ${currentQuestion.answerUnit}. Progres Anda telah diperbarui oleh sistem.`,
      });
    } else {
      setFeedback({
        type: 'error',
        message:
          'Jawaban belum tepat. Periksa kembali pemilihan sumbu koordinat, satuan SI, dan hukum Fisika yang berlaku, atau buka Hint di bawah sebelum mencoba ulang.',
      });
    }
  };

  const revealedHints = currentAttempt.hintsRevealed;

  return (
    <div className="space-y-6">
      {/* Top Progress & Tier Filter Bar */}
      <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              OLYMPIAD QUESTION BANK · MENTOR: MISTER JO
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#3B261E]">
              15 Soal Latihan Olimpiade Fisika (Isian Singkat Numerik)
            </h1>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-[#80563F]">Progres Penguasaan</div>
            <div className="font-mono-num text-xl font-bold text-[#5B3828]">
              {totalSolved} / 15 Selesai Benar
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#F4EEE7]">
          <div
            className="h-full bg-[#5B3828] transition-all duration-300"
            style={{ width: `${(totalSolved / 15) * 100}%` }}
          />
        </div>

        {/* Tier Filter Buttons */}
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
            Semua (15)
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
              {t.label} ({t.rangeLabel})
            </button>
          ))}
        </div>

        {/* Question Number Matrix */}
        <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-15">
          {filteredQuestions.map((q) => {
            const st = progress[q.id]?.status ?? 'unattempted';
            const isActive = q.id === currentQuestion.id;
            return (
              <button
                key={q.id}
                type="button"
                aria-label={`Pilih Soal ${q.id}: ${q.title}`}
                onClick={() => onSelectQuestion(q.id)}
                className={`flex flex-col items-center justify-center rounded-lg border py-2 text-xs font-bold transition-colors ${
                  isActive
                    ? 'border-[#3B261E] bg-[#5B3828] text-[#FFFDF9]'
                    : st === 'correct'
                    ? 'border-[#059669]/40 bg-[#ECFDF5] text-[#065F46]'
                    : st === 'incorrect'
                    ? 'border-[#D97706]/40 bg-[#FFFBEB] text-[#92400E]'
                    : 'border-[#E9DDD1] bg-[#FFFDF9] text-[#3B261E] hover:bg-[#F4EEE7]'
                }`}
              >
                <span className="font-mono-num">{q.id}</span>
                <span className="mt-0.5 text-[10px] font-medium">
                  {st === 'correct' ? 'Benar' : st === 'incorrect' ? 'Ulang' : 'Baru'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Workspace */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left/Top Column: Stimulus + Narrator + Problem Statement */}
        <div className="min-w-0 space-y-5 lg:col-span-7">
          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9DDD1] pb-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#80563F]">
                <span>SOAL NOMOR {currentQuestion.id}</span>
                <span aria-hidden="true">·</span>
                <span>{currentQuestion.tierLabel.toUpperCase()}</span>
                <span aria-hidden="true">·</span>
                <span>MENTOR: MISTER JO</span>
              </div>
              <span className="text-xs font-semibold text-[#5B3828]">
                Status:{' '}
                {currentAttempt.status === 'correct'
                  ? 'Terjawab Benar'
                  : currentAttempt.status === 'incorrect'
                  ? 'Perlu Percobaan Ulang'
                  : 'Belum Dikerjakan'}
              </span>
            </div>

            <h2 className="mt-4 font-display text-xl font-bold text-[#3B261E] sm:text-2xl">
              {currentQuestion.title}
            </h2>
            <p className="mt-1 text-xs font-medium text-[#80563F]">
              {currentQuestion.contextSubtitle}
            </p>

            {/* Stimulus Visual */}
            <div className="mt-4 space-y-2">
              <PhysicsStimulus question={currentQuestion} mode="stimulus" />
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B3828]">
                <span>{currentQuestion.stimulusCaption}</span>
                <span className="font-mono-num font-semibold text-[#80563F]">
                  {currentQuestion.stimulusDataNote}
                </span>
              </div>
            </div>

            {/* Full Problem Text */}
            <div className="mt-5 rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/60 p-4">
              <div className="text-xs font-bold tracking-wide text-[#5B3828]">
                NASKAH SOAL
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-[#3B261E] sm:text-[15px]">
                {currentQuestion.questionText}
              </p>
            </div>

            {/* Known Data & Target Quantity */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#E9DDD1] p-3.5">
                <div className="text-xs font-bold text-[#5B3828]">DATA DIKETAHUI</div>
                <ul className="mt-2 space-y-1 text-xs text-[#3B261E]">
                  {currentQuestion.knownData.map((d) => (
                    <li key={d.symbol} className="flex items-center justify-between gap-2">
                      <span>
                        <MathRender latex={d.latexSymbol} /> ({d.name})
                      </span>
                      <span className="font-mono-num font-semibold">
                        {d.value} {d.unit !== '-' ? d.unit : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[#E9DDD1] p-3.5">
                <div className="text-xs font-bold text-[#5B3828]">BESARAN DITANYAKAN</div>
                <p className="mt-2 text-sm font-semibold text-[#3B261E]">
                  {currentQuestion.askedQuantity}
                </p>
                <div className="mt-2 text-xs text-[#80563F]">
                  Simbol: <MathRender latex={currentQuestion.askedSymbolLatex} /> · Satuan
                  Jawaban:{' '}
                  <span className="font-mono-num font-bold text-[#3B261E]">
                    {currentQuestion.answerUnit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Indonesian Voice Narrator Controls */}
          <NarratorBar
            title={`Narator Suara Soal ${currentQuestion.id} – Mister Jo`}
            narrator={narrator}
            actions={[
              {
                id: 'nar-stimulus',
                buttonLabel: 'DENGARKAN STIMULUS',
                text: currentQuestion.narratorScripts.stimulus,
              },
              {
                id: 'nar-soal',
                buttonLabel: 'DENGARKAN SOAL',
                text: currentQuestion.narratorScripts.soal,
              },
              {
                id: 'nar-diagram',
                buttonLabel: 'DENGARKAN DIAGRAM',
                text: currentQuestion.narratorScripts.diagram,
              },
              {
                id: 'nar-pembahasan',
                buttonLabel: 'DENGARKAN PEMBAHASAN',
                text: currentQuestion.narratorScripts.pembahasan,
              },
            ]}
          />
        </div>

        {/* Right Column: Numeric Answer Submission + Hints + Quick Actions */}
        <div className="min-w-0 space-y-5 lg:col-span-5">
          <form
            onSubmit={handleCheckAnswer}
            className="rounded-2xl border border-[#C49A62]/70 bg-[#FFFDF9] p-6 shadow-sm"
          >
            <div className="text-xs font-semibold tracking-wider text-[#80563F]">
              KOLOM JAWABAN NUMERIK
            </div>
            <label
              htmlFor={`answer-input-${currentQuestion.id}`}
              className="mt-1 block font-display text-lg font-bold text-[#3B261E]"
            >
              Masukkan Hasil Akhir (1 Angka Desimal)
            </label>
            <p className="mt-1 text-xs text-[#5B3828]">
              Gunakan tanda koma sebagai desimal (contoh: <span className="font-mono-num font-semibold">13,4</span> atau{' '}
              <span className="font-mono-num font-semibold">0,8</span>). Sistem juga menerima tanda titik dan melakukan pembulatan hanya pada hasil akhir.
            </p>

            <div className="mt-4 flex items-stretch gap-2">
              <input
                id={`answer-input-${currentQuestion.id}`}
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Contoh: 13,6"
                className="font-mono-num w-full rounded-xl border border-[#C49A62] bg-[#FFFDF9] px-4 py-3 text-base font-bold text-[#3B261E] placeholder:font-normal placeholder:text-[#80563F]/60 focus:border-[#5B3828] focus:outline-none"
              />
              <div className="flex items-center rounded-xl border border-[#E9DDD1] bg-[#F4EEE7] px-4 font-mono-num text-sm font-bold text-[#5B3828]">
                {currentQuestion.answerUnit}
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-[#5B3828] px-5 py-3 text-sm font-bold text-[#FFFDF9] transition-colors hover:bg-[#3B261E]"
            >
              PERIKSA JAWABAN
            </button>

            {feedback && (
              <div
                role="status"
                className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs leading-relaxed ${
                  feedback.type === 'success'
                    ? 'border-[#059669]/40 bg-[#ECFDF5] text-[#065F46]'
                    : 'border-[#B45309]/40 bg-[#FFFBEB] text-[#78350F]'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </form>

          {/* 3-Level Progressive Hint System */}
          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#5B3828]" aria-hidden="true" />
                <h3 className="font-display text-sm font-bold text-[#3B261E]">
                  Sistem Petunjuk Bertahap (3 Level)
                </h3>
              </div>
              <span className="font-mono-num text-xs text-[#80563F]">
                {revealedHints}/3 terbuka
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {[
                { level: 1, title: 'HINT 1: Pengingat Konsep Dasar', text: currentQuestion.hints.hint1 },
                { level: 2, title: 'HINT 2: Pemilihan Prinsip Fisika', text: currentQuestion.hints.hint2 },
                { level: 3, title: 'HINT 3: Persamaan Matematis', text: currentQuestion.hints.hint3 },
              ].map((h) => {
                const isUnlocked = revealedHints >= h.level;
                const canUnlock = revealedHints === h.level - 1;
                return (
                  <div
                    key={h.level}
                    className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/55 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#5B3828]">{h.title}</span>
                      {!isUnlocked && (
                        <button
                          type="button"
                          disabled={!canUnlock && h.level > 1 && revealedHints < h.level - 1}
                          onClick={() => onRevealHint(currentQuestion.id, h.level)}
                          className="rounded-lg border border-[#C49A62] bg-[#FFFDF9] px-2.5 py-1 text-[11px] font-semibold text-[#5B3828] hover:bg-[#E9DDD1] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          Buka Hint {h.level}
                        </button>
                      )}
                    </div>
                    {isUnlocked && (
                      <p className="mt-1.5 text-xs leading-relaxed text-[#3B261E]">
                        {h.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggle Solution & Theory Links */}
          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5 space-y-2.5">
            <button
              type="button"
              aria-expanded={isSolutionOpen}
              onClick={() => setIsSolutionOpen((prev) => !prev)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#5B3828] bg-[#F4EEE7] px-4 py-3 text-xs font-bold text-[#3B261E] transition-colors hover:bg-[#E9DDD1]"
            >
              {isSolutionOpen ? (
                <>
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  TUTUP PEMBAHASAN
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  BUKA PEMBAHASAN
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  onNavigate('knowledge', {
                    knowledgeLevel: currentQuestion.relatedKnowledgeLevel,
                  })
                }
                className="rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-3 py-2 text-xs font-semibold text-[#5B3828] hover:bg-[#F4EEE7]"
              >
                Teori Level {currentQuestion.relatedKnowledgeLevel}
              </button>
              <button
                type="button"
                onClick={() =>
                  onNavigate('animation', { questionId: currentQuestion.id })
                }
                className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-3 py-2 text-xs font-semibold text-[#5B3828] hover:bg-[#F4EEE7]"
              >
                <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Lab Penuh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible 12-Step Solution */}
      {isSolutionOpen && (
        <StructuredSolution
          question={currentQuestion}
          onJumpToKnowledge={(lv) =>
            onNavigate('knowledge', { knowledgeLevel: lv })
          }
        />
      )}

      {/* Embedded Physics Proof Animation for Every Question */}
      <PhysicsAnimationCanvas
        questionId={currentQuestion.id}
        questionTitle={currentQuestion.title}
        allowSpeedExplorer
      />
    </div>
  );
};

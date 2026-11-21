import React, { useState } from 'react';
import { ArrowRight, Award, RotateCcw } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { TIER_METADATA } from '../data/soal7Analysis';
import { AppTab, ProgressMap } from '../types/physics';

interface PerformanceCenterViewProps {
  progress: ProgressMap;
  onResetProgress: () => void;
  onNavigate: (
    tab: AppTab,
    opts?: { questionId?: number; knowledgeLevel?: number }
  ) => void;
}

export const PerformanceCenterView: React.FC<PerformanceCenterViewProps> = ({
  progress,
  onResetProgress,
  onNavigate,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const totalQuestions = QUESTIONS_DATA.length;
  const entries = QUESTIONS_DATA.map((q) => ({
    question: q,
    state: progress[q.id] ?? {
      status: 'unattempted' as const,
      attempts: 0,
      lastInput: '',
      hintsRevealed: 0,
    },
  }));

  const completedCount = entries.filter(
    (e) => e.state.status !== 'unattempted'
  ).length;
  const correctCount = entries.filter(
    (e) => e.state.status === 'correct'
  ).length;
  const incorrectCount = entries.filter(
    (e) => e.state.status === 'incorrect'
  ).length;
  const masteryPct = Math.round((correctCount / totalQuestions) * 100);

  // Study recommendations based on weak tiers or unattempted tiers
  const recommendations = TIER_METADATA.map((tier) => {
    const tierQs = entries.filter((e) => e.question.tier === tier.id);
    const tierCorrect = tierQs.filter((e) => e.state.status === 'correct').length;
    const tierIncorrect = tierQs.filter(
      (e) => e.state.status === 'incorrect'
    ).length;
    const firstPending = tierQs.find((e) => e.state.status !== 'correct');
    return {
      tier,
      total: tierQs.length,
      correct: tierCorrect,
      incorrect: tierIncorrect,
      firstPendingId: firstPending?.question.id ?? tierQs[0].question.id,
    };
  });

  const priorityRecommendations = recommendations.filter(
    (r) => r.correct < r.total
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#80563F]">
            PERFORMANCE CENTER · MENTOR: MISTER JO
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-[#3B261E] sm:text-3xl">
            Evaluasi Penguasaan & Rekomendasi Belajar Pribadi
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E9DDD1] bg-[#F4EEE7] px-4 py-2 text-xs font-semibold text-[#5B3828] transition-colors hover:bg-[#E9DDD1]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset Progres
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-xl border border-[#B45309]/40 bg-[#FFFBEB] px-3 py-2">
              <span className="text-xs font-semibold text-[#78350F]">
                Hapus semua progres?
              </span>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="rounded-lg bg-[#5B3828] px-2.5 py-1 text-xs font-bold text-[#FFFDF9]"
              >
                Ya, Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-2.5 py-1 text-xs font-semibold text-[#3B261E]"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
          <div className="text-xs font-semibold text-[#80563F]">SOAL DIKERJAKAN</div>
          <div className="mt-1 font-mono-num text-3xl font-bold text-[#3B261E]">
            {completedCount} / 15
          </div>
          <p className="mt-1 text-xs text-[#5B3828]">Total soal yang pernah dicoba</p>
        </div>

        <div className="rounded-2xl border border-[#059669]/30 bg-[#ECFDF5]/65 p-5">
          <div className="text-xs font-semibold text-[#065F46]">JAWABAN BENAR</div>
          <div className="mt-1 font-mono-num text-3xl font-bold text-[#065F46]">
            {correctCount}
          </div>
          <p className="mt-1 text-xs text-[#065F46]">Terverifikasi tepat 1 desimal</p>
        </div>

        <div className="rounded-2xl border border-[#D97706]/30 bg-[#FFFBEB]/65 p-5">
          <div className="text-xs font-semibold text-[#92400E]">PERLU DIPERBAIKI</div>
          <div className="mt-1 font-mono-num text-3xl font-bold text-[#92400E]">
            {incorrectCount}
          </div>
          <p className="mt-1 text-xs text-[#92400E]">Masih salah pada percobaan terakhir</p>
        </div>

        <div className="rounded-2xl border border-[#C49A62] bg-[#5B3828] p-5 text-[#FFFDF9]">
          <div className="text-xs font-semibold text-[#E9DDD1]">PERSENTASE PENGUASAAN</div>
          <div className="mt-1 font-mono-num text-3xl font-bold text-[#FFFDF9]">
            {masteryPct}%
          </div>
          <p className="mt-1 text-xs text-[#E9DDD1]">
            {masteryPct === 100
              ? 'Siap menghadapi OSK Fisika!'
              : 'Targetkan 100% di semua level'}
          </p>
        </div>
      </div>

      {/* Tier Breakdown + Recommendations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6 lg:col-span-7">
          <h2 className="font-display text-lg font-bold text-[#3B261E]">
            Rincian Penguasaan per Tingkat Kesulitan
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[#E9DDD1]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F4EEE7] text-[#5B3828]">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Tingkatan</th>
                  <th className="px-4 py-2.5 font-semibold">Cakupan</th>
                  <th className="px-4 py-2.5 font-semibold">Benar</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9DDD1]">
                {recommendations.map((rec) => {
                  const pct = Math.round((rec.correct / rec.total) * 100);
                  return (
                    <tr key={rec.tier.id}>
                      <td className="px-4 py-3 font-bold text-[#3B261E]">
                        {rec.tier.label}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#80563F]">
                        {rec.tier.rangeLabel}
                      </td>
                      <td className="px-4 py-3 font-mono-num font-bold text-[#3B261E]">
                        {rec.correct}/{rec.total} ({pct}%)
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold">
                        {rec.correct === rec.total ? (
                          <span className="text-[#065F46]">Tuntas</span>
                        ) : rec.incorrect > 0 ? (
                          <span className="text-[#92400E]">Perlu Penguatan</span>
                        ) : (
                          <span className="text-[#80563F]">Dalam Proses</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate('bank', { questionId: rec.firstPendingId })
                          }
                          className="text-xs font-bold text-[#5B3828] underline underline-offset-4 hover:text-[#3B261E]"
                        >
                          Latih
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mentor Recommendations */}
        <div className="min-w-0 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6 lg:col-span-5">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#C49A62]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#3B261E]">
              Rekomendasi Materi oleh Mister Jo
            </h2>
          </div>

          {priorityRecommendations.length === 0 ? (
            <div className="mt-4 rounded-xl border border-[#059669]/35 bg-[#ECFDF5] p-4 text-sm text-[#065F46]">
              Selamat! Seluruh 15 soal telah Anda taklukkan dengan sempurna. Anda dapat mengulang
              simulasi di Lab Animasi atau mengkaji Strategi Olimpiade Level 5 untuk kecepatan maksimal.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {priorityRecommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.tier.id}
                  className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/65 p-4"
                >
                  <div className="text-xs font-bold text-[#5B3828]">
                    {rec.incorrect > 0
                      ? `Ulangi Konsep ${rec.tier.label}`
                      : `Lanjutkan ke ${rec.tier.label}`}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#3B261E]">
                    {rec.tier.description} Pelajari kembali materi Level{' '}
                    {rec.tier.recommendedLevel} di Physics Knowledge Center sebelum mengerjakan
                    Soal {rec.firstPendingId}.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate('knowledge', {
                          knowledgeLevel: rec.tier.recommendedLevel,
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-[#C49A62] bg-[#FFFDF9] px-3 py-1.5 text-xs font-semibold text-[#5B3828] hover:bg-[#E9DDD1]"
                    >
                      Buka Teori Level {rec.tier.recommendedLevel}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate('bank', { questionId: rec.firstPendingId })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-[#5B3828] px-3 py-1.5 text-xs font-semibold text-[#FFFDF9] hover:bg-[#3B261E]"
                    >
                      Kerjakan Soal {rec.firstPendingId}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

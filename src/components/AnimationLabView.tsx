import React from 'react';
import { ArrowRight } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';
import { AppTab } from '../types/physics';
import { HighlightFormulaBox } from './MathBlock';
import { NarratorBar, useNarrator } from './NarratorBar';
import { PhysicsAnimationCanvas } from './PhysicsAnimationCanvas';

interface AnimationLabViewProps {
  activeQuestionId: number;
  onSelectQuestion: (id: number) => void;
  onNavigate: (tab: AppTab, opts?: { questionId?: number }) => void;
}

export const AnimationLabView: React.FC<AnimationLabViewProps> = ({
  activeQuestionId,
  onSelectQuestion,
  onNavigate,
}) => {
  const narrator = useNarrator();
  const currentQuestion =
    QUESTIONS_DATA.find((q) => q.id === activeQuestionId) ?? QUESTIONS_DATA[0];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              PHYSICS ANIMATION LAB · MENTOR: MISTER JO
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#3B261E] sm:text-3xl">
              Laboratorium Simulasi & Pembuktian Fenomena (15 Kasus)
            </h1>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('bank', { questionId: currentQuestion.id })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3828] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#3B261E] whitespace-nowrap shrink-0"
          >
            Kembali ke Soal {currentQuestion.id}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* 15 Question Lab Switcher */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-15">
          {QUESTIONS_DATA.map((q) => {
            const isActive = q.id === currentQuestion.id;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  narrator.stop();
                  onSelectQuestion(q.id);
                }}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition-colors ${
                  isActive
                    ? 'border-[#3B261E] bg-[#5B3828] text-[#FFFDF9]'
                    : 'border-[#E9DDD1] bg-[#F4EEE7]/70 text-[#3B261E] hover:bg-[#E9DDD1]'
                }`}
              >
                <span className="font-mono-num">Lab {q.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Simulator */}
      <PhysicsAnimationCanvas
        questionId={currentQuestion.id}
        questionTitle={`Soal ${currentQuestion.id}: ${currentQuestion.title}`}
        allowSpeedExplorer
      />

      {/* Scientific Context & Voice Narrator */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 space-y-4 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6 lg:col-span-7">
          <div className="text-xs font-semibold tracking-wider text-[#80563F]">
            PENJELASAN ILMIAH SIMULASI · {currentQuestion.tierLabel.toUpperCase()}
          </div>
          <h2 className="font-display text-lg font-bold text-[#3B261E]">
            {currentQuestion.contextSubtitle}
          </h2>
          <p className="text-sm leading-relaxed text-[#3B261E]">
            {currentQuestion.animationSummary}
          </p>
          <p className="text-sm leading-relaxed text-[#5B3828]">
            {currentQuestion.solution.analisisKonsep}
          </p>

          <HighlightFormulaBox
            label="Persamaan Fisika Penggerak Simulasi"
            latex={currentQuestion.solution.persamaanFisikaLatex}
            caption={currentQuestion.solution.persamaanPenjelasan}
            variant="beige"
          />
        </div>

        <div className="space-y-4 lg:col-span-5">
          <NarratorBar
            title={`Narator Lab Simulasi ${currentQuestion.id}`}
            narrator={narrator}
            actions={[
              {
                id: 'lab-diagram',
                buttonLabel: 'DENGARKAN DIAGRAM',
                text: currentQuestion.narratorScripts.diagram,
              },
              {
                id: 'lab-stimulus',
                buttonLabel: 'DENGARKAN STIMULUS',
                text: currentQuestion.narratorScripts.stimulus,
              },
              {
                id: 'lab-pembahasan',
                buttonLabel: 'DENGARKAN PEMBAHASAN',
                text: currentQuestion.narratorScripts.pembahasan,
              },
            ]}
          />

          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
            <h3 className="font-display text-sm font-bold text-[#3B261E]">
              Urutan 6 Tahap Pembuktian
            </h3>
            <ol className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-[#5B3828] list-decimal pl-4">
              <li>Kondisi awal sistem (kemiringan jalan θ, jari-jari r, posisi pusat massa).</li>
              <li>Proses gerak melingkar horizontal mobil pada lintasan melengkung.</li>
              <li>Perubahan besaran fisis (percepatan sentripetal a_s = v²/r ke sumbu pusat).</li>
              <li>Interaksi gaya antarobjek (normal N, berat W, gesek f_s, atau tali T).</li>
              <li>Kondisi akhir kesetimbangan sumbu vertikal dan dinamika sumbu radial.</li>
              <li>Pembuktian konsistensi Hukum I & II Newton pada gerak melingkar.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

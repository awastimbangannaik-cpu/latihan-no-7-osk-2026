import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { KNOWLEDGE_LEVELS } from '../data/knowledgeCenterData';
import { AppTab } from '../types/physics';
import { HighlightFormulaBox, MathRender } from './MathBlock';
import { NarratorBar, useNarrator } from './NarratorBar';
import { PhysicsAnimationCanvas } from './PhysicsAnimationCanvas';
import { KnowledgeDiagram } from './PhysicsStimulus';

interface KnowledgeCenterViewProps {
  activeLevel: number;
  onSelectLevel: (level: number) => void;
  onNavigate: (tab: AppTab, opts?: { questionId?: number }) => void;
}

export const KnowledgeCenterView: React.FC<KnowledgeCenterViewProps> = ({
  activeLevel,
  onSelectLevel,
  onNavigate,
}) => {
  const narrator = useNarrator();
  const levelData =
    KNOWLEDGE_LEVELS.find((l) => l.level === activeLevel) ?? KNOWLEDGE_LEVELS[0];

  const relatedQuestionId =
    levelData.level === 1
      ? 1
      : levelData.level === 2
      ? 2
      : levelData.level === 3
      ? 3
      : levelData.level === 4
      ? 5
      : 10;

  return (
    <div className="space-y-6">
      {/* Header & Level Selector */}
      <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              PHYSICS KNOWLEDGE CENTER · MENTOR: MISTER JO
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#3B261E] sm:text-3xl">
              Buku Teks Interaktif Dinamika Tikungan Miring (5 Level)
            </h1>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('bank', { questionId: relatedQuestionId })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3828] px-4 py-2.5 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#3B261E] whitespace-nowrap shrink-0"
          >
            Latih di Soal Terkait (Soal {relatedQuestionId})
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* 5-Level Segmented Navigation */}
        <div
          className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-5"
          role="tablist"
          aria-label="Level Materi Physics Knowledge Center"
        >
          {KNOWLEDGE_LEVELS.map((lv) => {
            const isActive = lv.level === levelData.level;
            return (
              <button
                key={lv.level}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  narrator.stop();
                  onSelectLevel(lv.level);
                }}
                className={`rounded-xl border px-3 py-2.5 text-left transition-colors duration-150 ${
                  isActive
                    ? 'border-[#3B261E] bg-[#5B3828] text-[#FFFDF9] shadow-sm'
                    : 'border-[#E9DDD1] bg-[#F4EEE7] text-[#3B261E] hover:bg-[#E9DDD1]'
                }`}
              >
                <div
                  className={`text-[11px] font-semibold ${
                    isActive ? 'text-[#E9DDD1]' : 'text-[#80563F]'
                  }`}
                >
                  Level {lv.level}
                </div>
                <div className="mt-0.5 truncate text-xs font-bold">
                  {lv.title.replace(`LEVEL ${lv.level} – `, '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Narrator Controls */}
      <NarratorBar
        title={`Narator Teori Level ${levelData.level} – Mister Jo`}
        narrator={narrator}
        actions={[
          {
            id: `theory-${levelData.level}`,
            buttonLabel: 'DENGARKAN TEORI',
            text: `${levelData.title}. ${levelData.subtitle}. ${levelData.narratorScript}`,
          },
          {
            id: `example-${levelData.level}`,
            buttonLabel: 'DENGARKAN CONTOH SOAL',
            text: `${levelData.workedExample.title}. ${levelData.workedExample.problem}. ${levelData.workedExample.conclusion}`,
          },
        ]}
      />

      {/* Main Textbook Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="min-w-0 space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#80563F]">
              <BookOpen className="h-4 w-4 text-[#5B3828]" aria-hidden="true" />
              <span>{levelData.title}</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-[#3B261E]">
              {levelData.subtitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5B3828]">{levelData.summary}</p>

            <div className="mt-6 space-y-6">
              {levelData.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3 border-t border-[#E9DDD1] pt-5">
                  <h3 className="font-display text-base font-bold text-[#3B261E]">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm leading-relaxed text-[#3B261E]">
                      {p}
                    </p>
                  ))}
                  {sec.bulletPoints && (
                    <ul className="space-y-1.5 pl-5 text-sm leading-relaxed text-[#3B261E] list-disc">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}
                  {sec.highlightFormulaLatex && (
                    <HighlightFormulaBox
                      label="Persamaan Kunci"
                      latex={sec.highlightFormulaLatex}
                      caption={sec.highlightCaption}
                      variant="beige"
                    />
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Worked Example Card */}
          <div className="rounded-2xl border border-[#C49A62]/70 bg-[#FFFDF9] p-6">
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              CONTOH SOAL & PEMBAHASAN TERPANDU
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-[#3B261E]">
              {levelData.workedExample.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#3B261E]">
              {levelData.workedExample.problem}
            </p>

            <div className="mt-4 space-y-3">
              {levelData.workedExample.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/65 p-4"
                >
                  <div className="text-xs font-bold text-[#5B3828]">{st.label}</div>
                  <MathRender latex={st.latex} displayMode className="my-1" />
                  <p className="text-xs text-[#5B3828]">{st.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-[#5B3828] px-4 py-3 text-xs font-medium text-[#FFFDF9]">
              Kesimpulan: {levelData.workedExample.conclusion}
            </div>
          </div>
        </div>

        {/* Right Column: Scientific Diagram & SI Symbol Table */}
        <div className="min-w-0 space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
            <h3 className="mb-3 font-display text-sm font-bold text-[#3B261E]">
              Ilustrasi Ilmiah & Diagram Vektor
            </h3>
            <KnowledgeDiagram variant={levelData.diagramVariant} />
          </div>

          <div className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
            <h3 className="mb-3 font-display text-sm font-bold text-[#3B261E]">
              Keterangan Simbol & Satuan SI
            </h3>
            <div className="overflow-x-auto rounded-lg border border-[#E9DDD1]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4EEE7] text-[#5B3828]">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Simbol</th>
                    <th className="px-3 py-2 font-semibold">Besaran & Makna</th>
                    <th className="px-3 py-2 font-semibold">Satuan SI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9DDD1]">
                  {levelData.symbols.map((sym) => (
                    <tr key={sym.symbolLatex}>
                      <td className="px-3 py-2.5 font-semibold">
                        <MathRender latex={sym.symbolLatex} />
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="font-semibold text-[#3B261E]">{sym.name}</div>
                        <div className="text-[11px] text-[#80563F]">{sym.meaning}</div>
                      </td>
                      <td className="px-3 py-2.5 font-mono-num text-[#5B3828]">
                        {sym.siUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation inside Knowledge Center for Levels 3, 4, 5 */}
      {levelData.hasInteractiveMiniSim && (
        <PhysicsAnimationCanvas
          questionId={relatedQuestionId}
          questionTitle={`Simulasi Terkait Level ${levelData.level}: ${levelData.subtitle}`}
          allowSpeedExplorer
        />
      )}
    </div>
  );
};

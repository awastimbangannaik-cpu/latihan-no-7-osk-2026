import React from 'react';
import { QuestionData } from '../types/physics';
import { HighlightFormulaBox, MathRender } from './MathBlock';
import { PhysicsStimulus } from './PhysicsStimulus';

interface StructuredSolutionProps {
  question: QuestionData;
  onJumpToKnowledge?: (level: number) => void;
}

export const StructuredSolution: React.FC<StructuredSolutionProps> = ({
  question,
  onJumpToKnowledge,
}) => {
  const sol = question.solution;

  return (
    <article className="space-y-6 rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9DDD1] pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#80563F]">
            PEMBAHASAN ILMIAH TERSTRUKTUR · MENTOR: MISTER JO
          </p>
          <h3 className="font-display text-xl font-bold text-[#3B261E]">
            Soal {question.id}: {question.title}
          </h3>
        </div>
        {onJumpToKnowledge && (
          <button
            type="button"
            onClick={() => onJumpToKnowledge(question.relatedKnowledgeLevel)}
            className="rounded-lg border border-[#C49A62] bg-[#F4EEE7] px-3 py-1.5 text-xs font-semibold text-[#5B3828] transition-colors hover:bg-[#E9DDD1] whitespace-nowrap shrink-0"
          >
            Buka Teori Pendukung (Level {question.relatedKnowledgeLevel})
          </button>
        )}
      </div>

      {/* 1. MEMAHAMI FENOMENA */}
      <section className="space-y-1.5">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          01. MEMAHAMI FENOMENA
        </h4>
        <p className="text-sm leading-relaxed text-[#3B261E]">{sol.memahamiFenomena}</p>
      </section>

      {/* 2. IDENTIFIKASI DATA & 3. IDENTIFIKASI PERTANYAAN */}
      <div className="grid gap-5 md:grid-cols-2">
        <section className="space-y-2">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            02. IDENTIFIKASI DATA
          </h4>
          <div className="overflow-x-auto rounded-lg border border-[#E9DDD1]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F4EEE7] text-[#5B3828]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Simbol</th>
                  <th className="px-3 py-2 font-semibold">Besaran</th>
                  <th className="px-3 py-2 font-semibold">Nilai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9DDD1]">
                {sol.identifikasiData.map((item) => (
                  <tr key={item.symbol}>
                    <td className="px-3 py-2 font-medium">
                      <MathRender latex={item.latexSymbol} />
                    </td>
                    <td className="px-3 py-2 text-[#3B261E]">{item.name}</td>
                    <td className="px-3 py-2 font-mono-num font-semibold text-[#3B261E]">
                      {item.value} {item.unit !== '-' ? item.unit : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            03. IDENTIFIKASI PERTANYAAN
          </h4>
          <div className="rounded-lg border border-[#E9DDD1] bg-[#F4EEE7]/60 p-4">
            <p className="text-sm leading-relaxed text-[#3B261E]">
              {sol.identifikasiPertanyaan}
            </p>
            <p className="mt-2 text-xs font-semibold text-[#80563F]">
              Target Simbol: <MathRender latex={question.askedSymbolLatex} /> · Satuan:{' '}
              <span className="font-mono-num text-[#3B261E]">{question.answerUnit}</span>
            </p>
          </div>
        </section>
      </div>

      {/* 4. ANALISIS KONSEP FISIKA */}
      <section className="space-y-1.5">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          04. ANALISIS KONSEP FISIKA
        </h4>
        <p className="text-sm leading-relaxed text-[#3B261E]">{sol.analisisKonsep}</p>
      </section>

      {/* 5. FREE BODY DIAGRAM */}
      <section className="space-y-3">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          05. FREE BODY DIAGRAM (DIAGRAM GAYA AKURAT)
        </h4>
        <p className="text-sm leading-relaxed text-[#3B261E]">{sol.fbdPenjelasan}</p>
        <div className="grid items-start gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PhysicsStimulus question={question} mode="fbd" />
          </div>
          <div className="space-y-2 lg:col-span-5">
            {sol.fbdVectors.map((vec) => (
              <div
                key={vec.label}
                className="rounded-lg border border-[#E9DDD1] bg-[#F4EEE7]/55 px-3.5 py-2.5"
              >
                <div className="text-xs font-bold text-[#5B3828]">{vec.label}</div>
                <div className="mt-0.5 text-xs text-[#3B261E]">Arah: {vec.direction}</div>
                <div className="mt-0.5 font-mono-num text-xs font-semibold text-[#80563F]">
                  Besar: {vec.magnitude}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PERSAMAAN FISIKA */}
      <section className="space-y-2">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          06. PERSAMAAN FISIKA UTAMA
        </h4>
        <HighlightFormulaBox
          label="Model Matematis Utama"
          latex={sol.persamaanFisikaLatex}
          caption={sol.persamaanPenjelasan}
          variant="gold"
        />
      </section>

      {/* 7. PENURUNAN PERSAMAAN */}
      <section className="space-y-2.5">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          07. PENURUNAN PERSAMAAN
        </h4>
        <div className="space-y-2.5">
          {sol.penurunanPersamaan.map((step, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-[#E9DDD1] bg-[#F4EEE7]/45 p-4"
            >
              <div className="text-xs font-bold text-[#5B3828]">{step.stepTitle}</div>
              <p className="mt-1 text-xs leading-relaxed text-[#3B261E]">{step.explanation}</p>
              <div className="mt-2 rounded-md bg-[#FFFDF9] px-3 py-1.5">
                <MathRender latex={step.latex} displayMode />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SUBSTITUSI DATA & 9. PERHITUNGAN */}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="space-y-2">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            08. SUBSTITUSI DATA
          </h4>
          <HighlightFormulaBox
            label="Substitusi Variabel SI"
            latex={sol.substitusiDataLatex}
            variant="milk"
          />
        </section>

        <section className="space-y-2">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            09. PERHITUNGAN BERTAHAP
          </h4>
          <div className="space-y-2">
            {sol.perhitunganLangkah.map((calc, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-3.5 py-2"
              >
                <div className="text-[11px] font-semibold text-[#80563F]">{calc.label}</div>
                <MathRender latex={calc.latex} displayMode className="text-sm" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 10. HASIL AKHIR */}
      <section className="space-y-2">
        <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
          10. HASIL AKHIR (SATU ANGKA DESIMAL)
        </h4>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#C49A62] bg-[#5B3828] px-5 py-4 text-[#FFFDF9]">
          <div className="text-sm font-medium text-[#E9DDD1]">
            Jawaban Numerik Tervalidasi ({question.askedQuantity})
          </div>
          <div className="font-mono-num text-2xl font-bold tracking-tight text-[#FFFDF9]">
            {sol.hasilAkhirNilai} {sol.hasilAkhirSatuan}
          </div>
        </div>
      </section>

      {/* 11. INTERPRETASI & 12. STRATEGI OLIMPIADE */}
      <div className="grid gap-5 md:grid-cols-2">
        <section className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/65 p-4">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            11. INTERPRETASI FISIS
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-[#3B261E]">{sol.interpretasi}</p>
        </section>

        <section className="rounded-xl border border-[#C49A62]/60 bg-[#E9DDD1]/50 p-4">
          <h4 className="font-display text-sm font-bold tracking-wide text-[#5B3828]">
            12. STRATEGI OLIMPIADE MISTER JO
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-[#3B261E]">
            {sol.strategiOlimpiade}
          </p>
        </section>
      </div>
    </article>
  );
};

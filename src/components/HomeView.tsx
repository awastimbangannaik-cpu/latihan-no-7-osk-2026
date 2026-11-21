import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, PlayCircle, Target } from 'lucide-react';
import { SOAL_7_ANALYSIS, SOAL_7_TRANSCRIPT, TIER_METADATA } from '../data/soal7Analysis';
import { QUESTIONS_DATA } from '../data/questionsData';
import { AppTab, ProgressMap } from '../types/physics';
import { HighlightFormulaBox } from './MathBlock';
import { PhysicsStimulus } from './PhysicsStimulus';

interface HomeViewProps {
  progress: ProgressMap;
  onNavigate: (tab: AppTab, opts?: { questionId?: number; knowledgeLevel?: number }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ progress, onNavigate }) => {
  const solvedCount = Object.values(progress).filter((p) => p.status === 'correct').length;

  return (
    <div className="space-y-10">
      {/* Hero Section: Two-column balanced split */}
      <section className="grid grid-cols-1 items-stretch gap-6 rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-5 shadow-sm sm:gap-8 sm:p-10 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col justify-between space-y-6 lg:col-span-7">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#80563F]">
              <span>OLYMPIAD PHYSICS LAB</span>
              <span aria-hidden="true">·</span>
              <span>CITY LEVEL TRAINING</span>
              <span aria-hidden="true">·</span>
              <span>MENTOR: MISTER JO</span>
            </div>

            <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-[#3B261E] sm:text-4xl lg:text-[2.65rem] [text-wrap:balance]">
              Kuasai Dinamika Tikungan Miring dari Konsep Dasar hingga Olimpiade Kota
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[#5B3828] sm:text-base">
              Ekosistem belajar Fisika terstruktur yang dibangun sepenuhnya dari analisis mendalam{' '}
              <strong className="font-semibold text-[#3B261E]">Soal Nomor 7 OSK Fisika SMA 2026</strong>.
              Dirancang oleh Mister Jo untuk membimbing siswa bertahap melalui teori buku teks 5 level,
              15 soal latihan numerik berstimulus ilmiah, animasi pembuktian real-time, serta pembahasan
              12 langkah lengkap dengan Free Body Diagram akurat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate('bank', { questionId: 1 })}
              className="inline-flex items-center gap-2 rounded-xl bg-[#5B3828] px-5 py-3 text-sm font-semibold text-[#FFFDF9] shadow-sm transition-colors hover:bg-[#3B261E] whitespace-nowrap shrink-0 sm:px-6 sm:py-3.5"
            >
              Mulai Latihan 15 Soal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('knowledge', { knowledgeLevel: 1 })}
              className="inline-flex items-center gap-2 rounded-xl border border-[#C49A62] bg-[#F4EEE7] px-4 py-3 text-sm font-semibold text-[#3B261E] transition-colors hover:bg-[#E9DDD1] whitespace-nowrap shrink-0 sm:px-5 sm:py-3.5"
            >
              <BookOpen className="h-4 w-4 text-[#5B3828]" aria-hidden="true" />
              Buka Physics Knowledge Center
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/70 p-4 sm:p-5 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#80563F]">
              <span>SOAL ACUAN UTAMA · NO. 7 OSK 2026</span>
              <span className="font-mono-num text-[#5B3828]">v = 13,4 m/s</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#3B261E]">
              “{SOAL_7_TRANSCRIPT}”
            </p>
          </div>

          <div className="my-3">
            <PhysicsStimulus
              question={QUESTIONS_DATA[2]}
              mode="fbd"
              overrideRadiusLabel="r = 50 m"
            />
          </div>

          <HighlightFormulaBox
            label="Persamaan Inti Soal Nomor 7"
            latex="\begin{gathered} N\cos\theta = mg, \qquad N\sin\theta = \frac{mv^2}{r} \\ \Longrightarrow\; v = \sqrt{g r \tan\theta} \end{gathered}"
            variant="beige"
          />
        </div>
      </section>

      {/* 4-column summary KPI strip */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
          <div className="text-xs font-semibold text-[#80563F]">TOTAL BANK SOAL</div>
          <div className="mt-1 font-mono-num text-2xl font-bold text-[#3B261E]">15 Soal</div>
          <p className="mt-1 text-xs text-[#5B3828]">Isian singkat numerik 1 angka desimal</p>
        </div>
        <div className="rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
          <div className="text-xs font-semibold text-[#80563F]">KURIKULUM TEORI</div>
          <div className="mt-1 font-mono-num text-2xl font-bold text-[#3B261E]">5 Level</div>
          <p className="mt-1 text-xs text-[#5B3828]">Fundamental hingga Olympiad Mastery</p>
        </div>
        <div className="rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
          <div className="text-xs font-semibold text-[#80563F]">SIMULASI & NARATOR</div>
          <div className="mt-1 font-mono-num text-2xl font-bold text-[#3B261E]">15 Lab</div>
          <p className="mt-1 text-xs text-[#5B3828]">Animasi 6 tahap + suara Bahasa Indonesia</p>
        </div>
        <div className="rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-5">
          <div className="text-xs font-semibold text-[#80563F]">PROGRES ANDA</div>
          <div className="mt-1 font-mono-num text-2xl font-bold text-[#5B3828]">
            {solvedCount} / 15
          </div>
          <p className="mt-1 text-xs text-[#5B3828]">Soal terjawab benar saat ini</p>
        </div>
      </section>

      {/* 5 Difficulty Tiers Roadmap */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#80563F]">
              PETA PENINGKATAN KOMPETENSI · MENTOR: MISTER JO
            </p>
            <h2 className="font-display text-2xl font-bold text-[#3B261E]">
              5 Tingkatan Pengembangan Soal Berbasis Nomor 7
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('animation', { questionId: 1 })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B3828] underline-offset-4 hover:underline"
          >
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Jelajahi Physics Animation Lab
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {TIER_METADATA.map((tier, idx) => {
            const tierQuestions = QUESTIONS_DATA.filter((q) => q.tier === tier.id);
            const tierSolved = tierQuestions.filter(
              (q) => progress[q.id]?.status === 'correct'
            ).length;
            return (
              <div
                key={tier.id}
                className="flex flex-col justify-between rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#80563F]">
                    <span>0{idx + 1}. {tier.rangeLabel}</span>
                    <span className="font-mono-num">{tierSolved}/3</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-bold text-[#3B261E]">
                    {tier.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5B3828]">
                    {tier.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onNavigate('bank', { questionId: tierQuestions[0]?.id ?? 1 })
                  }
                  className="mt-4 inline-flex items-center justify-between rounded-lg border border-[#E9DDD1] bg-[#F4EEE7] px-3 py-2 text-xs font-semibold text-[#3B261E] transition-colors hover:bg-[#E9DDD1]"
                >
                  <span>Kerjakan {tier.rangeLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12-Point Deep Analysis of Soal Nomor 7 */}
      <section className="rounded-2xl border border-[#E9DDD1] bg-[#FFFDF9] p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#E9DDD1] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#80563F]">
              <Target className="h-4 w-4 text-[#5B3828]" aria-hidden="true" />
              <span>HASIL ANALISIS ILMIAH MENDALAM · SOAL NOMOR 7</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-[#3B261E] sm:text-2xl">
              12 Pilar Fondasi Pembelajaran dari Soal Nomor 7 OSK 2026
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5B3828]">
            <CheckCircle2 className="h-4 w-4 text-[#C49A62]" aria-hidden="true" />
            <span>Tervalidasi oleh Tim Ahli & Mister Jo</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SOAL_7_ANALYSIS.map((item) => (
            <div
              key={item.number}
              className="rounded-xl border border-[#E9DDD1] bg-[#F4EEE7]/45 p-4"
            >
              <div className="text-xs font-bold text-[#80563F]">
                {String(item.number).padStart(2, '0')}. {item.aspect}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#3B261E]">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export type AppTab =
  | 'home'
  | 'knowledge'
  | 'bank'
  | 'animation'
  | 'solutions'
  | 'performance';

export type DifficultyTier =
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'hots'
  | 'olympiad';

export interface TierMeta {
  id: DifficultyTier;
  label: string;
  rangeLabel: string;
  description: string;
  recommendedLevel: number;
}

export interface VariableItem {
  symbol: string;
  latexSymbol: string;
  name: string;
  value: string;
  unit: string;
}

export interface SolutionSections {
  memahamiFenomena: string;
  identifikasiData: VariableItem[];
  identifikasiPertanyaan: string;
  analisisKonsep: string;
  fbdPenjelasan: string;
  fbdVectors: Array<{ label: string; direction: string; magnitude: string }>;
  persamaanFisikaLatex: string;
  persamaanPenjelasan: string;
  penurunanPersamaan: Array<{ stepTitle: string; explanation: string; latex: string }>;
  substitusiDataLatex: string;
  perhitunganLangkah: Array<{ label: string; latex: string }>;
  hasilAkhirNilai: string;
  hasilAkhirSatuan: string;
  interpretasi: string;
  strategiOlimpiade: string;
}

export interface QuestionData {
  id: number;
  tier: DifficultyTier;
  tierLabel: string;
  title: string;
  contextSubtitle: string;
  stimulusType:
    | 'banked-normal'
    | 'vector-decomposition'
    | 'ideal-banked'
    | 'highway-design'
    | 'fast-friction'
    | 'slow-normal'
    | 'max-speed-friction'
    | 'min-speed-velodrome'
    | 'funnel-graph'
    | 'rollover-limit'
    | 'cabin-pendulum'
    | 'tangential-accel-table'
    | 'parabolic-track'
    | 'slip-vs-tip-height'
    | 'coupled-hanging-mass';
  stimulusCaption: string;
  stimulusDataNote: string;
  questionText: string;
  knownData: VariableItem[];
  askedQuantity: string;
  askedSymbolLatex: string;
  answerUnit: string;
  exactNumericValue: number;
  roundedAnswer: number;
  formattedAnswer: string;
  hints: {
    hint1: string;
    hint2: string;
    hint3: string;
  };
  solution: SolutionSections;
  relatedKnowledgeLevel: number;
  animationSummary: string;
  narratorScripts: {
    stimulus: string;
    soal: string;
    diagram: string;
    pembahasan: string;
  };
}

export interface KnowledgeSymbol {
  symbolLatex: string;
  name: string;
  siUnit: string;
  meaning: string;
}

export interface KnowledgeLevelData {
  level: number;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    highlightFormulaLatex?: string;
    highlightCaption?: string;
    bulletPoints?: string[];
  }>;
  symbols: KnowledgeSymbol[];
  workedExample: {
    title: string;
    problem: string;
    steps: Array<{ label: string; latex: string; note: string }>;
    conclusion: string;
  };
  diagramVariant:
    | 'level1-geometry'
    | 'level2-axes'
    | 'level3-derivation'
    | 'level4-friction-graph'
    | 'level5-rollover-coupled';
  hasInteractiveMiniSim: boolean;
  narratorScript: string;
}

export interface QuestionAttemptState {
  status: 'unattempted' | 'correct' | 'incorrect';
  attempts: number;
  lastInput: string;
  hintsRevealed: number; // 0, 1, 2, or 3
  solvedAt?: string;
}

export type ProgressMap = Record<number, QuestionAttemptState>;

import { TierMeta } from '../types/physics';

export interface Soal7AnalysisItem {
  number: number;
  aspect: string;
  content: string;
}

export const SOAL_7_TRANSCRIPT =
  'Sebuah mobil sedan bermassa 1 ton sedang berada di suatu belokan melingkar yang miring dengan kondisi seperti pada gambar. Diketahui nilai θ = 20°, jari-jari lingkaran belokan ke pm mobil adalah r = 50 m, dan percepatan g = 9,8 m/s². Kecepatan mobil agar mobil tidak terbalik saat melewati belokan tersebut adalah ... m/s.';

export const SOAL_7_ANALYSIS: Soal7AnalysisItem[] = [
  {
    number: 1,
    aspect: 'Materi Utama yang Diujikan',
    content: 'Dinamika Gerak Melingkar Beraturan pada Tikungan Miring (Banked Curve Dynamics — Hukum Newton).',
  },
  {
    number: 2,
    aspect: 'Submateri & Konsep Fisika Terlibat',
    content:
      'Gaya sentripetal sebagai resultan gaya horizontal, penguraian gaya normal (N cos θ dan N sin θ), kesetimbangan vertikal, kesetimbangan momen/torka tanpa gaya gesek samping, dan perluasan ke tikungan miring kasar serta ambang guling.',
  },
  {
    number: 3,
    aspect: 'Hukum & Prinsip Fisika Dasar',
    content:
      'Hukum I Newton pada arah vertikal (ΣF_y = 0) dan Hukum II Newton untuk gerak melingkar horizontal (ΣF_x = m·v²/r), serta prinsip kesetimbangan rotasi pada laju desain ideal (f_s = 0 sehingga resultan gaya reaksi jalan segaris dengan pusat massa).',
  },
  {
    number: 4,
    aspect: 'Seluruh Variabel yang Diketahui',
    content:
      'Massa mobil m = 1 ton = 1000 kg; sudut kemiringan jalan θ = 20°; jari-jari lintasan pusat massa r = 50 m; percepatan gravitasi g = 9,8 m/s².',
  },
  {
    number: 5,
    aspect: 'Besaran yang Ditanyakan',
    content: 'Kecepatan (kelajuan) mobil v dalam satuan m/s agar mobil melaju stabil melewati belokan tanpa tergelincir/terbalik (nilai acuan Soal 7: 13,4 m/s).',
  },
  {
    number: 6,
    aspect: 'Hubungan Matematis Antarbesaran',
    content:
      'N cos θ = m g dan N sin θ = m v² / r. Eliminasi m dan N menghasilkan tan θ = v² / (g r), sehingga v = √(g · r · tan θ).',
  },
  {
    number: 7,
    aspect: 'Karakteristik Fenomena pada Stimulus Asli',
    content:
      'Bidang jalan miring menurun ke arah pusat lingkaran di sebelah kanan; sumbu x mengarah horizontal ke pusat lingkaran (+x ke kanan) dan sumbu y vertikal ke atas. Vektor gaya normal N tegak lurus jalan (miring θ terhadap vertikal) dan W vertikal ke bawah.',
  },
  {
    number: 8,
    aspect: 'Struktur Penalaran yang Dibutuhkan',
    content:
      'Mengidentifikasi bahwa lintasan lingkaran mobil bersifat horizontal (bukan sejajar bidang miring), memilih koordinat horizontal-vertikal agar percepatan sentripetal sejajar satu sumbu, menguraikan N (bukan W), lalu mengeliminasi massa m.',
  },
  {
    number: 9,
    aspect: 'Tingkat Kesulitan Soal Acuan',
    content:
      'Dasar–Menengah OSK (memiliki jebakan konseptual klasik: siswa sering keliru menguraikan berat W menjadi W sin θ karena terbiasa dengan soal balok meluncur di bidang miring lurus).',
  },
  {
    number: 10,
    aspect: 'Konsep Prasyarat Siswa',
    content:
      'Trigonometri dasar (sin, cos, tan), dekomposisi vektor 2D, Hukum I & II Newton, dan kinematika percepatan sentripetal a_s = v²/r = ω²r.',
  },
  {
    number: 11,
    aspect: 'Materi Pendukung Relevan',
    content:
      'Gaya gesek statis (f_s ≤ μ_s N) untuk variasi kecepatan v > v_ideal atau v < v_ideal, syarat terguling berbasis jarak roda d dan tinggi pusat massa h, lintasan lengkung parabolik, dan sistem terkopel.',
  },
  {
    number: 12,
    aspect: 'Potensi Pengembangan Soal Olimpiade',
    content:
      'Dikembangkan menjadi 15 soal terstruktur dari konsep dasar N dan F_s, desain sudut jalan tol, gaya gesek dua arah, v_maks dan v_min, periode kerucut, batas terguling vs selip, bandul kabin, percepatan tangensial gabungan, lintasan parabolik, hingga sistem katrol-tikungan miring.',
  },
];

export const TIER_METADATA: TierMeta[] = [
  {
    id: 'basic',
    label: 'Basic Concept',
    rangeLabel: 'Soal 1 – 3',
    description: 'Memahami gaya normal, gaya sentripetal, dan persamaan dasar kelajuan ideal pada tikungan miring.',
    recommendedLevel: 1,
  },
  {
    id: 'intermediate',
    label: 'Intermediate Application',
    rangeLabel: 'Soal 4 – 6',
    description: 'Merancang sudut tikungan jalan dan menganalisis gaya gesek statis serta gaya normal saat laju menyimpang dari ideal.',
    recommendedLevel: 3,
  },
  {
    id: 'advanced',
    label: 'Advanced Analysis',
    rangeLabel: 'Soal 7 – 9',
    description: 'Menentukan batas kelajuan maksimum, minimum pada lintasan curam, serta analisis grafik periode gerak melingkar.',
    recommendedLevel: 4,
  },
  {
    id: 'hots',
    label: 'Higher Order Thinking',
    rangeLabel: 'Soal 10 – 12',
    description: 'Menganalisis kesetimbangan momen terguling (tidak terbalik), bandul dalam kabin, dan gerak melingkar dipercepat.',
    recommendedLevel: 5,
  },
  {
    id: 'olympiad',
    label: 'City Olympiad Challenge',
    rangeLabel: 'Soal 13 – 15',
    description: 'Tantangan OSK tingkat lanjut: lintasan berprofil parabolik, kompetisi selip vs terguling, dan sistem tali-beban terkopel.',
    recommendedLevel: 5,
  },
];

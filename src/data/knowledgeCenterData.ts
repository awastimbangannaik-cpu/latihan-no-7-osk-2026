import { KnowledgeLevelData } from '../types/physics';

export const KNOWLEDGE_LEVELS: KnowledgeLevelData[] = [
  {
    level: 1,
    slug: 'fundamental-knowledge',
    title: 'LEVEL 1 – FUNDAMENTAL KNOWLEDGE',
    subtitle: 'Fenomena Tikungan Miring, Besaran Pokok, & Geometri Dasar',
    summary:
      'Membangun intuisi fisik mengapa jalan balap dan tol dibuat miring, membedakan bidang lintasan horizontal dengan kemiringan permukaan jalan, serta menyiapkan perangkat trigonometri.',
    sections: [
      {
        heading: '1. Mengapa Tikungan Jalan Dibuat Miring?',
        paragraphs: [
          'Ketika sebuah mobil berbelok mengikuti lintasan melingkar datar, seluruh gaya yang membelokkan mobil ke arah pusat lingkaran harus disuplai oleh gaya gesek statis antara ban dan aspal. Jika jalan licin (basah atau berpasir) atau kelajuan mobil terlalu tinggi, gaya gesek tidak lagi mencukupi dan mobil tergelincir keluar tikungan.',
          'Dengan memiringkan permukaan jalan sebesar sudut θ terhadap bidang horizontal (bagian luar tikungan lebih tinggi daripada bagian dalam yang menghadap pusat kelengkungan), gaya normal N dari permukaan jalan ikut miring sebesar sudut θ terhadap garis vertikal. Akibatnya, sebagian komponen gaya normal (N sin θ) secara alami mengarah horizontal menuju pusat lingkaran dan bertindak sebagai gaya sentripetal, bahkan tanpa bantuan gaya gesek sama sekali.',
        ],
        highlightFormulaLatex: '\\vec{F}_{\\text{sentripetal}} = N \\sin\\theta \\, \\hat{i}',
        highlightCaption: 'Komponen horizontal gaya normal menyumbang gaya sentripetal murni pada tikungan miring ideal.',
      },
      {
        heading: '2. Geometri Lingkaran Horizontal vs Bidang Miring',
        paragraphs: [
          'Kesalahan paling fatal bagi pemula dalam menganalisis Soal Nomor 7 adalah membayangkan mobil meluncur turun atau naik bidang miring seperti balok di papan miring biasa. Padahal, mobil bergerak mengelilingi lingkaran pada bidang HORIZONTAL dengan jari-jari r yang diukur secara mendatar dari pusat massa mobil ke sumbu vertikal pusat belokan.',
          'Oleh sebab itu, vektor percepatan sentripetal a_s selalu mengarah mendatar (horizontal) menuju pusat lingkaran, TIDAK sejajar permukaan jalan miring.',
        ],
        bulletPoints: [
          'Sudut kemiringan θ diukur antara permukaan jalan dan bidang datar horizontal.',
          'Jari-jari r adalah jarak horizontal dari pusat massa (pm) mobil ke sumbu putar vertikal.',
          'Massa m mobil pada kasus ideal (tanpa gesekan) akan saling meniadakan saat menghitung kecepatan rancangan.',
        ],
      },
    ],
    symbols: [
      { symbolLatex: 'm', name: 'Massa kendaraan', siUnit: 'kg', meaning: '1 ton = 1000 kg' },
      { symbolLatex: '\\theta', name: 'Sudut kemiringan jalan', siUnit: 'derajat (°) / rad', meaning: 'Sudut elevasi permukaan jalan terhadap horizontal' },
      { symbolLatex: 'r', name: 'Jari-jari belokan', siUnit: 'm', meaning: 'Jarak horizontal dari pusat massa ke pusat kelengkungan' },
      { symbolLatex: 'v', name: 'Kelajuan linear', siUnit: 'm/s', meaning: 'Laju tangensial mobil saat melintasi tikungan' },
      { symbolLatex: 'N', name: 'Gaya normal', siUnit: 'N', meaning: 'Gaya tekan permukaan jalan tegak lurus bidang miring' },
      { symbolLatex: 'W', name: 'Gaya berat', siUnit: 'N', meaning: 'W = m · g, selalu vertikal ke bawah' },
      { symbolLatex: 'g', name: 'Percepatan gravitasi', siUnit: 'm/s²', meaning: 'Di Soal 7 acuan digunakan g = 9,8 m/s²' },
    ],
    workedExample: {
      title: 'Contoh Dasar: Mengurai Komponen Gaya Normal',
      problem:
        'Sebuah mobil bermassa 1000 kg menghasilkan gaya normal N = 10,43 kN saat melewati tikungan miring bersudut θ = 20°. Tentukan komponen vertikal N_y dan komponen horizontal N_x.',
      steps: [
        {
          label: 'Komponen Vertikal',
          latex: 'N_y = N \\cos\\theta = 10430 \\cos 20^\\circ \\approx 9800\\text{ N}',
          note: 'Tepat mengimbangi gaya berat W = m·g = 1000 × 9,8 = 9800 N.',
        },
        {
          label: 'Komponen Horizontal (Sentripetal)',
          latex: 'N_x = N \\sin\\theta = 10430 \\sin 20^\\circ \\approx 3567\\text{ N}',
          note: 'Mengarah horizontal ke pusat belokan untuk membelokkan arah gerak mobil.',
        },
      ],
      conclusion: 'Komponen vertikal menjaga mobil tidak naik/turun secara vertikal, sementara komponen horizontal membelokkan mobil.',
    },
    diagramVariant: 'level1-geometry',
    hasInteractiveMiniSim: false,
    narratorScript:
      'Selamat datang di Level 1 Pusat Teori bersama Mister Jo. Pada tingkat dasar ini, pahami satu kunci utama tikungan miring: lintasan mobil berbentuk lingkaran horizontal, sehingga percepatan sentripetal selalu mengarah horizontal ke pusat belokan, bukan sejajar bidang miring. Dengan memiringkan jalan sebesar sudut teta, gaya normal N terurai menjadi komponen vertikal N kosinus teta yang menahan berat mobil, dan komponen horizontal N sinus teta yang membelokkan mobil menuju pusat lingkaran.',
  },
  {
    level: 2,
    slug: 'conceptual-understanding',
    title: 'LEVEL 2 – CONCEPTUAL UNDERSTANDING',
    subtitle: 'Pemilihan Sistem Koordinat, Hukum Newton, & Syarat Berlakunya Persamaan',
    summary:
      'Memahami alasan teoretis pemilihan sumbu x-y horizontal-vertikal seperti pada gambar Soal Nomor 7, makna fisis tiap persamaan, serta batas asumsi ideal.',
    sections: [
      {
        heading: '1. Aturan Emas Pemilihan Sumbu Koordinat dalam Hukum Newton',
        paragraphs: [
          'Hukum II Newton menyatakan ΣF = m·a secara vektor. Secara aljabar, analisis akan jauh lebih sederhana apabila salah satu sumbu koordinat diletakkan SEJAJAR dengan arah percepatan total a.',
          'Pada kasus tikungan miring dengan laju konstan (Gerak Melingkar Beraturan), percepatan total hanyalah percepatan sentripetal a_s = v²/r yang berarah horizontal menuju pusat lingkaran. Tidak ada percepatan ke arah vertikal (a_y = 0). Inilah sebabnya pada diagram Soal Nomor 7, sumbu-x dipilih mendatar ke kanan dan sumbu-y dipilih tegak lurus ke atas.',
        ],
        highlightFormulaLatex: '\\Sigma F_x = m\\frac{v^2}{r}, \\qquad \\Sigma F_y = 0',
        highlightCaption: 'Memilih sumbu x sejajar percepatan sentripetal memastikan percepatan pada sumbu y bernilai tepat nol.',
      },
      {
        heading: '2. Makna Fisis "Tidak Terbalik" & Asumsi Ideal pada Soal Nomor 7',
        paragraphs: [
          'Pada keadaan ideal tanpa gaya gesek samping (f_s = 0), gaya yang bekerja pada mobil hanyalah gaya berat W (melalui pusat massa) dan gaya normal total N (tegak lurus jalan). Jika laju mobil tepat memenuhi v = √(g r tan θ), resultan N dan W tepat menghasilkan gaya sentripetal yang diperlukan tanpa memerlukan gaya gesek samping.',
          'Selain mencegah selip, kondisi f_s = 0 juga membuat beban normal terdistribusi simetris antara ban dalam dan ban luar sehingga torka pengguling terhadap pusat massa bernilai nol — mobil melaju stabil tanpa kecenderungan selip maupun terbalik.',
        ],
        bulletPoints: [
          'Syarat berlaku v = √(g r tan θ): lintasan melingkar horizontal, laju konstan, dan gaya gesek lateral f_s = 0.',
          'Apabila v > √(g r tan θ) tanpa gesekan, N sin θ tidak cukup membelokkan mobil sehingga mobil bergeser naik/keluar bidang.',
          'Apabila v < √(g r tan θ) tanpa gesekan, N sin θ terlalu besar sehingga mobil meluncur turun ke dalam belokan.',
        ],
      },
    ],
    symbols: [
      { symbolLatex: 'a_s', name: 'Percepatan sentripetal', siUnit: 'm/s²', meaning: 'a_s = v²/r mengarah horizontal ke pusat belokan' },
      { symbolLatex: '\\Sigma F_x', name: 'Resultan gaya horizontal', siUnit: 'N', meaning: 'Total proyeksi gaya menuju pusat lingkaran' },
      { symbolLatex: '\\Sigma F_y', name: 'Resultan gaya vertikal', siUnit: 'N', meaning: 'Bernilai nol karena tidak ada gerak naik-turun' },
      { symbolLatex: 'v_0', name: 'Kelajuan rancangan ideal', siUnit: 'm/s', meaning: 'Kelajuan saat gaya gesek samping tepat nol' },
    ],
    workedExample: {
      title: 'Uji Konseptual: Apa yang Terjadi Jika Massa Mobil Digandakan?',
      problem:
        'Sebuah truk bermassa 4 ton melewati belokan yang sama dengan mobil sedan 1 ton (θ = 20°, r = 50 m) tanpa gaya gesek samping. Bandingkan kelajuan ideal keduanya.',
      steps: [
        {
          label: 'Persamaan Kesetimbangan',
          latex: 'N\\sin\\theta = m\\frac{v^2}{r}, \\quad N\\cos\\theta = mg',
          note: 'Kedua persamaan memuat faktor massa m secara linear.',
        },
        {
          label: 'Eliminasi Massa',
          latex: '\\frac{N\\sin\\theta}{N\\cos\\theta} = \\frac{m v^2 / r}{m g} \\implies \\tan\\theta = \\frac{v^2}{gr}',
          note: 'Massa m saling meniadakan, sehingga v = √(g r tan θ) independen terhadap massa.',
        },
      ],
      conclusion: 'Baik sedan 1 ton maupun truk 4 ton memiliki kelajuan ideal yang sama persis, yaitu 13,4 m/s.',
    },
    diagramVariant: 'level2-axes',
    hasInteractiveMiniSim: false,
    narratorScript:
      'Pada Level 2 ini, mari pahami logika fisika di balik koordinat Soal Nomor 7. Karena percepatan sentripetal berarah horizontal ke kanan, kita memasang sumbu x mendatar dan sumbu y vertikal. Jika kita memaksa memakai sumbu sejajar bidang miring tanpa hati-hati, percepatan sentripetal pun harus diuraikan ke dua sumbu, yang justru sering menjebak siswa. Pada laju ideal v sama dengan akar g kali r kali tangen teta, gaya gesek samping bernilai nol, massa mobil tereliminasi, dan beban roda dalam maupun luar seimbang sempurna.',
  },
  {
    level: 3,
    slug: 'mathematical-application',
    title: 'LEVEL 3 – MATHEMATICAL APPLICATION',
    subtitle: 'Penurunan Persamaan Lengkap, Analisis Dimensi, & Bedah Kasus Soal 7',
    summary:
      'Menurunkan rumus kelajuan tikungan miring langkah demi langkah, melakukan analisis satuan SI, dan menyelesaikan Soal Nomor 7 asli secara presisi.',
    sections: [
      {
        heading: '1. Penurunan Matematis Lengkap (Dari Hukum Newton ke Kecepatan Ideal)',
        paragraphs: [
          'Tuliskan Hukum Newton pada masing-masing sumbu inersia: sumbu-y vertikal dan sumbu-x horizontal menuju pusat lingkaran.',
          'Dari sumbu-y, kita memperoleh ekspresi gaya normal N = mg / cos θ. Perhatikan bahwa pada tikungan miring ideal saat berbelok, nilai gaya normal N LEBIH BESAR daripada berat mg (karena cos θ < 1). Substitusikan N ke persamaan sumbu-x untuk mendapatkan kecepatan ideal v.',
        ],
        highlightFormulaLatex:
          'N = \\frac{mg}{\\cos\\theta} \\;\\Longrightarrow\\; \\left(\\frac{mg}{\\cos\\theta}\\right)\\sin\\theta = \\frac{mv^2}{r} \\;\\Longrightarrow\\; v = \\sqrt{g r \\tan\\theta}',
        highlightCaption: 'Persamaan utama tikungan miring ideal dan hubungan langsung dengan Soal Nomor 7.',
      },
      {
        heading: '2. Analisis Dimensi & Konsistensi Satuan SI',
        paragraphs: [
          'Sebelum memasukkan angka, seorang fisikawan olimpiade selalu memeriksa dimensi persamaan. Besaran tan θ tidak berdimensi. Hasil kali g · r memiliki dimensi [L T⁻²] · [L] = [L² T⁻²]. Ketika diakarkan, √(g r tan θ) memiliki dimensi [L T⁻¹], atau satuan m/s dalam sistem SI.',
          'Pastikan seluruh masukan telah dikonversi ke SI sebelum substitusi: 1 ton = 1000 kg, km/jam dibagi 3,6 menjadi m/s, dan sudut dalam derajat sesuai mode kalkulator.',
        ],
      },
    ],
    symbols: [
      { symbolLatex: '\\tan\\theta', name: 'Tangen sudut kemiringan', siUnit: 'tak berdimensi', meaning: 'Rasio sin θ / cos θ' },
      { symbolLatex: '1\\text{ ton}', name: 'Konversi massa', siUnit: '1000 kg', meaning: 'Satuan massa standar SI untuk kendaraan' },
      { symbolLatex: '1\\text{ m/s}', name: 'Konversi kelajuan', siUnit: '3,6 km/jam', meaning: 'Bagi km/jam dengan 3,6 untuk mendapatkan m/s' },
    ],
    workedExample: {
      title: 'Penyelesaian Resmi Soal Nomor 7 OSK Fisika 2026',
      problem:
        'Diketahui m = 1 ton = 1000 kg, θ = 20°, r = 50 m, dan g = 9,8 m/s². Hitung kecepatan mobil agar melaju stabil tanpa tergelincir/terbalik.',
      steps: [
        {
          label: '1. Keseimbangan Vertikal & Gaya Normal',
          latex: 'N = \\frac{m g}{\\cos 20^\\circ} = \\frac{1000 \\times 9{,}8}{0{,}939693} = 10428{,}9\\text{ N}',
          note: 'Pertahankan presisi penuh selama proses perhitungan.',
        },
        {
          label: '2. Gaya Sentripetal & Eliminasi',
          latex: 'v = \\sqrt{g r \\tan\\theta} = \\sqrt{9{,}8 \\times 50 \\times \\tan 20^\\circ}',
          note: 'tan 20° ≈ 0,363970234.',
        },
        {
          label: '3. Hasil Numerik Presisi',
          latex: 'v = \\sqrt{490 \\times 0{,}363970234} = \\sqrt{178{,}345415} = 13{,}3546\\text{ m/s} \\approx 13{,}4\\text{ m/s}',
          note: 'Pembulatan satu angka desimal dilakukan hanya pada hasil akhir.',
        },
      ],
      conclusion: 'Kelajuan ideal mobil pada Soal Nomor 7 adalah 13,4 m/s (setara sekitar 48,1 km/jam).',
    },
    diagramVariant: 'level3-derivation',
    hasInteractiveMiniSim: true,
    narratorScript:
      'Di Level 3, kita menurunkan rumus secara matematis. Dari sumbu vertikal, N kosinus teta sama dengan m kali g, sehingga N sama dengan m g dibagi kosinus teta. Substitusi ke sumbu horizontal menghasilkan N sinus teta sama dengan m v kuadrat per r. Sederhanakan m dan ganti sinus per kosinus menjadi tangen teta, maka diperoleh v sama dengan akar dari g kali r kali tangen teta. Untuk Soal Nomor 7 dengan sudut teta 20 derajat, jari-jari 50 meter, dan gravitasi 9 koma 8, diperoleh hasil 13 koma 4 meter per sekon.',
  },
  {
    level: 4,
    slug: 'advanced-physics',
    title: 'LEVEL 4 – ADVANCED PHYSICS',
    subtitle: 'Tikungan Miring Kasar, Arah Gaya Gesek, & Batas Kecepatan Aman',
    summary:
      'Menganalisis skenario nyata ketika jalan memiliki koefisien gesek statis μ_s, menentukan kapan gesekan mengarah ke bawah atau ke atas bidang, serta menafsirkan grafik v_min dan v_maks.',
    sections: [
      {
        heading: '1. Dua Rezim Kecepatan pada Tikungan Kasar',
        paragraphs: [
          'Ketika aspal memiliki koefisien gesek statis μ_s, mobil tidak lagi terkunci pada satu nilai kelajuan tunggal v_0 = √(g r tan θ), melainkan memiliki rentang aman [v_min, v_maks].',
          '• Jika v > v_0 (terlalu cepat): mobil cenderung terdorong ke luar/atas bidang miring, sehingga gaya gesek statis f_s mengarah KE BAWAH sejajar bidang miring untuk membantu menahan mobil tetap pada radius r.',
          '• Jika v < v_0 (terlalu lambat): mobil cenderung meluncur ke dalam/bawah bidang miring, sehingga gaya gesek statis f_s mengarah KE ATAS sejajar bidang miring untuk menahan mobil agar tidak merosot ke pusat.',
        ],
        highlightFormulaLatex:
          'v_{\\text{maks}} = \\sqrt{g r \\frac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}}, \\qquad v_{\\text{min}} = \\sqrt{g r \\frac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta}}',
        highlightCaption: 'Batas kelajuan maksimum dan minimum pada tikungan miring kasar (berlaku untuk tan θ > μ_s pada v_min dan μ_s tan θ < 1 pada v_maks).',
      },
      {
        heading: '2. Kesalahan Konseptual yang Sering Terjadi di Olimpiade',
        paragraphs: [
          'Banyak peserta olimpiade menganggap gaya normal selalu tetap bernilai mg cos θ atau mg / cos θ meskipun kecepatan berubah! Itu SALAH besar.',
          'Ketika v naik di tikungan kasar, percepatan sentripetal memiliki komponen yang menekan jalan tegak lurus permukaan sebesar (v²/r) sin θ. Persamaan eksak gaya normal untuk semua kelajuan di tikungan miring adalah:',
        ],
        highlightFormulaLatex: 'N = m\\left(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\right)',
        highlightCaption: 'Gaya normal meningkat secara kuadratik terhadap kelajuan v! Penumpang merasakan diri mereka tertekan makin kuat ke jok kursi.',
      },
    ],
    symbols: [
      { symbolLatex: '\\mu_s', name: 'Koefisien gesek statis', siUnit: 'tak berdimensi', meaning: 'Menentukan gaya gesek statis maks f_s,maks = μ_s N' },
      { symbolLatex: 'v_{\\text{maks}}', name: 'Kelajuan batas atas', siUnit: 'm/s', meaning: 'Batas sebelum mobil selip keluar bidang miring' },
      { symbolLatex: 'v_{\\text{min}}', name: 'Kelajuan batas bawah', siUnit: 'm/s', meaning: 'Batas sebelum mobil merosot turun (jika tan θ > μ_s)' },
    ],
    workedExample: {
      title: 'Analisis Kondisi Khusus: Kapan v_maks Tak Hingga?',
      problem:
        'Amati penyebut rumus v_maks: 1 - μ_s tan θ. Apa makna fisis jika μ_s tan θ ≥ 1?',
      steps: [
        {
          label: 'Kondisi Kritis Penyebut Nol',
          latex: '\\mu_s \\tan\\theta = 1 \\iff \\theta + \\arctan(\\mu_s) = 90^\\circ',
          note: 'Resultan gaya normal dan gesekan maksimum menjadi tepat horizontal atau miring melewati horizontal!',
        },
        {
          label: 'Implikasi Fisis',
          latex: 'v \\to \\infty \\implies f_s \\text{ dan } N \\text{ tumbuh sebanding } v^2',
          note: 'Selama ban tidak hancur/terguling, gaya normal meningkat sangat cepat saat v naik sehingga gesekan selalu cukup menahan selip.',
        },
      ],
      conclusion: 'Secara teoretis mobil tidak akan selip ke luar jika θ + α_gesek ≥ 90°, namun pada kendaraan nyata ia tetap dibatasi oleh ambang terguling (Level 5).',
    },
    diagramVariant: 'level4-friction-graph',
    hasInteractiveMiniSim: true,
    narratorScript:
      'Memasuki Level 4, kita membahas tikungan kasar dengan koefisien gesek statis miu s. Saat kecepatan melebihi kelajuan ideal, gaya gesek bekerja ke bawah bidang miring untuk menambah gaya sentripetal. Sebaliknya saat terlalu lambat, gaya gesek mengarah ke atas bidang miring agar mobil tidak merosot ke dalam. Ingat satu kesalahan fatal yang wajib dihindari: gaya normal tidak konstan! Makin cepat mobil berbelok, makin besar gaya normal karena komponen percepatan sentripetal ikut menekan jalan.',
  },
  {
    level: 5,
    slug: 'olympiad-mastery',
    title: 'LEVEL 5 – OLYMPIAD MASTERY',
    subtitle: 'Ambang Terguling ("Tidak Terbalik"), Metode Sudut Gesek, & Sistem Terkopel',
    summary:
      'Menguasai strategi cepat tingkat OSK/OSP: menyederhanakan aljabar tikungan miring dengan penjumlahan sudut trigonometri, menganalisis torka pengguling (lebar roda d dan tinggi pusat massa h), dan menyelesaikan lintasan melengkung serta sistem terkopel.',
    sections: [
      {
        heading: '1. Strategi Cepat Olimpiade: Metode Sudut Gesek (φ_g)',
        paragraphs: [
          'Perhatikan kemiripan aljabar rumus (tan θ + μ_s) / (1 − μ_s tan θ). Jika kita mendefinisikan sudut gesek φ_g sehingga tan φ_g = μ_s, maka rumus kelajuan maksimum langsung menyusut menjadi identitas penjumlahan tangen:',
        ],
        highlightFormulaLatex:
          '\\frac{\\tan\\theta + \\tan\\varphi_g}{1 - \\tan\\theta\\tan\\varphi_g} = \\tan(\\theta + \\varphi_g) \\;\\Longrightarrow\\; v_{\\text{maks}} = \\sqrt{g r \\tan(\\theta + \\varphi_g)}',
        highlightCaption: 'Reduksi super-elegan: tikungan miring kasar bersudut θ bekerja persis seperti tikungan licin bersudut efektif (θ + φ_g) atau (θ − φ_g)!',
      },
      {
        heading: '2. Analisis Tepat Soal 7: Batas Selip vs Batas Terguling (Tidak Terbalik)',
        paragraphs: [
          'Dalam dunia otomotif dan soal olimpiade mendalam, mobil bermassa m dengan lebar lintasan ban kiri-kanan d dan tinggi pusat massa h dapat gagal melewati tikungan dengan dua cara: tergelincir (selip) atau terbalik (terguling dengan roda dalam terangkat, N_dalam = 0).',
          'Mengambil keseimbangan momen gaya terhadap pusat massa saat roda dalam tepat terlepas (N_dalam = 0, seluruh kontak di roda luar): N · (d/2) = f_s · h, sehingga f_s / N = d / (2h). Rasio geometris d/(2h) berperan identik dengan koefisien gesek efektif pada persamaan kecepatan!',
        ],
        highlightFormulaLatex:
          'v_{\\text{guling}} = \\sqrt{g r \\frac{\\tan\\theta + \\frac{d}{2h}}{1 - \\frac{d}{2h}\\tan\\theta}}, \\qquad \\text{Selip sebelum terbalik } \\iff \\mu_s < \\frac{d}{2h}',
        highlightCaption: 'Syarat mobil selip lebih dulu daripada terguling ternyata invarian (tidak bergantung) pada sudut kemiringan jalan θ.',
      },
      {
        heading: '3. Kerangka Non-Inersia (Gaya Sentrifugal) & Lintasan Berubah',
        paragraphs: [
          'Dalam kerangka berputar bersama mobil, kita dapat menambahkan gaya semu sentrifugal F_cf = m v² / r mendatar ke luar pusat lingkaran. Di kerangka ini mobil "diam" dalam kesetimbangan statis (ΣF = 0 dan Στ = 0), yang sangat ampuh untuk menyelesaikan soal bandul kabin maupun lintasan berprofil parabolik y = k x² di mana tan θ = dy/dx = 2kx.',
        ],
      },
    ],
    symbols: [
      { symbolLatex: '\\varphi_g', name: 'Sudut gesek statis', siUnit: 'rad / °', meaning: 'tan φ_g = μ_s, mengubah batas gesek menjadi sudut efektif' },
      { symbolLatex: 'd', name: 'Jarak antarban (track width)', siUnit: 'm', meaning: 'Jarak horizontal antara roda kiri dan roda kanan' },
      { symbolLatex: 'h', name: 'Tinggi pusat massa', siUnit: 'm', meaning: 'Jarak tegak lurus pusat massa mobil dari permukaan jalan' },
      { symbolLatex: '\\frac{d}{2h}', name: 'Faktor stabilitas statis', siUnit: 'tak berdimensi', meaning: 'Menentukan ketahanan mobil terhadap bahaya terbalik' },
    ],
    workedExample: {
      title: 'Penerapan Metode Cepat pada Batas Terguling (d = 2h)',
      problem:
        'Jika sebuah mobil memiliki lebar roda d = 1,6 m dan tinggi pusat massa h = 0,80 m pada tikungan θ = 20°, r = 50 m, hitung v_guling secara instan.',
      steps: [
        {
          label: '1. Rasio Geometris',
          latex: '\\frac{d}{2h} = \\frac{1{,}6}{2 \\times 0{,}80} = 1 = \\tan 45^\\circ',
          note: 'Sudut stabilitas efektif bernilai tepat 45°.',
        },
        {
          label: '2. Formula Penjumlahan Sudut',
          latex: 'v_{\\text{guling}} = \\sqrt{g r \\tan(20^\\circ + 45^\\circ)} = \\sqrt{9{,}8 \\times 50 \\times \\tan 65^\\circ} = 32{,}4\\text{ m/s}',
          note: 'Penyelesaian hanya dalam 2 baris tanpa aljabar bertele-tele!',
        },
      ],
      conclusion: 'Strategi sudut efektif memotong waktu pengerjaan OSK secara drastis dan meminimalkan kesalahan hitung.',
    },
    diagramVariant: 'level5-rollover-coupled',
    hasInteractiveMiniSim: true,
    narratorScript:
      'Selamat mencapai Level 5, Olimpiade Mastery bersama Mister Jo. Di tingkat ini kita menyatukan semua konsep dari Soal Nomor 7. Pertama, gunakan metode sudut gesek di mana tangen fi g sama dengan koefisien gesek miu s, sehingga rumus rumit berubah menjadi tangen teta plus fi g. Kedua, untuk syarat agar mobil tidak terbalik, keseimbangan torka pada roda luar menghasilkan rasio d per dua h yang bekerja identik dengan miu s. Mobil hanya akan tergelincir lebih dulu sebelum terbalik apabila koefisien gesek statis lebih kecil dari d per dua h, terlepas dari kemiringan jalan teta.',
  },
];

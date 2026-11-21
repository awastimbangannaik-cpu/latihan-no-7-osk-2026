import { QuestionData } from '../types/physics';
import { formatCommaDecimal, roundTo1Decimal, solveQuestionExact } from '../utils/physicsMath';

function makeAnswerFields(id: number) {
  const exact = solveQuestionExact(id);
  const rounded = roundTo1Decimal(exact);
  const formatted = formatCommaDecimal(rounded);
  return {
    exactNumericValue: exact,
    roundedAnswer: rounded,
    formattedAnswer: formatted,
  };
}

export const QUESTIONS_DATA: QuestionData[] = [
  // ==========================================
  // TIER 1: BASIC CONCEPT (SOAL 1 - 3)
  // ==========================================
  {
    id: 1,
    tier: 'basic',
    tierLabel: 'Basic Concept',
    title: 'Gaya Normal pada Tikungan Miring Ideal',
    contextSubtitle: 'Keseimbangan Vertikal Kendaraan di Belokan',
    stimulusType: 'banked-normal',
    stimulusCaption:
      'Diagram penampang lintasan melingkar miring sudut θ = 30° dengan pusat kelengkungan di sebelah kanan dan sistem koordinat x-y.',
    stimulusDataNote: 'm = 1,2 ton (1200 kg) · θ = 30° · g = 9,8 m/s² · Tikungan licin ideal',
    questionText:
      'Sebuah mobil sedan bermassa 1,2 ton melewati suatu tikungan melingkar miring licin bersudut θ = 30° terhadap bidang datar pada kelajuan rancangan idealnya (tanpa tergelincir naik maupun turun). Jika percepatan gravitasi g = 9,8 m/s², berapakah besar gaya normal total yang diberikan permukaan jalan terhadap mobil tersebut (dalam kN)?',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil', value: '1,2 ton = 1200', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan jalan', value: '30', unit: '°' },
      { symbol: 'g', latexSymbol: 'g', name: 'Percepatan gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Besar gaya normal total N',
    askedSymbolLatex: 'N',
    answerUnit: 'kN',
    ...makeAnswerFields(1),
    hints: {
      hint1: 'Pada arah vertikal (sumbu-y), mobil tidak mengalami percepatan naik maupun turun (ΣF_y = 0).',
      hint2: 'Proyeksikan gaya normal N ke sumbu vertikal y (N cos θ) agar mengimbangi gaya berat W = m·g.',
      hint3: 'Gunakan persamaan N cos θ = m·g sehingga N = (m·g) / cos θ, lalu konversikan satuan Newton menjadi kilonewton (bagi 1000).',
    },
    solution: {
      memahamiFenomena:
        'Mobil bergerak melingkar pada bidang horizontal di atas jalan miring licin. Karena tidak ada percepatan vertikal, komponen vertikal gaya normal N harus menopang seluruh berat mobil W = mg.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil', value: '1200', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut jalan', value: '30', unit: '°' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan besar gaya normal N dalam satuan kilonewton (kN).',
      analisisKonsep:
        'Berdasarkan Hukum I Newton pada sumbu-y (vertikal), resultan gaya vertikal bernilai nol karena ketinggian mobil tetap selama mengitari tikungan horizontal.',
      fbdPenjelasan:
        'Hanya dua gaya yang bekerja pada mobil (tikungan licin): gaya berat W vertikal ke bawah dan gaya normal N tegak lurus permukaan jalan miring (membentuk sudut θ terhadap sumbu-y positif).',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '11.760 N' },
        { label: 'N', direction: 'Tegak lurus bidang miring (θ dari +y)', magnitude: '13,6 kN' },
        { label: 'N_y = N cos θ', direction: 'Vertikal ke atas (+y)', magnitude: '11.760 N' },
        { label: 'N_x = N sin θ', direction: 'Horizontal ke kanan (+x, pusat)', magnitude: '6.790 N' },
      ],
      persamaanFisikaLatex: 'N \\cos\\theta = m g \\;\\Longrightarrow\\; N = \\frac{m g}{\\cos\\theta}',
      persamaanPenjelasan: 'Komponen vertikal gaya normal menyeimbangkan berat mobil.',
      penurunanPersamaan: [
        {
          stepTitle: 'Hukum I Newton Arah Vertikal',
          explanation: 'Karena mobil tidak bergerak dalam arah vertikal, ΣF_y = 0.',
          latex: '\\Sigma F_y = N\\cos\\theta - W = 0',
        },
        {
          stepTitle: 'Substitusi Gaya Berat',
          explanation: 'Ganti W = m·g dan selesaikan untuk N.',
          latex: 'N\\cos\\theta = m g \\implies N = \\frac{mg}{\\cos\\theta}',
        },
      ],
      substitusiDataLatex: 'N = \\frac{1200\\text{ kg} \\times 9{,}8\\text{ m/s}^2}{\\cos 30^\\circ}',
      perhitunganLangkah: [
        { label: 'Hitung gaya berat W', latex: 'W = 1200 \\times 9{,}8 = 11760\\text{ N}' },
        { label: 'Hitung nilai eksak cos 30°', latex: '\\cos 30^\\circ = \\frac{\\sqrt{3}}{2} \\approx 0{,}8660254' },
        { label: 'Bagi W dengan cos 30°', latex: 'N = \\frac{11760}{0{,}8660254} = 13579{,}28\\text{ N} = 13{,}57928\\text{ kN}' },
      ],
      hasilAkhirNilai: '13,6',
      hasilAkhirSatuan: 'kN',
      interpretasi:
        'Gaya normal N = 13,6 kN lebih besar daripada berat mobil (11,76 kN) karena gaya normal tidak hanya menopang berat secara vertikal, tetapi juga harus menyumbangkan komponen horizontal untuk gaya sentripetal.',
      strategiOlimpiade:
        'Jangan pernah menulis N = mg cos θ pada tikungan miring! Pada balok meluncur turun, percepatan sejajar bidang; sedangkan pada tikungan melingkar, percepatan horizontal sehingga sumbu-y vertikal bebas percepatan dan N = mg / cos θ.',
    },
    relatedKnowledgeLevel: 1,
    animationSummary: 'Simulasi menunjukkan mobil melaju stabil pada ketinggian tetap sementara komponen vertikal N cos θ tepat mengimbangi W.',
    narratorScripts: {
      stimulus: 'Perhatikan diagram penampang jalan miring 30 derajat. Sumbu x mengarah horizontal ke pusat lingkaran di sebelah kanan, dan sumbu y mengarah vertikal ke atas.',
      soal: 'Soal 1. Sebuah mobil sedan bermassa 1 koma 2 ton melewati tikungan melingkar miring licin bersudut 30 derajat pada kelajuan idealnya. Dengan percepatan gravitasi 9 koma 8 meter per sekon kuadrat, hitung besar gaya normal total dalam kilonewton.',
      diagram: 'Pada diagram benda bebas, gaya berat W mengarah lurus ke bawah, sedangkan gaya normal N tegak lurus bidang miring sehingga komponen vertikalnya adalah N kosinus teta.',
      pembahasan: 'Karena mobil tidak mengalami percepatan vertikal, resultan gaya sumbu y sama dengan nol. Maka N kosinus 30 derajat sama dengan m kali g. Diperoleh N sama dengan 11760 dibagi kosinus 30 derajat, yaitu 13 koma 6 kilonewton.',
    },
  },
  {
    id: 2,
    tier: 'basic',
    tierLabel: 'Basic Concept',
    title: 'Gaya Sentripetal dari Komponen Normal',
    contextSubtitle: 'Penguraian Vektor Gaya Normal ke Arah Pusat',
    stimulusType: 'vector-decomposition',
    stimulusCaption:
      'Diagram vektor gaya pada mobil di tikungan miring θ = 25° yang menyoroti proyeksi N ke arah horizontal menuju pusat lingkaran.',
    stimulusDataNote: 'm = 900 kg · θ = 25° · g = 9,8 m/s² · Laju ideal tanpa gesekan samping',
    questionText:
      'Sebuah mobil balap ringan bermassa 900 kg melintasi tikungan miring licin dengan sudut kemiringan θ = 25° pada laju idealnya sehingga posisi mobil tetap stabil. Jika g = 9,8 m/s², tentukan besar gaya sentripetal yang membelokkan mobil tersebut (dalam kN)!',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil balap', value: '900', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan', value: '25', unit: '°' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Besar gaya sentripetal F_s',
    askedSymbolLatex: 'F_s',
    answerUnit: 'kN',
    ...makeAnswerFields(2),
    hints: {
      hint1: 'Gaya sentripetal bukanlah gaya baru, melainkan resultan gaya horizontal menuju pusat lingkaran.',
      hint2: 'Pada tikungan miring licin, satu-satunya komponen gaya yang mengarah ke pusat lingkaran adalah N sin θ.',
      hint3: 'Gabungkan N cos θ = mg dengan F_s = N sin θ untuk memperoleh F_s = m·g·tan θ.',
    },
    solution: {
      memahamiFenomena:
        'Mobil berbelok di lintasan horizontal karena adanya resultan gaya ke arah pusat lingkaran (gaya sentripetal). Tanpa gesekan, seluruh gaya sentripetal disuplai oleh komponen horizontal gaya normal.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa', value: '900', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '25', unit: '°' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan besar gaya sentripetal F_s dalam satuan kN.',
      analisisKonsep:
        'Komponen vertikal gaya normal meniadakan gaya berat (N cos θ = mg), sedangkan komponen horizontalnya (N sin θ) menjadi gaya sentripetal murni.',
      fbdPenjelasan:
        'Gaya normal N diuraikan terhadap sumbu vertikal (+y) dan horizontal (+x). Vektor N sin θ mengarah tepat ke kanan menuju pusat belokan.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '8.820 N' },
        { label: 'N cos θ', direction: 'Vertikal ke atas (+y)', magnitude: '8.820 N' },
        { label: 'F_s = N sin θ', direction: 'Horizontal ke pusat (+x)', magnitude: '4,1 kN' },
      ],
      persamaanFisikaLatex: 'F_s = N\\sin\\theta = m g \\tan\\theta',
      persamaanPenjelasan: 'Perbandingan langsung antara komponen horizontal dan vertikal gaya normal.',
      penurunanPersamaan: [
        {
          stepTitle: 'Nyatakan N dari Kesetimbangan Vertikal',
          explanation: 'Dari ΣF_y = 0 diperoleh N = mg / cos θ.',
          latex: 'N = \\frac{m g}{\\cos\\theta}',
        },
        {
          stepTitle: 'Substitusi ke Komponen Horizontal',
          explanation: 'Gaya sentripetal F_s = ΣF_x = N sin θ.',
          latex: 'F_s = \\left(\\frac{mg}{\\cos\\theta}\\right)\\sin\\theta = m g \\tan\\theta',
        },
      ],
      substitusiDataLatex: 'F_s = 900\\text{ kg} \\times 9{,}8\\text{ m/s}^2 \\times \\tan 25^\\circ',
      perhitunganLangkah: [
        { label: 'Hitung m·g', latex: 'm g = 900 \\times 9{,}8 = 8820\\text{ N}' },
        { label: 'Nilai tan 25°', latex: '\\tan 25^\\circ \\approx 0{,}46630766' },
        { label: 'Kalikan dan ubah ke kN', latex: 'F_s = 8820 \\times 0{,}46630766 = 4112{,}837\\text{ N} = 4{,}1128\\text{ kN}' },
      ],
      hasilAkhirNilai: '4,1',
      hasilAkhirSatuan: 'kN',
      interpretasi:
        'Menariknya, gaya sentripetal pada kelajuan ideal tidak bergantung pada jari-jari r, hanya pada berat kendaraan dan sudut kemiringan jalan.',
      strategiOlimpiade:
        'Segitiga gaya antara W (ke bawah), N (miring), dan F_s (horizontal resultan) membentuk segitiga siku-siku dengan F_s / W = tan θ. Segitiga vektor ini sangat cepat untuk mengecek jawaban.',
    },
    relatedKnowledgeLevel: 1,
    animationSummary: 'Simulasi memvisualisasikan penjumlahan vektor W dan N menghasilkan vektor resultan murni horizontal F_s menuju pusat.',
    narratorScripts: {
      stimulus: 'Diagram menunjukkan penguraian vektor gaya normal N menjadi komponen vertikal N kosinus 25 derajat dan komponen horizontal N sinus 25 derajat menuju pusat lingkaran.',
      soal: 'Soal 2. Sebuah mobil balap bermassa 900 kilogram melintasi tikungan miring licin bersudut 25 derajat pada laju ideal. Jika g sama dengan 9 koma 8 meter per sekon kuadrat, tentukan besar gaya sentripetal dalam kilonewton.',
      diagram: 'Pada segitiga gaya, resultan vektor antara gaya normal N dan berat W mengarah tepat horizontal ke pusat lingkaran sebesar m kali g kali tangen teta.',
      pembahasan: 'Dari N kosinus teta sama dengan m g dan gaya sentripetal sama dengan N sinus teta, kita peroleh gaya sentripetal sama dengan m g tangen 25 derajat. Dengan 900 kali 9 koma 8 kali tangen 25 derajat, hasilnya adalah 4 koma 1 kilonewton.',
    },
  },
  {
    id: 3,
    tier: 'basic',
    tierLabel: 'Basic Concept',
    title: 'Kelajuan Ideal Tikungan Miring (Basis Soal Nomor 7)',
    contextSubtitle: 'Penentuan Kecepatan Desain Tanpa Gesekan Lateral',
    stimulusType: 'ideal-banked',
    stimulusCaption:
      'Penampang belokan melingkar miring θ = 20° dengan jari-jari lingkaran ke pusat massa mobil r = 60 m.',
    stimulusDataNote: 'm = 1,5 ton · θ = 20° · r = 60 m · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil sedan bermassa 1,5 ton sedang melewati belokan melingkar miring licin dengan sudut kemiringan θ = 20° dan jari-jari lintasan lingkaran ke pusat massa mobil sebesar r = 60 m. Dengan percepatan gravitasi g = 9,8 m/s², berapakah kelajuan mobil agar melaju stabil tanpa tergelincir ataupun terbalik (dalam m/s)?',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil', value: '1,5 ton = 1500', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan ke PM', value: '60', unit: 'm' },
      { symbol: 'g', latexSymbol: 'g', name: 'Percepatan gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan ideal mobil v',
    askedSymbolLatex: 'v',
    answerUnit: 'm/s',
    ...makeAnswerFields(3),
    hints: {
      hint1: 'Perhatikan bahwa massa mobil 1,5 ton pada akhirnya akan saling meniadakan pada kondisi tanpa gesekan.',
      hint2: 'Samakan gaya sentripetal m·v²/r dengan komponen horizontal gaya normal N sin θ = mg tan θ.',
      hint3: 'Dari v²/r = g tan θ, hitung v = √(g · r · tan θ) menggunakan θ = 20° dan r = 60 m.',
    },
    solution: {
      memahamiFenomena:
        'Ini adalah bentuk langsung dari Soal Nomor 7 OSK 2026 dengan jari-jari diperbesar menjadi 60 m. Mobil berputar pada lingkaran horizontal radius r sehingga komponen horizontal gaya normal tepat menyuplai gaya sentripetal.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa', value: '1500', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari belokan', value: '60', unit: 'm' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan ideal v dalam satuan m/s.',
      analisisKonsep:
        'Hukum II Newton arah radial horizontal (ΣF_x = m v²/r) dipadukan dengan Hukum I Newton arah vertikal (ΣF_y = 0).',
      fbdPenjelasan:
        'Persis seperti stimulus asli Soal 7: sumbu x mengarah ke kanan (pusat lingkaran), sumbu y mengarah ke atas. Gaya berat W ke bawah dan gaya normal N tegak lurus bidang miring.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '14.700 N' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: '15.643 N' },
        { label: 'm·a_s', direction: 'Resultan horizontal ke kanan (+x)', magnitude: '5.350 N' },
      ],
      persamaanFisikaLatex: 'v = \\sqrt{g r \\tan\\theta}',
      persamaanPenjelasan: 'Kelajuan desain tikungan miring ideal tanpa bergantung pada massa kendaraan.',
      penurunanPersamaan: [
        {
          stepTitle: 'Persamaan Sumbu-y dan Sumbu-x',
          explanation: 'Tulis keseimbangan vertikal dan dinamika sentripetal horizontal.',
          latex: 'N\\cos\\theta = mg, \\qquad N\\sin\\theta = \\frac{mv^2}{r}',
        },
        {
          stepTitle: 'Pembagian Kedua Persamaan',
          explanation: 'Bagi persamaan x dengan persamaan y untuk mengeliminasi N dan m.',
          latex: '\\tan\\theta = \\frac{v^2}{g r} \\implies v = \\sqrt{g r \\tan\\theta}',
        },
      ],
      substitusiDataLatex: 'v = \\sqrt{9{,}8\\text{ m/s}^2 \\times 60\\text{ m} \\times \\tan 20^\\circ}',
      perhitunganLangkah: [
        { label: 'Hitung g · r', latex: 'g \\cdot r = 9{,}8 \\times 60 = 588\\text{ m}^2/\\text{s}^2' },
        { label: 'Kalikan dengan tan 20°', latex: '588 \\times 0{,}363970234 = 214{,}0145\\text{ m}^2/\\text{s}^2' },
        { label: 'Tarik akar kuadrat', latex: 'v = \\sqrt{214{,}0145} = 14{,}6292\\text{ m/s}' },
      ],
      hasilAkhirNilai: '14,6',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Dibandingkan Soal 7 asli (r = 50 m menghasilkan 13,4 m/s), memperbesar jari-jari menjadi 60 m memungkinkan kecepatan desain naik menjadi 14,6 m/s (sekitar 52,7 km/jam).',
      strategiOlimpiade:
        'Selalu cek apakah massa m tereliminasi. Jika suatu soal memberi massa tetapi tidak memberi koefisien gesek maupun gaya luar lain, massa hanyalah informasi pelengkap untuk mengecoh atau menghitung W dan N terlebih dahulu.',
    },
    relatedKnowledgeLevel: 3,
    animationSummary: 'Animasi memperlihatkan lintasan melingkar horizontal radius 60 m pada sudut 20° dengan laju tetap 14,6 m/s.',
    narratorScripts: {
      stimulus: 'Gambar mengadaptasi langsung kondisi Soal Nomor 7 dengan sudut miring 20 derajat dan jari-jari lintasan 60 meter menuju pusat lingkaran di kanan.',
      soal: 'Soal 3. Sebuah mobil bermassa 1 koma 5 ton melewati belokan melingkar miring licin bersudut 20 derajat dan berjari-jari 60 meter. Jika g sama dengan 9 koma 8 meter per sekon kuadrat, berapakah kelajuan ideal mobil dalam meter per sekon?',
      diagram: 'Gaya normal N dan berat W membentuk resultan horizontal tepat sebesar gaya sentripetal m v kuadrat per r.',
      pembahasan: 'Dari N sinus teta sama dengan m v kuadrat per r dan N kosinus teta sama dengan m g, massa dan gaya normal saling tereliminasi sehingga v sama dengan akar g kali r kali tangen teta. Hasil perhitungannya adalah 14 koma 6 meter per sekon.',
    },
  },

  // ==========================================
  // TIER 2: INTERMEDIATE APPLICATION (SOAL 4 - 6)
  // ==========================================
  {
    id: 4,
    tier: 'intermediate',
    tierLabel: 'Intermediate Application',
    title: 'Perancangan Sudut Kemiringan Jalan Tol',
    contextSubtitle: 'Rekayasa Geometri Tikungan untuk Laju Desain Tertentu',
    stimulusType: 'highway-design',
    stimulusCaption:
      'Sketsa rekayasa tikungan jalan tol berjari-jari r = 120 m dengan target kecepatan desain v = 72 km/jam dan sudut elevasi θ yang belum diketahui.',
    stimulusDataNote: 'r = 120 m · v = 72 km/jam · g = 9,8 m/s² · Bebas gesekan lateral',
    questionText:
      'Seorang insinyur sipil merancang sebuah tikungan jalan tol berjari-jari r = 120 m agar kendaraan yang melintas dengan kelajuan rancangan v = 72 km/jam dapat berbelok dengan aman tanpa mengandalkan gaya gesekan sama sekali. Jika g = 9,8 m/s², berapakah sudut kemiringan jalan θ yang harus dibangun (dalam derajat)?',
    knownData: [
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari tikungan tol', value: '120', unit: 'm' },
      { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan rancangan', value: '72 km/jam = 20', unit: 'm/s' },
      { symbol: 'g', latexSymbol: 'g', name: 'Percepatan gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Sudut kemiringan jalan θ',
    askedSymbolLatex: '\\theta',
    answerUnit: '°',
    ...makeAnswerFields(4),
    hints: {
      hint1: 'Konversikan terlebih dahulu kelajuan dari km/jam ke satuan SI meter per sekon (m/s).',
      hint2: 'Gunakan hubungan kesetimbangan tikungan miring ideal tan θ = v² / (g · r).',
      hint3: 'Substitusikan v = 20 m/s, r = 120 m, dan g = 9,8 m/s², lalu hitung θ = arctan(v² / (gr)) dalam derajat.',
    },
    solution: {
      memahamiFenomena:
        'Dalam desain jalan raya, insinyur menentukan sudut elevasi (superelevasi) θ supaya kendaraan pada kecepatan batas rancangan tidak membebani ban dengan gesekan samping.',
      identifikasiData: [
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari belokan', value: '120', unit: 'm' },
        { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan rancangan', value: '72 km/jam = 20,0', unit: 'm/s' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan sudut kemiringan jalan θ dalam derajat (°).',
      analisisKonsep:
        'Hubungan desain tikungan miring tanpa gesekan tan θ = v²/(g r) dibalik menggunakan fungsi invers tangen (arctan).',
      fbdPenjelasan:
        'Sama seperti Soal 7, namun kini nilai θ adalah besaran yang dicari agar rasio komponen horizontal N sin θ terhadap komponen vertikal N cos θ tepat sama dengan v²/(g r).',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: 'm·g' },
        { label: 'N', direction: 'Tegak lurus permukaan miring θ', magnitude: 'mg / cos θ' },
        { label: 'N sin θ', direction: 'Menuju pusat lingkaran (+x)', magnitude: 'm·(20)² / 120' },
      ],
      persamaanFisikaLatex: '\\theta = \\arctan\\left(\\frac{v^2}{g r}\\right)',
      persamaanPenjelasan: 'Sudut superelevasi minimum tanpa bantuan gesekan.',
      penurunanPersamaan: [
        {
          stepTitle: 'Konversi Satuan SI',
          explanation: 'Ubah km/jam ke m/s dengan membagi 3,6.',
          latex: 'v = \\frac{72\\text{ km}}{3600\\text{ s}} = \\frac{72}{3{,}6} = 20\\text{ m/s}',
        },
        {
          stepTitle: 'Invers Tangen dari Dinamika Tikungan',
          explanation: 'Dari N sin θ = m v²/r dan N cos θ = m g.',
          latex: '\\tan\\theta = \\frac{v^2}{g r} \\implies \\theta = \\arctan\\left(\\frac{v^2}{g r}\\right)',
        },
      ],
      substitusiDataLatex: '\\tan\\theta = \\frac{(20\\text{ m/s})^2}{9{,}8\\text{ m/s}^2 \\times 120\\text{ m}}',
      perhitunganLangkah: [
        { label: 'Hitung nilai tan θ', latex: '\\tan\\theta = \\frac{400}{1176} \\approx 0{,}34013605' },
        { label: 'Hitung arctan dalam derajat', latex: '\\theta = \\arctan(0{,}34013605) = 18{,}7853^\\circ' },
      ],
      hasilAkhirNilai: '18,8',
      hasilAkhirSatuan: '°',
      interpretasi:
        'Sudut kemiringan sekitar 18,8° cukup curam dibanding jalan tol umum (biasanya < 8°) karena jari-jari 120 m relatif tajam untuk laju 72 km/jam.',
      strategiOlimpiade:
        'Selalu periksa konversi 72 km/jam = 20 m/s (hafalkan kelipatan 18 km/jam = 5 m/s: 36→10, 54→15, 72→20, 90→25, 108→30) untuk menghemat waktu ujian.',
    },
    relatedKnowledgeLevel: 3,
    animationSummary: 'Simulasi memvisualisasikan kemiringan jalan 18,8° yang membelokkan mobil pada radius besar 120 m dan laju 20 m/s.',
    narratorScripts: {
      stimulus: 'Diagram desain jalan tol memperlihatkan jari-jari belokan 120 meter dengan target kelajuan 72 kilometer per jam dan sudut elevasi teta.',
      soal: 'Soal 4. Seorang insinyur merancang tikungan jalan tol berjari-jari 120 meter untuk kelajuan rancangan 72 kilometer per jam tanpa gaya gesek. Jika g sama dengan 9 koma 8 meter per sekon kuadrat, hitung sudut kemiringan jalan teta dalam derajat.',
      diagram: 'Pada sudut rancangan yang tepat, komponen horizontal gaya normal menyediakan seluruh gaya sentripetal m v kuadrat per r.',
      pembahasan: 'Pertama ubah 72 kilometer per jam menjadi 20 meter per sekon. Dari tangen teta sama dengan v kuadrat per g r, diperoleh tangen teta sama dengan 400 dibagi 1176, yaitu 0 koma 3401. Invers tangennya adalah 18 koma 8 derajat.',
    },
  },
  {
    id: 5,
    tier: 'intermediate',
    tierLabel: 'Intermediate Application',
    title: 'Gaya Gesek Statis Saat Melaju Lebih Cepat dari Laju Ideal',
    contextSubtitle: 'Tikungan Miring Kasar dengan Kecepatan Melebihi Laju Desain',
    stimulusType: 'fast-friction',
    stimulusCaption:
      'Mobil melaju 18 m/s pada tikungan bersudut θ = 15° dan jari-jari r = 50 m. Laju melebihi laju ideal sehingga gaya gesek statis aktif menahan mobil.',
    stimulusDataNote: 'm = 1000 kg · θ = 15° · r = 50 m · v = 18 m/s · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil bermassa 1000 kg melaju di suatu tikungan miring kasar bersudut θ = 15° dan jari-jari r = 50 m dengan kelajuan konstan v = 18 m/s. Diketahui percepatan gravitasi g = 9,8 m/s² dan ban tidak mengalami selip. Tentukan besar gaya gesek statis total yang bekerja pada ban sejajar permukaan jalan miring (dalam kN)!',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil', value: '1000', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan', value: '15', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '50', unit: 'm' },
      { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan mobil', value: '18', unit: 'm/s' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Besar gaya gesek statis f_s',
    askedSymbolLatex: 'f_s',
    answerUnit: 'kN',
    ...makeAnswerFields(5),
    hints: {
      hint1: 'Cek terlebih dahulu laju ideal v_0 = √(g r tan 15°) ≈ 11,5 m/s. Karena v = 18 m/s > v_0, mobil cenderung tergelincir ke luar/atas bidang.',
      hint2: 'Karena mobil cenderung naik ke luar, gaya gesek statis f_s mengarah KE BAWAH sejajar bidang miring untuk membantu gaya sentripetal.',
      hint3: 'Eliminasi N dari sistem persamaan x-y: N sin θ + f_s cos θ = mv²/r dan N cos θ − f_s sin θ = mg, sehingga f_s = m[(v²/r) cos θ − g sin θ].',
    },
    solution: {
      memahamiFenomena:
        'Laju ideal tikungan ini hanya 11,46 m/s. Karena mobil melaju 18 m/s, komponen normal N sin θ saja tidak cukup membelokkan mobil, sehingga ban memerlukan bantuan gaya gesek statis f_s yang mengarah ke bawah sejajar kemiringan jalan.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa', value: '1000', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut', value: '15', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
        { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan', value: '18', unit: 'm/s' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan besar gaya gesek statis f_s dalam satuan kN.',
      analisisKonsep:
        'Hukum Newton dalam sumbu x-y dengan tambahan gaya gesek statis f_s ke bawah bidang miring, atau proyeksi langsung sepanjang sumbu sejajar bidang miring.',
      fbdPenjelasan:
        'Gaya bekerja: berat W ke bawah, normal N tegak lurus bidang ke kanan-atas, dan gesekan statis f_s sejajar bidang ke kanan-bawah (menuju bagian dalam belokan).',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '9.800 N' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: '11.145 N' },
        { label: 'f_s', direction: 'Sejajar bidang ke bawah (kanan-bawah)', magnitude: '3,7 kN' },
      ],
      persamaanFisikaLatex: 'f_s = m\\left(\\frac{v^2}{r}\\cos\\theta - g\\sin\\theta\\right)',
      persamaanPenjelasan: 'Selisih antara komponen percepatan sentripetal sejajar bidang dan komponen gravitasi sejajar bidang.',
      penurunanPersamaan: [
        {
          stepTitle: 'Persamaan Sumbu Horizontal dan Vertikal',
          explanation: 'Uraikan N dan f_s (arah ke bawah bidang membentuk sudut θ di bawah sumbu +x).',
          latex: 'N\\sin\\theta + f_s\\cos\\theta = m\\frac{v^2}{r}, \\qquad N\\cos\\theta - f_s\\sin\\theta = mg',
        },
        {
          stepTitle: 'Eliminasi Gaya Normal N',
          explanation: 'Kalikan persamaan pertama dengan cos θ, persamaan kedua dengan sin θ, lalu kurangkan.',
          latex: 'f_s(\\cos^2\\theta + \\sin^2\\theta) = m\\left(\\frac{v^2}{r}\\cos\\theta - g\\sin\\theta\\right)',
        },
      ],
      substitusiDataLatex: 'f_s = 1000\\left(\\frac{18^2}{50}\\cos 15^\\circ - 9{,}8\\sin 15^\\circ\\right)',
      perhitunganLangkah: [
        { label: 'Percepatan sentripetal v²/r', latex: '\\frac{324}{50} = 6{,}48\\text{ m/s}^2' },
        { label: 'Komponen sejajar bidang', latex: '6{,}48\\cos 15^\\circ - 9{,}8\\sin 15^\\circ = 6{,}25920 - 2{,}53643 = 3{,}72277\\text{ m/s}^2' },
        { label: 'Kalikan dengan massa dan konversi ke kN', latex: 'f_s = 1000 \\times 3{,}72277 = 3722{,}77\\text{ N} = 3{,}72277\\text{ kN}' },
      ],
      hasilAkhirNilai: '3,7',
      hasilAkhirSatuan: 'kN',
      interpretasi:
        'Nilai f_s positif memastikan bahwa arah gesekan memang benar ke bawah bidang miring. Jika f_s bernilai negatif, artinya mobil lebih lambat dari laju ideal dan gesekan berbalik arah ke atas bidang.',
      strategiOlimpiade:
        'Menghitung f_s jauh lebih cepat jika memproyeksikan vektor percepatan a_s (horizontal) sejajar bidang miring: ΣF_sejajar = m·a_s cos θ ⇒ f_s + mg sin θ = m(v²/r) cos θ!',
    },
    relatedKnowledgeLevel: 4,
    animationSummary: 'Animasi memperlihatkan munculnya vektor gaya gesek statis f_s ke bawah bidang untuk menahan mobil pada v = 18 m/s.',
    narratorScripts: {
      stimulus: 'Stimulus menggambarkan mobil melintas cepat pada sudut miring 15 derajat dan radius 50 meter. Karena kelajuan 18 meter per sekon melampaui laju idealnya, mobil cenderung terdorong keluar lintasan.',
      soal: 'Soal 5. Sebuah mobil bermassa 1000 kilogram melaju di tikungan miring kasar bersudut 15 derajat dan jari-jari 50 meter dengan kelajuan 18 meter per sekon. Hitung besar gaya gesek statis yang bekerja pada ban dalam kilonewton.',
      diagram: 'Pada diagram benda bebas, gaya gesek statis f s mengarah ke bawah sejajar bidang miring sehingga komponen horizontalnya ikut menyumbang gaya sentripetal.',
      pembahasan: 'Dengan mengeliminasi N dari persamaan sumbu x dan y, diperoleh f s sama dengan m dikali dalam kurung v kuadrat per r kosinus teta dikurangi g sinus teta. Hasilnya adalah 3 koma 7 kilonewton.',
    },
  },
  {
    id: 6,
    tier: 'intermediate',
    tierLabel: 'Intermediate Application',
    title: 'Gaya Normal Saat Melaju Lebih Lambat dari Laju Ideal',
    contextSubtitle: 'Pengaruh Percepatan Sentripetal terhadap Tekanan Jalan',
    stimulusType: 'slow-normal',
    stimulusCaption:
      'Mobil melambat di tikungan miring curam θ = 30°, r = 80 m pada kelajuan 12 m/s sehingga gaya gesek mengarah ke atas bidang.',
    stimulusDataNote: 'm = 1200 kg · θ = 30° · r = 80 m · v = 12 m/s · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil bermassa 1200 kg melaju pelan di suatu tikungan miring kasar bersudut θ = 30° dan berjari-jari r = 80 m dengan kelajuan konstan v = 12 m/s. Diketahui percepatan gravitasi g = 9,8 m/s² dan ban tidak selip. Berapakah besar gaya normal total yang dikerjakan aspal terhadap mobil (dalam kN)?',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil', value: '1200', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '30', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari belokan', value: '80', unit: 'm' },
      { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan mobil', value: '12', unit: 'm/s' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Besar gaya normal total N',
    askedSymbolLatex: 'N',
    answerUnit: 'kN',
    ...makeAnswerFields(6),
    hints: {
      hint1: 'Pada tikungan kasar θ = 30° dan r = 80 m, laju ideal adalah 21,3 m/s. Karena v = 12 m/s lebih lambat, gaya gesek f_s mengarah ke atas bidang miring.',
      hint2: 'Hati-hati! Gaya normal N tidak sama dengan mg / cos θ maupun mg cos θ ketika ada gaya gesek aktif.',
      hint3: 'Eliminasi f_s dari N sin θ − f_s cos θ = mv²/r dan N cos θ + f_s sin θ = mg untuk memperoleh N = m(g cos θ + (v²/r) sin θ).',
    },
    solution: {
      memahamiFenomena:
        'Karena mobil bergerak lebih lambat daripada laju idealnya (21,3 m/s), gaya berat cenderung menariknya turun ke dalam belokan. Gaya gesek statis mengarah ke atas bidang untuk menopang sebagian berat, sehingga gaya normal berkurang dibanding kasus ideal.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa', value: '1200', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut', value: '30', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '80', unit: 'm' },
        { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan', value: '12', unit: 'm/s' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan besar gaya normal total N dalam kN.',
      analisisKonsep:
        'Proyeksi Hukum II Newton pada sumbu tegak lurus bidang miring menunjukkan N harus menahan komponen berat mg cos θ sekaligus menyuplai komponen percepatan sentripetal yang menuju tegak lurus bidang m(v²/r) sin θ.',
      fbdPenjelasan:
        'Selain W ke bawah dan N tegak lurus bidang, gaya gesek statis f_s mengarah ke kiri-atas sejajar bidang miring.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '11.760 N' },
        { label: 'f_s', direction: 'Sejajar bidang ke atas (kiri-atas)', magnitude: '4.009 N' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: '11,3 kN' },
      ],
      persamaanFisikaLatex: 'N = m\\left(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\right)',
      persamaanPenjelasan: 'Rumus umum gaya normal pada tikungan miring untuk sembarang kelajuan v.',
      penurunanPersamaan: [
        {
          stepTitle: 'Hukum Newton Sumbu-x dan Sumbu-y',
          explanation: 'Dengan f_s mengarah ke atas bidang miring.',
          latex: 'N\\sin\\theta - f_s\\cos\\theta = m\\frac{v^2}{r}, \\qquad N\\cos\\theta + f_s\\sin\\theta = mg',
        },
        {
          stepTitle: 'Eliminasi f_s',
          explanation: 'Kalikan eq.1 dengan sin θ, eq.2 dengan cos θ, lalu jumlahkan.',
          latex: 'N(\\sin^2\\theta + \\cos^2\\theta) = m\\left(\\frac{v^2}{r}\\sin\\theta + g\\cos\\theta\\right)',
        },
      ],
      substitusiDataLatex: 'N = 1200\\left(9{,}8\\cos 30^\\circ + \\frac{12^2}{80}\\sin 30^\\circ\\right)',
      perhitunganLangkah: [
        { label: 'Hitung suku gravitasi', latex: 'g\\cos 30^\\circ = 9{,}8 \\times 0{,}8660254 = 8{,}48705\\text{ m/s}^2' },
        { label: 'Hitung suku sentripetal', latex: '\\frac{144}{80}\\sin 30^\\circ = 1{,}8 \\times 0{,}5 = 0{,}90000\\text{ m/s}^2' },
        { label: 'Total gaya normal', latex: 'N = 1200 \\times 9{,}38705 = 11264{,}46\\text{ N} = 11{,}2645\\text{ kN}' },
      ],
      hasilAkhirNilai: '11,3',
      hasilAkhirSatuan: 'kN',
      interpretasi:
        'Perhatikan bahwa N = 11,3 kN berada di antara nilai saat diam (mg cos 30° = 10,18 kN) dan nilai saat laju ideal (mg / cos 30° = 13,58 kN). Ini mengonfirmasi keakuratan fisika!',
      strategiOlimpiade:
        'Hafalkan cek batas cepat: saat v = 0, N = mg cos θ. Saat v = √(gr tan θ), substitusi menghasilkan N = mg(cos θ + tan θ sin θ) = mg / cos θ. Rumus umum konsisten di kedua batas ekstrem!',
    },
    relatedKnowledgeLevel: 4,
    animationSummary: 'Animasi menunjukkan vektor gaya gesek berbalik ke atas bidang ketika mobil melaju lebih lambat dari laju ideal.',
    narratorScripts: {
      stimulus: 'Diagram memperlihatkan mobil melaju pelan 12 meter per sekon di kemiringan 30 derajat. Karena lebih lambat dari kelajuan ideal, gaya gesek menahan mobil ke arah atas bidang.',
      soal: 'Soal 6. Sebuah mobil bermassa 1200 kilogram melaju pelan di tikungan miring kasar bersudut 30 derajat dan berjari-jari 80 meter dengan kelajuan 12 meter per sekon. Hitung besar gaya normal total dalam kilonewton.',
      diagram: 'Gaya normal tegak lurus bidang tidak hanya menahan komponen berat m g kosinus teta, tetapi juga membelokkan komponen sentripetal m v kuadrat per r sinus teta.',
      pembahasan: 'Dengan mengeliminasi f s dari persamaan sumbu x dan y, diperoleh rumus umum N sama dengan m dikali dalam kurung g kosinus teta ditambah v kuadrat per r sinus teta. Hasil akhirnya adalah 11 koma 3 kilonewton.',
    },
  },

  // ==========================================
  // TIER 3: ADVANCED ANALYSIS (SOAL 7 - 9)
  // ==========================================
  {
    id: 7,
    tier: 'advanced',
    tierLabel: 'Advanced Analysis',
    title: 'Kelajuan Maksimum Agar Tidak Tergelincir Keluar',
    contextSubtitle: 'Batas Atas Kecepatan Aman dengan Gesekan Statis Maksimum',
    stimulusType: 'max-speed-friction',
    stimulusCaption:
      'Kondisi batas atas tikungan Soal 7 (θ = 20°, r = 50 m) dengan aspal berkoefisien gesek statis μ_s = 0,40.',
    stimulusDataNote: 'θ = 20° · r = 50 m · μ_s = 0,40 · g = 9,8 m/s²',
    questionText:
      'Mengacu pada geometri belokan Soal Nomor 7 (θ = 20°, r = 50 m, g = 9,8 m/s²), misalkan permukaan jalan kini kasar dengan koefisien gesek statis antara ban dan aspal sebesar μ_s = 0,40. Berapakah kelajuan maksimum yang masih aman agar mobil tidak tergelincir ke luar lintasan (dalam m/s)?',
    knownData: [
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '50', unit: 'm' },
      { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,40', unit: '-' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan maksimum aman v_maks',
    askedSymbolLatex: 'v_{\\text{maks}}',
    answerUnit: 'm/s',
    ...makeAnswerFields(7),
    hints: {
      hint1: 'Saat mobil tepat akan tergelincir ke luar, gaya gesek statis mencapai nilai maksimum f_s,maks = μ_s N dan mengarah ke bawah bidang miring.',
      hint2: 'Tulis dua persamaan Hukum Newton: N sin θ + μ_s N cos θ = m v²/r dan N cos θ − μ_s N sin θ = m g.',
      hint3: 'Bagi persamaan horizontal dengan persamaan vertikal untuk mengeliminasi N dan m, sehingga v_maks = √[g r (tan θ + μ_s) / (1 − μ_s tan θ)].',
    },
    solution: {
      memahamiFenomena:
        'Pada Soal 7 asli tanpa gesekan, kelajuan ideal adalah 13,4 m/s. Dengan adanya gesekan statis μ_s = 0,40, ban mampu mencengkeram ke bawah bidang miring sehingga batas kecepatan aman terdorong jauh lebih tinggi.',
      identifikasiData: [
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
        { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,40', unit: '-' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan maksimum v_maks dalam satuan m/s.',
      analisisKonsep:
        'Batas selip tercapai saat f_s = μ_s N berarah ke bawah sepanjang bidang miring, memperbesar gaya sentripetal sekaligus sedikit mengurangi komponen vertikal penahan berat.',
      fbdPenjelasan:
        'Pada ambang selip ke luar, gaya gesek f_s = μ_s N bekerja sejajar bidang menuju sisi dalam tikungan.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: 'm·g' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: 'mg / (cos θ − μ_s sin θ)' },
        { label: 'f_s,maks = μ_s N', direction: 'Sejajar bidang ke bawah', magnitude: '0,40 N' },
      ],
      persamaanFisikaLatex: 'v_{\\text{maks}} = \\sqrt{g r \\frac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}}',
      persamaanPenjelasan: 'Kelajuan batas maksimum pada tikungan miring kasar sebelum ban mulai tergelincir.',
      penurunanPersamaan: [
        {
          stepTitle: 'Hukum Newton pada Ambang Selip',
          explanation: 'Substitusikan f_s = μ_s N pada kedua sumbu koordinat.',
          latex: 'N(\\sin\\theta + \\mu_s\\cos\\theta) = m\\frac{v_{\\text{maks}}^2}{r}, \\qquad N(\\cos\\theta - \\mu_s\\sin\\theta) = mg',
        },
        {
          stepTitle: 'Bagi Kedua Persamaan dan Bagi Pembilang/Penyebut dengan cos θ',
          explanation: 'Eliminasi N dan m lalu ubah sin/cos menjadi tan θ.',
          latex: '\\frac{v_{\\text{maks}}^2}{g r} = \\frac{\\sin\\theta + \\mu_s\\cos\\theta}{\\cos\\theta - \\mu_s\\sin\\theta} = \\frac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}',
        },
      ],
      substitusiDataLatex: 'v_{\\text{maks}} = \\sqrt{9{,}8 \\times 50 \\times \\frac{\\tan 20^\\circ + 0{,}40}{1 - 0{,}40\\tan 20^\\circ}}',
      perhitunganLangkah: [
        { label: 'Hitung tan 20°', latex: '\\tan 20^\\circ \\approx 0{,}36397023' },
        { label: 'Hitung rasio pecahan', latex: '\\frac{0{,}36397023 + 0{,}40}{1 - 0{,}40(0{,}36397023)} = \\frac{0{,}76397023}{0{,}85441191} = 0{,}89414746' },
        { label: 'Kalikan dengan g·r = 490 dan akarkan', latex: 'v_{\\text{maks}} = \\sqrt{490 \\times 0{,}89414746} = \\sqrt{438{,}1323} = 20{,}9316\\text{ m/s}' },
      ],
      hasilAkhirNilai: '20,9',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Adanya gesekan μ_s = 0,40 menaikkan kelajuan aman dari 13,4 m/s menjadi 20,9 m/s (naik sekitar 56%).',
      strategiOlimpiade:
        'Gunakan sudut gesek φ_g = arctan(0,40) = 21,8014°. Maka v_maks = √(g r tan(20° + 21,8014°)) = √(490 tan 41,8014°) = 20,9 m/s!',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Simulasi mempercepat mobil bertahap dari 10 m/s menuju 20,9 m/s dan memperlihatkan f_s tumbuh hingga menyentuh batas μ_s N.',
    narratorScripts: {
      stimulus: 'Stimulus menunjukkan geometri persis seperti Soal 7 dengan tambahan koefisien gesek statis 0 koma 40 pada permukaan jalan.',
      soal: 'Soal 7. Pada tikungan bersudut 20 derajat dan jari-jari 50 meter dengan koefisien gesek statis 0 koma 40, tentukan kelajuan maksimum agar mobil tidak tergelincir ke luar lintasan dalam meter per sekon.',
      diagram: 'Pada kecepatan maksimum, gaya gesek maksimum miu s kali N bekerja ke bawah bidang miring, memperbesar komponen sentripetal ke pusat.',
      pembahasan: 'Dengan membagi persamaan gaya horizontal oleh persamaan vertikal, diperoleh v maksimum sama dengan akar g r kali tangen teta plus miu s dibagi satu minus miu s tangen teta. Hasilnya adalah 20 koma 9 meter per sekon.',
    },
  },
  {
    id: 8,
    tier: 'advanced',
    tierLabel: 'Advanced Analysis',
    title: 'Kelajuan Minimum pada Velodrome Miring Curam',
    contextSubtitle: 'Analisis Batas Bawah Kecepatan Agar Mobil Tidak Merosot',
    stimulusType: 'min-speed-velodrome',
    stimulusCaption:
      'Lintasan uji otomotif miring curam (θ = 40°, r = 45 m, μ_s = 0,30) di mana mobil harus menjaga kelajuan minimum agar tidak meluncur ke bawah.',
    stimulusDataNote: 'θ = 40° · r = 45 m · μ_s = 0,30 · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil uji melintasi lintasan velodrome miring yang cukup curam dengan sudut kemiringan θ = 40° dan jari-jari lintasan r = 45 m. Jika koefisien gesek statis antara ban dan lintasan adalah μ_s = 0,30 serta g = 9,8 m/s², tentukan kelajuan minimum agar mobil tidak meluncur turun ke dasar lintasan (dalam m/s)!',
    knownData: [
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan curam', value: '40', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '45', unit: 'm' },
      { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,30', unit: '-' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan minimum aman v_min',
    askedSymbolLatex: 'v_{\\text{min}}',
    answerUnit: 'm/s',
    ...makeAnswerFields(8),
    hints: {
      hint1: 'Periksa dulu apakah tan 40° > μ_s: karena tan 40° ≈ 0,839 > 0,30, mobil jika diam pasti merosot turun, sehingga diperlukan v_min > 0.',
      hint2: 'Pada kondisi hampir meluncur turun, gaya gesek statis maksimum μ_s N mengarah KE ATAS sejajar bidang miring.',
      hint3: 'Substitusikan tanda kebalikan gesekan ke dalam persamaan x-y untuk mendapatkan v_min = √[g r (tan θ − μ_s) / (1 + μ_s tan θ)].',
    },
    solution: {
      memahamiFenomena:
        'Kemiringan 40° lebih curam daripada sudut gesek statis (arctan 0,30 ≈ 16,7°). Mobil tidak bisa diam di lintasan ini; ia wajib melaju minimal pada v_min agar gaya normal dan gesekan cukup menahannya tetap di ketinggian lintasan.',
      identifikasiData: [
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut', value: '40', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '45', unit: 'm' },
        { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,30', unit: '-' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan minimum v_min dalam m/s.',
      analisisKonsep:
        'Pada v_min, kecenderungan mobil adalah turun ke bawah bidang sehingga f_s = μ_s N bekerja ke atas sepanjang bidang miring.',
      fbdPenjelasan:
        'Gaya gesek maksimum f_s = μ_s N mengarah ke kiri-atas sejajar bidang (mengurangi gaya sentripetal dan membantu menopang berat).',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: 'm·g' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: 'mg / (cos θ + μ_s sin θ)' },
        { label: 'f_s,maks = μ_s N', direction: 'Sejajar bidang ke atas', magnitude: '0,30 N' },
      ],
      persamaanFisikaLatex: 'v_{\\text{min}} = \\sqrt{g r \\frac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta}}',
      persamaanPenjelasan: 'Batas kelajuan minimum pada tikungan curam dengan tan θ > μ_s.',
      penurunanPersamaan: [
        {
          stepTitle: 'Persamaan Dinamika saat f_s Ke Atas Bidang',
          explanation: 'Komponen horizontal f_s mengarah ke kiri (−x), sedangkan komponen vertikalnya ke atas (+y).',
          latex: 'N(\\sin\\theta - \\mu_s\\cos\\theta) = m\\frac{v_{\\text{min}}^2}{r}, \\qquad N(\\cos\\theta + \\mu_s\\sin\\theta) = mg',
        },
        {
          stepTitle: 'Eliminasi N dan m',
          explanation: 'Bagi persamaan pertama dengan kedua dan sederhanakan dalam tan θ.',
          latex: '\\frac{v_{\\text{min}}^2}{g r} = \\frac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta}',
        },
      ],
      substitusiDataLatex: 'v_{\\text{min}} = \\sqrt{9{,}8 \\times 45 \\times \\frac{\\tan 40^\\circ - 0{,}30}{1 + 0{,}30\\tan 40^\\circ}}',
      perhitunganLangkah: [
        { label: 'Hitung tan 40°', latex: '\\tan 40^\\circ \\approx 0{,}83909963' },
        { label: 'Hitung rasio pecahan', latex: '\\frac{0{,}83909963 - 0{,}30}{1 + 0{,}30(0{,}83909963)} = \\frac{0{,}53909963}{1{,}25172989} = 0{,}43068367' },
        { label: 'Hitung v_min', latex: 'v_{\\text{min}} = \\sqrt{441 \\times 0{,}43068367} = \\sqrt{189{,}9315} = 13{,}7816\\text{ m/s}' },
      ],
      hasilAkhirNilai: '13,8',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Jika kecepatan turun di bawah 13,8 m/s (sekitar 49,6 km/jam), gaya normal berkurang dan gesekan tidak sanggup lagi menahan komponen berat ke bawah bidang.',
      strategiOlimpiade:
        'Dengan metode sudut gesek φ_g = arctan(0,30) = 16,6992°, langsung diperoleh v_min = √(g r tan(40° − 16,6992°)) = √(441 tan 23,3008°) = 13,8 m/s.',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Animasi memperlambat mobil dari 24 m/s menuju 13,8 m/s dan memperlihatkan gaya gesek menahan ke atas bidang sebelum meluncur turun.',
    narratorScripts: {
      stimulus: 'Diagram menunjukkan lintasan miring curam 40 derajat berjari-jari 45 meter. Jika terlalu pelan, mobil akan merosot ke dasar lintasan.',
      soal: 'Soal 8. Mobil uji melintasi lintasan miring curam bersudut 40 derajat dan berjari-jari 45 meter dengan koefisien gesek statis 0 koma 30. Hitung kelajuan minimum agar mobil tidak meluncur turun dalam meter per sekon.',
      diagram: 'Pada batas minimum, gaya gesek maksimum mengarah ke atas sejajar bidang miring untuk menopang mobil agar tidak merosot.',
      pembahasan: 'Dari persamaan batas bawah diperoleh v minimum sama dengan akar g r kali tangen teta dikurangi miu s dibagi satu ditambah miu s tangen teta. Hasilnya adalah 13 koma 8 meter per sekon.',
    },
  },
  {
    id: 9,
    tier: 'advanced',
    tierLabel: 'Advanced Analysis',
    title: 'Grafik Gerak & Periode Putaran di Dinding Miring',
    contextSubtitle: 'Hubungan Kuadrat Laju, Jari-Jari, dan Periode Putaran',
    stimulusType: 'funnel-graph',
    stimulusCaption:
      'Grafik eksperimen v² terhadap r untuk benda yang berputar horizontal di dinding corong licin bersudut θ = 37° (tan 37° = 0,75).',
    stimulusDataNote: 'θ = 37° (tan 37° = 0,75) · T = 4,0 s · g = 9,8 m/s²',
    questionText:
      'Sebuah benda kecil bergerak melingkar horizontal pada dinding dalam lintasan miring licin (berbentuk corong miring) bersudut θ = 37° terhadap horizontal (gunakan tan 37° = 0,75). Grafik eksperimen menunjukkan hubungan linear antara v² dan jari-jari lintasan r. Jika benda diatur mengitari lintasan dengan periode konstan T = 4,0 s dan g = 9,8 m/s², tentukan jari-jari lintasan horizontal r yang ditempuh benda (dalam m)!',
    knownData: [
      { symbol: 'tan θ', latexSymbol: '\\tan 37^\\circ', name: 'Kemiringan dinding corong', value: '0,75', unit: '-' },
      { symbol: 'T', latexSymbol: 'T', name: 'Periode satu putaran', value: '4,0', unit: 's' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Jari-jari lintasan horizontal r',
    askedSymbolLatex: 'r',
    answerUnit: 'm',
    ...makeAnswerFields(9),
    hints: {
      hint1: 'Hubungan v² = (g tan θ) r menunjukkan gradien grafik v² vs r adalah g tan θ.',
      hint2: 'Hubungkan kelajuan linear v dengan periode T dan jari-jari r menggunakan v = 2πr / T.',
      hint3: 'Substitusikan v = 2πr / T ke dalam v² = g r tan θ untuk menyelesaikan r = (g T² tan θ) / (4π²).',
    },
    solution: {
      memahamiFenomena:
        'Dinding corong miring secara fisika identik dengan tikungan miring licin pada Soal 7. Karena percepatan sentripetal ω²r bergantung pada r sedangkan gaya per satuan massa g tan θ konstan, hanya ada satu jari-jari keseimbangan untuk periode T tertentu.',
      identifikasiData: [
        { symbol: 'tan θ', latexSymbol: '\\tan 37^\\circ', name: 'Tangen sudut miring', value: '0,75', unit: '-' },
        { symbol: 'T', latexSymbol: 'T', name: 'Periode putaran', value: '4,0', unit: 's' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan jari-jari lintasan horizontal r dalam meter (m).',
      analisisKonsep:
        'Menggabungkan dinamika tikungan miring licin (v²/r = g tan θ) dengan kinematika gerak melingkar beraturan (v = 2πr / T).',
      fbdPenjelasan:
        'Persis seperti Soal 7: berat W vertikal ke bawah dan gaya normal N tegak lurus dinding miring menghasilkan resultan horizontal menuju pusat.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: 'm·g' },
        { label: 'N', direction: 'Tegak lurus dinding miring', magnitude: 'mg / cos 37°' },
        { label: 'N sin 37°', direction: 'Horizontal ke pusat (+x)', magnitude: 'm·(4π²r / T²)' },
      ],
      persamaanFisikaLatex: 'r = \\frac{g T^2 \\tan\\theta}{4\\pi^2}',
      persamaanPenjelasan: 'Jari-jari kesetimbangan lintasan horizontal untuk periode putaran T.',
      penurunanPersamaan: [
        {
          stepTitle: 'Persamaan Tikungan Miring Licin',
          explanation: 'Dari grafik v² terhadap r, gradien garis lurus adalah g tan θ.',
          latex: '\\frac{v^2}{r} = g \\tan\\theta',
        },
        {
          stepTitle: 'Substitusi Kelajuan Berbasis Periode',
          explanation: 'Masukkan v = 2πr / T dan coret satu faktor r (untuk r > 0).',
          latex: '\\frac{4\\pi^2 r^2}{T^2 r} = g\\tan\\theta \\implies r = \\frac{g T^2 \\tan\\theta}{4\\pi^2}',
        },
      ],
      substitusiDataLatex: 'r = \\frac{9{,}8 \\times (4{,}0)^2 \\times 0{,}75}{4\\pi^2}',
      perhitunganLangkah: [
        { label: 'Hitung pembilang', latex: '9{,}8 \\times 16 \\times 0{,}75 = 117{,}6\\text{ m}^3/\\text{s}^2' },
        { label: 'Hitung 4π²', latex: '4\\pi^2 \\approx 39{,}4784176' },
        { label: 'Bagi untuk mendapatkan r', latex: 'r = \\frac{117{,}6}{39{,}4784176} = 2{,}9788\\text{ m}' },
      ],
      hasilAkhirNilai: '3,0',
      hasilAkhirSatuan: 'm',
      interpretasi:
        'Perhatikan bahwa makin besar periode T (putaran makin lambat dalam sudut ω = 2π/T), benda justru harus berada pada jari-jari lebih besar untuk menyeimbangkan g tan θ = ω²r!',
      strategiOlimpiade:
        'Dalam soal periode atau kecepatan sudut ω, langsung tulis ω²r = g tan θ daripada melalui v terlebih dahulu. Ingat pula aproksimasi cepat OSN: π² ≈ 9,87 ≈ g saat g = 9,8!',
    },
    relatedKnowledgeLevel: 3,
    animationSummary: 'Animasi memperlihatkan putaran penuh dengan periode T = 4,0 s pada radius kesetimbangan 3,0 m di dinding miring 37°.',
    narratorScripts: {
      stimulus: 'Grafik eksperimen menampilkan hubungan linear antara kuadrat kelajuan v kuadrat di sumbu tegak dan jari-jari r di sumbu mendatar pada kemiringan 37 derajat.',
      soal: 'Soal 9. Sebuah benda bergerak melingkar horizontal pada dinding miring licin bersudut 37 derajat dengan tangen 37 derajat sama dengan 0 koma 75. Jika periode putarannya 4 koma 0 sekon dan g sama dengan 9 koma 8, tentukan jari-jari lintasannya dalam meter.',
      diagram: 'Gaya normal tegak lurus dinding dan berat ke bawah menghasilkan percepatan sentripetal omega kuadrat r sama dengan g tangen teta.',
      pembahasan: 'Substitusikan v sama dengan 2 pi r per T ke dalam v kuadrat per r sama dengan g tangen teta. Diperoleh r sama dengan g T kuadrat tangen teta dibagi 4 pi kuadrat, yang bernilai 3 koma 0 meter.',
    },
  },

  // ==========================================
  // TIER 4: HIGHER ORDER THINKING (SOAL 10 - 12)
  // ==========================================
  {
    id: 10,
    tier: 'hots',
    tierLabel: 'Higher Order Thinking',
    title: 'Ambang Terguling ("Tidak Terbalik") pada Tikungan Miring',
    contextSubtitle: 'Keseimbangan Momen Gaya terhadap Pusat Massa Kendaraan',
    stimulusType: 'rollover-limit',
    stimulusCaption:
      'Penampang mobil lebar antarban d = 1,6 m dan tinggi pusat massa h = 0,80 m pada tikungan miring θ = 20°, r = 50 m saat roda dalam tepat akan terangkat.',
    stimulusDataNote: 'd = 1,6 m · h = 0,80 m · θ = 20° · r = 50 m · g = 9,8 m/s²',
    questionText:
      'Meninjau kembali kondisi "tidak terbalik" pada Soal Nomor 7: sebuah mobil sedan memiliki lebar jarak antarban kiri-kanan d = 1,6 m dan tinggi pusat massa h = 0,80 m diukur tegak lurus dari permukaan jalan miring. Mobil melewati tikungan miring kasar dengan θ = 20° dan r = 50 m (g = 9,8 m/s²). Asumsikan ban tidak selip. Berapakah kelajuan kritis maksimum mobil agar ban bagian dalam belum terlepas dari aspal atau mobil tepat tidak terbalik (dalam m/s)?',
    knownData: [
      { symbol: 'd', latexSymbol: 'd', name: 'Jarak antarban (track width)', value: '1,6', unit: 'm' },
      { symbol: 'h', latexSymbol: 'h', name: 'Tinggi pusat massa dari jalan', value: '0,80', unit: 'm' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring jalan', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan ke PM', value: '50', unit: 'm' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan kritis terguling v_guling',
    askedSymbolLatex: 'v_{\\text{guling}}',
    answerUnit: 'm/s',
    ...makeAnswerFields(10),
    hints: {
      hint1: 'Saat mobil tepat mulai terbalik (terguling keluar), roda bagian dalam kehilangan kontak dengan jalan sehingga gaya normal roda dalam N_dalam = 0.',
      hint2: 'Seluruh gaya normal N dan gaya gesek f_s kini bertumpu pada roda bagian luar. Terapkan kesetimbangan rotasi (Στ_PM = 0) terhadap pusat massa mobil.',
      hint3: 'Dari N·(d/2) = f_s·h diperoleh rasio f_s/N = d/(2h). Rasio ini menggantikan μ_s dalam rumus kecepatan batas tikungan miring!',
    },
    solution: {
      memahamiFenomena:
        'Jika ban sangat lengket sehingga tidak selip, menaikkan kecepatan terus-menerus akan membuat beban roda dalam pindah ke roda luar. Pada kelajuan kritis v_guling, roda dalam terangkat (N_dalam = 0) dan mobil tepat mulai terguling ke luar belokan.',
      identifikasiData: [
        { symbol: 'd', latexSymbol: 'd', name: 'Lebar jarak ban', value: '1,6', unit: 'm' },
        { symbol: 'h', latexSymbol: 'h', name: 'Tinggi pusat massa', value: '0,80', unit: 'm' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut jalan', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan kritis v_guling dalam satuan m/s.',
      analisisKonsep:
        'Menggabungkan dinamika gerak melingkar pada bidang miring (Hukum II Newton translasi) dengan syarat kesetimbangan rotasi (Στ_PM = 0) terhadap pusat massa.',
      fbdPenjelasan:
        'Semua gaya kontak jalan (N_luar = N dan f_s) bekerja di titik kontak roda kiri/luar yang berjarak d/2 dari garis simetri mobil dan h di bawah pusat massa.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Melalui PM vertikal ke bawah', magnitude: 'm·g' },
        { label: 'N_luar = N', direction: 'Di roda luar, tegak lurus jalan', magnitude: 'm(g cos θ + (v²/r) sin θ)' },
        { label: 'f_s', direction: 'Di roda luar, sejajar jalan ke bawah', magnitude: 'N · (d / 2h)' },
      ],
      persamaanFisikaLatex: 'v_{\\text{guling}} = \\sqrt{g r \\frac{\\tan\\theta + \\frac{d}{2h}}{1 - \\frac{d}{2h}\\tan\\theta}}',
      persamaanPenjelasan: 'Rasio geometris d/(2h) berperan identik dengan koefisien gesek efektif pada ambang guling.',
      penurunanPersamaan: [
        {
          stepTitle: 'Kesetimbangan Momen Gaya terhadap Pusat Massa',
          explanation: 'Karena mobil tidak berotasi (α_rot = 0) dan N_dalam = 0, torka N terhadap PM menyeimbangkan torka f_s terhadap PM.',
          latex: '\\Sigma\\tau_{\\text{PM}} = N\\left(\\frac{d}{2}\\right) - f_s h = 0 \\implies \\frac{f_s}{N} = \\frac{d}{2h}',
        },
        {
          stepTitle: 'Substitusi ke Persamaan Translasi Bidang Miring',
          explanation: 'Gunakan N = m(g cos θ + (v²/r) sin θ) dan f_s = m((v²/r) cos θ − g sin θ).',
          latex: '\\frac{v^2}{r}\\cos\\theta - g\\sin\\theta = \\frac{d}{2h}\\left(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\right) \\implies v_{\\text{guling}} = \\sqrt{g r \\frac{\\tan\\theta + \\frac{d}{2h}}{1 - \\frac{d}{2h}\\tan\\theta}}',
        },
      ],
      substitusiDataLatex: 'v_{\\text{guling}} = \\sqrt{9{,}8 \\times 50 \\times \\frac{\\tan 20^\\circ + \\frac{1{,}6}{2(0{,}80)}}{1 - \\frac{1{,}6}{2(0{,}80)}\\tan 20^\\circ}}',
      perhitunganLangkah: [
        { label: 'Hitung faktor stabilitas d/(2h)', latex: '\\frac{d}{2h} = \\frac{1{,}6}{1{,}6} = 1{,}0' },
        { label: 'Sederhanakan pecahan sudut', latex: '\\frac{\\tan 20^\\circ + 1}{1 - \\tan 20^\\circ} = \\tan(20^\\circ + 45^\\circ) = \\tan 65^\\circ = 2{,}1445069' },
        { label: 'Hitung kelajuan kritis', latex: 'v_{\\text{guling}} = \\sqrt{490 \\times 2{,}1445069} = \\sqrt{1050{,}8084} = 32{,}4162\\text{ m/s}' },
      ],
      hasilAkhirNilai: '32,4',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Mobil baru akan terguling di kecepatan 32,4 m/s (116,7 km/jam). Ini menjelaskan mengapa mobil sport dibuat sangat lebar (d besar) dan ceper (h kecil).',
      strategiOlimpiade:
        'Karena d/(2h) = 1 = tan 45°, langsung terapkan penjumlahan sudut tan(θ + 45°)! Di kerangka non-inersia, bisa juga langsung menyeimbangkan torka gaya berat + gaya sentrifugal terhadap titik tumpu roda luar.',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Animasi memperlihatkan pergeseran beban ke roda luar dan kemiringan bodi saat kecepatan mencapai ambang guling 32,4 m/s.',
    narratorScripts: {
      stimulus: 'Diagram penampang memperlihatkan lebar lintasan roda d sebesar 1 koma 6 meter dan tinggi pusat massa h sebesar 0 koma 80 meter di tikungan miring 20 derajat.',
      soal: 'Soal 10. Sebuah mobil memiliki jarak antarban 1 koma 6 meter dan tinggi pusat massa 0 koma 80 meter pada tikungan miring kasar bersudut 20 derajat dan jari-jari 50 meter. Hitung kelajuan kritis agar roda dalam belum terangkat atau tidak terbalik dalam meter per sekon.',
      diagram: 'Saat roda dalam tepat terangkat, seluruh gaya normal dan gesek bertumpu pada roda luar. Kesetimbangan torka terhadap pusat massa memberikan rasio f s per N sama dengan d per 2 h.',
      pembahasan: 'Karena d per 2 h sama dengan 1 atau tangen 45 derajat, rumus langsung menyusut menjadi akar g r dikali tangen 20 plus 45 derajat, yaitu akar 490 kali tangen 65 derajat sama dengan 32 koma 4 meter per sekon.',
    },
  },
  {
    id: 11,
    tier: 'hots',
    tierLabel: 'Higher Order Thinking',
    title: 'Simpangan Bandul di Dalam Kabin Mobil pada Tikungan Miring',
    contextSubtitle: 'Analisis Kerangka Non-Inersia & Gravitasi Efektif di Kabin',
    stimulusType: 'cabin-pendulum',
    stimulusCaption:
      'Sebuah bandul tergantung dari langit-langit mobil yang miring θ = 20° sambil berbelok dengan kelajuan konstan v = 18,0 m/s pada radius r = 50 m.',
    stimulusDataNote: 'θ = 20° · r = 50 m · v = 18,0 m/s · g = 9,8 m/s²',
    questionText:
      'Di dalam kabin sebuah mobil yang sedang melaju di tikungan miring kasar bersudut θ = 20° dan berjari-jari r = 50 m, tergantung sebuah bandul kecil dari langit-langit mobil. Mobil melaju dengan kelajuan konstan v = 18,0 m/s (g = 9,8 m/s²). Ketika bandul mencapai kesetimbangan relatif terhadap mobil, berapakah sudut simpangan tali bandul terhadap garis yang tegak lurus langit-langit mobil (dalam derajat)?',
    knownData: [
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Kemiringan mobil & jalan', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari belokan', value: '50', unit: 'm' },
      { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan mobil', value: '18,0', unit: 'm/s' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Sudut bandul terhadap garis normal atap mobil α',
    askedSymbolLatex: '\\alpha',
    answerUnit: '°',
    ...makeAnswerFields(11),
    hints: {
      hint1: 'Terhadap garis VERTIKAL SEJATI, bandul mengalami gaya tegangan tali T dan berat mg dengan percepatan horizontal a_s = v²/r ke pusat lingkaran.',
      hint2: 'Hitung sudut tali bandul φ terhadap garis vertikal sejati dari tan φ = a_s / g = v² / (g r).',
      hint3: 'Garis tegak lurus langit-langit mobil sendiri sudah miring sebesar θ = 20° terhadap vertikal sejati! Maka sudut relatif terhadap garis normal kabin adalah α = φ − θ.',
    },
    solution: {
      memahamiFenomena:
        'Jika mobil melaju pada kelajuan ideal Soal 7 (13,4 m/s), bandul akan tergantung tepat tegak lurus atap mobil (α = 0°). Karena kini mobil lebih cepat (18,0 m/s), gaya semu sentrifugal menarik bandul lebih jauh ke sisi luar kabin relatif terhadap atap mobil.',
      identifikasiData: [
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Kemiringan atap/jalan', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
        { symbol: 'v', latexSymbol: 'v', name: 'Kelajuan', value: '18,0', unit: 'm/s' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan sudut α antara tali bandul dan garis tegak lurus langit-langit kabin dalam derajat (°).',
      analisisKonsep:
        'Pada kerangka inersia, bandul memiliki percepatan horizontal a_s = v²/r (identik dengan mobil). Secara ekuivalen, di dalam kabin timbul medan gravitasi efektif g_ef = √(g² + a_s²) yang miring sudut φ terhadap vertikal sejati.',
      fbdPenjelasan:
        'Pada bandul bermassa m_b: tegangan tali T miring sudut φ dari vertikal sejati ke arah pusat lingkaran, dan gaya berat m_b g vertikal ke bawah.',
      fbdVectors: [
        { label: 'W_b = m_b·g', direction: 'Vertikal ke bawah (-y)', magnitude: 'm_b · 9,8' },
        { label: 'T', direction: 'Sepanjang tali (sudut φ terhadap +y)', magnitude: 'm_b √(g² + (v²/r)²)' },
        { label: 'Garis normal kabin', direction: 'Miring θ = 20° terhadap +y', magnitude: 'Acuan sudut α' },
      ],
      persamaanFisikaLatex: '\\tan\\phi = \\frac{v^2}{g r}, \\qquad \\alpha = \\phi - \\theta',
      persamaanPenjelasan: 'Sudut terhadap normal kabin adalah selisih sudut tali terhadap vertikal dan kemiringan jalan θ.',
      penurunanPersamaan: [
        {
          stepTitle: 'Dinamika Bandul terhadap Sumbu Horizontal-Vertikal',
          explanation: 'Tulis Hukum Newton pada bandul bermassa m_b.',
          latex: 'T\\sin\\phi = m_b \\frac{v^2}{r}, \\qquad T\\cos\\phi = m_b g \\implies \\tan\\phi = \\frac{v^2}{g r}',
        },
        {
          stepTitle: 'Transformasi ke Acuan Langit-Langit Kabin',
          explanation: 'Karena lantai/atap miring θ dari horizontal, garis tegak lurus atap miring θ dari vertikal menuju pusat.',
          latex: '\\alpha = \\phi - \\theta',
        },
      ],
      substitusiDataLatex: '\\tan\\phi = \\frac{18{,}0^2}{9{,}8 \\times 50} = \\frac{324}{490}',
      perhitunganLangkah: [
        { label: 'Hitung tan φ dan φ', latex: '\\tan\\phi = 0{,}66122449 \\implies \\phi = \\arctan(0{,}66122449) = 33{,}47356^\\circ' },
        { label: 'Kurangkan dengan kemiringan jalan θ = 20°', latex: '\\alpha = 33{,}47356^\\circ - 20^\\circ = 13{,}47356^\\circ' },
      ],
      hasilAkhirNilai: '13,5',
      hasilAkhirSatuan: '°',
      interpretasi:
        'Penumpang di dalam mobil merasa seolah-olah arah "bawah" miring 13,5° ke sisi luar terhadap lantai mobil. Jika v = 13,4 m/s, maka φ = 20° dan α = 0° (penumpang tidak merasakan tarikan menyamping sama sekali).',
      strategiOlimpiade:
        'Metode gravitasi efektif sangat ampuh: g_ef selalu searah dengan arah normal saat laju ideal (φ = θ). Deviasi kecepatan langsung terbaca dari φ − θ.',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Animasi menunjukkan bandul menyimpang dari garis tegak lurus atap hingga mencapai sudut setimbang 13,5°.',
    narratorScripts: {
      stimulus: 'Gambar memperlihatkan bandul di dalam kabin mobil yang berbelok pada tikungan miring 20 derajat dengan kelajuan 18 meter per sekon.',
      soal: 'Soal 11. Pada mobil yang berbelok di tikungan miring 20 derajat berjari-jari 50 meter dengan kelajuan 18 koma 0 meter per sekon, tentukan sudut simpangan bandul terhadap garis tegak lurus langit-langit mobil dalam derajat.',
      diagram: 'Tegangan tali bandul membentuk sudut fi terhadap vertikal sejati memenuhi tangen fi sama dengan v kuadrat per g r, sedangkan garis normal atap sudah miring 20 derajat.',
      pembahasan: 'Dari tangen fi sama dengan 324 per 490 diperoleh fi sama dengan 33 koma 47 derajat. Karena normal atap sudah miring 20 derajat, sudut bandul relatif terhadap normal atap adalah 33 koma 47 dikurangi 20, yaitu 13 koma 5 derajat.',
    },
  },
  {
    id: 12,
    tier: 'hots',
    tierLabel: 'Higher Order Thinking',
    title: 'Waktu Kritis Selip pada Tikungan Miring dengan Percepatan Tangensial',
    contextSubtitle: 'Kombinasi Gaya Gesek Radial & Tangensial Dua Dimensi',
    stimulusType: 'tangential-accel-table',
    stimulusCaption:
      'Tabel telemetri percepatan mobil yang mulai dari v_0 = 8,0 m/s dan dipercepat tangensial konstan a_t = 2,0 m/s² di tikungan miring (θ = 20°, r = 50 m, μ_s = 0,40).',
    stimulusDataNote: 'v_0 = 8,0 m/s · a_t = 2,0 m/s² · θ = 20° · r = 50 m · μ_s = 0,40 · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil berada di tikungan melingkar miring kasar (θ = 20°, r = 50 m, μ_s = 0,40, g = 9,8 m/s²). Pada t = 0 s, kelajuan mobil adalah v_0 = 8,0 m/s dan pengemudi menginjak gas sehingga mobil mengalami percepatan tangensial konstan sepanjang lintasan sebesar a_t = 2,0 m/s². Berapakah selang waktu t sejak t = 0 hingga ban mobil tepat mulai tergelincir keluar (dalam sekon)?',
    knownData: [
      { symbol: 'v_0', latexSymbol: 'v_0', name: 'Kelajuan awal', value: '8,0', unit: 'm/s' },
      { symbol: 'a_t', latexSymbol: 'a_t', name: 'Percepatan tangensial', value: '2,0', unit: 'm/s²' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '50', unit: 'm' },
      { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,40', unit: '-' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Waktu kritis mulai selip t',
    askedSymbolLatex: 't',
    answerUnit: 's',
    ...makeAnswerFields(12),
    hints: {
      hint1: 'Gaya gesek total di permukaan aspal memiliki dua komponen yang saling tegak lurus: komponen melintang (sejajar kemiringan jalan) f_∥ dan komponen memanjang (arah tangensial gerak) f_t = m a_t.',
      hint2: 'Syarat tepat mulai selip adalah √(f_∥² + f_t²) = μ_s N, dengan N = m(g cos θ + u sin θ) dan u = v²/r.',
      hint3: 'Selesaikan persamaan kuadrat untuk u = v²/r agar memperoleh v_kritis, lalu hitung waktu t = (v_kritis − v_0) / a_t.',
    },
    solution: {
      memahamiFenomena:
        'Berbeda dengan kasus laju konstan (Soal 7), sebagian kapasitas cengkeram gesekan ban dipakai untuk mendorong mobil mempercepat laju secara tangensial (m a_t). Akibatnya, batas kecepatan kritis sebelum selip menjadi lebih kecil daripada 20,9 m/s.',
      identifikasiData: [
        { symbol: 'v_0', latexSymbol: 'v_0', name: 'Laju awal', value: '8,0', unit: 'm/s' },
        { symbol: 'a_t', latexSymbol: 'a_t', name: 'Percepatan tangensial', value: '2,0', unit: 'm/s²' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut miring', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
        { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek', value: '0,40', unit: '-' },
      ],
      identifikasiPertanyaan: 'Menentukan waktu kritis t dalam sekon (s).',
      analisisKonsep:
        'Lingkaran traksi gesekan (friction circle): resultan vektor dua komponen gaya gesek pada bidang permukaan jalan miring tidak boleh melampaui μ_s N.',
      fbdPenjelasan:
        'Di bidang jalan miring, f_∥ bekerja ke bawah kemiringan untuk mengarahkan sentripetal, sedangkan f_t = m a_t bekerja sejajar arah gerak mobil (tegak lurus f_∥).',
      fbdVectors: [
        { label: 'f_∥', direction: 'Sejajar kemiringan jalan ke bawah', magnitude: 'm((v²/r) cos θ − g sin θ)' },
        { label: 'f_t', direction: 'Tangensial sepanjang lintasan', magnitude: 'm · 2,0' },
        { label: 'f_total', direction: 'Resultan di bidang jalan', magnitude: '√(f_∥² + f_t²) = μ_s N' },
      ],
      persamaanFisikaLatex: '\\left(\\frac{v^2}{r}\\cos\\theta - g\\sin\\theta\\right)^2 + a_t^2 = \\mu_s^2\\left(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\right)^2',
      persamaanPenjelasan: 'Persamaan kritis dua dimensi dalam variabel u = v²/r.',
      penurunanPersamaan: [
        {
          stepTitle: 'Komponen Gaya Gesek & Gaya Normal',
          explanation: 'Misalkan u = v²/r adalah percepatan sentripetal sesaat.',
          latex: '\\frac{f_\\parallel}{m} = u\\cos\\theta - g\\sin\\theta, \\quad \\frac{f_t}{m} = a_t, \\quad \\frac{N}{m} = g\\cos\\theta + u\\sin\\theta',
        },
        {
          stepTitle: 'Bentuk Kuadrat dalam u',
          explanation: 'Kuadratkan f_∥² + f_t² = μ_s² N² untuk mendapatkan A u² + B u + C = 0.',
          latex: '(\\cos^2\\theta - \\mu_s^2\\sin^2\\theta)u^2 - 2g\\sin\\theta\\cos\\theta(1 + \\mu_s^2)u + (g^2\\sin^2\\theta + a_t^2 - \\mu_s^2 g^2\\cos^2\\theta) = 0',
        },
      ],
      substitusiDataLatex: '0{,}864306\\, u^2 - 7{,}307209\\, u + 1{,}665673 = 0',
      perhitunganLangkah: [
        { label: 'Selesaikan akar u yang sesuai (selip keluar)', latex: 'u = \\frac{7{,}307209 + \\sqrt{7{,}307209^2 - 4(0{,}864306)(1{,}665673)}}{2(0{,}864306)} = 8{,}219974\\text{ m/s}^2' },
        { label: 'Hitung kelajuan kritis v', latex: 'v_{\\text{kritis}} = \\sqrt{u\\cdot r} = \\sqrt{8{,}219974 \\times 50} = 20{,}2731\\text{ m/s}' },
        { label: 'Hitung waktu dengan v = v_0 + a_t·t', latex: 't = \\frac{20{,}2731 - 8{,}0}{2{,}0} = 6{,}1366\\text{ s}' },
      ],
      hasilAkhirNilai: '6,1',
      hasilAkhirSatuan: 's',
      interpretasi:
        'Bandingkan dengan Soal 7: adanya akselerasi tangensial 2,0 m/s² menurunkan kecepatan batas dari 20,9 m/s menjadi 20,3 m/s. Pada detik ke-6,1, lingkaran traksi ban penuh dan mobil mulai selip.',
      strategiOlimpiade:
        'Jangan lupa bahwa f_t tegak lurus f_∥, BUKAN dijumlahkan secara skalar! Dan selalu periksa kondisi awal t = 0 apakah mobil sudah selip ke bawah (aman pada t = 0 karena f_total(0)/m = 2,94 < 3,86).',
    },
    relatedKnowledgeLevel: 4,
    animationSummary: 'Animasi menampilkan percepatan mobil bertahap dari 8,0 m/s dengan dua komponen gesekan ortogonal hingga mencapai batas selip di t = 6,1 s.',
    narratorScripts: {
      stimulus: 'Tabel dan diagram menampilkan mobil yang dipercepat tangensial konstan 2 koma 0 meter per sekon kuadrat sejak kecepatan awal 8 koma 0 meter per sekon di tikungan miring.',
      soal: 'Soal 12. Pada tikungan miring kasar sudut 20 derajat, radius 50 meter, dan miu s 0 koma 40, mobil mulai dari 8 koma 0 meter per sekon dan dipercepat tangensial 2 koma 0 meter per sekon kuadrat. Hitung waktu hingga ban tepat mulai tergelincir keluar dalam sekon.',
      diagram: 'Di permukaan jalan miring, gaya gesek total merupakan resultan Pythagoras dari komponen radial sejajar kemiringan dan komponen tangensial m kali a t.',
      pembahasan: 'Dari syarat f paralel kuadrat ditambah f tangensial kuadrat sama dengan miu s kuadrat N kuadrat, diperoleh kecepatan kritis 20 koma 27 meter per sekon. Maka waktu yang dibutuhkan adalah 6 koma 1 sekon.',
    },
  },

  // ==========================================
  // TIER 5: CITY OLYMPIAD CHALLENGE (SOAL 13 - 15)
  // ==========================================
  {
    id: 13,
    tier: 'olympiad',
    tierLabel: 'City Olympiad Challenge',
    title: 'Lintasan Tikungan Miring Berprofil Parabolik',
    contextSubtitle: 'Kalkulus Kemiringan Lokal dan Dinamika Gerak Melingkar',
    stimulusType: 'parabolic-track',
    stimulusCaption:
      'Penampang vertikal lintasan parabolik y = k x² (k = 0,010 m⁻¹) dengan mobil mengitari sumbu simetri pada radius r = 30 m tanpa gaya gesek samping.',
    stimulusDataNote: 'y = k x² · k = 0,010 m⁻¹ · r = 30 m · g = 9,8 m/s²',
    questionText:
      'Sebuah lintasan uji berbentuk mangkuk parabolik simetris terhadap sumbu vertikal memiliki profil penampang y = k x², dengan k = 0,010 m⁻¹, di mana x adalah jarak horizontal dari sumbu pusat dan y adalah ketinggian lintasan. Sebuah mobil bermassa 1000 kg melaju melingkar horizontal di dinding lintasan tanpa mengalami gaya gesek samping pada jari-jari x = r = 30 m. Jika g = 9,8 m/s², tentukan kelajuan mobil pada lintasan tersebut (dalam m/s)!',
    knownData: [
      { symbol: 'y(x)', latexSymbol: 'y = k x^2', name: 'Persamaan profil lintasan', value: 'k = 0,010', unit: 'm⁻¹' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan (x = r)', value: '30', unit: 'm' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan mobil v pada r = 30 m',
    askedSymbolLatex: 'v',
    answerUnit: 'm/s',
    ...makeAnswerFields(13),
    hints: {
      hint1: 'Pada setiap titik x, kemiringan garis singgung kurva lintasan memenuhi tan θ = dy/dx.',
      hint2: 'Turunkan y = k x² terhadap x untuk memperoleh tan θ = 2 k x pada posisi x = r.',
      hint3: 'Masukkan tan θ = 2 k r ke persamaan tikungan miring licin v = √(g r tan θ).',
    },
    solution: {
      memahamiFenomena:
        'Berbeda dari jalan miring bersudut konstan pada Soal 7, di lintasan parabolik sudut kemiringan lokal θ(r) membesar seiring menjauhnya mobil dari pusat. Makin tinggi posisi mobil, makin curam kemiringannya.',
      identifikasiData: [
        { symbol: 'k', latexSymbol: 'k', name: 'Konstanta kelengkungan parabola', value: '0,010', unit: 'm⁻¹' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '30', unit: 'm' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan v dalam m/s.',
      analisisKonsep:
        'Menggabungkan gradien geometris kurva (dy/dx = tan θ) dengan dinamika tikungan miring ideal (v² = g r tan θ).',
      fbdPenjelasan:
        'Di titik x = r, gaya normal N tegak lurus garis singgung kurva y = kx², sehingga membentuk sudut θ terhadap vertikal dengan tan θ = dy/dx.',
      fbdVectors: [
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '9.800 N' },
        { label: 'N', direction: 'Normal kurva pada x = 30 m', magnitude: 'mg √(1 + 4k²r²)' },
        { label: 'N sin θ', direction: 'Horizontal menuju sumbu pusat', magnitude: 'm·(2gkr)' },
      ],
      persamaanFisikaLatex: '\\tan\\theta = \\frac{dy}{dx} = 2 k r \\;\\Longrightarrow\\; v = r\\sqrt{2 g k}',
      persamaanPenjelasan: 'Kelajuan sebanding lurus dengan jari-jari r (kecepatan sudut konstan di seluruh parabola!).',
      penurunanPersamaan: [
        {
          stepTitle: 'Kemiringan Lokal Lintasan',
          explanation: 'Hitung turunan pertama fungsi parabola di x = r.',
          latex: '\\tan\\theta = \\left.\\frac{dy}{dx}\\right|_{x=r} = 2 k r',
        },
        {
          stepTitle: 'Substitusi ke Dinamika Tikungan Miring',
          explanation: 'Masukkan tan θ = 2kr ke dalam v² = g r tan θ.',
          latex: 'v^2 = g r (2 k r) = 2 g k r^2 \\implies v = r\\sqrt{2 g k}',
        },
      ],
      substitusiDataLatex: 'v = 30\\sqrt{2 \\times 9{,}8 \\times 0{,}010}',
      perhitunganLangkah: [
        { label: 'Hitung 2 g k', latex: '2 \\times 9{,}8 \\times 0{,}010 = 0{,}196\\text{ s}^{-2}' },
        { label: 'Akar kuadratkan', latex: '\\sqrt{0{,}196} = 0{,}44271887\\text{ s}^{-1}' },
        { label: 'Kalikan dengan r = 30 m', latex: 'v = 30 \\times 0{,}44271887 = 13{,}2816\\text{ m/s}' },
      ],
      hasilAkhirNilai: '13,3',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Fakta olimpiade yang menakjubkan: karena v/r = ω = √(2gk) konstan, kecepatan sudut benda di lintasan parabolik licin TIDAK BERGANTUNG pada jari-jari r atau ketinggian y — mirip sifat isokronisme!',
      strategiOlimpiade:
        'Cek apakah benda bergerak naik-turun: jika tidak, langsung pakai dy/dx = tan θ = v²/(gr) tanpa perlu repot mencari sudut θ secara eksplisit dalam derajat!',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Animasi menunjukkan mobil naik dari radius 15 m ke 30 m di kurva parabolik dengan kemiringan lokal bertambah secara dinamis.',
    narratorScripts: {
      stimulus: 'Diagram menampilkan lintasan penampang parabolik y sama dengan k x kuadrat dengan garis singgung yang makin curam saat x membesar.',
      soal: 'Soal 13. Sebuah mobil melaju melingkar horizontal tanpa gesekan samping pada dinding parabolik y sama dengan 0 koma 010 x kuadrat di jari-jari 30 meter. Jika g sama dengan 9 koma 8 meter per sekon kuadrat, tentukan kelajuan mobil dalam meter per sekon.',
      diagram: 'Kemiringan lokal tangen teta sama dengan turunan d y per d x yaitu 2 k r. Pada posisi ini, komponen horizontal gaya normal menyuplai gaya sentripetal.',
      pembahasan: 'Substitusi tangen teta sama dengan 2 k r ke dalam v kuadrat sama dengan g r tangen teta menghasilkan v sama dengan r kali akar 2 g k. Untuk r 30 meter, hasilnya adalah 13 koma 3 meter per sekon.',
    },
  },
  {
    id: 14,
    tier: 'olympiad',
    tierLabel: 'City Olympiad Challenge',
    title: 'Kompetisi Selip vs Terbalik: Tinggi Pusat Massa Kritis',
    contextSubtitle: 'Analisis Desain Keselamatan Kendaraan di Tikungan Miring',
    stimulusType: 'slip-vs-tip-height',
    stimulusCaption:
      'Perbandingan dua modus kegagalan di tikungan miring (θ = 20°, r = 50 m, d = 1,8 m, μ_s = 0,65): tergelincir keluar vs terguling.',
    stimulusDataNote: 'd = 1,8 m · θ = 20° · r = 50 m · μ_s = 0,65 · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil sedan memiliki jarak antarban kiri-kanan d = 1,8 m dan melaju melewati tikungan miring kasar dengan sudut kemiringan θ = 20°, jari-jari lintasan r = 50 m, serta koefisien gesek statis ban terhadap jalan μ_s = 0,65 (g = 9,8 m/s²). Agar saat kecepatan terus dinaikkan mobil lebih dahulu tergelincir (selip) daripada terbalik (terguling), berapakah batas tinggi pusat massa maksimum h_maks mobil yang diizinkan dari permukaan jalan (dalam m)?',
    knownData: [
      { symbol: 'd', latexSymbol: 'd', name: 'Jarak antarban', value: '1,8', unit: 'm' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut jalan', value: '20', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '50', unit: 'm' },
      { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,65', unit: '-' },
    ],
    askedQuantity: 'Tinggi pusat massa maksimum h_maks',
    askedSymbolLatex: 'h_{\\text{maks}}',
    answerUnit: 'm',
    ...makeAnswerFields(14),
    hints: {
      hint1: 'Mobil akan selip lebih dulu sebelum terbalik jika kelajuan kritis selip tidak melebihi kelajuan kritis terguling: v_selip ≤ v_guling.',
      hint2: 'Bandingkan persamaan v_selip = √[gr(tan θ + μ_s)/(1 − μ_s tan θ)] dengan v_guling = √[gr(tan θ + d/(2h))/(1 − (d/(2h)) tan θ)].',
      hint3: 'Karena fungsi f(ξ) = (tan θ + ξ)/(1 − ξ tan θ) bersifat naik monoton, pertidaksamaan v_selip ≤ v_guling langsung menyusut menjadi μ_s ≤ d / (2h)!',
    },
    solution: {
      memahamiFenomena:
        'Dalam rekayasa keselamatan otomotif, tergelincir jauh lebih bisa dikendalikan pengemudi daripada mobil terguling (terbalik). Syarat agar mobil selip lebih dulu menuntut pusat massa berada di bawah batas ketinggian kritis h_maks.',
      identifikasiData: [
        { symbol: 'd', latexSymbol: 'd', name: 'Jarak roda kiri-kanan', value: '1,8', unit: 'm' },
        { symbol: 'μ_s', latexSymbol: '\\mu_s', name: 'Koefisien gesek statis', value: '0,65', unit: '-' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut kemiringan', value: '20', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari', value: '50', unit: 'm' },
      ],
      identifikasiPertanyaan: 'Menentukan tinggi pusat massa maksimum h_maks dalam meter (m).',
      analisisKonsep:
        'Perbandingan dua batas fisika: batas gaya gesek statis f_s ≤ μ_s N dan batas momen torka pengguling f_s/N ≤ d/(2h).',
      fbdPenjelasan:
        'Pada saat tepat mencapai v_selip, rasio gaya f_s/N bernilai μ_s. Agar roda dalam belum terangkat (N_dalam ≥ 0), lengan momen berat/normal harus lebih besar dari lengan momen gesekan.',
      fbdVectors: [
        { label: 'N_luar + N_dalam', direction: 'Tegak lurus jalan', magnitude: 'N total' },
        { label: 'f_s = μ_s N', direction: 'Sejajar jalan ke bawah', magnitude: '0,65 N' },
        { label: 'Lengan torka kritis', direction: 'Terhadap PM', magnitude: 'd/2 = 0,9 m vs h' },
      ],
      persamaanFisikaLatex: 'v_{\\text{selip}} \\le v_{\\text{guling}} \\;\\Longleftrightarrow\\; \\mu_s \\le \\frac{d}{2h} \\;\\Longrightarrow\\; h_{\\text{maks}} = \\frac{d}{2\\mu_s}',
      persamaanPenjelasan: 'Batas ketinggian pusat massa ternyata invarian terhadap kemiringan jalan θ dan jari-jari r.',
      penurunanPersamaan: [
        {
          stepTitle: 'Bandingkan Kedua Kelajuan Kritis',
          explanation: 'Gunakan definisi sudut efektif φ_g = arctan(μ_s) dan φ_t = arctan(d/2h).',
          latex: 'v_{\\text{selip}} = \\sqrt{g r \\tan(\\theta + \\varphi_g)}, \\qquad v_{\\text{guling}} = \\sqrt{g r \\tan(\\theta + \\varphi_t)}',
        },
        {
          stepTitle: 'Monotonisitas Fungsi Tangen',
          explanation: 'Untuk θ + φ < 90°, tan adalah fungsi naik monoton sehingga φ_g ≤ φ_t.',
          latex: '\\tan\\varphi_g \\le \\tan\\varphi_t \\implies \\mu_s \\le \\frac{d}{2h} \\implies h \\le \\frac{d}{2\\mu_s}',
        },
      ],
      substitusiDataLatex: 'h_{\\text{maks}} = \\frac{1{,}8\\text{ m}}{2 \\times 0{,}65}',
      perhitunganLangkah: [
        { label: 'Periksa syarat θ + φ_g < 90°', latex: '\\mu_s\\tan 20^\\circ = 0{,}65 \\times 0{,}36397 = 0{,}2366 < 1 \\;(\\text{valid})' },
        { label: 'Hitung h_maks', latex: 'h_{\\text{maks}} = \\frac{1{,}8}{1{,}30} = 1{,}384615\\text{ m}' },
      ],
      hasilAkhirNilai: '1,4',
      hasilAkhirSatuan: 'm',
      interpretasi:
        'Selama tinggi pusat massa mobil tidak melebihi 1,4 m (mobil sedan pada umumnya ~0,55 m), mobil dijamin akan selip lebih dulu sebelum terbalik, berapapun sudut miring dan radius belokannya (selama μ_s tan θ < 1).',
      strategiOlimpiade:
        'Pembina OSN menyukai soal yang tampak penuh parameter (θ, r, g, d, μ_s), namun setelah analisis torka terhadap PM, θ, r, dan g tereliminasi rapi! Cukup tinjau f_s · h ≤ N · (d/2) di ambang f_s = μ_s N.',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Simulasi membandingkan kelajuan selip dan guling serta memperlihatkan ban selip lebih dulu ketika h ≤ 1,4 m.',
    narratorScripts: {
      stimulus: 'Diagram membandingkan syarat selip terhadap syarat terguling pada mobil berjarak antarban 1 koma 8 meter di tikungan miring 20 derajat.',
      soal: 'Soal 14. Mobil dengan jarak antarban 1 koma 8 meter melewati tikungan miring 20 derajat, radius 50 meter, dan miu s 0 koma 65. Agar mobil selip lebih dulu sebelum terbalik saat kecepatan dinaikkan, tentukan tinggi pusat massa maksimum dalam meter.',
      diagram: 'Di titik kritis, rasio gaya gesek terhadap normal sama dengan miu s pada batas selip, dan sama dengan d per 2 h pada batas terguling.',
      pembahasan: 'Karena sifat monoton fungsi tangen sudut efektif, syarat v selip kurang dari v guling langsung menyusut menjadi miu s kurang dari d per 2 h, tidak bergantung pada teta. Diperoleh h maksimum sama dengan 1 koma 8 dibagi 1 koma 3, yaitu 1 koma 4 meter.',
    },
  },
  {
    id: 15,
    tier: 'olympiad',
    tierLabel: 'City Olympiad Challenge',
    title: 'Sistem Terkopel Tikungan Miring & Beban Gantung Melalui Lubang Pusat',
    contextSubtitle: 'Dinamika Gerak Melingkar Terikat Tegangan Tali pada Bidang Miring',
    stimulusType: 'coupled-hanging-mass',
    stimulusCaption:
      'Mobil uji bermassa m = 2,0 kg mengitari bidang miring licin θ = 30° pada radius r = 4,0 m sambil terhubung tali ke beban gantung M = 1,5 kg yang diam di lubang pusat.',
    stimulusDataNote: 'm = 2,0 kg · M = 1,5 kg · θ = 30° · r = 4,0 m · g = 9,8 m/s²',
    questionText:
      'Sebuah mobil uji kecil bermassa m = 2,0 kg bergerak melingkar horizontal di atas lintasan kerucut miring licin bersudut kemiringan θ = 30° terhadap horizontal dengan jari-jari lingkaran horizontal r = 4,0 m. Sebuah tali ringan tak bermulur mengikat mobil sejajar permukaan miring ke bawah menuju lubang licin di dasar pusat kerucut, lalu tergantung vertikal menahan sebuah beban bermassa M = 1,5 kg. Jika percepatan gravitasi g = 9,8 m/s², tentukan kelajuan mobil agar beban M tetap tergantung diam pada ketinggian konstan (dalam m/s)!',
    knownData: [
      { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil uji', value: '2,0', unit: 'kg' },
      { symbol: 'M', latexSymbol: 'M', name: 'Massa beban gantung', value: '1,5', unit: 'kg' },
      { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut bidang miring', value: '30', unit: '°' },
      { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lingkaran horizontal', value: '4,0', unit: 'm' },
      { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
    ],
    askedQuantity: 'Kelajuan mobil uji v agar M diam',
    askedSymbolLatex: 'v',
    answerUnit: 'm/s',
    ...makeAnswerFields(15),
    hints: {
      hint1: 'Karena beban M diam vertikal, besar tegangan tali di sepanjang tali adalah T = M·g.',
      hint2: 'Tali menarik mobil sejajar bidang miring KE BAWAH (menuju pusat lubang), sehingga komponen T pada sumbu-x mengarah ke pusat (+x) dan pada sumbu-y mengarah ke bawah (−y).',
      hint3: 'Selesaikan N cos θ − T sin θ = mg dan N sin θ + T cos θ = m v²/r untuk v = √[g r (tan θ + M/(m cos θ))].',
    },
    solution: {
      memahamiFenomena:
        'Ini adalah generalisasi puncak dari Soal Nomor 7: selain gaya normal N dan berat mg, kini terdapat tegangan tali T = Mg yang menarik mobil ke bawah sejajar bidang miring. Tali ini membantu menarik mobil ke arah pusat sekaligus menambah tekanan normal ke lintasan.',
      identifikasiData: [
        { symbol: 'm', latexSymbol: 'm', name: 'Massa mobil uji', value: '2,0', unit: 'kg' },
        { symbol: 'M', latexSymbol: 'M', name: 'Massa beban gantung', value: '1,5', unit: 'kg' },
        { symbol: 'θ', latexSymbol: '\\theta', name: 'Sudut bidang miring', value: '30', unit: '°' },
        { symbol: 'r', latexSymbol: 'r', name: 'Jari-jari lintasan', value: '4,0', unit: 'm' },
        { symbol: 'g', latexSymbol: 'g', name: 'Gravitasi', value: '9,8', unit: 'm/s²' },
      ],
      identifikasiPertanyaan: 'Menentukan kelajuan mobil v dalam satuan m/s.',
      analisisKonsep:
        'Hukum I Newton pada beban gantung M (T = Mg) dikopel dengan Hukum I dan II Newton dua dimensi (x horizontal, y vertikal) pada mobil di bidang miring licin.',
      fbdPenjelasan:
        'Pada beban M: T ke atas mengimbangi M g ke bawah. Pada mobil m: berat m g ke bawah, normal N tegak lurus miring, dan tegangan tali T = M g sejajar bidang ke kanan-bawah.',
      fbdVectors: [
        { label: 'M·g & T (beban)', direction: 'Vertikal seimbang', magnitude: 'T = 14,7 N' },
        { label: 'W = m·g', direction: 'Vertikal ke bawah (-y)', magnitude: '19,6 N' },
        { label: 'T (pada mobil)', direction: 'Sejajar bidang ke bawah (sudut θ di bawah +x)', magnitude: '14,7 N' },
        { label: 'N', direction: 'Tegak lurus bidang miring', magnitude: '31,1 N' },
      ],
      persamaanFisikaLatex: 'v = \\sqrt{g r \\left(\\tan\\theta + \\frac{M}{m\\cos\\theta}\\right)}',
      persamaanPenjelasan: 'Ketika M = 0, rumus otomatis tereduksi kembali menjadi rumus Soal Nomor 7 asli: v = √(gr tan θ)!',
      penurunanPersamaan: [
        {
          stepTitle: 'Kesetimbangan Beban dan Dinamika Mobil',
          explanation: 'Dari beban M diam: T = Mg. Terapkan Hukum Newton pada mobil di sumbu-y dan sumbu-x.',
          latex: 'N\\cos\\theta - T\\sin\\theta = mg, \\qquad N\\sin\\theta + T\\cos\\theta = m\\frac{v^2}{r}',
        },
        {
          stepTitle: 'Eliminasi Gaya Normal N',
          explanation: 'Substitusikan N = (mg + T sin θ) / cos θ ke persamaan horizontal.',
          latex: '(mg + T\\sin\\theta)\\tan\\theta + T\\cos\\theta = m\\frac{v^2}{r} \\implies mg\\tan\\theta + \\frac{T(\\sin^2\\theta + \\cos^2\\theta)}{\\cos\\theta} = m\\frac{v^2}{r}',
        },
        {
          stepTitle: 'Masukkan T = Mg dan Selesaikan v',
          explanation: 'Bagi kedua ruas dengan m dan kalikan dengan r.',
          latex: 'v^2 = g r\\left(\\tan\\theta + \\frac{M}{m\\cos\\theta}\\right) \\implies v = \\sqrt{g r\\left(\\tan\\theta + \\frac{M}{m\\cos\\theta}\\right)}',
        },
      ],
      substitusiDataLatex: 'v = \\sqrt{9{,}8 \\times 4{,}0\\left(\\tan 30^\\circ + \\frac{1{,}5}{2{,}0\\cos 30^\\circ}\\right)}',
      perhitunganLangkah: [
        { label: 'Sederhanakan suku trigonometri', latex: '\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}, \\quad \\frac{1{,}5}{2{,}0 \\cdot \\frac{\\sqrt{3}}{2}} = \\frac{1{,}5}{\\sqrt{3}}' },
        { label: 'Jumlahkan kedua suku', latex: '\\frac{1 + 1{,}5}{\\sqrt{3}} = \\frac{2{,}5}{\\sqrt{3}} = 1{,}4433757' },
        { label: 'Hitung v', latex: 'v = \\sqrt{39{,}2 \\times 1{,}4433757} = \\sqrt{56{,}58033} = 7{,}5220\\text{ m/s}' },
      ],
      hasilAkhirNilai: '7,5',
      hasilAkhirSatuan: 'm/s',
      interpretasi:
        'Perhatikan bahwa T/cos θ adalah faktor tambahan yang indah! Jika sudut bidang θ = 0° (meja datar), rumus langsung menjadi v = √(M g r / m), persis seperti percobaan klasik sentripetal dengan beban gantung!',
      strategiOlimpiade:
        'Lakukan uji kasus batas dua arah setelah menurunkan rumus: (1) M = 0 harus kembali ke √(gr tan θ) (Soal 7), dan (2) θ = 0° harus kembali ke √(Mgr/m). Jika kedua batas benar, penurunan Anda hampir pasti 100% bebas salah aljabar!',
    },
    relatedKnowledgeLevel: 5,
    animationSummary: 'Animasi memperlihatkan beban M diam seimbang sementara mobil berputar pada radius 4,0 m dengan laju 7,5 m/s terikat tegangan tali.',
    narratorScripts: {
      stimulus: 'Diagram memperlihatkan sistem terkopel: mobil uji di bidang miring licin 30 derajat terhubung tali melalui lubang pusat ke beban gantung M bermassa 1 koma 5 kilogram.',
      soal: 'Soal 15. Mobil uji bermassa 2 koma 0 kilogram mengitari bidang miring licin bersudut 30 derajat pada jari-jari 4 koma 0 meter dan terikat tali ke beban gantung 1 koma 5 kilogram. Hitung kelajuan mobil agar beban gantung tetap diam dalam meter per sekon.',
      diagram: 'Pada beban gantung, tegangan tali T sama dengan M g. Pada mobil, tegangan tali T menarik sejajar bidang ke bawah dan bekerja bersama gaya normal N.',
      pembahasan: 'Dengan mengeliminasi gaya normal N menggunakan identitas sinus kuadrat tambah kosinus kuadrat sama dengan satu, diperoleh v sama dengan akar g r dikali tangen teta ditambah M per m kosinus teta. Hasil perhitungannya adalah 7 koma 5 meter per sekon.',
    },
  },
];

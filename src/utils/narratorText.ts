/**
 * Converts mathematical notation and physics symbols into clear, natural Indonesian spoken text
 * for Web Speech API (SpeechSynthesis). Never reads raw LaTeX.
 */
export function sanitizeForIndonesianSpeech(raw: string): string {
  let text = raw;

  // Strip KaTeX delimiters if any slipped in
  text = text.replace(/\$\$/g, ' ').replace(/\$/g, ' ');

  // Common composite physics expressions
  text = text
    .replace(/ΣF_x/g, 'resultan gaya pada sumbu x')
    .replace(/ΣF_y/g, 'resultan gaya pada sumbu y')
    .replace(/ΣF/g, 'resultan gaya')
    .replace(/Στ/g, 'resultan momen gaya')
    .replace(/v_maks/g, 'kecepatan maksimum')
    .replace(/v_min/g, 'kecepatan minimum')
    .replace(/v_guling/g, 'kecepatan kritis terguling')
    .replace(/v_0/g, 'kecepatan ideal')
    .replace(/h_maks/g, 'tinggi pusat massa maksimum')
    .replace(/f_s/g, 'gaya gesek statis')
    .replace(/μ_s/g, 'koefisien gesek statis')
    .replace(/a_s/g, 'percepatan sentripetal')
    .replace(/a_t/g, 'percepatan tangensial')
    .replace(/F_s/g, 'gaya sentripetal')
    .replace(/m\/s²|m\/s\^2/g, 'meter per sekon kuadrat')
    .replace(/m\/s/g, 'meter per sekon')
    .replace(/km\/jam/g, 'kilometer per jam')
    .replace(/rad\/s/g, 'radian per sekon')
    .replace(/m\^-1/g, 'per meter')
    .replace(/kN/g, 'kilonewton')
    .replace(/(\d+),(\d+)/g, '$1 koma $2')
    .replace(/(\d+)°/g, '$1 derajat')
    .replace(/θ/g, 'sudut teta')
    .replace(/φ/g, 'sudut fi')
    .replace(/α/g, 'sudut alfa')
    .replace(/ω/g, 'kecepatan sudut omega')
    .replace(/μ/g, 'koefisien gesek miu')
    .replace(/τ/g, 'torka')
    .replace(/π/g, 'pi')
    .replace(/Δ/g, 'delta')
    .replace(/√/g, 'akar kuadrat dari ')
    .replace(/×/g, ' kali ')
    .replace(/÷/g, ' dibagi ')
    .replace(/≤/g, ' kurang dari atau sama dengan ')
    .replace(/≥/g, ' lebih dari atau sama dengan ')
    .replace(/=/g, ' sama dengan ')
    .replace(/\bv\b/g, 'kecepatan v')
    .replace(/\ba\b/g, 'percepatan a')
    .replace(/\br\b/g, 'jari-jari r')
    .replace(/\bg\b/g, 'percepatan gravitasi g');

  return text.replace(/\s+/g, ' ').trim();
}

export type NarratorStatus = 'idle' | 'speaking' | 'paused';

export interface NarratorController {
  isSupported: boolean;
  speak: (text: string, label?: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export function pickIndonesianVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const idExact = voices.find((v) => v.lang.toLowerCase() === 'id-id');
  if (idExact) return idExact;
  const idPartial = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
  if (idPartial) return idPartial;
  return voices[0];
}

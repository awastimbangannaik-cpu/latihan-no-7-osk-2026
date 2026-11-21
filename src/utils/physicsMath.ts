const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export function toRadians(deg: number): number {
  return deg * DEG_TO_RAD;
}

export function toDegrees(rad: number): number {
  return rad * RAD_TO_DEG;
}

/**
 * Standard mathematical rounding to 1 decimal place (half away from zero).
 */
export function roundTo1Decimal(value: number): number {
  if (!Number.isFinite(value)) return NaN;
  const sign = value < 0 ? -1 : 1;
  const abs = Math.abs(value);
  const rounded = Math.round((abs + 1e-12) * 10) / 10;
  return sign * rounded === 0 ? 0 : sign * rounded;
}

/**
 * Format number with comma as decimal separator and exact 1 decimal place.
 */
export function formatCommaDecimal(value: number): string {
  const rounded = roundTo1Decimal(value);
  if (!Number.isFinite(rounded)) return '0,0';
  return rounded.toFixed(1).replace('.', ',');
}

/**
 * Parse student numeric input accepting both comma and dot decimal separators.
 * Returns null if invalid or empty.
 */
export function parseNumericInput(raw: string): number | null {
  const cleaned = raw.trim().replace(/\s+/g, '').replace(',', '.');
  if (!cleaned) return null;
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(cleaned)) {
    return null;
  }
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

/**
 * Normalize and validate a student's short numeric answer against the exact physics answer.
 */
export function checkNumericAnswer(
  userInput: string,
  exactPhysicsValue: number
): {
  valid: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
  expectedRounded: number;
  expectedFormatted: string;
} {
  const expectedRounded = roundTo1Decimal(exactPhysicsValue);
  const expectedFormatted = formatCommaDecimal(expectedRounded);
  const parsedValue = parseNumericInput(userInput);

  if (parsedValue === null) {
    return {
      valid: false,
      isCorrect: false,
      parsedValue: null,
      expectedRounded,
      expectedFormatted,
    };
  }

  // Compare after rounding student's numeric input to 1 decimal place (accept exact 1-decimal match)
  const userRounded = roundTo1Decimal(parsedValue);
  const isCorrect = Math.abs(userRounded - expectedRounded) < 1e-9;

  return {
    valid: true,
    isCorrect,
    parsedValue,
    expectedRounded,
    expectedFormatted,
  };
}

/**
 * Exact full-precision physics solvers for Soal Nomor 7 (baseline) and Soal 1..15.
 * Never round intermediate steps; return exact floating-point result.
 */
export function solveSoal7Original(
  thetaDeg = 20,
  r = 50,
  g = 9.8
): number {
  return Math.sqrt(g * r * Math.tan(toRadians(thetaDeg)));
}

export function solveQuestionExact(questionId: number): number {
  switch (questionId) {
    case 1: {
      // N = m * g / cos(theta) in kN; m = 1200 kg, theta = 30 deg, g = 9.8
      const m = 1200;
      const g = 9.8;
      const theta = toRadians(30);
      return (m * g) / Math.cos(theta) / 1000;
    }
    case 2: {
      // Fs = m * g * tan(theta) in kN; m = 900 kg, theta = 25 deg, g = 9.8
      const m = 900;
      const g = 9.8;
      const theta = toRadians(25);
      return (m * g * Math.tan(theta)) / 1000;
    }
    case 3: {
      // Ideal banked curve speed v = sqrt(g * r * tan(theta)); theta = 20 deg, r = 60 m, g = 9.8
      const g = 9.8;
      const r = 60;
      const theta = toRadians(20);
      return Math.sqrt(g * r * Math.tan(theta));
    }
    case 4: {
      // Bank angle theta in degrees; v = 72 km/h = 20 m/s, r = 120 m, g = 9.8
      const v = 72 / 3.6;
      const r = 120;
      const g = 9.8;
      return toDegrees(Math.atan((v * v) / (g * r)));
    }
    case 5: {
      // Static friction force when v > v0 in kN; m = 1000 kg, theta = 15 deg, r = 50 m, v = 18 m/s, g = 9.8
      const m = 1000;
      const theta = toRadians(15);
      const r = 50;
      const v = 18;
      const g = 9.8;
      return (m * ((v * v) / r * Math.cos(theta) - g * Math.sin(theta))) / 1000;
    }
    case 6: {
      // Normal force when v < v0 in kN; m = 1200 kg, theta = 30 deg, r = 80 m, v = 12 m/s, g = 9.8
      const m = 1200;
      const theta = toRadians(30);
      const r = 80;
      const v = 12;
      const g = 9.8;
      return (m * (g * Math.cos(theta) + ((v * v) / r) * Math.sin(theta))) / 1000;
    }
    case 7: {
      // Max speed without skidding outward; theta = 20 deg, r = 50 m, mu_s = 0.40, g = 9.8
      const theta = toRadians(20);
      const r = 50;
      const mu = 0.4;
      const g = 9.8;
      const tanT = Math.tan(theta);
      return Math.sqrt(g * r * ((tanT + mu) / (1 - mu * tanT)));
    }
    case 8: {
      // Min speed on steep velodrome; theta = 40 deg, r = 45 m, mu_s = 0.30, g = 9.8
      const theta = toRadians(40);
      const r = 45;
      const mu = 0.3;
      const g = 9.8;
      const tanT = Math.tan(theta);
      return Math.sqrt(g * r * ((tanT - mu) / (1 + mu * tanT)));
    }
    case 9: {
      // Radius on smooth cone/banked wall with tan(37 deg) = 0.75 and T = 4.0 s, g = 9.8
      const g = 9.8;
      const T = 4.0;
      const tanTheta = 0.75;
      return (g * T * T * tanTheta) / (4 * Math.PI * Math.PI);
    }
    case 10: {
      // Critical rollover speed on banked turn: d = 1.6 m, h = 0.80 m, theta = 20 deg, r = 50 m, g = 9.8
      const d = 1.6;
      const h = 0.8;
      const theta = toRadians(20);
      const r = 50;
      const g = 9.8;
      const ratio = d / (2 * h);
      const tanT = Math.tan(theta);
      return Math.sqrt(g * r * ((tanT + ratio) / (1 - ratio * tanT)));
    }
    case 11: {
      // Pendulum angle relative to cabin normal; theta = 20 deg, r = 50 m, v = 18.0 m/s, g = 9.8
      const thetaDeg = 20;
      const r = 50;
      const v = 18.0;
      const g = 9.8;
      const phiDeg = toDegrees(Math.atan((v * v) / (g * r)));
      return phiDeg - thetaDeg;
    }
    case 12: {
      // Time to reach skid limit with tangential acceleration; v0 = 8.0, a_t = 2.0, r = 50, theta = 20, mu = 0.40, g = 9.8
      const v0 = 8.0;
      const at = 2.0;
      const r = 50;
      const theta = toRadians(20);
      const mu = 0.4;
      const g = 9.8;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const gSin = g * sinT;
      const gCos = g * cosT;
      const mu2 = mu * mu;

      const A = cosT * cosT - mu2 * sinT * sinT;
      const B = -2 * gSin * cosT - 2 * mu2 * gCos * sinT;
      const C = gSin * gSin + at * at - mu2 * gCos * gCos;
      const disc = B * B - 4 * A * C;
      const uCrit = (-B + Math.sqrt(disc)) / (2 * A);
      const vCrit = Math.sqrt(uCrit * r);
      return (vCrit - v0) / at;
    }
    case 13: {
      // Parabolic banked track y = k x^2; k = 0.010 m^-1, r = 30 m, g = 9.8
      const k = 0.01;
      const r = 30;
      const g = 9.8;
      return r * Math.sqrt(2 * g * k);
    }
    case 14: {
      // Max CM height so car slips before tipping: d = 1.8 m, mu_s = 0.65
      const d = 1.8;
      const mu = 0.65;
      return d / (2 * mu);
    }
    case 15: {
      // Car on frictionless banked incline coupled by cord through central hole to hanging mass M:
      // m = 2.0 kg, M = 1.5 kg, theta = 30 deg, r = 4.0 m, g = 9.8
      const m = 2.0;
      const M = 1.5;
      const theta = toRadians(30);
      const r = 4.0;
      const g = 9.8;
      return Math.sqrt(g * r * (Math.tan(theta) + M / (m * Math.cos(theta))));
    }
    default:
      return 0;
  }
}

export interface SimulationFrame {
  phaseIndex: number; // 0..5 corresponding to the 6 animation stages
  phaseTitle: string;
  phaseDescription: string;
  angleDeg: number;
  radiusM: number;
  speedMs: number;
  idealSpeedMs: number;
  normalForceN: number;
  weightN: number;
  frictionN: number;
  frictionDirection: 'none' | 'down-slope' | 'up-slope';
  centripetalAccel: number;
  tensionN: number;
  orbitalAngleRad: number;
  radialOffsetNorm: number; // -1..1 visual displacement along slope when unbalanced
  tiltAngleDeg: number; // body roll angle if approaching rollover
  pendulumAngleDeg: number; // for Q11
  timeSec: number;
}

/**
 * Compute physically consistent simulation frame at normalized progress p in [0, 1].
 */
export function computeSimulationFrame(
  questionId: number,
  progress: number,
  speedMultiplier = 1
): SimulationFrame {
  const p = Math.max(0, Math.min(1, progress));
  const g = 9.8;

  // Stage mapping across [0, 1]
  const phaseIndex =
    p < 0.14 ? 0 : p < 0.34 ? 1 : p < 0.56 ? 2 : p < 0.76 ? 3 : p < 0.92 ? 4 : 5;

  const phaseTitles = [
    '1. Kondisi Awal Sistem',
    '2. Proses Berlangsung',
    '3. Perubahan Besaran Fisika',
    '4. Interaksi Gaya & Vektor',
    '5. Kondisi Akhir Kesetimbangan',
    '6. Hukum Fisika yang Bekerja',
  ];

  // Defaults per question
  let thetaDeg = 20;
  let r = 50;
  let m = 1000;
  let baseSpeed = solveSoal7Original(20, 50, g);
  let frictionN = 0;
  let frictionDirection: 'none' | 'down-slope' | 'up-slope' = 'none';
  let tensionN = 0;
  let tiltAngleDeg = 0;
  let pendulumAngleDeg = 0;
  let radialOffsetNorm = 0;
  let timeSec = p * 8;

  switch (questionId) {
    case 1:
      thetaDeg = 30;
      r = 50;
      m = 1200;
      baseSpeed = solveSoal7Original(30, 50, g);
      break;
    case 2:
      thetaDeg = 25;
      r = 50;
      m = 900;
      baseSpeed = solveSoal7Original(25, 50, g);
      break;
    case 3:
      thetaDeg = 20;
      r = 60;
      m = 1500;
      baseSpeed = solveQuestionExact(3);
      break;
    case 4:
      thetaDeg = solveQuestionExact(4);
      r = 120;
      m = 1200;
      baseSpeed = 20;
      break;
    case 5: {
      thetaDeg = 15;
      r = 50;
      m = 1000;
      baseSpeed = 18;
      const th = toRadians(thetaDeg);
      frictionN = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
      frictionDirection = 'down-slope';
      break;
    }
    case 6: {
      thetaDeg = 30;
      r = 80;
      m = 1200;
      baseSpeed = 12;
      const th = toRadians(thetaDeg);
      frictionN = m * (g * Math.sin(th) - ((baseSpeed * baseSpeed) / r) * Math.cos(th));
      frictionDirection = 'up-slope';
      break;
    }
    case 7: {
      thetaDeg = 20;
      r = 50;
      m = 1000;
      const vMax = solveQuestionExact(7);
      // Animate ramping up to v_maks
      baseSpeed = 10 + (vMax - 10) * Math.min(1, p / 0.85);
      const th = toRadians(thetaDeg);
      const v0 = solveSoal7Original(thetaDeg, r, g);
      if (baseSpeed >= v0) {
        frictionN = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
        frictionDirection = 'down-slope';
      } else {
        frictionN = m * (g * Math.sin(th) - ((baseSpeed * baseSpeed) / r) * Math.cos(th));
        frictionDirection = 'up-slope';
      }
      radialOffsetNorm = p > 0.85 ? (p - 0.85) * 1.5 : 0;
      break;
    }
    case 8: {
      thetaDeg = 40;
      r = 45;
      m = 1000;
      const vMin = solveQuestionExact(8);
      baseSpeed = 24 - (24 - vMin) * Math.min(1, p / 0.85);
      const th = toRadians(thetaDeg);
      const v0 = solveSoal7Original(thetaDeg, r, g);
      if (baseSpeed < v0) {
        frictionN = m * (g * Math.sin(th) - ((baseSpeed * baseSpeed) / r) * Math.cos(th));
        frictionDirection = 'up-slope';
      } else {
        frictionN = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
        frictionDirection = 'down-slope';
      }
      radialOffsetNorm = p > 0.85 ? -(p - 0.85) * 1.5 : 0;
      break;
    }
    case 9: {
      thetaDeg = 37;
      r = solveQuestionExact(9);
      m = 1;
      baseSpeed = (2 * Math.PI * r) / 4.0;
      timeSec = p * 4.0;
      break;
    }
    case 10: {
      thetaDeg = 20;
      r = 50;
      m = 1000;
      const vRoll = solveQuestionExact(10);
      baseSpeed = 13.4 + (vRoll - 13.4) * Math.min(1, p / 0.85);
      const th = toRadians(thetaDeg);
      frictionN = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
      frictionDirection = 'down-slope';
      tiltAngleDeg = Math.max(0, ((baseSpeed - 22) / (vRoll - 22)) * 8);
      break;
    }
    case 11: {
      thetaDeg = 20;
      r = 50;
      m = 1000;
      baseSpeed = 18.0;
      const phi = toDegrees(Math.atan((baseSpeed * baseSpeed) / (g * r)));
      pendulumAngleDeg = (phi - thetaDeg) * Math.min(1, p / 0.65);
      break;
    }
    case 12: {
      thetaDeg = 20;
      r = 50;
      m = 1000;
      const tCrit = solveQuestionExact(12);
      timeSec = p * tCrit;
      baseSpeed = 8.0 + 2.0 * timeSec;
      const th = toRadians(thetaDeg);
      const fPar = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
      const fTan = m * 2.0;
      frictionN = Math.sqrt(fPar * fPar + fTan * fTan);
      frictionDirection = fPar >= 0 ? 'down-slope' : 'up-slope';
      break;
    }
    case 13: {
      const k = 0.01;
      r = 15 + 15 * Math.min(1, p / 0.75);
      thetaDeg = toDegrees(Math.atan(2 * k * r));
      m = 1000;
      baseSpeed = r * Math.sqrt(2 * g * k);
      break;
    }
    case 14: {
      thetaDeg = 20;
      r = 50;
      m = 1000;
      const vSlip = Math.sqrt(g * r * ((Math.tan(toRadians(20)) + 0.65) / (1 - 0.65 * Math.tan(toRadians(20)))));
      baseSpeed = 13.4 + (vSlip - 13.4) * Math.min(1, p / 0.85);
      const th = toRadians(thetaDeg);
      frictionN = m * ((baseSpeed * baseSpeed) / r * Math.cos(th) - g * Math.sin(th));
      frictionDirection = 'down-slope';
      radialOffsetNorm = p > 0.85 ? (p - 0.85) * 1.4 : 0;
      break;
    }
    case 15: {
      thetaDeg = 30;
      r = 4.0;
      m = 2.0;
      const M = 1.5;
      baseSpeed = solveQuestionExact(15);
      tensionN = M * g;
      break;
    }
  }

  const speed = baseSpeed * speedMultiplier;
  const thRad = toRadians(thetaDeg);
  const idealSpeedMs = solveSoal7Original(thetaDeg, r, g);
  const ac = (speed * speed) / r;
  const weightN = m * g;
  const normalForceN =
    questionId === 15
      ? (m * g + tensionN * Math.sin(thRad)) / Math.cos(thRad)
      : m * (g * Math.cos(thRad) + ac * Math.sin(thRad));

  if (speedMultiplier !== 1 && questionId !== 15 && questionId !== 12) {
    const fSigned = m * (ac * Math.cos(thRad) - g * Math.sin(thRad));
    frictionN = Math.abs(fSigned);
    frictionDirection = Math.abs(fSigned) < 1e-3 ? 'none' : fSigned > 0 ? 'down-slope' : 'up-slope';
  }

  const phaseDescriptions: Record<number, string> = {
    0: `Sistem berada pada kemiringan θ = ${thetaDeg.toFixed(1)}° dengan jari-jari lintasan r = ${r.toFixed(1)} m.`,
    1: `Mobil bergerak melingkar horizontal dengan laju v = ${speed.toFixed(1)} m/s menuju kelengkungan pusat di kanan.`,
    2: `Percepatan sentripetal a_s = v²/r = ${ac.toFixed(2)} m/s² mengarah horizontal ke sumbu pusat putaran.`,
    3: `Gaya normal N = ${(normalForceN / 1000 >= 1 ? (normalForceN / 1000).toFixed(2) + ' kN' : normalForceN.toFixed(1) + ' N')} bekerja tegak lurus jalan bersama berat W.`,
    4: `Resultan komponen horizontal memenuhi ΣF_x = m·v²/r dan komponen vertikal memenuhi ΣF_y = 0.`,
    5: `Hukum II Newton pada gerak melingkar terbukti menjaga lintasan horizontal berjari-jari r = ${r.toFixed(1)} m.`,
  };

  return {
    phaseIndex,
    phaseTitle: phaseTitles[phaseIndex],
    phaseDescription: phaseDescriptions[phaseIndex],
    angleDeg: thetaDeg,
    radiusM: r,
    speedMs: speed,
    idealSpeedMs,
    normalForceN,
    weightN,
    frictionN,
    frictionDirection,
    centripetalAccel: ac,
    tensionN,
    orbitalAngleRad: p * Math.PI * 4,
    radialOffsetNorm,
    tiltAngleDeg,
    pendulumAngleDeg,
    timeSec,
  };
}

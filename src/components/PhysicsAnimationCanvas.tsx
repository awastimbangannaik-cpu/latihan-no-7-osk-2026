import React, { useEffect, useRef, useState } from 'react';
import { Gauge, Pause, Play, RotateCcw } from 'lucide-react';
import { computeSimulationFrame, SimulationFrame, toRadians } from '../utils/physicsMath';

interface PhysicsAnimationCanvasProps {
  questionId: number;
  questionTitle: string;
  allowSpeedExplorer?: boolean;
}

const PHASE_STEPS = [
  { index: 0, short: '1. Awal' },
  { index: 1, short: '2. Proses' },
  { index: 2, short: '3. Perubahan' },
  { index: 3, short: '4. Interaksi' },
  { index: 4, short: '5. Akhir' },
  { index: 5, short: '6. Hukum' },
];

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  label?: string,
  labelOffset: [number, number] = [6, -6]
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 3) return;
  const angle = Math.atan2(dy, dx);
  const headLen = Math.min(9, len * 0.35);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLen * Math.cos(angle - Math.PI / 6),
    y2 - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - headLen * Math.cos(angle + Math.PI / 6),
    y2 - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(label, x2 + labelOffset[0], y2 + labelOffset[1]);
  }
  ctx.restore();
}

export const PhysicsAnimationCanvas: React.FC<PhysicsAnimationCanvasProps> = ({
  questionId,
  questionTitle,
  allowSpeedExplorer = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [progress, setProgress] = useState(0.28);
  const progressRef = useRef(0.28);
  const lastTimeRef = useRef<number | null>(null);
  const [telemetry, setTelemetry] = useState<SimulationFrame>(() =>
    computeSimulationFrame(questionId, 0.28, 1)
  );

  // Reset on question change
  useEffect(() => {
    setIsPlaying(false);
    setSpeedMultiplier(1);
    progressRef.current = 0.25;
    setProgress(0.25);
    setTelemetry(computeSimulationFrame(questionId, 0.25, 1));
  }, [questionId]);

  // Update telemetry when paused and sliders move
  useEffect(() => {
    if (!isPlaying) {
      setTelemetry(computeSimulationFrame(questionId, progressRef.current, speedMultiplier));
    }
  }, [questionId, speedMultiplier, progress, isPlaying]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    let rafId = 0;
    let uiTick = 0;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      const rate = slowMotion ? 0.045 : 0.125;
      let next = progressRef.current + dt * rate;
      if (next >= 1) {
        next = 0;
      }
      progressRef.current = next;

      uiTick++;
      if (uiTick % 3 === 0) {
        setProgress(next);
        setTelemetry(computeSimulationFrame(questionId, next, speedMultiplier));
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, slowMotion, questionId, speedMultiplier]);

  // Canvas renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 760;
    const height = 340;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const frame = computeSimulationFrame(questionId, progress, speedMultiplier);

    // Background Cream White
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, width, height);

    // Subtle divider between Cross Section (left 465px) and Top-Down Orbit (right 295px)
    ctx.strokeStyle = '#E9DDD1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(465, 16);
    ctx.lineTo(465, height - 16);
    ctx.stroke();

    // Titles
    ctx.fillStyle = '#5B3828';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('TAMPILAN PENAMPANG GAYA & GERAK', 20, 26);
    ctx.fillText('LINTASAN MELINGKAR HORIZONTAL (ATAS)', 482, 26);

    // ==============================================
    // LEFT PANEL: CROSS-SECTIONAL DYNAMICS
    // ==============================================
    const thetaRad = toRadians(frame.angleDeg);
    const x1 = 55;
    const y1 = questionId === 15 ? 62 : 88;
    const x2 = questionId === 15 ? 360 : 400;
    const maxRise = Math.min(questionId === 15 ? 168 : 185, (x2 - x1) * Math.tan(thetaRad));
    const y2 = y1 + maxRise;

    // Ground base line
    ctx.strokeStyle = '#3B261E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(35, y2);
    ctx.lineTo(445, y2);
    ctx.stroke();

    // Draw parabolic or straight incline
    if (questionId === 13) {
      ctx.fillStyle = '#F4EEE7';
      ctx.beginPath();
      ctx.moveTo(45, 270);
      for (let sx = 45; sx <= 425; sx += 5) {
        const xNorm = (sx - 285) / 145;
        const py = 265 - xNorm * xNorm * 145;
        ctx.lineTo(sx, py);
      }
      ctx.lineTo(425, 270);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#5B3828';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let sx = 45; sx <= 425; sx += 5) {
        const xNorm = (sx - 285) / 145;
        const py = 265 - xNorm * xNorm * 145;
        if (sx === 45) ctx.moveTo(sx, py);
        else ctx.lineTo(sx, py);
      }
      ctx.stroke();
    } else {
      ctx.fillStyle = '#E9DDD1';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1, y2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#5B3828';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Angle label
      ctx.fillStyle = '#3B261E';
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      ctx.fillText(`θ = ${frame.angleDeg.toFixed(1)}°`, x2 - 72, y2 - 8);
    }

    // Center of curvature vertical reference on right
    const axisX = questionId === 13 ? 285 : questionId === 15 ? 360 : 428;
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#80563F';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(axisX, 42);
    ctx.lineTo(axisX, y2 + 12);
    ctx.stroke();
    ctx.restore();

    // Determine car position on slope
    let carX = 220 + frame.radialOffsetNorm * 35;
    let carY = y1 + ((carX - x1) / (x2 - x1)) * maxRise;
    let carTilt = frame.angleDeg + frame.tiltAngleDeg;

    if (questionId === 13) {
      const rNorm = frame.radiusM / 30;
      carX = 285 - rNorm * 115;
      const xNorm = (carX - 285) / 145;
      carY = 265 - xNorm * xNorm * 145;
      carTilt = frame.angleDeg;
    } else if (questionId === 15) {
      const holeX = x2;
      const holeY = y2;
      carX = 185;
      carY = y1 + ((carX - x1) / (x2 - x1)) * maxRise;

      // Draw hanging mass M under hole with safe clearance above bottom banner
      ctx.strokeStyle = '#0F766E';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(carX, carY - 8);
      ctx.lineTo(holeX, holeY);
      ctx.lineTo(holeX, holeY + 28);
      ctx.stroke();

      ctx.fillStyle = '#5B3828';
      ctx.fillRect(holeX - 14, holeY + 28, 28, 22);
      ctx.fillStyle = '#FFFDF9';
      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('M', holeX - 5, holeY + 43);
    }

    // Horizontal radius dashed line from CM to axis
    const cmX = carX + 18 * Math.sin(toRadians(carTilt));
    const cmY = carY - 18 * Math.cos(toRadians(carTilt));
    ctx.save();
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = '#C49A62';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cmX, cmY);
    ctx.lineTo(axisX, cmY);
    ctx.stroke();
    ctx.restore();

    // Draw Car body rotated
    ctx.save();
    ctx.translate(carX, carY);
    ctx.rotate(toRadians(carTilt));
    // Wheels
    ctx.fillStyle = '#3B261E';
    ctx.beginPath();
    ctx.arc(-20, -6, 6, 0, Math.PI * 2);
    ctx.arc(20, -6, 6, 0, Math.PI * 2);
    ctx.fill();
    // Chassis
    ctx.fillStyle = '#F3D6A4';
    ctx.strokeStyle = '#3B261E';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-32, -8);
    ctx.lineTo(-30, -20);
    ctx.lineTo(-17, -21);
    ctx.lineTo(-9, -34);
    ctx.lineTo(12, -34);
    ctx.lineTo(21, -20);
    ctx.lineTo(32, -18);
    ctx.lineTo(32, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cabin pendulum for Q11
    if (questionId === 11) {
      ctx.save();
      ctx.translate(0, -32);
      ctx.rotate(toRadians(frame.pendulumAngleDeg));
      ctx.strokeStyle = '#3B261E';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 15);
      ctx.stroke();
      ctx.fillStyle = '#C49A62';
      ctx.beginPath();
      ctx.arc(0, 15, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // CM point
    ctx.fillStyle = '#3B261E';
    ctx.beginPath();
    ctx.arc(0, -18, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Force Vectors (Visible from Phase 2 onward, full emphasis in Phase 3-5)
    const scaleFactor = 56 / Math.max(1, frame.weightN);
    const wLen = 56;
    const nLen = Math.min(92, Math.max(36, frame.normalForceN * scaleFactor));

    // W arrow
    drawArrow(ctx, cmX, cmY, cmX, cmY + wLen, '#5B3828', 'W', [-18, -2]);
    // N arrow
    const nx = cmX + nLen * Math.sin(thetaRad);
    const ny = cmY - nLen * Math.cos(thetaRad);
    drawArrow(ctx, cmX, cmY, nx, ny, '#0284C7', 'N', [6, -4]);

    // N projections in phases 3..5
    if (frame.phaseIndex >= 2) {
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#0284C7';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cmX, cmY);
      ctx.lineTo(cmX, ny);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.restore();
    }

    // Friction arrow if active
    if (frame.frictionDirection !== 'none' && frame.frictionN > 10) {
      const fLen = Math.min(58, Math.max(22, frame.frictionN * scaleFactor * 1.4));
      const dir = frame.frictionDirection === 'down-slope' ? 1 : -1;
      drawArrow(
        ctx,
        carX,
        carY - 3,
        carX + dir * fLen * Math.cos(thetaRad),
        carY - 3 + dir * fLen * Math.sin(thetaRad),
        '#B45309',
        'f_s',
        [dir > 0 ? 6 : -22, dir > 0 ? 12 : -8]
      );
    }

    // Centripetal acceleration vector
    if (frame.phaseIndex >= 2) {
      const acLen = Math.min(68, Math.max(24, frame.centripetalAccel * 5.2));
      drawArrow(ctx, cmX + 12, cmY + 8, cmX + 12 + acLen, cmY + 8, '#9F1239', 'a_s', [5, 4]);
    }

    // ==============================================
    // RIGHT PANEL: TOP-DOWN HORIZONTAL ORBITAL VIEW
    // ==============================================
    const orbitCx = 612;
    const orbitCy = 165;
    const orbitR = questionId === 13 ? 45 + (frame.radiusM / 30) * 40 : 84;

    // Road ring
    ctx.strokeStyle = '#E9DDD1';
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.arc(orbitCx, orbitCy, orbitR, 0, Math.PI * 2);
    ctx.stroke();

    // Dashed centerline
    ctx.save();
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#80563F';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(orbitCx, orbitCy, orbitR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Center dot
    ctx.fillStyle = '#3B261E';
    ctx.beginPath();
    ctx.arc(orbitCx, orbitCy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '600 10.5px "DM Sans", sans-serif';
    ctx.fillText('Pusat', orbitCx - 14, orbitCy + 16);

    // Moving car on orbit
    const ang = frame.orbitalAngleRad;
    const ox = orbitCx + orbitR * Math.cos(ang);
    const oy = orbitCy + orbitR * Math.sin(ang);

    // Radius line
    ctx.strokeStyle = '#C49A62';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(orbitCx, orbitCy);
    ctx.lineTo(ox, oy);
    ctx.stroke();

    // Tangent velocity vector
    const tx = -Math.sin(ang);
    const ty = Math.cos(ang);
    const vArrowLen = Math.min(44, Math.max(20, frame.speedMs * 1.5));
    drawArrow(ctx, ox, oy, ox + tx * vArrowLen, oy + ty * vArrowLen, '#5B3828', 'v', [5, 4]);

    // Centripetal vector inward
    const cxDir = -Math.cos(ang);
    const cyDir = -Math.sin(ang);
    drawArrow(ctx, ox, oy, ox + cxDir * 32, oy + cyDir * 32, '#9F1239', 'F_s', [4, -4]);

    // Car top-down rectangle
    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(ang + Math.PI / 2);
    ctx.fillStyle = '#F3D6A4';
    ctx.strokeStyle = '#3B261E';
    ctx.lineWidth = 1.6;
    ctx.fillRect(-12, -7, 24, 14);
    ctx.strokeRect(-12, -7, 24, 14);
    ctx.restore();

    // Bottom phase banner inside canvas
    ctx.fillStyle = '#F4EEE7';
    ctx.fillRect(16, height - 40, width - 32, 28);
    ctx.strokeStyle = '#E9DDD1';
    ctx.strokeRect(16, height - 40, width - 32, 28);
    ctx.fillStyle = '#3B261E';
    ctx.font = '600 11.5px "DM Sans", sans-serif';
    ctx.fillText(`${frame.phaseTitle}: ${frame.phaseDescription}`, 26, height - 22);
  }, [questionId, progress, speedMultiplier]);

  return (
    <div className="rounded-xl border border-[#E9DDD1] bg-[#FFFDF9] p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#80563F]">
            ANIMASI PEMBUKTIAN FENOMENA FISIKA · SOAL {questionId}
          </p>
          <h4 className="font-display text-base font-bold text-[#3B261E]">
            {questionTitle}
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5B3828] px-3.5 py-2 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#3B261E] whitespace-nowrap shrink-0"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              PLAY
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#80563F] px-3.5 py-2 text-xs font-semibold text-[#FFFDF9] transition-colors hover:bg-[#5B3828] whitespace-nowrap shrink-0"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              PAUSE
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setSpeedMultiplier(1);
              progressRef.current = 0;
              setProgress(0);
              setTelemetry(computeSimulationFrame(questionId, 0, 1));
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E9DDD1] bg-[#F4EEE7] px-3 py-2 text-xs font-semibold text-[#3B261E] transition-colors hover:bg-[#E9DDD1] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            RESET
          </button>

          <button
            type="button"
            aria-pressed={slowMotion}
            onClick={() => setSlowMotion((s) => !s)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              slowMotion
                ? 'border-[#C49A62] bg-[#C49A62]/20 text-[#3B261E]'
                : 'border-[#E9DDD1] bg-[#FFFDF9] text-[#5B3828] hover:bg-[#F4EEE7]'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" aria-hidden="true" />
            SLOW MOTION {slowMotion ? '(0,35x AKTIF)' : ''}
          </button>
        </div>
      </div>

      {/* Canvas Stage */}
      <div className="overflow-hidden rounded-lg border border-[#E9DDD1] bg-[#FFFDF9]">
        <canvas
          ref={canvasRef}
          data-testid="physics-canvas"
          data-anim-state={isPlaying ? 'playing' : 'paused'}
          data-progress={progress.toFixed(2)}
          className="h-auto w-full block"
          style={{ aspectRatio: '760 / 340' }}
        />
      </div>

      {/* 6-Stage Process Stepper */}
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-6">
        {PHASE_STEPS.map((st) => {
          const isCurrent = telemetry.phaseIndex === st.index;
          return (
            <button
              key={st.index}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                const targetP = Math.min(0.96, st.index * 0.17 + 0.04);
                progressRef.current = targetP;
                setProgress(targetP);
                setTelemetry(computeSimulationFrame(questionId, targetP, speedMultiplier));
              }}
              className={`rounded-lg px-2.5 py-1.5 text-left text-xs font-semibold transition-colors whitespace-nowrap truncate ${
                isCurrent
                  ? 'bg-[#5B3828] text-[#FFFDF9]'
                  : 'bg-[#F4EEE7] text-[#5B3828] hover:bg-[#E9DDD1]'
              }`}
            >
              {st.short}
            </button>
          );
        })}
      </div>

      {/* Live Physics Telemetry & Sandbox Explorer */}
      <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-[#E9DDD1] bg-[#F4EEE7]/65 p-3 sm:grid-cols-5">
        <div>
          <span className="block text-[11px] font-medium text-[#80563F]">Kelajuan v</span>
          <span className="font-mono-num text-sm font-bold text-[#3B261E]">
            {telemetry.speedMs.toFixed(1).replace('.', ',')} m/s
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[#80563F]">Gaya Normal N</span>
          <span className="font-mono-num text-sm font-bold text-[#0284C7]">
            {(telemetry.normalForceN >= 1000
              ? `${(telemetry.normalForceN / 1000).toFixed(2).replace('.', ',')} kN`
              : `${telemetry.normalForceN.toFixed(1).replace('.', ',')} N`)}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[#80563F]">Percepatan a_s</span>
          <span className="font-mono-num text-sm font-bold text-[#9F1239]">
            {telemetry.centripetalAccel.toFixed(2).replace('.', ',')} m/s²
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[#80563F]">Gaya Gesek f_s</span>
          <span className="font-mono-num text-sm font-bold text-[#B45309]">
            {telemetry.frictionDirection === 'none'
              ? '0,0 N (Ideal)'
              : `${(telemetry.frictionN / 1000).toFixed(2).replace('.', ',')} kN (${
                  telemetry.frictionDirection === 'down-slope' ? 'Turun' : 'Naik'
                })`}
          </span>
        </div>
        <div>
          <span className="block text-[11px] font-medium text-[#80563F]">Sudut & Radius</span>
          <span className="font-mono-num text-sm font-bold text-[#3B261E]">
            {telemetry.angleDeg.toFixed(1).replace('.', ',')}° · {telemetry.radiusM.toFixed(1).replace('.', ',')} m
          </span>
        </div>
      </div>

      {allowSpeedExplorer && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E9DDD1] bg-[#FFFDF9] px-3 py-2">
          <label
            htmlFor={`speed-slider-${questionId}`}
            className="text-xs font-semibold text-[#5B3828]"
          >
            Eksplorasi Pengali Laju Simulasi: <span className="font-mono-num">{speedMultiplier.toFixed(2).replace('.', ',')}x</span>
          </label>
          <input
            id={`speed-slider-${questionId}`}
            type="range"
            min="0.6"
            max="1.4"
            step="0.05"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
            className="h-2 w-48 accent-[#5B3828]"
          />
        </div>
      )}
    </div>
  );
};

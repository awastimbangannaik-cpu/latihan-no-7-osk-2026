import React from 'react';
import { QuestionData } from '../types/physics';

interface PhysicsStimulusProps {
  question: QuestionData;
  mode: 'stimulus' | 'fbd';
  overrideRadiusLabel?: string;
}

const COLORS = {
  cocoa: '#3B261E',
  swiss: '#5B3828',
  warm: '#80563F',
  gold: '#C49A62',
  cream: '#FFFDF9',
  milk: '#F4EEE7',
  beige: '#E9DDD1',
  road: '#D8C7B4',
  forceNormal: '#0284C7',
  forceWeight: '#5B3828',
  forceFriction: '#B45309',
  forceTension: '#0F766E',
  forceAccel: '#9F1239',
};

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

const ArrowDefs: React.FC = () => (
  <defs>
    <marker id="arr-cocoa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.cocoa} />
    </marker>
    <marker id="arr-normal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.forceNormal} />
    </marker>
    <marker id="arr-weight" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.forceWeight} />
    </marker>
    <marker id="arr-friction" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.forceFriction} />
    </marker>
    <marker id="arr-tension" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.forceTension} />
    </marker>
    <marker id="arr-accel" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,1 L7,4 L0,7 Z" fill={COLORS.forceAccel} />
    </marker>
  </defs>
);

const CarSilhouette: React.FC<{
  x: number;
  y: number;
  angleDeg: number;
  showRolloverDims?: boolean;
  showPendulum?: boolean;
  pendulumAngleDeg?: number;
}> = ({
  x,
  y,
  angleDeg,
  showRolloverDims = false,
  showPendulum = false,
  pendulumAngleDeg = 13.5,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${angleDeg})`}>
    {/* Wheels touching road at y = 0 */}
    <circle cx="-26" cy="-7" r="7" fill={COLORS.cocoa} />
    <circle cx="-26" cy="-7" r="3" fill={COLORS.beige} />
    <circle cx="26" cy="-7" r="7" fill={COLORS.cocoa} />
    <circle cx="26" cy="-7" r="3" fill={COLORS.beige} />

    {/* Car body */}
    <path
      d="M -40 -9 L -38 -25 L -22 -26 L -12 -42 L 15 -42 L 26 -25 L 40 -22 L 40 -9 Z"
      fill="#F3D6A4"
      stroke={COLORS.cocoa}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Windows */}
    <path
      d="M -18 -26 L -10 -39 L 13 -39 L 22 -26 Z"
      fill="#FFFDF9"
      stroke={COLORS.swiss}
      strokeWidth="1.4"
    />

    {/* Center of Mass marker */}
    <circle cx="0" cy="-22" r="3.5" fill={COLORS.cocoa} />
    <circle cx="0" cy="-22" r="1.5" fill={COLORS.gold} />

    {showRolloverDims && (
      <g>
        {/* Track width d */}
        <line x1="-26" y1="9" x2="26" y2="9" stroke={COLORS.swiss} strokeWidth="1.4" />
        <line x1="-26" y1="4" x2="-26" y2="14" stroke={COLORS.swiss} strokeWidth="1.4" />
        <line x1="26" y1="4" x2="26" y2="14" stroke={COLORS.swiss} strokeWidth="1.4" />
        <text x="0" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          d
        </text>
        {/* Height h */}
        <line x1="0" y1="0" x2="0" y2="-22" stroke={COLORS.warm} strokeWidth="1.4" strokeDasharray="3 2" />
        <text x="9" y="-11" fontSize="11" fontWeight="700" fill={COLORS.swiss}>
          h
        </text>
      </g>
    )}

    {showPendulum && (
      <g transform="translate(0, -39)">
        <line x1="0" y1="0" x2="0" y2="20" stroke={COLORS.warm} strokeWidth="1" strokeDasharray="2 2" />
        <g transform={`rotate(${pendulumAngleDeg})`}>
          <line x1="0" y1="0" x2="0" y2="18" stroke={COLORS.cocoa} strokeWidth="1.8" />
          <circle cx="0" cy="18" r="3.5" fill={COLORS.gold} stroke={COLORS.cocoa} strokeWidth="1.4" />
        </g>
      </g>
    )}
  </g>
);

export const PhysicsStimulus: React.FC<PhysicsStimulusProps> = ({
  question,
  mode,
  overrideRadiusLabel,
}) => {
  const isFbd = mode === 'fbd';

  // Special non-standard geometries
  if (question.id === 9 && !isFbd) {
    // Funnel + v^2 vs r graph
    return (
      <svg
        viewBox="0 0 560 250"
        className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
        role="img"
        aria-label={question.stimulusCaption}
      >
        <ArrowDefs />
        {/* Left: Funnel cross-section */}
        <g transform="translate(15, 10)">
          <text x="115" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill={COLORS.cocoa}>
            Lintasan Corong Miring (θ = 37°)
          </text>
          <line x1="115" y1="30" x2="115" y2="215" stroke={COLORS.warm} strokeWidth="1.3" strokeDasharray="4 3" />
          <path d="M 35 60 L 115 200 L 195 60" fill="none" stroke={COLORS.swiss} strokeWidth="3" />
          <path d="M 35 60 L 115 200 L 195 60 L 195 210 L 35 210 Z" fill={COLORS.milk} opacity="0.6" />
          {/* Horizontal orbit */}
          <ellipse cx="115" cy="110" rx="51" ry="11" fill="none" stroke={COLORS.gold} strokeWidth="2" strokeDasharray="5 3" />
          <circle cx="64" cy="110" r="6" fill={COLORS.swiss} stroke={COLORS.cream} strokeWidth="1.5" />
          {/* Radius arrow */}
          <line x1="115" y1="110" x2="72" y2="110" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
          <text x="92" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
            r
          </text>
          {/* Angle indicator */}
          <line x1="115" y1="200" x2="180" y2="200" stroke={COLORS.cocoa} strokeWidth="1.4" />
          <path d="M 142 200 A 27 27 0 0 0 130 174" fill="none" stroke={COLORS.swiss} strokeWidth="1.5" />
          <text x="155" y="190" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
            θ = 37°
          </text>
        </g>

        {/* Right: Graph v^2 vs r */}
        <g transform="translate(275, 18)">
          <text x="130" y="8" textAnchor="middle" fontSize="12" fontWeight="700" fill={COLORS.cocoa}>
            Grafik Hubungan v² terhadap r
          </text>
          {/* Grid */}
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="40" y1={y} x2="245" y2={y} stroke={COLORS.beige} strokeWidth="1" />
          ))}
          {[90, 140, 190, 240].map((x) => (
            <line key={x} x1={x} y1="30" x2={x} y2="195" stroke={COLORS.beige} strokeWidth="1" />
          ))}
          {/* Axes */}
          <line x1="40" y1="195" x2="250" y2="195" stroke={COLORS.cocoa} strokeWidth="1.8" markerEnd="url(#arr-cocoa)" />
          <line x1="40" y1="195" x2="40" y2="25" stroke={COLORS.cocoa} strokeWidth="1.8" markerEnd="url(#arr-cocoa)" />
          {/* Linear curve v^2 = (g tan 37) r */}
          <line x1="40" y1="195" x2="232" y2="43" stroke={COLORS.forceNormal} strokeWidth="2.6" />
          <circle cx="136" cy="119" r="4" fill={COLORS.gold} stroke={COLORS.cocoa} strokeWidth="1.5" />
          <text x="150" y="114" fontSize="11" fontWeight="600" fill={COLORS.swiss}>
            gradien = g tan θ
          </text>
          <text x="242" y="212" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
            r (m)
          </text>
          <text x="12" y="34" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
            v²
          </text>
          <text x="2" y="47" fontSize="9.5" fill={COLORS.warm}>
            (m²/s²)
          </text>
          <text x="32" y="208" fontSize="10" fill={COLORS.warm}>
            0
          </text>
        </g>
      </svg>
    );
  }

  if (question.id === 13) {
    // Parabolic track y = k x^2
    const pts: string[] = [];
    for (let px = -120; px <= 120; px += 8) {
      const xWorld = (px / 120) * 40;
      const yWorld = 0.01 * xWorld * xWorld; // up to 16 m
      const sy = 195 - yWorld * 9;
      pts.push(`${260 + px},${sy.toFixed(1)}`);
    }
    const carX = 260 - 90; // r = 30 m on left side (center on right at x=260)
    const carY = 195 - 0.01 * 900 * 9; // y = 9 m -> 195 - 81 = 114
    const slopeDeg = -Math.atan(2 * 0.01 * 30) * (180 / Math.PI); // descends toward center at right: +30.96 deg in SVG
    const angleSvg = -slopeDeg;

    return (
      <svg
        viewBox="0 0 560 250"
        className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
        role="img"
        aria-label={question.stimulusCaption}
      >
        <ArrowDefs />
        <text x="280" y="22" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={COLORS.cocoa}>
          Penampang Lintasan Parabolik y = k x² (k = 0,010 m⁻¹)
        </text>
        {/* Symmetry axis */}
        <line x1="260" y1="35" x2="260" y2="215" stroke={COLORS.warm} strokeWidth="1.4" strokeDasharray="5 3" />
        <text x="268" y="48" fontSize="11" fontWeight="600" fill={COLORS.warm}>
          Sumbu Simetri (x = 0)
        </text>
        {/* Ground x-axis */}
        <line x1="70" y1="195" x2="465" y2="195" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
        <text x="472" y="199" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          x (m)
        </text>

        {/* Parabolic fill */}
        <polyline
          points={`140,195 ${pts.join(' ')} 380,195`}
          fill={COLORS.milk}
          stroke="none"
        />
        <polyline points={pts.join(' ')} fill="none" stroke={COLORS.swiss} strokeWidth="3" />

        {/* Radius marker */}
        <line x1="170" y1="114" x2="260" y2="114" stroke={COLORS.gold} strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="215" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill={COLORS.swiss}>
          r = 30 m
        </text>

        <CarSilhouette x={carX} y={carY} angleDeg={angleSvg} />

        {/* Tangent slope indicator */}
        <line x1={carX - 35} y1={carY - 21} x2={carX + 35} y2={carY + 21} stroke={COLORS.gold} strokeWidth="1.5" strokeDasharray="3 2" />

        {isFbd && (
          <g>
            {/* W down */}
            <line x1={carX} y1={carY - 12} x2={carX} y2={carY + 55} stroke={COLORS.forceWeight} strokeWidth="2.4" markerEnd="url(#arr-weight)" />
            <text x={carX - 18} y={carY + 52} fontSize="12" fontWeight="700" fill={COLORS.forceWeight}>
              W
            </text>
            {/* N normal to parabola (31 deg) */}
            <line
              x1={carX + 10}
              y1={carY - 18}
              x2={carX + 10 + 75 * Math.sin(degToRad(31))}
              y2={carY - 18 - 75 * Math.cos(degToRad(31))}
              stroke={COLORS.forceNormal}
              strokeWidth="2.4"
              markerEnd="url(#arr-normal)"
            />
            <text x={carX + 54} y={carY - 82} fontSize="12" fontWeight="700" fill={COLORS.forceNormal}>
              N
            </text>
          </g>
        )}

        <text x="410" y="75" fontSize="11" fill={COLORS.swiss} fontWeight="600">
          tan θ = dy/dx = 2kx
        </text>
      </svg>
    );
  }

  if (question.id === 15) {
    // Coupled hanging mass through central hole
    const theta = 30;
    const rad = degToRad(theta);
    const roadStart = { x: 80, y: 65 };
    const hole = { x: 320, y: 65 + (320 - 80) * Math.tan(rad) }; // (320, 203.6)
    const carPos = { x: 185, y: 65 + (185 - 80) * Math.tan(rad) };

    return (
      <svg
        viewBox="0 0 560 275"
        className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
        role="img"
        aria-label={question.stimulusCaption}
      >
        <ArrowDefs />
        {/* Cone walls */}
        <polygon
          points={`${roadStart.x},${roadStart.y} ${hole.x - 10},${hole.y} ${roadStart.x},${hole.y + 35}`}
          fill={COLORS.road}
          stroke={COLORS.swiss}
          strokeWidth="2"
        />
        <polygon
          points={`500,${roadStart.y} ${hole.x + 10},${hole.y} 500,${hole.y + 35}`}
          fill={COLORS.milk}
          stroke={COLORS.beige}
          strokeWidth="1.5"
        />
        {/* Horizontal dashed reference */}
        <line x1="185" y1={carPos.y} x2="320" y2={carPos.y} stroke={COLORS.gold} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="255" y={carPos.y - 7} textAnchor="middle" fontSize="11" fontWeight="700" fill={COLORS.swiss}>
          r = 4,0 m
        </text>
        {/* Angle */}
        <line x1={roadStart.x} y1={hole.y} x2={hole.x - 10} y2={hole.y} stroke={COLORS.cocoa} strokeWidth="1.2" strokeDasharray="3 3" />
        <text x={hole.x - 70} y={hole.y - 6} fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          θ = 30°
        </text>

        {/* Cord from car through central hole to M */}
        <line
          x1={carPos.x + 25 * Math.cos(rad)}
          y1={carPos.y + 25 * Math.sin(rad) - 10}
          x2={hole.x}
          y2={hole.y}
          stroke={COLORS.forceTension}
          strokeWidth="2.2"
        />
        <circle cx={hole.x} cy={hole.y} r="4.5" fill={COLORS.cream} stroke={COLORS.cocoa} strokeWidth="1.6" />
        <line x1={hole.x} y1={hole.y} x2={hole.x} y2={240} stroke={COLORS.forceTension} strokeWidth="2.2" />

        {/* Hanging mass M */}
        <rect x={hole.x - 18} y={232} width="36" height="28" rx="4" fill={COLORS.swiss} stroke={COLORS.cocoa} strokeWidth="1.8" />
        <text x={hole.x} y={250} textAnchor="middle" fontSize="11" fontWeight="700" fill={COLORS.cream}>
          M
        </text>
        <text x={hole.x + 26} y={248} fontSize="11" fontWeight="600" fill={COLORS.cocoa}>
          M = 1,5 kg (diam)
        </text>

        {/* Car m */}
        <CarSilhouette x={carPos.x} y={carPos.y} angleDeg={theta} />
        <text x={carPos.x - 42} y={carPos.y - 44} fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          m = 2,0 kg
        </text>

        {isFbd && (
          <g>
            {/* W on car */}
            <line x1={carPos.x} y1={carPos.y - 12} x2={carPos.x} y2={carPos.y + 42} stroke={COLORS.forceWeight} strokeWidth="2.3" markerEnd="url(#arr-weight)" />
            <text x={carPos.x - 18} y={carPos.y + 40} fontSize="11.5" fontWeight="700" fill={COLORS.forceWeight}>
              mg
            </text>
            {/* N normal */}
            <line
              x1={carPos.x + 8}
              y1={carPos.y - 18}
              x2={carPos.x + 8 + 68 * Math.sin(rad)}
              y2={carPos.y - 18 - 68 * Math.cos(rad)}
              stroke={COLORS.forceNormal}
              strokeWidth="2.3"
              markerEnd="url(#arr-normal)"
            />
            <text x={carPos.x + 48} y={carPos.y - 75} fontSize="11.5" fontWeight="700" fill={COLORS.forceNormal}>
              N
            </text>
            {/* T along incline */}
            <line
              x1={carPos.x + 12}
              y1={carPos.y - 10}
              x2={carPos.x + 12 + 52 * Math.cos(rad)}
              y2={carPos.y - 10 + 52 * Math.sin(rad)}
              stroke={COLORS.forceTension}
              strokeWidth="2.5"
              markerEnd="url(#arr-tension)"
            />
            <text x={carPos.x + 62} y={carPos.y + 18} fontSize="11.5" fontWeight="700" fill={COLORS.forceTension}>
              T = Mg
            </text>
          </g>
        )}
      </svg>
    );
  }

  // Standard banked-curve family (Q1..Q8, Q10..Q12, Q14)
  const angleByQ: Record<number, number> = {
    1: 30,
    2: 25,
    3: 20,
    4: 18.8,
    5: 15,
    6: 30,
    7: 20,
    8: 36, // visual clarity for steep 40 deg
    10: 20,
    11: 20,
    12: 20,
    14: 20,
  };
  const theta = angleByQ[question.id] ?? 20;
  const rad = degToRad(theta);

  // Ramp coordinates: descends from left (x=95, y=75) to right (x=415, y=baseY)
  const x1 = 95;
  const y1 = 80;
  const x2 = 415;
  const y2 = y1 + (x2 - x1) * Math.tan(rad);
  const carX = 240;
  const carY = y1 + (carX - x1) * Math.tan(rad);
  const cmX = carX + 22 * Math.sin(rad);
  const cmY = carY - 22 * Math.cos(rad);

  const labelAngle =
    question.id === 4 ? 'θ = ?' : question.id === 8 ? 'θ = 40°' : `θ = ${theta}°`;

  const hasFrictionDown = [5, 7, 10, 12, 14].includes(question.id);
  const hasFrictionUp = [6, 8].includes(question.id);

  return (
    <svg
      viewBox="0 0 560 265"
      className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
      role="img"
      aria-label={question.stimulusCaption}
    >
      <ArrowDefs />

      {/* Center of turn vertical reference on right */}
      <line x1="475" y1="35" x2="475" y2={y2 + 8} stroke={COLORS.warm} strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="475" y="26" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={COLORS.warm}>
        Sumbu Pusat Belokan
      </text>

      {/* Horizontal radius indicator */}
      <line x1={cmX} y1={cmY} x2="475" y2={cmY} stroke={COLORS.gold} strokeWidth="1.3" strokeDasharray="4 3" />
      <text x={(cmX + 475) / 2} y={cmY - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill={COLORS.swiss}>
        {overrideRadiusLabel
          ? overrideRadiusLabel
          : question.id === 1
          ? 'Lintasan horizontal (r)'
          : question.id === 2
          ? 'Arah pusat lingkaran'
          : question.id === 3
          ? 'r = 60 m'
          : question.id === 4
          ? 'r = 120 m · v = 72 km/jam'
          : question.id === 6
          ? 'r = 80 m · v = 12 m/s'
          : question.id === 8
          ? 'r = 45 m'
          : 'r = 50 m'}
      </text>

      {/* Inclined road wedge */}
      <polygon
        points={`${x1},${y1} ${x2},${y2} ${x1},${y2}`}
        fill={COLORS.road}
        stroke={COLORS.swiss}
        strokeWidth="2"
      />
      {/* Base extension */}
      <line x1="65" y1={y2} x2="495" y2={y2} stroke={COLORS.cocoa} strokeWidth="1.5" />

      {/* Angle arc at bottom-right of wedge */}
      <path
        d={`M ${x2 - 42} ${y2} A 42 42 0 0 1 ${x2 - 42 * Math.cos(rad)} ${y2 - 42 * Math.sin(rad)}`}
        fill="none"
        stroke={COLORS.cocoa}
        strokeWidth="1.5"
      />
      <text x={x2 - 78} y={y2 - 7} fontSize="11.5" fontWeight="700" fill={COLORS.cocoa}>
        {labelAngle}
      </text>

      {/* Coordinate axes (matching Soal 7 original diagram) */}
      <g transform="translate(385, 58)">
        <line x1="0" y1="0" x2="38" y2="0" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
        <line x1="0" y1="0" x2="0" y2="-34" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
        <text x="43" y="4" fontSize="11.5" fontWeight="700" fill={COLORS.cocoa}>
          x
        </text>
        <text x="-4" y="-39" fontSize="11.5" fontWeight="700" fill={COLORS.cocoa}>
          y
        </text>
      </g>

      {/* Car */}
      <CarSilhouette
        x={carX}
        y={carY}
        angleDeg={theta}
        showRolloverDims={question.id === 10 || question.id === 14}
        showPendulum={question.id === 11}
        pendulumAngleDeg={13.5}
      />

      {/* Stimulus-only minimal vectors (no leaked solutions) */}
      {!isFbd && (
        <g>
          {/* Weight W */}
          <line x1={cmX} y1={cmY} x2={cmX} y2={cmY + 55} stroke={COLORS.forceWeight} strokeWidth="2.1" markerEnd="url(#arr-weight)" />
          <text x={cmX - 18} y={cmY + 50} fontSize="12" fontWeight="700" fill={COLORS.forceWeight}>
            W
          </text>
          {/* Normal N */}
          <line
            x1={cmX}
            y1={cmY}
            x2={cmX + 68 * Math.sin(rad)}
            y2={cmY - 68 * Math.cos(rad)}
            stroke={COLORS.forceNormal}
            strokeWidth="2.1"
            markerEnd="url(#arr-normal)"
          />
          <text x={cmX + 74 * Math.sin(rad) + 4} y={cmY - 72 * Math.cos(rad)} fontSize="12" fontWeight="700" fill={COLORS.forceNormal}>
            N
          </text>
          {question.id === 12 && (
            <g transform="translate(20, 215)">
              <rect x="0" y="0" width="520" height="36" rx="6" fill={COLORS.milk} stroke={COLORS.beige} />
              <text x="14" y="22" fontSize="11" fontWeight="600" fill={COLORS.cocoa}>
                Telemetri Gerak: v(0) = 8,0 m/s · a_t = +2,0 m/s² (konstan) · μ_s = 0,40 · v(t) = 8,0 + 2,0·t
              </text>
            </g>
          )}
        </g>
      )}

      {/* Full Free Body Diagram inside Solution */}
      {isFbd && (
        <g>
          {/* Origin at CM */}
          {/* Weight W */}
          <line x1={cmX} y1={cmY} x2={cmX} y2={cmY + 62} stroke={COLORS.forceWeight} strokeWidth="2.4" markerEnd="url(#arr-weight)" />
          <text x={cmX - 28} y={cmY + 60} fontSize="11.5" fontWeight="700" fill={COLORS.forceWeight}>
            W = mg
          </text>

          {/* Normal N */}
          <line
            x1={cmX}
            y1={cmY}
            x2={cmX + 78 * Math.sin(rad)}
            y2={cmY - 78 * Math.cos(rad)}
            stroke={COLORS.forceNormal}
            strokeWidth="2.4"
            markerEnd="url(#arr-normal)"
          />
          <text x={cmX + 86 * Math.sin(rad) + 7} y={cmY - 74 * Math.cos(rad)} fontSize="12" fontWeight="700" fill={COLORS.forceNormal}>
            N
          </text>

          {/* Normal dashed projections */}
          <line
            x1={cmX}
            y1={cmY}
            x2={cmX}
            y2={cmY - 78 * Math.cos(rad)}
            stroke={COLORS.forceNormal}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <line
            x1={cmX}
            y1={cmY - 78 * Math.cos(rad)}
            x2={cmX + 78 * Math.sin(rad)}
            y2={cmY - 78 * Math.cos(rad)}
            stroke={COLORS.forceNormal}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <text x={cmX - 46} y={cmY - 46 * Math.cos(rad)} fontSize="10.5" fontWeight="600" fill={COLORS.forceNormal}>
            N cos θ
          </text>
          <text x={cmX + 34 * Math.sin(rad)} y={cmY - 78 * Math.cos(rad) - 10} textAnchor="middle" fontSize="10.5" fontWeight="600" fill={COLORS.forceNormal}>
            N sin θ
          </text>

          {/* Friction vector */}
          {hasFrictionDown && (
            <g>
              <line
                x1={carX}
                y1={carY - 3}
                x2={carX + 58 * Math.cos(rad)}
                y2={carY - 3 + 58 * Math.sin(rad)}
                stroke={COLORS.forceFriction}
                strokeWidth="2.5"
                markerEnd="url(#arr-friction)"
              />
              <text x={carX + 62 * Math.cos(rad)} y={carY + 58 * Math.sin(rad) + 10} fontSize="11.5" fontWeight="700" fill={COLORS.forceFriction}>
                f_s
              </text>
            </g>
          )}
          {hasFrictionUp && (
            <g>
              <line
                x1={carX}
                y1={carY - 3}
                x2={carX - 58 * Math.cos(rad)}
                y2={carY - 3 - 58 * Math.sin(rad)}
                stroke={COLORS.forceFriction}
                strokeWidth="2.5"
                markerEnd="url(#arr-friction)"
              />
              <text x={carX - 68 * Math.cos(rad)} y={carY - 58 * Math.sin(rad) - 8} fontSize="11.5" fontWeight="700" fill={COLORS.forceFriction}>
                f_s
              </text>
            </g>
          )}

          {/* Centripetal Acceleration vector */}
          <line x1={cmX + 18} y1={cmY + 12} x2={cmX + 76} y2={cmY + 12} stroke={COLORS.forceAccel} strokeWidth="2.2" markerEnd="url(#arr-accel)" />
          <text x={cmX + 80} y={cmY + 16} fontSize="11" fontWeight="700" fill={COLORS.forceAccel}>
            a_s = v²/r
          </text>
        </g>
      )}
    </svg>
  );
};

export const KnowledgeDiagram: React.FC<{ variant: string }> = ({ variant }) => {
  if (variant === 'level4-friction-graph') {
    return (
      <svg
        viewBox="0 0 560 220"
        className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
        role="img"
        aria-label="Grafik rentang kelajuan aman terhadap koefisien gesek statis"
      >
        <ArrowDefs />
        <text x="280" y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill={COLORS.cocoa}>
          Rentang Kelajuan Aman [v_min, v_maks] vs Koefisien Gesek Statis μ_s (θ = 20°, r = 50 m)
        </text>
        <line x1="60" y1="185" x2="500" y2="185" stroke={COLORS.cocoa} strokeWidth="1.6" markerEnd="url(#arr-cocoa)" />
        <line x1="60" y1="185" x2="60" y2="38" stroke={COLORS.cocoa} strokeWidth="1.6" markerEnd="url(#arr-cocoa)" />
        {/* Safe band */}
        <path
          d="M 60 120 Q 220 95 450 52 L 450 185 L 220 185 Q 130 165 60 120 Z"
          fill={COLORS.gold}
          opacity="0.18"
        />
        {/* v_maks curve */}
        <path d="M 60 120 Q 220 95 450 52" fill="none" stroke={COLORS.forceAccel} strokeWidth="2.5" />
        {/* v_min curve */}
        <path d="M 60 120 Q 130 155 215 185" fill="none" stroke={COLORS.forceNormal} strokeWidth="2.5" />
        {/* v_ideal line */}
        <line x1="60" y1="120" x2="455" y2="120" stroke={COLORS.swiss} strokeWidth="1.4" strokeDasharray="5 4" />
        <text x="462" y="124" fontSize="10.5" fontWeight="600" fill={COLORS.swiss}>
          v_0 = 13,4 m/s
        </text>
        <text x="275" y="54" fontSize="11" fontWeight="700" fill={COLORS.forceAccel}>
          v_maks (f_s ke bawah)
        </text>
        <text x="195" y="172" fontSize="11" fontWeight="700" fill={COLORS.forceNormal}>
          v_min (f_s ke atas)
        </text>
        <text x="275" y="145" fontSize="11" fontWeight="600" fill={COLORS.cocoa}>
          Zona Aman Tanpa Selip
        </text>
        <text x="506" y="189" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          μ_s
        </text>
        <text x="22" y="45" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>
          v (m/s)
        </text>
      </svg>
    );
  }

  // Default textbook banked diagram for Levels 1, 2, 3, 5
  const showTorque = variant === 'level5-rollover-coupled';
  const rad = degToRad(20);
  const x1 = 90;
  const y1 = 68;
  const x2 = 430;
  const y2 = y1 + (x2 - x1) * Math.tan(rad);
  const carX = 245;
  const carY = y1 + (carX - x1) * Math.tan(rad);
  const cmX = carX + 22 * Math.sin(rad);
  const cmY = carY - 22 * Math.cos(rad);

  return (
    <svg
      viewBox="0 0 560 235"
      className="w-full rounded-xl border border-[#E9DDD1] bg-[#FFFDF9]"
      role="img"
      aria-label="Ilustrasi konsep tikungan miring Soal Nomor 7"
    >
      <ArrowDefs />
      <polygon points={`${x1},${y1} ${x2},${y2} ${x1},${y2}`} fill={COLORS.road} stroke={COLORS.swiss} strokeWidth="2" />
      <line x1="65" y1={y2} x2="500" y2={y2} stroke={COLORS.cocoa} strokeWidth="1.5" />
      <text x={x2 - 68} y={y2 - 8} fontSize="11.5" fontWeight="700" fill={COLORS.cocoa}>
        θ = 20°
      </text>
      <g transform="translate(415, 58)">
        <line x1="0" y1="0" x2="36" y2="0" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
        <line x1="0" y1="0" x2="0" y2="-32" stroke={COLORS.cocoa} strokeWidth="1.5" markerEnd="url(#arr-cocoa)" />
        <text x="41" y="4" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>x (+pusat)</text>
        <text x="-6" y="-37" fontSize="11" fontWeight="700" fill={COLORS.cocoa}>y</text>
      </g>
      <CarSilhouette x={carX} y={carY} angleDeg={20} showRolloverDims={showTorque} />
      <line x1={cmX} y1={cmY} x2={cmX} y2={cmY + 58} stroke={COLORS.forceWeight} strokeWidth="2.3" markerEnd="url(#arr-weight)" />
      <text x={cmX - 30} y={cmY + 56} fontSize="11.5" fontWeight="700" fill={COLORS.forceWeight}>W = mg</text>
      <line
        x1={cmX}
        y1={cmY}
        x2={cmX + 74 * Math.sin(rad)}
        y2={cmY - 74 * Math.cos(rad)}
        stroke={COLORS.forceNormal}
        strokeWidth="2.3"
        markerEnd="url(#arr-normal)"
      />
      <text x={cmX + 78 * Math.sin(rad) + 4} y={cmY - 76 * Math.cos(rad)} fontSize="11.5" fontWeight="700" fill={COLORS.forceNormal}>N</text>
      <line x1={cmX} y1={cmY} x2={cmX} y2={cmY - 74 * Math.cos(rad)} stroke={COLORS.forceNormal} strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1={cmX} y1={cmY - 74 * Math.cos(rad)} x2={cmX + 74 * Math.sin(rad)} y2={cmY - 74 * Math.cos(rad)} stroke={COLORS.forceNormal} strokeWidth="1.2" strokeDasharray="3 3" />
      <text x={cmX - 42} y={cmY - 40} fontSize="10.5" fontWeight="600" fill={COLORS.forceNormal}>N cos θ</text>
      <text x={cmX + 12} y={cmY - 74 * Math.cos(rad) - 6} fontSize="10.5" fontWeight="600" fill={COLORS.forceNormal}>N sin θ</text>
    </svg>
  );
};

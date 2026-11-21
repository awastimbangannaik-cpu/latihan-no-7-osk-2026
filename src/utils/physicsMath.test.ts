import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkNumericAnswer,
  computeSimulationFrame,
  formatCommaDecimal,
  parseNumericInput,
  roundTo1Decimal,
  solveQuestionExact,
  solveSoal7Original,
} from './physicsMath';
import { sanitizeForIndonesianSpeech } from './narratorText';

test('Soal 7 original baseline yields ~13,4 m/s', () => {
  const v = solveSoal7Original(20, 50, 9.8);
  assert.equal(formatCommaDecimal(v), '13,4');
});

test('Input normalization accepts comma, dot, negative, and rejects non-numeric text', () => {
  assert.equal(parseNumericInput('13,6'), 13.6);
  assert.equal(parseNumericInput('13.6'), 13.6);
  assert.equal(parseNumericInput(' -3,4 '), -3.4);
  assert.equal(parseNumericInput(''), null);
  assert.equal(parseNumericInput('abc'), null);
  assert.equal(parseNumericInput('12,3,4'), null);
});

test('All 15 questions compute finite, distinct, accurately rounded 1-decimal answers', () => {
  const expected: Record<number, string> = {
    1: '13,6',
    2: '4,1',
    3: '14,6',
    4: '18,8',
    5: '3,7',
    6: '11,3',
    7: '20,9',
    8: '13,8',
    9: '3,0',
    10: '32,4',
    11: '13,5',
    12: '6,1',
    13: '13,3',
    14: '1,4',
    15: '7,5',
  };

  for (let id = 1; id <= 15; id++) {
    const exact = solveQuestionExact(id);
    assert.ok(Number.isFinite(exact), `Question ${id} should produce a finite answer`);
    const formatted = formatCommaDecimal(exact);
    assert.equal(
      formatted,
      expected[id],
      `Question ${id} exact=${exact.toFixed(6)} rounded=${formatted}, expected=${expected[id]}`
    );

    const checkComma = checkNumericAnswer(expected[id], exact);
    assert.equal(checkComma.valid, true);
    assert.equal(checkComma.isCorrect, true);

    const checkDot = checkNumericAnswer(expected[id].replace(',', '.'), exact);
    assert.equal(checkDot.valid, true);
    assert.equal(checkDot.isCorrect, true);

    const checkWrong = checkNumericAnswer('999,9', exact);
    assert.equal(checkWrong.valid, true);
    assert.equal(checkWrong.isCorrect, false);
  }
});

test('Rounding behaves mathematically to 1 decimal place', () => {
  assert.equal(roundTo1Decimal(13.579), 13.6);
  assert.equal(roundTo1Decimal(0.84), 0.8);
  assert.equal(roundTo1Decimal(-3.44), -3.4);
});

test('Simulation frames obey physical equilibrium & vector directions across all 15 questions', () => {
  for (let id = 1; id <= 15; id++) {
    const start = computeSimulationFrame(id, 0);
    const mid = computeSimulationFrame(id, 0.5);
    const end = computeSimulationFrame(id, 1);

    assert.equal(start.phaseIndex, 0);
    assert.equal(end.phaseIndex, 5);
    assert.ok(mid.normalForceN > 0, `Normal force must stay positive on Q${id}`);
    assert.ok(mid.centripetalAccel > 0, `Centripetal acceleration must be positive on Q${id}`);
  }

  // Q5 fast turn must have friction pointing down-slope
  const q5 = computeSimulationFrame(5, 0.5);
  assert.equal(q5.frictionDirection, 'down-slope');
  assert.ok(q5.frictionN > 3700 && q5.frictionN < 3750);

  // Q6 slow turn must have friction pointing up-slope
  const q6 = computeSimulationFrame(6, 0.5);
  assert.equal(q6.frictionDirection, 'up-slope');
});

test('Speech sanitizer converts math symbols cleanly without raw LaTeX', () => {
  const spoken = sanitizeForIndonesianSpeech('ΣF_x = m × a_s pada sudut θ = 20° dengan v = 13,4 m/s');
  assert.ok(!spoken.includes('Σ'));
  assert.ok(!spoken.includes('θ'));
  assert.ok(spoken.includes('resultan gaya pada sumbu x'));
  assert.ok(spoken.includes('sudut teta'));
  assert.ok(spoken.includes('13 koma 4 meter per sekon'));
});

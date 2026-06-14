import { describe, it, expect } from 'vitest';
import { clampInt } from '../index.js';

describe('clampInt', () => {
  it('returns valid numbers within range', () => {
    expect(clampInt('50', 1, 100, 24)).toBe(50);
  });

  it('clamps to lower bound', () => {
    expect(clampInt('0', 1, 100, 24)).toBe(1);
    expect(clampInt('-10', 1, 100, 24)).toBe(1);
  });

  it('clamps to upper bound', () => {
    expect(clampInt('150', 1, 100, 24)).toBe(100);
  });

  it('parses floats to ints and clamps', () => {
    expect(clampInt('50.5', 1, 100, 24)).toBe(50);
    expect(clampInt('150.5', 1, 100, 24)).toBe(100);
    expect(clampInt('-10.5', 1, 100, 24)).toBe(1);
  });

  it('returns fallback for invalid inputs', () => {
    expect(clampInt('abc', 1, 100, 24)).toBe(24);
    expect(clampInt(null, 1, 100, 24)).toBe(24);
    expect(clampInt(undefined, 1, 100, 24)).toBe(24);
    expect(clampInt('', 1, 100, 24)).toBe(24);
  });
});

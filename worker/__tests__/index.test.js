import { describe, it, expect } from 'vitest';
import { clampInt } from '../index.js';

describe('clampInt', () => {
  it('should parse raw string and clamp to min and max', () => {
    expect(clampInt('50', 0, 100, 10)).toBe(50);
    expect(clampInt('150', 0, 100, 10)).toBe(100);
    expect(clampInt('-10', 0, 100, 10)).toBe(0);
  });

  it('should return fallback if raw is not finite', () => {
    expect(clampInt('abc', 0, 100, 10)).toBe(10);
    expect(clampInt(undefined, 0, 100, 10)).toBe(10);
    expect(clampInt(null, 0, 100, 10)).toBe(10);
  });

  it('should parse floats but return integer', () => {
    expect(clampInt('50.5', 0, 100, 10)).toBe(50);
  });
});

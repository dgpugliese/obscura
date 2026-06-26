import { describe, it, expect } from 'vitest';
import { clampInt } from './index.js';

describe('clampInt', () => {
  it('should return the parsed integer if it is within bounds', () => {
    expect(clampInt('10', 1, 20, 5)).toBe(10);
    expect(clampInt(10, 1, 20, 5)).toBe(10);
  });

  it('should clamp to the minimum bound if the parsed integer is below it', () => {
    expect(clampInt('0', 1, 20, 5)).toBe(1);
    expect(clampInt('-10', 1, 20, 5)).toBe(1);
  });

  it('should clamp to the maximum bound if the parsed integer is above it', () => {
    expect(clampInt('30', 1, 20, 5)).toBe(20);
    expect(clampInt('100', 1, 20, 5)).toBe(20);
  });

  it('should return the fallback value if the input is invalid or NaN', () => {
    expect(clampInt('invalid', 1, 20, 5)).toBe(5);
    expect(clampInt(NaN, 1, 20, 5)).toBe(5);
    expect(clampInt(undefined, 1, 20, 5)).toBe(5);
    expect(clampInt({}, 1, 20, 5)).toBe(5);
    expect(clampInt(null, 1, 20, 5)).toBe(5);
  });
});

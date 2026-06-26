import { describe, it, expect } from 'vitest';
import { allowedInt } from './index.js';

describe('allowedInt', () => {
  it('returns the parsed integer if it is in the allowed array', () => {
    expect(allowedInt('10', [5, 10, 15], 100)).toBe(10);
    expect(allowedInt('5', [5, 10, 15], 100)).toBe(5);
  });

  it('returns the fallback if the parsed integer is not in the allowed array', () => {
    expect(allowedInt('7', [5, 10, 15], 100)).toBe(100);
    expect(allowedInt('20', [5, 10, 15], 100)).toBe(100);
  });

  it('returns the fallback if the input is a non-numeric string that parses to NaN', () => {
    expect(allowedInt('abc', [5, 10, 15], 100)).toBe(100);
    // NaN is never in the array because Array.prototype.includes uses SameValueZero
    // wait, actually includes(NaN) works if NaN is in array, but allowed is usually numbers.
  });

  it('returns the fallback if the allowed array is empty', () => {
    expect(allowedInt('10', [], 100)).toBe(100);
  });

  it('handles negative numbers correctly', () => {
    expect(allowedInt('-5', [-10, -5, 0], 100)).toBe(-5);
    expect(allowedInt('-7', [-10, -5, 0], 100)).toBe(100);
  });
});

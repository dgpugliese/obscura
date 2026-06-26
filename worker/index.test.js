import { describe, it, expect } from 'vitest';
import { allowedInt } from './index.js';

describe('allowedInt', () => {
  const allowed = [1, 3, 5, 10];
  const fallback = 1;

  it('should return the parsed integer if it exists in the allowed list', () => {
    expect(allowedInt("3", allowed, fallback)).toBe(3);
    expect(allowedInt("10", allowed, fallback)).toBe(10);
  });

  it('should return the fallback if the parsed integer is not in the allowed list', () => {
    expect(allowedInt("2", allowed, fallback)).toBe(fallback);
    expect(allowedInt("100", allowed, fallback)).toBe(fallback);
  });

  it('should return the fallback if the input is not a valid number string', () => {
    expect(allowedInt("abc", allowed, fallback)).toBe(fallback);
    expect(allowedInt("", allowed, fallback)).toBe(fallback);
  });

  it('should handle number inputs as well as string inputs', () => {
    expect(allowedInt(5, allowed, fallback)).toBe(5);
    expect(allowedInt(7, allowed, fallback)).toBe(fallback);
  });

  it('should return the fallback for null or undefined inputs', () => {
    expect(allowedInt(null, allowed, fallback)).toBe(fallback);
    expect(allowedInt(undefined, allowed, fallback)).toBe(fallback);
  });
});

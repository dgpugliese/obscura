import { describe, it, expect } from 'vitest';
import { shannonEntropy } from '../src/app.jsx';

describe('shannonEntropy', () => {
  it('returns 0 for empty or null input', () => {
    expect(shannonEntropy(null)).toBe(0);
    expect(shannonEntropy(undefined)).toBe(0);
    expect(shannonEntropy(new Uint8Array(0))).toBe(0);
    expect(shannonEntropy([])).toBe(0);
  });

  it('calculates 0 entropy for an array of identical values', () => {
    const bytes = new Uint8Array(100).fill(42);
    expect(shannonEntropy(bytes)).toBe(0);
  });

  it('calculates exact entropy for simple predictable arrays', () => {
    // 2 values, equal probability -> 1 bit of entropy
    const bytes2 = new Uint8Array([10, 10, 20, 20]);
    expect(shannonEntropy(bytes2)).toBe(1);

    // 4 values, equal probability -> 2 bits of entropy
    const bytes4 = new Uint8Array([1, 2, 3, 4, 1, 2, 3, 4]);
    expect(shannonEntropy(bytes4)).toBe(2);
  });

  it('calculates close to 8 for uniformly distributed bytes', () => {
    const bytes = new Uint8Array(256 * 100);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = i % 256;
    }
    // Exactly uniform distribution of all 256 values gives exactly 8 bits
    expect(shannonEntropy(bytes)).toBeCloseTo(8, 5);
  });

  it('handles large payloads with sampling', () => {
    // > 64 KiB
    const largeBytes = new Uint8Array(100000);
    // Fill with 4 repeating values -> expected entropy is 2
    for (let i = 0; i < largeBytes.length; i++) {
      largeBytes[i] = i % 4;
    }
    expect(shannonEntropy(largeBytes)).toBeCloseTo(2, 5);
  });
});

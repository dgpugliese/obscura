import { describe, it, expect } from 'vitest';
import { shannonEntropy } from '../src/app.jsx';

describe('shannonEntropy', () => {
  it('returns 0 for falsy or empty inputs', () => {
    expect(shannonEntropy(null)).toBe(0);
    expect(shannonEntropy(undefined)).toBe(0);
    expect(shannonEntropy(new Uint8Array())).toBe(0);
  });

  it('returns 0 for arrays with a single unique value (zero entropy)', () => {
    expect(shannonEntropy(new Uint8Array([5, 5, 5, 5]))).toBe(0);
    expect(shannonEntropy(new Uint8Array([0, 0]))).toBe(0);
    expect(shannonEntropy(new Uint8Array(100).fill(42))).toBe(0);
  });

  it('calculates correct entropy for a uniform distribution', () => {
    // 2 unique values, equally distributed: entropy = 1 bit
    expect(shannonEntropy(new Uint8Array([1, 2]))).toBe(1);
    expect(shannonEntropy(new Uint8Array([10, 20, 10, 20]))).toBe(1);

    // 4 unique values, equally distributed: entropy = 2 bits
    expect(shannonEntropy(new Uint8Array([1, 2, 3, 4]))).toBe(2);

    // 256 unique values, equally distributed: entropy = 8 bits
    const allBytes = new Uint8Array(256);
    for (let i = 0; i < 256; i++) allBytes[i] = i;
    expect(shannonEntropy(allBytes)).toBe(8);
  });

  it('handles large arrays by sampling correctly', () => {
    const SAMPLE = 65536;

    // Create an array larger than the sample size (e.g., 2 * SAMPLE)
    const largeArray = new Uint8Array(SAMPLE * 2);

    // Fill it such that the sampled values are perfectly uniform
    // The sampling stride will be Math.floor((SAMPLE * 2) / SAMPLE) = 2.
    // So the sampled indices will be 0, 2, 4, ..., (SAMPLE - 1) * 2.
    // We want the sampled values to be random but let's just make them diverse
    for (let i = 0; i < SAMPLE; i++) {
        largeArray[i * 2] = i % 256; // 256 unique values equally distributed in the sampled positions
    }

    // Since the sample contains 256 unique values equally distributed (256 of each value),
    // the entropy of the sample should be exactly 8.
    expect(shannonEntropy(largeArray)).toBe(8);
  });
});

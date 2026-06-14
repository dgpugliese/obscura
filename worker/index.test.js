import { describe, it, expect, vi } from 'vitest';
import { randomHexId } from './index.js';

describe('randomHexId', () => {
  it('should return a string of double the length of bytes requested', () => {
    const id = randomHexId(8);
    expect(id).toHaveLength(16);
    expect(typeof id).toBe('string');
  });

  it('should return a valid hex string', () => {
    const id = randomHexId(8);
    expect(id).toMatch(/^[0-9a-f]+$/);
  });

  it('should return different values on consecutive calls', () => {
    const id1 = randomHexId(8);
    const id2 = randomHexId(8);
    expect(id1).not.toBe(id2);
  });

  it('should handle zero bytes correctly', () => {
    const id = randomHexId(0);
    expect(id).toBe('');
  });
});

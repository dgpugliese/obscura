import { test, expect, describe, vi, beforeEach, afterEach, it } from 'vitest';
import { secureRandInt } from '../src/app.jsx';

describe('secureRandInt', () => {
  let getRandomValuesMock;

  beforeEach(() => {
    getRandomValuesMock = vi.fn();
    vi.stubGlobal('crypto', {
      getRandomValues: getRandomValuesMock
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('throws an error if max is <= 0', () => {
    expect(() => secureRandInt(0)).toThrow('secureRandInt out of range');
    expect(() => secureRandInt(-5)).toThrow('secureRandInt out of range');
  });

  it('throws an error if max is > 0x100000000', () => {
    expect(() => secureRandInt(0x100000000 + 1)).toThrow('secureRandInt out of range');
  });

  it('returns correctly distributed values using modulo', () => {
    // Set up deterministic random values
    getRandomValuesMock.mockImplementation((buf) => {
      // Return 12
      buf[0] = 12;
      return buf;
    });

    // 12 % 5 = 2
    expect(secureRandInt(5)).toBe(2);
    expect(getRandomValuesMock).toHaveBeenCalledTimes(1);

    getRandomValuesMock.mockImplementation((buf) => {
      // Return 0
      buf[0] = 0;
      return buf;
    });
    expect(secureRandInt(10)).toBe(0);

    getRandomValuesMock.mockImplementation((buf) => {
      // Return max - 1 which is the highest valid return
      buf[0] = 9;
      return buf;
    });
    expect(secureRandInt(10)).toBe(9);
  });

  it('rejects values >= limit to avoid modulo bias', () => {
    // The max limit is Math.floor(0x100000000 / max) * max
    // For max = 3, 0x100000000 (4294967296) / 3 = 1431655765.333
    // limit = 1431655765 * 3 = 4294967295
    // That means buf[0] = 4294967295 should be rejected

    let callCount = 0;
    getRandomValuesMock.mockImplementation((buf) => {
      callCount++;
      if (callCount === 1) {
        // This should be rejected because it's >= limit
        buf[0] = 4294967295;
      } else {
        // This is < limit, so it should be accepted (4 % 3 = 1)
        buf[0] = 4;
      }
      return buf;
    });

    expect(secureRandInt(3)).toBe(1);
    expect(callCount).toBe(2);
    expect(getRandomValuesMock).toHaveBeenCalledTimes(2);
  });

  it('handles the exact limit boundary correctly', () => {
    const max = 100;
    // For max=100:
    // limit = Math.floor(4294967296 / 100) * 100 = 42949672 * 100 = 4294967200
    // Values >= 4294967200 are rejected.

    let callCount = 0;
    getRandomValuesMock.mockImplementation((buf) => {
      callCount++;
      if (callCount === 1) {
        // Rejected
        buf[0] = 4294967200;
      } else if (callCount === 2) {
        // Accepted: 4294967199 % 100 = 99
        buf[0] = 4294967199;
      }
      return buf;
    });

    expect(secureRandInt(100)).toBe(99);
    expect(callCount).toBe(2);
  });
});

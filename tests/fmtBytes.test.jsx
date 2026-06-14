import { describe, it, expect } from 'vitest';
import { fmtBytes } from '../src/app.jsx';

describe('fmtBytes', () => {
  it('returns "—" for null or undefined', () => {
    expect(fmtBytes(null)).toBe('—');
    expect(fmtBytes(undefined)).toBe('—');
  });

  it('formats bytes correctly (b < 1024)', () => {
    expect(fmtBytes(0)).toBe('0 B');
    expect(fmtBytes(500)).toBe('500 B');
    expect(fmtBytes(1023)).toBe('1023 B');
  });

  it('formats kilobytes correctly (1024 <= b < 1024*1024)', () => {
    expect(fmtBytes(1024)).toBe('1.0 KB');
    expect(fmtBytes(1500)).toBe('1.5 KB');
    expect(fmtBytes(1024 * 1024 - 1)).toBe('1024.0 KB'); // 1048575 -> 1023.99... -> 1024.0 KB
  });

  it('formats megabytes correctly (b >= 1024*1024)', () => {
    expect(fmtBytes(1024 * 1024)).toBe('1.00 MB');
    expect(fmtBytes(1500 * 1024)).toBe('1.46 MB');
    expect(fmtBytes(1024 * 1024 * 1024)).toBe('1024.00 MB'); // 1 GB
  });
});

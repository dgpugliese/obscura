import { describe, it, expect } from 'vitest';
import { fmtMs } from '../src/app.jsx';

describe('fmtMs', () => {
  it('handles null/undefined by returning "—"', () => {
    expect(fmtMs(null)).toBe('—');
    expect(fmtMs(undefined)).toBe('—'); // Based on ms == null
  });

  it('handles times less than 1ms', () => {
    expect(fmtMs(0)).toBe('<1ms');
    expect(fmtMs(0.5)).toBe('<1ms');
    expect(fmtMs(0.99)).toBe('<1ms');
  });

  it('handles times between 1ms and 999ms', () => {
    expect(fmtMs(1)).toBe('1ms');
    expect(fmtMs(100)).toBe('100ms');
    expect(fmtMs(999)).toBe('999ms');

    // Rounds properly
    expect(fmtMs(1.4)).toBe('1ms');
    expect(fmtMs(1.5)).toBe('2ms');
  });

  it('handles times >= 1000ms by converting to seconds with 2 decimals', () => {
    expect(fmtMs(1000)).toBe('1.00s');
    expect(fmtMs(1500)).toBe('1.50s');
    expect(fmtMs(1505)).toBe('1.50s');
    expect(fmtMs(1506)).toBe('1.51s');
    expect(fmtMs(10000)).toBe('10.00s');
  });
});

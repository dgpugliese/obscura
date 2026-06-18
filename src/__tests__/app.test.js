import { describe, it, expect } from 'vitest';
import { fmtThroughput } from '../app.jsx';

describe('fmtThroughput', () => {
    it('returns "—" when bytes is falsy', () => {
        expect(fmtThroughput(0, 1000)).toBe('—');
        expect(fmtThroughput(null, 1000)).toBe('—');
        expect(fmtThroughput(undefined, 1000)).toBe('—');
    });

    it('returns "—" when ms is falsy', () => {
        expect(fmtThroughput(1000, 0)).toBe('—');
        expect(fmtThroughput(1000, null)).toBe('—');
        expect(fmtThroughput(1000, undefined)).toBe('—');
    });

    it('formats throughput correctly for < 100 MB/s', () => {
        // 50 MB/s -> 52428800 bytes per second
        expect(fmtThroughput(52428800, 1000)).toBe('50.0 MB/s');

        // 1.5 MB/s -> 1572864 bytes per second
        expect(fmtThroughput(1572864, 1000)).toBe('1.5 MB/s');
    });

    it('formats throughput correctly for >= 100 MB/s (no decimals)', () => {
        // 100 MB/s -> 104857600 bytes per second
        expect(fmtThroughput(104857600, 1000)).toBe('100 MB/s');

        // 150 MB/s -> 157286400 bytes per second
        expect(fmtThroughput(157286400, 1000)).toBe('150 MB/s');
    });

    it('handles small ms values correctly', () => {
        // 50 MB in 500ms = 100 MB/s
        expect(fmtThroughput(52428800, 500)).toBe('100 MB/s');
    });

    it('handles rounding appropriately', () => {
        // 1.55 MB/s -> 1625292.8 bytes per second
        // 1625292.8 / 1024 / 1024 / 1 = 1.55
        // toFixed(1) -> 1.6
        expect(fmtThroughput(1625292.8, 1000)).toBe('1.6 MB/s');
    });
});

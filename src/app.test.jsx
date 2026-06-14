import { describe, it, expect } from 'vitest';
import { clampNum } from './app.jsx';

describe('clampNum', () => {
    it('returns the number if it is within range', () => {
        expect(clampNum(5, 1, 10, 0)).toBe(5);
    });

    it('returns the minimum if the number is less than minimum', () => {
        expect(clampNum(0, 1, 10, 0)).toBe(1);
        expect(clampNum(-5, 1, 10, 0)).toBe(1);
    });

    it('returns the maximum if the number is greater than maximum', () => {
        expect(clampNum(15, 1, 10, 0)).toBe(10);
        expect(clampNum(100, 1, 10, 0)).toBe(10);
    });

    it('returns fallback if the number is not finite (NaN)', () => {
        expect(clampNum(NaN, 1, 10, 99)).toBe(99);
    });

    it('returns fallback if the number is not finite (Infinity)', () => {
        expect(clampNum(Infinity, 1, 10, 99)).toBe(99);
    });

    it('returns fallback if the number is not finite (-Infinity)', () => {
        expect(clampNum(-Infinity, 1, 10, 99)).toBe(99);
    });

    it('handles floating point values properly', () => {
        expect(clampNum(5.5, 1.2, 9.8, 0)).toBe(5.5);
        expect(clampNum(0.5, 1.2, 9.8, 0)).toBe(1.2);
        expect(clampNum(10.5, 1.2, 9.8, 0)).toBe(9.8);
    });
});

import { describe, it, expect, vi } from 'vitest';
import {
  secureRandInt,
  generatePassphrase,
  b64uEncode,
  b64uDecode,
  blobMagic,
  fingerprintRows,
  shannonEntropy,
  fmtMs,
  fmtThroughput,
  fmtBytes,
  hexLine,
  clampNum,
  allowedDownloadCount
} from './app.jsx';

describe('App Utils', () => {
  describe('Formatting Utils', () => {
    it('fmtMs formats milliseconds correctly', () => {
      expect(fmtMs(null)).toBe('—');
      expect(fmtMs(0.5)).toBe('<1ms');
      expect(fmtMs(500)).toBe('500ms');
      expect(fmtMs(1500)).toBe('1.50s');
    });

    it('fmtBytes formats bytes correctly', () => {
      expect(fmtBytes(null)).toBe('—');
      expect(fmtBytes(500)).toBe('500 B');
      expect(fmtBytes(1500)).toBe('1.5 KB');
      expect(fmtBytes(1500000)).toBe('1.43 MB');
    });

    it('fmtThroughput formats throughput correctly', () => {
      expect(fmtThroughput(null, null)).toBe('—');
      expect(fmtThroughput(1024 * 1024, 1000)).toBe('1.0 MB/s');
      expect(fmtThroughput(1024 * 1024 * 100, 1000)).toBe('100 MB/s');
    });

    it('hexLine formats bytes to hex string', () => {
      expect(hexLine(new Uint8Array([0, 15, 255]))).toBe('00 0f ff');
      expect(hexLine([])).toBe('');
      expect(hexLine(null)).toBe('');
    });
  });

  describe('Crypto & Math Utils', () => {
    it('b64uEncode and b64uDecode work symmetrically', () => {
      const bytes = new Uint8Array([0, 1, 255, 128, 64]);
      const encoded = b64uEncode(bytes);
      expect(typeof encoded).toBe('string');
      // Should not contain URL unsafe chars
      expect(encoded).not.toMatch(/[+/=]/);
      const decoded = b64uDecode(encoded);
      expect(decoded).toEqual(bytes);
    });

    it('blobMagic detects versions correctly', () => {
      expect(blobMagic(new Uint8Array([]))).toBe(null);
      expect(blobMagic(new Uint8Array([0x4F, 0x42, 0x53, 0x31]))).toBe('v1');
      expect(blobMagic(new Uint8Array([0x4F, 0x42, 0x53, 0x32]))).toBe('v2');
      expect(blobMagic(new Uint8Array([0x00, 0x00, 0x00, 0x00]))).toBe(null);
    });

    it('fingerprintRows formats hex hash nicely', () => {
      const rows = fingerprintRows('0123456789abcdef');
      expect(rows).toEqual(['01:23:45', '67:89:AB']);
    });

    it('shannonEntropy calculates entropy correctly', () => {
      expect(shannonEntropy(new Uint8Array([]))).toBe(0);
      expect(shannonEntropy(null)).toBe(0);

      // All zeros -> 0 entropy
      expect(shannonEntropy(new Uint8Array(100))).toBe(0);

      // Some variance -> >0 entropy
      expect(shannonEntropy(new Uint8Array([0, 1, 2, 3]))).toBeGreaterThan(0);
    });

    it('secureRandInt handles edge cases', () => {
      expect(() => secureRandInt(0)).toThrow();
      expect(() => secureRandInt(-1)).toThrow();

      const val = secureRandInt(10);
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(10);
    });

    it('generatePassphrase generates a 4-part string', () => {
      const pass = generatePassphrase();
      expect(typeof pass).toBe('string');
      const parts = pass.split('-');
      expect(parts.length).toBe(4);
      expect(parts[2]).toMatch(/^\d{2}$/); // Third part is a number
    });
  });

  describe('Config Utils', () => {
    it('clampNum clamps numbers correctly', () => {
      expect(clampNum(5, 1, 10, 0)).toBe(5);
      expect(clampNum(0, 1, 10, 0)).toBe(1);
      expect(clampNum(15, 1, 10, 0)).toBe(10);
      expect(clampNum(NaN, 1, 10, 0)).toBe(0);
    });

    it('allowedDownloadCount checks allowed values', () => {
      expect(allowedDownloadCount(1)).toBe(1);
      expect(allowedDownloadCount(3)).toBe(3);
      expect(allowedDownloadCount(5)).toBe(5);
      expect(allowedDownloadCount(10)).toBe(10);
      expect(allowedDownloadCount(2)).toBe(3); // fallback
      expect(allowedDownloadCount(null)).toBe(3); // fallback
    });
  });
});

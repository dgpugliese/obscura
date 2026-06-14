import { describe, it, expect } from 'vitest';
import { b64uEncode, b64uDecode } from './app.jsx';

describe('Base64url utilities', () => {
  it('should encode and decode a Uint8Array correctly', () => {
    const original = new Uint8Array([104, 101, 108, 108, 111]); // "hello"
    const encoded = b64uEncode(original);
    const decoded = b64uDecode(encoded);

    expect(encoded).toBe('aGVsbG8'); // Base64 for "hello" is "aGVsbG8="
    expect(decoded).toEqual(original);
  });

  it('should handle URL-safe characters correctly', () => {
    const original = new Uint8Array([255, 255, 255]); // Base64: //// -> Base64url: ____
    const encoded = b64uEncode(original);
    expect(encoded).toBe('____');
    expect(b64uDecode(encoded)).toEqual(original);

    const original1 = new Uint8Array([251, 239, 191]); // Base64: +++/ -> Base64url: ---_
    const encoded1 = b64uEncode(original1);
    expect(encoded1).toBe('---_');
    expect(b64uDecode(encoded1)).toEqual(original1);
  });

  it('should handle empty arrays correctly', () => {
    const original = new Uint8Array([]);
    const encoded = b64uEncode(original);
    expect(encoded).toBe('');
    expect(b64uDecode(encoded)).toEqual(original);
  });

  it('should handle round trips for various lengths (padding handling)', () => {
    const lengths = [1, 2, 3, 4, 5];
    lengths.forEach(len => {
      const arr = new Uint8Array(len);
      for(let i=0; i<len; i++) arr[i] = i;
      const enc = b64uEncode(arr);
      const dec = b64uDecode(enc);
      expect(dec).toEqual(arr);
    });
  });
});

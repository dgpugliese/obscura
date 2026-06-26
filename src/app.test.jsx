import { describe, it, expect } from 'vitest'
import { b64uDecode, b64uEncode } from './app.jsx'

describe('b64uDecode', () => {
  it('decodes standard base64 strings correctly', () => {
    // "hello" in base64 is aGVsbG8=
    const decoded = b64uDecode('aGVsbG8=');
    const expected = new Uint8Array([104, 101, 108, 108, 111]); // "hello" in ascii
    expect(decoded).toEqual(expected);
  });

  it('decodes base64 strings without padding correctly', () => {
    // "hello" in base64 without padding is aGVsbG8
    const decoded = b64uDecode('aGVsbG8');
    const expected = new Uint8Array([104, 101, 108, 108, 111]); // "hello" in ascii
    expect(decoded).toEqual(expected);
  });

  it('decodes base64url specific characters (- and _) correctly', () => {
    // 0x03, 0xfd, 0xef, 0xf0 results in A/3v8A== in standard base64
    // In base64url it should be A_3v8A
    const b64uString = 'A_3v8A';
    const decoded = b64uDecode(b64uString);
    const expected = new Uint8Array([3, 253, 239, 240]);
    expect(decoded).toEqual(expected);

    // Testing -
    // 0xfb, 0xfb, 0xff results in +/v/ in base64
    // In base64url it is -_v_
    const decoded2 = b64uDecode('-_v_');
    const expected2 = new Uint8Array([251, 251, 255]);
    expect(decoded2).toEqual(expected2);
  });

  it('roundtrips with b64uEncode correctly', () => {
    // Create an array with all possible byte values
    const bytes = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      bytes[i] = i;
    }

    // Encode it
    const encoded = b64uEncode(bytes);

    // Should not contain + or / or =
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');

    // Decode it back
    const decoded = b64uDecode(encoded);

    // Should match original
    expect(decoded).toEqual(bytes);
  });

  it('handles empty strings correctly', () => {
    expect(b64uDecode('')).toEqual(new Uint8Array(0));
  });
});

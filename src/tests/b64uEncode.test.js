import { describe, it, expect } from 'vitest';
import { b64uEncode } from '../app.jsx';

describe('b64uEncode', () => {
  it('encodes an empty array to an empty string', () => {
    expect(b64uEncode(new Uint8Array([]))).toBe('');
  });

  it('encodes simple text bytes correctly without padding', () => {
    // "Hello" -> SGVsbG8= -> SGVsbG8
    const bytes = new TextEncoder().encode('Hello');
    expect(b64uEncode(bytes)).toBe('SGVsbG8');
  });

  it('replaces + with -', () => {
    // "~~~" -> fH5+ -> fH5-
    const bytes = new Uint8Array([126, 126, 126]);
    expect(b64uEncode(bytes)).toBe('fn5-');
  });

  it('replaces / with _', () => {
    // "\xef\xbf\xbd" -> 77+9 -> 77-9 (note: not exactly sure on standard string that encodes to /)
    // "???" -> Pz8/ -> Pz8_
    const bytes = new TextEncoder().encode('???');
    expect(b64uEncode(bytes)).toBe('Pz8_');
  });

  it('removes padding = characters', () => {
    // "a" -> YQ== -> YQ
    const bytes = new TextEncoder().encode('a');
    expect(b64uEncode(bytes)).toBe('YQ');
  });

  it('correctly handles edge cases like 0x00 and 0xff', () => {
    const bytes = new Uint8Array([0, 255, 0, 255]);
    // Base64: AP8A/w==
    // Base64Url: AP8A_w
    expect(b64uEncode(bytes)).toBe('AP8A_w');
  });
});

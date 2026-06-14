import { describe, it, expect } from 'vitest';
import { b64uEncode } from '../app.jsx';

describe('b64uEncode', () => {
  it('encodes standard bytes to base64url', () => {
    // "hello" -> [104, 101, 108, 108, 111] -> "aGVsbG8"
    const bytes = new Uint8Array([104, 101, 108, 108, 111]);
    expect(b64uEncode(bytes)).toBe('aGVsbG8');
  });

  it('handles empty byte array', () => {
    const bytes = new Uint8Array([]);
    expect(b64uEncode(bytes)).toBe('');
  });

  it('replaces + with -', () => {
    // "a>" -> [97, 62] -> "YT4=" in base64, so "YT4" in b64u
    // Let's find something that produces '+' in standard base64.
    // 62 in base64 is '+'
    // To get a '+' at the end of the base64 string, we need the last 6 bits to be 62.
    // 62 = 111110 in binary.
    // Let's use known base64 conversions:
    // \xfa is 11111010
    // \xfb is 11111011
    // \xfc is 11111100
    // \xfd is 11111101
    // \xfe is 11111110
    // \xff is 11111111

    // btoa('\xfa\xeb\xcc') -> '+uvM'
    // Let's construct a Uint8Array that produces '+'
    // \xfa = 250, \xeb = 235, \xcc = 204
    const bytes = new Uint8Array([250, 235, 204]);
    // Standard base64: "+uvM"
    // Expected b64u: "-uvM"
    expect(b64uEncode(bytes)).toBe('-uvM');
  });

  it('replaces / with _', () => {
    // 63 in base64 is '/'
    // To get a '/' at the end, the last 6 bits must be 63 = 111111
    // \xff = 255, \xff = 255, \xff = 255
    // btoa('\xff\xff\xff') -> '////'
    const bytes = new Uint8Array([255, 255, 255]);
    // Standard base64: "////"
    // Expected b64u: "____"
    expect(b64uEncode(bytes)).toBe('____');
  });

  it('removes padding =', () => {
    // "a" -> [97] -> "YQ=="
    const bytes1 = new Uint8Array([97]);
    expect(b64uEncode(bytes1)).toBe('YQ');

    // "aa" -> [97, 97] -> "YWE="
    const bytes2 = new Uint8Array([97, 97]);
    expect(b64uEncode(bytes2)).toBe('YWE');
  });

  it('handles combinations of replacements and padding', () => {
    // btoa('\xff') -> '/w=='
    const bytes = new Uint8Array([255]);
    // Standard base64: "/w=="
    // Expected b64u: "_w"
    expect(b64uEncode(bytes)).toBe('_w');
  });
});

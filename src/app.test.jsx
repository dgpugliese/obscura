import { describe, it, expect } from 'vitest';
import { blobMagic } from './app.jsx';

describe('blobMagic', () => {
  it('returns "v1" for valid OBS1 magic bytes', () => {
    // "OBS1"
    const blob = new Uint8Array([0x4F, 0x42, 0x53, 0x31, 0x00, 0x01]);
    expect(blobMagic(blob)).toBe('v1');
  });

  it('returns "v2" for valid OBS2 magic bytes', () => {
    // "OBS2"
    const blob = new Uint8Array([0x4F, 0x42, 0x53, 0x32, 0x00, 0x01]);
    expect(blobMagic(blob)).toBe('v2');
  });

  it('returns null for length < 4', () => {
    const blob = new Uint8Array([0x4F, 0x42, 0x53]);
    expect(blobMagic(blob)).toBeNull();
  });

  it('returns null for incorrect first byte', () => {
    // "XBS1"
    const blob = new Uint8Array([0x58, 0x42, 0x53, 0x31]);
    expect(blobMagic(blob)).toBeNull();
  });

  it('returns null for correct first 3 bytes but invalid 4th byte', () => {
    // "OBS3"
    const blob = new Uint8Array([0x4F, 0x42, 0x53, 0x33]);
    expect(blobMagic(blob)).toBeNull();
  });
});

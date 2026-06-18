import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generatePassphrase, PASSPHRASE_WORDS } from '../app.jsx';

describe('generatePassphrase', () => {
  let getRandomValuesSpy;

  beforeEach(() => {
    getRandomValuesSpy = vi.spyOn(global.crypto, 'getRandomValues');
  });

  afterEach(() => {
    getRandomValuesSpy.mockRestore();
  });

  it('generates a passphrase in the correct format (word-word-NN-word)', () => {
    const sequence = [0, 1, 42, 2];
    let callCount = 0;

    getRandomValuesSpy.mockImplementation((buf) => {
      buf[0] = sequence[callCount];
      callCount++;
      return buf;
    });

    const result = generatePassphrase();
    expect(result).toBe('amber-anchor-42-axiom');
    expect(getRandomValuesSpy).toHaveBeenCalledTimes(4);
  });

  it('pads numbers less than 10 with a leading zero', () => {
    const sequence = [0, 0, 5, 0];
    let callCount = 0;

    getRandomValuesSpy.mockImplementation((buf) => {
      buf[0] = sequence[callCount];
      callCount++;
      return buf;
    });

    const result = generatePassphrase();
    expect(result).toBe('amber-amber-05-amber');
  });

  it('handles crypto.getRandomValues returning values outside the limit (rejection sampling)', () => {
    const limit110 = Math.floor(0x100000000 / 110) * 110;
    const limit100 = Math.floor(0x100000000 / 100) * 100;

    const sequence = [
      limit110, 5,   // first word
      10,            // second word
      limit100, 99,  // number
      20             // third word
    ];
    let callCount = 0;

    getRandomValuesSpy.mockImplementation((buf) => {
      buf[0] = sequence[callCount];
      callCount++;
      return buf;
    });

    const result = generatePassphrase();
    expect(result).toBe('bramble-cipher-99-dune');
    expect(getRandomValuesSpy).toHaveBeenCalledTimes(6);
  });
});

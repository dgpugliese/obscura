import { describe, it, expect } from 'vitest';
import { originAllowed } from './index.js';

describe('originAllowed', () => {
  const createRequestWithOrigin = (origin) => {
    const headers = new Headers();
    if (origin !== undefined) {
      headers.set('origin', origin);
    }
    return new Request('https://example.com', { headers });
  };

  it('returns false when no origin header is present', () => {
    const request = createRequestWithOrigin(undefined);
    expect(originAllowed(request)).toBe(false);
  });

  describe('production allowed origins', () => {
    it('allows https://obscr.app', () => {
      const request = createRequestWithOrigin('https://obscr.app');
      expect(originAllowed(request)).toBe(true);
    });

    it('allows https://www.obscr.app', () => {
      const request = createRequestWithOrigin('https://www.obscr.app');
      expect(originAllowed(request)).toBe(true);
    });
  });

  it('returns false for a malformed origin', () => {
    const request = createRequestWithOrigin('not-a-url');
    expect(originAllowed(request)).toBe(false);
  });

  describe('localhost allowed origins', () => {
    const allowedLocalhosts = [
      'http://localhost',
      'http://localhost:8787',
      'http://127.0.0.1',
      'http://127.0.0.1:3000'
    ];

    allowedLocalhosts.forEach((origin) => {
      it(`allows ${origin}`, () => {
        const request = createRequestWithOrigin(origin);
        expect(originAllowed(request)).toBe(true);
      });
    });
  });

  describe('localhost disallowed origins', () => {
    const disallowedOrigins = [
      'https://localhost', // wrong protocol
      'https://localhost:8787', // wrong protocol
      'http://192.168.1.1', // other local IP
      'http://localhost.evil.com', // spoofed hostname
      'http://evil.com/localhost' // spoofed path
    ];

    disallowedOrigins.forEach((origin) => {
      it(`disallows ${origin}`, () => {
        const request = createRequestWithOrigin(origin);
        expect(originAllowed(request)).toBe(false);
      });
    });
  });
});

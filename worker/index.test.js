import { describe, it, expect } from 'vitest';
import { withSecurityHeaders, SECURITY_HEADERS } from './index.js';

describe('withSecurityHeaders', () => {
  it('adds security headers to a regular response', () => {
    const res = new Response('test body', { status: 200, statusText: 'OK' });
    const securedRes = withSecurityHeaders(res);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      expect(securedRes.headers.get(key)).toBe(value);
    }
  });

  it('preserves existing headers that are not security headers', () => {
    const res = new Response('test body', {
      headers: {
        'x-custom-header': 'custom-value',
        'content-type': 'text/plain',
      },
    });
    const securedRes = withSecurityHeaders(res);

    expect(securedRes.headers.get('x-custom-header')).toBe('custom-value');
    expect(securedRes.headers.get('content-type')).toBe('text/plain');
  });

  it('overwrites existing security headers with the required ones', () => {
    const res = new Response('test body', {
      headers: {
        'x-frame-options': 'ALLOWALL',
        'referrer-policy': 'unsafe-url',
      },
    });
    const securedRes = withSecurityHeaders(res);

    expect(securedRes.headers.get('x-frame-options')).toBe(SECURITY_HEADERS['x-frame-options']);
    expect(securedRes.headers.get('referrer-policy')).toBe(SECURITY_HEADERS['referrer-policy']);
  });

  it('preserves original status and statusText', () => {
    const res = new Response('test body', { status: 404, statusText: 'Not Found' });
    const securedRes = withSecurityHeaders(res);

    expect(securedRes.status).toBe(404);
    expect(securedRes.statusText).toBe('Not Found');
  });

  it('preserves original body', async () => {
    const res = new Response('test body data');
    const securedRes = withSecurityHeaders(res);

    const bodyText = await securedRes.text();
    expect(bodyText).toBe('test body data');
  });
});

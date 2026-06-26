import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleUpload } from './index.js';

describe('handleUpload', () => {
  let env;
  let ctx;

  beforeEach(() => {
    env = {
      MAX_TTL_HOURS: '168',
      MAX_BLOB_BYTES: '52428800', // 50MB
      BLOBS: {
        put: vi.fn().mockResolvedValue(undefined),
      },
      META: {
        put: vi.fn().mockResolvedValue(undefined),
        get: vi.fn().mockResolvedValue('0'),
      },
    };

    ctx = {
      waitUntil: vi.fn(),
    };

    // Add crypto.getRandomValues if not defined in the environment
    if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
      global.crypto = {
        getRandomValues: (arr) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = Math.floor(Math.random() * 256);
          }
          return arr;
        }
      };
    }
  });

  const createRequest = (options) => {
    const origin = options.origin !== undefined ? options.origin : 'https://obscr.app';
    const body = options.body !== undefined ? options.body : new ArrayBuffer(0);
    const headers = new Headers();
    if (origin !== null) {
      headers.set('origin', origin);
    }
    if (options.ttl) headers.set('X-Obscura-TTL', options.ttl.toString());
    if (options.maxDL) headers.set('X-Obscura-MaxDL', options.maxDL.toString());

    return {
      headers,
      url: 'https://obscr.app/api/upload',
      arrayBuffer: vi.fn().mockResolvedValue(body),
    };
  };

  const createValidPayload = (type = 'OBS1', length = 32) => {
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
    view[0] = 0x4f; // 'O'
    view[1] = 0x42; // 'B'
    view[2] = 0x53; // 'S'
    view[3] = type === 'OBS1' ? 0x31 : 0x32; // '1' or '2'
    return buffer;
  };

  it('returns 403 for forbidden origin', async () => {
    const request = createRequest({ origin: 'https://evil.com' });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('forbidden origin');
  });

  it('returns 400 for empty payload', async () => {
    const request = createRequest({ body: new ArrayBuffer(0) });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('empty payload');
  });

  it('returns 413 for payload too large', async () => {
    const request = createRequest({ body: new ArrayBuffer(50 * 1024 * 1024 + 1) });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(413);
    const data = await response.json();
    expect(data.error).toBe('payload too large');
  });

  it('returns 400 for not an obscura ciphertext', async () => {
    const buffer = new ArrayBuffer(10);
    const view = new Uint8Array(buffer);
    view.set([0x01, 0x02, 0x03, 0x04]); // Invalid magic header
    const request = createRequest({ body: buffer });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('not an obscura ciphertext');
  });

  it('returns 400 for obs1 ciphertext truncated', async () => {
    const buffer = createValidPayload('OBS1', 31); // MIN_OBS1 is 32
    const request = createRequest({ body: buffer });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('obs1 ciphertext truncated');
  });

  it('returns 400 for obs2 ciphertext truncated', async () => {
    const buffer = createValidPayload('OBS2', 107); // MIN_OBS2 is 108
    const request = createRequest({ body: buffer });
    const response = await handleUpload(request, env, ctx);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('obs2 ciphertext truncated');
  });

  it('returns 200 and processes valid OBS1 payload', async () => {
    const buffer = createValidPayload('OBS1', 32);
    const request = createRequest({ body: buffer, maxDL: 3, ttl: 24 });
    const response = await handleUpload(request, env, ctx);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toMatch(/^[a-f0-9]{16}$/);
    expect(data.downloads).toBe(3);
    expect(data.expiresAt).toBeGreaterThan(Date.now());

    expect(env.BLOBS.put).toHaveBeenCalledTimes(1);
    expect(env.BLOBS.put).toHaveBeenCalledWith(
      data.id,
      buffer,
      { httpMetadata: { contentType: "application/octet-stream" } }
    );

    expect(env.META.put).toHaveBeenCalledTimes(2); // One for metadata, one for stats
    expect(env.META.put).toHaveBeenCalledWith(
      data.id,
      expect.any(String),
      expect.any(Object)
    );

    expect(ctx.waitUntil).toHaveBeenCalledTimes(1);
  });
});

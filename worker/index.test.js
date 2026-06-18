import { describe, it, expect } from 'vitest';
import { jerr } from './index.js';

describe('jerr utility', () => {
  it('returns a Response object with correct status and JSON body', async () => {
    const status = 404;
    const message = "Not Found";

    const response = jerr(status, message);

    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(status);

    const data = await response.json();
    expect(data).toEqual({ error: message });
  });

  it('handles default or generic error correctly', async () => {
    const status = 500;
    const message = "Internal Server Error";

    const response = jerr(status, message);

    expect(response.status).toBe(status);
    const data = await response.json();
    expect(data).toEqual({ error: message });
  });

  it('handles missing message', async () => {
    const response = jerr(400);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data).toEqual({ error: undefined });
  });
});

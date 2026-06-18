import { describe, it, expect } from 'vitest';
import { todayUTC } from './index.js';

describe('todayUTC', () => {
  it('returns current date in YYYY-MM-DD format', () => {
    const result = todayUTC();
    // Verify it matches the YYYY-MM-DD regex pattern
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

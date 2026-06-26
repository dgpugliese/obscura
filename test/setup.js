import React from 'react';
import ReactDOM from 'react-dom/client';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Setup React globals since they are used via script tags in the actual app
global.React = React;
global.ReactDOM = ReactDOM;

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock WebCrypto since jsdom doesn't fully support it
if (!global.crypto) {
  global.crypto = {};
}
if (!global.crypto.subtle) {
  global.crypto.subtle = {
    generateKey: vi.fn(),
    exportKey: vi.fn(),
    importKey: vi.fn(),
    encrypt: vi.fn(),
    decrypt: vi.fn(),
    digest: vi.fn(),
  };
}
if (!global.crypto.getRandomValues) {
  global.crypto.getRandomValues = vi.fn((buf) => {
    for (let i = 0; i < buf.length; i++) {
      buf[i] = Math.floor(Math.random() * 256);
    }
    return buf;
  });
}

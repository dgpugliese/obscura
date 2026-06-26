import { vi } from 'vitest'

// Mock React
global.React = {
  useState: vi.fn(),
  useEffect: vi.fn(),
  useRef: vi.fn(),
  useMemo: vi.fn(),
  useCallback: vi.fn(),
  createElement: vi.fn(),
  Fragment: Symbol('Fragment')
}

global.ReactDOM = {
  createRoot: vi.fn(() => ({
    render: vi.fn()
  }))
}

// Ensure tests can run
process.env.NODE_ENV = 'test'

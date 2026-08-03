## 2024-05-27 - Replace `Math.random` with `crypto.getRandomValues` and fix `dangerouslySetInnerHTML` for QR code rendering

**Vulnerability:**
`Math.random()` was being used for random string generation (in `randHex` and animations) and could be predictable. `qrcode.createSvgTag()` was rendered with `dangerouslySetInnerHTML` which could theoretically be an XSS risk.
**Learning:**
`Math.random()` is not a CSPRNG and its state can be predicted. While mostly used for UI and visual parts in `src/app.jsx`, generating predictable strings might be a minor risk if used as an ID. Rendering HTML via `dangerouslySetInnerHTML` directly from library output is a risky pattern.
**Prevention:**
Always use a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) like `window.crypto.getRandomValues()` instead of `Math.random()` when generating random values, even for seemingly cosmetic features. When generating QR codes using the `qrcode-generator` library in React, avoid using `createSvgTag()` paired with `dangerouslySetInnerHTML`. Instead, use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent XSS vulnerabilities.

## 2024-05-24 - Safe QR Code Rendering
**Vulnerability:** XSS risk via `dangerouslySetInnerHTML` when rendering QR code SVGs.
**Learning:** Using `qrcode-generator`'s `createSvgTag()` requires unsafe DOM injection, which is an anti-pattern.
**Prevention:** Use `createDataURL()` and a standard `<img src={...} />` tag for safe rendering.

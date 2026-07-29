## 2026-07-29 - Prevent XSS in QR Code Rendering
**Vulnerability:** XSS vulnerability through QR Code SVG generation using `dangerouslySetInnerHTML`.
**Learning:** `qrcode-generator`'s `createSvgTag()` output was being directly injected into the DOM via React's `dangerouslySetInnerHTML`, which exposes the application to DOM-based XSS if the link contains malicious payloads.
**Prevention:** Always use `qr.createDataURL()` and render it safely using a standard `<img src={...} />` tag instead of injecting raw SVG markup.

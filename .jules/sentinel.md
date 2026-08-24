## 2024-10-24 - Fix XSS Risk in QR Code Generation
**Vulnerability:** XSS risk via `dangerouslySetInnerHTML` combined with `qrcode-generator`'s `createSvgTag()`.
**Learning:** Using `createSvgTag()` requires injecting raw HTML strings which can expose the application to XSS vulnerabilities.
**Prevention:** Use `createDataURL()` to generate a base64 image data URI instead, and render it securely using a standard `<img src={...} />` tag.

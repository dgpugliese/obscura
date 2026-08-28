## 2024-08-28 - [XSS via QR Code SVG Generation]
**Vulnerability:** XSS vulnerability through `qrcode-generator`'s `createSvgTag` being rendered with `dangerouslySetInnerHTML` in `src/app.jsx`.
**Learning:** Using `dangerouslySetInnerHTML` for third-party string generation bypasses React's escaping and introduces a security gap in the React architecture.
**Prevention:** Use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent XSS vulnerabilities.

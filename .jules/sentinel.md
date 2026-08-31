## 2024-08-31 - XSS Risk with QR Code SVG Rendering
**Vulnerability:** React component used `dangerouslySetInnerHTML` to render SVG strings from `qrcode-generator`.
**Learning:** Using `createSvgTag` and inserting it via `dangerouslySetInnerHTML` exposes the app to XSS if the QR data contains malicious payload, which was unnecessary since standard image tags can achieve the same result.
**Prevention:** Use `createDataURL()` and a standard `<img src={...} />` tag instead.

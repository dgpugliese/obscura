## 2024-05-23 - Prevent XSS in QR Code Generation
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` used to render SVG strings from `qrcode-generator`.
**Learning:** Using `createSvgTag()` with `dangerouslySetInnerHTML` exposes the application to XSS. It's safer to avoid raw DOM injection when alternatives exist.
**Prevention:** Use `createDataURL(5, 2)` instead of `createSvgTag()` and render the output safely via `<img src={...} />`.

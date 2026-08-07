## 2024-05-24 - XSS in React QR Code Generation
**Vulnerability:** Using `dangerouslySetInnerHTML` with `createSvgTag()` for QR codes.
**Learning:** Using raw SVG string insertion via `dangerouslySetInnerHTML` exposes React applications to DOM-based XSS if the QR code library fails to sanitize inputs correctly or if the URL payload becomes user-controlled.
**Prevention:** Always use safe primitives like `createDataURL()` and standard `<img src={...} />` tags instead of `dangerouslySetInnerHTML` when rendering generated QR codes.

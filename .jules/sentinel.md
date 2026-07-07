## 2025-02-14 - Fix XSS in QR Code Generation
**Vulnerability:** The QR code generation used `createSvgTag()` and inserted it via `dangerouslySetInnerHTML`.
**Learning:** Using `dangerouslySetInnerHTML` with third-party generated SVG tags can expose the application to DOM-based XSS, as malicious payloads in the SVG can be executed.
**Prevention:** Always use safe rendering methods like `createDataURL()` and `<img>` tags instead of directly setting raw HTML/SVG content.

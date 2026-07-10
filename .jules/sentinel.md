## 2024-07-10 - Fix XSS in QR Code Generation
**Vulnerability:** QR code generation used `qr.createSvgTag()` paired with `dangerouslySetInnerHTML`.
**Learning:** Rendering SVG string tags dynamically created from third-party libraries (even if it's just user input fed into it, like a link) via `dangerouslySetInnerHTML` is an XSS vector in React if the library's output is not properly sanitized.
**Prevention:** Use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent DOM-based XSS vulnerabilities.

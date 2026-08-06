## 2024-10-24 - Prevent XSS in QR Code Generation
**Vulnerability:** The application used `qrcode-generator`'s `createSvgTag()` and rendered the output via React's `dangerouslySetInnerHTML`, introducing a DOM-based XSS vulnerability.
**Learning:** Using `dangerouslySetInnerHTML` to render HTML string outputs from libraries bypasses React's built-in XSS protections.
**Prevention:** Use `createDataURL()` to generate a base64 image and safely render it using an `<img src={...} />` element.
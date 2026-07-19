## 2024-07-19 - Prevent XSS in QR Code Generation
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` when rendering SVG QR codes.
**Learning:** Using `dangerouslySetInnerHTML` with output from external libraries like `qrcode-generator` can expose the application to DOM-based XSS, even if it seems safe.
**Prevention:** Avoid `dangerouslySetInnerHTML` when possible. Use `createDataURL()` instead of `createSvgTag()` and render the output safely via the `src` attribute of an standard `<img>` tag.

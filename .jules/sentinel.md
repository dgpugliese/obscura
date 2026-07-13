## 2024-07-13 - Prevent XSS in QR Code Generation
**Vulnerability:** The application used `qrcode-generator`'s `createSvgTag()` paired with React's `dangerouslySetInnerHTML` to render QR codes.
**Learning:** Using `dangerouslySetInnerHTML` with unsanitized SVG content can introduce Cross-Site Scripting (XSS) vulnerabilities if the QR code payload is maliciously crafted.
**Prevention:** Use `createDataURL()` and render it safely using a standard `<img src={...} />` tag instead of injecting raw HTML/SVG into the DOM.

## 2025-01-21 - Fix XSS in QR Code Generation
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` when rendering QR codes using `createSvgTag`.
**Learning:** Using `dangerouslySetInnerHTML` with dynamically generated SVGs can introduce DOM-based XSS vulnerabilities if the input isn't strictly controlled, even if it comes from a library like `qrcode-generator`.
**Prevention:** Use `createDataURL(5, 2)` to generate a base64 encoded data URI and render it safely using a standard `<img src={...} />` tag instead of injecting raw SVG markup.

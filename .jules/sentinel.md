## 2024-05-30 - Prevent XSS in QR Code Generation
**Vulnerability:** XSS vulnerability via dangerouslySetInnerHTML and SVG string generation in the qrcode-generator library.
**Learning:** Using `qr.createSvgTag()` alongside React's `dangerouslySetInnerHTML` opens the application up to DOM-based XSS attacks if the input link is maliciously crafted.
**Prevention:** Use `qr.createDataURL()` to generate a base64 encoded data URI and render it safely using a standard `<img src={...} />` element.

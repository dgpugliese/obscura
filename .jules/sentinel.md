## 2025-02-23 - Prevent XSS in QR Code Generation
**Vulnerability:** Used `dangerouslySetInnerHTML` with `qr.createSvgTag()` from `qrcode-generator`, which could lead to XSS.
**Learning:** The `qrcode-generator` library's `createSvgTag` can expose XSS vectors if the payload or its output is rendered using `dangerouslySetInnerHTML` in React.
**Prevention:** Use `qr.createDataURL()` to generate a base64 Data URL and render it safely in a standard `<img src={...} />` tag.

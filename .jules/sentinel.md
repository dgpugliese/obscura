## 2024-05-24 - Prevent XSS in QR Code Generation
**Vulnerability:** Used `dangerouslySetInnerHTML` with `createSvgTag()` to render QR codes in React.
**Learning:** The `qrcode-generator` library's SVG output combined with `dangerouslySetInnerHTML` introduces a Cross-Site Scripting (XSS) risk if the input string is tampered with.
**Prevention:** Use `createDataURL()` to generate a base64 encoded image and render it safely using a standard `<img src={...} />` tag instead of injecting raw HTML.
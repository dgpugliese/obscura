## 2024-07-15 - [XSS via QR Code SVG rendering]
**Vulnerability:** XSS vulnerability via QR code generation using `dangerouslySetInnerHTML` and `createSvgTag`.
**Learning:** Using `dangerouslySetInnerHTML` with dynamically generated SVG content, especially from user-controllable links, can lead to XSS.
**Prevention:** Use `createDataURL()` and a standard `<img src={...} />` tag instead.

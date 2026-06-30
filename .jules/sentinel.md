## 2024-10-18 - XSS in QR Code Rendering
**Vulnerability:** XSS vulnerability through SVG generation in `dangerouslySetInnerHTML`.
**Learning:** Generating SVG tags using `createSvgTag()` from `qrcode-generator` and rendering them via `dangerouslySetInnerHTML` introduces XSS risks.
**Prevention:** Use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent XSS vulnerabilities.

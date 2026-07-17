## 2024-05-24 - React QR Code XSS Prevention
**Vulnerability:** Used `dangerouslySetInnerHTML` with `qrcode-generator`'s `createSvgTag()` to render QR codes in React, exposing a potential Cross-Site Scripting (XSS) vector if input is not fully sanitized.
**Learning:** Using `dangerouslySetInnerHTML` for seemingly safe generated SVG strings is risky and violates defense-in-depth principles. Webpack/Esbuild configurations or libraries may change, making previously safe strings unsafe.
**Prevention:** Use safer alternatives natively supported by the library, such as `createDataURL(cellSize, margin)` to generate base64 images and render them safely using an `<img src={...} />` tag instead.

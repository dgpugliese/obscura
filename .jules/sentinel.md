## 2024-05-18 - Fix XSS Vulnerability in QR Code Rendering
**Vulnerability:** The application used `qrcode-generator`'s `createSvgTag()` and rendered the output using `dangerouslySetInnerHTML` in `src/app.jsx`.
**Learning:** Using `dangerouslySetInnerHTML` with dynamically generated SVG content introduces potential Cross-Site Scripting (XSS) risks and violates secure rendering practices.
**Prevention:** Use `createDataURL(5, 2)` from the QR code generator library and render it safely using a standard `<img src={...} />` tag instead of injecting raw HTML/SVG strings.

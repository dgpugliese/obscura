## 2025-02-27 - [Fix XSS in QR Code Generation]
**Vulnerability:** The application was using `dangerouslySetInnerHTML` to render SVG QR codes created by `qrcode-generator`'s `createSvgTag()`.
**Learning:** `createSvgTag()` output can potentially be manipulated or be unsafe if not fully sanitized, and using it with React's `dangerouslySetInnerHTML` creates an XSS vulnerability vector.
**Prevention:** Avoid using `dangerouslySetInnerHTML` with `createSvgTag()`. Instead, generate a data URL using `createDataURL()` and render it safely using a standard `<img src={...} />` tag.
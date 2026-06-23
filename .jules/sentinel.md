## 2025-02-20 - [XSS vulnerability in QR Code rendering]
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` when rendering SVG QR codes via `qrcode-generator`'s `createSvgTag()`.
**Learning:** `createSvgTag()` generates raw HTML strings that, if rendered with `dangerouslySetInnerHTML`, bypass React's standard sanitization. Though the URL may appear safe, any modification or edge case might inject arbitrary SVG tags (like `<script>`).
**Prevention:** Avoid `dangerouslySetInnerHTML`. Use `qrcode-generator`'s `createDataURL()` to generate a base64 encoded string and render it safely using a standard `<img src={...} />` component.

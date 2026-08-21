## 2026-08-21 - Fix XSS vulnerability in QR code generation
**Vulnerability:** The `app.jsx` component used `qrcode-generator` to generate an SVG, which was then injected into the DOM using `dangerouslySetInnerHTML`. This could theoretically allow XSS if the underlying QR code payload or library behaved maliciously.
**Learning:** `dangerouslySetInnerHTML` combined with SVG payloads poses a systemic risk. The `createDataURL()` method of the `qrcode` library combined with a safe `<img>` tag is a fundamentally safer and functionally identical approach.
**Prevention:** Avoid `createSvgTag()` and `dangerouslySetInnerHTML` for generating graphics from user or external input; use `createDataURL()` and `src` attributes on images instead.

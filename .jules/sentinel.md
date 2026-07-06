## 2026-07-06 - XSS vulnerability in QR code rendering
**Vulnerability:** XSS vulnerability due to using `qr.createSvgTag()` with `dangerouslySetInnerHTML`.
**Learning:** Using `dangerouslySetInnerHTML` with dynamically generated SVG tags can expose the application to XSS if the underlying library or input isn't fully sanitized.
**Prevention:** Always use safe rendering methods, such as `createDataURL()` with an `<img src={...} />` tag, instead of injecting raw HTML/SVG.

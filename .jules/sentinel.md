## 2024-05-20 - Prevent XSS in QR Code Rendering
**Vulnerability:** Usage of `dangerouslySetInnerHTML` with `qr.createSvgTag()` in React component.
**Learning:** Using `dangerouslySetInnerHTML` for SVG tags from third-party libraries introduces DOM-based XSS vectors. Rendering as DataURL via `<img>` tag avoids this entirely.
**Prevention:** Avoid `dangerouslySetInnerHTML` for QR codes; prefer `createDataURL(5, 2)` and standard `<img src={...} />` tags.

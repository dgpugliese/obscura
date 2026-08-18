## 2024-05-18 - Prevent XSS in QR Code Generation
**Vulnerability:** Used `dangerouslySetInnerHTML` with `qrcode-generator`'s `createSvgTag()`.
**Learning:** Even with mostly-controlled data, rendering raw HTML/SVG strings via `dangerouslySetInnerHTML` opens up XSS risks if data flow changes.
**Prevention:** Use `createDataURL(5, 2)` and pass the output to an `<img src={...} />` tag to safely render QR codes without evaluating HTML.

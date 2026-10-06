## 2023-10-06 - XSS vulnerability via SVG injection in qrcode
**Vulnerability:** Found `qrcode-generator` output `qr.createSvgTag()` being dangerously set in `src/app.jsx` via `dangerouslySetInnerHTML`. While the input is currently just a link, it's safer to avoid this pattern entirely to prevent XSS.
**Learning:** `dangerouslySetInnerHTML` combined with dynamically generated SVGs, even from trusted sources or internal state, should be avoided if safer alternatives exist.
**Prevention:** Use `createDataURL()` instead of `createSvgTag()` and render as an `<img />` tag when using `qrcode-generator` in React.

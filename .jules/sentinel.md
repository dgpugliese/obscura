## 2024-05-15 - Prevent XSS in QR Code Generation
**Vulnerability:** The application used `dangerouslySetInnerHTML` with `createSvgTag` from the `qrcode-generator` library to render QR codes.
**Learning:** Using `dangerouslySetInnerHTML` to render generated SVGs can introduce DOM-based Cross-Site Scripting (XSS) vulnerabilities if the generated SVG content isn't strictly sanitized, especially when dealing with links that could be manipulated.
**Prevention:** Use `createDataURL(5, 2)` instead of `createSvgTag()` and render the output safely using a standard `<img src={...} />` tag.

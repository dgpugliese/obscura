## 2024-05-24 - Prevent XSS in QR Code Generation
**Vulnerability:** Using `createSvgTag()` with `dangerouslySetInnerHTML` to render QR codes introduces an XSS risk if the QR code data is maliciously crafted.
**Learning:** Libraries generating SVG markup often do not escape embedded strings properly. Passing this through `dangerouslySetInnerHTML` bypasses React's XSS protections.
**Prevention:** Always use `createDataURL()` to generate an image source and render it via a standard `<img src={...} />` tag instead of injecting raw SVG.

## 2024-05-18 - Fix XSS Vulnerability in QR Code Rendering
**Vulnerability:** XSS vulnerability through the use of `dangerouslySetInnerHTML` when rendering QR codes using the `qrcode-generator` library.
**Learning:** The frontend used `createSvgTag` which outputs a raw SVG string, leading to the unsafe use of `dangerouslySetInnerHTML` to render it in React.
**Prevention:** Always use safe methods like `createDataURL` which can be safely embedded in a standard `<img>` tag without relying on unsafe DOM manipulation like `dangerouslySetInnerHTML`.
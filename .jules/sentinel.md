## 2026-06-21 - [Prevent XSS in QR Code Generation]
**Vulnerability:** XSS vulnerability via React's `dangerouslySetInnerHTML`.
**Learning:** Generating QR codes using `createSvgTag()` and injecting the SVG string directly into the DOM using `dangerouslySetInnerHTML` poses a potential Cross-Site Scripting (XSS) risk, even if the third-party library is assumed safe. This pattern bypasses React's built-in XSS protections.
**Prevention:** Always prefer generating a Data URL representation of the QR code (e.g., using `createDataURL()`) and rendering it safely using a standard `<img src={...} />` element. This approach provides defense-in-depth by eliminating the direct parsing and execution of arbitrary DOM nodes.

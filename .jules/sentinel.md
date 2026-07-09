## 2024-05-18 - Fix XSS in QR Code Rendering
**Vulnerability:** XSS via innerHTML when rendering QR Code
**Learning:** Using `dangerouslySetInnerHTML` with `createSvgTag` allows XSS if an attacker controls the SVG output or injects malicious elements. Even though the QR generation library is trusted and the `link` might be controlled, it's safer to avoid parsing SVG via innerHTML.
**Prevention:** Use `createDataURL()` and a standard `<img src={...} />` tag instead of `createSvgTag()` and `dangerouslySetInnerHTML`.

## 2024-06-22 - XSS via dangerouslySetInnerHTML in qrcode-generator
**Vulnerability:** A Cross-Site Scripting (XSS) vulnerability was found when using `qrcode-generator`'s `createSvgTag()` directly rendered with React's `dangerouslySetInnerHTML`.
**Learning:** `dangerouslySetInnerHTML` accepts arbitrary HTML, which could allow malicious payload injection if the SVG structure or data isn't perfectly sanitized. It's an unsafe practice for displaying images like QR codes when simpler, safer alternatives exist.
**Prevention:** Avoid `createSvgTag()` paired with `dangerouslySetInnerHTML`. Instead, use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent XSS vulnerabilities.

## 2024-10-24 - Fix XSS vulnerability in QR code generation
**Vulnerability:** XSS vulnerability associated with qrcode library's createSvgTag() via dangerouslySetInnerHTML.
**Learning:** Generating SVG tags and setting them via dangerouslySetInnerHTML exposes the app to XSS risks.
**Prevention:** Use createDataURL() paired with a standard img tag instead.

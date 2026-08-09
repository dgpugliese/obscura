## 2024-05-23 - Fix XSS in QR Code Rendering
**Vulnerability:** XSS vulnerability through the use of dangerouslySetInnerHTML and qrcode.createSvgTag.
**Learning:** Rendering SVG strings via dangerouslySetInnerHTML without sanitization opens up XSS vectors if inputs are manipulated.
**Prevention:** Use createDataURL() and standard img tags instead of dangerouslySetInnerHTML.

## 2024-07-14 - XSS vulnerability in QR Code rendering
**Vulnerability:** Using dangerouslySetInnerHTML to render SVG strings for QR codes, creating an XSS vector
**Learning:** Using qrcode-generator's createSvgTag and rendering raw HTML enables potential DOM-based XSS attacks
**Prevention:** Always use createDataURL and render the QR code using a safe <img src={...} /> tag

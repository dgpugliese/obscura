## 2024-05-30 - Prevent XSS in QR Code Rendering
**Vulnerability:** XSS vulnerability via dangerouslySetInnerHTML when rendering QR codes using createSvgTag().
**Learning:** Using createSvgTag paired with dangerouslySetInnerHTML allows potential injection of malicious SVG content.
**Prevention:** Use createDataURL(5, 2) and render it safely using a standard `<img src={...} />` tag instead.

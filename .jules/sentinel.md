## 2024-05-24 - Fix XSS in QR Code Generation
**Vulnerability:** XSS vulnerability via dangerouslySetInnerHTML in QR code rendering using createSvgTag.
**Learning:** Using createSvgTag paired with dangerouslySetInnerHTML for QR codes introduces a potential Cross-Site Scripting vector.
**Prevention:** Use createDataURL() and render it safely using a standard img tag with src attribute instead.

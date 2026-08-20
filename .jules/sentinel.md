## 2024-08-20 - QR Code Generation XSS Vector
**Vulnerability:** XSS vulnerability through dangerouslySetInnerHTML when generating QR codes via createSvgTag().
**Learning:** qrcode-generator's createSvgTag returns raw markup which, when rendered with dangerouslySetInnerHTML, bypasses React's XSS protections and allows malicious links to inject scripts.
**Prevention:** Always use createDataURL() combined with standard <img src={...} /> tags for safe QR code rendering without relying on raw DOM insertion.
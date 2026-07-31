## 2026-07-31 - React QR Code XSS Vulnerability
**Vulnerability:** XSS vulnerability via qrcode-generator's createSvgTag() paired with dangerouslySetInnerHTML.
**Learning:** In React, using dangerouslySetInnerHTML to render SVGs from external libraries like qrcode-generator can introduce XSS if the input is not sanitized.
**Prevention:** Use createDataURL() with positional arguments (e.g., qr.createDataURL(5, 2)) and render it safely using a standard `<img src={...} />` tag instead of dangerouslySetInnerHTML.

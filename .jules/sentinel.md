## 2024-09-04 - Fix XSS in QR Code Generation
**Vulnerability:** Used dangerouslySetInnerHTML with createSvgTag() to render QR codes.
**Learning:** Even generated SVGs from libraries can be unsafe if not explicitly sanitized, leading to potential DOM-based XSS when mixed with dangerouslySetInnerHTML.
**Prevention:** Use createDataURL() and render via a standard <img src={...} /> tag instead of injecting raw HTML.
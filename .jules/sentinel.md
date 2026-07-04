## 2024-07-04 - Fix XSS in qrcode-generator
**Vulnerability:** XSS vulnerability through qrcode-generator's createSvgTag() paired with dangerouslySetInnerHTML.
**Learning:** Using dangerouslySetInnerHTML with generated SVG content can lead to XSS if the underlying library or input allows script injection.
**Prevention:** Use createDataURL() and render using a standard img tag instead of relying on raw HTML injection.

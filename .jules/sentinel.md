## 2024-05-18 - XSS in QR Code Rendering
**Vulnerability:** Cross-Site Scripting (XSS) vulnerability due to rendering QR code SVG with dangerouslySetInnerHTML.
**Learning:** Using dangerouslySetInnerHTML with untrusted or complex generated content (like qrcode-generator's createSvgTag) can introduce XSS if the underlying library or input isn't fully safe.
**Prevention:** Always prefer safe data bindings. Use createDataURL() and a standard <img> tag instead of dangerouslySetInnerHTML when generating images.

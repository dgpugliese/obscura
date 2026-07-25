## 2024-07-25 - [XSS via QR Code Generation]
**Vulnerability:** XSS vulnerability by using dangerouslySetInnerHTML with createSvgTag from qrcode-generator.
**Learning:** qrcode-generator's createSvgTag can generate SVG strings that, when rendered via dangerouslySetInnerHTML, could allow XSS if the QR code payload is maliciously crafted.
**Prevention:** Use createDataURL(5, 2) and render it with a standard <img src={...} /> tag.

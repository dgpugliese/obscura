## 2024-07-30 - XSS via qrcode-generator
**Vulnerability:** XSS risk from using qrcode-generator's createSvgTag() with React's dangerouslySetInnerHTML.
**Learning:** Using SVG tags directly for QR codes in React components can introduce XSS risks if malicious data is encoded, and dangerouslySetInnerHTML should be avoided for generated assets.
**Prevention:** Always use createDataURL() paired with a standard <img src={...} /> tag for rendering QR codes safely.

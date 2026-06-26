## 2024-06-26 - XSS vulnerability in QR code rendering
**Vulnerability:** Cross-Site Scripting (XSS) via `dangerouslySetInnerHTML` rendering `qrcode-generator` SVG output.
**Learning:** `dangerouslySetInnerHTML` combined with dynamically generated SVG output from libraries can introduce XSS risk, particularly when the library output lacks sanitization guarantees or allows arbitrary attributes.
**Prevention:** Always use a secure approach for generating and rendering user-controlled content, such as generating Data URLs (`createDataURL()`) and rendering them safely using standard elements like `<img src={...} />`.

## 2025-02-28 - [High] Prevent XSS via dangerouslySetInnerHTML in QR codes
**Vulnerability:** XSS risk due to rendering SVG string from qrcode-generator using dangerouslySetInnerHTML, which could allow malicious payload execution if the input URL/link is manipulated.
**Learning:** Generating raw SVGs with qrcode-generator and rendering them unchecked in the DOM can bypass standard React sanitization, enabling Cross-Site Scripting via `<svg>` content injection.
**Prevention:** Always use safe rendering mechanisms like `qr.createDataURL()` and `img src={...}` instead of `dangerouslySetInnerHTML` when generating and rendering QR codes from untrusted inputs.

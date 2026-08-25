## 2024-07-24 - QR Code XSS Vulnerability
**Vulnerability:** XSS via `qrcode-generator`'s `createSvgTag()` paired with React's `dangerouslySetInnerHTML` when generating QR codes.
**Learning:** The `qrcode-generator` output should not be trusted directly in `dangerouslySetInnerHTML` since using SVG rendering requires risky raw HTML injection which may contain malicious payloads if the input link is tampered with.
**Prevention:** Always use `qr.createDataURL()` and render it safely using a standard `<img src={...} />` tag instead of injecting raw HTML strings.

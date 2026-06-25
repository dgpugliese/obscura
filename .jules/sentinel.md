## 2024-05-18 - [XSS] Fix XSS Vulnerability in QR Code Generation
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` with `qr.createSvgTag()`.
**Learning:** The previous implementation used `qr.createSvgTag()` from the `qrcode-generator` library and rendered it via React's `dangerouslySetInnerHTML`. This posed a Cross-Site Scripting (XSS) risk if the QR code data contained malicious payloads.
**Prevention:** Avoid using `dangerouslySetInnerHTML` when generating SVG strings. Instead, use `qr.createDataURL()` to get a base64 encoded data URL and render it using a standard `<img>` tag with the `src` attribute. This inherently prevents any script execution within the rendered code.

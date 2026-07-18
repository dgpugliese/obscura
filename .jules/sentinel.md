## 2024-05-24 - Cross-Site Scripting (XSS) via QR Code Generation
**Vulnerability:** The `HeroDone` component generated QR codes using `createSvgTag()` and injected them directly into the DOM using `dangerouslySetInnerHTML`, creating a potential XSS vulnerability if the encoded URL contained malicious payloads.
**Learning:** Using `dangerouslySetInnerHTML` with third-party generated SVG strings can bypass React's built-in XSS protections.
**Prevention:** Always use safe rendering methods for generated assets, such as using `createDataURL()` and rendering via standard `<img src={...} />` tags instead of injecting raw markup.

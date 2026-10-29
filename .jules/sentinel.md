## 2024-10-29 - [Fix Cross-Site Scripting (XSS) via SVG injection]
**Vulnerability:** The QR code generation used `createSvgTag()` and rendered the output directly into the DOM using `dangerouslySetInnerHTML`.
**Learning:** This React anti-pattern can allow XSS if malicious input is injected into the SVG generation process.
**Prevention:** Avoid `dangerouslySetInnerHTML`. Use `createDataURL()` and render safely with an `<img>` tag where the src is the data URL.

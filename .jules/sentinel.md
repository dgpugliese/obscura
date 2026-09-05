## 2024-10-24 - Prevent XSS in QR Code Rendering
**Vulnerability:** The application used `qrcode-generator`'s `createSvgTag` and rendered the resulting string directly into the DOM using `dangerouslySetInnerHTML`.
**Learning:** Using `dangerouslySetInnerHTML` with third-party generated HTML/SVG strings opens the application up to potential Cross-Site Scripting (XSS) attacks, particularly if user-controlled input (like links) is encoded or if the library's output is unexpectedly manipulated.
**Prevention:** Use `createDataURL()` which generates a base64 encoded image (e.g. `data:image/gif;base64,...`) and render it safely using a standard `<img src={...} />` tag instead of injecting raw markup.

## 2024-05-01 - Avoid dangerouslySetInnerHTML with qrcode-generator
**Vulnerability:** XSS vulnerability through SVG generation with dangerouslySetInnerHTML.
**Learning:** The qrcode-generator's `createSvgTag()` is unsafe when injected directly into the DOM using React's `dangerouslySetInnerHTML`.
**Prevention:** Use `createDataURL()` and render it safely using a standard `<img src={...} />` tag to prevent XSS.

## 2024-05-23 - XSS in QR Code Generation via dangerouslySetInnerHTML
**Vulnerability:** Cross-Site Scripting (XSS) vulnerability caused by rendering QR code SVG directly using `dangerouslySetInnerHTML`.
**Learning:** Using `qrcode-generator` with `createSvgTag` and inserting it via `dangerouslySetInnerHTML` is unsafe, as the generated SVG string could contain malicious payloads if the data is attacker-controlled.
**Prevention:** Generate QR codes as Data URLs using `createDataURL(5, 2)` and render them safely using a standard `<img src={...} />` tag instead of inserting raw HTML strings into the DOM.

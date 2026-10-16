## 2024-10-16 - Prevent DOM XSS in QR Code Rendering
**Vulnerability:** The QR code generation used `createSvgTag` from the `qrcode` library and rendered it via `dangerouslySetInnerHTML`. An attacker who controls the `link` variable could craft a malicious payload to inject scripts into the DOM.
**Learning:** `dangerouslySetInnerHTML` is extremely prone to Cross-Site Scripting (XSS). User inputs or data derived from external sources should never be passed to `dangerouslySetInnerHTML`.
**Prevention:** Instead of generating SVG strings and passing them to `dangerouslySetInnerHTML`, use safer API alternatives, such as generating a data URL with `createDataURL()` and passing it to the `src` attribute of an `<img>` tag.

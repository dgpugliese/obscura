## 2026-07-21 - [XSS via InnerHTML and React dangerouslySetInnerHTML]
**Vulnerability:** [XSS vulnerability in status page incidents clearing (innerHTML) and React QR code rendering (dangerouslySetInnerHTML).]
**Learning:** [Using innerHTML for clearing elements or dangerouslySetInnerHTML for SVG strings allows DOM-based XSS if the content isn't properly sanitized. It bypassed normal React escaping.]
**Prevention:** [Always use textContent for clearing DOM elements. For QR codes, generate data URLs (createDataURL) and render via safe <img> tags instead of injecting raw SVG markup.]

## 2026-11-05 - Prevent XSS in QR Code Generation
**Vulnerability:** The application used `qrcode-generator` to generate an SVG string and rendered it using Reacts `dangerouslySetInnerHTML`. If the QR code content or the library output is somehow manipulated, this could lead to Cross-Site Scripting (XSS).
**Learning:** `dangerouslySetInnerHTML` should always be avoided unless absolutely necessary, and especially when dealing with data processed by external libraries that might not guarantee perfectly safe HTML/SVG output.
**Prevention:** Use safer alternatives for data representation. For QR codes, generating a Base64 encoded Data URL (`createDataURL`) and rendering it safely as the `src` of a standard `<img />` tag completely mitigates the XSS risk associated with raw HTML/SVG insertion.

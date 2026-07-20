## 2024-07-20 - XSS in QR Code Generation
**Vulnerability:** XSS vulnerability through `dangerouslySetInnerHTML` when generating QR codes with `createSvgTag`.
**Learning:** Using `createSvgTag` combined with `dangerouslySetInnerHTML` allows malicious SVG payloads to execute scripts in the context of the React application.
**Prevention:** Always use `createDataURL()` and a standard `<img src={...} />` tag instead of injecting raw SVG markup directly into the DOM.

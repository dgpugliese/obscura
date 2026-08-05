## 2024-08-05 - Prevent XSS in qrcode-generator
**Vulnerability:** Usage of `dangerouslySetInnerHTML` paired with `qr.createSvgTag()` from `qrcode-generator` creates an XSS vulnerability vector.
**Learning:** The `qrcode-generator` output should not be trusted directly into HTML unless appropriately sanitized or rendered differently.
**Prevention:** Always use `qr.createDataURL(5, 2)` and safely render it using an standard `<img src={...} />` element.

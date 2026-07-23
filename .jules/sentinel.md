## 2024-05-24 - Fix XSS sinks in status.js and app.jsx
**Vulnerability:** The application used `innerHTML` in `status.js` to clear an element, and `dangerouslySetInnerHTML` in `app.jsx` to render SVG strings.
**Learning:** `innerHTML` and `dangerouslySetInnerHTML` bypass built-in XSS protections. Using them introduces unnecessary XSS sinks, even when clearing elements or rendering dynamic content from seemingly safe libraries.
**Prevention:** Always use safe methods like `textContent` for clearing/updating text, and generate Data URLs to render dynamic images via standard `<img>` tags instead of injecting raw HTML/SVG strings.

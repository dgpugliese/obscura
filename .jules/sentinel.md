## 2026-06-26 - Prevent DOM-based XSS by replacing innerHTML with textContent
**Vulnerability:** Use of innerHTML to clear elements can introduce XSS if future modifications inject untrusted data into the assignment.
**Learning:** Even safe usage of innerHTML (like setting it to an empty string) establishes a risky pattern that can easily be broken by future code modifications, potentially leading to DOM-based XSS.
**Prevention:** Use textContent instead of innerHTML when dynamically setting the text of an element or when clearing an element's content to enforce secure, safe escaping.

# Security Policy

OBSCURA is a small, public-source, zero-knowledge file-transfer project. It has
not been independently security-audited, and it is not appropriate for regulated
data such as HIPAA, PCI, CJIS, classified, or data requiring a BAA/SLA.

## Reporting a vulnerability

Email **security@obscr.app** with:

- A short description of the issue.
- Steps to reproduce.
- The affected URL, commit, or file path if known.
- Whether you believe plaintext, keys, share IDs, or metadata can be exposed.

Please do not include real secrets, member data, payment data, or illegal
content in reports. Use synthetic files and redact anything sensitive.

## Expected response

This is an operator-run project, not a staffed SaaS. I will make a best effort
to acknowledge credible reports within 7 days and publish fixes or disclosures
when the issue is confirmed.

## Scope

In scope:

- Browser crypto flow in `src/app.jsx`.
- Cloudflare Worker API in `worker/index.js`.
- Security headers, CSP, retention, and transparency behavior.

Out of scope:

- Cloudflare platform vulnerabilities.
- Social engineering.
- Denial-of-service testing beyond light rate-limit validation.
- Reports requiring access to another user's live share.

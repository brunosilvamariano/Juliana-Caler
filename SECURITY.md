# Security Policy

## Scope
This repository is a static front-end foundation. It does not by itself provide authentication, authorization, a database, server-side validation, payment processing or secret management.

## Rules
- Never commit API keys, passwords, tokens, private keys or production credentials.
- Treat every future form/API integration as untrusted input and validate on the server.
- Keep third-party libraries reviewed and updated deliberately.
- Use HTTPS in production.
- Configure security headers at the hosting layer (CSP, HSTS where appropriate, `X-Content-Type-Options`, `Referrer-Policy`, and a suitable `Permissions-Policy`).
- Restrict external origins in CSP to the minimum required by the deployed project.
- Do not place confidential data in HTML, JavaScript, JSON, query strings or public assets.

## Reporting
Security issues should be reported privately to the project owner. Do not publish exploitable details before a fix is available.

## Deployment note
Security headers and server controls cannot be guaranteed by this static source tree alone; they must be configured in the final hosting environment.

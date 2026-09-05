# Production Release Checklist

## Ownership & legal
- [ ] Project/client agreement defines IP and usage rights.
- [ ] `LICENSE`, `COPYRIGHT.md` and `THIRD_PARTY_NOTICES.md` reviewed.
- [ ] New libraries/assets/fonts have documented licenses.
- [ ] Client owns or has permission for supplied content.

## Content & SEO
- [ ] `<title>` and meta description are final.
- [ ] Canonical, Open Graph, social image and structured data are added only with final production URLs/data.
- [ ] Favicon/manifest metadata match the final brand.
- [ ] Heading hierarchy and image alt text match final content.

## Accessibility
- [ ] Keyboard-only navigation tested.
- [ ] Focus visibility tested.
- [ ] 200%/400% zoom and mobile reflow tested.
- [ ] Reduced-motion tested.
- [ ] Color contrast checked after final palette/content.
- [ ] Accordion/carousel/sidebar states tested with assistive technology where possible.

## Security & privacy
- [ ] No secrets or private data in public files.
- [ ] HTTPS enabled.
- [ ] Hosting security headers configured.
- [ ] Forms/APIs validate server-side if introduced.
- [ ] LGPD/privacy/cookie requirements reviewed if personal data or tracking is introduced.

## Quality
- [ ] `python scripts/audit-html.py` passes.
- [ ] All JavaScript passes syntax validation.
- [ ] JSON files parse successfully.
- [ ] Local asset references resolve.
- [ ] Responsive behavior checked on representative viewport sizes.
- [ ] External links and WhatsApp destinations checked.
- [ ] Performance checked with production assets.

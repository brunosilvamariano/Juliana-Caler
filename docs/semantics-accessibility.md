# Semantics & Accessibility Baseline

## Landmark structure
The current page uses semantic landmarks without changing the visual architecture:
- `header` for mobile navigation and contextual topbar;
- `aside` for the persistent sidebar;
- `nav` for primary/footer/social navigation;
- one `main` for primary page content;
- `section` for named page regions;
- `footer` for site closing information.

## Content semantics
- Exactly one `h1` is used in the Hero.
- Major sections use `h2`; component/card titles use `h3` where appropriate.
- Repeated independent service/project/FAQ entries use `article`.
- `figure` é usado quando a mídia constitui uma unidade editorial autônoma; wrappers puramente estruturais podem permanecer como `div`.
- The About statement uses `blockquote`.
- Interactive actions use native `a` or `button` elements instead of clickable generic containers.

## Accessibility behavior
- Skip link targets `#main-content`.
- Decorative images/icons use empty `alt` and/or `aria-hidden`.
- Meaningful images have alternative text and intrinsic dimensions.
- FAQ triggers expose `aria-expanded` and `aria-controls`; answers are labelled regions.
- About carousel tabs/panels are linked with ARIA state.
- Sidebar toggle exposes expanded state and controlled element.
- Motion honors `prefers-reduced-motion`.

## Important limitation
Semantic HTML is only one part of accessibility. Final projects still require keyboard, zoom/reflow, contrast, screen-reader and real-content testing after client content, colors and integrations are applied.

/**
 * HERO — Variant engine only.
 * Motion is centralized in js/core/motion-engine.js.
 *
 * Active variants are intentionally curated. Add a new variant only after
 * desktop/tablet/mobile validation and registry/documentation updates.
 */
(function initHeroVariantEngine() {
  "use strict";

  const hero = document.querySelector("[data-hero-editorial]");
  if (!hero) return;

  const variants = new Set([
    "organic",
    "diagonal",
    "split",
    "arch",
    "banner"
  ]);

  const params = new URLSearchParams(window.location.search);
  const previewVariant = params.get("hero");

  if (previewVariant && variants.has(previewVariant)) {
    hero.dataset.heroVariant = previewVariant;
  }

  hero.dataset.heroVariant = variants.has(hero.dataset.heroVariant)
    ? hero.dataset.heroVariant
    : "organic";
})();

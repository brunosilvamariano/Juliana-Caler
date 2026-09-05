/**
 * SERVIÇOS — Curated Premium Pack
 * ---------------------------------------------------------
 * Query string é somente preview; HTML continua sendo a fonte
 * da variante permanente.
 *
 * premium-cards:
 * - rail horizontal sem autoplay;
 * - scroll snap nativo;
 * - touch/trackpad nativos;
 * - drag por mouse;
 * - navegação por botões e setas do teclado;
 * - progresso e estado dos controles sincronizados ao scroll.
 */
(() => {
  const section = document.querySelector("[data-services-editorial]");
  if (!section) return;

  const serviceVariants = new Set([
    "premium-grid",
    "premium-cards"
  ]);

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("services");
  const fallback = section.dataset.servicesVariant || "premium-grid";
  const variant = serviceVariants.has(requested) ? requested : fallback;

  section.dataset.servicesVariant = serviceVariants.has(variant)
    ? variant
    : "premium-grid";

  const rail = section.querySelector("[data-service-rail]");
  if (!rail) return;

  const cards = Array.from(rail.querySelectorAll("[data-service-item]"));
  const prevButton = section.querySelector("[data-service-rail-prev]");
  const nextButton = section.querySelector("[data-service-rail-next]");
  const progress = section.querySelector("[data-service-rail-progress]");
  const current = section.querySelector("[data-service-rail-current]");
  const total = section.querySelector("[data-service-rail-total]");
  const isRailVariant = section.dataset.servicesVariant === "premium-cards";

  const formatIndex = (value) => String(value).padStart(2, "0");

  if (total) total.textContent = formatIndex(cards.length);

  if (!isRailVariant) {
    rail.removeAttribute("tabindex");
    rail.removeAttribute("role");
    rail.removeAttribute("aria-label");
    return;
  }

  rail.setAttribute("tabindex", "0");
  rail.setAttribute("role", "region");
  rail.setAttribute(
    "aria-label",
    "Carrossel de serviços. Arraste horizontalmente, use as setas ou os botões de navegação."
  );

  rail.querySelectorAll("img").forEach((image) => {
    image.draggable = false;
  });

  const getGap = () => {
    const styles = window.getComputedStyle(rail);
    const parsed = Number.parseFloat(styles.columnGap || styles.gap || "0");
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getStep = () => {
    const firstCard = cards[0];
    return firstCard ? firstCard.getBoundingClientRect().width + getGap() : rail.clientWidth;
  };

  const getMaxScroll = () => Math.max(0, rail.scrollWidth - rail.clientWidth);

  const getCardScrollTarget = (card) => {
    const railRect = rail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    return Math.min(
      getMaxScroll(),
      Math.max(0, rail.scrollLeft + cardRect.left - railRect.left)
    );
  };

  const getClosestIndex = (scrollPosition = rail.scrollLeft) => {
    if (!cards.length) return 0;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(getCardScrollTarget(card) - scrollPosition);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  let frame = 0;

  const syncRail = () => {
    frame = 0;

    const maxScroll = getMaxScroll();
    const progressValue = maxScroll > 0 ? rail.scrollLeft / maxScroll : 0;
    const index = getClosestIndex();
    const atStart = rail.scrollLeft <= 2;
    const atEnd = maxScroll <= 2 || rail.scrollLeft >= maxScroll - 2;

    if (progress) {
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, progressValue))})`;
    }

    if (current) current.textContent = formatIndex(index + 1);
    if (prevButton) prevButton.disabled = atStart;
    if (nextButton) nextButton.disabled = atEnd;
  };

  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(syncRail);
  };

  const scrollByCard = (direction) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    rail.scrollBy({
      left: getStep() * direction,
      behavior
    });
  };

  prevButton?.addEventListener("click", () => scrollByCard(-1));
  nextButton?.addEventListener("click", () => scrollByCard(1));

  rail.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  });

  rail.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync, { passive: true });

  let dragging = false;
  let dragged = false;
  let startX = 0;
  let startScroll = 0;
  let activePointerId = null;
  let lastX = 0;
  let lastMoveTime = 0;
  let pointerVelocity = 0;

  rail.addEventListener("dragstart", (event) => event.preventDefault());

  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target.closest("a, button")) return;

    rail.scrollTo({
      left: rail.scrollLeft,
      behavior: "auto"
    });
    dragging = true;
    dragged = false;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    activePointerId = event.pointerId;
    lastX = event.clientX;
    lastMoveTime = performance.now();
    pointerVelocity = 0;
    rail.classList.add("is-dragging");
    rail.setPointerCapture?.(event.pointerId);
  });

  rail.addEventListener("pointermove", (event) => {
    if (!dragging || event.pointerId !== activePointerId) return;

    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) dragged = true;
    rail.scrollLeft = startScroll - delta;

    const now = performance.now();
    const elapsed = Math.max(1, now - lastMoveTime);
    pointerVelocity = (event.clientX - lastX) / elapsed;
    lastX = event.clientX;
    lastMoveTime = now;
    requestSync();
  });

  const finishDrag = (event) => {
    if (!dragging || event.pointerId !== activePointerId) return;

    dragging = false;
    rail.classList.remove("is-dragging");

    if (rail.hasPointerCapture?.(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    activePointerId = null;

    if (dragged) {
      window.requestAnimationFrame(() => {
        const releaseVelocity = performance.now() - lastMoveTime < 80
          ? pointerVelocity
          : 0;
        const projectedScroll = Math.min(
          getMaxScroll(),
          Math.max(0, rail.scrollLeft - releaseVelocity * 180)
        );
        const index = getClosestIndex(projectedScroll);
        const card = cards[index];
        if (!card) return;

        rail.scrollTo({
          left: getCardScrollTarget(card),
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth"
        });
      });
    }
  };

  rail.addEventListener("pointerup", finishDrag);
  rail.addEventListener("pointercancel", finishDrag);

  syncRail();
})();

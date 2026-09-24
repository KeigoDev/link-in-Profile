/* Matthew Ferrer — progressive motion. All four links work without JavaScript. */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const header = document.querySelector('.profile-header');
  const portrait = document.querySelector('.portrait-ring');
  const cards = [...document.querySelectorAll('.link-card')];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const maxCardTilt = 4;
  let scrollFrame = 0;

  /* The same scroll positions always produce the same depth, in either direction. */
  function updateScrollDepth() {
    scrollFrame = 0;
    if (reducedMotion.matches) return;

    const height = window.innerHeight;
    const scroll = Math.max(0, window.scrollY);
    const progress = clamp(scroll / (height * .7), 0, 1);
    header.style.setProperty('--header-scale', (1 - progress * .07).toFixed(4));
    header.style.setProperty('--header-rotate', `${(-progress * 5).toFixed(2)}deg`);
    header.style.setProperty('--header-lift', `${(-progress * 10).toFixed(2)}px`);

    // Read every position first; then write, to avoid repeated forced layouts.
    const positions = cards.map(card => card.parentElement.getBoundingClientRect());
    cards.forEach((card, index) => {
      const rect = positions[index];
      const center = rect.top + rect.height / 2;
      const distance = clamp((center - height * .52) / (height * .72), -1, 1);
      const depth = Math.abs(distance);
      card.style.setProperty('--scroll-scale', (1 - depth * .022).toFixed(4));
      card.style.setProperty('--scroll-rotate', `${(-distance * 2.5).toFixed(2)}deg`);
    });
  }

  function requestScrollUpdate() {
    if (!reducedMotion.matches && !scrollFrame) {
      scrollFrame = window.requestAnimationFrame(updateScrollDepth);
    }
  }

  // Mouse/trackpad tilt only. Touch keeps native, uninterrupted page scrolling.
  function addTilt(element, prefix, amount, glow = false) {
    let pointerFrame = 0;
    let point = null;
    let bounds = null;

    function reset() {
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      point = null;
      bounds = null;
      element.style.removeProperty(`--${prefix}-x`);
      element.style.removeProperty(`--${prefix}-y`);
      element.style.removeProperty('--glow-opacity');
    }

    element.addEventListener('pointerenter', () => {
      bounds = element.getBoundingClientRect();
    });

    element.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
      if (!bounds) bounds = element.getBoundingClientRect();
      point = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!point || !bounds) return;
        const x = clamp((point.x - bounds.left) / bounds.width, 0, 1);
        const y = clamp((point.y - bounds.top) / bounds.height, 0, 1);
        element.style.setProperty(`--${prefix}-x`, `${((.5 - y) * amount * 2).toFixed(2)}deg`);
        element.style.setProperty(`--${prefix}-y`, `${((x - .5) * amount * 2).toFixed(2)}deg`);
        if (glow) {
          element.style.setProperty('--glow-x', `${x * 100}%`);
          element.style.setProperty('--glow-y', `${y * 100}%`);
          element.style.setProperty('--glow-opacity', '1');
        }
      });
    });

    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
    element.addEventListener('blur', reset);
    window.addEventListener('scroll', reset, { passive: true });
    finePointer.addEventListener('change', reset);
    reducedMotion.addEventListener('change', reset);
  }

  cards.forEach(card => addTilt(card, 'tilt', maxCardTilt, true));
  addTilt(portrait, 'portrait', 6);

  function refreshMotionPreference() {
    if (reducedMotion.matches) {
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      ['--header-scale', '--header-rotate', '--header-lift'].forEach(name => header.style.removeProperty(name));
      cards.forEach(card => {
        card.style.removeProperty('--scroll-scale');
        card.style.removeProperty('--scroll-rotate');
      });
    } else {
      requestScrollUpdate();
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  window.addEventListener('pageshow', requestScrollUpdate);
  reducedMotion.addEventListener('change', refreshMotionPreference);
  requestScrollUpdate();
})();

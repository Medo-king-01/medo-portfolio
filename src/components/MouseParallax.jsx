import { useEffect } from 'react';

/**
 * MouseParallax
 *
 * Subtle pointer-reactive parallax (always active, including touch).
 * Uses the CSS `translate` property via CSS variables so it composes
 * cleanly with any `transform` applied by GSAP on the same element.
 *
 * Any element with [data-parallax-layer] and a numeric [data-parallax-depth]
 * (0–1) will drift opposite to the pointer.
 * Elements with [data-spotlight] get a radial light following the pointer.
 */
const MouseParallax = () => {
  useEffect(() => {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = null;
    let lastSpotlightEl = null;
    let lastBounds = null;

    const parallaxLayers = () => document.querySelectorAll('[data-parallax-layer]');

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const nx = currentX / window.innerWidth - 0.5;
      const ny = currentY / window.innerHeight - 0.5;

      parallaxLayers().forEach((layer) => {
        const depth = parseFloat(layer.dataset.parallaxDepth || '0') || 0;
        if (!depth) return;
        const strength = 40 * depth;
        layer.style.translate = `${-nx * strength}px ${-ny * strength}px`;
      });

      if (lastSpotlightEl && lastBounds) {
        const lx = currentX - lastBounds.left;
        const ly = currentY - lastBounds.top;
        lastSpotlightEl.style.setProperty('--spot-x', `${lx}px`);
        lastSpotlightEl.style.setProperty('--spot-y', `${ly}px`);
      }

      rafId = requestAnimationFrame(update);
    };

    const applyEvent = (clientX, clientY, target) => {
      targetX = clientX;
      targetY = clientY;

      let el = target;
      let found = null;
      while (el && el !== document.body) {
        if (el.matches && el.matches('[data-spotlight]')) { found = el; break; }
        el = el.parentElement;
      }
      if (found && found !== lastSpotlightEl) {
        lastSpotlightEl = found;
        lastBounds = found.getBoundingClientRect();
      } else if (!found) {
        lastSpotlightEl = null;
        lastBounds = null;
      }
    };

    const onMove = (event) => {
      applyEvent(event.clientX, event.clientY, event.target);
    };

    const onTouch = (event) => {
      const t = event.touches?.[0];
      if (!t) return;
      applyEvent(t.clientX, t.clientY, event.target);
    };

    const onResize = () => {
      if (lastSpotlightEl) lastBounds = lastSpotlightEl.getBoundingClientRect();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('resize', onResize);

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('resize', onResize);
      parallaxLayers().forEach((layer) => {
        layer.style.translate = '';
      });
    };
  }, []);

  return null;
};

export default MouseParallax;

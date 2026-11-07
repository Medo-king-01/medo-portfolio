import { useEffect } from 'react';

/**
 * TextEffects
 *
 * Decorates section <h2> headings with an animated shimmer sheen
 * that sweeps through the text when it enters the viewport.
 * Always active (no reduced-motion guard).
 */
const TextEffects = () => {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('[data-experience-section] h2'));
    if (!headings.length) return;

    headings.forEach((h) => {
      if (h.classList.contains('shimmer-title')) return;
      if (h.closest('.hero-surface')) return;
      if (h.closest('#footer')) return;
      h.classList.add('shimmer-title');
    });

    if (typeof IntersectionObserver === 'undefined') {
      headings.forEach((h) => h.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.35 },
    );

    headings.forEach((h) => observer.observe(h));

    return () => {
      observer.disconnect();
      headings.forEach((h) => {
        h.classList.remove('shimmer-title', 'is-visible');
      });
    };
  }, []);

  return null;
};

export default TextEffects;

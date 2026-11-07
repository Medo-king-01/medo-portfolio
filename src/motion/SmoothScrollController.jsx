import { useEffect } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import { ScrollTrigger } from './gsap.js';
import { siteConfig } from '../config/site.config';
import 'lenis/dist/lenis.css';

const PRESENTATION_SCROLL_QUERY =
  '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
const PRESENTATION_SECTIONS = '[data-experience-section]:not(#footer)';

const easeOutCubic = (progress) => 1 - ((1 - progress) ** 3);

export default function SmoothScrollController() {
  useEffect(() => {
    const mediaQuery = window.matchMedia(PRESENTATION_SCROLL_QUERY);
    let runtime;

    const stop = () => {
      if (!runtime) return;

      window.cancelAnimationFrame(runtime.frameId);
      window.removeEventListener('curtain:opened', runtime.resumeAfterCurtain);
      if (runtime.handleModalOpen) window.removeEventListener('modal:opened', runtime.handleModalOpen);
      if (runtime.handleModalClose) window.removeEventListener('modal:closed', runtime.handleModalClose);
      if (window.__lenis__ === runtime.lenis) window.__lenis__ = undefined;
      try { runtime.snap.destroy(); } catch { /* noop */ }
      try { runtime.lenis.off('scroll', runtime.updateScrollTrigger); } catch { /* noop */ }
      try { runtime.lenis.destroy(); } catch { /* noop */ }
      runtime = undefined;
    };

    const start = () => {
      if (
        !mediaQuery.matches
        || navigator.maxTouchPoints > 0
        || runtime
        || typeof ResizeObserver === 'undefined'
        || typeof Array.prototype.findLastIndex !== 'function'
        || !window.history
        || typeof window.history.scrollRestoration === 'undefined'
      ) return;

      let lenis;
      let snap;
      try {
        lenis = new Lenis({
          autoRaf: false,
          anchors: false,
          lerp: 0.12,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          syncTouch: false,
        });
        snap = new Snap(lenis, {
          type: 'proximity',
          distanceThreshold: '18%',
          debounce: 420,
          duration: 0.72,
          easing: easeOutCubic,
        });
        const sections = Array.from(document.querySelectorAll(PRESENTATION_SECTIONS));
        snap.addElements(sections, { align: 'start' });
      } catch (error) {
        try { snap?.destroy(); } catch { /* noop */ }
        try { lenis?.destroy(); } catch { /* noop */ }
        console.warn('Presentation scrolling is unavailable; keeping native scroll.', error);
        return;
      }

      const updateScrollTrigger = () => {
        try { ScrollTrigger.update(); } catch { /* noop */ }
      };
      lenis.on('scroll', updateScrollTrigger);

      const shouldWaitForCurtain = siteConfig.sections.preloader?.enabled !== false
        && !window.__CURTAIN_OPENED__;
      const resumeAfterCurtain = () => lenis.start();
      if (shouldWaitForCurtain) {
        lenis.stop();
        window.addEventListener('curtain:opened', resumeAfterCurtain, { once: true });
      }

      let frameId = 0;
      const raf = (time) => {
        try { lenis.raf(time); } catch { /* noop */ }
        frameId = window.requestAnimationFrame(raf);
      };
      frameId = window.requestAnimationFrame(raf);

      window.__lenis__ = lenis;

      const handleModalOpen = () => {
        try { lenis.stop(); } catch { /* noop */ }
      };
      const handleModalClose = () => {
        try { lenis.start(); } catch { /* noop */ }
      };
      window.addEventListener('modal:opened', handleModalOpen);
      window.addEventListener('modal:closed', handleModalClose);

      runtime = {
        lenis,
        snap,
        updateScrollTrigger,
        resumeAfterCurtain,
        handleModalOpen,
        handleModalClose,
        get frameId() { return frameId; },
      };
    };

    const syncWithViewport = () => {
      if (mediaQuery.matches && navigator.maxTouchPoints === 0) start();
      else stop();
    };

    syncWithViewport();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncWithViewport);
    } else {
      mediaQuery.addListener(syncWithViewport);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', syncWithViewport);
      } else {
        mediaQuery.removeListener(syncWithViewport);
      }
      stop();
    };
  }, []);

  return null;
}

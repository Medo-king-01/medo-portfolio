import { useEffect } from 'react';

/**
 * PointerTracker
 *
 * Records the latest pointer/touch position on window so other modules
 * (like the theme switch) can read it for click-origin animations.
 * Mounts once at the app root.
 */
const PointerTracker = () => {
  useEffect(() => {
    const record = (e) => {
      let x, y;
      if (e.touches && e.touches.length) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if (typeof e.clientX === 'number') {
        x = e.clientX;
        y = e.clientY;
      } else {
        return;
      }
      window.__lastPointer__ = { x, y };
    };
    window.addEventListener('pointerdown', record, { passive: true });
    window.addEventListener('pointermove', record, { passive: true });
    window.addEventListener('touchstart', record, { passive: true });
    window.addEventListener('touchmove', record, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', record);
      window.removeEventListener('pointermove', record);
      window.removeEventListener('touchstart', record);
      window.removeEventListener('touchmove', record);
    };
  }, []);

  return null;
};

export default PointerTracker;

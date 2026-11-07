import { useEffect, useRef } from 'react';

/**
 * ThemeTransition
 *
 * Provides a robust circular-reveal animation between light/dark themes.
 * Instead of relying on the View Transitions API (which doesn't always work
 * in cross-origin iframes or older browsers), we create a fixed overlay
 * circle that expands from the click point, covers the screen with the
 * new theme's background color, swaps the theme mid-animation, then fades out.
 *
 * Listens for a custom 'theme:switch' event that ThemeContext dispatches
 * with the click coordinates.
 */
const ThemeTransition = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    // Create the overlay once and keep it in the DOM.
    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.className = 'theme-reveal-overlay';
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    let animating = false;

    const handleSwitch = (event) => {
      if (animating) return;
      animating = true;

      const { x, y, isDark } = event.detail || {};
      const cx = typeof x === 'number' ? x : window.innerWidth / 2;
      const cy = typeof y === 'number' ? y : window.innerHeight / 2;

      // Compute the radius needed to cover the entire viewport from (cx,cy)
      const endRadius = Math.ceil(Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy),
      ));

      // Set the overlay color to match the incoming theme background
      overlay.style.background = isDark ? '#0b0909' : '#ecebeb'; // matches --color-5 for dark/light
      overlay.style.left = `${cx}px`;
      overlay.style.top = `${cy}px`;
      overlay.style.width = '0px';
      overlay.style.height = '0px';
      overlay.classList.add('is-revealing');

      // Force reflow
      void overlay.offsetWidth;

      // Animate the circle expanding
      overlay.style.width = `${endRadius * 2}px`;
      overlay.style.height = `${endRadius * 2}px`;
      overlay.style.marginLeft = `-${endRadius}px`;
      overlay.style.marginTop = `-${endRadius}px`;
      overlay.style.opacity = '1';

      // After the circle covers the screen (~midpoint), dispatch an event
      // to actually apply the theme change (ThemeContext listens for this).
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('theme:apply'));
      }, 380);

      // After expanding fully, fade out the overlay
      window.setTimeout(() => {
        overlay.style.opacity = '0';
      }, 480);

      // Cleanup after animation
      window.setTimeout(() => {
        overlay.classList.remove('is-revealing');
        overlay.style.width = '0px';
        overlay.style.height = '0px';
        overlay.style.marginLeft = '0';
        overlay.style.marginTop = '0';
        overlay.style.opacity = '0';
        animating = false;
      }, 850);
    };

    window.addEventListener('theme:switch', handleSwitch);

    // Also animate on theme toggle for reduced-motion fallback: just fade
    const handleResize = () => { /* overlay size is computed at click-time only */ };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('theme:switch', handleSwitch);
      window.removeEventListener('resize', handleResize);
      overlay.remove();
    };
  }, []);

  return null;
};

export default ThemeTransition;

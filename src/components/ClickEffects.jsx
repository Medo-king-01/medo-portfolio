import { useEffect, useRef } from 'react';

/**
 * ClickEffects
 *
 * Adds global pointer-up effects:
 *   1. A soft ripple ring that expands from the click point.
 *   2. A confetti/particle burst when clicking primary CTAs marked with
 *      [data-click-spark] — tiny colored specks fly outward and fade.
 *
 * Works on both mouse and touch; respects no reduced-motion guards
 * (requested to always be on).
 */
const SPARK_COLORS = ['#e42a2a', '#e97d7c', '#7b2a27', '#1b1716', '#a19392', '#f07e7d'];

const ClickEffects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = document.createElement('div');
    root.setAttribute('data-click-effects-root', '');
    root.setAttribute('aria-hidden', 'true');
    root.className = 'click-effects-root';
    document.body.appendChild(root);
    containerRef.current = root;

    const spawnRipple = (x, y) => {
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      root.appendChild(ripple);
      // eslint-disable-next-line no-unused-expressions
      ripple.offsetWidth;
      ripple.classList.add('is-animating');
      window.setTimeout(() => ripple.remove(), 650);
    };

    const spawnBurst = (x, y) => {
      const particleCount = 14;
      for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement('span');
        particle.className = 'click-spark';
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.6;
        const distance = 42 + Math.random() * 56;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 4 + Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
        root.appendChild(particle);
        // eslint-disable-next-line no-unused-expressions
        particle.offsetWidth;
        particle.classList.add('is-animating');
        window.setTimeout(() => particle.remove(), 750);
      }
    };

    const handlePointerUp = (event) => {
      if (event.button !== 0 && event.pointerType !== 'touch') return;
      const x = event.clientX;
      const y = event.clientY;
      spawnRipple(x, y);

      const sparkTarget = event.target.closest?.('[data-click-spark]');
      if (sparkTarget) {
        const rect = sparkTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnBurst(cx, cy);
      }
    };

    // Touch fallback for browsers that don't fire pointerup consistently on tap
    const handleTouchEnd = (event) => {
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      spawnRipple(touch.clientX, touch.clientY);
      const sparkTarget = event.target.closest?.('[data-click-spark]');
      if (sparkTarget) {
        const rect = sparkTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        spawnBurst(cx, cy);
      }
    };

    const handlePointerDown = (event) => {
      const btn = event.target.closest?.('.btn-ripple');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const rx = ((event.clientX - rect.left) / rect.width) * 100;
        const ry = ((event.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--ripple-x', `${rx}%`);
        btn.style.setProperty('--ripple-y', `${ry}%`);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handleTouchEnd);
      root.remove();
    };
  }, []);

  return null;
};

export default ClickEffects;

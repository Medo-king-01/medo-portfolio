import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let refreshFrame = 0;
const pendingRefreshers = new Set();

function queueRefresh(schedule) {
  pendingRefreshers.add(schedule);
  if (refreshFrame) return;

  refreshFrame = window.requestAnimationFrame(() => {
    refreshFrame = 0;
    const shouldRefresh = pendingRefreshers.size > 0;
    pendingRefreshers.clear();
    if (shouldRefresh) ScrollTrigger.refresh();
  });
}

/** Keep GSAP selectors and inline styles scoped to the owning component. */
export function createGsapContext(scope, setup) {
  return gsap.context(setup, scope);
}

/** Batch refreshes after layout, fonts, or load; return a full cleanup. */
export function scheduleScrollTriggerRefresh() {
  if (typeof window === 'undefined') return () => {};

  let active = true;
  const schedule = () => {
    if (active) queueRefresh(schedule);
  };
  const onLoad = () => schedule();

  schedule();
  window.addEventListener('load', onLoad, { once: true });
  const fontsReady = document.fonts?.ready;
  if (fontsReady) fontsReady.catch(() => undefined).then(() => schedule());

  return () => {
    active = false;
    pendingRefreshers.delete(schedule);
    if (!pendingRefreshers.size && refreshFrame) {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = 0;
    }
    window.removeEventListener('load', onLoad);
  };
}

export { gsap, ScrollTrigger };

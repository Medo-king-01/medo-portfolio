import { useEffect, useState } from 'react';

const MEDIA_QUERIES = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  mobile: '(max-width: 767px)',
  shortViewport: '(max-height: 680px)',
  finePointer: '(hover: hover) and (pointer: fine)',
};

function readQuery(query) {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => readQuery(query));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === 'function') mediaQuery.addEventListener('change', update);
    else mediaQuery.addListener?.(update);

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') mediaQuery.removeEventListener('change', update);
      else mediaQuery.removeListener?.(update);
    };
  }, [query]);

  return matches;
}

export function useReducedMotionPreference() {
  return useMediaQuery(MEDIA_QUERIES.reducedMotion);
}

export function useMotionEnvironment() {
  return {
    reducedMotion: useReducedMotionPreference(),
    isMobile: useMediaQuery(MEDIA_QUERIES.mobile),
    isShortViewport: useMediaQuery(MEDIA_QUERIES.shortViewport),
    hasFinePointer: useMediaQuery(MEDIA_QUERIES.finePointer),
  };
}

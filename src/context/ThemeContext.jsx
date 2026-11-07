/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved === 'dark' || saved === 'light') return saved;
      } catch {
        // Storage restricted fallback
      }
    }
    return 'light';
  });

  // Holds the theme that is currently committed to the DOM (during animation,
  // this lags behind `theme` by ~380ms so the old theme stays visible while
  // the overlay expands).
  const appliedThemeRef = useRef(theme);

  const applyThemeToDom = useCallback((newTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    appliedThemeRef.current = newTheme;
  }, []);

  const toggleTheme = useCallback(() => {
    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;
    if (window.__lastPointer__) {
      clickX = window.__lastPointer__.x;
      clickY = window.__lastPointer__.y;
    }

    const nextTheme = appliedThemeRef.current === 'dark' ? 'light' : 'dark';

    // Fire the custom event that ThemeTransition overlay listens for.
    window.dispatchEvent(new CustomEvent('theme:switch', {
      detail: { x: clickX, y: clickY, isDark: nextTheme === 'dark' },
    }));

    // Tell React the theme will change (so any theme-dependent UI updates).
    setTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  }, []);

  // When theme:apply fires (midpoint of the reveal), commit the theme to DOM.
  useEffect(() => {
    const onApply = () => {
      applyThemeToDom(theme);
    };
    window.addEventListener('theme:apply', onApply);
    return () => window.removeEventListener('theme:apply', onApply);
  }, [theme, applyThemeToDom]);

  // Apply the initial theme synchronously on mount (no animation).
  useEffect(() => {
    applyThemeToDom(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist whenever the theme changes.
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

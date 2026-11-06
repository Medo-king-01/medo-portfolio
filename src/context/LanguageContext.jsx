/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { languageConfig, translations } from '../data/translations';
import { siteConfig } from '../config/site.config';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-language');
        if (saved && languageConfig.supportedLanguages.some((l) => l.code === saved)) return saved;
      } catch {
        // Storage may be unavailable in privacy-restricted browsing.
      }
    }
    return languageConfig.defaultLanguage;
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const currentIndex = languageConfig.supportedLanguages.findIndex((l) => l.code === prev);
      const nextIndex = (currentIndex + 1) % languageConfig.supportedLanguages.length;
      return languageConfig.supportedLanguages[nextIndex].code;
    });
  }, []);

  useEffect(() => {
    const langConfig = languageConfig.supportedLanguages.find((l) => l.code === language);
    if (langConfig && typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = langConfig.dir;
      document.body.dir = langConfig.dir;
      document.title = language === 'ar' ? siteConfig.seo.titleAr : siteConfig.seo.title;
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio-language', language);
      } catch {
        // The site remains usable even if the preference cannot be saved.
      }
    }
  }, [language]);

  const translate = useCallback(
    (path) => {
      const keys = path.split('.');
      let result = languageConfig.supportedLanguages.find((l) => l.code === language)
        ? translations[language]
        : translations[languageConfig.defaultLanguage];

      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          result = translations[languageConfig.defaultLanguage];
          for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
              result = result[k];
            } else {
              return path;
            }
          }
          break;
        }
      }
      return result;
    },
    [language]
  );

  const value = useMemo(() => {
    const currentLangConfig =
      languageConfig.supportedLanguages.find((l) => l.code === language) ||
      languageConfig.supportedLanguages[0];

    return {
      language,
      setLanguage,
      toggleLanguage,
      t: translate,
      dir: currentLangConfig.dir || 'ltr',
      langConfig: currentLangConfig,
    };
  }, [language, toggleLanguage, translate]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

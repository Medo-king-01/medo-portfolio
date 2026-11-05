/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { languageConfig, translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage or default
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-language');
      if (saved && languageConfig.supportedLanguages.some(l => l.code === saved)) {
        return saved;
      }
    }
    return languageConfig.defaultLanguage;
  });

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const currentIndex = languageConfig.supportedLanguages.findIndex(l => l.code === prev);
      const nextIndex = (currentIndex + 1) % languageConfig.supportedLanguages.length;
      return languageConfig.supportedLanguages[nextIndex].code;
    });
  }, []);

  useEffect(() => {
    const langConfig = languageConfig.supportedLanguages.find(l => l.code === language);
    if (langConfig && typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = langConfig.dir;
      document.body.dir = langConfig.dir;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-language', language);
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: (path) => {
      const keys = path.split('.');
      let result = languageConfig.supportedLanguages.find(l => l.code === language)
        ? translations[language]
        : translations[languageConfig.defaultLanguage];

      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          // Fallback to English
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
    dir: languageConfig.supportedLanguages.find(l => l.code === language)?.dir || 'ltr',
    langConfig: languageConfig.supportedLanguages.find(l => l.code === language),
  };

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
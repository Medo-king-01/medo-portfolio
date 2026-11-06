import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const ALL_NAV_LINKS = [
  { key: 'home', sectionKey: 'hero', href: '#home' },
  { key: 'about', sectionKey: 'about', href: '#about' },
  { key: 'story', sectionKey: 'story', href: '#story' },
  { key: 'skills', sectionKey: 'skills', href: '#skills' },
  { key: 'process', sectionKey: 'process', href: '#process' },
  { key: 'howIWork', sectionKey: 'howIWork', href: '#how-i-work' },
  { key: 'projects', sectionKey: 'projects', href: '#projects' },
  { key: 'certifications', sectionKey: 'certifications', href: '#certifications' },
  { key: 'beyondTech', sectionKey: 'beyondTech', href: '#beyond-tech' },
  { key: 'aiToolkit', sectionKey: 'aiToolkit', href: '#ai-toolkit' },
  { key: 'leadership', sectionKey: 'leadership', href: '#leadership' },
  { key: 'perspective', sectionKey: 'perspective', href: '#perspective' },
  { key: 'softSkills', sectionKey: 'softskills', href: '#softskills' },
  { key: 'contact', sectionKey: 'contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t, langConfig } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ALL_NAV_LINKS.filter(
    (link) => siteConfig.sections[link.sectionKey]?.enabled !== false
  );

  const hireMeMailto = '#contact';

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        isOpen || isScrolled
          ? 'border-[var(--color-3)] bg-[var(--color-5)]/92 py-3 shadow-[0_8px_30px_rgba(27,23,22,0.08)] backdrop-blur-xl'
          : 'border-transparent bg-[var(--color-5)]/75 py-4 backdrop-blur-md'
      }`}
      dir={langConfig.dir}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 xl:px-10">
        {/* Brand Logo */}
        <div className="flex shrink-0 items-center">
          <a href="#home" dir="ltr" className="whitespace-nowrap text-2xl font-black tracking-tight text-[var(--color-4)]">
            {personalInfo.brandName}<span className="text-[var(--color-7)]">.</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden min-w-0 flex-1 items-center gap-3.5 overflow-x-auto py-2 xl:flex 2xl:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="group relative whitespace-nowrap text-xs font-semibold text-[var(--color-4)]/72 transition-colors duration-300 hover:text-[var(--color-4)] 2xl:text-[13px]"
            >
              {t(`nav.${link.key}`)}
              <span className="absolute -bottom-1 start-0 h-0.5 w-0 bg-[var(--color-7)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* End: Theme Switcher + Language Switcher + CTA Button */}
        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/85 text-[var(--color-4)] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[var(--color-2)] hover:text-[var(--color-2)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-2)]"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? (language === 'ar' ? 'تفعيل الوضع النهاري' : 'Switch to Light Mode') : (language === 'ar' ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode')}
          >
            {theme === 'dark' ? (
              <svg className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-indigo-600 transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="group relative inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-3)] bg-white/85 px-3.5 py-2 text-xs font-semibold text-[var(--color-4)] transition-all duration-300 hover:scale-105 hover:border-[var(--color-2)] hover:text-[var(--color-2)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-2)]"
            aria-label={t('language.switchTo').replace('{language}', language === 'en' ? 'Arabic' : 'English')}
          >
            <span className="text-base leading-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{langConfig.flag}</span>
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          <a
            href={hireMeMailto}
            className="whitespace-nowrap rounded-full border border-[var(--color-4)] bg-[var(--color-4)] px-4 py-2 text-xs font-bold text-[var(--color-5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-2)] hover:bg-[var(--color-2)] hover:shadow-md"
          >
            {t('hero.ctaSecondary.text')}
          </a>
        </div>

        {/* Mobile / Tablet Controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="group inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/85 text-[var(--color-4)] shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-2)]"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <svg className="h-3.5 w-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5 text-indigo-600 transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--color-3)] bg-white/85 px-3 py-1.5 text-xs font-bold text-[var(--color-4)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-2)]"
            aria-label={t('language.switchTo').replace('{language}', language === 'en' ? 'Arabic' : 'English')}
          >
            <span className="text-base leading-none transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{langConfig.flag}</span>
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t('common.close') : t('common.menu')}
            aria-controls="mobile-menu"
            className="group cursor-pointer rounded-full p-2 text-[var(--color-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-2)]"
          >
            <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-115 active:scale-95" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Slide-Down Menu */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`absolute left-0 top-full w-full transition-all duration-300 xl:hidden ${
          isOpen
            ? 'max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-[var(--color-3)] bg-[var(--color-5)] py-4 opacity-100 shadow-xl'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
        dir={langConfig.dir}
      >
        <div className="flex flex-col space-y-3 px-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-[var(--color-3)] pb-2 text-base font-bold text-[var(--color-4)] transition-colors hover:text-[var(--color-2)]"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-3)] bg-white/90 px-4 py-2.5 text-sm font-bold text-[var(--color-4)] transition-all duration-300 hover:border-[var(--color-2)] hover:shadow-sm"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                  <span>{language === 'ar' ? 'الوضع النهاري (Light)' : 'Light Mode'}</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>{language === 'ar' ? 'الوضع الليلي (Dark)' : 'Dark Mode'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-3)] bg-white/90 px-4 py-2.5 text-sm font-bold text-[var(--color-4)] transition-all duration-300 hover:border-[var(--color-2)] hover:shadow-sm"
            >
              <span className="text-lg">{langConfig.flag}</span>
              <span>{t('language.switchTo').replace('{language}', language === 'en' ? 'العربية' : 'English')}</span>
            </button>
          </div>

          <div className="pb-2 pt-2">
            <a
              href={hireMeMailto}
              onClick={() => setIsOpen(false)}
              className="inline-block w-full rounded-full bg-[var(--color-4)] px-6 py-3 text-center text-sm font-black text-[var(--color-5)] shadow-lg transition-colors hover:bg-[var(--color-2)]"
            >
              {t('hero.ctaSecondary.text')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

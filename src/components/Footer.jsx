import { siGithub, siInstagram, siFacebook, siTiktok } from 'simple-icons';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';

const Footer = () => {
  const { t, langConfig } = useLanguage();
  const brandName = siteConfig.brand.name;
  const contactEmail = personalInfo?.emails?.primary;

  const footerLinks = [
    socialLinks?.github && { label: 'GitHub', href: socialLinks.github, icon: siGithub },
    socialLinks?.instagram && { label: 'Instagram', href: socialLinks.instagram, icon: siInstagram },
    socialLinks?.facebook && { label: 'Facebook', href: socialLinks.facebook, icon: siFacebook },
    socialLinks?.tiktok && { label: 'TikTok', href: socialLinks.tiktok, icon: siTiktok },
    contactEmail && { label: 'Email', href: `mailto:${contactEmail}`, icon: null },
  ].filter(Boolean);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-[var(--color-3)] bg-[var(--color-6)] px-5 py-8 font-sans text-[var(--color-4)] sm:px-8 lg:px-12"
      dir={langConfig.dir}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--color-8)]/15 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-[var(--color-1)]/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Top line */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-7)] to-[var(--color-2)] text-sm font-black text-[var(--color-5)] shadow-[0_8px_25px_rgba(123,42,39,0.22)] transition-transform duration-300 hover:scale-105">
              M
            </div>

            <div>
              <div className="text-sm font-black tracking-[-0.02em] text-[var(--color-4)]">
                {brandName}
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-4)]/60">
                {t('footer.profession')}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[var(--color-3)]
                  bg-white/85
                  px-3.5
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[var(--color-4)]/80
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[var(--color-2)]
                  hover:bg-[var(--color-2)]
                  hover:text-[var(--color-5)]
                "
              >
                {link.icon ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
                    <path d={link.icon.path} />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-[var(--color-3)]" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-4)]/58 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {t('footer.copyright')
              .replace('{year}', new Date().getFullYear())
              .replace('{name}', brandName)}
          </span>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group flex w-fit cursor-pointer items-center gap-2 text-[var(--color-4)]/75 transition-colors duration-300 hover:text-[var(--color-2)]"
          >
            <span>{t('footer.backToTop')}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-3)] bg-white text-[11px] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--color-2)] group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)]">
              ↑
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          footer *,
          footer *::before,
          footer *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

import { useState } from 'react';
import { siGithub, siInstagram, siFacebook, siTiktok } from 'simple-icons';
import { GithubIcon } from './icons/github-icon';
import { InstagramIcon } from './icons/instagram-icon';
import { FacebookIcon } from './icons/facebook-icon';
import { GmailIcon } from './icons/gmail-icon';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';

const Contact = () => {
  const { t, langConfig } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const brandName = siteConfig.brand.name;
  const contactEmail = personalInfo?.emails?.primary || 'contact@example.com';

  const socialPlatforms = [
    socialLinks?.github && {
      key: 'github',
      name: 'GitHub',
      handle: '@Medo-king-01',
      href: socialLinks.github,
      icon: siGithub,
      Component: GithubIcon,
    },
    socialLinks?.instagram && {
      key: 'instagram',
      name: 'Instagram',
      handle: '@kodomedo',
      href: socialLinks.instagram,
      icon: siInstagram,
      Component: InstagramIcon,
    },
    socialLinks?.facebook && {
      key: 'facebook',
      name: 'Facebook',
      handle: 'Medo',
      href: socialLinks.facebook,
      icon: siFacebook,
      Component: FacebookIcon,
    },
    socialLinks?.tiktok && {
      key: 'tiktok',
      name: 'TikTok',
      handle: '@kodomedo',
      href: socialLinks.tiktok,
      icon: siTiktok,
      Component: null,
    },
  ].filter(Boolean);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (sent) {
      setSent(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!contactEmail) return;

    setIsSending(true);

    const subject = encodeURIComponent(
      `Portfolio Contact — ${formData.firstName} ${formData.lastName}`
    );

    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 500);
  };

  return (
    <section
      id="contact"
      className="
        contact-section
        relative
        w-full
        overflow-hidden
        bg-[var(--color-5)]
        px-6
        py-24
        font-sans
        md:px-12
        md:py-32
        lg:py-36
      "
      dir={langConfig.dir}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-[var(--color-8)]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full bg-[var(--color-1)]/20 blur-[130px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1b1716_1px,transparent_1px),linear-gradient(to_bottom,#1b1716_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.025]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* TWO COLUMN */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start lg:gap-20">
          {/* START COLUMN */}
          <div data-aos="fade-up" className="relative lg:col-span-6 lg:pe-8">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-7)] opacity-45" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
              </span>
              {t('contact.leftLabel')}
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-[760px]
                whitespace-pre-line
                text-5xl
                font-black
                leading-[1.02]
                tracking-[-0.045em]
                text-[var(--color-4)]
                sm:text-6xl
                md:text-7xl
                lg:text-[5.5rem]
              "
            >
              {t('contact.leftHeading')}
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-xl whitespace-pre-line text-base font-medium leading-[1.8] text-[var(--color-4)]/74 md:text-lg">
              {t('contact.leftDescription')}
            </p>

            {/* Available */}
            <div className="mt-10 flex max-w-sm items-center gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-4)]/55">
              <span className="h-px w-12 bg-[var(--color-2)]/55" />
              <span>
                {brandName} / {t('contact.available')}
              </span>
            </div>

            {/* SOCIAL PLATFORMS SHOWCASE */}
            <div className="mt-9">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-2)]">
                {t('contact.socialsLabel')}
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.key}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${platform.name} (${platform.handle})`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-3)] bg-white/85 px-4 py-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-2)]/45 hover:bg-white hover:shadow-[0_14px_30px_rgba(27,23,22,0.09)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-6)] text-[var(--color-4)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)]">
                        {platform.Component ? (
                          <platform.Component size={20} strokeWidth={2} className="h-5 w-5" />
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-120" fill="currentColor" aria-hidden="true">
                            <path d={platform.icon.path} />
                          </svg>
                        )}
                      </span>
                      <div className="flex flex-col text-start" dir="ltr">
                        <span className="text-sm font-black leading-tight text-[var(--color-4)]">
                          {platform.name}
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--color-4)]/60 transition-colors group-hover:text-[var(--color-2)]">
                          {platform.handle}
                        </span>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-sm font-bold text-[var(--color-1)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-125 group-hover:text-[var(--color-2)]"
                    >
                      &#8599;
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Email */}
            <div className="mt-6">
              <a
                href={`mailto:${contactEmail}`}
                dir="ltr"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-3)] bg-white/85 px-4 py-2 text-xs font-bold text-[var(--color-4)]/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-2)]/45 hover:text-[var(--color-2)]"
              >
                <GmailIcon size={16} strokeWidth={2} className="text-[var(--color-2)] shrink-0" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </div>

          {/* END COLUMN — FORM */}
          <div data-aos="fade-up" data-aos-delay="150" className="lg:col-span-6">
            <div
              className="
                relative
                rounded-[2rem]
                border
                border-[var(--color-3)]
                bg-white/80
                p-6
                shadow-[0_25px_70px_rgba(27,23,22,0.07)]
                backdrop-blur-xl
                md:p-8
                lg:p-10
              "
            >
              {/* Accent */}
              <div className="absolute left-8 right-8 top-0 h-[2px] overflow-hidden rounded-full bg-[var(--color-3)] md:left-10 md:right-10">
                <div className="h-full w-1/3 rounded-full bg-[var(--color-7)] transition-all duration-700 hover:w-full" />
              </div>

              {/* Form header */}
              <div className="mb-9">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-2)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-8)]/20">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  {t('contact.formHeaderLabel')}
                </div>

                <h3 className="text-2xl font-black tracking-tight text-[var(--color-4)] md:text-3xl">
                  {t('contact.formHeaderTitle')}
                </h3>

                <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-[var(--color-4)]/68">
                  {t('contact.formHeaderDescription')}
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  {/* First name */}
                  <div className="contact-input-group">
                    <label htmlFor="firstName" className="contact-label">
                      {t('contact.form.firstName')}
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('contact.form.firstNamePlaceholder')}
                      className="contact-input"
                    />
                  </div>

                  {/* Last name */}
                  <div className="contact-input-group">
                    <label htmlFor="lastName" className="contact-label">
                      {t('contact.form.lastName')}
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t('contact.form.lastNamePlaceholder')}
                      className="contact-input"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="contact-input-group">
                  <label htmlFor="email" className="contact-label">
                    {t('contact.form.email')}
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="contact-input peer ps-7 focus:ps-7"
                    />
                    <span className="pointer-events-none absolute start-0 top-1/2 -translate-y-1/2 text-[var(--color-1)] transition-colors duration-300 peer-focus:text-[var(--color-2)]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="contact-input-group">
                  <div className="mb-3 flex items-center justify-between">
                    <label htmlFor="message" className="contact-label mb-0">
                      {t('contact.form.message')}
                    </label>
                    <span className="font-mono text-[10px] font-bold text-[var(--color-1)]">
                      {formData.message.length}
                    </span>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="
                      min-h-[150px]
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-[var(--color-3)]
                      bg-[var(--color-5)]
                      px-4
                      py-4
                      text-sm
                      font-medium
                      leading-relaxed
                      text-[var(--color-4)]
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-[var(--color-1)]
                      hover:border-[var(--color-1)]
                      focus:border-[var(--color-2)]
                      focus:bg-white
                      focus:shadow-[0_0_0_4px_rgba(123,42,39,0.08)]
                      md:min-h-[170px]
                    "
                  />
                </div>

                {/* SEND */}
                <div className="flex flex-col gap-5 border-t border-[var(--color-3)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-4)]/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
                    {t('contact.form.note')}
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                  <button
                    type="submit"
                    aria-describedby="contact-mailto-hint"
                    disabled={isSending || !contactEmail}
                    className="
                      contact-send-button
                      group
                      relative
                      inline-flex
                      h-12
                      min-w-[180px]
                      cursor-pointer
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-full
                      bg-[var(--color-4)]
                      px-7
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-[var(--color-5)]
                      shadow-[0_12px_30px_rgba(27,23,22,0.18)]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:bg-[var(--color-2)]
                      hover:shadow-[0_18px_38px_rgba(123,42,39,0.24)]
                      active:translate-y-0
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-16 w-10 skew-x-[-20deg] bg-white/15 transition-all duration-700 group-hover:left-[115%]" />

                    <span className="relative z-10">
                      {isSending
                        ? t('contact.form.sending')
                        : sent
                        ? t('contact.form.sent')
                        : t('contact.form.send')}
                    </span>

                    <span className="relative z-10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h13" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                  <p id="contact-mailto-hint" className="max-w-xs text-xs leading-relaxed text-[var(--color-4)]/65">{t('contact.form.mailtoHint')}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="mt-20 flex flex-col gap-3 border-t border-[var(--color-3)] pt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-4)]/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{brandName} / PORTFOLIO</span>
          <span>© {new Date().getFullYear()} {brandName}</span>
        </div>
      </div>

      <style>{`
        .contact-input-group {
          position: relative;
        }

        .contact-label {
          display: block;
          margin-bottom: 0.75rem;
          font-size: 0.75rem;
          line-height: 1rem;
          font-weight: 700;
          color: color-mix(in srgb, var(--color-4) 70%, var(--color-1));
          transition: color 300ms ease, transform 300ms ease;
        }

        .contact-input-group:focus-within .contact-label {
          color: var(--color-2);
        }

        .contact-input {
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--color-3);
          background: transparent;
          padding-block: 0.7rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-4);
          outline: none;
          transition: border-color 300ms ease, background 300ms ease;
        }

        .contact-input::placeholder {
          color: var(--color-1);
          font-weight: 500;
        }

        .contact-input:hover {
          border-color: var(--color-1);
        }

        .contact-input:focus {
          border-color: var(--color-2);
        }

        .contact-send-button::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.08);
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-input,
          .contact-label,
          .contact-send-button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;

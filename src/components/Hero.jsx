import { useRef, useEffect, useState, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { siGithub, siInstagram, siFacebook, siTiktok } from 'simple-icons';
import { GithubIcon } from './icons/github-icon';
import { InstagramIcon } from './icons/instagram-icon';
import { FacebookIcon } from './icons/facebook-icon';
import { heroContent, socialLinks } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';
import heroVideoAsset from '../assets/hero video/intro.mp4';

const brandName = siteConfig.brand.name;
const heroVideo = heroVideoAsset;

const Hero = () => {
  const { t, langConfig, language } = useLanguage();

  const videoRef = useRef(null);
  const audioRecoveryRef = useRef(false);
  const introEndRef = useRef(null);
  const introCompletionTimerRef = useRef(null);
  const videoStartTimerRef = useRef(null);
  const videoStartedRef = useRef(false);

  const [typedTitle, setTypedTitle] = useState('');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(null);

  const typewriterTitles = useMemo(() => {
    const raw = t('hero.rotatingTitles');
    if (Array.isArray(raw) && raw.length > 0) {
      return raw;
    }
    return heroContent.rotatingTitles;
  }, [t]);

  const heroSocials = [
    socialLinks.github && { label: 'GitHub', href: socialLinks.github, icon: siGithub, Component: GithubIcon },
    socialLinks.instagram && { label: 'Instagram (@kodomedo)', href: socialLinks.instagram, icon: siInstagram, Component: InstagramIcon },
    socialLinks.facebook && { label: 'Facebook', href: socialLinks.facebook, icon: siFacebook, Component: FacebookIcon },
    socialLinks.tiktok && { label: 'TikTok (@kodomedo)', href: socialLinks.tiktok, icon: siTiktok, Component: null },
  ].filter(Boolean);

  const resumeHref = t('hero.ctaResume.href') && t('hero.ctaResume.href') !== 'hero.ctaResume.href'
    ? t('hero.ctaResume.href')
    : heroContent.ctaResume.href;

  /* -------------------------------------------------------
     VIDEO AUTOPLAY
     Tries with sound first, then falls back to muted autoplay.
  ------------------------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    const intro = introEndRef.current;

    if (!video || !intro) return undefined;

    const restoreAudioAfterInteraction = () => {
      if (!audioRecoveryRef.current || !videoRef.current) return;

      const currentVideo = videoRef.current;
      currentVideo.muted = false;

      currentVideo
        .play()
        .then(() => {
          audioRecoveryRef.current = false;
        })
        .catch(() => {
          // Browser still blocks audio.
        });
    };

    const startVideo = async () => {
      videoStartTimerRef.current = null;

      if (videoStartedRef.current) return;

      try {
        video.currentTime = 0;
      } catch {
        // Ignore currentTime errors.
      }

      video.muted = false;

      try {
        await video.play();
        videoStartedRef.current = true;
        audioRecoveryRef.current = false;
        return;
      } catch {
        video.muted = true;
        audioRecoveryRef.current = true;

        try {
          await video.play();
          videoStartedRef.current = true;

          window.addEventListener('pointerdown', restoreAudioAfterInteraction, { once: true });
          window.addEventListener('keydown', restoreAudioAfterInteraction, { once: true });
          window.addEventListener('touchstart', restoreAudioAfterInteraction, { once: true });
        } catch {
          videoStartedRef.current = false;
          audioRecoveryRef.current = false;
        }
      }
    };

    const scheduleVideo = () => {
      if (videoStartedRef.current || videoStartTimerRef.current) {
        return;
      }

      videoStartTimerRef.current = window.setTimeout(startVideo, 4400);
    };

    const parseTime = (value) => {
      const number = Number.parseFloat(value) || 0;
      return value.trim().endsWith('ms') ? number : number * 1000;
    };

    const scheduleAfterIntro = () => {
      const style = window.getComputedStyle(intro);
      const delays = style.transitionDelay.split(',').map(parseTime);
      const durations = style.transitionDuration.split(',').map(parseTime);

      const transitionTime = Math.max(
        ...durations.map((duration, index) => duration + (delays[index] || delays[0] || 0)),
        0
      );

      introCompletionTimerRef.current = window.setTimeout(scheduleVideo, transitionTime);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
      disable: false,
    });

    if (reduceMotion) {
      scheduleVideo();
    } else {
      scheduleAfterIntro();
    }

    return () => {
      if (introCompletionTimerRef.current) {
        window.clearTimeout(introCompletionTimerRef.current);
      }
      if (videoStartTimerRef.current) {
        window.clearTimeout(videoStartTimerRef.current);
      }

      introCompletionTimerRef.current = null;
      videoStartTimerRef.current = null;

      window.removeEventListener('pointerdown', restoreAudioAfterInteraction);
      window.removeEventListener('keydown', restoreAudioAfterInteraction);
      window.removeEventListener('touchstart', restoreAudioAfterInteraction);
    };
  }, []);

  /* -------------------------------------------------------
     RESUME MODAL
  ------------------------------------------------------- */
  useEffect(() => {
    if (!resumeOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setResumeOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [resumeOpen]);

  /* -------------------------------------------------------
     CHECK RESUME FILE
  ------------------------------------------------------- */
  useEffect(() => {
    if (!resumeOpen || !resumeHref) return undefined;

    let cancelled = false;

    fetch(resumeHref, { method: 'HEAD' })
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        if (!cancelled) {
          setResumeAvailable(response.ok && contentType.includes('application/pdf'));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResumeAvailable(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [resumeOpen, resumeHref]);

  /* -------------------------------------------------------
     TYPEWRITER (reacts cleanly to language switch)
  ------------------------------------------------------- */
  useEffect(() => {
    if (!typewriterTitles.length) return undefined;

    let titleIndex = 0;
    let characterIndex = 0;
    let phase = 'typing';
    let timerId;

    const tick = () => {
      const currentTitle = typewriterTitles[titleIndex] || '';

      if (phase === 'typing') {
        characterIndex += 1;
        setTypedTitle(currentTitle.slice(0, characterIndex));

        if (characterIndex >= currentTitle.length) {
          phase = 'pause';
        }

        timerId = window.setTimeout(tick, phase === 'pause' ? 1800 : 70);
        return;
      }

      if (phase === 'pause') {
        phase = 'deleting';
        timerId = window.setTimeout(tick, 45);
        return;
      }

      if (phase === 'deleting') {
        characterIndex -= 1;
        setTypedTitle(currentTitle.slice(0, characterIndex));

        if (characterIndex <= 0) {
          phase = 'gap';
        }

        timerId = window.setTimeout(tick, phase === 'gap' ? 300 : 45);
        return;
      }

      titleIndex = (titleIndex + 1) % typewriterTitles.length;
      characterIndex = 0;
      phase = 'typing';
      timerId = window.setTimeout(tick, 300);
    };

    timerId = window.setTimeout(tick, 70);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [typewriterTitles, language]);

  return (
    <section
      id="home"
      dir={langConfig.dir}
      className="
        hero-surface
        relative
        grid
        min-h-[720px]
        w-full
        overflow-hidden
        bg-[var(--color-5)]
        px-5
        pb-16
        pt-28
        font-sans
        sm:px-8
        md:min-h-[760px]
        md:px-12
        md:pb-24
        md:pt-36
        lg:grid-cols-2
        lg:items-center
        lg:gap-14
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-12rem]
          top-16
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-[var(--color-8)]/15
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[-10rem]
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-[var(--color-1)]/20
          blur-3xl
        "
      />

      {/* =====================================================
          TV VIDEO
      ===================================================== */}
      <div
        dir="ltr"
        className="
          hero-reel-frame
          relative
          z-10
          order-2
          mx-auto
          mt-8
          w-full
          max-w-[860px]
          transition-transform
          duration-700
          ease-out
          hover:-translate-y-1
          lg:col-start-2
          lg:row-start-1
          lg:mt-0
        "
      >
        {/* TV OUTER BODY */}
        <div
          className="
            relative
            mx-auto
            rounded-[2.2rem]
            border
            border-[var(--color-1)]/25
            bg-[var(--color-4)]
            p-3
            shadow-[0_35px_90px_rgba(27,23,22,0.30)]
            transition-all
            duration-700
            hover:shadow-[0_45px_110px_rgba(27,23,22,0.38)]
            sm:p-4
            md:rounded-[2.6rem]
            md:p-5
          "
        >
          {/* TV TOP HIGHLIGHT */}
          <div className="pointer-events-none absolute inset-x-10 top-1 h-px bg-[var(--color-5)]/20" />

          {/* TV BRAND / DECORATION */}
          <div className="pointer-events-none absolute left-7 top-5 flex items-center gap-2 md:left-9 md:top-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)] shadow-[0_0_12px_rgba(228,42,42,0.8)]" />
            <span className="text-[7px] font-bold uppercase tracking-[0.28em] text-[var(--color-1)] sm:text-[8px]">
              {brandName}
            </span>
          </div>

          {/* TV POWER LED */}
          <div className="pointer-events-none absolute right-7 top-5 flex items-center gap-1.5 md:right-9 md:top-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)] shadow-[0_0_10px_rgba(228,42,42,0.85)]" />
            <span className="text-[6px] font-semibold uppercase tracking-[0.18em] text-[var(--color-1)]/70">
              ON
            </span>
          </div>

          {/* TV SCREEN BEZEL */}
          <div
            className="
              relative
              mt-5
              overflow-hidden
              rounded-[1.55rem]
              border
              border-black/60
              bg-black
              p-1.5
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_45px_rgba(0,0,0,0.9)]
              sm:mt-6
              sm:p-2
              md:rounded-[1.8rem]
            "
          >
            {/* INNER SCREEN */}
            <div
              className="
                hero-reel-screen
                relative
                overflow-hidden
                rounded-[1.2rem]
                border
                border-white/10
                bg-[var(--color-4)]
                shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]
                sm:rounded-[1.4rem]
              "
            >
              {/* SCREEN GLASS */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.10] via-transparent to-black/20" />

              {/* SUBTLE SCREEN VIGNETTE */}
              <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_45px_rgba(0,0,0,0.55)]" />

              {/* VIDEO */}
              {heroVideo ? (
                <video
                  ref={videoRef}
                  playsInline
                  preload="metadata"
                  aria-label={t('hero.ariaLabel')}
                  className="
                    relative
                    z-0
                    block
                    aspect-video
                    w-full
                    bg-black
                    object-contain
                    object-center
                    brightness-[0.92]
                    saturate-[0.94]
                    transition-transform
                    duration-700
                  "
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  ref={videoRef}
                  className="
                    relative
                    z-0
                    flex
                    aspect-video
                    w-full
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-[var(--color-2)]/30
                    to-[var(--color-4)]
                  "
                  aria-hidden="true"
                >
                  <svg
                    className="h-24 w-24 text-[var(--color-8)]/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}

              {/* SCREEN REFLECTION */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />
            </div>
          </div>

          {/* TV SPEAKER AREA */}
          <div
            className="mx-auto mt-3 flex items-center justify-center gap-1 opacity-60 sm:mt-4"
            aria-hidden="true"
          >
            {Array.from({ length: 13 }).map((_, index) => (
              <span key={index} className="h-1 w-1 rounded-full bg-[var(--color-5)]/25" />
            ))}
          </div>

          {/* TV CONTROL LINE */}
          <div className="mt-2 flex items-center justify-center gap-2 sm:mt-3" aria-hidden="true">
            <span className="h-1 w-8 rounded-full bg-[var(--color-5)]/15" />
            <span className="h-1 w-1 rounded-full bg-[var(--color-8)]" />
            <span className="h-1 w-8 rounded-full bg-[var(--color-5)]/15" />
          </div>
        </div>

        {/* TV FEET */}
        <div
          className="pointer-events-none relative mx-auto flex w-[78%] items-start justify-between px-4"
          aria-hidden="true"
        >
          <div className="h-5 w-20 -rotate-[12deg] rounded-b-xl bg-[var(--color-4)] shadow-[0_10px_18px_rgba(27,23,22,0.22)] sm:h-6 sm:w-24" />
          <div className="h-5 w-20 rotate-[12deg] rounded-b-xl bg-[var(--color-4)] shadow-[0_10px_18px_rgba(27,23,22,0.22)] sm:h-6 sm:w-24" />
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-20
          order-1
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          items-start
          justify-center
          text-start
          lg:col-start-1
          lg:row-start-1
        "
      >
        <div className="flex w-full max-w-2xl flex-col items-start text-start">
          {/* LIVE AVAILABILITY BADGE */}
          <div
            data-aos="fade-down"
            data-aos-delay="100"
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 shadow-[0_2px_12px_rgba(16,185,129,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/15"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-300">
              {language === 'ar' ? 'متاح للتدريب / العمل الحر' : 'Open for Projects & Internships'}
            </span>
          </div>

          {/* MAIN HEADING */}
          <h1
            data-aos="fade-up"
            className="
              max-w-3xl
              text-4xl
              font-black
              leading-[1.08]
              tracking-[-0.04em]
              text-[var(--color-4)]
              sm:text-5xl
              md:text-6xl
              lg:text-[3.85rem]
            "
          >
            {t('hero.greeting')}
            {language === 'ar' ? '، ' : ', '}
            <br />
            <span className="relative mt-2 block min-h-[2.4em] w-full max-w-[24ch] text-[var(--color-2)] sm:min-h-[1.3em]">
              <span className="hero-title-cycle block">
                {typedTitle}
                <span className="hero-typewriter-caret" aria-hidden="true" />
              </span>
            </span>
          </h1>

          {/* SUBHEADING */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mb-8 mt-5 max-w-xl text-base font-medium leading-[1.8] text-[var(--color-4)]/75 md:text-lg"
          >
            {t('hero.subtitle')}
          </p>

          {/* CTA BUTTONS */}
          <div
            ref={introEndRef}
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex w-full flex-row flex-wrap items-center gap-3"
          >
            {/* PRIMARY */}
            <a
              href={t('hero.ctaPrimary.href')}
              className="
                group
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[var(--color-4)]
                px-6
                text-sm
                font-bold
                text-[var(--color-5)]
                shadow-[0_12px_28px_rgba(27,23,22,0.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[var(--color-2)]
                hover:shadow-[0_16px_32px_rgba(123,42,39,0.25)]
                sm:w-auto
                sm:min-w-[175px]
              "
            >
              <span>{t('hero.ctaPrimary.text')}</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-6-6l6 6-6 6"
                />
              </svg>
            </a>

            {/* SECONDARY */}
            <a
              href={t('hero.ctaSecondary.href')}
              className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-3)]
                bg-white/85
                px-6
                text-sm
                font-bold
                text-[var(--color-4)]
                shadow-sm
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--color-2)]
                hover:bg-white
                hover:text-[var(--color-2)]
                hover:shadow-md
                sm:w-auto
                sm:min-w-[175px]
              "
            >
              {t('hero.ctaSecondary.text')}
            </a>

            {/* RESUME */}
            {resumeHref && (
              <a
                href={resumeHref}
                onClick={(event) => {
                  event.preventDefault();
                  setResumeAvailable(null);
                  setResumeOpen(true);
                }}
                className="
                  group
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--color-3)]
                  bg-transparent
                  px-6
                  text-sm
                  font-bold
                  text-[var(--color-4)]/80
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[var(--color-2)]
                  hover:bg-white
                  hover:text-[var(--color-2)]
                  sm:w-auto
                  sm:min-w-[175px]
                "
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-115" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {t('hero.ctaResume.text')}
              </a>
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div
            className="mt-6 flex w-full items-center justify-center gap-3 sm:justify-start"
            aria-label="Social links"
          >
            {heroSocials.map(({ label, href, icon, Component }) => (
              <a
                key={label}
                href={href || undefined}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                title={label}
                aria-label={label}
                aria-disabled={!href}
                tabIndex={href ? 0 : -1}
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--color-3)]
                  bg-white/90
                  text-[var(--color-4)]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:scale-110
                  hover:border-[var(--color-2)]
                  hover:bg-[var(--color-2)]
                  hover:text-[var(--color-5)]
                  hover:shadow-md
                  dark:border-white/10
                  dark:bg-[var(--color-6)]
                "
              >
                {Component ? (
                  <Component size={20} strokeWidth={2} className="h-5 w-5" />
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                    <path d={icon.path} />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-[var(--color-4)]/65"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* =====================================================
          RESUME MODAL
      ===================================================== */}
      {resumeOpen && (
        <div
          className="resume-viewer-backdrop fixed inset-0 z-[100]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setResumeOpen(false);
            }
          }}
        >
          <div
            className="resume-viewer relative"
            role="dialog"
            aria-modal="true"
            aria-label={t('hero.resumeModal.close')}
          >
            <div className="resume-viewer-toolbar">
              <span className="resume-viewer-title">
                {t('hero.resumeModal.title').replace('{brandName}', brandName)}
              </span>

              <div className="resume-viewer-actions">
                <a
                  href={resumeAvailable ? resumeHref : undefined}
                  download={resumeAvailable || undefined}
                  className={`resume-viewer-action ${resumeAvailable === false ? 'resume-viewer-action-disabled' : ''}`}
                >
                  {t('hero.resumeModal.download')}
                </a>

                <a
                  href={resumeAvailable ? resumeHref : undefined}
                  target={resumeAvailable ? '_blank' : undefined}
                  rel={resumeAvailable ? 'noopener noreferrer' : undefined}
                  className={`resume-viewer-action ${resumeAvailable === false ? 'resume-viewer-action-disabled' : ''}`}
                >
                  {t('hero.resumeModal.newTab')}
                </a>

                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="resume-viewer-close"
                  aria-label={t('hero.resumeModal.close')}
                >
                  &#10005;
                </button>
              </div>
            </div>

            <div className="resume-viewer-document">
              {resumeAvailable === true ? (
                <iframe title={`${brandName} resume`} src={resumeHref} />
              ) : resumeAvailable === false ? (
                <div className="resume-viewer-unavailable">
                  <strong>{t('hero.resumeModal.unavailable')}</strong>
                  <span>
                    {t('hero.resumeModal.addFile').replace('{href}', resumeHref || 'resume.pdf')}
                  </span>
                </div>
              ) : (
                <div className="resume-viewer-loading">
                  {t('hero.resumeModal.checking')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

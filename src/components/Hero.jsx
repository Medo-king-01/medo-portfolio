import { useRef, useEffect, useLayoutEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { createGsapContext, scheduleScrollTriggerRefresh, gsap } from '../motion/gsap.js';
import { motionConfig, getMotionProfile } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
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
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const motionProfile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });

  const sectionRef = useRef(null);
  const heroGlowRef = useRef(null);
  const heroShadeRef = useRef(null);
  const videoRef = useRef(null);
  const videoStartedRef = useRef(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [videoMuted, setVideoMuted] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(null);
  const heroRevealVariants = getRevealVariants({
    distance: motionProfile.revealDistance,
  });
  const heroFadeVariants = getRevealVariants({ axis: null });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const glow = heroGlowRef.current;
    const shade = heroShadeRef.current;
    const distance = motionProfile.parallaxDistance;
    if (!distance || !section || !glow || !shade) return undefined;

    const context = createGsapContext(section, () => {
      gsap.to(glow, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(shade, {
        y: -distance * 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });
    });
    const stopRefresh = scheduleScrollTriggerRefresh();
    return () => {
      stopRefresh();
      context.revert();
    };
  }, [language, motionProfile.parallaxDistance]);

  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll('.hero-grid-node');
    if (!nodes?.length) return undefined;

    const pulse = animate(nodes, {
      opacity: [0.28, 0.82],
      scale: [0.78, 1.16],
      duration: 3200,
      ease: 'inOutSine',
      delay: stagger(1100),
      loop: true,
      alternate: true,
    });

    return () => pulse.revert();
  }, []);



  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  const typewriterTitles = useMemo(() => {
    const raw = t('hero.rotatingTitles');
    if (Array.isArray(raw) && raw.length > 0) {
      return raw;
    }
    return heroContent.rotatingTitles;
  }, [t]);

  const displayTitle = typedTitle;

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
     VIDEO LIFECYCLE
     Start after the opening curtain, muted to respect autoplay rules;
     the visitor can opt in to audio with the on-screen control.
  ------------------------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const startVideo = async () => {
      if (videoStartedRef.current) return;
      videoStartedRef.current = true;
      video.muted = true;
      setVideoMuted(true);

      try {
        await video.play();
      } catch {
        // If autoplay is blocked, the visible audio control remains a manual play affordance.
        videoStartedRef.current = false;
      }
    };

    if (window.__CURTAIN_OPENED__ || siteConfig.sections.preloader?.enabled === false) {
      startVideo();
    } else {
      window.addEventListener('curtain:opened', startVideo, { once: true });
    }

    return () => window.removeEventListener('curtain:opened', startVideo);
  }, []);

  const toggleVideoAudio = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !videoMuted;
    video.muted = nextMuted;

    if (video.paused) {
      try {
        await video.play();
        videoStartedRef.current = true;
      } catch {
        video.muted = true;
        setVideoMuted(true);
        return;
      }
    }

    setVideoMuted(video.muted);
  };

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
      ref={sectionRef}
      id="home"
      dir={langConfig.dir}
      data-experience-section
      className="
        hero-surface
        section-flow
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
        ref={heroGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[var(--color-8)]/15 blur-3xl"
        data-parallax-layer
        data-parallax-depth="0.55"
      />

      <div
        ref={heroShadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[var(--color-1)]/20 blur-3xl"
        data-parallax-layer
        data-parallax-depth="0.35"
      />

      <div className="hero-grid-backdrop" aria-hidden="true">
        <div className="hero-grid-plane" />
        <div className="hero-grid-sweep" />
        <span className="hero-grid-node hero-grid-node-one" />
        <span className="hero-grid-node hero-grid-node-two" />
      </div>

      <div
        className="hero-orbit-graphic"
        aria-hidden="true"
        data-parallax-layer
        data-parallax-depth="0.25"
      >
        <span className="hero-orbit-ring hero-orbit-ring-one"><i /></span>
        <span className="hero-orbit-ring hero-orbit-ring-two"><i /></span>
        <span className="hero-orbit-core" />
      </div>

      {/* =====================================================
          LAPTOP VIDEO DISPLAY
      ===================================================== */}
      <motion.div
        dir="ltr"
        initial="hidden"
        whileInView="visible"
        viewport={motionConfig.viewport}
        variants={heroRevealVariants}
        whileHover={hasFinePointer ? { y: -6 } : undefined}
        className="
          hero-laptop-frame
          group
          relative
          z-10
          order-2
          mx-auto
          mt-8
          w-full
          max-w-[840px]
          transition-transform
          duration-700
          ease-out
          lg:col-start-2
          lg:row-start-1
          lg:mt-0
        "
      >
        {/* LAPTOP LID / SCREEN CHASSIS */}
        <div
          className="
            relative
            mx-auto
            rounded-t-[1.3rem]
            border
            border-neutral-700/60
            bg-gradient-to-b
            from-[#252120]
            via-[#1a1716]
            to-[#120f0f]
            p-2.5
            shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)]
            ring-1
            ring-black/80
            backdrop-blur-sm
            sm:rounded-t-[1.8rem]
            sm:p-3.5
            sm:pb-2.5
            dark:border-white/15
          "
        >
          {/* WEBCAM & SENSORS BAR */}
          <div
            className="
              relative
              mx-auto
              mb-2
              flex
              items-center
              justify-center
              sm:mb-2.5
            "
            aria-hidden="true"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-white/5 bg-black/50 px-2.5 py-0.5 shadow-inner">
              {/* Camera Lens */}
              <span className="relative flex h-2 w-2 items-center justify-center rounded-full bg-[#0a0a0a] ring-1 ring-white/10 shadow-inner">
                <span className="h-1 w-1 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
              </span>
              {/* Mic / Sensor Pinhole */}
              <span className="h-0.5 w-0.5 rounded-full bg-neutral-600" />
            </div>
          </div>

          {/* INNER SCREEN DISPLAY */}
          <div
            className="
              relative
              overflow-hidden
              rounded-md
              border
              border-white/[0.08]
              bg-black
              shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]
              sm:rounded-lg
            "
          >
            {/* SCREEN GLASS GLARE */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

            {/* SCREEN VIGNETTE */}
            <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_35px_rgba(0,0,0,0.5)]" />

            {/* VIDEO */}
            {heroVideo ? (
              <video
                ref={videoRef}
                playsInline
                muted={videoMuted}
                preload={isMobile || isTablet ? 'none' : 'metadata'}
                onEnded={handleVideoEnded}
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
                  brightness-[0.96]
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

            {heroVideo && (
              <button
                type="button"
                onClick={toggleVideoAudio}
                aria-pressed={!videoMuted}
                aria-label={videoMuted
                  ? (language === 'ar' ? 'تشغيل صوت الفيديو' : 'Enable video audio')
                  : (language === 'ar' ? 'كتم صوت الفيديو' : 'Mute video audio')}
                title={videoMuted
                  ? (language === 'ar' ? 'تشغيل الصوت' : 'Enable audio')
                  : (language === 'ar' ? 'كتم الصوت' : 'Mute audio')}
                className="absolute bottom-3 end-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                  {videoMuted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7m2.5-9a9 9 0 0 1 0 11" />}
                </svg>
              </button>
            )}

            {/* TOP GLASS REFLECTION */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1/3 bg-gradient-to-b from-white/[0.06] to-transparent" />
          </div>

          {/* DISPLAY CHIN BRAND */}
          <div
            className="
              relative
              mt-2
              flex
              items-center
              justify-center
              sm:mt-2.5
            "
            aria-hidden="true"
          >
            <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-neutral-400/80 transition-colors group-hover:text-neutral-300 sm:text-[9px]">
              {brandName}
            </span>
          </div>
        </div>

        {/* LAPTOP HINGE */}
        <div
          className="
            relative
            mx-auto
            h-2
            w-[32%]
            rounded-b-sm
            border-t
            border-black/90
            bg-gradient-to-b
            from-[#120f0f]
            to-[#1e1b1a]
            shadow-inner
            sm:h-2.5
            sm:w-[28%]
          "
          aria-hidden="true"
        />

        {/* LAPTOP BASE / LOWER CHASSIS DECK */}
        <div
          className="
            relative
            mx-auto
            -mt-[1px]
            flex
            h-3.5
            w-[98%]
            items-start
            justify-center
            rounded-b-xl
            border-t
            border-white/30
            bg-gradient-to-b
            from-[#342e2d]
            via-[#241f1e]
            to-[#151211]
            shadow-[0_12px_28px_rgba(0,0,0,0.45)]
            sm:h-4.5
            sm:w-[96%]
            sm:rounded-b-2xl
            dark:from-[#2c2625]
            dark:via-[#1e1a19]
            dark:to-[#0f0c0b]
          "
          aria-hidden="true"
        >
          {/* CENTER THUMB OPENING NOTCH */}
          <div className="h-1 w-16 rounded-b-md border-t border-white/20 bg-[#0f0d0d] shadow-inner sm:h-1.5 sm:w-24" />
          {/* Subtle bottom edge reflection line */}
          <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-white/10" />
        </div>

        {/* RUBBER FEET */}
        <div
          className="pointer-events-none relative mx-auto -mt-0.5 flex w-[86%] items-center justify-between px-6"
          aria-hidden="true"
        >
          <div className="h-1 w-10 rounded-full bg-black/60 shadow-sm sm:w-14" />
          <div className="h-1 w-10 rounded-full bg-black/60 shadow-sm sm:w-14" />
        </div>

        {/* DESK AMBIENT DROP SHADOW */}
        <div
          className="
            pointer-events-none
            mx-auto
            mt-2
            h-4
            w-[88%]
            rounded-full
            bg-black/40
            blur-xl
            transition-all
            duration-700
            group-hover:scale-105
            sm:h-5
            dark:bg-black/60
          "
          aria-hidden="true"
        />
      </motion.div>

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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={getRevealVariants({ distance: motionProfile.revealDistance, delay: 0.04 })}
            className="availability-pulse mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 shadow-[0_2px_12px_rgba(16,185,129,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500/15"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-300">
              {language === 'ar' ? 'متاح للتدريب / العمل الحر' : 'Open for Projects & Internships'}
            </span>
          </motion.div>

          {/* MAIN HEADING */}
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={getRevealVariants({ distance: motionProfile.revealDistance, delay: 0.1 })}
            className="
              max-w-3xl
              text-3xl
              font-black
              leading-[1.12]
              tracking-[-0.04em]
              text-[var(--color-4)]
              xs:text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-[3.85rem]
            "
          >
            {t('hero.greeting')}
            {language === 'ar' ? '، ' : ', '}
            <br />
            <span className="relative mt-2 block min-h-[3.2em] w-full max-w-[24ch] text-[var(--color-2)] xs:min-h-[2.6em] sm:min-h-[1.4em]">
              <span className="hero-title-cycle block">
                {displayTitle}
                <span className="hero-typewriter-caret" aria-hidden="true" />
              </span>
            </span>
          </motion.h1>

          {/* SUBHEADING */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={getRevealVariants({ distance: motionProfile.revealDistance, delay: 0.18 })}
            className="mb-8 mt-5 max-w-xl text-base font-medium leading-[1.8] text-[var(--color-4)]/75 md:text-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={getRevealVariants({ distance: motionProfile.revealDistance, delay: 0.26 })}
            className="flex w-full flex-row flex-wrap items-center gap-3"
          >
            {/* PRIMARY */}
            <a
              href={t('hero.ctaPrimary.href')}
             
              data-click-spark
              className="
                group
                btn-ripple
                relative
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                overflow-hidden
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
              <span className="relative z-10">{t('hero.ctaPrimary.text')}</span>
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
                btn-ripple
                relative
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                overflow-hidden
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
              <span className="relative z-10">{t('hero.ctaSecondary.text')}</span>
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
                  btn-ripple
                  group
                  relative
                  inline-flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
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
          </motion.div>

          {/* SOCIAL LINKS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={getRevealVariants({ distance: motionProfile.revealDistance, delay: 0.34 })}
            className="mt-6 flex w-full items-center justify-center gap-3 sm:justify-start"
            aria-label="Social links"
          >
            {heroSocials.map(({ label, href, icon, Component }) => (
              <motion.a
                key={label}
                href={href || undefined}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                title={label}
                aria-label={label}
                aria-disabled={!href}
                tabIndex={href ? 0 : -1}
                whileTap={{ scale: 0.9, y: -2 }}
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
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}
      <motion.div
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={motionConfig.viewport}
        variants={heroFadeVariants}
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <div>
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
      </motion.div>

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

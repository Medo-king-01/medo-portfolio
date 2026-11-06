import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionConfig } from '../motion/motionConfig.js';
import { personalInfo } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';

const PRELOADER_FAILSAFE_MS = 7000;

const announceCurtainOpened = () => {
  window.__CURTAIN_OPENED__ = true;
  window.dispatchEvent(new CustomEvent('curtain:opened'));
};

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t, langConfig } = useLanguage();

  useEffect(() => {
    let finished = false;
    let fallbackTimer;

    const finishLoading = () => {
      if (finished) return;
      finished = true;
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      setIsLoading(false);
    };

    if (window.__APP_READY__) finishLoading();
    else window.addEventListener('app:ready', finishLoading, { once: true });

    // A safety net only: the app-ready signal is the normal completion path.
    fallbackTimer = window.setTimeout(finishLoading, PRELOADER_FAILSAFE_MS);

    return () => {
      window.removeEventListener('app:ready', finishLoading);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, []);

  const brandName = personalInfo?.brandName || siteConfig.brand.brandName;
  const brandHandle = siteConfig.brand.handle;

  return (
    <AnimatePresence mode="wait" onExitComplete={announceCurtainOpened}>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: {
              duration: motionConfig.duration.curtain,
              ease: motionConfig.ease.exit,
            },
          }}
          className="
            fixed
            inset-0
            z-[100000]
            flex
            h-screen
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-[var(--color-5)]
          "
          dir={langConfig.dir}
        >
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            {/* Grid */}
            <div
              className="
                absolute
                inset-0
                bg-[linear-gradient(to_right,#1b1716_1px,transparent_1px),linear-gradient(to_bottom,#1b1716_1px,transparent_1px)]
                bg-[size:70px_70px]
                opacity-[0.035]
              "
            />

            {/* Center glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[420px]
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[var(--color-8)]/15
                blur-[100px]
              "
            />

            {/* Top line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="
                absolute
                left-8
                right-8
                top-8
                h-px
                origin-left
                bg-[var(--color-3)]
                md:left-12
                md:right-12
                md:top-10
              "
            />

            {/* Bottom line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="
                absolute
                bottom-8
                left-8
                right-8
                h-px
                origin-right
                bg-[var(--color-3)]
                md:bottom-10
                md:left-12
                md:right-12
              "
            />
          </div>

          {/* TOP LEFT LABEL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="
              absolute
              left-8
              top-12
              font-mono
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[var(--color-4)]/55
              md:left-12
              md:top-14
            "
          >
            PORTFOLIO / 2026
          </motion.div>

          {/* TOP RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="
              absolute
              right-8
              top-12
              font-mono
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[var(--color-4)]/55
              md:right-12
              md:top-14
            "
          >
            {brandHandle.toUpperCase()}
          </motion.div>

          {/* MAIN INTRO */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Small eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[var(--color-2)]/60" />

              <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-4)]/60">
                {t('preloader.loading')}
              </span>

              <span className="h-px w-8 bg-[var(--color-2)]/60" />
            </motion.div>

            {/* NAME */}
            <div className="relative" dir="ltr">
              {/* Ghost name */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.07 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="
                  absolute
                  inset-0
                  whitespace-nowrap
                  text-center
                  text-[4.5rem]
                  font-black
                  leading-none
                  tracking-[-0.07em]
                  text-[var(--color-4)]
                  sm:text-[7rem]
                  md:text-[9rem]
                  lg:text-[11rem]
                "
              >
                {brandName}
              </motion.h1>

              {/* Main name */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
                  filter: 'blur(12px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  relative
                  whitespace-nowrap
                  text-center
                  text-[4.5rem]
                  font-black
                  leading-none
                  tracking-[-0.07em]
                  text-[var(--color-4)]
                  sm:text-[7rem]
                  md:text-[9rem]
                  lg:text-[11rem]
                "
              >
                {brandName}
                <span className="text-[var(--color-7)]">.</span>
              </motion.h1>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1.35, ease: [0.76, 0, 0.24, 1] }}
                className="
                  absolute
                  -bottom-4
                  left-1/2
                  h-[3px]
                  w-24
                  -translate-x-1/2
                  origin-center
                  rounded-full
                  bg-[var(--color-2)]
                  md:-bottom-5
                "
              />
            </div>

            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.55 }}
              className="mt-10 flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />

              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-2)]">
                {t('hero.titleHighlight')}
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
            </motion.div>
          </div>

          {/* LOADING INDICATOR */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="
              absolute
              bottom-14
              left-1/2
              flex
              -translate-x-1/2
              flex-col
              items-center
              gap-3
              md:bottom-16
            "
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-4)]/55">
                {t('preloader.loading')}
              </span>

              {/* Dots */}
              <div className="flex gap-1" aria-hidden="true">
                {[0, 0.15, 0.3].map((delay) => (
                  <motion.span
                    key={delay}
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1, repeat: Infinity, delay }}
                    className="h-1 w-1 rounded-full bg-[var(--color-7)]"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* SIDE DECORATIONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="
              absolute
              left-8
              top-1/2
              hidden
              -translate-y-1/2
              flex-col
              items-center
              gap-3
              md:left-12
              md:flex
            "
          >
            <span className="h-12 w-px bg-[var(--color-3)]" />
            <span className="[writing-mode:vertical-rl] font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-[var(--color-1)]">
              Creative / Digital
            </span>
            <span className="h-12 w-px bg-[var(--color-3)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="
              absolute
              right-8
              top-1/2
              hidden
              -translate-y-1/2
              flex-col
              items-center
              gap-3
              md:right-12
              md:flex
            "
          >
            <span className="h-12 w-px bg-[var(--color-3)]" />
            <span className="[writing-mode:vertical-rl] font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-[var(--color-1)]">
              Code / Design
            </span>
            <span className="h-12 w-px bg-[var(--color-3)]" />
          </motion.div>

          {/* FINAL SHUTTER */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.7, delay: 2.55, ease: [0.76, 0, 0.24, 1] }}
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              top-0
              origin-bottom
              bg-[var(--color-5)]
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

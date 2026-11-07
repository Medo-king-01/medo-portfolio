import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { motionConfig } from '../motion/motionConfig.js';
import { personalInfo } from '../data/portfolioData';
import { siteConfig } from '../config/site.config';
import { useLanguage } from '../context/LanguageContext.jsx';

const INTRO_SEQUENCE_MS = 5_000;
const REDUCED_MOTION_SEQUENCE_MS = 350;
const COMPLETION_PAUSE_MS = 180;
const DOT_JOURNEY_SECONDS = 4.1;

const announceCurtainOpened = () => {
  window.__CURTAIN_OPENED__ = true;
  window.dispatchEvent(new CustomEvent('curtain:opened'));
};

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(
    () => typeof window !== 'undefined' && window.__APP_READY__ === true,
  );
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [isProgressComplete, setIsProgressComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion() === true;
  const { t, langConfig } = useLanguage();

  useEffect(() => {
    if (window.__CURTAIN_OPENED__) return undefined;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const releaseScrollLock = () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    window.addEventListener('curtain:opened', releaseScrollLock, { once: true });

    return () => {
      window.removeEventListener('curtain:opened', releaseScrollLock);
      releaseScrollLock();
    };
  }, []);

  useEffect(() => {
    const handleAppReady = () => setIsAppReady(true);

    if (window.__APP_READY__) handleAppReady();
    else window.addEventListener('app:ready', handleAppReady, { once: true });

    const introTimer = window.setTimeout(
      () => setIsSequenceComplete(true),
      prefersReducedMotion ? REDUCED_MOTION_SEQUENCE_MS : INTRO_SEQUENCE_MS,
    );

    return () => {
      window.removeEventListener('app:ready', handleAppReady);
      window.clearTimeout(introTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isAppReady || !isSequenceComplete) return undefined;

    const progressTimer = window.setTimeout(() => setIsProgressComplete(true), 0);
    const completionTimer = window.setTimeout(
      () => setIsLoading(false),
      prefersReducedMotion ? 80 : COMPLETION_PAUSE_MS,
    );

    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(completionTimer);
    };
  }, [isAppReady, isSequenceComplete, prefersReducedMotion]);

  const brandName = personalInfo?.brandName || siteConfig.brand.brandName;
  const brandLetters = Array.from(brandName);
  const letterCount = Math.max(brandLetters.length, 1);
  const dotPositions = brandLetters.flatMap((_, index) => {
    const center = `${((index + 0.5) / letterCount) * 100}%`;
    return [center, center];
  });
  const dotTimes = brandLetters.flatMap((_, index) => [
    index / letterCount,
    (index + 0.48) / letterCount,
  ]);
  const dotTopPositions = brandLetters.flatMap((_, index) => [
    index === 0 ? '-1.1em' : '-0.55em',
    '-0.12em',
  ]);
  const dotScale = brandLetters.flatMap((_, index) => [index === 0 ? 0.4 : 0.82, 1.12]);
  const dotOpacity = brandLetters.flatMap((_, index) => [index === 0 ? 0 : 1, 1]);
  const pulseScale = brandLetters.flatMap(() => [0.25, 1.75]);
  const pulseOpacity = brandLetters.flatMap(() => [0, 0.58]);

  dotPositions.push('100%');
  dotTimes.push(1);
  dotTopPositions.push('0.68em');
  dotScale.push(0.96);
  dotOpacity.push(1);
  pulseScale.push(0.25);
  pulseOpacity.push(0);

  const firstDotPosition = `${(0.5 / letterCount) * 100}%`;
  const wordmarkTransition = prefersReducedMotion
    ? { duration: 0.18, ease: 'easeOut' }
    : { duration: DOT_JOURNEY_SECONDS, times: dotTimes, ease: 'easeInOut', delay: 0.08 };

  return (
    <AnimatePresence mode="wait" onExitComplete={announceCurtainOpened}>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={prefersReducedMotion
            ? { opacity: 0, transition: { duration: 0.12 } }
            : {
                y: '-100%',
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
            min-h-dvh
            w-full
            items-center
            justify-center
            overflow-hidden
            bg-[var(--color-5)]
          "
          dir={langConfig.dir}
          role="status"
          aria-live="polite"
          aria-busy={!isProgressComplete}
        >
          {/* Soft blueprint grid and a restrained brand-red glow. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: `linear-gradient(to right, color-mix(in srgb, var(--color-4) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-4) 4%, transparent) 1px, transparent 1px)`,
                backgroundSize: '72px 72px',
              }}
            />
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0.14 } : { opacity: 0.08, scale: 0.82 }}
              animate={prefersReducedMotion ? { opacity: 0.14 } : { opacity: 0.2, scale: 1.08 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2 }
                  : { duration: 3.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
              }
              className="absolute left-1/2 top-1/2 h-96 w-96 max-w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-8)] blur-[100px]"
            />
            <span className="absolute inset-x-7 top-7 h-px bg-[var(--color-3)]/75 md:inset-x-12 md:top-10" />
            <span className="absolute inset-x-7 bottom-7 h-px bg-[var(--color-3)]/75 md:inset-x-12 md:bottom-10" />
          </div>

          <div className="relative z-10 flex w-full flex-col items-center px-5 text-center">
            {/* MEDO is assembled one letter at a time as the red dot bounces across it. */}
            <div
              className="relative grid grid-cols-4 items-center justify-items-center font-black leading-none tracking-[-0.075em]"
              style={{
                width: 'min(4.35em, 76vw)',
                fontSize: 'clamp(4rem, 18.5vw, 10.5rem)',
              }}
              dir="ltr"
              role="img"
              aria-label={brandName}
            >
              {brandLetters.map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24, scale: 0.78, filter: 'blur(9px)' }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: [24, -5, 0], scale: [0.78, 1.08, 1], filter: 'blur(0px)' }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.16, delay: index * 0.04 }
                      : {
                          duration: 0.56,
                          delay: 0.38 + index * (DOT_JOURNEY_SECONDS / letterCount),
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="relative z-10 block text-[var(--color-4)]"
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              ))}

              <motion.span
                className="absolute z-10 rounded-full border border-[var(--color-7)]"
                style={{
                  width: 'clamp(1.2rem, 2.5vw, 1.9rem)',
                  height: 'clamp(1.2rem, 2.5vw, 1.9rem)',
                  left: firstDotPosition,
                  x: '-50%',
                  boxShadow: '0 0 20px color-mix(in srgb, var(--color-7) 45%, transparent)',
                }}
                initial={{ top: '-1.1em', opacity: 0, scale: 0.25 }}
                animate={
                  prefersReducedMotion
                    ? { top: '0.68em', left: '100%', opacity: 0, scale: 0.25 }
                    : {
                        top: dotTopPositions,
                        left: dotPositions,
                        opacity: pulseOpacity,
                        scale: pulseScale,
                      }
                }
                transition={wordmarkTransition}
                aria-hidden="true"
              />

              <motion.span
                className="absolute z-20 rounded-full bg-[var(--color-7)]"
                style={{
                  width: 'clamp(0.75rem, 1.4vw, 1.15rem)',
                  height: 'clamp(0.75rem, 1.4vw, 1.15rem)',
                  left: firstDotPosition,
                  x: '-50%',
                  boxShadow: '0 0 18px color-mix(in srgb, var(--color-7) 70%, transparent)',
                }}
                initial={{ top: '-1.1em', opacity: 0, scale: 0.4 }}
                animate={
                  prefersReducedMotion
                    ? { top: '0.68em', left: '100%', opacity: 1, scale: 0.96 }
                    : {
                        top: dotTopPositions,
                        left: dotPositions,
                        opacity: dotOpacity,
                        scale: dotScale,
                      }
                }
                transition={wordmarkTransition}
                aria-hidden="true"
              />
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(5px)' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.62,
                delay: prefersReducedMotion ? 0.04 : 4.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex w-fit max-w-[90vw] flex-col items-center"
            >
              <p className="text-center text-base font-semibold tracking-wide text-[var(--color-2)] sm:text-lg md:text-xl">
                {t('preloader.tagline')}
              </p>
              <motion.span
                className="mt-3 h-px w-full rounded-full bg-[var(--color-7)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-7)_55%,transparent)]"
                style={{ transformOrigin: langConfig.dir === 'rtl' ? 'right center' : 'left center' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.72 }}
                transition={{
                  duration: prefersReducedMotion ? 0.16 : 0.55,
                  delay: prefersReducedMotion ? 0 : 4.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.18 : 0.42,
                delay: prefersReducedMotion ? 0.12 : 4.35,
                ease: 'easeOut',
              }}
              className="mt-12 w-[min(70vw,18rem)] sm:mt-14"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-1)] sm:text-[10px]">
                  {t('preloader.loading')}
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-7)] shadow-[0_0_10px_var(--color-7)]"
                  aria-hidden="true"
                />
              </div>

              <div className="h-[3px] w-full overflow-hidden rounded-full bg-[var(--color-3)]/80" aria-hidden="true">
                <motion.div
                  className="h-full w-full rounded-full bg-[var(--color-7)] shadow-[0_0_12px_color-mix(in_srgb,var(--color-7)_65%,transparent)]"
                  style={{ transformOrigin: langConfig.dir === 'rtl' ? 'right center' : 'left center' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isProgressComplete ? 1 : 0.9 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.18 : isProgressComplete ? 0.18 : 0.55,
                    delay: prefersReducedMotion || isProgressComplete ? 0 : 4.45,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

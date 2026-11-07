import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createGsapContext, gsap, scheduleScrollTriggerRefresh } from '../motion/gsap.js';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, modalBackdropVariants, modalPanelVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { certifications } from '../data/certifications';
import { useLanguage } from '../context/LanguageContext.jsx';

const allCertificates = certifications.flatMap((category) =>
  category.items.map((certificate) => ({
    ...certificate,
    categoryId: category.id,
    categoryIcon: category.icon,
    category: category.title,
  }))
);

const formatNumber = (number) => String(number).padStart(2, '0');

function CertificateWheel({ certificates, language, t, onSelect }) {
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  const touchStartRef = useRef({ x: 0, time: 0 });
  const [active, setActive] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const count = certificates.length || 1;
  const stageLength = 120 + (count - 1) * 38;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const context = createGsapContext(stage, () => {
      gsap.to(stage, {
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawProgress = self.progress * (count - 1);
            const next = Math.max(0, Math.min(count - 1, Math.round(rawProgress)));
            setActive((current) => (current === next ? current : next));
            setRotationY(rawProgress * 180);
          },
        },
      });
    });
    const stopRefresh = scheduleScrollTriggerRefresh();

    return () => {
      stopRefresh();
      context.revert();
    };
  }, [count]);

  const scrollToCertificate = useCallback((index) => {
    const targetIndex = Math.max(0, Math.min(count - 1, index));
    const stage = stageRef.current;
    if (!stage) return;
    const scrollable = Math.max(0, stage.offsetHeight - window.innerHeight);
    const top = window.scrollY + stage.getBoundingClientRect().top + (scrollable * targetIndex) / (count - 1 || 1);
    window.scrollTo({ top, behavior: 'smooth' });
    setActive(targetIndex);
    setRotationY(targetIndex * 180);
  }, [count]);

  const handlePrev = (event) => {
    event.stopPropagation();
    scrollToCertificate(active - 1 < 0 ? count - 1 : active - 1);
  };

  const handleNext = (event) => {
    event.stopPropagation();
    scrollToCertificate(active + 1 >= count ? 0 : active + 1);
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, time: Date.now() };
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaTime = Date.now() - touchStartRef.current.time;
    if (Math.abs(deltaX) > 40 && deltaTime < 400) {
      if (deltaX < 0) handleNext(e);
      else handlePrev(e);
    }
  };

  const activeCert = certificates[active] || certificates[0];
  const previousLabel = t('certifications.prev') || 'Previous Certificate';
  const nextLabel = t('certifications.next') || 'Next Certificate';

  // Compute 3D front & back face indices
  const currentRotationStep = Math.floor(rotationY / 180);
  const frontIndex = (currentRotationStep % 2 === 0 ? currentRotationStep : currentRotationStep + 1) % count;
  const backIndex = (currentRotationStep % 2 === 1 ? currentRotationStep : currentRotationStep + 1) % count;

  const frontCert = certificates[frontIndex] || certificates[0];
  const backCert = certificates[backIndex] || certificates[0];

  return (
    <div ref={stageRef} style={{ height: `${stageLength}svh` }} className="certificate-scroll-stage relative">
      <div className="certificate-scroll-sticky sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* Top Hint */}
        <div className="certificate-wheel-hint absolute top-16 z-10 px-4 text-center sm:top-24">
          <p className="text-xs font-black tracking-widest text-[var(--color-2)] uppercase">
            {language === 'ar' ? 'مرّر أو انقر لتقليب بطاقات الشهادات 3D ↺' : 'Scroll or click to flip 3D certificates ↺'}
          </p>
          <p className="mt-1 text-xs font-medium text-[var(--color-4)]/70">
            {t('certifications.wheelClickHint')}
          </p>
        </div>

        {/* Center 3D Flipping Stage */}
        <div className="relative flex w-full items-center justify-center py-6">
          {/* Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-7)]/12 blur-[100px] dark:bg-[var(--color-7)]/18"
          />

          {/* Navigation Arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={previousLabel}
              className="group pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/80 text-[var(--color-4)] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-115 hover:border-[var(--color-2)] hover:bg-[var(--color-2)] hover:text-white dark:border-white/10 dark:bg-[var(--color-6)]/80"
            >
              <svg className="h-5 w-5 rtl:rotate-180 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={nextLabel}
              className="group pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/80 text-[var(--color-4)] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-115 hover:border-[var(--color-2)] hover:bg-[var(--color-2)] hover:text-white dark:border-white/10 dark:bg-[var(--color-6)]/80"
            >
              <svg className="h-5 w-5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 3D Double-Sided Flipping Card Container */}
          <div
            className="certificate-flip-stage relative z-10 w-[min(88vw,21rem)] sm:w-[min(84vw,26rem)] aspect-[4/4.8] sm:aspect-[4/4.5]"
            style={{ perspective: '1100px' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Deck Stack Layer 2 (Bottom layer behind card) */}
            <div
              className="certificate-deck-layer-2 pointer-events-none absolute inset-0 rounded-[1.5rem] border border-[var(--color-3)] bg-white/60 shadow-md dark:border-white/10 dark:bg-[var(--color-6)]/60"
              style={{ transform: 'translateZ(-50px) translateY(14px) scale(0.91)', opacity: 0.45 }}
            />

            {/* Deck Stack Layer 1 (Middle layer behind card) */}
            <div
              className="certificate-deck-layer-1 pointer-events-none absolute inset-0 rounded-[1.5rem] border border-[var(--color-3)] bg-white/80 shadow-lg dark:border-white/10 dark:bg-[var(--color-6)]/80"
              style={{ transform: 'translateZ(-25px) translateY(7px) scale(0.955)', opacity: 0.75 }}
            />

            {/* Main Double-Sided Flipping 3D Card */}
            <div
              ref={cardRef}
              onClick={() => onSelect(activeCert)}
              className="certificate-flip-card group relative h-full w-full cursor-pointer rounded-[1.5rem]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotationY}deg)`,
                transition: 'transform 850ms cubic-bezier(0.25, 1, 0.35, 1)',
              }}
            >
              {/* FRONT FACE */}
              <div
                className="certificate-card-face certificate-card-front absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] border-2 border-[var(--color-7)] bg-white/95 text-start shadow-xl backdrop-blur-sm dark:border-[var(--color-7)] dark:bg-[var(--color-6)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-3)] bg-[var(--color-6)]">
                  <img
                    src={`${import.meta.env.BASE_URL}certificates/previews/${frontCert.file.replace(/\.pdf$/i, '.jpg')}`}
                    alt={`${frontCert.title} preview`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 start-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-4)]/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    <span>{t('certifications.openDetails')}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="absolute top-3 end-3 z-10 rounded-full border border-[var(--color-3)] bg-white/95 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm dark:bg-[var(--color-5)]">
                    {frontCert.category[language]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <span className="text-xs font-extrabold text-[var(--color-2)]">{frontCert.category[language]}</span>
                    <h3 className="mt-1 line-clamp-2 text-base font-black leading-snug text-[var(--color-4)] sm:text-lg">{frontCert.title}</h3>
                    <p className="mt-1.5 line-clamp-1 text-xs font-bold text-[var(--color-1)]">{frontCert.issuer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--color-3)]/60 pt-3 dark:border-white/10">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wider text-[var(--color-2)] uppercase">
                      <span>3D Card Flip</span>
                      <span>↺</span>
                    </span>
                    <span className="text-xs font-black tabular-nums text-[var(--color-4)]/70">{formatNumber(frontIndex + 1)} / {formatNumber(count)}</span>
                  </div>
                </div>
              </div>

              {/* BACK FACE */}
              <div
                className="certificate-card-face certificate-card-back absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] border-2 border-[var(--color-7)] bg-white/95 text-start shadow-xl backdrop-blur-sm dark:border-[var(--color-7)] dark:bg-[var(--color-6)]"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-3)] bg-[var(--color-6)]">
                  <img
                    src={`${import.meta.env.BASE_URL}certificates/previews/${backCert.file.replace(/\.pdf$/i, '.jpg')}`}
                    alt={`${backCert.title} preview`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 start-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-4)]/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                    <span>{t('certifications.openDetails')}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="absolute top-3 end-3 z-10 rounded-full border border-[var(--color-3)] bg-white/95 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm dark:bg-[var(--color-5)]">
                    {backCert.category[language]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <span className="text-xs font-extrabold text-[var(--color-2)]">{backCert.category[language]}</span>
                    <h3 className="mt-1 line-clamp-2 text-base font-black leading-snug text-[var(--color-4)] sm:text-lg">{backCert.title}</h3>
                    <p className="mt-1.5 line-clamp-1 text-xs font-bold text-[var(--color-1)]">{backCert.issuer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--color-3)]/60 pt-3 dark:border-white/10">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wider text-[var(--color-2)] uppercase">
                      <span>3D Card Flip</span>
                      <span>↺</span>
                    </span>
                    <span className="text-xs font-black tabular-nums text-[var(--color-4)]/70">{formatNumber(backIndex + 1)} / {formatNumber(count)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Progress Controls */}
        <div className="certificate-wheel-footer absolute bottom-5 z-10 flex flex-col items-center gap-3 px-4 text-center sm:bottom-8">
          <div className="max-w-md">
            <p className="text-sm font-extrabold text-[var(--color-4)]">{activeCert?.title}</p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--color-2)]">
              {activeCert?.category ? activeCert.category[language] : ''} · {activeCert?.issuer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5" dir="ltr">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.file}
                type="button"
                onClick={() => scrollToCertificate(index)}
                aria-pressed={index === active}
                aria-label={`Go to certificate ${index + 1}: ${certificate.title}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${index === active ? 'w-7 bg-[var(--color-7)]' : 'w-2 bg-[var(--color-1)]/45 hover:bg-[var(--color-2)]/80'}`}
              />
            ))}
          </div>

          <span className="text-xs font-bold tabular-nums text-[var(--color-4)]/70" dir="ltr" aria-live="polite">
            {formatNumber(active + 1)} <span aria-hidden="true">/</span> {formatNumber(count)}
          </span>
        </div>
      </div>
    </div>
  );
}

function CertificateDetails({
  certificate,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  language,
  t,
  onClose,
  }) {
  const dialogRef = useRef(null);
  const latestPropsRef = useRef({ onClose, onNext, onPrev, language });

  useEffect(() => {
    latestPropsRef.current = { onClose, onNext, onPrev, language };
  }, [onClose, onNext, onPrev, language]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('modal:opened'));
    dialog?.querySelector('button')?.focus();

    const handleKeyDown = (event) => {
      const { onClose: close, onNext: next, onPrev: previous, language: currentLanguage } = latestPropsRef.current;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        currentLanguage === 'ar' ? next() : previous();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        currentLanguage === 'ar' ? previous() : next();
      } else if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll('a[href], button:not([disabled])')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.dispatchEvent(new CustomEvent('modal:closed'));
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-detail-title"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalBackdropVariants}
      data-lenis-prevent="true"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-4)]/80 p-4 backdrop-blur-md overscroll-contain sm:p-8"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalPanelVariants}
        data-lenis-prevent="true"
        className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-[var(--color-5)] shadow-2xl overscroll-contain dark:border-white/10 dark:bg-[var(--color-6)]"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--color-3)] px-5 py-3.5 sm:px-7 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[var(--color-2)]">{certificate.category[language]}</span>
            <span className="text-xs font-semibold tabular-nums text-[var(--color-4)]/60">
              ({formatNumber(currentIndex + 1)} / {formatNumber(totalCount)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={onPrev}
              aria-label={t('certifications.prev') || 'Previous'}
              title={t('certifications.prev')}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] text-xs text-[var(--color-4)] transition hover:bg-[var(--color-2)] hover:text-white dark:border-white/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={t('certifications.next') || 'Next'}
              title={t('certifications.next')}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] text-xs text-[var(--color-4)] transition hover:bg-[var(--color-2)] hover:text-white dark:border-white/10"
            >
              →
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('certifications.closeDetails')}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] text-sm text-[var(--color-4)] transition hover:bg-[var(--color-2)] hover:text-white dark:border-white/10"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="overflow-hidden rounded-xl border border-[var(--color-3)] bg-[var(--color-6)] dark:border-white/10">
            <img
              src={`${import.meta.env.BASE_URL}certificates/previews/${certificate.file.replace(/\.pdf$/i, '.jpg')}`}
              alt={`${certificate.title} preview`}
              className="mx-auto max-h-[42vh] w-full object-contain"
            />
          </div>
          <div className="mt-6">
            <span dir="auto" className="inline-block rounded-full bg-[var(--color-8)]/15 px-3 py-1 text-xs font-bold text-[var(--color-2)]">
              {certificate.issuer}
            </span>
            <h3 id="certificate-detail-title" dir="auto" className="mt-3 text-2xl font-black leading-tight text-[var(--color-4)]">
              {certificate.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-4)]/75 sm:text-base">
              {certificate.description[language]}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--color-3)] pt-5 text-sm font-bold text-[var(--color-2)] dark:border-white/10">
              <a
                href={`${import.meta.env.BASE_URL}certificates/${certificate.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-2)] px-5 py-2.5 text-xs text-white shadow-sm transition hover:bg-[var(--color-4)]"
              >
                <span>{t('certifications.view')}</span>
                <span aria-hidden="true">↗</span>
              </a>
              {certificate.verification && (
                <a
                  href={certificate.verification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-3)] px-4 py-2.5 text-xs text-[var(--color-4)] transition hover:border-[var(--color-2)] hover:text-[var(--color-2)] dark:border-white/15"
                >
                  <span>{t('certifications.verify')}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const { language, langConfig, t } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const sectionRef = useRef(null);
  const sealRef = useRef(null);
  const headingVariants = getRevealVariants({ distance: profile.revealDistance });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const seal = sealRef.current;
    if (!profile.parallaxDistance || !section || !seal) return undefined;

    const context = createGsapContext(section, () => {
      gsap.fromTo(seal,
        { rotation: -profile.parallaxDistance * 0.52, y: profile.parallaxDistance },
        {
          rotation: profile.parallaxDistance * 0.52,
          y: -profile.parallaxDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );
    });
    const stopRefresh = scheduleScrollTriggerRefresh();
    return () => {
      stopRefresh();
      context.revert();
    };
  }, [language, profile.parallaxDistance]);

  const selectedIndex = selectedCertificate
    ? allCertificates.findIndex((c) => c.file === selectedCertificate.file)
    : -1;

  const handleNextCertificate = useCallback(() => {
    setSelectedCertificate((current) => {
      if (!allCertificates.length) return current;
      const currentIndex = allCertificates.findIndex((certificate) => certificate.file === current?.file);
      return allCertificates[(currentIndex + 1 + allCertificates.length) % allCertificates.length];
    });
  }, [setSelectedCertificate]);

  const handlePrevCertificate = useCallback(() => {
    setSelectedCertificate((current) => {
      if (!allCertificates.length) return current;
      const currentIndex = allCertificates.findIndex((certificate) => certificate.file === current?.file);
      const previousIndex = currentIndex < 0 ? allCertificates.length - 1 : (currentIndex - 1 + allCertificates.length) % allCertificates.length;
      return allCertificates[previousIndex];
    });
  }, [setSelectedCertificate]);

  const closeCertificateDetails = useCallback(() => setSelectedCertificate(null), [setSelectedCertificate]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      dir={langConfig.dir}
      aria-labelledby="certifications-heading"
      data-experience-section
      className="section-flow relative scroll-mt-24 bg-[var(--color-5)] px-6 py-24 font-sans md:px-12 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute end-0 top-16 h-72 w-72 rounded-full bg-[var(--color-8)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={headingVariants}
          className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]"
        >
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-[var(--color-6)]/75 px-5 py-1.5 text-sm font-bold text-[var(--color-2)] dark:border-white/10 dark:bg-[var(--color-6)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
              {t('certifications.badge')}
            </span>
            <h2 id="certifications-heading" className="text-4xl font-black leading-[1.12] tracking-tight text-[var(--color-4)] md:text-6xl">
              {t('certifications.heading')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-4)]/75 md:text-lg">
              {t('certifications.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-8 border-t border-[var(--color-3)] pt-6 dark:border-white/10">
              <div>
                <span dir="ltr" className="block text-3xl font-black tabular-nums text-[var(--color-2)]">
                  {formatNumber(allCertificates.length)}
                </span>
                <span className="mt-1 block text-xs font-bold text-[var(--color-4)]/65">{t('certifications.totalLabel')}</span>
              </div>
              <div>
                <span dir="ltr" className="block text-3xl font-black tabular-nums text-[var(--color-2)]">
                  {formatNumber(certifications.length)}
                </span>
                <span className="mt-1 block text-xs font-bold text-[var(--color-4)]/65">{t('certifications.fieldsLabel')}</span>
              </div>
            </div>
          </div>
          <div
            ref={sealRef}
            aria-hidden="true"
            className="pointer-events-none relative mx-auto flex h-40 w-40 items-center justify-center md:mx-0 md:h-48 md:w-48 lg:h-64 lg:w-64"
          >
            <div className="absolute inset-0 rounded-full border border-[var(--color-2)]/15" />
            <div className="absolute inset-3 rounded-full border border-dashed border-[var(--color-2)]/30" />
            <div className="absolute inset-8 rounded-full bg-[var(--color-8)]/15" />
            <svg viewBox="0 0 100 100" fill="none" className="relative h-24 w-24 text-[var(--color-2)] lg:h-32 lg:w-32">
              <circle cx="50" cy="42" r="23" stroke="currentColor" strokeWidth="1.4" />
              <path d="M36 60 32 84l18-10 18 10-4-24M40 42l7 7 14-16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.header>

        {/* 3D Wheel Showcase */}
        <div className="mt-10">
          <CertificateWheel
            certificates={allCertificates}
            language={language}
            t={t}
            onSelect={setSelectedCertificate}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateDetails
            key="certificate-details"
            certificate={selectedCertificate}
            currentIndex={selectedIndex}
            totalCount={allCertificates.length}
            onPrev={handlePrevCertificate}
            onNext={handleNextCertificate}
            language={language}
            t={t}
            onClose={closeCertificateDetails}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

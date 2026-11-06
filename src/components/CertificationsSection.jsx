import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, modalBackdropVariants, modalPanelVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useReducedMotionPreference.js';
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

function CertificateWheel({ certificates, language, t, onSelect, reduceMotion, profile }) {
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = certificates.length || 1;
  const stageLength = 100 + (count - 1) * profile.certificateStep;
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  const rotation = useTransform(scrollYProgress, (value) => {
    const certificateIndex = value * (count - 1);
    const angle = reduceMotion ? Math.round(certificateIndex) : certificateIndex;
    return -(angle * 360) / count;
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.max(0, Math.min(count - 1, Math.round(value * (count - 1))));
    setActive((current) => (current === next ? current : next));
  });

  const scrollToCertificate = useCallback((index) => {
    const stage = stageRef.current;
    if (!stage) return;
    const scrollable = Math.max(0, stage.offsetHeight - window.innerHeight);
    const targetIndex = Math.max(0, Math.min(count - 1, index));
    const top = window.scrollY + stage.getBoundingClientRect().top + (scrollable * targetIndex) / (count - 1 || 1);
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [count, reduceMotion]);

  const handleCardClick = (certificate, index) => {
    if (index === active) {
      onSelect(certificate);
    } else {
      scrollToCertificate(index);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    scrollToCertificate(active - 1 < 0 ? count - 1 : active - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    scrollToCertificate(active + 1 >= count ? 0 : active + 1);
  };

  const activeCert = certificates[active] || certificates[0];

  return (
    <div ref={stageRef} style={{ height: `${stageLength}svh` }} className="certificate-scroll-stage relative">
      <div className="certificate-scroll-sticky sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* Top Hint */}
        <div className="certificate-wheel-hint absolute top-20 z-10 px-4 text-center sm:top-24">
          <p className="text-xs font-black tracking-widest text-[var(--color-2)] uppercase">
            {t('certifications.wheelScrollHint')}
          </p>
          <p className="mt-1.5 text-xs font-medium text-[var(--color-4)]/70">
            {t('certifications.wheelClickHint')}
          </p>
        </div>

        {/* 3D Scene Container */}
        <div className="relative w-full">
          {/* Ambient Spotlight Behind 3D Stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-7)]/10 blur-[90px] dark:bg-[var(--color-7)]/15"
          />

          {/* Left & Right Interactive Spin Arrows */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t('certifications.prev') || 'Previous Certificate'}
              className="group pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/80 text-[var(--color-4)] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-115 hover:border-[var(--color-2)] hover:bg-[var(--color-2)] hover:text-white dark:border-white/10 dark:bg-[var(--color-6)]/80"
            >
              <svg className="h-5 w-5 rtl:rotate-180 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={t('certifications.next') || 'Next Certificate'}
              className="group pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-3)] bg-white/80 text-[var(--color-4)] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-115 hover:border-[var(--color-2)] hover:bg-[var(--color-2)] hover:text-white dark:border-white/10 dark:bg-[var(--color-6)]/80"
            >
              <svg className="h-5 w-5 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 3D Wheel Scene */}
          <div className="certificate-wheel-scene w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div aria-hidden="true" className="certificate-wheel-orbit" />
            
            <motion.div
              className="certificate-wheel"
              style={{ rotateY: rotation }}
              onClick={(event) => {
                // Some 3D angles hit the wheel surface instead of its front-facing card.
                if (event.target === event.currentTarget && activeCert) {
                  event.currentTarget.querySelector('.certificate-wheel-card[aria-pressed="true"]')?.focus({ preventScroll: true });
                  onSelect(activeCert);
                }
              }}
            >
              {certificates.map((certificate, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={certificate.file}
                    type="button"
                    onClick={() => handleCardClick(certificate, index)}
                    aria-pressed={isActive}
                    aria-label={`${t('certifications.openDetails')}: ${certificate.title}`}
                    className={`certificate-wheel-card ${isActive ? 'is-active' : 'opacity-85 hover:opacity-100'}`}
                    style={{
                      transform: `rotateY(${(index * 360) / count}deg) translateZ(var(--certificate-wheel-radius))`,
                    }}
                  >
                    <span className="certificate-wheel-image">
                      <img
                        src={`${import.meta.env.BASE_URL}certificates/previews/${certificate.file.replace(/\.pdf$/i, '.jpg')}`}
                        alt=""
                        loading="lazy"
                      />
                      {isActive && (
                        <span className="absolute bottom-2 start-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md backdrop-blur-sm">
                          <span>{t('certifications.openDetails')}</span>
                          <span>↗</span>
                        </span>
                      )}
                    </span>
                    <span className="certificate-wheel-copy">
                      <span>{certificate.category[language]}</span>
                      <strong dir="auto">{certificate.title}</strong>
                      <small dir="auto">{certificate.issuer}</small>
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Active Information & Navigation Dots */}
        <div className="certificate-wheel-footer absolute bottom-6 z-10 flex flex-col items-center gap-3 px-4 text-center sm:bottom-8">
          <div className="max-w-md">
            <p className="text-sm font-extrabold text-[var(--color-4)]">
              {activeCert?.title}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[var(--color-2)]">
              {activeCert?.category ? activeCert.category[language] : ''} · {activeCert?.issuer}
            </p>
          </div>

          {/* Interactive Navigation Dots */}
          <div className="flex flex-wrap items-center justify-center gap-1.5" dir="ltr">
            {certificates.map((certificate, index) => (
              <button
                key={certificate.file}
                type="button"
                onClick={() => scrollToCertificate(index)}
                aria-pressed={index === active}
                aria-label={`Go to certificate ${index + 1}: ${certificate.title}`}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  index === active
                    ? 'w-7 bg-[var(--color-7)]'
                    : 'w-2 bg-[var(--color-1)]/45 hover:bg-[var(--color-2)]/80'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold tabular-nums text-[var(--color-4)]/70" dir="ltr" aria-live="polite">
            {formatNumber(active + 1)} / {formatNumber(certificates.length)}
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
  reducedMotion,
}) {
  const dialogRef = useRef(null);
  const latestPropsRef = useRef({ onClose, onNext, onPrev, language });

  useEffect(() => {
    latestPropsRef.current = { onClose, onNext, onPrev, language };
  }, [onClose, onNext, onPrev, language]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-detail-title"
      initial={reducedMotion ? false : 'hidden'}
      animate="visible"
      exit="exit"
      variants={modalBackdropVariants}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-4)]/80 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        initial={reducedMotion ? false : 'hidden'}
        animate="visible"
        exit="exit"
        variants={modalPanelVariants}
        className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-[var(--color-5)] shadow-2xl dark:border-white/10 dark:bg-[var(--color-6)]"
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
  const { reducedMotion, isMobile, isShortViewport } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isShortViewport, reducedMotion });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sealRotate = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : isMobile ? -6 : -18, reducedMotion ? 0 : isMobile ? 6 : 18]);
  const sealY = useTransform(scrollYProgress, [0, 1], [reducedMotion ? 0 : isMobile ? 10 : 30, reducedMotion ? 0 : isMobile ? -10 : -30]);
  const headingVariants = getRevealVariants({ reducedMotion, distance: profile.revealDistance });

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
          initial={reducedMotion ? false : 'hidden'}
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
          <motion.div
            aria-hidden="true"
            style={{ rotate: sealRotate, y: sealY }}
            className="pointer-events-none absolute end-0 top-0 hidden h-48 w-48 items-center justify-center md:relative md:flex lg:h-64 lg:w-64"
          >
            <div className="absolute inset-0 rounded-full border border-[var(--color-2)]/15" />
            <div className="absolute inset-3 rounded-full border border-dashed border-[var(--color-2)]/30" />
            <div className="absolute inset-8 rounded-full bg-[var(--color-8)]/15" />
            <svg viewBox="0 0 100 100" fill="none" className="relative h-24 w-24 text-[var(--color-2)] lg:h-32 lg:w-32">
              <circle cx="50" cy="42" r="23" stroke="currentColor" strokeWidth="1.4" />
              <path d="M36 60 32 84l18-10 18 10-4-24M40 42l7 7 14-16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.header>

        {/* 3D Wheel Showcase */}
        <div className="mt-10">
          <CertificateWheel
            certificates={allCertificates}
            language={language}
            t={t}
            onSelect={setSelectedCertificate}
            reduceMotion={reducedMotion}
            profile={profile}
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
            reducedMotion={reducedMotion}
            onClose={closeCertificateDetails}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

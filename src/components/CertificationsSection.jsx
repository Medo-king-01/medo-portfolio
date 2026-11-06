import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { certifications } from '../data/certifications';
import { useLanguage } from '../context/LanguageContext.jsx';

const certificates = certifications.flatMap((category) =>
  category.items.map((certificate) => ({ ...certificate, category: category.title }))
);
const formatNumber = (number) => String(number).padStart(2, '0');

function CertificateWheel({ language, t, onSelect }) {
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -(360 - 360 / certificates.length)]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.max(0, Math.min(certificates.length - 1, Math.round(value * (certificates.length - 1))));
    setActive((current) => current === next ? current : next);
  });

  // Tabbing to a card brings its position on the ring into view, without extra navigation buttons.
  const focusCertificate = (index, event) => {
    if (!event.currentTarget.matches(':focus-visible') || index === active || !stageRef.current) return;
    const stage = stageRef.current;
    const distance = Math.max(0, stage.offsetHeight - window.innerHeight);
    const top = window.scrollY + stage.getBoundingClientRect().top + distance * index / (certificates.length - 1);
    window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <div ref={stageRef} style={{ height: `${100 + (certificates.length - 1) * 52}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-24 z-10 px-4 text-center sm:top-28">
          <p className="text-xs font-black text-[var(--color-2)]">{t('certifications.wheelScrollHint')}</p>
          <p className="mt-2 text-xs font-medium text-[var(--color-4)]/70">{t('certifications.wheelClickHint')}</p>
        </div>
        <div className="certificate-wheel-scene w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div aria-hidden="true" className="certificate-wheel-orbit" />
          <motion.div className="certificate-wheel" style={{ rotateY: rotation }}>
            {certificates.map((certificate, index) => (
              <button
                key={certificate.file}
                type="button"
                onFocus={(event) => focusCertificate(index, event)}
                onClick={() => onSelect(certificate)}
                aria-label={`${t('certifications.openDetails')}: ${certificate.title}`}
                className="certificate-wheel-card"
                style={{ transform: `rotateY(${index * 360 / certificates.length}deg) translateZ(var(--certificate-wheel-radius))` }}
              >
                <span className="certificate-wheel-image">
                  <img src={`${import.meta.env.BASE_URL}certificates/previews/${certificate.file.replace(/\.pdf$/i, '.jpg')}`} alt="" loading="lazy" />
                </span>
                <span className="certificate-wheel-copy">
                  <span>{certificate.category[language]}</span>
                  <strong dir="auto">{certificate.title}</strong>
                  <small dir="auto">{certificate.issuer}</small>
                </span>
              </button>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-7 z-10 flex flex-col items-center gap-3 px-4 text-center sm:bottom-10">
          <p className="text-sm font-bold text-[var(--color-4)]">{certificates[active].category[language]}</p>
          <div aria-hidden="true" className="flex gap-1.5" dir="ltr">
            {certificates.map((certificate, index) => <span key={certificate.file} className={`h-1 rounded-full transition-all duration-300 ${index === active ? 'w-6 bg-[var(--color-2)]' : 'w-2 bg-[var(--color-1)]/45'}`} />)}
          </div>
          <span className="text-xs font-bold tabular-nums text-[var(--color-4)]/65" dir="ltr" aria-live="polite">{formatNumber(active + 1)} / {formatNumber(certificates.length)}</span>
        </div>
      </div>
    </div>
  );
}

function CertificateDetails({ certificate, language, t, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';
    dialog?.querySelector('button')?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll('a[href], button:not([disabled])')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="certificate-detail-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-4)]/75 p-4 backdrop-blur-sm sm:p-8">
      <div className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-[var(--color-5)] shadow-2xl">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--color-3)] px-5 py-3 sm:px-7">
          <span className="text-xs font-black text-[var(--color-2)]">{certificate.category[language]}</span>
          <button type="button" onClick={onClose} aria-label={t('certifications.closeDetails')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-3)] text-[var(--color-4)] transition hover:bg-[var(--color-2)] hover:text-[var(--color-5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-2)]">✕</button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="overflow-hidden rounded-xl border border-[var(--color-3)] bg-[var(--color-6)]">
            <img src={`${import.meta.env.BASE_URL}certificates/previews/${certificate.file.replace(/\.pdf$/i, '.jpg')}`} alt="" className="mx-auto max-h-[36vh] w-full object-contain" />
          </div>
          <div className="mt-6">
            <span dir="auto" className="inline-block rounded-full bg-[var(--color-8)]/15 px-3 py-1 text-xs font-bold text-[var(--color-2)]">{certificate.issuer}</span>
            <h3 id="certificate-detail-title" dir="auto" className="mt-3 text-2xl font-black leading-tight text-[var(--color-4)]">{certificate.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-4)]/75 sm:text-base">{certificate.description[language]}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--color-3)] pt-5 text-sm font-bold text-[var(--color-2)]">
              <a href={`${import.meta.env.BASE_URL}certificates/${certificate.file}`} target="_blank" rel="noopener noreferrer" className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-2)]">{t('certifications.view')} <span aria-hidden="true">↗</span></a>
              {certificate.verification && <a href={certificate.verification} target="_blank" rel="noopener noreferrer" className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-2)]">{t('certifications.verify')} <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  const { language, langConfig, t } = useLanguage();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sealRotate = useTransform(scrollYProgress, [0, 1], [reduceMotion ? -3 : -18, reduceMotion ? 3 : 18]);
  const sealY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 4 : 30, reduceMotion ? -4 : -30]);

  return (
    <section ref={sectionRef} id="certifications" dir={langConfig.dir} aria-labelledby="certifications-heading" className="relative scroll-mt-24 bg-[var(--color-5)] px-6 py-24 font-sans md:px-12 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute end-0 top-16 h-72 w-72 rounded-full bg-[var(--color-8)]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <header className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-[var(--color-6)]/75 px-5 py-1.5 text-sm font-bold text-[var(--color-2)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />{t('certifications.badge')}</span>
            <h2 id="certifications-heading" className="text-4xl font-black leading-[1.12] tracking-tight text-[var(--color-4)] md:text-6xl">{t('certifications.heading')}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-4)]/75 md:text-lg">{t('certifications.description')}</p>
            <div className="mt-8 flex flex-wrap gap-8 border-t border-[var(--color-3)] pt-6">
              <div><span dir="ltr" className="block text-3xl font-black tabular-nums text-[var(--color-2)]">{formatNumber(certificates.length)}</span><span className="mt-1 block text-xs font-bold text-[var(--color-4)]/65">{t('certifications.totalLabel')}</span></div>
              <div><span dir="ltr" className="block text-3xl font-black tabular-nums text-[var(--color-2)]">{formatNumber(certifications.length)}</span><span className="mt-1 block text-xs font-bold text-[var(--color-4)]/65">{t('certifications.fieldsLabel')}</span></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2" aria-label={t('certifications.fieldsLabel')}>
              {certifications.map((category) => <span key={category.id} className="rounded-full border border-[var(--color-3)] px-3 py-1.5 text-xs font-semibold text-[var(--color-4)]/75">{category.title[language]} · {category.items.length}</span>)}
            </div>
          </div>
          <motion.div aria-hidden="true" style={{ rotate: sealRotate, y: sealY }} className="pointer-events-none absolute end-0 top-0 hidden h-48 w-48 items-center justify-center md:relative md:flex lg:h-64 lg:w-64">
            <div className="absolute inset-0 rounded-full border border-[var(--color-2)]/15" />
            <div className="absolute inset-3 rounded-full border border-dashed border-[var(--color-2)]/30" />
            <div className="absolute inset-8 rounded-full bg-[var(--color-8)]/15" />
            <svg viewBox="0 0 100 100" fill="none" className="relative h-24 w-24 text-[var(--color-2)] lg:h-32 lg:w-32"><circle cx="50" cy="42" r="23" stroke="currentColor" strokeWidth="1.4" /><path d="M36 60 32 84l18-10 18 10-4-24M40 42l7 7 14-16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.div>
        </header>
        <CertificateWheel language={language} t={t} onSelect={setSelectedCertificate} />
      </div>
      {selectedCertificate && <CertificateDetails certificate={selectedCertificate} language={language} t={t} onClose={() => setSelectedCertificate(null)} />}
    </section>
  );
}

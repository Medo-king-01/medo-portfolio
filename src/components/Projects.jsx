import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext.jsx';

const resolveLocalized = (field, language) => {
  if (field && typeof field === 'object') {
    return field[language] || field.en || '';
  }
  return field || '';
};

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GitHubIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LockIcon = ({ className = 'h-4 w-4 shrink-0' }) => (
  <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ZoomIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm0-11v6m-3-3h6" />
  </svg>
);

const ProblemIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const StackIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const SolutionIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LinksIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const ProjectCard = ({ project, language, t, onOpenPreview }) => {
  const title = resolveLocalized(project.title, language);
  const description = resolveLocalized(project.description, language);
  const note = resolveLocalized(project.note, language);
  const badge = resolveLocalized(project.badge, language);
  const techTagsLabel = resolveLocalized(project.techTagsLabel, language);
  const problem = resolveLocalized(project.caseStudy?.problem, language);
  const solution = resolveLocalized(project.caseStudy?.solution, language);
  const demoLabel = resolveLocalized(project.links?.demoLabel, language) || t('projects.liveDemo');

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-white/95 shadow-[0_14px_40px_rgba(27,23,22,0.07)] "
    >
      {/* Visual Preview Header */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--color-3)] bg-[var(--color-6)]">
        {project.image ? (
          <button
            type="button"
            onClick={() => onOpenPreview({ image: project.image, title, badge })}
            aria-label={`${t('projects.previewImage')}: ${title}`}
            className="relative block h-full w-full cursor-zoom-in overflow-hidden text-start focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--color-7)]"
          >
            <img
              src={project.image}
              alt={`${title} project preview`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-[var(--color-4)]/0 transition-colors duration-300 group-hover:bg-[var(--color-4)]/20" />
            <span className="pointer-events-none absolute bottom-4 start-5 z-20 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-[var(--color-4)]/90 px-3.5 py-1.5 text-[11px] font-bold text-[var(--color-5)] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ZoomIcon />
              <span>{t('projects.previewImage')}</span>
            </span>
          </button>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-5)] to-[var(--color-6)]"
            aria-hidden="true"
          >
            <StackIcon />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-4)]/70 via-[var(--color-4)]/20 to-transparent" />
        <span className="pointer-events-none absolute start-4 top-4 z-10 rounded-full border border-[var(--color-3)] bg-white/95 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--color-2)] shadow-sm backdrop-blur-sm">
          {badge}
        </span>
        <span className="pointer-events-none absolute bottom-3 end-5 z-10 text-3xl font-black italic tracking-tight text-white drop-shadow-[0_2px_8px_rgba(27,23,22,0.75)]">
          {project.number}
        </span>
      </div>

      {/* Unified Case Study Body */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        {/* Title & Summary */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[var(--color-2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
            {t('projects.caseStudyBadge')}
          </span>
          <h3 className="mt-1.5 text-2xl font-black tracking-tight text-[var(--color-4)] md:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2.5 text-sm font-semibold leading-relaxed text-[var(--color-4)]/80 md:text-[15px]">
              {description}
            </p>
          )}
          {note && <p className="mt-3 text-sm font-bold text-[var(--color-2)]">{note}</p>}
        </div>

        {/* 4 Unified Case Study Sections */}
        <div className="mt-6 flex flex-1 flex-col gap-4">
          {/* 1. Problem / Idea */}
          {problem && (
            <div className="rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/75 p-4 transition-colors group-hover:border-[var(--color-3)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[var(--color-2)]">
                <ProblemIcon />
                <span>{t('projects.problemLabel')}</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-4)]/80">
                {problem}
              </p>
            </div>
          )}

          {/* 2. Tech Stack */}
          {project.techTags && project.techTags.length > 0 && (
            <div className="rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/45 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[var(--color-2)]">
                  <StackIcon />
                  <span>{t('projects.techStackLabel')}</span>
                </div>
                {techTagsLabel && (
                  <span className="rounded-full border border-[var(--color-3)] bg-white px-2.5 py-0.5 text-[10px] font-bold text-[var(--color-4)]/65">
                    {techTagsLabel}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techTags.map((tag) => (
                  <span
                    key={tag}
                    dir="ltr"
                    className="rounded-full border border-[var(--color-3)] bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-[var(--color-4)]/85 shadow-[0_1px_2px_rgba(27,23,22,0.04)] transition group-hover:border-[var(--color-8)]/55 group-hover:bg-[var(--color-8)]/12 group-hover:text-[var(--color-2)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3. Solution & Technical Approach */}
          {solution && (
            <div className="flex-1 rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/75 p-4 transition-colors group-hover:border-[var(--color-3)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[var(--color-2)]">
                <SolutionIcon />
                <span>{t('projects.solutionLabel')}</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-4)]/80">
                {solution}
              </p>
            </div>
          )}
        </div>

        {/* 4. Preview & Repository Links */}
        <div className="mt-6 border-t border-[var(--color-3)] pt-5">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[var(--color-4)]/65">
            <LinksIcon />
            <span>{t('projects.linksLabel')}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-2)] px-5 py-2.5 text-xs font-bold text-[var(--color-5)] shadow-sm transition hover:bg-[var(--color-4)]"
              >
                <span>{demoLabel}</span>
                <ExternalLinkIcon />
              </a>
            )}
            {project.links.github && !project.isPrivate && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-4)]/20 bg-[var(--color-4)] px-4 py-2.5 text-xs font-bold text-[var(--color-5)] transition hover:border-[var(--color-2)] hover:bg-[var(--color-2)]"
              >
                <GitHubIcon />
                <span>{project.links.githubLabel || t('projects.viewCode')}</span>
              </a>
            )}
            {project.isPrivate && project.links.github && (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[var(--color-3)] bg-[var(--color-6)] px-4 py-2.5 text-xs font-bold text-[var(--color-4)]/65">
                <LockIcon />
                <span>{t('projects.privateRepo')}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// Cards orbit around the selected project as the page scrolls in either direction.
const OrbitItem = ({ project, index, progress, active, language, t, onSelect, onFocus, reduceMotion }) => {
  const pose = useTransform(progress, (value) => {
    const offset = index - value * (projects.length - 1);
    const angle = offset * 0.82;
    const x = Math.sin(angle) * (reduceMotion ? 0.45 : 1);
    const y = offset * (reduceMotion ? 18 : 92);
    const z = (Math.cos(angle) - 1) * (reduceMotion ? 40 : 260);
    const rotate = reduceMotion ? 0 : -Math.sin(angle) * 25;
    const tilt = reduceMotion ? 0 : offset * -3;
    return `translate(-50%, -50%) translate3d(clamp(-390px, ${x * 36}vw, 390px), ${y}px, ${z}px) rotateY(${rotate}deg) rotateZ(${tilt}deg)`;
  });
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(index - value * (projects.length - 1));
    return Math.max(0, Math.min(1, 1.7 - distance * 0.7));
  });
  const title = resolveLocalized(project.title, language);

  return (
    <motion.div style={{ transform: pose, opacity, zIndex: active ? 10 : 1, pointerEvents: active ? 'auto' : 'none' }} className="absolute left-1/2 top-1/2 w-[min(80vw,60vh,34rem)] [backface-visibility:hidden]">
      <button type="button" onFocus={() => onFocus(index)} onClick={() => onSelect(project)} aria-label={`${t('projects.openCaseStudy')}: ${title}`} className={`group block w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-[var(--color-5)] text-start shadow-[0_18px_48px_rgba(27,23,22,0.14)] transition-shadow hover:shadow-[0_24px_55px_rgba(27,23,22,0.2)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-2)] ${active ? '' : 'pointer-events-none'}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-3)]">
          <img src={project.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          <span className="absolute start-4 top-4 rounded-full border border-[var(--color-3)] bg-[var(--color-5)]/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm">{resolveLocalized(project.badge, language)}</span>
        </div>
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <span aria-hidden="true" className="text-sm font-black tabular-nums text-[var(--color-2)]">{project.number}</span>
          <div className="min-w-0 flex-1">
            <span className="block text-lg font-black leading-tight text-[var(--color-4)] sm:text-xl">{title}</span>
            <span className="mt-2 line-clamp-2 block text-xs font-medium leading-relaxed text-[var(--color-4)]/70 sm:text-sm">{resolveLocalized(project.description, language)}</span>
            {(project.galleryNote || project.note) && <span className="mt-2 block text-xs font-bold text-[var(--color-2)]">{resolveLocalized(project.galleryNote || project.note, language)}</span>}
          </div>
          <span aria-hidden="true" className="text-lg text-[var(--color-2)] transition-transform group-hover:translate-x-1 motion-reduce:transition-none">↗</span>
        </div>
      </button>
    </motion.div>
  );
};

const OrbitGallery = ({ language, t, onSelect }) => {
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.max(0, Math.min(projects.length - 1, Math.round(value * (projects.length - 1))));
    setActive((current) => current === next ? current : next);
  });

  const focusProject = (index) => {
    const stage = stageRef.current;
    if (!stage || index === active) return;
    const scrollable = Math.max(0, stage.offsetHeight - window.innerHeight);
    const top = window.scrollY + stage.getBoundingClientRect().top + scrollable * index / (projects.length - 1);
    window.scrollTo({ top, behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <div ref={stageRef} style={{ height: `${100 + (projects.length - 1) * 65}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute h-[min(65vw,32rem)] w-[min(65vw,32rem)] rounded-full border border-[var(--color-2)]/10 shadow-[0_0_0_3rem_rgba(161,147,146,0.06),0_0_0_6rem_rgba(161,147,146,0.035)]" />
        <p className="absolute top-24 z-20 px-4 text-center text-xs font-bold tracking-wide text-[var(--color-2)] sm:top-28">{t('projects.scrollGallery')}</p>
        <div className="pointer-events-none relative h-[65svh] w-full max-w-6xl [perspective:1100px] [transform-style:preserve-3d]">
          {projects.map((project, index) => (
            <OrbitItem key={project.id} project={project} index={index} progress={scrollYProgress} active={index === active} language={language} t={t} onSelect={onSelect} onFocus={focusProject} reduceMotion={reduceMotion} />
          ))}
        </div>
        <div className="absolute bottom-6 z-20 flex flex-col items-center gap-3 sm:bottom-10">
          <div className="flex items-center gap-3" dir="ltr" aria-hidden="true">
            {projects.map((project, index) => <span key={project.id} className={`h-1 rounded-full transition-all duration-300 ${index === active ? 'w-8 bg-[var(--color-2)]' : 'w-3 bg-[var(--color-1)]/50'}`} />)}
          </div>
          <span className="text-center text-xs font-semibold text-[var(--color-4)]/70">{t('projects.selectProject')}</span>
          <span className="sr-only" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t, language, langConfig } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const modalRef = useRef(null);
  const returnFocusRef = useRef(null);

  const openProject = (project) => {
    returnFocusRef.current = document.activeElement;
    setSelectedProject(project);
  };

  useEffect(() => {
    if (!selectedProject) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const modal = modalRef.current;
    modal?.querySelector('button')?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (previewItem) setPreviewItem(null);
        else setSelectedProject(null);
      } else if (event.key === 'Tab' && modal) {
        const controls = [...modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, previewItem]);

  return (
    <section id="projects" className="relative w-full bg-[var(--color-6)] px-6 pb-28 pt-28 font-sans md:px-12 md:pt-36" dir={langConfig.dir}>
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div data-aos="fade-up" className="max-w-3xl">
          <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl">{t('projects.heading')}</h2>
        </div>
      </div>
      <div className="mt-10"><OrbitGallery language={language} t={t} onSelect={openProject} /></div>

      {selectedProject && (
        <div role="dialog" aria-modal="true" aria-label={previewItem ? previewItem.title : resolveLocalized(selectedProject.title, language)} ref={modalRef} onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            if (previewItem) setPreviewItem(null);
            else setSelectedProject(null);
          }
        }} className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-4)]/85 p-3 backdrop-blur-md sm:p-8">
          <div className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--color-3)] bg-[var(--color-5)] shadow-2xl">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-3)] bg-[var(--color-5)] px-5 py-3">
              <h3 className="text-base font-black text-[var(--color-4)]">{previewItem ? previewItem.title : t('projects.caseStudyBadge')}</h3>
              <button type="button" onClick={() => previewItem ? setPreviewItem(null) : setSelectedProject(null)} aria-label={previewItem ? t('projects.closePreview') : t('projects.closeCaseStudy')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-3)] text-[var(--color-4)] hover:bg-[var(--color-2)] hover:text-[var(--color-5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-7)]">✕</button>
            </div>
            <div className="min-h-0 overflow-y-auto">
              {previewItem ? (
                <div className="bg-[var(--color-4)] p-2 sm:p-4"><img src={previewItem.image} alt={`${previewItem.title} screenshot`} className="mx-auto max-h-[75vh] w-auto object-contain" /></div>
              ) : (
                <ProjectCard project={selectedProject} language={language} t={t} onOpenPreview={setPreviewItem} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

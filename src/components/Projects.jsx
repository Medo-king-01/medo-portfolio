import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext.jsx';
import { GithubIcon } from './icons/github-icon';

const resolveLocalized = (field, language) => {
  if (field && typeof field === 'object') {
    return field[language] || field.en || '';
  }
  return field || '';
};

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GitHubIcon = () => (
  <GithubIcon size={16} strokeWidth={2} className="shrink-0" />
);

const LockIcon = ({ className = 'h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-115' }) => (
  <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ZoomIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zm0-11v6m-3-3h6" />
  </svg>
);

const ProblemIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const StackIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const SolutionIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const LinksIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const getTechStyle = (tech) => {
  const t = (tech || '').toLowerCase();
  if (t.includes('python')) return 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300';
  if (t.includes('javascript') || t.includes('js')) return 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300';
  if (t.includes('html')) return 'border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-300';
  if (t.includes('css')) return 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300';
  if (t.includes('audio') || t.includes('speech')) return 'border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300';
  if (t.includes('pyqt')) return 'border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300';
  if (t.includes('storage')) return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300';
  if (t.includes('canvas') || t.includes('api')) return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
  return 'border-[var(--color-3)] bg-white/80 dark:bg-[var(--color-6)]/80 text-[var(--color-4)]/85';
};

const getProjectStatus = (project, language) => {
  if (project.links?.demo) {
    const isDownload = project.links?.demoLabel && typeof project.links.demoLabel === 'object';
    return {
      label: isDownload
        ? (language === 'ar' ? 'إصدار متاح' : 'Active v1.0')
        : (language === 'ar' ? 'معاينة حيّة' : 'Live Demo'),
      badgeClass: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
      dotClass: 'bg-emerald-500',
    };
  }
  if (project.links?.github) {
    return {
      label: language === 'ar' ? 'كود متاح' : 'Source Code',
      badgeClass: 'border-blue-500/40 bg-blue-500/15 text-blue-800 dark:text-blue-300',
      dotClass: 'bg-blue-500',
    };
  }
  return {
    label: language === 'ar' ? 'دراسة حالة' : 'Case Study',
    badgeClass: 'border-purple-500/40 bg-purple-500/15 text-purple-800 dark:text-purple-300',
    dotClass: 'bg-purple-500',
  };
};

const ProjectCard = ({ project, language, t, onOpenPreview }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const title = resolveLocalized(project.title, language);
  const description = resolveLocalized(project.description, language);
  const note = resolveLocalized(project.note, language);
  const badge = resolveLocalized(project.badge, language);
  const techTagsLabel = resolveLocalized(project.techTagsLabel, language);
  const problem = resolveLocalized(project.caseStudy?.problem, language);
  const solution = resolveLocalized(project.caseStudy?.solution, language);
  const demoLabel = resolveLocalized(project.links?.demoLabel, language) || t('projects.liveDemo');
  const status = getProjectStatus(project, language);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-white/95 shadow-[0_14px_40px_rgba(27,23,22,0.07)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(27,23,22,0.14)] dark:border-white/10 dark:bg-[var(--color-6)]/90"
    >
      {/* Interactive cursor follow glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px z-30 rounded-[1.75rem] opacity-75 transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(228, 42, 42, 0.12), transparent 80%)`,
          }}
        />
      )}

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
              className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute inset-0 bg-[var(--color-4)]/0 transition-colors duration-300 group-hover:bg-[var(--color-4)]/20" />
            
            {/* Quick Live Preview pill button */}
            <span className="pointer-events-none absolute bottom-4 start-5 z-20 inline-flex translate-y-2 items-center gap-2 rounded-full bg-[var(--color-4)]/95 px-4 py-2 text-xs font-bold text-[var(--color-5)] opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
        
        {/* Badges on top: Category + Live Status */}
        <div className="absolute start-4 top-4 z-10 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[var(--color-3)] bg-white/95 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[var(--color-2)] shadow-sm backdrop-blur-sm dark:bg-[var(--color-5)]/90">
            {badge}
          </span>
          {status && (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold shadow-sm backdrop-blur-sm ${status.badgeClass}`}>
              <span className={`h-2 w-2 rounded-full ${status.dotClass} animate-pulse`} />
              <span>{status.label}</span>
            </span>
          )}
        </div>

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
            <div className="rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/75 p-4 transition-colors group-hover:border-[var(--color-3)] dark:border-white/5 dark:bg-[var(--color-5)]/60">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[var(--color-2)]">
                <ProblemIcon />
                <span>{t('projects.problemLabel')}</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-4)]/80">
                {problem}
              </p>
            </div>
          )}

          {/* 2. Tech Stack with branded color chips */}
          {project.techTags && project.techTags.length > 0 && (
            <div className="rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/45 p-4 dark:border-white/5 dark:bg-[var(--color-5)]/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[var(--color-2)]">
                  <StackIcon />
                  <span>{t('projects.techStackLabel')}</span>
                </div>
                {techTagsLabel && (
                  <span className="rounded-full border border-[var(--color-3)] bg-white px-2.5 py-0.5 text-[10px] font-bold text-[var(--color-4)]/65 dark:bg-[var(--color-6)]">
                    {techTagsLabel}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techTags.map((tag) => (
                  <span
                    key={tag}
                    dir="ltr"
                    className={`rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide shadow-sm transition-transform duration-200 hover:scale-105 ${getTechStyle(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3. Solution & Technical Approach */}
          {solution && (
            <div className="flex-1 rounded-2xl border border-[var(--color-3)]/85 bg-[var(--color-5)]/75 p-4 transition-colors group-hover:border-[var(--color-3)] dark:border-white/5 dark:bg-[var(--color-5)]/60">
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
        <div className="mt-6 border-t border-[var(--color-3)] pt-5 dark:border-white/10">
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
  const status = getProjectStatus(project, language);

  return (
    <motion.div style={{ transform: pose, opacity, zIndex: active ? 10 : 1, pointerEvents: active ? 'auto' : 'none' }} className="absolute left-1/2 top-1/2 w-[min(80vw,60vh,34rem)] [backface-visibility:hidden]">
      <button type="button" onFocus={() => onFocus(index)} onClick={() => onSelect(project)} aria-label={`${t('projects.openCaseStudy')}: ${title}`} className={`group block w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-[var(--color-3)] bg-[var(--color-5)] text-start shadow-[0_18px_48px_rgba(27,23,22,0.14)] transition-all duration-300 hover:shadow-[0_26px_60px_rgba(27,23,22,0.24)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-2)] dark:border-white/10 dark:bg-[var(--color-6)] ${active ? '' : 'pointer-events-none'}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-3)]">
          <img src={project.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          
          <div className="absolute start-4 top-4 z-10 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-[var(--color-3)] bg-[var(--color-5)]/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm backdrop-blur-sm dark:bg-[var(--color-6)]/90">
              {resolveLocalized(project.badge, language)}
            </span>
            {status && (
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-sm ${status.badgeClass}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.dotClass} animate-pulse`} />
                <span>{status.label}</span>
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-4)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-5)]/90 px-3 py-1 text-xs font-bold text-[var(--color-4)] backdrop-blur-sm shadow-md">
              <span>{language === 'ar' ? 'عرض تفاصيل المشروع' : 'View Case Study & Demo'}</span>
              <span>↗</span>
            </span>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <span aria-hidden="true" className="text-sm font-black tabular-nums text-[var(--color-2)]">{project.number}</span>
          <div className="min-w-0 flex-1">
            <span className="block text-lg font-black leading-tight text-[var(--color-4)] sm:text-xl">{title}</span>
            <span className="mt-2 line-clamp-2 block text-xs font-medium leading-relaxed text-[var(--color-4)]/70 sm:text-sm">{resolveLocalized(project.description, language)}</span>
            {project.techTags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techTags.slice(0, 3).map((tag) => (
                  <span key={tag} dir="ltr" className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getTechStyle(tag)}`}>
                    {tag}
                  </span>
                ))}
                {project.techTags.length > 3 && (
                  <span className="rounded-full border border-[var(--color-3)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-4)]/60">
                    +{project.techTags.length - 3}
                  </span>
                )}
              </div>
            )}
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

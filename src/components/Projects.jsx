import { projects } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext.jsx';

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const LockIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ProjectCard = ({ project, index, language, t }) => (
  <article data-aos="fade-up" data-aos-delay={index * 120} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(32,38,43,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-700/30 hover:shadow-[0_24px_55px_rgba(32,38,43,0.14)]">
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title[language] || project.title.en} project preview`}
          className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200"
          aria-hidden="true"
        >
          <svg
            className="w-16 h-16 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent opacity-70" />
      <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-700 backdrop-blur-sm">{project.badge}</span>
      <span className="absolute bottom-4 right-5 text-4xl font-black italic tracking-tight text-white/80">{project.number}</span>
    </div>

    <div className="flex flex-1 flex-col p-6 md:p-7">
      <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{project.title[language] || project.title.en}</h3>
      <p className="mt-4 flex-1 text-sm font-medium leading-relaxed text-slate-600 md:text-base">{project.description[language] || project.description.en}</p>
      {(project.techTags && project.techTags.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
          {project.techTagsLabel && (
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mr-2">{project.techTagsLabel}</span>
          )}
          {project.techTags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 transition group-hover:border-amber-700/20 group-hover:bg-amber-50 group-hover:text-amber-800">{tag}</span>)}
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.github && !project.isPrivate && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-amber-700"><ExternalLinkIcon />{project.links.githubLabel || t('projects.viewCode')}</a>
        )}
        {project.isPrivate && project.links.github && (
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"><LockIcon />{t('projects.privateRepo')}</span>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-900">{project.links.demoLabel || t('projects.liveDemo')}<ExternalLinkIcon /></a>
        )}
      </div>
    </div>
  </article>
);

const Projects = () => {
  const { t, language, langConfig } = useLanguage();

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-[#f6f5f2] px-6 pb-32 pt-28 md:px-12 md:pt-36" dir={langConfig.dir}>
      <div className="pointer-events-none absolute right-[-10rem] top-20 h-96 w-96 rounded-full bg-amber-700/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div data-aos="fade-up" className="mb-14 max-w-3xl md:mb-18">
          <span className="inline-block rounded-full border border-slate-300 bg-white px-5 py-1.5 text-sm font-bold text-slate-600 shadow-sm">{t('projects.heading')}</span>
          <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl">{t('projects.subheading')}</h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">{t('projects.description') || ''}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} language={language} t={t} />)}
        </div>
      </div>
    </section>
  );
};

export default Projects;
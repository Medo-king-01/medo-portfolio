import { useLanguage } from '../context/LanguageContext.jsx';

const TechnicalSkills = () => {
  const { t, langConfig } = useLanguage();
  const skillsData = t('technicalSkills');

  return (
    <section id="skills" dir={langConfig.dir} className="relative w-full overflow-hidden bg-[var(--color-6)] px-6 pb-28 pt-24 font-sans md:px-12">
      <div className="pointer-events-none absolute left-10 top-1/4 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-[var(--color-1)]/20 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <header data-aos="fade-up" className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-[var(--color-3)] bg-white/85 px-5 py-1.5 text-sm font-bold text-[var(--color-2)] shadow-sm">{skillsData.badge}</span>
          <h2 className="text-4xl font-black tracking-tight text-[var(--color-4)] md:text-5xl">{skillsData.heading}</h2>
        </header>
        <div className="space-y-14 md:space-y-20">
          {skillsData.groups.map((group, groupIndex) => (
            <div key={group.title} data-aos="fade-up">
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-8)]/20 text-sm font-black text-[var(--color-2)]">{String(groupIndex + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-black text-[var(--color-4)] md:text-2xl">{group.title}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, index) => (
                  <article key={item.title} data-aos="fade-up" data-aos-delay={index * 60} className="rounded-2xl border border-[var(--color-3)] bg-white/80 p-5 shadow-[0_8px_24px_rgba(27,23,22,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-2)]/40 hover:shadow-[0_16px_36px_rgba(27,23,22,0.10)] md:p-6">
                    <h4 className="text-base font-black leading-snug text-[var(--color-4)]">{item.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-4)]/75">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;

import { softSkillsList } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext.jsx';

const resolveLocalized = (field, language) => {
  if (field && typeof field === 'object') {
    return field[language] || field.en || '';
  }
  return field || '';
};

const SkillIcon = ({ type }) => {
  const paths = {
    leadership: 'M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3zm-6 12l.9 2.1L9 18l-2.1.9L6 21l-.9-2.1L3 18l2.1-.9L6 15z',
    speaking: 'M7 4h10a2 2 0 012 2v6a2 2 0 01-2 2h-4l-3.5 3V14H7a2 2 0 01-2-2V6a2 2 0 012-2zM8 8h8M8 11h5',
    collaboration: 'M8 12a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM3 20a5 5 0 0110 0M11 20a5 5 0 0110 0',
    communication: 'M4 5h16v10H9l-5 4V5zm4 5h8M8 13h5',
    'problem-solving': 'M9 18h6M10 21h4M8 14a6 6 0 118-0c-1 1-2 2-2 4h-4c0-2-1-3-2-4z',
    adaptability: 'M12 4a8 8 0 108 8M12 4v5h5',
    creativity: 'M9 18h6M10 21h4M8 14a6 6 0 114 2 6 6 0 014-2M12 2v2M4.9 4.9l1.4 1.4M2 12h2M19.1 4.9l-1.4 1.4M20 12h2',
    time: 'M12 7v5l3 2M12 3a9 9 0 110 18 9 9 0 010-18z',
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d={paths[type] || paths.communication} />
    </svg>
  );
};

const SoftSkillCard = ({ skill, index, language }) => {
  const name = resolveLocalized(skill.name, language);
  const desc = resolveLocalized(skill.desc, language);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group flex min-h-[220px] flex-col items-center justify-between rounded-3xl border border-[var(--color-3)] bg-white/85 p-6 text-center transition-all duration-500 hover:scale-[1.03] hover:border-[var(--color-2)]/40 hover:bg-white hover:shadow-[0_20px_45px_rgba(27,23,22,0.10)]"
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 rounded-2xl bg-[var(--color-8)]/20 p-3 text-4xl text-[var(--color-2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)]">
          <SkillIcon type={skill.icon} />
        </div>
        <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-[var(--color-4)]">
          {name}
        </h3>
        <p className="text-sm font-medium leading-relaxed text-[var(--color-4)]/75">
          {desc}
        </p>
      </div>
    </div>
  );
};

const SoftSkills = () => {
  const { t, langConfig, language } = useLanguage();

  return (
    <section
      id="softskills"
      className="relative w-full overflow-hidden bg-[var(--color-6)] bg-[linear-gradient(to_right,#1b171608_1px,transparent_1px),linear-gradient(to_bottom,#1b171608_1px,transparent_1px)] bg-[size:60px_60px] px-6 pb-32 pt-28 font-sans md:px-12"
      dir={langConfig.dir}
    >
      {/* Top paper divider transitioning smoothly from var(--color-5) */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-full -translate-y-[1px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-12 w-full fill-[var(--color-5)] md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-6xl">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center md:mb-20">
          <div className="mb-6 inline-block rounded-full border border-[var(--color-3)] bg-white/85 px-5 py-1.5 text-sm font-bold text-[var(--color-2)] shadow-sm">
            {t('softSkills.badge')}
          </div>
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-[var(--color-4)] md:text-5xl">
            {t('softSkills.heading')}
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-[var(--color-4)]/75 md:text-lg">
            {t('softSkills.subheading')}
          </p>
        </div>

        {/* Soft Skills Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {softSkillsList.map((skill, index) => (
            <SoftSkillCard key={skill.id || index} skill={skill} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;

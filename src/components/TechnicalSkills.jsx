import { useLanguage } from '../context/LanguageContext.jsx';

const SkillItem = ({ skill, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 60}
    className="group relative p-5 md:p-6 rounded-2xl border border-slate-200 bg-white/75 backdrop-blur-sm shadow-[0_8px_24px_rgba(32,38,43,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-700/30 hover:shadow-[0_16px_36px_rgba(32,38,43,0.1)]"
  >
    <h3 className="text-sm md:text-base font-black text-slate-900 mb-3 leading-snug">{skill}</h3>
  </div>
);

const SkillCategory = ({ category, index }) => (
  <div data-aos="fade-up" data-aos-delay={index * 100} className="space-y-4">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-xl md:text-2xl font-black text-slate-900">{category.title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {category.skills.map((skill, skillIndex) => (
        <SkillItem key={`${category.title}-${skillIndex}`} skill={skill} index={skillIndex} />
      ))}
    </div>
  </div>
);

const TechnicalSkills = () => {
  const { t } = useLanguage();

  // Use translations for the full bilingual content
  const skillsData = t('technicalSkills');

  return (
    <section
      id="skills"
      className="
        bg-[#f6f5f2]
        pt-24
        pb-28
        px-6
        md:px-12
        w-full
        relative
        overflow-hidden
        font-sans
      "
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className="
          absolute
          top-1/4
          left-10
          w-96
          h-96
          rounded-full
          bg-amber-700/5
          blur-[120px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-1/4
          right-10
          w-96
          h-96
          rounded-full
          bg-amber-700/5
          blur-[120px]
          pointer-events-none
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-slate-300 bg-white px-5 py-1.5 text-sm text-slate-600 font-bold mb-6 shadow-sm">
            {skillsData.badge}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {skillsData.heading}
          </h2>

          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {skillsData.description}
          </p>
        </div>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <div className="space-y-12 md:space-y-16">
          {skillsData.categories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
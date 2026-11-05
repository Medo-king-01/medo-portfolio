import { useLanguage } from '../context/LanguageContext.jsx';

const InterestIcon = ({ name }) => {
  const icons = {
    drawing: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3l2 7 7 2-2 7-7 2-7-2 2-7 7-2-7-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    swimming: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <path d="M8 14s2-3 5-3 5 3 5 3" />
        <path d="M10 17s2-2 4-2 4 2 4 2" />
      </svg>
    ),
    design: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
        <path d="M9 9h10v10H9z" />
      </svg>
    ),
    anime: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    film: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M2 8h20" />
        <path d="M8 2v20" />
      </svg>
    ),
  };

  return icons[name] || icons.design;
};

const BeyondTech = () => {
  const { t, langConfig } = useLanguage();
  const beyondTechData = t('beyondTech');

  return (
    <section
      id="beyond-tech"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f6f5f2]
        px-6
        py-24
        md:px-12
        md:py-32
        lg:py-36
        font-sans
      "
      dir={langConfig.dir}
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-10rem]
          top-20
          h-96
          w-96
          rounded-full
          bg-amber-700/5
          blur-3xl
        "
      />
      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20
          h-48
          w-48
          rounded-full
          bg-white/[0.025]
          blur-[80px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 max-w-4xl">
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            {beyondTechData.heading}
          </h2>
        </div>

        {/* Content */}
        <div data-aos="fade-up" data-aos-delay="100" className="max-w-3xl mb-12">
          <div className="prose prose-slate max-w-none">
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-600 whitespace-pre-line">
              {beyondTechData.content}
            </p>
          </div>
        </div>

        {/* Interest Cards */}
        <div data-aos="fade-up" data-aos-delay="200" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {beyondTechData.interests.map((interest, index) => (
            <div
              key={interest.label}
              data-aos="zoom-in"
              data-aos-delay={index * 80}
              className="group relative p-5 md:p-6 rounded-2xl border border-slate-200 bg-white/75 backdrop-blur-sm shadow-[0_8px_24px_rgba(32,38,43,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-700/30 hover:shadow-[0_16px_36px_rgba(32,38,43,0.1)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 mb-3 group-hover:scale-110 transition-transform duration-300">
                <InterestIcon name={interest.icon} />
              </div>
              <h3 className="text-sm md:text-base font-black text-slate-900">{interest.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeyondTech;
import { useLanguage } from '../context/LanguageContext.jsx';

const HowIWork = () => {
  const { t, langConfig } = useLanguage();
  const howIWorkData = t('howIWork');

  return (
    <section
      id="how-i-work"
      className="
        relative
        w-full
        overflow-hidden
        bg-white
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
          left-[-10rem]
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
          -right-20
          h-48
          w-48
          rounded-full
          bg-white/[0.025]
          blur-[80px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            {howIWorkData.heading}
          </h2>
        </div>

        {/* Content */}
        <div data-aos="fade-up" data-aos-delay="100" className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-600 whitespace-pre-line">
              {howIWorkData.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
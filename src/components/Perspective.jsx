import { useLanguage } from '../context/LanguageContext.jsx';

const Perspective = () => {
  const { t, langConfig } = useLanguage();
  const perspectiveData = t('perspective');

  return (
    <section
      id="perspective"
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
            {perspectiveData.heading}
          </h2>
        </div>

        {/* Content */}
        <div data-aos="fade-up" data-aos-delay="100" className="max-w-3xl mb-12">
          <div className="prose prose-slate max-w-none">
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-600 whitespace-pre-line">
              {perspectiveData.content}
            </p>
          </div>
        </div>

        {/* Highlighted Statement */}
        <div data-aos="fade-up" data-aos-delay="200" className="max-w-3xl">
          <div className="relative p-6 md:p-8 rounded-2xl border border-amber-700/30 bg-amber-500/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-transparent rounded-2xl" />
            <div className="relative z-10 text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-amber-800">
                {perspectiveData.highlight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perspective;
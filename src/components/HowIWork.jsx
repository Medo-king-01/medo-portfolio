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
        bg-[var(--color-5)]
        px-6
        py-24
        font-sans
        md:px-12
        md:py-32
        lg:py-36
      "
      dir={langConfig.dir}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-48 rounded-full bg-[var(--color-1)]/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div data-aos="fade-up" className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {howIWorkData.heading}
          </h2>
        </div>

        {/* Content */}
        <div data-aos="fade-up" data-aos-delay="100" className="mx-auto max-w-3xl">
          <div className="max-w-none">
            <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[var(--color-4)]/78 md:text-lg">
              {howIWorkData.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIWork;

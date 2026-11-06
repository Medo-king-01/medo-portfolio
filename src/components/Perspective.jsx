import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useReducedMotionPreference.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const Perspective = () => {
  const { t, langConfig } = useLanguage();
  const { reducedMotion, isMobile, isShortViewport } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isShortViewport, reducedMotion });
  const perspectiveData = t('perspective');

  return (
    <section
      id="perspective"
      data-experience-section
      aria-labelledby="perspective-heading"
      className="section-flow relative w-full overflow-hidden bg-[var(--color-5)] px-6 py-24 font-sans md:px-12 md:py-32 lg:py-36"
      dir={langConfig.dir}
    >
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-20 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-[var(--color-1)]/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ reducedMotion, distance: profile.revealDistance })}
          className="mb-16 max-w-4xl"
        >
          <h2 id="perspective-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {perspectiveData.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ reducedMotion, distance: profile.revealDistance, delay: 0.05 })}
          className="mb-12 max-w-3xl"
        >
          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[var(--color-4)]/78 md:text-lg">
            {perspectiveData.content}
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ reducedMotion, distance: profile.revealDistance, delay: 0.1 })}
          className="max-w-3xl"
        >
          <blockquote className="relative overflow-hidden rounded-[1.75rem] border border-[var(--color-2)]/25 bg-[var(--color-6)]/70 px-7 py-9 shadow-[0_14px_36px_rgba(123,42,39,0.08)] md:px-12 md:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute -end-8 -top-16 text-[12rem] font-black leading-none text-[var(--color-8)]/20">“</div>
            <div aria-hidden="true" className="mb-6 h-1 w-12 rounded-full bg-[var(--color-2)]" />
            <p className="relative max-w-2xl text-xl font-black leading-relaxed text-[var(--color-2)] md:text-3xl md:leading-relaxed">
              {perspectiveData.highlight}
            </p>
            <footer className="relative mt-5 text-sm font-black tracking-wide text-[var(--color-2)]/80">— {perspectiveData.quoteAuthor}</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default Perspective;

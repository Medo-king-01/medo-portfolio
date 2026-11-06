import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const AIToolkit = () => {
  const { t, langConfig } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const revealVariants = getRevealVariants({ distance: profile.revealDistance });
  const staggerVariants = getStaggerVariants({ stagger: profile.stagger });
  const aiToolkitData = t('aiToolkit');

  return (
    <section
      id="ai-toolkit"
      data-experience-section
      aria-labelledby="ai-toolkit-heading"
      className="section-flow relative w-full overflow-hidden bg-[var(--color-6)] px-6 py-24 font-sans md:px-12 md:py-32 lg:py-36"
      dir={langConfig.dir}
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-48 rounded-full bg-[var(--color-1)]/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={revealVariants}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <h2 id="ai-toolkit-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {aiToolkitData.heading}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ distance: profile.revealDistance, delay: 0.05 })}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="text-base font-medium leading-relaxed text-[var(--color-4)]/78 md:text-lg">
            {aiToolkitData.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={staggerVariants}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {aiToolkitData.tools.map((tool) => (
            <motion.article
              key={tool}
              variants={revealVariants}
              whileHover={hasFinePointer ? { y: -3 } : undefined}
              className="group relative rounded-2xl border border-[var(--color-3)] bg-white/85 p-5 shadow-[0_8px_24px_rgba(27,23,22,0.05)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--color-2)]/40 hover:bg-white hover:shadow-[0_16px_36px_rgba(27,23,22,0.10)] md:p-6"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-8)]/20 text-[var(--color-2)] transition-[background-color,color,transform] duration-300 group-hover:scale-110 group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <path d="M12 3l2 7 7 2-2 7-7 2-7-2 2-7 7-2-7-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 dir="ltr" className="text-start text-sm font-black text-[var(--color-4)] md:text-base">{tool}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIToolkit;

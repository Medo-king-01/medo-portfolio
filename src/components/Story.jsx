import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useReducedMotionPreference.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const Story = () => {
  const { t, langConfig } = useLanguage();
  const { reducedMotion, isMobile, isShortViewport } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isShortViewport, reducedMotion });
  const storyData = t('story');

  return (
    <section
      id="story"
      data-experience-section
      aria-labelledby="story-heading"
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
          <h2 id="story-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {storyData.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ reducedMotion, distance: profile.revealDistance, delay: 0.08 })}
          className="max-w-3xl"
        >
          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[var(--color-4)]/78 md:text-lg">
            {storyData.content}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;

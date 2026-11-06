import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const TechnicalSkills = () => {
  const { t, langConfig } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const skillsData = t('technicalSkills');
  const itemVariants = getRevealVariants({ distance: profile.revealDistance });
  const staggerVariants = getStaggerVariants({ stagger: profile.stagger });

  return (
    <section
      id="skills"
      data-experience-section
      aria-labelledby="skills-heading"
      dir={langConfig.dir}
      className="section-flow relative w-full overflow-hidden bg-[var(--color-6)] px-6 pb-28 pt-24 font-sans md:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-10 top-1/4 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-[var(--color-1)]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <span className="mb-6 inline-block rounded-full border border-[var(--color-3)] bg-white/85 px-5 py-1.5 text-sm font-bold text-[var(--color-2)] shadow-sm">
            {skillsData.badge}
          </span>
          <h2 id="skills-heading" className="text-4xl font-black tracking-tight text-[var(--color-4)] md:text-5xl">
            {skillsData.heading}
          </h2>
        </motion.header>

        <div className="space-y-14 md:space-y-20">
          {skillsData.groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
              variants={itemVariants}
            >
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-8)]/20 text-sm font-black text-[var(--color-2)]">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-black text-[var(--color-4)] md:text-2xl">{group.title}</h3>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={motionConfig.viewport}
                variants={staggerVariants}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {group.items.map((item) => (
                  <motion.article
                    key={item.title}
                    variants={itemVariants}
                    whileHover={hasFinePointer ? { y: -4, rotateX: 1 } : undefined}
                    className="rounded-2xl border border-[var(--color-3)] bg-white/80 p-5 shadow-[0_8px_24px_rgba(27,23,22,0.05)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--color-2)]/40 hover:shadow-[0_16px_36px_rgba(27,23,22,0.10)] md:p-6"
                  >
                    <h4 className="text-base font-black leading-snug text-[var(--color-4)]">{item.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-4)]/75">{item.description}</p>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;

import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useReducedMotionPreference.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const InterestIcon = ({ name }) => {
  const icons = {
    drawing: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
        <path d="M12 3l2 7 7 2-2 7-7 2-7-2 2-7 7-2-7-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    swimming: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">
        <path d="M5 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <path d="M8 14s2-3 5-3 5 3 5 3" />
        <path d="M10 17s2-2 4-2 4 2 4 2" />
      </svg>
    ),
    design: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
        <path d="M9 9h10v10H9z" />
      </svg>
    ),
    anime: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    film: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
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
  const { reducedMotion, isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer, reducedMotion });
  const revealVariants = getRevealVariants({ reducedMotion, distance: profile.revealDistance });
  const staggerVariants = getStaggerVariants({ reducedMotion, stagger: profile.stagger });
  const beyondTechData = t('beyondTech');

  return (
    <section
      id="beyond-tech"
      data-experience-section
      aria-labelledby="beyond-tech-heading"
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
          variants={revealVariants}
          className="mb-16 max-w-4xl"
        >
          <h2 id="beyond-tech-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {beyondTechData.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ reducedMotion, distance: profile.revealDistance, delay: 0.06 })}
          className="mb-12 max-w-3xl"
        >
          <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[var(--color-4)]/78 md:text-lg">
            {beyondTechData.content}
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={staggerVariants}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {beyondTechData.interests.map((interest) => (
            <motion.article
              key={interest.label}
              variants={revealVariants}
              whileHover={hasFinePointer && !reducedMotion ? { y: -4 } : undefined}
              className="group relative rounded-2xl border border-[var(--color-3)] bg-white/80 p-5 shadow-[0_8px_24px_rgba(27,23,22,0.05)] backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--color-2)]/40 hover:bg-white hover:shadow-[0_16px_36px_rgba(27,23,22,0.10)] md:p-6"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-8)]/20 text-[var(--color-2)] transition-[background-color,color,transform] duration-300 group-hover:scale-110 group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)]">
                <InterestIcon name={interest.icon} />
              </div>
              <h3 className="text-sm font-black text-[var(--color-4)] md:text-base">{interest.label}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BeyondTech;

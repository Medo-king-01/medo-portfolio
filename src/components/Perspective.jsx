import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import InteractiveGridBackground from './ui/InteractiveGridBackground.jsx';
import WordRevealText from './ui/WordRevealText.jsx';

const Perspective = () => {
  const { t, langConfig, language } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const revealVariants = getRevealVariants({ distance: profile.revealDistance });
  const perspectiveData = t('perspective');

  return (
    <section
      id="perspective"
      data-experience-section
      aria-labelledby="perspective-heading"
      className="chapter-centered section-flow relative w-full overflow-hidden bg-[var(--color-5)] px-6 py-24 font-sans md:px-12 md:py-32"
      dir={langConfig.dir}
    >
      {/* Interactive Background Grid Overlay */}
      <InteractiveGridBackground gridSize={36} accentGlow="rgba(228, 42, 42, 0.22)" lineGlowColor="var(--color-7)" />

      {/* Ambient Background Lights */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10rem] top-20 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[var(--color-2)]/12 blur-[90px]" />

      <div className="chapter-body relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Badge & Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={revealVariants}
          className="mb-6 flex items-center gap-2.5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-6)]/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-7)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-7)]" />
            </span>
            <span>{language === 'ar' ? 'رؤية وفلسفة حية' : 'Core Philosophy'}</span>
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={revealVariants}
          className="mb-8 max-w-4xl"
        >
          <h2 id="perspective-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {perspectiveData.heading}
          </h2>
        </motion.div>

        {/* Word-by-word text reveal for section paragraphs with proper line spacing */}
        <WordRevealText
          text={perspectiveData.content}
          className="mb-14 max-w-3xl text-base font-semibold leading-relaxed text-[var(--color-4)]/85 md:text-lg"
          paragraphClassName="mb-5 last:mb-0 font-semibold text-[var(--color-4)]/85"
        />

        {/* Continuous 3D Animated Glassmorphism Quote Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ distance: profile.revealDistance, delay: 0.1 })}
          className="mx-auto max-w-4xl"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            animate={{
              rotateX: [0, -3.5, 3.5, 0],
              rotateY: [0, 4, -4, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
            className="group relative overflow-hidden rounded-[2rem] border-2 border-[var(--color-2)]/35 bg-white/95 p-8 shadow-[0_22px_65px_rgba(123,42,39,0.15)] backdrop-blur-lg transition-all duration-500 hover:border-[var(--color-2)]/70 hover:shadow-[0_32px_80px_rgba(228,42,42,0.22)] md:p-14 dark:border-white/20 dark:bg-[var(--color-6)]/95"
          >
            {/* Continuous Moving Ambient Light Beam */}
            <motion.div
              aria-hidden="true"
              animate={{
                x: ['-40%', '140%', '-40%'],
                y: ['-40%', '140%', '-40%'],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(228,42,42,0.25)_0%,rgba(123,42,39,0.1)_40%,transparent_70%)] blur-2xl"
            />

            {/* Glowing Accent Border Trace */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-7)]/25 via-transparent to-[var(--color-2)]/20 opacity-80"
            />

            {/* Floating Quotes Emblem with Continuous Rotation / Float */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              aria-hidden="true"
              className="pointer-events-none absolute -end-4 -top-12 select-none text-[10rem] font-black leading-none text-[var(--color-2)]/15 md:-end-8 md:-top-16 md:text-[14rem] dark:text-white/12"
            >
              “
            </motion.div>

            {/* Quote Red Accent Pill */}
            <div aria-hidden="true" className="relative z-10 mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-10">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-7)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-10 rounded-full bg-[var(--color-7)] shadow-[0_0_14px_rgba(228,42,42,0.9)]" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-[var(--color-2)]">
                {language === 'ar' ? 'اقتباس فلسفي' : 'Key Philosophy'}
              </span>
            </div>

            {/* Quote Text */}
            <blockquote className="relative z-10">
              <WordRevealText
                text={perspectiveData.highlight}
                className="text-xl font-black leading-relaxed text-[var(--color-4)] md:text-3xl md:leading-relaxed"
                paragraphClassName="mb-0 font-black text-[var(--color-4)]"
              />

              {/* Author Footer Badge */}
              <footer className="relative mt-8 flex items-center justify-between border-t border-[var(--color-3)] pt-6 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-2)] font-black text-[var(--color-5)] shadow-md">
                    M
                  </div>
                  <div>
                    <span className="block text-sm font-black tracking-wide text-[var(--color-2)]">
                      {perspectiveData.quoteAuthor}
                    </span>
                    <span className="block text-[11px] font-bold text-[var(--color-4)]/65">
                      {language === 'ar' ? 'مؤسس ورؤية' : 'Personal Vision'}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-3)] bg-white/80 px-3.5 py-1 text-xs font-bold text-[var(--color-2)] shadow-2xs backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-5)]">
                  <span>✦</span>
                  <span>{language === 'ar' ? 'قيمة راسخة' : 'Core Belief'}</span>
                </span>
              </footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Perspective;

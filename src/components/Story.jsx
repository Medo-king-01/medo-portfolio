import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { motionConfig } from '../motion/motionConfig.js';
import { useLanguage } from '../context/LanguageContext.jsx';

/**
 * Split text into individual word tokens for cinematic staggered reveal
 */
const splitWords = (text) => {
  const tokens = [];
  const regex = /(\S+)(\s*)/g;
  let m;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    tokens.push({ word: m[1], space: m[2], key: `${i}-${m[1]}` });
    i += 1;
  }
  return tokens;
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: i * 0.022,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardContainerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 35 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const paragraphBlockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Story = () => {
  const { t, langConfig } = useLanguage();
  const storyData = t('story');

  // Split multi-paragraph story content
  const paragraphs = useMemo(() => {
    const raw = storyData.content || '';
    return raw
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [storyData.content]);

  // Tokenize each paragraph for smooth reveal
  const tokenizedParagraphs = useMemo(
    () => paragraphs.map((p) => splitWords(p)),
    [paragraphs]
  );

  return (
    <section
      id="story"
      data-experience-section
      aria-labelledby="story-heading"
      className="chapter-centered section-flow relative w-full overflow-hidden bg-[var(--color-5)] px-5 py-24 font-sans sm:px-8 md:px-12 md:py-32"
      dir={langConfig.dir}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-[var(--color-7)]/10 blur-[130px] dark:bg-[var(--color-7)]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[var(--color-1)]/20 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[var(--color-8)]/15 blur-[90px]"
      />

      <div className="chapter-body relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Subtle decorative badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={motionConfig.viewport}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-white/80 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-6)]/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
          <span>{langConfig.dir === 'rtl' ? 'البداية والمسار' : 'Journey & Spark'}</span>
        </motion.div>

        {/* Heading with creative glowing gradient sheen */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={motionConfig.viewport}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2
            id="story-heading"
            className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {storyData.heading}
            <span className="text-[var(--color-7)]">.</span>
          </h2>
        </motion.div>

        {/* Creative Story Stage: Stylized Story Card with word-by-word reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={cardContainerVariants}
          className="relative w-full overflow-hidden rounded-[2rem] border border-[var(--color-3)] bg-white/70 p-7 shadow-[0_20px_50px_rgba(27,23,22,0.06)] backdrop-blur-xl sm:p-10 md:p-14 dark:border-white/10 dark:bg-[var(--color-6)]/70 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        >
          {/* Subtle top reflection */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-7)]/40 to-transparent"
          />

          {/* Decorative quote mark in the background */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none text-9xl font-black leading-none text-[var(--color-7)]/10 dark:text-[var(--color-7)]/15"
          >
            “
          </span>

          <div className="relative z-10 flex flex-col items-center space-y-7">
            {tokenizedParagraphs.map((tokens, pIndex) => {
              const isHighlight = pIndex === tokenizedParagraphs.length - 1;
              return (
                <motion.div
                  key={pIndex}
                  variants={paragraphBlockVariants}
                  className={`w-full max-w-2xl text-center ${
                    isHighlight
                      ? 'rounded-2xl border border-[var(--color-2)]/20 bg-gradient-to-b from-[var(--color-7)]/5 to-transparent px-5 py-4 dark:border-[var(--color-7)]/30'
                      : ''
                  }`}
                >
                  <p
                    className={`text-center font-medium leading-[1.9] text-[var(--color-4)] ${
                      isHighlight
                        ? 'text-lg font-bold text-[var(--color-2)] sm:text-xl md:text-2xl'
                        : 'text-base text-[var(--color-4)]/85 sm:text-lg'
                    }`}
                  >
                    {tokens.map((tok, i) => (
                      <span
                        key={tok.key}
                        className="inline-block"
                        style={{ display: 'inline-block' }}
                      >
                        <motion.span
                          custom={pIndex * 16 + i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.25 }}
                          variants={wordVariants}
                          style={{ display: 'inline-block' }}
                        >
                          {tok.word}
                        </motion.span>
                        {tok.space && (
                          <span style={{ display: 'inline', whiteSpace: 'pre' }}>
                            {tok.space}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Subtle bottom accent line */}
          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--color-2)] to-[var(--color-7)] opacity-60"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Story;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import InteractiveGridBackground from './ui/InteractiveGridBackground.jsx';
import SectionDivider from './SectionDivider.jsx';
import WordRevealText from './ui/WordRevealText.jsx';

const InterestIcon = ({ name }) => {
  switch (name) {
    case 'drawing':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z" />
          <path d="M2 2l7.5 7.5" />
          <circle cx="11" cy="11" r="2" className="fill-current opacity-30" />
        </svg>
      );
    case 'swimming':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
    case 'design':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <circle cx="14" cy="15" r="2" />
        </svg>
      );
    case 'anime':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'film':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
          <rect x="2" y="4" width="20" height="16" rx="2.5" />
          <path d="M6 4v16" />
          <path d="M18 4v16" />
          <path d="M2 8h4" />
          <path d="M2 12h4" />
          <path d="M2 16h4" />
          <path d="M18 8h4" />
          <path d="M18 12h4" />
          <path d="M18 16h4" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    default:
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
  }
};

const interestThemes = {
  drawing: {
    badge: { en: 'Creative Canvas', ar: 'إبداع ورسم' },
    gradient: 'from-pink-500/15 via-rose-500/10 to-transparent',
    iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    glow: 'rgba(244, 63, 94, 0.25)',
    accentBorder: 'group-hover:border-rose-500/40',
  },
  swimming: {
    badge: { en: 'Mind & Focus', ar: 'رياضة وتركيز' },
    gradient: 'from-cyan-500/15 via-blue-500/10 to-transparent',
    iconBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    glow: 'rgba(6, 182, 212, 0.25)',
    accentBorder: 'group-hover:border-cyan-500/40',
  },
  design: {
    badge: { en: 'UI/UX Visuals', ar: 'تصميم ورؤية' },
    gradient: 'from-violet-500/15 via-purple-500/10 to-transparent',
    iconBg: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
    glow: 'rgba(139, 92, 246, 0.25)',
    accentBorder: 'group-hover:border-violet-500/40',
  },
  anime: {
    badge: { en: 'Storytelling', ar: 'خيال وسرد' },
    gradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    glow: 'rgba(245, 158, 11, 0.25)',
    accentBorder: 'group-hover:border-amber-500/40',
  },
  film: {
    badge: { en: 'World Cinema', ar: 'سينما وفن' },
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    glow: 'rgba(16, 185, 129, 0.25)',
    accentBorder: 'group-hover:border-emerald-500/40',
  },
};

const BeyondTech = () => {
  const { t, langConfig, language } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const revealVariants = getRevealVariants({ distance: profile.revealDistance });
  const staggerVariants = getStaggerVariants({ stagger: profile.stagger });
  const beyondTechData = t('beyondTech');

  const [pointerPos, setPointerPos] = useState({});

  const handlePointerMove = (index, event) => {
    if (!hasFinePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setPointerPos((prev) => ({ ...prev, [index]: { x, y } }));
  };

  return (
    <>
      <section
        id="beyond-tech"
        data-experience-section
        aria-labelledby="beyond-tech-heading"
        className="chapter-centered section-flow relative w-full overflow-hidden bg-[var(--color-5)] px-6 py-24 font-sans md:px-12 md:py-32"
        dir={langConfig.dir}
      >
        {/* Interactive Glowing Grid Background */}
        <InteractiveGridBackground gridSize={36} accentGlow="rgba(228, 42, 42, 0.22)" lineGlowColor="var(--color-7)" />

        {/* Background Decor Ambient Glows */}
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
              <span>{language === 'ar' ? 'جانب من شغفي واهتماماتي' : 'Life Beyond Code'}</span>
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={revealVariants}
            className="mb-8 max-w-4xl"
          >
            <h2 id="beyond-tech-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
              {beyondTechData.heading}
            </h2>
          </motion.div>

          {/* Word-by-word text reveal for section paragraph */}
          <WordRevealText
            text={beyondTechData.content}
            className="mb-14 max-w-3xl text-base font-semibold leading-relaxed text-[var(--color-4)]/85 md:text-lg"
          />

          {/* Interests Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={motionConfig.viewport}
            variants={staggerVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {beyondTechData.interests.map((interest, index) => {
              const theme = interestThemes[interest.icon] || interestThemes.design;
              const pos = pointerPos[index];

              return (
                <motion.article
                  key={interest.label}
                  variants={revealVariants}
                  whileHover={hasFinePointer ? { y: -6, scale: 1.02 } : undefined}
                  onPointerMove={(e) => handlePointerMove(index, e)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[var(--color-3)] bg-white/90 p-6 shadow-[0_10px_30px_rgba(27,23,22,0.06)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_20px_45px_rgba(27,23,22,0.14)] dark:border-white/10 dark:bg-[var(--color-6)]/90 ${theme.accentBorder}`}
                >
                  {/* Custom Gradient Accent Background on Hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* Interactive Dynamic Spotlight Glow */}
                  {pos && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${theme.glow}, transparent 70%)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Top Header Row: Icon + Mini Tag */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-110 ${theme.iconBg}`}>
                        <InterestIcon name={interest.icon} />
                      </div>
                      <span className="rounded-full border border-[var(--color-3)] bg-white/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-4)]/70 shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-[var(--color-5)]/80">
                        {theme.badge[language] || theme.badge.en}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black tracking-tight text-[var(--color-4)] transition-colors duration-300 group-hover:text-[var(--color-2)] md:text-xl">
                      {interest.label}
                    </h3>
                  </div>

                  {/* Bottom Decorative Spark Line */}
                  <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-3)]/60 pt-3 dark:border-white/10">
                    <span className="text-[11px] font-bold text-[var(--color-4)]/60 group-hover:text-[var(--color-4)]/90 transition-colors">
                      {language === 'ar' ? 'مصدر إلهام' : 'Inspiration'}
                    </span>
                    <span className="text-xs font-black text-[var(--color-2)] opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1">
                      ✦
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Animated Horizontal Divider separating Beyond Technology & AI Toolkit */}
      <SectionDivider />
    </>
  );
};

export default BeyondTech;

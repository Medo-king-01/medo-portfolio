import { useState } from 'react';
import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import InteractiveGridBackground from './ui/InteractiveGridBackground.jsx';
import WordRevealText from './ui/WordRevealText.jsx';

const AIToolLogo = ({ name }) => {
  const normalized = (name || '').toLowerCase();

  if (normalized.includes('claude')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" fillOpacity="0.25" />
        <path d="M12 5V19M5 12H19" strokeWidth="1.5" />
      </svg>
    );
  }

  if (normalized.includes('chatgpt')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z" />
        <path d="M12 6a6 6 0 0 1 6 6c0 3.314-2.686 6-6 6s-6-2.686-6-6a6 6 0 0 1 6-6z" fill="currentColor" fillOpacity="0.2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes('gemini')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
        <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }

  if (normalized.includes('deepseek') && !normalized.includes('harness')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">
        <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z" />
        <path d="M12 8l4 4-4 4-4-4 4-4z" fill="currentColor" fillOpacity="0.25" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }

  if (normalized.includes('arena')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.25" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  if (normalized.includes('harness')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12">
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
      <path d="M12 2v20M2 12h20" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
};

const toolBrandConfigs = {
  claude: {
    role: { en: 'Reasoning & Architecture', ar: 'التحليل والمعمارية' },
    gradient: 'from-amber-600/15 via-orange-500/10 to-transparent',
    iconBg: 'bg-amber-600/15 text-amber-600 dark:text-amber-400 border-amber-600/30',
    glow: 'rgba(217, 119, 6, 0.25)',
    accentBorder: 'group-hover:border-amber-600/40',
  },
  chatgpt: {
    role: { en: 'Problem Solving & Copy', ar: 'حل المشكلات والمحتوى' },
    gradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    glow: 'rgba(16, 185, 129, 0.25)',
    accentBorder: 'group-hover:border-emerald-500/40',
  },
  gemini: {
    role: { en: 'Multimodal & Search', ar: 'النماذج المتعددة والبحث' },
    gradient: 'from-blue-600/15 via-indigo-600/10 to-purple-600/10',
    iconBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    glow: 'rgba(99, 102, 241, 0.25)',
    accentBorder: 'group-hover:border-indigo-500/40',
  },
  deepseek: {
    role: { en: 'Code & Logic Synthesis', ar: 'كتابة الكود والخوارزميات' },
    gradient: 'from-cyan-500/15 via-blue-600/10 to-transparent',
    iconBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    glow: 'rgba(6, 182, 212, 0.25)',
    accentBorder: 'group-hover:border-cyan-500/40',
  },
  arena: {
    role: { en: 'Agentic Benchmarking', ar: 'تقييم وكلاء الذكاء' },
    gradient: 'from-purple-500/15 via-pink-500/10 to-transparent',
    iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    glow: 'rgba(168, 85, 247, 0.25)',
    accentBorder: 'group-hover:border-purple-500/40',
  },
  harness: {
    role: { en: 'Automated Pipeline', ar: 'أتمتة الاختبارات والتنفيذ' },
    gradient: 'from-sky-500/15 via-indigo-500/10 to-transparent',
    iconBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
    glow: 'rgba(14, 165, 233, 0.25)',
    accentBorder: 'group-hover:border-sky-500/40',
  },
  freellm: {
    role: { en: 'Open-Source LLMs', ar: 'النماذج مفتوحة المصدر' },
    gradient: 'from-rose-500/15 via-red-500/10 to-transparent',
    iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    glow: 'rgba(244, 63, 94, 0.25)',
    accentBorder: 'group-hover:border-rose-500/40',
  },
};

const getToolBrandConfig = (toolName) => {
  const normalized = (toolName || '').toLowerCase();
  if (normalized.includes('claude')) return toolBrandConfigs.claude;
  if (normalized.includes('chatgpt')) return toolBrandConfigs.chatgpt;
  if (normalized.includes('gemini')) return toolBrandConfigs.gemini;
  if (normalized.includes('harness')) return toolBrandConfigs.harness;
  if (normalized.includes('deepseek')) return toolBrandConfigs.deepseek;
  if (normalized.includes('arena')) return toolBrandConfigs.arena;
  if (normalized.includes('free')) return toolBrandConfigs.freellm;
  return toolBrandConfigs.gemini;
};

const AIToolkit = () => {
  const { t, langConfig, language } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const revealVariants = getRevealVariants({ distance: profile.revealDistance });
  const staggerVariants = getStaggerVariants({ stagger: profile.stagger });
  const aiToolkitData = t('aiToolkit');

  const [pointerPos, setPointerPos] = useState({});

  const handlePointerMove = (index, event) => {
    if (!hasFinePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    setPointerPos((prev) => ({ ...prev, [index]: { x, y } }));
  };

  return (
    <section
      id="ai-toolkit"
      data-experience-section
      aria-labelledby="ai-toolkit-heading"
      className="chapter-centered section-flow relative w-full overflow-hidden bg-[var(--color-6)] px-6 py-24 font-sans md:px-12 md:py-32"
      dir={langConfig.dir}
    >
      {/* Interactive Glowing Grid Background */}
      <InteractiveGridBackground gridSize={36} accentGlow="rgba(228, 42, 42, 0.22)" lineGlowColor="var(--color-7)" />

      {/* Background Decor Lights */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-[var(--color-8)]/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[var(--color-7)]/10 blur-[90px]" />

      <div className="chapter-body relative z-10 mx-auto w-full max-w-7xl">
        {/* Header & Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={revealVariants}
          className="mx-auto mb-6 flex flex-col items-center justify-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-5)]/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{language === 'ar' ? 'أدوات الذكاء الاصطناعي في بيئة العمل' : 'AI Workflows & Tools'}</span>
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={revealVariants}
          className="mx-auto mb-6 max-w-4xl text-center"
        >
          <h2 id="ai-toolkit-heading" className="text-4xl font-black leading-[1.08] tracking-tight text-[var(--color-4)] md:text-6xl lg:text-7xl">
            {aiToolkitData.heading}
          </h2>
        </motion.div>

        {/* Word-by-word text reveal for section paragraph */}
        <WordRevealText
          text={aiToolkitData.description}
          className="mx-auto mb-14 max-w-3xl text-center text-base font-semibold leading-relaxed text-[var(--color-4)]/85 md:text-lg"
        />

        {/* Tools Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={staggerVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {aiToolkitData.tools.map((tool, index) => {
            const config = getToolBrandConfig(tool);
            const pos = pointerPos[index];

            return (
              <motion.article
                key={tool}
                variants={revealVariants}
                whileHover={hasFinePointer ? { y: -6, scale: 1.02 } : undefined}
                onPointerMove={(e) => handlePointerMove(index, e)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[var(--color-3)] bg-white/90 p-6 shadow-[0_10px_30px_rgba(27,23,22,0.06)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_20px_45px_rgba(27,23,22,0.14)] dark:border-white/10 dark:bg-[var(--color-5)]/90 ${config.accentBorder}`}
              >
                {/* Custom Gradient Accent Overlay */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Interactive Dynamic Spotlight Glow */}
                {pos && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${config.glow}, transparent 70%)`,
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Top Header Row: Icon + Brand Chip */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-110 ${config.iconBg}`}>
                      <AIToolLogo name={tool} />
                    </div>
                    <span className="rounded-full border border-[var(--color-3)] bg-white/80 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[var(--color-2)] shadow-2xs backdrop-blur-sm dark:border-white/10 dark:bg-[var(--color-6)]/80">
                      AI Assist
                    </span>
                  </div>

                  {/* Tool Title */}
                  <h3 dir="ltr" className="text-start text-lg font-black tracking-tight text-[var(--color-4)] transition-colors duration-300 group-hover:text-[var(--color-2)] md:text-xl">
                    {tool}
                  </h3>

                  {/* Role Subtitle */}
                  <p className="mt-1.5 text-start text-xs font-semibold leading-normal text-[var(--color-4)]/70 transition-colors duration-300 group-hover:text-[var(--color-4)]/90">
                    {config.role[language] || config.role.en}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--color-3)]/60 pt-3 dark:border-white/10">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-2)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
                    <span>Active Workflow</span>
                  </span>
                  <span className="text-xs font-black text-[var(--color-4)]/40 transition-colors duration-300 group-hover:text-[var(--color-2)]">
                    ⚡
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AIToolkit;

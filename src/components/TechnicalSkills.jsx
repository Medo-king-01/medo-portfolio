import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants, getStaggerVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';

/**
 * Visual icons corresponding to skill types
 */
const SkillIcon = ({ title = '' }) => {
  const t = title.toLowerCase();

  if (t.includes('ai') || t.includes('ذكاء')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (t.includes('requirement') || t.includes('تحديد') || t.includes('أهداف')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    );
  }
  if (t.includes('test') || t.includes('تجربة') || t.includes('اختبار')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }
  if (t.includes('design') || t.includes('تصميم') || t.includes('جرافيك')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    );
  }
  if (t.includes('content') || t.includes('محتوى') || t.includes('كتابة') || t.includes('تعليم')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    );
  }
  if (t.includes('problem') || t.includes('حل') || t.includes('مشكلات')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    );
  }
  if (t.includes('learn') || t.includes('تعلّم') || t.includes('مستمر')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }
  if (t.includes('communicat') || t.includes('تواصل') || t.includes('وضوح')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (t.includes('time') || t.includes('وقت') || t.includes('إدارة')) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }

  // Default tech/code icon
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

/**
 * Individual 3D Interactive Card reacting smoothly to pointer movement
 */
const Interactive3DSkillCard = ({ item, index, hasFinePointer, itemVariants }) => {
  const cardRef = useRef(null);

  // Normalized mouse coordinate values [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid 3D tilt effect
  const springConfig = { damping: 18, stiffness: 180, mass: 0.2 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const brightness = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.04, 0.96]), springConfig);

  const handleMouseMove = (event) => {
    if (!hasFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;

    // Relative mouse position from center [-0.5, 0.5]
    mouseX.set(clientX / width - 0.5);
    mouseY.set(clientY / height - 0.5);

    // Dynamic spotlight CSS properties
    cardRef.current.style.setProperty('--spotlight-x', `${(clientX / width) * 100}%`);
    cardRef.current.style.setProperty('--spotlight-y', `${(clientY / height) * 100}%`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: hasFinePointer ? rotateX : 0,
        rotateY: hasFinePointer ? rotateY : 0,
        filter: hasFinePointer ? `brightness(${brightness})` : 'none',
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-3)] bg-white/80 p-6 shadow-[0_8px_24px_rgba(27,23,22,0.05)] backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 hover:border-[var(--color-2)]/50 hover:bg-white hover:shadow-[0_20px_42px_rgba(123,42,39,0.12)] dark:border-white/10 dark:bg-[var(--color-5)]/85 dark:hover:border-[var(--color-7)]/50 dark:hover:bg-[var(--color-5)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
    >
      {/* Dynamic 3D Spotlight Glare Overlay following mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(228, 42, 42, 0.12), transparent 75%)',
        }}
      />

      {/* Top subtle gloss border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-7)]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Card Header: Icon + Number badge */}
      <div className="relative z-10 mb-4 flex items-center justify-between gap-3" style={{ transform: 'translateZ(18px)' }}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-3)]/60 bg-[var(--color-8)]/15 text-[var(--color-2)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:border-[var(--color-2)]/40 group-hover:bg-[var(--color-2)] group-hover:text-[var(--color-5)] dark:border-white/10 dark:text-[var(--color-8)] dark:group-hover:bg-[var(--color-7)] dark:group-hover:text-white">
          <SkillIcon title={item.title} />
        </div>
        <span
          dir="ltr"
          className="font-mono text-xs font-bold tabular-nums text-[var(--color-4)]/40 transition-colors duration-300 group-hover:text-[var(--color-2)] dark:text-white/30"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-start" style={{ transform: 'translateZ(12px)' }}>
        <h4 className="text-base font-black leading-snug text-[var(--color-4)] transition-colors duration-300 group-hover:text-[var(--color-2)] dark:group-hover:text-[var(--color-8)]">
          {item.title}
        </h4>
        <p className="mt-2.5 text-sm font-medium leading-relaxed text-[var(--color-4)]/75">
          {item.description}
        </p>
      </div>

      {/* Interactive Bottom Sheen Marker */}
      <div className="relative z-10 mt-5 flex items-center gap-2 pt-2" style={{ transform: 'translateZ(8px)' }}>
        <span className="h-1 w-6 rounded-full bg-[var(--color-3)] transition-all duration-300 group-hover:w-10 group-hover:bg-[var(--color-7)]" />
        <span className="h-1 w-1 rounded-full bg-[var(--color-3)] transition-all duration-300 group-hover:bg-[var(--color-2)]" />
      </div>
    </motion.article>
  );
};

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
      className="section-flow relative w-full overflow-hidden bg-[var(--color-6)] px-5 pb-28 pt-24 font-sans sm:px-8 md:px-12 md:pb-36 md:pt-32"
    >
      {/* Decorative ambient background flares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8rem] top-1/4 h-[420px] w-[420px] rounded-full bg-[var(--color-8)]/15 blur-[130px] dark:bg-[var(--color-7)]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-[-8rem] h-[440px] w-[440px] rounded-full bg-[var(--color-1)]/20 blur-[130px] dark:bg-[var(--color-2)]/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={itemVariants}
          className="mb-16 text-center md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={motionConfig.viewport}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-white/85 px-5 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[var(--color-5)]/85"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-7)]" />
            {skillsData.badge}
          </motion.span>
          <h2
            id="skills-heading"
            className="text-4xl font-black tracking-tight text-[var(--color-4)] sm:text-5xl md:text-6xl"
          >
            {skillsData.heading}
            <span className="text-[var(--color-7)]">.</span>
          </h2>
        </motion.header>

        {/* Skill Groups */}
        <div className="space-y-16 md:space-y-24">
          {skillsData.groups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial="hidden"
              whileInView="visible"
              viewport={motionConfig.viewport}
              variants={itemVariants}
            >
              {/* Group Title and Badge */}
              <div className="mb-8 flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-2)]/25 bg-[var(--color-8)]/20 text-sm font-black text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-[var(--color-7)]/30 dark:bg-[var(--color-7)]/15 dark:text-[var(--color-8)]"
                >
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-[var(--color-4)] md:text-3xl">
                    {group.title}
                  </h3>
                </div>
              </div>

              {/* 3D Cards Grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={motionConfig.viewport}
                variants={staggerVariants}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {group.items.map((item, index) => (
                  <Interactive3DSkillCard
                    key={item.title}
                    item={item}
                    index={index}
                    hasFinePointer={hasFinePointer}
                    itemVariants={itemVariants}
                  />
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

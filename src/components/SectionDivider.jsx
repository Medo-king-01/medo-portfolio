import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

export const SectionDivider = ({ label }) => {
  const { language } = useLanguage();

  const dividerText = label || (language === 'ar' ? 'رحلة التطور والاستكشاف' : 'Continuous Evolution');

  return (
    <div
      aria-hidden="true"
      className="relative z-20 w-full overflow-hidden bg-gradient-to-b from-[var(--color-5)] to-[var(--color-6)] py-6 font-sans select-none"
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 md:px-12">
        {/* Animated Left Gradient Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-right bg-gradient-to-r from-transparent via-[var(--color-3)] to-[var(--color-2)] dark:via-white/15 dark:to-[var(--color-7)]"
        />

        {/* Center Animated Badge & Pulsing Node */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="relative mx-4 flex items-center justify-center sm:mx-8"
        >
          {/* Ambient Pulsing Glow */}
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="absolute h-9 w-9 rounded-full bg-[var(--color-7)]/25 blur-md"
          />

          <div className="relative flex items-center gap-2 rounded-full border border-[var(--color-3)] bg-white/95 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--color-2)] shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-[var(--color-6)] dark:text-[var(--color-4)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-7)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-7)]" />
            </span>
            <span>{dividerText}</span>
          </div>
        </motion.div>

        {/* Animated Right Gradient Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-left bg-gradient-to-l from-transparent via-[var(--color-3)] to-[var(--color-2)] dark:via-white/15 dark:to-[var(--color-7)]"
        />
      </div>
    </div>
  );
};

export default SectionDivider;

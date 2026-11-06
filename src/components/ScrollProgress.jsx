import { motion, useScroll } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { langConfig } = useLanguage();
  const isRtl = langConfig?.dir === 'rtl';

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[3.5px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--color-2)] via-[var(--color-7)] to-[var(--color-8)] shadow-[0_0_12px_rgba(228,42,42,0.65)]"
        style={{ scaleX: scrollYProgress, transformOrigin: isRtl ? '100%' : '0%' }}
      />
    </div>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { langConfig } = useLanguage();
  const isRtl = langConfig?.dir === 'rtl';
  const headPosition = useTransform(scrollYProgress, (value) => `${(isRtl ? 1 - value : value) * 100}%`);

  return (
    <div aria-hidden="true" className="journey-progress pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3.5px] bg-transparent">
      <motion.div
        className={`journey-progress-fill h-full ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[var(--color-2)] via-[var(--color-7)] to-[var(--color-8)]`}
        style={{ scaleX: scrollYProgress, transformOrigin: isRtl ? '100%' : '0%' }}
      />
      <motion.span
        className="journey-progress-head absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-7)]"
        style={{ left: headPosition }}
      />
    </div>
  );
}

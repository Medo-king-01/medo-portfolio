import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { leadershipList } from '../data/portfolioData';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

const resolveLocalized = (field, language) => {
  if (field && typeof field === 'object') {
    return field[language] || field.en || '';
  }
  return field || '';
};

const JourneyCard = ({ item, index, progress, activeIndex, isMobile, language, t }) => {
  const transform = useTransform(progress, (value) => {
    const offset = index - value;
    const distance = Math.abs(offset);
    const verticalStep = isMobile ? 72 : 108;
    const scaleLoss = isMobile ? 0.035 : 0.045;
    const rotation = clamp(offset * (isMobile ? 0.8 : 1.2), -3, 3);
    const scale = 1 - Math.min(distance, 2) * scaleLoss;
    return `translate3d(-50%, calc(-50% + ${offset * verticalStep}px), 0) scale(${scale}) rotate(${rotation}deg)`;
  });
  const opacity = useTransform(progress, (value) => {
    const distance = Math.abs(index - value);
    return distance > 2.7 ? 0 : 1 - Math.min(distance * 0.16, 0.38);
  });
  const filter = useTransform(progress, (value) => {
    return `blur(${Math.min(Math.abs(index - value) * 2.4, 7)}px)`;
  });
  const zIndex = useTransform(progress, (value) => 30 - Math.round(Math.abs(index - value) * 3));
  const isActive = index === activeIndex;
  const chapterLabel = t('leadership.chapterLabel');
  const category = resolveLocalized(item.category, language);
  const title = resolveLocalized(item.title, language);
  const paragraphs = resolveLocalized(item.content, language);

  return (
    <motion.article
      className={`beyond-card beyond-card-${item.motif} ${isActive ? 'beyond-card-active' : ''}`}
      style={{ transform, opacity, filter, zIndex }}
      aria-hidden={!isActive}
    >
      <div className="beyond-card-topline">
        <span className="beyond-card-number" dir="ltr">
          {String(index + 1).padStart(2, '0')} <i>/ {String(leadershipList.length).padStart(2, '0')}</i>
        </span>
        <span className="beyond-card-category">{category}</span>
      </div>
      <div className="beyond-card-body">
        <div className="beyond-card-copy" tabIndex={isActive ? 0 : -1}>
          <span className="beyond-card-kicker">
            {chapterLabel} {String(index + 1).padStart(2, '0')}
          </span>
          <h3>{title}</h3>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                  : part
              )}
            </p>
          ))}
        </div>
        <div className="beyond-card-motif" aria-hidden="true">
          <span />
        </div>
      </div>
    </motion.article>
  );
};

const Leadership = () => {
  const { t, langConfig, language } = useLanguage();
  const { isMobile, isShortViewport } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isShortViewport });
  const stageRef = useRef(null);
  const maxStep = Math.max(leadershipList.length - 1, 0);
  const stageLength = 100 + maxStep * profile.journeyStep;
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, maxStep]);
  const headerVariants = getRevealVariants({ distance: profile.revealDistance });

  useMotionValueEvent(progress, 'change', (value) => {
    const nextIndex = clamp(Math.round(value), 0, maxStep);
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  return (
    <section
      id="leadership"
      data-experience-section
      aria-labelledby="leadership-heading"
      className="section-flow beyond-code-section font-sans"
      dir={langConfig.dir}
    >
      <div className="beyond-code-inner">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={headerVariants}
          className="beyond-code-header"
        >
          <span className="beyond-code-eyebrow">{t('leadership.eyebrow')}</span>
          <h2 id="leadership-heading">{t('leadership.heading')}</h2>
          <p className="italic">{t('leadership.subheading')}</p>
        </motion.header>

        <div ref={stageRef} className="beyond-stack-stage" style={{ height: `${stageLength}svh` }}>
          <div className="beyond-stack-sticky">
            <div
              className="beyond-progress"
              role="progressbar"
              dir="ltr"
              aria-label={t('leadership.progressLabel')}
              aria-valuemin={1}
              aria-valuemax={leadershipList.length}
              aria-valuenow={activeIndex + 1}
            >
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <i>/</i>
              <span>{String(leadershipList.length).padStart(2, '0')}</span>
              <span className="beyond-progress-label">{t('leadership.progressLabel')}</span>
            </div>
            <div className="beyond-card-stack">
              {leadershipList.map((item, index) => (
                <JourneyCard
                  key={item.id || index}
                  item={item}
                  index={index}
                  progress={progress}
                  activeIndex={activeIndex}
                  isMobile={isMobile}
                  language={language}
                  t={t}
                />
              ))}
            </div>
            <div className="beyond-scroll-cue" aria-hidden="true">
              <span /> {t('leadership.scrollCue')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;

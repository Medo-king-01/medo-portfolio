import { useEffect, useRef, useState } from 'react';
import { leadershipList } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext.jsx';

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

const JourneyCard = ({ item, index, progress, activeIndex, reducedMotion, language, t }) => {
  const offset = index - progress;
  const distance = Math.abs(offset);
  const isActive = index === activeIndex;
  const style = {
    transform: `translate3d(-50%, calc(-50% + ${offset * (reducedMotion ? 72 : 108)}px), 0) scale(${1 - Math.min(distance, 2) * (reducedMotion ? 0.025 : 0.045)}) rotate(${clamp(offset * (reducedMotion ? 0.5 : 1.2), -3, 3)}deg)`,
    opacity: distance > 2.7 ? 0 : 1 - Math.min(distance * (reducedMotion ? 0.1 : 0.16), reducedMotion ? 0.24 : 0.38),
    filter: reducedMotion ? 'none' : `blur(${Math.min(distance * 2.4, 7)}px)`,
    zIndex: 30 - Math.round(distance * 3),
  };

  const chapterLabel = t('leadership.chapterLabel');
  const exploreLabel = t('leadership.exploreLabel');

  const content = (
    <article
      className={`beyond-card beyond-card-${item.motif} ${isActive ? 'beyond-card-active' : ''}`}
      style={style}
      aria-hidden={!reducedMotion && distance > 1.5}
    >
      <div className="beyond-card-topline">
        <span className="beyond-card-number">{String(index + 1).padStart(2, '0')} <i>/ {String(leadershipList.length).padStart(2, '0')}</i></span>
        <span className="beyond-card-category">{item.category}</span>
      </div>
      <div className="beyond-card-body">
        <div className="beyond-card-copy">
          <span className="beyond-card-kicker">{chapterLabel} {String(index + 1).padStart(2, '0')}</span>
          <h3>{item.title[language] || item.title.en}</h3>
          <p>{item.description[language] || item.description.en}</p>
          <div className="beyond-card-meta">
            {(item.tools || item.areas || [item.label]).filter(Boolean).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {item.link && <a href={item.link} className="beyond-card-link">{exploreLabel} <span aria-hidden="true">&#8599;</span></a>}
        </div>
        <div className="beyond-card-motif" aria-hidden="true"><span /></div>
      </div>
    </article>
  );

  return content;
};

const Leadership = () => {
  const { t, langConfig, language } = useLanguage();
  const stageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    updateMotion();
    motionQuery.addEventListener?.('change', updateMotion);

    let frameId = 0;
    const updateProgress = () => {
      frameId = 0;
      if (!stageRef.current) return;
      const stage = stageRef.current;
      const scrollDistance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      const nextProgress = ((window.scrollY - stageTop) / scrollDistance) * (leadershipList.length - 1);
      setProgress(clamp(nextProgress, 0, leadershipList.length - 1));
    };
    const handleScroll = () => {
      if (document.hidden) {
        updateProgress();
        return;
      }
      if (motionQuery.matches) {
        updateProgress();
        return;
      }
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      motionQuery.removeEventListener?.('change', updateMotion);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const activeIndex = Math.round(progress);

  return (
    <section id="leadership" className={`beyond-code-section ${reducedMotion ? 'beyond-code-reduced' : ''}`} dir={langConfig.dir}>
      <div className="beyond-code-inner">
        <header data-aos="fade-up" className="beyond-code-header">
          <span className="beyond-code-eyebrow">{t('leadership.eyebrow')}</span>
          <h2>{t('leadership.heading')}</h2>
          <p>{t('leadership.subheading')}</p>
        </header>

        <div ref={stageRef} className="beyond-stack-stage">
          <div className="beyond-stack-sticky">
            <div className="beyond-progress" aria-label={t('leadership.progressLabel', { current: activeIndex + 1, total: leadershipList.length }) || `Journey progress ${activeIndex + 1} of ${leadershipList.length}`}>
              <span>{String(activeIndex + 1).padStart(2, '0')}</span><i>/</i><span>{String(leadershipList.length).padStart(2, '0')}</span>
              <span className="beyond-progress-label">{t('leadership.progressLabel')}</span>
            </div>
            <div className="beyond-card-stack">
              {leadershipList.map((item, index) => (
                <JourneyCard key={item.title} item={item} index={index} progress={progress} activeIndex={activeIndex} reducedMotion={reducedMotion} language={language} t={t} />
              ))}
            </div>
            <div className="beyond-scroll-cue" aria-hidden="true"><span /> {t('leadership.scrollCue')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;

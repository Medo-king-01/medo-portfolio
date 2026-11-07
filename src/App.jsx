import { useEffect } from 'react';
import { siteConfig } from './config/site.config';
import { translations } from './data/translations';
import ScrollProgress from './components/ScrollProgress';
import SmoothScrollController from './motion/SmoothScrollController.jsx';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Story from './components/Story';
import TechnicalSkills from './components/TechnicalSkills';
import Projects from './components/Projects';
import CertificationsSection from './components/CertificationsSection';
import BeyondTech from './components/BeyondTech';
import AIToolkit from './components/AIToolkit';
import Perspective from './components/Perspective';
import Content from './components/Content';
import Leadership from './components/Leadership';
import Footer from './components/Footer';
import { projects, leadershipList } from './data/portfolioData';

const SECTION_COMPONENTS = {
  preloader: Preloader,
  navbar: Navbar,
  hero: Hero,
  about: About,
  story: Story,
  skills: TechnicalSkills,
  projects: Projects,
  certifications: CertificationsSection,
  beyondTech: BeyondTech,
  aiToolkit: AIToolkit,
  perspective: Perspective,
  leadership: Leadership,
  contact: Content,
  footer: Footer,
};

function hasValidData(sectionKey) {
  switch (sectionKey) {
    case 'skills':
      return translations.en.technicalSkills.groups.some((group) => group.items.length > 0);
    case 'projects':
      return projects?.length > 0;
    case 'leadership':
      return leadershipList?.length > 0;
    default:
      return true;
  }
}

function App() {
  useEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;
    const listeners = [];

    const afterPaint = () => {
      if (cancelled || window.__APP_READY__) return;
      window.__APP_READY__ = true;
      window.dispatchEvent(new CustomEvent('app:ready'));
    };

    const scheduleReady = () => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(afterPaint);
      });
    };

    const pageReady = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      const handleLoad = () => resolve();
      window.addEventListener('load', handleLoad, { once: true });
      listeners.push(() => window.removeEventListener('load', handleLoad));
    });

    const fontsReady = document.fonts?.ready?.catch(() => undefined) || Promise.resolve();
    // Wait for eager images rendered by React, but leave offscreen lazy images to load on demand.
    const eagerImagesReady = Promise.all(
      Array.from(document.images)
        .filter((image) => image.loading !== 'lazy')
        .map((image) => new Promise((resolve) => {
          let settled = false;
          const cleanup = () => {
            image.removeEventListener('load', handleSettled);
            image.removeEventListener('error', handleSettled);
          };
          const handleSettled = () => {
            if (settled) return;
            settled = true;
            cleanup();
            const decoded = image.complete && image.naturalWidth > 0 && typeof image.decode === 'function'
              ? image.decode().catch(() => undefined)
              : Promise.resolve();
            decoded.then(resolve);
          };

          if (image.complete) {
            handleSettled();
            return;
          }

          image.addEventListener('load', handleSettled, { once: true });
          image.addEventListener('error', handleSettled, { once: true });
          listeners.push(cleanup);
          if (image.complete) handleSettled();
        })),
    );
    const heroVideo = document.querySelector('#home video');
    const shouldWaitForVideo = heroVideo && heroVideo.preload !== 'none';
    const mediaReady = !shouldWaitForVideo || heroVideo.readyState >= 1
      ? Promise.resolve()
      : new Promise((resolve) => {
        const handleMediaReady = () => resolve();
        heroVideo.addEventListener('loadedmetadata', handleMediaReady, { once: true });
        heroVideo.addEventListener('error', handleMediaReady, { once: true });
        listeners.push(() => {
          heroVideo.removeEventListener('loadedmetadata', handleMediaReady);
          heroVideo.removeEventListener('error', handleMediaReady);
        });
      });

    Promise.all([pageReady, fontsReady, eagerImagesReady, mediaReady]).then(scheduleReady);

    return () => {
      cancelled = true;
      listeners.forEach((cleanup) => cleanup());
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  const activeSections = Object.entries(siteConfig.sections)
    .filter(([key, cfg]) => {
      if (!SECTION_COMPONENTS[key]) return false;
      if (cfg.enabled === false) return false;
      if (!hasValidData(key)) return false;
      return true;
    })
    .sort(([, a], [, b]) => a.order - b.order);

  return (
    <>
      <SmoothScrollController />
      <ScrollProgress />
      {activeSections.map(([key]) => {
        const Component = SECTION_COMPONENTS[key];
        return Component ? <Component key={key} /> : null;
      })}
    </>
  );
}

export default App;

export const motionConfig = Object.freeze({
  duration: {
    micro: 0.18,
    quick: 0.26,
    reveal: 0.52,
    modal: 0.24,
    curtain: 0.62,
  },
  ease: {
    enter: [0.22, 1, 0.36, 1],
    standard: [0.33, 1, 0.68, 1],
    exit: [0.76, 0, 0.24, 1],
  },
  distance: {
    desktop: 24,
    mobile: 12,
    parallax: 28,
  },
  stagger: {
    compact: 0.055,
    standard: 0.085,
  },
  viewport: {
    once: true,
    amount: 0.16,
    margin: '0px 0px -48px 0px',
  },
});

export function getMotionProfile({ isMobile = false, isShortViewport = false, reducedMotion = false } = {}) {
  if (reducedMotion) {
    return {
      revealDistance: 0,
      stagger: 0,
      parallaxDistance: 0,
      journeyStep: 24,
      certificateStep: 22,
    };
  }

  return {
    revealDistance: isMobile ? 12 : motionConfig.distance.desktop,
    stagger: isMobile ? motionConfig.stagger.compact : motionConfig.stagger.standard,
    parallaxDistance: isMobile || isShortViewport ? 0 : motionConfig.distance.parallax,
    journeyStep: isShortViewport ? 28 : isMobile ? 36 : 50,
    certificateStep: isShortViewport ? 30 : isMobile ? 38 : 50,
  };
}

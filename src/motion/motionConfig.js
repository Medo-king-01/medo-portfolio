export const motionConfig = Object.freeze({
  duration: {
    micro: 0.16,
    quick: 0.24,
    reveal: 0.48,
    scene: 0.72,
    modal: 0.22,
    curtain: 0.58,
  },
  ease: {
    enter: [0.22, 1, 0.36, 1],
    standard: [0.33, 1, 0.68, 1],
    exit: [0.76, 0, 0.24, 1],
  },
  distance: {
    desktop: 28,
    tablet: 18,
    mobile: 10,
    parallax: 34,
  },
  perspective: {
    desktop: 1400,
    tablet: 1050,
    mobile: 760,
  },
  stagger: {
    compact: 0.045,
    tablet: 0.065,
    standard: 0.08,
  },
  viewport: {
    once: true,
    amount: 0.16,
    margin: '0px 0px -48px 0px',
  },
});

export function getMotionProfile({
  isMobile = false,
  isTablet = false,
  isShortViewport = false,
  hasFinePointer = true,
} = {}) {
  const deviceClass = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  const pinnedScenes = hasFinePointer && !isMobile && !isTablet && !isShortViewport;
  const revealDistance = isMobile
    ? motionConfig.distance.mobile
    : isTablet
      ? motionConfig.distance.tablet
      : motionConfig.distance.desktop;

  return {
    deviceClass,
    revealDistance,
    stagger: isMobile
      ? motionConfig.stagger.compact
      : isTablet
        ? motionConfig.stagger.tablet
        : motionConfig.stagger.standard,
    parallaxDistance: isMobile || isShortViewport
      ? 0
      : isTablet
        ? motionConfig.distance.parallax * 0.45
        : motionConfig.distance.parallax,
    perspective: isMobile
      ? motionConfig.perspective.mobile
      : isTablet
        ? motionConfig.perspective.tablet
        : motionConfig.perspective.desktop,
    journeyStep: isShortViewport ? 28 : isMobile ? 36 : 50,
    certificateStep: pinnedScenes ? 28 : 0,
    pinnedScenes,
  };
}

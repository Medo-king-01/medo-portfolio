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
    tablet: 28,
    mobile: 28,
    parallax: 34,
  },
  perspective: {
    desktop: 1400,
    tablet: 1050,
    mobile: 760,
  },
  stagger: {
    compact: 0.08,
    tablet: 0.08,
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
} = {}) {
  const deviceClass = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  // Scroll-scrubbed project and certificate scenes are enabled on touch devices too.
  const pinnedScenes = true;
  // Keep the motion language equally expressive across breakpoints; layout, not
  // animation intensity, adapts to the available screen space.
  const revealDistance = motionConfig.distance.desktop;

  return {
    deviceClass,
    revealDistance,
    stagger: motionConfig.stagger.standard,
    parallaxDistance: motionConfig.distance.parallax,
    perspective: isMobile
      ? motionConfig.perspective.mobile
      : isTablet
        ? motionConfig.perspective.tablet
        : motionConfig.perspective.desktop,
    journeyStep: 50,
    certificateStep: pinnedScenes ? 28 : 0,
    pinnedScenes,
  };
}

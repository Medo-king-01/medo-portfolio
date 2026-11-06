import { motionConfig } from './motionConfig.js';

export function getRevealVariants({
  reducedMotion = false,
  distance = motionConfig.distance.desktop,
  axis = 'y',
  delay = 0,
  depth = true,
} = {}) {
  const offset = reducedMotion ? 0 : distance;

  return {
    // Keep content perceivable and keyboard-accessible before its in-view transition.
    hidden: {
      opacity: 1,
      ...(axis ? { [axis]: offset } : {}),
      ...(depth && !reducedMotion ? { scale: 0.985 } : {}),
    },
    visible: {
      opacity: 1,
      ...(axis ? { [axis]: 0 } : {}),
      ...(depth && !reducedMotion ? { scale: 1 } : {}),
      transition: {
        duration: reducedMotion ? motionConfig.duration.micro : motionConfig.duration.reveal,
        delay: reducedMotion ? 0 : delay,
        ease: motionConfig.ease.enter,
      },
    },
  };
}

export function getStaggerVariants({ reducedMotion = false, stagger = motionConfig.stagger.standard } = {}) {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reducedMotion ? 0 : 0.025,
        staggerChildren: reducedMotion ? 0 : stagger,
      },
    },
  };
}

export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionConfig.duration.modal } },
  exit: { opacity: 0, transition: { duration: motionConfig.duration.quick } },
};

export const modalPanelVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: motionConfig.duration.modal, ease: motionConfig.ease.enter },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.99,
    transition: { duration: motionConfig.duration.quick, ease: motionConfig.ease.exit },
  },
};

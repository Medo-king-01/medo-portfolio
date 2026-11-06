import { motionConfig } from './motionConfig.js';

export function getRevealVariants({
  distance = motionConfig.distance.desktop,
  axis = 'y',
  delay = 0,
  depth = true,
} = {}) {
  return {
    hidden: {
      opacity: 0,
      ...(axis ? { [axis]: distance } : {}),
      ...(depth ? { scale: 0.985 } : {}),
    },
    visible: {
      opacity: 1,
      ...(axis ? { [axis]: 0 } : {}),
      ...(depth ? { scale: 1 } : {}),
      transition: {
        duration: motionConfig.duration.reveal,
        delay,
        ease: motionConfig.ease.enter,
      },
    },
  };
}

export function getStaggerVariants({ stagger = motionConfig.stagger.standard } = {}) {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.025,
        staggerChildren: stagger,
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

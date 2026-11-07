import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getMotionProfile, motionConfig } from '../motion/motionConfig.js';
import { getRevealVariants } from '../motion/motionVariants.js';
import { useMotionEnvironment } from '../motion/useMotionEnvironment.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import stackImageAsset from '../assets/about/medo.jpg';

const stackImage = stackImageAsset;

const ROPE_LENGTH = 300;
const MAX_X = 220;
const MIN_Y = -120;
const MAX_Y = 160;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * Split a paragraph into an array of {text, key} tokens (words + trailing spaces).
 * Works for both LTR and RTL — we just split on whitespace.
 */
const splitWords = (paragraph) => {
  // Match sequences of non-whitespace and preserve whitespace between them.
  const tokens = [];
  const regex = /(\S+)(\s*)/g;
  let m;
  let i = 0;
  while ((m = regex.exec(paragraph)) !== null) {
    tokens.push({ word: m[1], space: m[2], key: `${i}-${m[1]}` });
    i += 1;
  }
  return tokens;
};

const About = () => {
  const { t, langConfig } = useLanguage();
  const { isMobile, isTablet, isShortViewport, hasFinePointer } = useMotionEnvironment();
  const profile = getMotionProfile({ isMobile, isTablet, isShortViewport, hasFinePointer });
  const frameRef = useRef(null);
  const ropePathRef = useRef(null);
  const ropeHighlightRef = useRef(null);
  const physicsFrameRef = useRef(null);
  const inViewRef = useRef(false);
  const schedulePhysicsRef = useRef(() => {});

  // Has the entrance "drop + swing" animation finished?
  const [entranceDone, setEntranceDone] = useState(false);
  // Has the section entered the viewport (triggers entrance)?
  const [hasEntered, setHasEntered] = useState(false);

  const paragraphs = useMemo(() => t('about.paragraphs') || [], [t]);
  const motto = t('about.motto');

  // Pre-split paragraphs into words once per language/paragraph change.
  const tokenizedParagraphs = useMemo(
    () => paragraphs.map((p) => splitWords(p)),
    [paragraphs],
  );

  const physicsRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    velocityX: 0,
    velocityY: 0,
    rotation: 0,
    dragging: false,
    pointerId: null,
    startPointerX: 0,
    startPointerY: 0,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const canDragRef = useRef(false);
  const returningRef = useRef(false);

  const updateRope = useCallback(() => {
    const rope = ropePathRef.current;
    if (!rope) return;

    const physics = physicsRef.current;
    const { x, y, velocityX, velocityY } = physics;

    const sway = clamp(velocityX * 0.02 - x * 0.08, -36, 36);
    const vStretch = clamp(velocityY * 0.008, -16, 16);

    const startX = 0;
    const startY = -ROPE_LENGTH;

    const endX = x;
    const endY = y - 8;

    const cp1X = startX + (endX - startX) * 0.22 + sway * 0.5;
    const cp1Y = startY + (endY - startY) * 0.45;

    const cp2X = startX + (endX - startX) * 0.75 + sway * 0.85;
    const cp2Y = startY + (endY - startY) * 0.82 + vStretch;

    const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

    rope.setAttribute('d', path);
    if (ropeHighlightRef.current) {
      ropeHighlightRef.current.setAttribute('d', path);
    }
  }, []);

  const updateVisual = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const { x, y, rotation } = physicsRef.current;
    frame.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}deg)`;
    updateRope();
  }, [updateRope]);

  useEffect(() => {
    const frameElement = frameRef.current;
    const pointerQuery = window.matchMedia('(pointer: fine)');
    canDragRef.current = pointerQuery.matches;
    let previousTime = performance.now();
    let observer;

    const isMoving = () => {
      const physics = physicsRef.current;
      return physics.dragging || returningRef.current ||
        Math.abs(physics.x) > 0.08 || Math.abs(physics.y) > 0.08 ||
        Math.abs(physics.velocityX) > 0.08 || Math.abs(physics.velocityY) > 0.08 ||
        Math.abs(physics.rotation) > 0.08;
    };

    const tick = (time) => {
      physicsFrameRef.current = null;
      if (!inViewRef.current || !entranceDone) return;

      const physics = physicsRef.current;
      const deltaTime = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;

      if (physics.dragging) {
        const dx = physics.targetX - physics.x;
        const dy = physics.targetY - physics.y;
        physics.x += dx * 0.3;
        physics.y += dy * 0.3;
        physics.velocityX = physics.velocityX * 0.78 + (dx * 0.22) / Math.max(deltaTime, 0.016);
        physics.velocityY = physics.velocityY * 0.78 + (dy * 0.22) / Math.max(deltaTime, 0.016);
        const desiredRotation = physics.velocityX * 0.018 + physics.x * 0.032;
        physics.rotation += (desiredRotation - physics.rotation) * 0.28;
        physics.rotation = clamp(physics.rotation, -10, 10);
      } else {
        const forceX = -26 * physics.x - 8.5 * physics.velocityX;
        physics.velocityX += forceX * deltaTime;
        physics.x += physics.velocityX * deltaTime;

        const forceY = -30 * physics.y - 8.5 * physics.velocityY;
        physics.velocityY += forceY * deltaTime;
        physics.y += physics.velocityY * deltaTime;

        const rotationForce = -43 * physics.rotation;
        physics.rotation += rotationForce * deltaTime;
        physics.rotation += physics.velocityX * 0.0007;
        physics.rotation = clamp(physics.rotation, -10, 10);

        if (Math.abs(physics.x) < 0.08 && Math.abs(physics.velocityX) < 0.08) {
          physics.x = 0;
          physics.velocityX = 0;
        }
        if (Math.abs(physics.y) < 0.08 && Math.abs(physics.velocityY) < 0.08) {
          physics.y = 0;
          physics.velocityY = 0;
        }
        if (Math.abs(physics.rotation) < 0.08) physics.rotation = 0;

        if (
          Math.abs(physics.x) < 0.08 && Math.abs(physics.y) < 0.08 &&
          Math.abs(physics.velocityX) < 0.08 && Math.abs(physics.velocityY) < 0.08 &&
          Math.abs(physics.rotation) < 0.08
        ) {
          physics.x = 0;
          physics.y = 0;
          physics.velocityX = 0;
          physics.velocityY = 0;
          physics.rotation = 0;
          returningRef.current = false;
        }
      }

      updateVisual();
      if (isMoving() && inViewRef.current) {
        physicsFrameRef.current = window.requestAnimationFrame(tick);
      } else if (frameRef.current) {
        frameRef.current.style.willChange = 'auto';
      }
    };

    const schedule = () => {
      if (!frameRef.current || physicsFrameRef.current || !inViewRef.current || !entranceDone || !isMoving()) return;
      frameRef.current.style.willChange = 'transform';
      previousTime = performance.now();
      physicsFrameRef.current = window.requestAnimationFrame(tick);
    };
    schedulePhysicsRef.current = schedule;

    const handlePointerChange = () => {
      canDragRef.current = pointerQuery.matches;
    };
    if (typeof pointerQuery.addEventListener === 'function') pointerQuery.addEventListener('change', handlePointerChange);
    else pointerQuery.addListener?.(handlePointerChange);

    if (frameElement && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Trigger the drop+swing entrance once.
          if (!hasEntered) setHasEntered(true);
          schedulePhysicsRef.current();
        } else if (physicsFrameRef.current) {
          window.cancelAnimationFrame(physicsFrameRef.current);
          physicsFrameRef.current = null;
          if (frameRef.current) frameRef.current.style.willChange = 'auto';
        }
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      observer.observe(frameElement);
    } else {
      inViewRef.current = true;
      setHasEntered(true);
    }

    return () => {
      observer?.disconnect();
      if (typeof pointerQuery.removeEventListener === 'function') pointerQuery.removeEventListener('change', handlePointerChange);
      else pointerQuery.removeListener?.(handlePointerChange);
      if (physicsFrameRef.current) {
        window.cancelAnimationFrame(physicsFrameRef.current);
        physicsFrameRef.current = null;
      }
      if (frameElement) frameElement.style.willChange = 'auto';
      schedulePhysicsRef.current = () => {};
    };
  }, [updateVisual, entranceDone, hasEntered]);

  // When the entrance swing finishes, mark it done so drag physics resume.
  const handleEntranceComplete = useCallback(() => {
    // Reset physics to neutral (card is hanging straight) before handing over to drag.
    physicsRef.current.x = 0;
    physicsRef.current.y = 0;
    physicsRef.current.velocityX = 0;
    physicsRef.current.velocityY = 0;
    physicsRef.current.rotation = 0;
    setEntranceDone(true);
  }, []);

  const handlePointerDown = (event) => {
    if (!entranceDone) return; // block drag until entrance finishes
    const supportsPointerDrag = canDragRef.current || event.pointerType === 'touch' || event.pointerType === 'pen';
    if (!frameRef.current || !supportsPointerDrag) return;

    const physics = physicsRef.current;
    physics.dragging = true;
    returningRef.current = false;
    physics.pointerId = event.pointerId;

    physics.startPointerX = event.clientX;
    physics.startPointerY = event.clientY;
    physics.startX = physics.x;
    physics.startY = physics.y;
    physics.targetX = physics.x;
    physics.targetY = physics.y;
    physics.lastX = physics.x;
    physics.lastY = physics.y;
    physics.lastTime = event.timeStamp;

    physics.velocityX *= 0.15;
    physics.velocityY *= 0.15;

    frameRef.current.classList.add('about-card-grabbing');

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore.
    }

    schedulePhysicsRef.current();
  };

  const handlePointerMove = (event) => {
    const physics = physicsRef.current;
    if (!entranceDone || !physics.dragging || physics.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - physics.startPointerX;
    const deltaY = event.clientY - physics.startPointerY;

    // For touch devices, if horizontal movement dominates, let the card swing
    const nextX = clamp(physics.startX + deltaX, -MAX_X, MAX_X);
    const nextY = clamp(physics.startY + deltaY, MIN_Y, MAX_Y);

    const elapsed = Math.max((event.timeStamp - physics.lastTime) / 1000, 0.016);
    const velocityX = (nextX - physics.lastX) / elapsed;
    const velocityY = (nextY - physics.lastY) / elapsed;

    physics.velocityX = physics.velocityX * 0.65 + velocityX * 0.35;
    physics.velocityY = physics.velocityY * 0.65 + velocityY * 0.35;

    physics.lastX = nextX;
    physics.lastY = nextY;
    physics.lastTime = event.timeStamp;

    physics.targetX = nextX;
    physics.targetY = nextY;
    physics.x = nextX;
    physics.y = nextY;

    physics.rotation = clamp(nextX * 0.032 + physics.velocityX * 0.018, -10, 10);

    updateVisual();
    if (event.pointerType !== 'touch') event.preventDefault();
  };

  const releaseCard = (event) => {
    const physics = physicsRef.current;
    if (!physics.dragging || physics.pointerId !== event.pointerId) return;

    physics.dragging = false;
    returningRef.current = true;
    physics.velocityX *= 0.12;
    physics.velocityY *= 0.12;

    frameRef.current?.classList.remove('about-card-grabbing');

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore.
    }

    physics.pointerId = null;
    if (event.pointerType !== 'touch') event.preventDefault();
    schedulePhysicsRef.current();
  };

  const handlePointerCancel = (event) => {
    const physics = physicsRef.current;
    if (!physics.dragging) return;

    physics.dragging = false;
    physics.pointerId = null;
    returningRef.current = true;
    physics.velocityX *= 0.12;
    physics.velocityY *= 0.12;

    frameRef.current?.classList.remove('about-card-grabbing');
    if (event.pointerType !== 'touch') event.preventDefault();
    schedulePhysicsRef.current();
  };

  // Framer Motion variants for the entrance "drop + swing".
  // The card starts held up at the anchor point (rope slack/coiled), then drops.
  // At rest, rope end is at y=-8 relative to card; anchor at y=-ROPE_LENGTH (-300)
  //   => start card at y = -(ROPE_LENGTH - 8) = -292 so rope end meets anchor.
  const DROP_START_Y = -(ROPE_LENGTH - 8); // -292
  const dropAndSwing = {
    hidden: {
      y: DROP_START_Y,
      rotate: 0,
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.1, delay: 0.05, ease: 'easeOut' },
        scale: { duration: 0.3, ease: 'easeOut' },
        default: {
          duration: 2.4,
          ease: [0.22, 0.9, 0.32, 1.15], // pendulum bounce
          times: [0, 0.42, 0.65, 0.84, 1],
          y: [DROP_START_Y, 28, -20, 9, 0],   // fall past anchor → stretch rope → bounce up → settle
          rotate: [0, 2, -12, 8, 0],           // small swing after the bounce
        },
      },
    },
  };

  /**
   * Keep the rope path in sync with the card's position during the
   * Framer-Motion entrance animation so the rope stretches with the card
   * as it drops (realistic "rope unrolling" feel).
   */
  const handleEntranceUpdate = useCallback((latest) => {
    const rope = ropePathRef.current;
    const ropeHighlight = ropeHighlightRef.current;
    if (!rope) return;
    // latest.y is the current y offset of the card during animation.
    // Rope runs from anchor (0, -ROPE_LENGTH) to card's current position
    // (0, y - 8) where the rope clips into the card.
    const y = typeof latest?.y === 'number' ? latest.y : 0;
    const endX = 0;
    const endY = y - 8;
    const startX = 0;
    const startY = -ROPE_LENGTH;
    // No sideways sway during the straight fall (rotate starts at 0 until bounce)
    const cp1X = startX + (endX - startX) * 0.22;
    const cp1Y = startY + (endY - startY) * 0.45;
    const cp2X = startX + (endX - startX) * 0.75;
    const cp2Y = startY + (endY - startY) * 0.82;
    const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    rope.setAttribute('d', path);
    if (ropeHighlight) ropeHighlight.setAttribute('d', path);
  }, []);

  // Word-by-word reveal variants
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: '0.6em',
      filter: 'blur(4px)',
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.035 * i,
      },
    }),
  };

  return (
    <section
      id="about"
      dir={langConfig.dir}
      data-experience-section
      className="
        chapter-centered
        chapter-centered--wave
        section-flow
        relative
        w-full
        overflow-hidden
        bg-[var(--color-6)]
        px-6
        font-sans
        md:px-12
      "
    >
      <div className="chapter-body mx-auto flex w-full max-w-6xl flex-col items-stretch gap-16 md:flex-row md:items-center">
        {/* PHOTO */}
        <div
          dir="ltr"
          className="mt-12 flex w-full shrink-0 flex-col items-center md:mt-0 md:w-[350px]"
        >
          <motion.div
            initial="hidden"
            animate={hasEntered ? 'visible' : 'hidden'}
            variants={dropAndSwing}
            onUpdate={handleEntranceUpdate}
            onAnimationComplete={handleEntranceComplete}
            className="relative flex w-full justify-center"
          >
            {/* ANCHORED FLEXIBLE ROPE — visible from start of drop, grows with the card */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute overflow-visible"
              style={{
                left: '50%',
                top: '0',
                width: '1px',
                height: '1px',
                zIndex: 10,
              }}
            >
              {/* Ceiling mount anchor */}
              <circle cx="0" cy={-ROPE_LENGTH} r="6" fill="#1b1716" />
              <circle cx="0" cy={-ROPE_LENGTH} r="2.5" fill="#a19392" />

              {/* Main rope — starts at length 0 (end point = anchor), then the
                  onUpdate callback stretches it as the card drops. */}
              <path
                ref={ropePathRef}
                d={`M 0 ${-ROPE_LENGTH} C 0 ${-ROPE_LENGTH}, 0 ${-ROPE_LENGTH}, 0 ${-ROPE_LENGTH}`}
                fill="none"
                stroke="#1b1716"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Rope texture / highlight stripe */}
              <path
                ref={ropeHighlightRef}
                d={`M 0 ${-ROPE_LENGTH} C 0 ${-ROPE_LENGTH}, 0 ${-ROPE_LENGTH}, 0 ${-ROPE_LENGTH}`}
                fill="none"
                stroke="#a19392"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>

            <div
              ref={frameRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={releaseCard}
              onPointerCancel={handlePointerCancel}
              className="
                about-card-physics
                relative
                z-20
                w-full
                max-w-[280px]
                cursor-grab
                select-none
                touch-pan-y
                overflow-visible
                rounded-2xl
                bg-[var(--color-4)]
                p-3
                shadow-[0_24px_50px_rgba(27,23,22,0.36)]
              "
              style={{
                transformOrigin: '50% 0%',
              }}
            >
              {/* CLIP */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-6
                  z-30
                  flex
                  h-12
                  w-6
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-[var(--color-1)]
                  bg-gradient-to-b
                  from-[var(--color-5)]
                  to-[var(--color-3)]
                  shadow-[0_3px_12px_rgba(27,23,22,0.32)]
                "
                style={{ left: 'calc(50% - 12px)' }}
              >
                <div className="h-5 w-2 rounded-full bg-[var(--color-1)]/70 shadow-inner" />
              </div>

              {/* DARK CLIP BASE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-3
                  z-20
                  flex
                  h-6
                  w-16
                  items-center
                  justify-center
                  rounded-t-xl
                  bg-[var(--color-4)]
                "
                style={{ left: 'calc(50% - 32px)' }}
              >
                <div className="h-2 w-8 rounded-full bg-black/30 shadow-inner" />
              </div>

              {/* PHOTO */}
              <div
                className="
                  pointer-events-none
                  relative
                  z-10
                  aspect-[3/4]
                  w-full
                  overflow-hidden
                  rounded-xl
                  border-2
                  border-transparent
                  bg-[var(--color-4)]
                "
              >
                {stackImage ? (
                  <img
                    src={stackImage}
                    alt={t('about.altText')}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="pointer-events-none h-full w-full select-none object-cover object-top"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-2)] to-[var(--color-4)]"
                    aria-hidden="true"
                  >
                    <svg className="h-20 w-20 text-[var(--color-1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* TEXT — word by word reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={motionConfig.viewport}
          variants={getRevealVariants({ distance: profile.revealDistance, delay: 0.08 })}
          className="relative z-20 mt-8 flex-1 text-start text-[var(--color-4)] md:mt-0"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={motionConfig.viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-6 text-4xl font-black text-[var(--color-4)] md:text-5xl"
          >
            {t('about.heading')}
          </motion.h2>

          <div className="max-w-3xl space-y-5 text-base font-medium leading-relaxed text-[var(--color-4)]/80 md:text-lg">
            {tokenizedParagraphs.map((tokens, pIndex) => {
              const isLast = pIndex === tokenizedParagraphs.length - 1;
              return (
                <p
                  key={pIndex}
                  className="font-semibold text-[var(--color-4)]/85"
                  aria-label={paragraphs[pIndex] + (isLast ? ' ' + motto : '')}
                >
                  {tokens.map((tok, i) => (
                    <span key={tok.key} className="about-word-wrap" style={{ display: 'inline-block' }}>
                      <motion.span
                        custom={pIndex * 18 + i}   // stagger across paragraphs too
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={wordVariants}
                        style={{ display: 'inline-block' }}
                      >
                        {tok.word}
                      </motion.span>
                      {tok.space && (
                        <span style={{ display: 'inline', whiteSpace: 'pre' }}>{tok.space}</span>
                      )}
                    </span>
                  ))}
                  {isLast && (
                    <>
                      <motion.strong
                        custom={pIndex * 18 + tokens.length + 1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={wordVariants}
                        style={{ display: 'inline-block', color: 'var(--color-2)', fontWeight: 900 }}
                      >
                        {motto}
                      </motion.strong>
                    </>
                  )}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-30 w-full translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-12 w-full fill-[var(--color-5)] md:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86c82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8C242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>

      {/* STAR 1 */}
      <div className="pointer-events-none absolute right-10 top-10 text-[var(--color-2)] opacity-20 md:right-20">
        <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>

      {/* STAR 2 */}
      <div className="pointer-events-none absolute bottom-32 left-4 text-[var(--color-2)] opacity-20 md:left-20">
        <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import stackImageAsset from '../assets/about/medo.jpg';

const stackImage = stackImageAsset;

const ROPE_LENGTH = 235;
const MAX_X = 220;
const MIN_Y = -130;
const MAX_Y = 160;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const About = () => {
  const { t, langConfig } = useLanguage();
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const ropePathRef = useRef(null);
  const physicsFrameRef = useRef(null);

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
  const motionEnabledRef = useRef(true);
  const returningRef = useRef(false);

  const updateRope = useCallback(() => {
    const rope = ropePathRef.current;
    if (!rope) return;

    const physics = physicsRef.current;
    const movement = clamp(physics.velocityX * 0.018, -24, 24);
    const positionCurve = clamp(physics.x * 0.08, -18, 18);
    const curve = movement + positionCurve;
    const verticalCurve = clamp(physics.velocityY * 0.006, -10, 10);

    const path = `
      M 55 0
      C
        ${55 + curve * 0.25} ${ROPE_LENGTH * 0.18},
        ${55 + curve} ${ROPE_LENGTH * 0.48},
        ${55 + curve * 0.55} ${ROPE_LENGTH * 0.72}
      C
        ${55 + curve * 0.25} ${ROPE_LENGTH * 0.84},
        ${55 + verticalCurve} ${ROPE_LENGTH * 0.94},
        55 ${ROPE_LENGTH}
    `;

    rope.setAttribute('d', path);
  }, []);

  const updateVisual = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const { x, y, rotation } = physicsRef.current;
    frame.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}deg)`;
    updateRope();
  }, [updateRope]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    canDragRef.current = true;
    motionEnabledRef.current = motionQuery.matches;

    let previousTime = performance.now();

    const tick = (time) => {
      const physics = physicsRef.current;
      const deltaTime = Math.min((time - previousTime) / 1000, 0.04);
      previousTime = time;

      if (physics.dragging) {
        const dx = physics.targetX - physics.x;
        const dy = physics.targetY - physics.y;

        physics.x += dx * 0.3;
        physics.y += dy * 0.3;

        physics.velocityX =
          physics.velocityX * 0.78 + (dx * 0.22) / Math.max(deltaTime, 0.016);
        physics.velocityY =
          physics.velocityY * 0.78 + (dy * 0.22) / Math.max(deltaTime, 0.016);

        const desiredRotation = physics.velocityX * 0.018 + physics.x * 0.032;
        physics.rotation += (desiredRotation - physics.rotation) * 0.28;
        physics.rotation = clamp(physics.rotation, -10, 10);
      } else {
        const springX = 26;
        const dampingX = 8.5;
        const springY = 30;
        const dampingY = 8.5;
        const springRotation = 34;
        const dampingRotation = 9;

        const forceX = -springX * physics.x - dampingX * physics.velocityX;
        physics.velocityX += forceX * deltaTime;
        physics.x += physics.velocityX * deltaTime;

        const forceY = -springY * physics.y - dampingY * physics.velocityY;
        physics.velocityY += forceY * deltaTime;
        physics.y += physics.velocityY * deltaTime;

        const rotationForce =
          -springRotation * physics.rotation - dampingRotation * physics.rotation;
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

        if (Math.abs(physics.rotation) < 0.08) {
          physics.rotation = 0;
        }

        if (
          Math.abs(physics.x) < 0.08 &&
          Math.abs(physics.y) < 0.08 &&
          Math.abs(physics.velocityX) < 0.08 &&
          Math.abs(physics.velocityY) < 0.08 &&
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

      if (!motionEnabledRef.current && !physics.dragging && !returningRef.current) {
        physics.x = 0;
        physics.y = 0;
        physics.velocityX = 0;
        physics.velocityY = 0;
        physics.rotation = 0;
      }

      updateVisual();
      physicsFrameRef.current = requestAnimationFrame(tick);
    };

    physicsFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (physicsFrameRef.current) {
        cancelAnimationFrame(physicsFrameRef.current);
        physicsFrameRef.current = null;
      }
    };
  }, [updateVisual]);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') return;
    if (!frameRef.current || !canDragRef.current) return;

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

    event.preventDefault();
  };

  const handlePointerMove = (event) => {
    const physics = physicsRef.current;
    if (!physics.dragging || physics.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - physics.startPointerX;
    const deltaY = event.clientY - physics.startPointerY;

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
    event.preventDefault();
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
    event.preventDefault();
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
    event.preventDefault();
  };

  return (
    <section
      id="about"
      dir={langConfig.dir}
      className="
        relative
        w-full
        overflow-hidden
        bg-[var(--color-6)]
        px-6
        pb-40
        pt-20
        font-sans
        md:px-12
      "
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-16 md:flex-row">
        {/* PHOTO */}
        <div
          dir="ltr"
          className="mt-12 flex w-full shrink-0 flex-col items-center md:mt-0 md:w-[350px]"
        >
          <div ref={cardRef} data-aos="drop-bounce" className="relative flex w-full justify-center">
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
                touch-none
                overflow-visible
                rounded-2xl
                bg-[var(--color-4)]
                p-3
                shadow-[0_24px_50px_rgba(27,23,22,0.36)]
                will-change-transform
              "
              style={{
                transform: 'translate3d(0,0,0) rotateZ(0deg)',
                transformOrigin: '50% 0%',
              }}
            >
              {/* LONG FLEXIBLE ROPE */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute overflow-visible"
                style={{
                  left: '50%',
                  top: `-${ROPE_LENGTH}px`,
                  width: '110px',
                  height: `${ROPE_LENGTH + 12}px`,
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                }}
                viewBox={`0 0 110 ${ROPE_LENGTH + 12}`}
                preserveAspectRatio="none"
              >
                <path
                  ref={ropePathRef}
                  d={`
                    M 55 0
                    C 55 ${ROPE_LENGTH * 0.2}, 55 ${ROPE_LENGTH * 0.5}, 55 ${ROPE_LENGTH * 0.72}
                    C 55 ${ROPE_LENGTH * 0.84}, 55 ${ROPE_LENGTH * 0.94}, 55 ${ROPE_LENGTH}
                  `}
                  fill="none"
                  stroke="#1b1716"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d={`
                    M 55 0
                    C 55 ${ROPE_LENGTH * 0.2}, 55 ${ROPE_LENGTH * 0.5}, 55 ${ROPE_LENGTH * 0.72}
                    C 55 ${ROPE_LENGTH * 0.84}, 55 ${ROPE_LENGTH * 0.94}, 55 ${ROPE_LENGTH}
                  `}
                  fill="none"
                  stroke="#a19392"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.4"
                  pointerEvents="none"
                />
              </svg>

              {/* CLIP */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-6
                  left-1/2
                  z-30
                  flex
                  h-12
                  w-6
                  -translate-x-1/2
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
              >
                <div className="h-5 w-2 rounded-full bg-[var(--color-1)]/70 shadow-inner" />
              </div>

              {/* DARK CLIP BASE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-3
                  left-1/2
                  z-20
                  flex
                  h-6
                  w-16
                  -translate-x-1/2
                  items-center
                  justify-center
                  rounded-t-xl
                  bg-[var(--color-4)]
                "
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
          </div>
        </div>

        {/* TEXT */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="relative z-20 mt-8 flex-1 text-start text-[var(--color-4)] md:mt-0"
        >
          <h2 className="mb-4 text-4xl font-black text-[var(--color-4)] md:text-5xl">
            {t('about.heading')}
          </h2>

          <div className="max-w-3xl space-y-5 text-base font-medium leading-relaxed text-[var(--color-4)]/80 md:text-lg">
            {t('about.paragraphs').map((paragraph, index, paragraphs) => (
              <p key={paragraph} className="font-semibold text-[var(--color-4)]/85">
                {paragraph}
                {index === paragraphs.length - 1 && (
                  <> <strong className="text-[var(--color-2)]">{t('about.motto')}</strong></>
                )}
              </p>
            ))}
          </div>
        </div>
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

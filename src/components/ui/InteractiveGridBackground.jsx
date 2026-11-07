import { useState } from 'react';
import { useMotionEnvironment } from '../../motion/useMotionEnvironment';

export const InteractiveGridBackground = ({
  gridSize = 36,
  accentGlow = 'rgba(228, 42, 42, 0.25)',
  lineGlowColor = 'var(--color-7)',
}) => {
  const { hasFinePointer } = useMotionEnvironment();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });

  const handlePointerMove = (e) => {
    if (!hasFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Base Ambient Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-15 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-3) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-3) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* 2. Interactive Cell Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: mousePos.active ? 1 : 0,
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${accentGlow} 0%, rgba(123, 42, 39, 0.08) 50%, transparent 80%)`,
        }}
      />

      {/* 3. Glowing Highlighted Grid Lines Masked around Cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: mousePos.active ? 0.75 : 0,
          backgroundImage: `
            linear-gradient(to right, ${lineGlowColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${lineGlowColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* 4. Pulsing Grid Cell Nodes Highlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: mousePos.active ? 0.9 : 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${lineGlowColor} 1.5px, transparent 0)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          maskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default InteractiveGridBackground;

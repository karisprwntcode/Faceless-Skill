import React from "react";
import { useCurrentFrame } from "remotion";

interface Particle {
  id: number;
  x: number; // initial x percent (0-100)
  y: number; // initial y percent (0-100)
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export const DustParticles: React.FC<{ count?: number; color?: string }> = ({
  count = 18,
  color = "rgba(255, 255, 255, 0.4)",
}) => {
  const frame = useCurrentFrame();

  // Deterministic procedural particles based on index
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: ((i * 37 + 13) % 94) + 3,
      y: ((i * 47 + 29) % 90) + 5,
      size: (i % 3) * 2 + 3, // 3px to 7px
      speed: 0.15 + (i % 4) * 0.08,
      drift: (i % 2 === 0 ? 1 : -1) * (0.8 + (i % 3) * 0.4),
      opacity: 0.2 + (i % 5) * 0.12,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {particles.map((p) => {
        // Slow vertical ascent and horizontal sine-wave flutter
        const currentY = (p.y - frame * p.speed * 0.4) % 100;
        const normalizedY = currentY < 0 ? currentY + 100 : currentY;
        const flutterX = Math.sin((frame / 30 + p.id) * Math.PI) * 12 * p.drift;
        const breathOpacity = p.opacity + Math.sin((frame / 20 + p.id) * Math.PI) * 0.08;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `calc(${p.x}% + ${flutterX}px)`,
              top: `${normalizedY}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity: Math.max(0, breathOpacity),
              filter: `blur(${p.size > 5 ? 1.5 : 0.5}px)`,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};


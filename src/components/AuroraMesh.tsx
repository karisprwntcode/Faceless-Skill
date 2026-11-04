import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

export type AuroraMood = "tense" | "solution" | "curious" | "neutral";

interface AuroraMeshProps {
  mood?: AuroraMood;
  opacity?: number;
}

export const AuroraMesh: React.FC<AuroraMeshProps> = ({
  mood = "curious",
  opacity = 0.35,
}) => {
  const frame = useCurrentFrame();

  // Slow organic drift of light centers
  const shiftX = 50 + Math.sin((frame / 50) * Math.PI) * 15;
  const shiftY = 35 + Math.cos((frame / 60) * Math.PI) * 10;

  // Pulse intensity
  const pulse = Math.sin((frame / 35) * Math.PI) * 0.05 + opacity;

  // Semantic color mapping based on story tension
  let primaryGlow = "rgba(6, 182, 212, 0.3)"; // cyan default
  let secondaryGlow = "rgba(139, 92, 246, 0.25)"; // violet

  if (mood === "tense") {
    primaryGlow = "rgba(244, 63, 94, 0.35)"; // crimson danger
    secondaryGlow = "rgba(251, 191, 36, 0.15)"; // amber warning
  } else if (mood === "solution") {
    primaryGlow = "rgba(16, 185, 129, 0.35)"; // emerald success
    secondaryGlow = "rgba(6, 182, 212, 0.25)"; // cyan
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Primary Atmospheric Orb */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: `${shiftX - 30}%`,
          width: "80%",
          height: "65%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${primaryGlow} 0%, transparent 70%)`,
          filter: "blur(60px)",
          opacity: pulse,
        }}
      />

      {/* Secondary Depth Orb */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: `${100 - shiftX - 20}%`,
          width: "70%",
          height: "50%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondaryGlow} 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: pulse * 0.8,
        }}
      />
    </div>
  );
};


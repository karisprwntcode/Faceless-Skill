import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../styles/theme";

interface BackgroundGridProps {
  gridSize?: number;
  opacity?: number;
  enableBreathing?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  gridSize = 48,
  opacity = 0.12,
  enableBreathing = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse in the grid opacity
  const breath = enableBreathing
    ? Math.sin((frame / 45) * Math.PI) * 0.03 + opacity
    : opacity;

  // Gentle drift of the radial spotlight
  const lightShiftX = 50 + Math.sin((frame / 60) * Math.PI) * 4;
  const lightShiftY = 25 + Math.cos((frame / 60) * Math.PI) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Subtle Technical Grid Lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, ${breath}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, ${breath}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Atmospheric Radial Spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${lightShiftX}% ${lightShiftY}%, rgba(14, 165, 233, 0.12) 0%, rgba(8, 12, 20, 0) 65%)`,
        }}
      />

      {/* Edge Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: `inset 0 0 140px ${THEME.colors.bgCanvas}`,
        }}
      />
    </div>
  );
};


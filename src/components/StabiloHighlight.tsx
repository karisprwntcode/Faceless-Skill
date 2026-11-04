import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface StabiloHighlightProps {
  children: React.ReactNode;
  startFrame?: number;
  color?: string; // e.g. Yellow (#fbbf24), Cyan (#06b6d4), Emerald (#10b981)
  heightPercent?: number; // Default 48% height across the lower half of text
  tiltDeg?: number; // Marker stroke tilt angle
}

export const StabiloHighlight: React.FC<StabiloHighlightProps> = ({
  children,
  startFrame = 0,
  color = THEME.colors.amber,
  heightPercent = 52,
  tiltDeg = -1.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  // Snappy pen wipe stroke animation from left to right
  const strokeProgress = interpolate(relFrame, [0, 14], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {/* Animated Stabilo Highlighter Stroke Behind Text */}
      <span
        style={{
          position: "absolute",
          left: -4,
          bottom: 2,
          width: `${strokeProgress}%`,
          height: `${heightPercent}%`,
          background: color,
          opacity: 0.85,
          borderRadius: 4,
          transform: `rotate(${tiltDeg}deg)`,
          transformOrigin: "left center",
          boxShadow: `0 0 16px ${color}88`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* The Text Itself (Always on Top of the Marker) */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: "#ffffff",
          fontWeight: 900,
          textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        {children}
      </span>
    </span>
  );
};


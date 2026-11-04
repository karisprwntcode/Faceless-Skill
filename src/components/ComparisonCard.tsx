import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../styles/theme";

interface ComparisonCardProps {
  leftTitle: string;
  leftBadge?: string;
  leftPoints: string[];
  rightTitle: string;
  rightBadge?: string;
  rightPoints: string[];
  startFrame?: number;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  leftTitle,
  leftBadge = "OLD WAY",
  leftPoints,
  rightTitle,
  rightBadge = "BETTER WAY",
  rightPoints,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relFrame = Math.max(0, frame - startFrame);

  const leftSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  const rightSpring = spring({
    frame: relFrame - 8,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        width: "100%",
        maxWidth: 920,
        margin: "0 auto",
        fontFamily: THEME.fonts.sans,
      }}
    >
      {/* Left Card */}
      <div
        style={{
          flex: 1,
          transform: `scale(${leftSpring})`,
          opacity: leftSpring,
          background: "rgba(239, 68, 68, 0.05)",
          border: `1px solid rgba(239, 68, 68, 0.3)`,
          borderRadius: 18,
          padding: 24,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#f87171",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {leftBadge}
        </span>
        <h3 style={{ fontSize: 26, color: "#fff", margin: "8px 0 16px 0", fontWeight: 700 }}>
          {leftTitle}
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: THEME.colors.textSecondary, fontSize: 18, lineHeight: 1.8 }}>
          {leftPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Right Card */}
      <div
        style={{
          flex: 1,
          transform: `scale(${rightSpring})`,
          opacity: rightSpring,
          background: "rgba(16, 185, 129, 0.08)",
          border: `1px solid ${THEME.colors.emerald}`,
          borderRadius: 18,
          padding: 24,
          boxShadow: `0 0 25px ${THEME.colors.emeraldGlow}`,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: THEME.colors.emerald,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {rightBadge}
        </span>
        <h3 style={{ fontSize: 26, color: "#fff", margin: "8px 0 16px 0", fontWeight: 700 }}>
          {rightTitle}
        </h3>
        <ul style={{ margin: 0, paddingLeft: 20, color: THEME.colors.textPrimary, fontSize: 18, lineHeight: 1.8 }}>
          {rightPoints.map((point, i) => (
            <li key={i} style={{ color: "#d1fae5" }}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

